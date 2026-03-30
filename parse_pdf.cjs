const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const sourceDir = 'C:\\Users\\Usuario\\Desktop\\JUAN\\Icfes\\fuentes_icfes';
const files = ['Ciencias Naturales.pdf', 'Inglés.pdf', 'Lectura Crítica.pdf', 'Matemáticas.pdf', 'Sociales.pdf'];

async function parseFiles() {
  for (const file of files) {
    try {
      const dataBuffer = fs.readFileSync(path.join(sourceDir, file));
      const text = await pdf(dataBuffer);
      fs.writeFileSync(path.join(sourceDir, file.replace('.pdf', '.txt')), text.text);
      console.log(`Parsed ${file}`);
    } catch (e) {
      console.error(`Error with ${file}:`, e);
    }
  }
}

parseFiles();
