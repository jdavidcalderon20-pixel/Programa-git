import os
import docx
import re
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

load_dotenv()

# Configuración Cloudinary y Firebase
cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET')
)

if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_credentials.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

def process_word(file_path):
    doc = docx.Document(file_path)
    questions = []
    current_q = None
    materia = os.path.basename(file_path).replace(".docx", "").capitalize()
    
    # Patrón más flexible: busca "Pregunta X", "1.", o solo el número al inicio
    # Esto ayudará a que Sociales y Naturales que decían "0" ahora se lean.
    q_pattern = re.compile(r'^(Pregunta\s+)?(\d+)[\.\:]?\s*$', re.IGNORECASE)

    for para in doc.paragraphs:
        text = para.text.strip()
        if not text: continue
        
        # Intentar detectar inicio de pregunta
        match_q = q_pattern.match(text)
        if match_q:
            if current_q: questions.append(current_q)
            current_q = {
                "id": match_q.group(2),
                "materia": materia,
                "enunciado": "",
                "opciones": {},
                "image_url": None
            }
            continue

        if current_q:
            # Detectar opciones A. B. C. D.
            opt_match = re.match(r'^([A-D])[\.\)]\s*(.*)', text)
            if opt_match:
                current_q["opciones"][opt_match.group(1)] = opt_match.group(2).strip()
            else:
                # Si no es opción, es parte del enunciado
                current_q["enunciado"] += " " + text

    if current_q: questions.append(current_q)
    return questions

def main():
    folder_path = r'C:\Users\Usuario\Desktop\JUAN\Icfes\fuentes_icfes'
    for filename in os.listdir(folder_path):
        if filename.endswith(".docx"):
            full_path = os.path.join(folder_path, filename)
            questions = process_word(full_path)
            
            print(f"Subiendo {len(questions)} preguntas de {filename}...")
            for q in questions:
                # Corrección de símbolos matemáticos antes de subir
                q["enunciado"] = q["enunciado"].replace("^2", "²").replace("^3", "³").strip()
                # Guardar en Firestore
                db.collection("preguntas_icfes").document(f"{q['materia']}_{q['id']}").set(q)
            
            print(f"✅ ¡Éxito! {filename} completado.")

if __name__ == "__main__":
    main()