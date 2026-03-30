import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ExplanationRenderer from '../components/ExplanationRenderer';
import './Review.css';

const areaKeyMap = {
  matematicas: 'Matemáticas',
  lectura_critica: 'Lectura Crítica',
  sociales: 'Sociales y Ciudadanas',
  ciencias_naturales: 'Ciencias Naturales',
  ingles: 'Inglés'
};

const areaIcons = {
  matematicas: '📐',
  lectura_critica: '📖',
  sociales: '🌍',
  ciencias_naturales: '🔬',
  ingles: '🗣️'
};

const areaColors = {
  matematicas: '#3b82f6',
  lectura_critica: '#8b5cf6',
  sociales: '#10b981',
  ciencias_naturales: '#f59e0b',
  ingles: '#ef4444'
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions: questionsData, answers, areasStatus } = useApp();

  // Support ?area=X from AreaScore page
  const queryArea = new URLSearchParams(location.search).get('area');
  const defaultArea = queryArea && areasStatus[queryArea] ? queryArea : 'matematicas';

  const [selectedArea, setSelectedArea] = useState(defaultArea);
  const [filter, setFilter] = useState('all');
  const [expandedExplanations, setExpandedExplanations] = useState({});

  const areas = Object.keys(areasStatus);

  const areaKey = areaKeyMap[selectedArea];
  const areaQuestions = questionsData[areaKey] || [];
  const areaAnswers = answers[selectedArea] || {};

  const stats = areaQuestions.reduce((acc, q, idx) => {
    const answered = areaAnswers[idx] !== undefined;
    const correct = answered && areaAnswers[idx] === q.correct;
    if (!answered) acc.unanswered++;
    else if (correct) acc.correct++;
    else acc.wrong++;
    return acc;
  }, { correct: 0, wrong: 0, unanswered: 0 });

  const filteredQuestions = areaQuestions
    .map((q, idx) => ({ ...q, idx }))
    .filter(q => {
      const answered = areaAnswers[q.idx] !== undefined;
      const correct = answered && areaAnswers[q.idx] === q.correct;
      if (filter === 'wrong') return answered && !correct;
      if (filter === 'correct') return answered && correct;
      if (filter === 'unanswered') return !answered;
      return true;
    });

  const toggleExplanation = (idx) => {
    setExpandedExplanations(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="review-container fade-in">
      <div className="review-header glass-card">
        <div className="review-title-section">
          <h2>📋 Revisión de Respuestas</h2>
          <p className="subtitle">Analiza tus aciertos y errores para mejorar.</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/results')}>
          ← Volver a Resultados
        </button>
      </div>

      {/* Area Tabs */}
      <div className="area-tabs">
        {areas.map(areaId => (
          <button
            key={areaId}
            className={`area-tab ${selectedArea === areaId ? 'active' : ''}`}
            style={{ '--area-color': areaColors[areaId] }}
            onClick={() => { setSelectedArea(areaId); setFilter('all'); setExpandedExplanations({}); }}
          >
            <span>{areaIcons[areaId]}</span>
            <span className="tab-name">{areaKeyMap[areaId]}</span>
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="stats-bar glass-card">
        <div className="stat-item stat-correct">
          <span className="stat-icon">✅</span>
          <span className="stat-num">{stats.correct}</span>
          <span className="stat-label">Correctas</span>
        </div>
        <div className="stat-item stat-wrong">
          <span className="stat-icon">❌</span>
          <span className="stat-num">{stats.wrong}</span>
          <span className="stat-label">Incorrectas</span>
        </div>
        <div className="stat-item stat-unanswered">
          <span className="stat-icon">⬜</span>
          <span className="stat-num">{stats.unanswered}</span>
          <span className="stat-label">Sin responder</span>
        </div>
        <div className="stat-item stat-total">
          <span className="stat-icon">📊</span>
          <span className="stat-num">{areaQuestions.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {[
          { key: 'all', label: 'Todas', icon: '📋' },
          { key: 'wrong', label: 'Incorrectas', icon: '❌' },
          { key: 'correct', label: 'Correctas', icon: '✅' },
          { key: 'unanswered', label: 'Sin responder', icon: '⬜' }
        ].map(f => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="questions-review-list">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state glass-card">
            <p>No hay preguntas en esta categoría.</p>
          </div>
        ) : (
          filteredQuestions.map(q => {
            const userAnswer = areaAnswers[q.idx];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.correct;
            const isWrong = isAnswered && !isCorrect;
            const showExp = expandedExplanations[q.idx];

            return (
              <div
                key={q.id || q.idx}
                className={`review-question-card glass-card ${isCorrect ? 'card-correct' : isWrong ? 'card-wrong' : 'card-unanswered'}`}
              >
                <div className="question-review-header">
                  <div className="q-header-left">
                    {q.icon && <span className="q-topic-icon">{q.icon}</span>}
                    <span className="question-num">Pregunta {q.idx + 1}</span>
                  </div>
                  <span className={`status-badge ${isCorrect ? 'badge-correct' : isWrong ? 'badge-wrong' : 'badge-unanswered'}`}>
                    {isCorrect ? '✅ Correcta' : isWrong ? '❌ Incorrecta' : '⬜ Sin responder'}
                  </span>
                </div>

                {/* Context if present */}
                {q.context && (
                  <div className="review-context">
                    <span className="context-label">📄 Texto de referencia</span>
                    <p>{q.context}</p>
                  </div>
                )}

                <p className="review-question-text">{q.text}</p>

                <div className="review-options">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAnswer === optIdx;
                    const isRightAnswer = q.correct === optIdx;

                    let optClass = 'review-option';
                    if (isRightAnswer) optClass += ' option-correct-answer';
                    else if (isUserChoice && !isRightAnswer) optClass += ' option-user-wrong';

                    return (
                      <div key={optIdx} className={optClass}>
                        <div className={`review-option-letter ${isRightAnswer ? 'letter-correct' : isUserChoice ? 'letter-wrong' : ''}`}>
                          {OPTION_LETTERS[optIdx]}
                        </div>
                        <span className="review-option-text">{opt}</span>
                        <div className="answer-markers">
                          {isRightAnswer && <span className="answer-marker correct-marker">✅ Correcta</span>}
                          {isUserChoice && !isRightAnswer && <span className="answer-marker wrong-marker">Tu respuesta</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation for wrong or unanswered */}
                {(isWrong || !isAnswered) && q.explanation && (
                  <div className="explanation-section">
                    <button
                      className="explanation-toggle"
                      onClick={() => toggleExplanation(q.idx)}
                    >
                      💡 {showExp ? 'Ocultar explicación' : 'Ver explicación'}
                    </button>
                    {showExp && (
                      <div className="explanation-box">
                        <ExplanationRenderer text={q.explanation} areaId={selectedArea} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Review;
