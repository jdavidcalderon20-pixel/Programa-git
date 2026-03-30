import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import questionsBasicData from '../data/questions.json';
import questionsProData from '../data/questions_pro.json';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// ─── Question rotation helpers ─────────────────────────────────────────────

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Returns a randomized subset of questions for a given area.
 * Basic mode: pick up to `count` from combined basic+pro pool + firestore.
 * Pro mode: use max 50 from official docs (firestore).
 */
function buildRotatedDataset(mode, firestoreData = {}) {
  const areaKeys = ['Matemáticas', 'Lectura Crítica', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'];

  if (mode === 'pro') {
    // Pro mode uses official firestore documents exclusively
    const result = {};
    areaKeys.forEach(area => {
      // Taking up to 50 from official docs
      result[area] = shuffleArray(firestoreData[area] || []).slice(0, 50);
      
      // Fallback if no firestore data yet during dev
      if (result[area].length === 0) {
        result[area] = shuffleArray(questionsProData[area] || []).slice(0, 50);
      }
    });
    return result;
  }

  // Basic mode: combine all datasets and pick a random subset per area
  const countBasic = { 'Matemáticas': 20, 'Lectura Crítica': 20, 'Sociales y Ciudadanas': 20, 'Ciencias Naturales': 20, 'Inglés': 20 };
  const result = {};
  areaKeys.forEach(area => {
    const combined = [
      ...(questionsBasicData[area] || []),
      ...(questionsProData[area] || []),
      ...(firestoreData[area] || [])
    ];
    result[area] = shuffleArray(combined).slice(0, countBasic[area]);
  });
  return result;
}

export const AppProvider = ({ children }) => {
  const [studentName, setStudentName] = useState('');
  const [examMode, setExamMode] = useState('basic');
  const [globalTimeLeft, setGlobalTimeLeft] = useState(14400);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  const [areasStatus, setAreasStatus] = useState({
    matematicas: 'pending',
    lectura_critica: 'pending',
    sociales: 'pending',
    ciencias_naturales: 'pending',
    ingles: 'pending'
  });

  const [answers, setAnswers] = useState({});
  const [areaScores, setAreaScores] = useState({});
  const [lastFinishedArea, setLastFinishedArea] = useState(null);

  // Rotated questions dataset built fresh on each exam start
  const [questions, setQuestions] = useState({});
  const [questionsFirestore, setQuestionsFirestore] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const qs = await getDocs(collection(db, 'preguntas_icfes'));
        const qsData = {};
        qs.forEach(doc => {
          const data = doc.data();
          if (!qsData[data.materia]) qsData[data.materia] = [];
          qsData[data.materia].push(data);
        });
        setQuestionsFirestore(qsData);
        setQuestions(buildRotatedDataset('basic', qsData));
      } catch(e) {
        console.error("Error fetching questions:", e);
        setQuestions(buildRotatedDataset('basic', {}));
      }
    };
    fetchQuestions();
  }, []);

  const areaKeyMap = {
    matematicas: 'Matemáticas',
    lectura_critica: 'Lectura Crítica',
    sociales: 'Sociales y Ciudadanas',
    ciencias_naturales: 'Ciencias Naturales',
    ingles: 'Inglés'
  };

  // Global Timer
  useEffect(() => {
    let timer;
    if (examStarted && !examFinished && globalTimeLeft > 0) {
      timer = setInterval(() => setGlobalTimeLeft(prev => prev - 1), 1000);
    } else if (globalTimeLeft === 0 && !examFinished) {
      setExamFinished(true);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, globalTimeLeft]);

  const startExam = (name, mode = 'basic') => {
    setStudentName(name);
    setExamMode(mode);
    setExamStarted(true);
    setGlobalTimeLeft(mode === 'pro' ? 16200 : 14400);
    // Build a fresh rotated dataset each time
    setQuestions(buildRotatedDataset(mode, questionsFirestore));
  };

  const finishArea = (areaId, areaAnswers) => {
    const jsonKey = areaKeyMap[areaId];
    const areaQuestions = questions[jsonKey] || [];

    let correctCount = 0;
    areaQuestions.forEach((q, idx) => {
      if (areaAnswers[idx] === q.correct) correctCount++;
    });

    const scorePercent = areaQuestions.length > 0
      ? Math.round((correctCount / areaQuestions.length) * 100)
      : 0;

    setAnswers(prev => ({ ...prev, [areaId]: areaAnswers }));
    setAreasStatus(prev => ({ ...prev, [areaId]: 'completed' }));
    setAreaScores(prev => ({
      ...prev,
      [areaId]: { correctCount, total: areaQuestions.length, scorePercent }
    }));
    setLastFinishedArea(areaId);
  };

  const completeGlobalExam = () => setExamFinished(true);

  const resetExam = () => {
    setStudentName('');
    setExamMode('basic');
    setGlobalTimeLeft(14400);
    setExamStarted(false);
    setExamFinished(false);
    setAreasStatus({
      matematicas: 'pending', lectura_critica: 'pending',
      sociales: 'pending', ciencias_naturales: 'pending', ingles: 'pending'
    });
    setAnswers({});
    setAreaScores({});
    setLastFinishedArea(null);
    setQuestions(buildRotatedDataset('basic', questionsFirestore));
  };

  const calculateFinalScores = useCallback(() => {
    let totalScore = 0;
    const areasResults = [];

    Object.keys(areasStatus).forEach(areaId => {
      const jsonKey = areaKeyMap[areaId];
      const areaQuestions = questions[jsonKey] || [];
      const areaAnswers = answers[areaId] || {};

      let correctCount = 0;
      areaQuestions.forEach((q, idx) => {
        if (areaAnswers[idx] === q.correct) correctCount++;
      });

      const areaScore = areaQuestions.length > 0
        ? Math.floor((correctCount / areaQuestions.length) * 100)
        : 0;

      areasResults.push({ id: areaId, name: jsonKey, score: areaScore, max: 100, correctCount, totalInArea: areaQuestions.length });
      totalScore += areaScore;
    });

    return {
      totalScore, maxPossible: 500, areas: areasResults,
      studentName, examMode, timeRemaining: globalTimeLeft,
      date: new Date().toISOString()
    };
  }, [answers, areasStatus, questions, studentName, examMode, globalTimeLeft]);

  const value = {
    studentName, examMode, globalTimeLeft, examStarted, examFinished,
    areasStatus, answers, areaScores, lastFinishedArea, questions, areaKeyMap,
    startExam, finishArea, completeGlobalExam, calculateFinalScores, resetExam
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
