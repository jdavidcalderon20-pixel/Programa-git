import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './AreaSelection.css';

const areaColors = {
  matematicas: '#3b82f6',
  lectura_critica: '#8b5cf6',
  sociales: '#10b981',
  ciencias_naturales: '#f59e0b',
  ingles: '#ef4444'
};

function AreaSelection() {
  const navigate = useNavigate();
  const { studentName, areasStatus, areaScores, completeGlobalExam, examFinished, resetExam, examMode, questions, areaKeyMap } = useApp();

  const areas = [
    { id: 'matematicas', name: 'Matemáticas', icon: '📐' },
    { id: 'lectura_critica', name: 'Lectura Crítica', icon: '📖' },
    { id: 'sociales', name: 'Sociales y Ciudadanas', icon: '🌍' },
    { id: 'ciencias_naturales', name: 'Ciencias Naturales', icon: '🔬' },
    { id: 'ingles', name: 'Inglés', icon: '🗣️' }
  ];

  const handleFinishGlobal = () => {
    completeGlobalExam();
    navigate('/results');
  };

  if (examFinished) {
    navigate('/results');
    return null;
  }

  const handleRestart = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo el simulacro? Perderás tu progreso actual.')) {
      resetExam();
      navigate('/');
    }
  };

  const completedCount = Object.values(areasStatus).filter(s => s === 'completed').length;

  return (
    <div className="areas-container fade-in">
      <div className="header-section glass-card">
        <div className="header-left">
          <h2>Hola, <span className="text-gradient">{studentName || 'Estudiante'}</span></h2>
          <p className="subtitle">Selecciona un área para comenzar.</p>
        </div>
        <div className="header-right">
          {examMode === 'pro' && <span className="pro-badge">🏆 MODO PRO</span>}
          <div className="progress-summary">
            <span className="progress-num">{completedCount}/5</span>
            <span className="progress-label">Áreas completadas</span>
          </div>
        </div>
      </div>

      <div className="areas-grid">
        {areas.map(area => {
          const isCompleted = areasStatus[area.id] === 'completed';
          const score = areaScores[area.id];
          const color = areaColors[area.id];
          const totalQ = (questions[areaKeyMap[area.id]] || []).length;

          return (
            <div
              key={area.id}
              className={`glass-card area-card ${isCompleted ? 'area-completed' : 'area-pending'}`}
              onClick={() => { if (!isCompleted) navigate(`/exam/${area.id}`); }}
              style={{ cursor: isCompleted ? 'default' : 'pointer' }}
            >
              <div className="area-icon" style={{ backgroundColor: `${color}20`, color }}>
                {area.icon}
              </div>
              <div className="area-info">
                <h3>{area.name}</h3>
                {isCompleted && score ? (
                  <div className="area-score-display">
                    <div className="score-pct" style={{ color }}>{score.scorePercent}%</div>
                    <div className="score-detail">{score.correctCount}/{score.total} correctas</div>
                  </div>
                ) : (
                  <p className="area-status-text">{totalQ} preguntas</p>
                )}
              </div>
              <div className="area-status-badge">
                {isCompleted ? (
                  <span className="badge-completed">✓ Completado</span>
                ) : (
                  <button className="btn-primary start-area-btn" onClick={(e) => { e.stopPropagation(); navigate(`/exam/${area.id}`); }}>
                    Iniciar
                  </button>
                )}
              </div>
              {isCompleted && score && (
                <div className="area-mini-bar">
                  <div
                    className="area-mini-fill"
                    style={{ width: `${score.scorePercent}%`, background: color }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="actions-section">
        <button className="btn-primary" onClick={handleFinishGlobal}>
          🏁 Finalizar Examen y Ver Resultados
        </button>
        <button
          className="btn-secondary"
          onClick={handleRestart}
          style={{ backgroundColor: '#ef4444', color: 'white', borderColor: '#ef4444' }}
        >
          🔄 Reiniciar Simulacro
        </button>
      </div>
    </div>
  );
}

export default AreaSelection;
