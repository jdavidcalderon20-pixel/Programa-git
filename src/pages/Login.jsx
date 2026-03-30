import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Zap, BookOpen, Star, X } from 'lucide-react';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNequiModal, setShowNequiModal] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Email o contraseña incorrectos.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El email no es válido.');
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="login-page-wrapper">
        {/* Landing Section */}
        <div className="landing-section">
          <h1 className="landing-title text-gradient">Prepárate para el éxito en el ICFES</h1>
          <p className="landing-subtitle">La plataforma más completa para dominar las pruebas Saber 11 con tecnología de IA.</p>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon"><Zap size={24} /></div>
              <div className="benefit-content">
                <h3>Simulacros con Rotación</h3>
                <p>Preguntas que cambian en cada intento para una práctica real y variada.</p>
              </div>
            </div>
              <div className="benefit-item">
                <div className="benefit-icon"><Star size={24} /></div>
                <div className="benefit-content">
                  <h3>Explicaciones</h3>
                  <p>Entiende tus errores con tutoría detallada (Análisis, Procedimiento y Conclusión).</p>
                </div>
              </div>
            <div className="benefit-item">
              <div className="benefit-icon"><BookOpen size={24} /></div>
              <div className="benefit-content">
                <h3>Material de Práctica</h3>
                <p>Acceso a material práctico de estudio especializado por cada materia.</p>
              </div>
            </div>
          </div>

          <div className="price-container">
            <span className="price-label">Oferta de Lanzamiento</span>
            <div className="price-value">$10.000 <span>/ MES</span></div>
          </div>

          <button className="btn-pro-cta" onClick={() => setShowNequiModal(true)}>
            ¡Activa tu Modo PRO ahora! <Zap size={20} fill="white" />
          </button>
        </div>

        {/* Login Form */}
        <div className="auth-card glass-card">
          <div className="auth-logo">🎓</div>
          <h2 className="text-gradient">Iniciar Sesión</h2>
          <p className="auth-subtitle">Ingresa a tu panel de estudio</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label htmlFor="email">📧 Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-input-group">
              <label htmlFor="password">🔒 Contraseña</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Iniciando...' : 'Entrar a mi cuenta →'}
            </button>
          </form>

          <div className="auth-divider"><span>¿Nuevo por aquí?</span></div>
          <Link to="/register" className="btn-secondary auth-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Crear Cuenta Gratis
          </Link>
        </div>
      </div>

      {/* Nequi Modal */}
      {showNequiModal && (
        <div className="nequi-modal-overlay" onClick={() => setShowNequiModal(false)}>
          <div className="nequi-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowNequiModal(false)}><X /></button>
            <div className="nequi-logo">N</div>
            <h2>Activa tu Modo PRO</h2>
            <p>Sigue estos pasos para activar tu suscripción mediante <strong>Nequi</strong>:</p>
            
            <div className="nequi-steps">
              <div className="nequi-step">
                <div className="step-number">1</div>
                <div>Envía <strong>$10.000</strong> al número <strong>3215685254</strong></div>
              </div>
              <div className="nequi-step">
                <div className="step-number">2</div>
                <div>Toma una captura de pantalla del comprobante de pago.</div>
              </div>
              <div className="nequi-step">
                <div className="step-number">3</div>
                <div>Envía el comprobante por WhatsApp al número <strong>3215685254</strong> con tu correo.</div>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#a78bfa' }}>
              Tu cuenta será activada manualmente en menos de 30 minutos.
            </p>

            <button className="btn-nequi-done" onClick={() => setShowNequiModal(false)}>
              Ya realicé el pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
