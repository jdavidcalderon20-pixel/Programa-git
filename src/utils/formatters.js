export const formatMathText = (text, areaId) => {
  if (!text) return '';
  // Only apply to math category
  const mathKeys = ['matematicas', 'Matemáticas'];
  if (!mathKeys.includes(areaId)) return text;

  let formatted = text
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\*/g, '×');

  // Careful with division, we might only want to replace it when isolated or within numbers
  // Simple heuristic for / to ÷
  formatted = formatted.replace(/\s\/\s/g, ' ÷ ');

  return formatted;
};
