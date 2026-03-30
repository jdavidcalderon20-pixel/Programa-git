import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { saveResult, saveExamHistory } from '../firebase';
import { useAuth } from '../context/AuthContext';
import './Results.css';

function Results() {
  const navigate = useNavigate();
  const { calculateFinalScores, resetExam, examMode } = useApp();
  const { currentUser, awardXP, tryCompleteMission } = useAuth();
  const [savingStatus, setSavingStatus] = useState('saving');

  const actualResults = useMemo(() => calculateFinalScores(), [calculateFinalScores]);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (hasSaved.current) return;
    const saveToFirebase = async () => {
      hasSaved.current = true;
      try {
        // Legacy save
        await saveResult(actualResults);
        // New historial save for auth'd user
        if (currentUser) {
          await saveExamHistory(currentUser.uid, {
            type: examMode === 'pro' ? 'simulacro_pro' : 'simulacro_basic',
            examMode,
            score: Math.round((actualResults.totalScore / actualResults.maxPossible) * 100),
            totalScore: actualResults.totalScore,
            maxPossible: actualResults.maxPossible,
            areas: actualResults.areas,
            date: actualResults.date,
            tags: [],
          });
          await awardXP(100);
          await tryCompleteMission('simulacro', 100);
        }
        setSavingStatus('saved');
      } catch {
        setSavingStatus('error');
      }
    };
    saveToFirebase();
  }, [actualResults]);

  const calculateGlobalPerformance = (score) => {
    if (score >= 350) return { text: 'Excelente', class: 'perf-excellent' };
    if (score >= 250) return { text: 'Bueno', class: 'perf-good' };
    if (score >= 150) return { text: 'Regular', class: 'perf-regular' };
    return { text: 'Bajo', class: 'perf-low' };
  };

  const performance = calculateGlobalPerformance(actualResults.totalScore);

  const handleRestart = () => {
    resetExam();
    navigate('/');
  };

  return (
    <div className="results-container fade-in">
      <div className="header-section text-center mb-8">
        <h1 className="text-gradient">Reporte de Resultados</h1>
        <p className="subtitle">Aquí tienes el resumen detallado de tu simulacro, {actualResults.studentName}.</p>
        
        {savingStatus === 'saving' && <p style={{color: 'var(--warning)'}}>Guardando resultados en la nube...</p>}
        {savingStatus === 'saved' && <p style={{color: 'var(--success)'}}>Resultados guardados exitosamente.</p>}
        {savingStatus === 'error' && <p style={{color: 'var(--danger)'}}>Ocurrió un error al guardar los resultados.</p>}
      </div>

      <div className="global-score-section glass-card">
        <h2>Puntaje Global Estimado</h2>
        <div className="score-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              strokeDasharray={`${(actualResults.totalScore / actualResults.maxPossible) * 100}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{actualResults.totalScore}</text>
          </svg>
        </div>
        <p className="max-score">de {actualResults.maxPossible} puntos posibles</p>
        <div className={`performance-badge ${performance.class}`}>
          Desempeño {performance.text}
        </div>
      </div>

      <div className="areas-results">
        <h3 className="mb-4">Resultados por Área</h3>
        <div className="areas-grid-results">
          {actualResults.areas.map(area => (
            <div key={area.id} className="area-result-card glass-card">
              <h4>{area.name}</h4>
              <div className="score-bar-container">
                <div className="score-bar-fill" style={{ width: `${(area.score / area.max) * 100}%` }}></div>
              </div>
              <p className="area-score-text">Puntaje: {area.score} / {area.max}</p>
              <p className="area-score-text" style={{fontSize: '0.8rem', marginTop: '-10px'}}>Acertadas: {area.correctCount}/{area.totalInArea}</p>
              
              {area.score < 60 && (
                <div className="suggestion warning-bg" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span><span title="Sugerencia">💡</span> Debes repasar los conceptos fundamentales de esta área.</span>
                  <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.9em' }} onClick={() => navigate(`/study?area=${encodeURIComponent(area.id)}`)}>Reforzar este tema</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="actions-section" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={() => navigate('/review')}>📋 Revisar Mis Respuestas</button>
        <button className="btn-secondary" onClick={() => navigate('/')}>Volver al Inicio</button>
        <button className="btn-secondary" onClick={handleRestart}>Hacer Otra Prueba</button>
      </div>
    </div>
  );
}

export default Results;
