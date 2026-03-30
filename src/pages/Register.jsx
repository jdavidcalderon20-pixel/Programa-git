import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Las contraseñas no coinciden.');
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (!displayName.trim()) return setError('Ingresa tu nombre.');
    setLoading(true);
    try {
      await register(email, password, displayName.trim());
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado. ¿Quieres iniciar sesión?');
      } else if (err.code === 'auth/invalid-email') {
        setError('El email no es válido.');
      } else if (err.code === 'auth/weak-password') {
        setError('Contraseña débil. Usa al menos 6 caracteres.');
      } else {
        setError('Error al crear cuenta. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card glass-card">
        <div className="auth-logo">🚀</div>
        <h1 className="text-gradient">Crear Cuenta</h1>
        <p className="auth-subtitle">Únete y comienza a prepararte para el ICFES</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label htmlFor="name">👤 Nombre completo</label>
            <input
              id="name"
              type="text"
              className="input-field"
              placeholder="Ej. María García"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="reg-email">📧 Correo electrónico</label>
            <input
              id="reg-email"
              type="email"
              className="input-field"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="reg-password">🔒 Contraseña</label>
            <input
              id="reg-password"
              type="password"
              className="input-field"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="confirm">🔒 Confirmar contraseña</label>
            <input
              id="confirm"
              type="password"
              className="input-field"
              placeholder="Repite tu contraseña"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creando cuenta...' : '¡Crear Cuenta! 🎉'}
          </button>
        </form>

        <div className="auth-divider"><span>¿Ya tienes cuenta?</span></div>
        <Link to="/login" className="btn-secondary auth-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

export default Register;
