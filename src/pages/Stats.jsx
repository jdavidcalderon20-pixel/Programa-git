import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getExamHistory } from '../firebase';
import { LEVEL_XP, LEVEL_NAMES, LEVEL_COLORS } from '../firebase';
import './Stats.css';

const AREA_ICONS = {
  'Matemáticas': '📐', 'Lectura Crítica': '📖',
  'Sociales y Ciudadanas': '🌍', 'Ciencias Naturales': '🔬', 'Inglés': '🗣️',
};

function Stats() {
  const { currentUser, userProfile, getLevelInfo } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getExamHistory(currentUser.uid).then(h => { setHistory(h); setLoading(false); });
    }
  }, [currentUser]);

  const levelInfo = getLevelInfo();

  // Compute stats
  const byType = {};
  history.forEach(h => {
    const t = h.type || 'other';
    if (!byType[t]) byType[t] = [];
    byType[t].push(h);
  });

  // Area averages
  const areaStats = {};
  history.forEach(h => {
    if (h.areaStats) {
      Object.entries(h.areaStats).forEach(([area, s]) => {
        if (!areaStats[area]) areaStats[area] = { correct: 0, total: 0 };
        areaStats[area].correct += s.correct;
        areaStats[area].total += s.total;
      });
    }
    if (h.area && h.area !== 'Todas las Materias' && h.correct !== undefined) {
      if (!areaStats[h.area]) areaStats[h.area] = { correct: 0, total: 0 };
      areaStats[h.area].correct += h.correct;
      areaStats[h.area].total += h.numQuestions || 0;
    }
  });

  const avgScore = history.length > 0
    ? Math.round(history.reduce((acc, h) => acc + (h.score || 0), 0) / history.length)
    : 0;

  const levelXPNeeded = LEVEL_XP[Math.min(levelInfo.nivel + 1, 5)];

  return (
    <div className="stats-container fade-in">
      <div className="stats-header glass-card">
        <h1 className="text-gradient">📊 Mis Estadísticas</h1>
        <p>Resumen de tu progreso en la plataforma</p>
      </div>

      {/* Level & XP */}
      <div className="stats-level-card glass-card">
        <div className="slc-left">
          <div className="slc-avatar" style={{ background: levelInfo.color }}>
            {userProfile?.displayName?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h2>{userProfile?.displayName || 'Estudiante'}</h2>
            <span className="slc-level-badge" style={{ color: levelInfo.color }}>
              ⭐ Nivel {levelInfo.nivel} · {levelInfo.name}
            </span>
          </div>
        </div>
        <div className="slc-right">
          <div className="slc-xp-row">
            <span>{levelInfo.currentXP} XP</span>
            <span className="slc-next-xp">{levelInfo.nivel < 5 ? `→ ${levelXPNeeded} XP` : 'MAX'}</span>
          </div>
          <div className="slc-bar">
            <div className="slc-fill" style={{ width: `${levelInfo.progress}%`, background: levelInfo.color }}></div>
          </div>
          {userProfile?.streak > 0 && (
            <div className="slc-streak">🔥 Racha: {userProfile.streak} día{userProfile.streak !== 1 ? 's' : ''}</div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="stats-quick-grid">
        <div className="stats-quick-item glass-card">
          <span className="sqi-icon">📝</span>
          <strong>{history.length}</strong>
          <p>Intentos totales</p>
        </div>
        <div className="stats-quick-item glass-card">
          <span className="sqi-icon">📈</span>
          <strong>{avgScore}%</strong>
          <p>Promedio general</p>
        </div>
        <div className="stats-quick-item glass-card">
          <span className="sqi-icon">⚡</span>
          <strong>{(byType.quick_quiz || []).length}</strong>
          <p>Quizzes hechos</p>
        </div>
        <div className="stats-quick-item glass-card">
          <span className="sqi-icon">🏃</span>
          <strong>{(byType.daily_practice || []).length}</strong>
          <p>Prácticas del día</p>
        </div>
        <div className="stats-quick-item glass-card">
          <span className="sqi-icon">⭐</span>
          <strong>{levelInfo.currentXP}</strong>
          <p>XP total</p>
        </div>
        <div className="stats-quick-item glass-card">
          <span className="sqi-icon">🔥</span>
          <strong>{userProfile?.streak || 0}</strong>
          <p>Días de racha</p>
        </div>
      </div>

      {/* Area performance */}
      {Object.keys(areaStats).length > 0 && (
        <div className="stats-area-card glass-card">
          <h3>Rendimiento por Materia</h3>
          <div className="stats-areas">
            {Object.entries(areaStats).map(([area, s]) => {
              const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
              const color = pct >= 70 ? '#34d399' : pct >= 50 ? '#f59e0b' : '#f87171';
              return (
                <div key={area} className="stats-area-row">
                  <span className="sar-icon">{AREA_ICONS[area] || '📋'}</span>
                  <span className="sar-name">{area}</span>
                  <div className="sar-bar">
                    <div className="sar-fill" style={{ width: `${pct}%`, background: color }}></div>
                  </div>
                  <span className="sar-pct" style={{ color }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent scores */}
      {history.length > 0 && (
        <div className="stats-recent-card glass-card">
          <h3>Últimos 10 Intentos</h3>
          <div className="stats-scores-list">
            {history.slice(0, 10).map((h, i) => (
              <div key={h.id} className="ssl-item">
                <span className="ssl-idx">{i + 1}</span>
                <span className="ssl-type">{h.type === 'quick_quiz' ? '⚡' : h.type === 'daily_practice' ? '🏃' : '🎓'}</span>
                <span className="ssl-score" style={{ color: (h.score || 0) >= 70 ? '#34d399' : '#f59e0b' }}>
                  {h.score ?? '—'}%
                </span>
                <span className="ssl-date">{new Date(h.createdAt || h.date).toLocaleDateString('es-CO')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
