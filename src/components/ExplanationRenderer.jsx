import React from 'react';

/**
 * Componente que renderiza una explicación siguiendo el modelo de Andamiaje Educativo.
 * Busca patrones "Paso 1:", "Paso 2:", "Paso 3:" y los formatea visualmente.
 */
const ExplanationRenderer = ({ text, areaId }) => {
  if (!text) return null;

  // Reemplazo de símbolos matemáticos de "máquina" a tradicionales
  const formatSymbols = (str) => {
    return str
      .replace(/\^2/g, '²')
      .replace(/\^3/g, '³')
      .replace(/\s\*\s/g, ' × ')
      .replace(/(\d)\*(\d)/g, '$1 × $2')
      .replace(/sqrt\(([^)]+)\)/g, '√$1')
      .replace(/\s\/\s/g, ' ÷ ')
      .replace(/(\d)\/(\d)/g, '$1 ÷ $2')
      .replace(/<=/g, '≤')
      .replace(/>=/g, '≥');
  };

  // Dividir por pasos si existen
  const steps = text.split(/Paso \d:/i);
  const titles = text.match(/Paso \d:[^:\n]*/gi) || [];

  if (steps.length <= 1) {
    // Si no tiene pasos, simplemente renderizar con formato de símbolos y negritas
    return (
      <div className="explanation-simple">
        <p dangerouslySetInnerHTML={{ 
          __html: formatSymbols(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
        }} />
      </div>
    );
  }

  // Filtrar el primer elemento si está vacío (el texto antes del primer "Paso 1:")
  const content = steps[0].trim() ? steps : steps.slice(1);

  return (
    <div className="explanation-scaffolding">
      {content.map((stepText, idx) => {
        const title = titles[idx] || `Paso ${idx + 1}`;
        const stepNumber = title.match(/\d/)?.[0] || (idx + 1);
        
        return (
          <div key={idx} className={`explanation-step`}>
            <div className={`step-title step-${stepNumber}`}>
              <span>{stepNumber === '1' ? '🔍' : stepNumber === '2' ? '⚙️' : '🎯'}</span>
              {title}
            </div>
            <p dangerouslySetInnerHTML={{ 
              __html: formatSymbols(stepText.trim()).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
            }} />
          </div>
        );
      })}
    </div>
  );
};

export default ExplanationRenderer;
