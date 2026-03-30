import os

file_path = 'src/pages/Study.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = lines[:8]
new_lines.append("import { STUDY_CONTENT } from '../data/study';\n")

end_idx = 0
for i, line in enumerate(lines):
    if line.startswith('/* ─── Quiz helper'):
        end_idx = i - 1
        break

new_lines.extend(lines[end_idx:])

content = "".join(new_lines)

old_topic = """  // Map legacy structure to the new 3 pillars
  const concepto = section.concepto || section.text || (section.items ? section.items[0] : 'Concepto fundamental de ' + section.title);
  
  let dato = section.dato;
  if (!dato) {
    if (section.text && section.items && section.items.length > 0) {
      dato = section.items.slice(0, Math.ceil(section.items.length / 2)).join(' • ');
    } else if (section.items && section.items.length > 1) {
      dato = section.items.slice(1, -1).join(' • ');
    } else {
      dato = 'Este tema es un pilar evaluativo recurrente en el examen, asegúrate de comprender sus bases lógicas fundamentales.';
    }
  }

  let tip = section.tip;
  if (!tip) {
    if (section.text && section.items && section.items.length > 0) {
      tip = section.items.slice(Math.ceil(section.items.length / 2)).join(' • ');
    } else if (section.items && section.items.length > 1) {
      tip = section.items[section.items.length - 1];
    } else {
      tip = 'Lee cuidadosamente el enunciado en el simulacro y descarta primero las opciones que no tengan relación directa con este concepto.';
    }
  }"""

new_topic = """  const concepto = section.concepto;
  const dato = section.datoRelevante;
  const tip = section.tipIcfes;"""

content = content.replace(old_topic, new_topic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Study.jsx refactored successfully.")
