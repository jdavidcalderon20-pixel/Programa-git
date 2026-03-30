import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ExplanationRenderer from '../components/ExplanationRenderer';
import { saveExamHistory, getDailyMissionsStatus } from '../firebase';
import questionsBasic from '../data/questions.json';
import questionsPro from '../data/questions_pro.json';
import { shuffleQuestions } from '../utils/shuffler';
import './DailyPractice.css';

const AREA_ICONS = {
  'Matemáticas': '📐', 'Lectura Crítica': '📖',
  'Sociales y Ciudadanas': '🌍', 'Ciencias Naturales': '🔬', 'Inglés': '🗣️',
};

function buildDailyPool() {
  const combined = {};
  [questionsBasic, questionsPro].forEach(dataset => {
    Object.entries(dataset).forEach(([area, qs]) => {
      if (!combined[area]) combined[area] = [];
      const tagged = qs.map(q => ({ ...q, _area: area }));
      combined[area].push(...tagged);
    });
  });

  const rawPool = [];
  const areas = Object.keys(combined);
  const perArea = Math.ceil(30 / areas.length);
  areas.forEach(area => {
    const shuffled = [...combined[area]].sort(() => Math.random() - 0.5);
    rawPool.push(...shuffled.slice(0, perArea));
  });

  const finalSample = [...rawPool].sort(() => Math.random() - 0.5).slice(0, 30);
  return shuffleQuestions(finalSample);
}

const PHASES = { INTRO: 'intro', EXAM: 'exam', RESULT: 'result' };
const TIMER_DURATION = 45 * 60; // 45 minutes

