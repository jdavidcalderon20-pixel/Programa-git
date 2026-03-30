import fitz
import re

pdf_path = "C:/Users/Usuario/Desktop/JUAN/Icfes/fuentes_icfes/Ciencias Naturales.pdf"
doc = fitz.open(pdf_path)

# Let's check last 5 pages
for i in range(-1, -6, -1):
    text = doc[i].get_text("text", sort=True)
    if 'respuestas' in text.lower() or 'A' in text:
        matches = re.findall(r'(\d+)\s+([A-D])', text)
        if len(matches) > 10:
            print(f"Found {len(matches)} answers on page {i} for Ciencias Naturales")
            break
else:
    print("Could not find table in Ciencias Naturales")

