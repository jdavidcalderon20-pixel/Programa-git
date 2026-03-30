import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveExamHistory } from '../firebase';
import questionsBasic from '../data/questions.json';
import questionsPro from '../data/questions_pro.json';
import { formatMathText } from '../utils/formatters';
import { shuffleQuestions, shuffleArray } from '../utils/shuffler';
import './QuickQuiz.css';

const AREAS = {
  'Todas las Materias': null,
  'Matemáticas': 'Matemáticas',
  'Lectura Crítica': 'Lectura Crítica',
  'Sociales y Ciudadanas': 'Sociales y Ciudadanas',
  'Ciencias Naturales': 'Ciencias Naturales',
  'Inglés': 'Inglés',
};

const AREA_ICONS = {
  'Matemáticas': '📐', 'Lectura Crítica': '📖',
  'Sociales y Ciudadanas': '🌍', 'Ciencias Naturales': '🔬', 'Inglés': '🗣️',
};

function getPooledQuestions(areaFilter) {
  const combined = {};
  [questionsBasic, questionsPro].forEach(dataset => {
    Object.entries(dataset).forEach(([area, qs]) => {
      if (!combined[area]) combined[area] = [];
      combined[area].push(...qs);
    });
  });

  let pool = [];
  if (areaFilter) {
    pool = combined[areaFilter] || [];
  } else {
    Object.values(combined).forEach(qs => pool.push(...qs));
  }
  // Tag each question with area for display
  const tagged = [];
  Object.entries(combined).forEach(([area, qs]) => {
    if (areaFilter && area !== areaFilter) return;
    qs.forEach(q => tagged.push({ ...q, _area: area }));
  });
  return shuffleArray(tagged);
}

const PHASES = { SELECT: 'select', QUIZ: 'quiz', RESULT: 'result' };