function DailyPractice() {
  const { currentUser, awardXP, tryCompleteMission } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const timerRef = useRef(null);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (currentUser) {
      getDailyMissionsStatus(currentUser.uid).then(m => {
        setAlreadyDone(!!m['daily_practice']);
      });
    }
  }, [currentUser]);

  const startExam = () => {
    const pool = buildDailyPool();
    setQuestions(pool);
    setAnswers({});
    setCurrent(0);
    setTimeLeft(TIMER_DURATION);
    hasSaved.current = false;
    setPhase(PHASES.EXAM);
  };

  useEffect(() => {
    if (phase === PHASES.EXAM) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); finishExam(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  };

  const select = (idx) => {
    if (answers[current] !== undefined) return;
    setAnswers(prev => ({ ...prev, [current]: idx }));
  };

  const finishExam = async () => {
    clearInterval(timerRef.current);
    if (hasSaved.current) return;
    hasSaved.current = true;

    const q = questions;
    let correct = 0;
    const areaStats = {};
    q.forEach((qu, i) => {
      const area = qu._area;
      if (!areaStats[area]) areaStats[area] = { correct: 0, total: 0 };
      areaStats[area].total++;
      if (answers[i] === qu.correct) { correct++; areaStats[area].correct++; }
    });
    const pct = Math.round((correct / q.length) * 100);

    if (currentUser) {
      await awardXP(50);
      await tryCompleteMission('daily_practice', 50);
      if (pct >= 70) await tryCompleteMission('score_70', 30);
      await saveExamHistory(currentUser.uid, {
        type: 'daily_practice',
        numQuestions: q.length,
        correct,
        score: pct,
        areaStats,
        date: new Date().toISOString(),
        tags: [],
      });
    }
    setPhase(PHASES.RESULT);
  };

  if (phase === PHASES.INTRO) {
    return (
      <div className="dp-container fade-in">
        <div className="dp-intro-card glass-card">
          <div className="dp-icon">🏃</div>
          <h1 className="text-gradient">Práctica del Día</h1>
          <p className="dp-sub">30 preguntas aleatorias de todas las materias · 45 minutos</p>

          {alreadyDone ? (
            <div className="dp-done-notice">
              <span>✅</span>
              <div>
                <strong>¡Ya completaste la práctica de hoy!</strong>
                <p>Ganaste +50 XP. Vuelve mañana para una nueva práctica.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="dp-info-grid">
                <div className="dp-info-item"><span>📝</span><div><strong>30</strong><p>Preguntas</p></div></div>
                <div className="dp-info-item"><span>⏱️</span><div><strong>45 min</strong><p>Tiempo límite</p></div></div>
                <div className="dp-info-item"><span>🎲</span><div><strong>Todas</strong><p>Materias</p></div></div>
                <div className="dp-info-item"><span>🎁</span><div><strong>+50 XP</strong><p>Al completar</p></div></div>
              </div>
              <button className="btn-primary dp-start" id="dp-start-btn" onClick={startExam}>
                🏃 Comenzar Práctica
              </button>
            </>
          )}
          <button className="btn-secondary" style={{marginTop: '1rem'}} onClick={() => navigate('/')}>← Volver</button>
        </div>
      </div>
    );
  }

  if (phase === PHASES.EXAM) {
    const q = questions[current];
    const progress = ((current + 1) / questions.length) * 100;
    const isCritical = timeLeft < 300;

    return (
      <div className="dp-container fade-in">
        <div className="dp-exam-header glass-card">
          <div className="dp-eh-left">
            <span className="dp-area-badge">{AREA_ICONS[q._area] || '📋'} {q._area}</span>
            <span className="dp-counter">P. {current + 1} / {questions.length}</span>
          </div>
          <div className={`dp-timer ${isCritical ? 'dp-timer-critical' : ''}`}>⏱️ {formatTime(timeLeft)}</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
        </div>

        <div className="quiz-question-nav glass-card">
          {questions.map((_, idx) => (
            <button key={idx}
              className={`nav-dot ${idx === current ? 'nav-dot-current' : ''} ${answers[idx] !== undefined ? 'nav-dot-answered' : ''}`}
              onClick={() => setCurrent(idx)}>{idx + 1}</button>
          ))}
        </div>

        <div className="question-card glass-card">
          <div className="question-text"><p>{q.text}</p></div>
          <div className="options-container">
            {q.options.map((opt, i) => {
              const isSelected = answers[current] === i;
              const isCorrect = q.correct === i;
              const answered = answers[current] !== undefined;
              const letter = String.fromCharCode(65 + i);

              let statusClass = '';
              if (answered) {
                if (isCorrect) statusClass = 'correct-highlight';
                else if (isSelected) statusClass = 'wrong-highlight';
              } else if (isSelected) {
                statusClass = 'selected';
              }
              
              return (
                <div key={i} className={`option-item ${statusClass} ${answered ? 'locked' : ''}`} 
                  onClick={() => select(i)}>
                  <div className="option-letter">{letter}</div>
                  <div className="option-text">{opt}</div>
                </div>
              );
            })}
          </div>

          {/* Immediate Feedback */}
          {answers[current] !== undefined && (
            <div className={`quiz-immediate-feedback ${answers[current] === q.correct ? 'feedback-success' : 'feedback-error'} fade-in`}>
              <div className="feedback-header">
                {answers[current] === q.correct ? '✨ ¡Correcto!' : '❌ Incorrecto'}
              </div>
              {q.explanation && (
                <div className="feedback-explanation">
                  <ExplanationRenderer text={q.explanation} areaId={q._area} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="exam-controls">
          <button className="btn-secondary" onClick={() => setCurrent(c => c - 1)} disabled={current === 0}>← Anterior</button>
          {current < questions.length - 1
            ? <button className="btn-primary" onClick={() => setCurrent(c => c + 1)}>Siguiente →</button>
            : <button className="btn-primary" id="dp-finish-btn" onClick={finishExam}>Finalizar ✓</button>
          }
        </div>
      </div>
    );
  }

  // RESULT phase
  const correct = questions.filter((q, i) => answers[i] === q.correct).length;
  const pct = Math.round((correct / questions.length) * 100);
  const areaStats = {};
  questions.forEach((q, i) => {
    const area = q._area;
    if (!areaStats[area]) areaStats[area] = { correct: 0, total: 0 };
    areaStats[area].total++;
    if (answers[i] === q.correct) areaStats[area].correct++;
  });

  return (
    <div className="dp-container fade-in">
      <div className="dp-result-card glass-card">
        <h2 className="text-gradient">¡Práctica completada! 🏃</h2>
        <div className="dp-score">{pct}%</div>
        <p>{correct} de {questions.length} correctas</p>
        <div className="dp-xp-badge">+50 XP ganados 🎉</div>

        <div className="dp-area-breakdown">
          <h3>Por materia:</h3>
          {Object.entries(areaStats).map(([area, s]) => (
            <div key={area} className="dp-area-row">
              <span>{AREA_ICONS[area] || '📋'} {area}</span>
              <div className="dp-area-bar">
                <div className="dp-area-fill" style={{ width: `${Math.round((s.correct/s.total)*100)}%` }}></div>
              </div>
              <span className="dp-area-pct">{s.correct}/{s.total}</span>
            </div>
          ))}
        </div>

        <div className="qr-actions">
          <button className="btn-secondary" onClick={() => navigate('/')}>← Inicio</button>
          <button className="btn-secondary" onClick={() => navigate('/history')}>Ver Historial</button>
        </div>
      </div>
    </div>
  );
}

export default DailyPractice;
