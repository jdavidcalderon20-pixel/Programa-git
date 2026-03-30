import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getExamHistory, updateExamTags } from '../firebase';
import './History.css';

const TYPE_LABELS = {
  quick_quiz: { label: 'Quiz Rápido', icon: '⚡', color: '#60a5fa' },
  daily_practice: { label: 'Práctica del Día', icon: '🏃', color: '#34d399' },
  simulacro_basic: { label: 'Simulacro Básico', icon: '🎓', color: '#a78bfa' },
  simulacro_pro: { label: 'Simulacro Pro', icon: '🏆', color: '#f59e0b' },
  simulacro: { label: 'Simulacro', icon: '🎓', color: '#a78bfa' },
};

const PRESET_TAGS = ['Para repasar', 'Mi mejor intento', 'Débil en Matemáticas', 'Débil en Ciencias', 'Mejoré mucho', 'Antes del examen'];

function History() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [tagEditing, setTagEditing] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getExamHistory(currentUser.uid).then(h => {
        setHistory(h);
        setLoading(false);
      });
    }
  }, [currentUser]);

  const filtered = filter === 'all' ? history : history.filter(h => h.type === filter || (h.type?.startsWith('simulacro') && filter === 'simulacro'));

  const addTag = async (docId, tag) => {
    if (!tag.trim()) return;
    const item = history.find(h => h.id === docId);
    const tags = [...(item?.tags || [])];
    if (!tags.includes(tag)) {
      tags.push(tag);
      await updateExamTags(docId, tags);
      setHistory(prev => prev.map(h => h.id === docId ? { ...h, tags } : h));
    }
    setTagInput('');
  };

  const removeTag = async (docId, tag) => {
    const item = history.find(h => h.id === docId);
    const tags = (item?.tags || []).filter(t => t !== tag);
    await updateExamTags(docId, tags);
    setHistory(prev => prev.map(h => h.id === docId ? { ...h, tags } : h));
  };

  const fmt = (iso) => new Date(iso).toLocaleString('es-CO', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="history-container fade-in">
      <div className="history-header glass-card">
        <h1 className="text-gradient">📋 Historial de Exámenes</h1>
        <p>{history.length} intentos registrados</p>
      </div>

      <div className="history-filters glass-card">
        {[['all', '🗃️ Todos'], ['quick_quiz', '⚡ Quiz Rápido'], ['daily_practice', '🏃 Práctica'], ['simulacro', '🎓 Simulacros']].map(([val, label]) => (
          <button key={val} id={`filter-${val}`}
            className={`filter-btn ${filter === val ? 'active' : ''}`}
            onClick={() => setFilter(val)}>{label}</button>
        ))}
      </div>

      {loading ? (
        <div className="history-loading glass-card"><p>Cargando historial...</p></div>
      ) : filtered.length === 0 ? (
        <div className="history-empty glass-card">
          <span>📭</span>
          <p>No hay exámenes en esta categoría todavía.</p>
          <button className="btn-primary" onClick={() => navigate('/quick-quiz')}>Hacer un Quiz →</button>
        </div>
      ) : (
        <div className="history-list-new">
          {filtered.map(item => {
            const typeInfo = TYPE_LABELS[item.type] || { label: item.type, icon: '📋', color: '#94a3b8' };
            const isExpanded = expanded === item.id;
            return (
              <div key={item.id} className="history-item-new glass-card">
                <div className="hin-header" onClick={() => setExpanded(isExpanded ? null : item.id)}>
                  <div className="hin-type" style={{ color: typeInfo.color }}>
                    <span>{typeInfo.icon}</span> {typeInfo.label}
                  </div>
                  <div className="hin-meta">
                    <span className="hin-date">{fmt(item.createdAt || item.date)}</span>
                    <div className="hin-score" style={{ background: `${typeInfo.color}22`, color: typeInfo.color }}>
                      {item.score ?? item.totalScore ?? '—'}%
                    </div>
                    <span className="hin-expand">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="hin-tags-row">
                  {(item.tags || []).map(tag => (
                    <span key={tag} className="htag" onClick={() => removeTag(item.id, tag)}>
                      {tag} ✕
                    </span>
                  ))}
                  {tagEditing === item.id ? (
                    <div className="htag-input-row">
                      <input className="htag-input" placeholder="Agregar etiqueta..." value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { addTag(item.id, tagInput); setTagEditing(null); }}}
                        autoFocus />
                      <div className="htag-presets">
                        {PRESET_TAGS.map(pt => (
                          <button key={pt} className="htag-preset" onClick={() => { addTag(item.id, pt); setTagEditing(null); }}>{pt}</button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button className="htag-add" onClick={() => setTagEditing(item.id)}>+ Etiqueta</button>
                  )}
                </div>

                {isExpanded && (
                  <div className="hin-details">
                    <div className="hin-detail-grid">
                      {item.numQuestions && <div className="hin-detail-item"><span>Preguntas</span><strong>{item.numQuestions}</strong></div>}
                      {item.correct !== undefined && <div className="hin-detail-item"><span>Correctas</span><strong>{item.correct}</strong></div>}
                      {item.area && <div className="hin-detail-item"><span>Materia</span><strong>{item.area}</strong></div>}
                      {item.examMode && <div className="hin-detail-item"><span>Modo</span><strong>{item.examMode}</strong></div>}
                    </div>
                    {item.areaStats && (
                      <div className="hin-area-breakdown">
                        {Object.entries(item.areaStats).map(([area, s]) => (
                          <div key={area} className="hin-area-row">
                            <span>{area}</span>
                            <div className="hin-area-bar">
                              <div className="hin-area-fill" style={{ width: `${Math.round((s.correct/s.total)*100)}%` }}></div>
                            </div>
                            <span>{s.correct}/{s.total}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