function QuickQuiz() {
  const { currentUser, awardXP, tryCompleteMission } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(PHASES.SELECT);
  const [numQ, setNumQ] = useState(10);
  const [selectedArea, setSelectedArea] = useState('Todas las Materias');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const startQuiz = useCallback(() => {
    const rawPool = getPooledQuestions(AREAS[selectedArea]);
    if (rawPool.length === 0) return;
    
    // Sort random and slice first, then shuffle the internal question structure (options)
    const sampled = [...rawPool].sort(() => Math.random() - 0.5).slice(0, numQ);
    const shuffledQs = shuffleQuestions(sampled);
    
    setQuestions(shuffledQs);
    setAnswers({});
    setCurrent(0);
    setReviewMode(false);
    setPhase(PHASES.QUIZ);
  }, [numQ, selectedArea]);

  const select = (idx) => {
    if (answers[current] !== undefined) return;
    setAnswers(prev => ({ ...prev, [current]: idx }));
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(c => c + 1);
    else finishQuiz();
  };
  const prev = () => { if (current > 0) setCurrent(c => c - 1); };

  const finishQuiz = async () => {
    // Calculate score
    let correct = 0;
    questions.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
    const pct = Math.round((correct / questions.length) * 100);

    // Award XP and missions
    if (currentUser) {
      await awardXP(20);
      await tryCompleteMission('complete_quiz', 20);
      if (pct >= 70) await tryCompleteMission('score_70', 30);
      await saveExamHistory(currentUser.uid, {
        type: 'quick_quiz',
        area: selectedArea,
        numQuestions: questions.length,
        correct,
        score: pct,
        date: new Date().toISOString(),
        tags: [],
      });
    }
    setPhase(PHASES.RESULT);
  };

  if (phase === PHASES.SELECT) {
    return (
      <div className="quiz-container fade-in">
        <div className="quiz-select-card glass-card">
          <div className="qs-icon">⚡</div>
          <h1 className="text-gradient">Quiz Rápido</h1>
          <p className="qs-sub">Elige el número de preguntas y la materia</p>

          <div className="qs-section">
            <label>📝 Número de preguntas</label>
            <div className="qs-numbtns">
              {[5, 10, 20].map(n => (
                <button key={n} id={`quiz-num-${n}`}
                  className={`qs-nbtn ${numQ === n ? 'active' : ''}`}
                  onClick={() => setNumQ(n)}>
                  {n} preguntas
                  {n === 10 && <span className="popular-tag">Popular</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="qs-section">
            <label>📚 Materia</label>
            <div className="qs-area-grid">
              {Object.keys(AREAS).map(area => (
                <button key={area} id={`quiz-area-${area.replace(/\s/g,'-')}`}
                  className={`qs-abtn ${selectedArea === area ? 'active' : ''}`}
                  onClick={() => setSelectedArea(area)}>
                  {AREA_ICONS[area] || '🎲'} {area}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary qs-start" id="quiz-start-btn" onClick={startQuiz}>
            ⚡ Iniciar Quiz
          </button>
          <p className="qs-xp-note">🎁 Gana +20 XP al completar</p>
        </div>
      </div>
    );
  }

  if (phase === PHASES.QUIZ) {
    const q = questions[current];
    const answered = answers[current] !== undefined;
    const progress = ((current + 1) / questions.length) * 100;

    return (
      <div className="quiz-container fade-in">
        <div className="quiz-header glass-card">
          <div className="qh-info">
            <span className="qh-area">{AREA_ICONS[q._area] || '📋'} {q._area}</span>
            <span className="qh-counter">Pregunta {current + 1} / {questions.length}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
        </div>

        <div className="quiz-question-nav glass-card">
          {questions.map((_, idx) => (
            <button key={idx}
              className={`nav-dot ${idx === current ? 'nav-dot-current' : ''} ${answers[idx] !== undefined ? (answers[idx] === questions[idx].correct ? 'nav-dot-correct-preview' : 'nav-dot-answered') : ''}`}
              onClick={() => setCurrent(idx)}>{idx + 1}</button>
          ))}
        </div>

        <div className="question-card glass-card">
          <div className="question-text"><p>{formatMathText(q.text, q._area)}</p></div>
          <div className="options-container">
            {q.options.map((opt, i) => {
              const isSelected = answers[current] === i;
              const isCorrect = q.correct === i;
              const letter = String.fromCharCode(65 + i);

              let statusClass = '';
              if (answered) {
                if (isCorrect) statusClass = 'correct-highlight';
                else if (isSelected) statusClass = 'wrong-highlight';
              } else if (isSelected) {
                statusClass = 'selected';
              }

              return (
                <div key={i}
                  className={`option-item ${statusClass} ${answered ? 'locked' : ''}`}
                  onClick={() => select(i)}>
                  <div className="option-letter">{letter}</div>
                  <div className="option-text">{formatMathText(opt, q._area)}</div>
                </div>
              );
            })}
          </div>

          {/* Immediate Feedback */}
          {answered && (
            <div className={`quiz-immediate-feedback ${answers[current] === q.correct ? 'feedback-success' : 'feedback-error'} fade-in`}>
              <div className="feedback-header">
                {answers[current] === q.correct ? '✨ ¡Excelente elección!' : '❌ Respuesta incorrecta'}
              </div>
              {q.explanation && (
                <div className="feedback-explanation">
                  <strong>Justificación:</strong> {q.explanation}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="exam-controls">
          <button className="btn-secondary" onClick={prev} disabled={current === 0}>← Anterior</button>
          <button className="btn-primary" onClick={next}>
            {current === questions.length - 1 ? 'Finalizar ✓' : 'Siguiente →'}
          </button>
        </div>
      </div>
    );
  }

  // RESULT phase
  const correct = questions.filter((q, i) => answers[i] === q.correct).length;
  const pct = Math.round((correct / questions.length) * 100);
  const perf = pct >= 80 ? { label: '🏆 Excelente', cls: 'perf-excellent' }
    : pct >= 60 ? { label: '👍 Bueno', cls: 'perf-good' }
    : pct >= 40 ? { label: '📈 Regular', cls: 'perf-regular' }
    : { label: '💪 Sigue practicando', cls: 'perf-low' };

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-result-card glass-card">
        <div className="qr-header">
          <h2 className="text-gradient">¡Quiz completado!</h2>
          <div className={`qr-score ${perf.cls}`}>{pct}%</div>
          <p>{perf.label}</p>
          <p className="qr-detail">{correct} de {questions.length} correctas</p>
          <div className="qr-xp">+20 XP ganados {pct >= 70 ? '· +30 XP (Misión)' : ''} 🎉</div>
        </div>

        <div className="qr-actions">
          <button className="btn-primary" onClick={() => setReviewMode(!reviewMode)}>
            {reviewMode ? '🔼 Ocultar revisión' : '📋 Ver respuestas'}
          </button>
          <button className="btn-secondary" onClick={() => setPhase(PHASES.SELECT)}>Nuevo Quiz</button>
          <button className="btn-secondary" onClick={() => navigate('/')}>Inicio</button>
        </div>

        {reviewMode && (
          <div className="qr-review">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrect = userAns === q.correct;
              return (
                <div key={i} className={`review-q ${isCorrect ? 'rq-correct' : 'rq-wrong'}`}>
                  <p className="rq-num"><strong>P{i + 1}</strong> <span style={{fontSize:'0.8em',color:'var(--text-muted)'}}>{q._area}</span></p>
                  <p className="rq-text">{formatMathText(q.text, q._area)}</p>
                  <p className="rq-ans">
                    {isCorrect ? '✅' : '❌'} Tu respuesta: <strong>{q.options[userAns] ? formatMathText(q.options[userAns], q._area) : 'Sin respuesta'}</strong>
                  </p>
                  {!isCorrect && (
                    <p className="rq-correct-ans">✅ Correcto: <strong>{formatMathText(q.options[q.correct], q._area)}</strong></p>
                  )}
                  {q.explanation && <p className="rq-exp">💡 {formatMathText(q.explanation, q._area)}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuickQuiz;
