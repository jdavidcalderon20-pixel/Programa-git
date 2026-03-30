import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatMathText } from '../utils/formatters';
import './ExamSession.css';

function ExamSession() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const { questions, finishArea, globalTimeLeft, examFinished, areaKeyMap, examMode } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const jsonKey = areaKeyMap[areaId];
  const areaQuestions = questions[jsonKey] || [];

  const areaIcons = {
    matematicas: '📐',
    lectura_critica: '📖',
    sociales: '🌍',
    ciencias_naturales: '🔬',
    ingles: '🗣️'
  };

  const areaIcon = areaIcons[areaId] || '📋';

  useEffect(() => {
    if (examFinished) {
      navigate('/results');
    }
  }, [examFinished, navigate]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (areaQuestions.length === 0) {
    return <div>No hay preguntas para esta área.</div>;
  }

  const currentQuestion = areaQuestions[currentQuestionIndex];

  const handleSelectOption = (index) => {
    setAnswers({ ...answers, [currentQuestionIndex]: index });
  };

  const handleFinishArea = () => {
    finishArea(areaId, answers);
    navigate(`/area-score/${areaId}`);
  };

  const handleNext = () => {
    if (currentQuestionIndex < areaQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirm(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Jump to question by index
  const handleJump = (idx) => {
    setCurrentQuestionIndex(idx);
  };

  const progress = ((currentQuestionIndex + 1) / areaQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = globalTimeLeft < 1800; // less than 30 min

  return (
    <div className="exam-container fade-in">
      {/* Header */}
      <div className="exam-header glass-card">
        <div className="exam-info">
          <h2>{areaIcon} <span className="area-name">{jsonKey}</span></h2>
          <div className="exam-meta">
            <span className="question-counter">Pregunta {currentQuestionIndex + 1} de {areaQuestions.length}</span>
            <span className="answered-count">Respondidas: {answeredCount}/{areaQuestions.length}</span>
            {examMode === 'pro' && <span className="mode-indicator">🏆 PRO</span>}
          </div>
        </div>
        <div className={`timer ${isTimeCritical ? 'timer-critical' : globalTimeLeft < 3600 ? 'timer-warning' : ''}`}>
          ⏱️ {formatTime(globalTimeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Navigator */}
      <div className="question-navigator glass-card">
        {areaQuestions.map((_, idx) => (
          <button
            key={idx}
            className={`nav-dot ${idx === currentQuestionIndex ? 'nav-dot-current' : ''} ${answers[idx] !== undefined ? 'nav-dot-answered' : ''}`}
            onClick={() => handleJump(idx)}
            title={`Pregunta ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Context Passage (if any) */}
      {currentQuestion.context && (
        <div className="context-passage glass-card">
          <div className="context-header">
            <span className="context-label">📄 Texto de referencia</span>
            {currentQuestion.contextTitle && <span className="context-title">{currentQuestion.contextTitle}</span>}
          </div>
          <div className="context-text">
            {currentQuestion.context}
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="question-card glass-card">
        <div className="question-header-row">
          {currentQuestion.icon && <span className="question-icon">{currentQuestion.icon}</span>}
          <span className="question-number">Pregunta {currentQuestionIndex + 1}</span>
        </div>
        <div className="question-text">
          <p>{formatMathText(currentQuestion.text, areaId)}</p>
        </div>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers[currentQuestionIndex] === index;
            const letter = String.fromCharCode(65 + index);
            return (
              <div
                key={index}
                className={`option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(index)}
              >
                <div className="option-letter">{letter}</div>
                <div className="option-text">{formatMathText(option, areaId)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="exam-controls">
        <button className="btn-secondary" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          ← Anterior
        </button>
        <button className="btn-primary" onClick={handleNext}>
          {currentQuestionIndex === areaQuestions.length - 1 ? 'Finalizar Área ✓' : 'Siguiente →'}
        </button>
      </div>

      {/* Finish Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-box glass-card" onClick={e => e.stopPropagation()}>
            <h3>¿Finalizar esta área?</h3>
            <p>Has respondido <strong>{answeredCount}</strong> de <strong>{areaQuestions.length}</strong> preguntas.</p>
            {answeredCount < areaQuestions.length && (
              <p className="modal-warning">⚠️ Tienes {areaQuestions.length - answeredCount} preguntas sin responder.</p>
            )}
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleFinishArea}>✓ Sí, finalizar área</button>
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>Seguir respondiendo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamSession;
