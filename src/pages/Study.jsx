import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Lightbulb, Target, ChevronDown } from 'lucide-react';
import questionsBasic from '../data/questions.json';
import questionsPro from '../data/questions_pro.json';
import './Study.css';

import { STUDY_CONTENT } from '../data/study';
import { shuffleQuestions } from '../utils/shuffler';

/* ─── Quiz helper ─────────────────────────────────────────────────────────── */
function buildQuizQuestions(subject) {
  const combined = {};
  [questionsBasic, questionsPro].forEach(dataset => {
    Object.entries(dataset).forEach(([area, qs]) => {
      if (!combined[area]) combined[area] = [];
      combined[area].push(...qs);
    });
  });
  const areaQs = combined[subject] || [];
  return [...areaQs].sort(() => Math.random() - 0.5).slice(0, 5);
}

/* ─── Section renderer ────────────────────────────────────────────────────── */
function TopicSection({ section }) {
  const concepto = section.concepto;
  const dato = section.datoRelevante;
  const tip = section.tipIcfes;

  return (
    <details className="stc-section study-accordion" style={{ marginBottom: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
      <summary className="stc-section-title" style={{ padding: '16px 20px', cursor: 'pointer', fontWeight: 'bold', display: 'block', listStyle: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>{section.title}</h4>
          <ChevronDown size={20} color="#a78bfa" />
        </div>
      </summary>
      <div className="accordion-content" style={{ padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Pilar 1: Concepto */}
        <div style={{ background: 'rgba(96, 165, 250, 0.08)', borderLeft: '4px solid #60a5fa', padding: '14px 18px', borderRadius: '0 10px 10px 0' }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
            <BookOpen size={20} color="#60a5fa" /> Concepto Clave
          </h5>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{concepto}</p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0' }} />

        {/* Pilar 2: Dato Relevante */}
        <div style={{ background: 'rgba(52, 211, 153, 0.08)', borderLeft: '4px solid #34d399', padding: '14px 18px', borderRadius: '0 10px 10px 0' }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#34d399', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
            <Lightbulb size={20} color="#34d399" /> Dato Relevante
          </h5>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{dato}</p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0' }} />

        {/* Pilar 3: Tip Pro ICFES */}
        <div style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #f59e0b', padding: '14px 18px', borderRadius: '0 10px 10px 0' }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
            <Target size={20} color="#f59e0b" /> Tip Pro ICFES
          </h5>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{tip}</p>
        </div>

      </div>
    </details>
  );
}

/* ─── Main Study component ────────────────────────────────────────────────── */
function Study() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const [qIdx, setQIdx] = useState(0); 
  const [xpAwarded, setXpAwarded] = useState(false);

  const { currentUser, awardXP, tryCompleteMission } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const area = params.get('area');
    if (area) {
      const areaKeyMap = {
        matematicas: 'Matemáticas',
        lectura_critica: 'Lectura Crítica',
        sociales: 'Sociales y Ciudadanas',
        ciencias_naturales: 'Ciencias Naturales',
        ingles: 'Inglés'
      };
      if (areaKeyMap[area]) {
        setSelectedSubject(areaKeyMap[area]);
      }
    }
  }, [location.search]);

  const startTopicQuiz = (subject) => {
    const rawQs = buildQuizQuestions(subject);
    const qs = shuffleQuestions(rawQs); // New: Shuffle questions AND options
    setQuizQuestions(qs);
    setQuizAnswers({});
    setQuizDone(false);
    setQIdx(0);
    setQuizMode(true);
  };

  const handleStudyTopic = async (subject, topicId) => {
    setSelectedSubject(subject);
    setSelectedTopic(topicId);
    setXpAwarded(false);
    // Award XP once per topic visit
    if (currentUser) {
      await awardXP(15);
      await tryCompleteMission('study_topic', 15);
      setXpAwarded(true);
    }
  };

  const handleSelectAnswer = (i) => {
    if (quizAnswers[qIdx] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: i }));
  };

  /* ── Quiz result screen ── */
  if (quizMode && quizDone) {
    const correct = quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length;
    const pct = Math.round((correct / quizQuestions.length) * 100);
    return (
      <div className="study-container fade-in">
        <div className="study-quiz-result glass-card">
          <h2 className="text-gradient">¡Mini quiz completado!</h2>
          <div className="sqr-score">{pct}%</div>
          <p>{correct} de {quizQuestions.length} correctas</p>
          <div className="qr-review">
            {quizQuestions.map((q, i) => {
              const ua = quizAnswers[i];
              const ok = ua === q.correct;
              return (
                <div key={i} className={`review-q ${ok ? 'rq-correct' : 'rq-wrong'}`}>
                  <p className="rq-text"><strong>P{i+1}:</strong> {q.text}</p>
                  <p className="rq-ans">{ok ? '✅' : '❌'} Tu respuesta: <strong>{q.options[ua] ?? 'Sin respuesta'}</strong></p>
                  {!ok && <p className="rq-correct-ans">✅ Correcto: <strong>{q.options[q.correct]}</strong></p>}
                  {q.explanation && <p className="rq-exp">💡 {q.explanation}</p>}
                </div>
              );
            })}
          </div>
          <div className="qr-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn-primary" onClick={() => setQuizMode(false)}>← Volver al tema</button>
            <button className="btn-secondary" onClick={() => { setSelectedTopic(null); setQuizMode(false); }}>Ver más temas</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Quiz question screen ── */
  if (quizMode && quizQuestions.length > 0) {
    const q = quizQuestions[qIdx];
    return (
      <div className="study-container fade-in">
        <div className="study-quiz-header glass-card">
          <h3>⚡ Mini Quiz: {selectedSubject}</h3>
          <span>P. {qIdx + 1} / {quizQuestions.length}</span>
        </div>
        <div className="question-card glass-card">
          <div className="question-text"><p>{q?.text}</p></div>
          <div className="options-container">
            {q?.options?.map((opt, i) => {
              const isSelected = quizAnswers[qIdx] === i;
              const isCorrect = q.correct === i;
              const isAnswered = quizAnswers[qIdx] !== undefined;
              const letter = String.fromCharCode(65 + i);

              let statusClass = '';
              if (isAnswered) {
                if (isCorrect) statusClass = 'correct-highlight';
                else if (isSelected) statusClass = 'wrong-highlight';
              } else if (isSelected) {
                statusClass = 'selected';
              }

              return (
                <div key={i}
                  className={`option-item ${statusClass} ${isAnswered ? 'locked' : ''}`}
                  onClick={() => handleSelectAnswer(i)}>
                  <div className="option-letter">{letter}</div>
                  <div className="option-text">{opt}</div>
                </div>
              );
            })}
          </div>

          {/* Immediate Feedback */}
          {quizAnswers[qIdx] !== undefined && (
            <div className={`quiz-immediate-feedback ${quizAnswers[qIdx] === q.correct ? 'feedback-success' : 'feedback-error'} fade-in`}>
              <div className="feedback-header">
                {quizAnswers[qIdx] === q.correct ? '✨ ¡Correcto!' : '❌ Incorrecto'}
              </div>
              {q.explanation && (
                <div className="feedback-explanation">
                  <strong>Explicación:</strong> {q.explanation}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="exam-controls">
          <button className="btn-secondary" onClick={() => setQuizMode(false)}>Salir</button>
          {qIdx < quizQuestions.length - 1
            ? <button className="btn-primary" disabled={quizAnswers[qIdx] === undefined}
                onClick={() => setQIdx(i => i + 1)}>Siguiente →</button>
            : <button className="btn-primary" disabled={quizAnswers[qIdx] === undefined}
                onClick={() => setQuizDone(true)}>Ver resultado ✓</button>
          }
        </div>
      </div>
    );
  }

  /* ── Topic content view ── */
  if (selectedSubject && selectedTopic) {
    const subj = STUDY_CONTENT[selectedSubject];
    const topic = subj?.topics.find(t => t.id === selectedTopic);
    if (!topic) return null;
    return (
      <div className="study-container fade-in">
        <button className="study-back-btn" onClick={() => setSelectedTopic(null)}>← Volver a {selectedSubject}</button>
        <div className="study-topic-card glass-card">
          <div className="stc-header" style={{ borderColor: subj.color }}>
            <span style={{ fontSize: '1.8rem' }}>{topic.icon}</span>
            <div>
              <h2>{topic.name}</h2>
              <span className="stc-subject" style={{ color: subj.color }}>{subj.icon} {selectedSubject}</span>
            </div>
          </div>
          <div className="stc-content">
            {topic.sections.map((section, i) => (
              <TopicSection key={i} section={section} />
            ))}
          </div>
          {xpAwarded && <p className="stc-xp-note">✅ +15 XP ganados por estudiar este tema</p>}
          <div className="stc-actions">
            <button className="btn-primary" onClick={() => startTopicQuiz(selectedSubject)}>
              ⚡ Practicar este tema (5 preguntas)
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Subject topics list ── */
  if (selectedSubject) {
    const subj = STUDY_CONTENT[selectedSubject];
    return (
      <div className="study-container fade-in">
        <button className="study-back-btn" onClick={() => setSelectedSubject(null)}>← Volver a materias</button>
        <div className="study-subject-header glass-card" style={{ borderLeft: `4px solid ${subj.color}` }}>
          <span style={{ fontSize: '2rem' }}>{subj.icon}</span>
          <h2>{selectedSubject}</h2>
        </div>
        <div className="study-topics-grid">
          {subj.topics.map(topic => (
            <div key={topic.id} className="study-topic-item glass-card"
              onClick={() => handleStudyTopic(selectedSubject, topic.id)}>
              <span className="sti-icon">{topic.icon}</span>
              <div className="sti-info">
                <h3>{topic.name}</h3>
                <p>{topic.sections.length} secciones · +15 XP</p>
              </div>
              <span className="sti-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Main subjects grid ── */
  return (
    <div className="study-container fade-in">
      <div className="study-main-header glass-card">
        <h1 className="text-gradient">📚 Módulo de Estudio</h1>
        <p>Elige una materia y sumérgete en el contenido. Cada tema tiene explicaciones detalladas, ejemplos y un mini quiz de práctica.</p>
      </div>
      <div className="study-subjects-grid">
        {Object.entries(STUDY_CONTENT).map(([subjectName, data]) => (
          <div key={subjectName} className="study-subject-card glass-card"
            onClick={() => setSelectedSubject(subjectName)}
            style={{ borderTop: `3px solid ${data.color}` }}>
            <div className="ssc-icon">{data.icon}</div>
            <h3>{subjectName}</h3>
            <p>{data.topics.length} temas · {data.topics.reduce((a, t) => a + t.sections.length, 0)} secciones</p>
            <div className="ssc-topics">
              {data.topics.map(t => <span key={t.id} className="ssc-tag">{t.name}</span>)}
            </div>
            <button className="btn-study-go" style={{ color: data.color, borderColor: data.color }}>
              Estudiar →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Study;
