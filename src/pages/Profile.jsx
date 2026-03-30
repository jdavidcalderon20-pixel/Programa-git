import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LEVEL_NAMES, LEVEL_COLORS, LEVEL_XP } from '../firebase';
import './Profile.css';

const MISSIONS_LABELS = {
  complete_quiz: { icon: '⚡', label: 'Quiz Completado' },
  study_topic: { icon: '📚', label: 'Tema Estudiado' },
  daily_practice: { icon: '🏃', label: 'Práctica del Día' },
  score_70: { icon: '💯', label: 'Puntaje 70%+' },
  simulacro: { icon: '🏆', label: 'Simulacro' },
};

function Profile() {
  const { currentUser, userProfile, getLevelInfo, dailyMissions, logout } = useAuth();
  const navigate = useNavigate();

  if (!userProfile) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando perfil...</div>;

  const levelInfo = getLevelInfo();
  const nextLevel = levelInfo.nivel < 5 ? LEVEL_NAMES[levelInfo.nivel + 1] : 'Nivel Máximo';
  const nextLevelColor = LEVEL_COLORS[Math.min(levelInfo.nivel + 1, 5)];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const missionsToday = Object.keys(dailyMissions).filter(k => dailyMissions[k]).length;

  return (
    <div className="profile-container fade-in">
      {/* Avatar card */}
      <div className="profile-hero glass-card">
        <div className="ph-avatar" translate="no" style={{ background: `linear-gradient(135deg, ${levelInfo.color}, ${nextLevelColor})` }}>
          <span translate="no">{userProfile?.displayName?.trim() ? userProfile.displayName[0].toUpperCase() : (userProfile?.email?.[0].toUpperCase() || 'U')}</span>
        </div>
        <div className="ph-info">
          <h1>{userProfile.displayName}</h1>
          <p className="ph-email">{currentUser?.email}</p>
          <div className="ph-level-badge" style={{ color: levelInfo.color, borderColor: levelInfo.color }}>
            ⭐ Nivel {levelInfo.nivel} — {levelInfo.name}
          </div>
        </div>
      </div>

      {/* XP bar */}
      <div className="profile-xp-card glass-card">
        <div className="pxp-row">
          <span style={{ color: levelInfo.color }}>⭐ {levelInfo.name}</span>
          {levelInfo.nivel < 5 && <span style={{ color: nextLevelColor }}>→ {nextLevel}</span>}
        </div>
        <div className="pxp-bar">
          <div className="pxp-fill" style={{ width: `${levelInfo.progress}%`, background: levelInfo.color }}></div>
        </div>
        <div className="pxp-details">
          <span>{levelInfo.currentXP} XP</span>
          <span>{levelInfo.nivel < 5 ? `${levelInfo.nextXP - levelInfo.currentXP} XP para el siguiente nivel` : '¡Nivel máximo!'}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="profile-stats-grid">
        <div className="psg-item glass-card">
          <span>⭐</span>
          <strong>{levelInfo.currentXP}</strong>
          <p>XP Total</p>
        </div>
        <div className="psg-item glass-card">
          <span>🔥</span>
          <strong>{userProfile.streak || 0}</strong>
          <p>Racha de días</p>
        </div>
        <div className="psg-item glass-card">
          <span>🎯</span>
          <strong>{missionsToday}/5</strong>
          <p>Misiones hoy</p>
        </div>
        <div className="psg-item glass-card">
          <span>📅</span>
          <strong>{new Date(userProfile.createdAt).toLocaleDateString('es-CO', { month: 'short', year: 'numeric' })}</strong>
          <p>Miembro desde</p>
        </div>
      </div>

      {/* Today missions */}
      <div className="profile-missions glass-card">
        <h3>🎯 Misiones de hoy</h3>
        <div className="pm-list">
          {Object.entries(MISSIONS_LABELS).map(([id, m]) => (
            <div key={id} className={`pm-item ${dailyMissions[id] ? 'pm-done' : ''}`}>
              <span>{m.icon}</span>
              <span>{m.label}</span>
              {dailyMissions[id] && <span className="pm-check">✓</span>}
            </div>
          ))}
        </div>
      </div>

      <button className="btn-secondary profile-logout" onClick={handleLogout}>
        ⎋ Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;
