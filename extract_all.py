import fitz
import json
import re

def parse_pdf(filepath):
    doc = fitz.open(filepath)
    questions = []
    
    current_question = None
    question_text = []
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        blocks = page.get_text("blocks")
        # sort blocks by y0, then x0
        blocks.sort(key=lambda b: (b[1], b[0]))
        
        for b in blocks:
            text = b[4].strip()
            if not text:
                continue
            
            # Check if it's a "Pregunta X"
            m = re.match(r"^Pregunta\s+(\d+)$", text, re.IGNORECASE)
            if m:
                if current_question is not None:
                    questions.append(current_question)
                
                current_question = {
                    "num": int(m.group(1)),
                    "text": "",
                    "options": [],
                    "correct": 0
                }
                question_text = []
                continue
            
            if current_question:
                # Need to heuristics to catch A, B, C, D lines or blocks
                question_text.append(text)

    if current_question:
        questions.append(current_question)
        
    return questions

questions = parse_pdf("C:/Users/Usuario/Desktop/JUAN/Icfes/fuentes_icfes/Matemáticas.pdf")
for q in questions[:3]:
    print(f"Num: {q['num']}")
    print("Blocks:")
    for t in q["text"]:
        print(f"  {t}")
    print("---")
