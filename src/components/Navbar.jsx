import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LEVEL_NAMES, LEVEL_COLORS, LEVEL_XP } from '../firebase';
import './Navbar.css';

function Navbar() {
  const { currentUser, userProfile, getLevelInfo, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!currentUser) return null;

  const levelInfo = getLevelInfo();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const ADMIN_UIDS = import.meta.env.VITE_ADMIN_UIDS ? import.meta.env.VITE_ADMIN_UIDS.split(',') : [];
  const isSuperAdmin = ADMIN_UIDS.includes(currentUser?.uid);

  const navLinks = [
    { to: '/', label: '🏠 Inicio', id: 'nav-home' },
    { to: '/missions', label: '🎯 Misiones', id: 'nav-missions' },
    { to: '/quick-quiz', label: '⚡ Quiz Rápido', id: 'nav-quiz' },
    { to: '/daily-practice', label: '🏃 Práctica', id: 'nav-practice' },
    { to: '/study', label: '📚 Estudio', id: 'nav-study' },
    { to: '/history', label: '📋 Historial', id: 'nav-history' },
    { to: '/stats', label: '📊 Estadísticas', id: 'nav-stats' },
  ];

  if (isSuperAdmin) {
    navLinks.push({ to: '/admin-control', label: '🛡️ Admin', id: 'nav-admin' });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">SimulacroICFES</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.id}
              to={link.to}
              id={link.id}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-right">
          <Link to="/profile" className="user-chip" id="nav-profile">
            <div className="user-avatar" translate="no" style={{ background: levelInfo.color }}>
              <span translate="no">{userProfile?.displayName?.trim() ? userProfile.displayName[0].toUpperCase() : (userProfile?.email?.[0].toUpperCase() || 'U')}</span>
            </div>
            <div className="user-info-mini">
              <span className="user-name-mini">{userProfile?.displayName?.split(' ')[0] || 'Usuario'}</span>
              <span className="user-level-mini" style={{ color: levelInfo.color }}>
                Nv.{levelInfo.nivel} {levelInfo.name}
              </span>
            </div>
            <div className="xp-mini">
              <div className="xp-mini-bar" style={{ width: `${levelInfo.progress}%`, background: levelInfo.color }}></div>
            </div>
          </Link>
          <button className="btn-logout-new" onClick={handleLogout} id="nav-logout">
            <span>Cerrar sesión</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
