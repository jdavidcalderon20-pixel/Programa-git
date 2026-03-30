import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DailyMissions.css';

const MISSIONS = [
  { id: 'complete_quiz', icon: '⚡', title: 'Quiz Rápido', desc: 'Completa un Quiz Rápido de cualquier tamaño', xp: 20 },
  { id: 'study_topic', icon: '📚', title: 'Estudia un Tema', desc: 'Lee un tema completo en el módulo de estudio', xp: 15 },
  { id: 'daily_practice', icon: '🏃', title: 'Práctica del Día', desc: 'Completa la Práctica del Día (30 preguntas)', xp: 50 },
  { id: 'score_70', icon: '💯', title: 'Puntaje de Oro', desc: 'Obtén 70% o más en cualquier examen o quiz', xp: 30 },
  { id: 'simulacro', icon: '🏆', title: 'Simulacro Completo', desc: 'Completa un Simulacro Básico o Pro', xp: 100 },
];

function DailyMissions() {
  const { dailyMissions, userProfile, getLevelInfo } = useAuth();
  const navigate = useNavigate();
  const levelInfo = getLevelInfo();
  const completed = MISSIONS.filter(m => dailyMissions[m.id]).length;
  const totalXPAvailable = MISSIONS.reduce((a, m) => a + m.xp, 0);
  const xpEarned = MISSIONS.filter(m => dailyMissions[m.id]).reduce((a, m) => a + m.xp, 0);

  const today = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleMissionAction = (mission) => {
    const routes = {
      complete_quiz: '/quick-quiz',
      study_topic: '/study',
      daily_practice: '/daily-practice',
      score_70: '/quick-quiz',
      simulacro: '/',
    };
    navigate(routes[mission.id] || '/');
  };

  return (
    <div className="missions-container fade-in">
      <div className="missions-header glass-card">
        <div className="missions-title-row">
          <div>
            <h1 className="text-gradient">🎯 Misiones Diarias</h1>
            <p className="missions-date">{today}</p>
          </div>
          <div className="missions-progress-summary">
            <div className="mp-circle">
              <svg viewBox="0 0 36 36" className="mp-svg">
                <path className="mp-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="mp-fill" strokeDasharray={`${(completed / MISSIONS.length) * 100}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text x="18" y="21" className="mp-text">{completed}/{MISSIONS.length}</text>
              </svg>
            </div>
            <div className="mp-xp">+{xpEarned} XP ganados</div>
          </div>
        </div>

        <div className="missions-xp-bar-row">
          <span>XP del día: {xpEarned} / {totalXPAvailable}</span>
          <div className="missions-xp-bar">
            <div className="mxb-fill" style={{ width: `${totalXPAvailable > 0 ? (xpEarned / totalXPAvailable) * 100 : 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Level bar */}
      <div className="level-card glass-card">
        <div className="lc-header">
          <span style={{ color: levelInfo.color }}>⭐ Nv.{levelInfo.nivel} — {levelInfo.name}</span>
          <span className="lc-xp">{levelInfo.currentXP} XP</span>
        </div>
        <div className="lc-bar">
          <div className="lc-fill" style={{ width: `${levelInfo.progress}%`, background: levelInfo.color }}></div>
        </div>
        <p className="lc-next">
          {levelInfo.nivel < 5
            ? `Faltan ${levelInfo.nextXP - levelInfo.currentXP} XP para el siguiente nivel`
            : '¡Nivel máximo alcanzado! 🏆'}
        </p>
      </div>

      <div className="missions-grid">
        {MISSIONS.map(mission => {
          const done = !!dailyMissions[mission.id];
          return (
            <div
              key={mission.id}
              className={`mission-card glass-card ${done ? 'mission-done' : 'mission-pending'}`}
              onClick={() => handleMissionAction(mission)}
            >
              <div className="mission-icon-wrap">
                <span className="mission-icon">{mission.icon}</span>
                {done && <span className="mission-check">✓</span>}
              </div>
              <div className="mission-info">
                <h3>{mission.title}</h3>
                <p>{mission.desc}</p>
              </div>
              <div className="mission-xp-badge" style={{ opacity: done ? 0.5 : 1 }}>
                +{mission.xp} XP
              </div>
              {!done && (
                <div className="mission-cta">Ir →</div>
              )}
            </div>
          );
        })}
      </div>

      {completed === MISSIONS.length && (
        <div className="all-done-banner glass-card">
          <span>🎉</span>
          <div>
            <strong>¡Misiones completadas!</strong>
            <p>Ganaste {xpEarned} XP hoy. ¡Vuelve mañana para más misiones!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyMissions;
