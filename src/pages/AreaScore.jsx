import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './AreaScore.css';

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

const AREAS_ORDER = ['matematicas', 'lectura_critica', 'sociales', 'ciencias_naturales', 'ingles'];

function AreaScore() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const { areaScores, areasStatus } = useApp();

  const score = areaScores[areaId] || { correctCount: 0, total: 0, scorePercent: 0 };
  const areaName = areaKeyMap[areaId] || areaId;
  const icon = areaIcons[areaId] || '📋';
  const color = areaColors[areaId] || '#6366f1';

  const getPerformance = (pct) => {
    if (pct >= 80) return { label: '¡Excelente! 🌟', cls: 'perf-excellent', msg: 'Dominas muy bien esta área. ¡Sigue así!' };
    if (pct >= 60) return { label: 'Bueno 👍', cls: 'perf-good', msg: 'Buen desempeño. Repasa los conceptos que fallaste.' };
    if (pct >= 40) return { label: 'Regular ⚠️', cls: 'perf-regular', msg: 'Debes reforzar varios temas de esta área.' };
    return { label: 'Necesita mejorar ❌', cls: 'perf-low', msg: 'Te recomendamos estudiar más esta área antes del examen.' };
  };

  const perf = getPerformance(score.scorePercent);

  // Find the next pending area
  const currentIdx = AREAS_ORDER.indexOf(areaId);
  let nextPendingArea = null;
  for (let i = currentIdx + 1; i < AREAS_ORDER.length; i++) {
    if (areasStatus[AREAS_ORDER[i]] !== 'completed') {
      nextPendingArea = AREAS_ORDER[i];
      break;
    }
  }
  // Also check earlier ones
  if (!nextPendingArea) {
    for (let i = 0; i < currentIdx; i++) {
      if (areasStatus[AREAS_ORDER[i]] !== 'completed') {
        nextPendingArea = AREAS_ORDER[i];
        break;
      }
    }
  }

  const allCompleted = AREAS_ORDER.every(a => areasStatus[a] === 'completed');

  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (score.scorePercent / 100) * circumference;

  return (
    <div className="area-score-container fade-in">
      <div className="area-score-header glass-card" style={{ '--area-color': color }}>
        <div className="area-score-icon">{icon}</div>
        <h1>{areaName}</h1>
        <p className="area-score-subtitle">Área completada</p>
      </div>

      <div className="area-score-main glass-card">
        <div className="score-gauge-wrapper">
          <svg viewBox="0 0 120 120" className="score-gauge">
            <circle cx="60" cy="60" r="52" className="gauge-bg" />
            <circle
              cx="60" cy="60" r="52"
              className="gauge-fill"
              stroke={color}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ '--dash-offset': dashOffset }}
            />
            <text x="60" y="56" className="gauge-pct">{score.scorePercent}%</text>
            <text x="60" y="72" className="gauge-label">{score.correctCount}/{score.total}</text>
          </svg>
        </div>

        <div className={`perf-badge ${perf.cls}`}>{perf.label}</div>

        <div className="score-stats">
          <div className="stat-box stat-correct">
            <span className="stat-num">{score.correctCount}</span>
            <span className="stat-label">✅ Correctas</span>
          </div>
          <div className="stat-box stat-wrong">
            <span className="stat-num">{score.total - score.correctCount}</span>
            <span className="stat-label">❌ Incorrectas</span>
          </div>
          <div className="stat-box stat-total">
            <span className="stat-num">{score.total}</span>
            <span className="stat-label">📋 Total</span>
          </div>
        </div>

        <div className="perf-message">{perf.msg}</div>
      </div>

      <div className="area-score-actions">
        {allCompleted ? (
          <button className="btn-primary btn-lg" onClick={() => navigate('/results')}>
            🏁 Ver Resultados Finales
          </button>
        ) : nextPendingArea ? (
          <button className="btn-primary btn-lg" onClick={() => navigate(`/exam/${nextPendingArea}`)}>
            {areaIcons[nextPendingArea]} Continuar con {areaKeyMap[nextPendingArea]} →
          </button>
        ) : (
          <button className="btn-primary btn-lg" onClick={() => navigate('/areas')}>
            📋 Ver Todas las Áreas
          </button>
        )}

        <button className="btn-secondary" onClick={() => navigate('/areas')}>
          📋 Seleccionar Área Manualmente
        </button>

        <button className="btn-review" onClick={() => navigate(`/review?area=${areaId}`)}>
          🔍 Revisar Mis Respuestas de Esta Área
        </button>
      </div>
    </div>
  );
}

export default AreaScore;
