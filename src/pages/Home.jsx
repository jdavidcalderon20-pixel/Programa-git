import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import './Home.css';
import './HomeDashboard.css';

function Home() {
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const navigate = useNavigate();
  const { startExam, resetExam } = useApp();
  const { currentUser, userProfile, getLevelInfo, dailyMissions } = useAuth();

  const levelInfo = getLevelInfo();
  const missionsCompleted = Object.values(dailyMissions).filter(Boolean).length;

  const handleStartWithMode = (mode) => {
    if (!userProfile?.isPro) {
      setShowProModal(true);
      return;
    }
    startExam(userProfile?.displayName || 'Estudiante', mode);
    navigate('/areas');
  };

  const handleActionClick = (route) => {
    if (route === '/daily-practice' && !userProfile?.isPro) {
      setShowProModal(true);
      return;
    }
    navigate(route);
  };

  const handleWhatsApp = () => {
    const msg = `Hola Juan David, soy ${userProfile?.displayName || currentUser?.email}, acabo de pagar el acceso PRO. Mi correo es: ${currentUser?.email}`;
    window.open(`https://wa.me/573215685254?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const quickActions = [
    { icon: '🎯', label: 'Misiones Diarias', sub: `${missionsCompleted}/5 completadas`, route: '/missions', color: '#a78bfa' },
    { icon: '⚡', label: 'Quiz Rápido', sub: '5, 10 o 20 preguntas', route: '/quick-quiz', color: '#60a5fa' },
    { icon: '🏃', label: 'Práctica del Día', sub: '30 preguntas • 45 min', route: '/daily-practice', color: '#34d399' },
    { icon: '📚', label: 'Estudiar', sub: '5 materias disponibles', route: '/study', color: '#f59e0b' },
    { icon: '📋', label: 'Mi Historial', sub: 'Ver mis intentos', route: '/history', color: '#f87171' },
    { icon: '📊', label: 'Estadísticas', sub: 'Mi progreso', route: '/stats', color: '#fb923c' },
  ];

  const renderProModal = () => {
    if (!showProModal) return null;
    return (
      <div className="modal-overlay" onClick={() => setShowProModal(false)}>
        <div className="modal-box glass-card" onClick={e => e.stopPropagation()}>
          <h2 className="text-gradient" style={{marginBottom: '10px'}}>🌟 Activa tu modo PRO</h2>
          <p style={{fontSize: '1.05em', marginBottom: '15px'}}>
            Desbloquea el <strong>Simulacro Completo</strong>, la <strong>Práctica del Día</strong> y accede a las preguntas oficiales exclusivas por un único pago de <strong>$10.000 COP</strong>.
          </p>
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
            <p style={{margin: 0, fontWeight: 'bold'}}>Transfiere a Nequi:</p>
            <h3 style={{margin: '5px 0', color: 'var(--primary-color)'}}>3215685254</h3>
            <p style={{margin: 0, fontSize: '0.9em', color: 'var(--text-muted)'}}>A nombre de: <strong>Juan David Cardona</strong></p>
            <img 
              src="/nequi-qr.jpg" 
              alt="QR Nequi Juan Cardona" 
              style={{width: '200px', borderRadius: '10px', margin: '15px auto', display: 'block', border: '2px solid rgba(255,255,255,0.2)'}} 
            />
            <p style={{margin: 0, fontSize: '0.85em', color: 'var(--text-muted)'}}>
              Por favor, envía el comprobante de pago por WhatsApp a este mismo número para confirmar y activar tu cuenta al instante.
            </p>
          </div>
          
          <div className="modal-actions" style={{ flexDirection: 'column', gap: '10px' }}>
            <button 
              className="btn-primary" 
              style={{width: '100%', background: '#25D366', borderColor: '#25D366'}} 
              onClick={handleWhatsApp}
            >
              Enviar comprobante por WhatsApp
            </button>
            <button className="btn-secondary" style={{width: '100%'}} onClick={() => setShowProModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showModeSelect) {
    return (
      <div className="home-container fade-in">
        <div className="glass-card hero-card mode-select-card">
          <h2>Elige tu <span className="text-gradient">Modo de Simulacro</span></h2>
          <p className="subtitle">Selecciona el modo que mejor se adapte a tu preparación.</p>
          <div className="mode-cards">
            <div className="mode-card mode-basic" onClick={() => handleStartWithMode('basic')}>
              <div className="mode-card-icon">🎓</div>
              <h3>Modo Básico</h3>
              <div className="mode-details">
                <div className="mode-detail-item">📝 ~20 preguntas por área</div>
                <div className="mode-detail-item">⏱️ 4 horas disponibles</div>
                <div className="mode-detail-item">✅ Ideal para práctica rápida</div>
                <div className="mode-detail-item">🔄 Preguntas rotativas</div>
              </div>
              <button className="btn-mode btn-mode-basic">Iniciar Básico</button>
            </div>
            <div className="mode-card mode-pro" onClick={() => handleStartWithMode('pro')}>
              <div className="mode-card-icon">🏆</div>
              <h3>Modo Pro</h3>
              <div className="mode-badge-pro">RECOMENDADO</div>
              <div className="mode-details">
                <div className="mode-detail-item">📝 200 Preguntas PRO (40 por área)</div>
                <div className="mode-detail-item">⏱️ 4 horas 30 min (tiempo real)</div>
                <div className="mode-detail-item">📖 Textos de contexto extensos</div>
                <div className="mode-detail-item">🎯 Simulacro auténtico ICFES</div>
              </div>
              <button className="btn-mode btn-mode-pro">Iniciar Pro</button>
            </div>
          </div>
          <button className="btn-secondary back-btn" onClick={() => setShowModeSelect(false)}>← Volver</button>
        </div>
        {renderProModal()}
      </div>
    );
  }

  return (
    <div className="home-container fade-in">
      {/* Welcome bar */}
      <div className="home-welcome glass-card">
        <div className="hw-left">
          <h1>¡Hola, <span className="text-gradient">{userProfile?.displayName?.split(' ')[0] || 'Estudiante'}</span>! 👋</h1>
          <p>¿Listo para estudiar hoy?</p>
        </div>
        <div className="hw-right">
          <div className="hw-level" style={{ color: levelInfo.color }}>
            ⭐ Nv.{levelInfo.nivel} · {levelInfo.name}
            {userProfile?.isPro && <span style={{marginLeft: '10px', background: 'var(--primary-color)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75em', fontWeight: 'bold', textShadow: 'none'}}>PRO 🌟</span>}
          </div>
          <div className="hw-xp-bar">
            <div className="hw-xp-fill" style={{ width: `${levelInfo.progress}%`, background: levelInfo.color }}></div>
          </div>
          <p className="hw-xp-text">{levelInfo.currentXP} XP</p>
        </div>
      </div>

      {/* Quick actions grid */}
      <div className="home-quick-grid">
        {quickActions.map(action => (
          <div key={action.route} className="home-action-card glass-card"
            style={{ borderTop: `3px solid ${action.color}` }}
            onClick={() => handleActionClick(action.route)}>
            <span className="hac-icon">{action.icon}</span>
            <h3>{action.label}</h3>
            <p>{action.sub}</p>
          </div>
        ))}
      </div>

      {/* Full simulacro CTA */}
      <div className="home-simulacro-cta glass-card">
        <div className="hsc-text">
          <h2>🏆 Simulacro Completo ICFES</h2>
          <p>Realiza un simulacro completo con todas las áreas: Matemáticas, Lectura Crítica, Sociales, Ciencias e Inglés.</p>
        </div>
        <button className="btn-primary hsc-btn" onClick={() => setShowModeSelect(true)}>
          Iniciar Simulacro →
        </button>
      </div>

      {/* PRO Modal */}
      {renderProModal()}
    </div>
  );
}

export default Home;
