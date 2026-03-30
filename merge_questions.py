import json
import os

files = {
    "Matemáticas": "src/data/math_pro.json",
    "Lectura Crítica": "src/data/critical_reading_pro.json",
    "Sociales y Ciudadanas": "src/data/social_sciences_pro.json",
    "Inglés": "src/data/english_pro.json",
    "Ciencias Naturales": "src/data/natural_sciences_pro.json"
}

combined = {}

for subject, path in files.items():
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            combined[subject] = json.load(f)

with open('src/data/questions_pro.json', 'w', encoding='utf-8') as f:
    json.dump(combined, f, ensure_ascii=False, indent=2)

print("Merged 5 subjects into questions_pro.json")
