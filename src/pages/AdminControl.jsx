import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Search, ShieldAlert, UserPlus, UserMinus, ShieldCheck } from 'lucide-react';
import './AdminControl.css';

function AdminControl() {
  const { currentUser } = useAuth();
  
  const ADMIN_UIDS = import.meta.env.VITE_ADMIN_UIDS ? import.meta.env.VITE_ADMIN_UIDS.split(',') : [];
  const isSuperAdmin = ADMIN_UIDS.length === 0 || ADMIN_UIDS.includes(currentUser?.uid);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isSuperAdmin) return;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "usuarios"));
        const usersList = [];
        snapshot.forEach(d => usersList.push({ id: d.id, ...d.data() }));
        // Sort by newer first
        usersList.sort((a,b) => (new Date(b.createdAt || 0) - new Date(a.createdAt || 0)));
        setUsers(usersList);
      } catch (err) {
        console.error(err);
        setMessage('Error al cargar lista de usuarios.');
      }
      setLoading(false);
    };
    fetchUsers();
  }, [isSuperAdmin]);

  const handleTogglePro = async (user) => {
    try {
      const userRef = doc(db, "usuarios", user.id);
      const newStatus = !user.isPro;
      const months = parseInt(prompt("¿Cuántos meses de suscripción deseas otorgar?", "1")) || 1;
      const proStartDate = new Date();
      const proEndDate = new Date();
      proEndDate.setMonth(proEndDate.getMonth() + months);

      const updates = { 
        isPro: newStatus,
        proStartDate: newStatus ? proStartDate : null,
        proEndDate: newStatus ? proEndDate : null,
        subscriptionDate: newStatus ? proStartDate.toISOString() : null
      };
      
      await updateDoc(userRef, updates);
      
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...updates } : u));
      setMessage(`Usuario ${user.email} se actualizó a ${newStatus ? 'PRO' : 'BÁSICO'} correctamente.`);
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      console.error(error);
      setMessage('Error al actualizar el estado de ' + user.email);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="admin-container fade-in">
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <ShieldAlert size={60} color="#ef4444" style={{ marginBottom: '1rem' }} />
          <h2>⛔ Acceso Restringido</h2>
          <p style={{ color: 'var(--text-muted)' }}>No tienes permisos de administrador global para ver esta página.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (u.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container fade-in">
      <div className="glass-card admin-card">
        <div className="admin-header">
          <div className="ah-title">
            <ShieldCheck size={36} color="#34d399" />
            <div>
              <h1 className="text-gradient" style={{ margin: 0 }}>Panel de Control</h1>
              <p className="admin-subtitle">Gestión de suscripciones y usuarios PRO.</p>
            </div>
          </div>
        </div>
        
        {ADMIN_UIDS.length === 0 && (
          <div className="admin-warning" style={{ color: '#fb923c', background: 'rgba(251, 146, 60, 0.1)', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', borderLeft: '4px solid #fb923c' }}>
            <strong>⚠️ Advertencia de Seguridad:</strong> No has configurado tu UID estricto de administrador en las variables de entorno (.env).
          </div>
        )}

        <div className="admin-search-box">
          <Search size={22} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar estudiantes por correo o nombre..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input-reactive"
          />
        </div>

        {message && <div className="admin-message">{message}</div>}

        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Cargando base de datos de usuarios...</p>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Correo</th>
                  <th>Suscripción</th>
                  <th>Vencimiento</th>
                  <th>Acción Rápida</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="table-user">
                        <div className="tu-avatar" translate="no">{user.displayName?.[0]?.toUpperCase() || '?'}</div>
                        <div className="tu-info">
                          <strong>{user.displayName || 'Sin Nombre'}</strong>
                          <span>Nivel {user.nivel || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`status-badge ${user.isPro ? 'badge-emerald' : 'badge-slate'}`}>
                        {user.isPro ? 'PRO ACTIVADO' : 'GRATUITO'}
                      </span>
                    </td>
                     <td>
                       {user.isPro && user.proEndDate ? (
                         <span style={{ fontSize: '0.85rem' }}>
                           {user.proEndDate.toDate ? user.proEndDate.toDate().toLocaleDateString('es-CO') : new Date(user.proEndDate).toLocaleDateString('es-CO')}
                         </span>
                       ) : 'N/A'}
                     </td>
                    <td>
                      <button 
                        className={`btn-toggle-pro ${user.isPro ? 'btn-revoke' : 'btn-grant'}`}
                        onClick={() => handleTogglePro(user)}
                      >
                        {user.isPro ? <UserMinus size={16}/> : <UserPlus size={16}/>}
                        {user.isPro ? 'Desactivar' : 'Ascender'}
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                      Ningún usuario coincide con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminControl;
