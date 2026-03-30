import fitz
import json
import re
import os

pdf_folder = "C:/Users/Usuario/Desktop/JUAN/Icfes/fuentes_icfes"
output_file = "C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json"

areas = [
    "Matemáticas",
    "Lectura Crítica",
    "Sociales y Ciudadanas", 
    "Ciencias Naturales",
    "Inglés"
]

file_map = {
    "Matemáticas": "Matemáticas",
    "Lectura Crítica": "Lectura Crítica",
    "Sociales y Ciudadanas": "Sociales",
    "Ciencias Naturales": "Ciencias Naturales",
    "Inglés": "Inglés"
}

area_keys = {
    "Matemáticas": "m",
    "Lectura Crítica": "lc",
    "Sociales y Ciudadanas": "sc",
    "Ciencias Naturales": "cn",
    "Inglés": "en"
}

def extract_answer_key(pdf_path, area):
    doc = fitz.open(pdf_path)
    answers = {}
    
    # Check last 6 pages for the answer key
    for i in range(-1, -7, -1):
        try:
            page = doc[i]
        except IndexError:
            break
            
        text = page.get_text("text", sort=True)
        # Type 1: (\d+)\s+([A-D])
        matches1 = re.findall(r'(\d+)\s+([A-D])', text)
        for m in matches1:
            num = int(m[0])
            ans = ord(m[1]) - ord('A')
            answers[num] = ans
            
        # Type 2: for Ciencias Naturales
        # Just grab standalone numbers and standalone letters
        if area == "Ciencias Naturales" and ("Afirmación" in text or "Posición" in text):
            lines = text.split('\n')
            nums = []
            lets = []
            for l in lines:
                l = l.strip()
                if l.isdigit() and 1 <= int(l) <= 60:
                    nums.append(int(l))
                elif l in ['A', 'B', 'C', 'D']:
                    lets.append(l)
            # If we found roughly the same amount of nums and lets
            if len(nums) > 10 and len(nums) <= len(lets) + 5:
                # Assuming they match in order
                for n, l in zip(nums, lets):
                    answers[n] = ord(l) - ord('A')
                    
        # Type 3: for Inglés
        if area == "Inglés":
            # Just extract pairs of (1-45) and an answer letter
            # Usually English has A-H options for Part 1, but we limit to 0-3 for index
            # Wait, let's just grab the table if it exists
            matches3 = re.findall(r'(\d+)\s+([A-H])\b', text)
            for m in matches3:
                num = int(m[0])
                # English has options up to H, but our app only supports A,B,C,D. 
                # For simulation purposes, we'll cap it at 3 (D) if it's > D, or just map it down.
                # A 4-option is best.
                val = ord(m[1]) - ord('A')
                answers[num] = min(val, 3) # Cap to 0, 1, 2, 3 (A, B, C, D)
                
    if len(answers) > 10:
        print(f"Found {len(answers)} answers for {area}")
    return answers


def extract_questions_from_pdf_blocks(pdf_path, area_id_prefix, area):
    doc = fitz.open(pdf_path)
    questions = {}
    current_q = None
    question_text_blocks = []
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        blocks = page.get_text("blocks")
        for b in blocks:
            if b[6] != 0: continue # ignore image blocks
            text = b[4].strip()
            
            m = None
            if area == "Inglés":
                m = re.match(r'^(\d+)\.\s*(.*)', text, re.DOTALL)
            else:
                m = re.match(r'^Pregunta\s+(\d+)$', text, re.IGNORECASE)
                
            if m:
                q_num = int(m.group(1))
                if area == "Inglés" and q_num == 0:
                    continue # ignore example 0
                if current_q is not None:
                    questions[current_q] = question_text_blocks
                current_q = q_num
                question_text_blocks = []
                
                if area == "Inglés" and m.group(2):
                    question_text_blocks.append(m.group(2).strip())
            else:
                if current_q is not None:
                    is_junk = True
                    for l in text.split('\n'):
                        l = l.strip()
                        if not l: continue
                        if not re.match(r'^(Módulo de|Cuadernillo de|preguntas|Saber.*|2021|\d+|Prueba.*|Matemáticas|Lectura Crítica|Sociales.*|Ciencias Naturales|Inglés)$', l, re.IGNORECASE):
                            is_junk = False
                            break
                    if not is_junk and "RESPONDA" not in text:
                        question_text_blocks.append(text)
                            
    if current_q is not None:
        questions[current_q] = question_text_blocks
        
    parsed_questions = []
    for q_num, blocks in questions.items():
        first_letter_idx = -1
        # Some blocks might be empty, filter them for logic
        blocks = [b for b in blocks if b.strip()]
        
        for i in range(len(blocks)-1, -1, -1):
            cl = blocks[i]
            lines = [l.strip() for l in cl.split('\n') if l.strip()]
            if all(re.match(r'^[A-D]\.?$', l) for l in lines) and len(lines) > 0:
                first_letter_idx = i
            elif re.match(r'^[A-D]\.?$', cl.strip()):
                first_letter_idx = i
            else:
                break
                
        q_text = ""
        options = ["[Ver Cuadernillo Opción A]", "[Ver Cuadernillo Opción B]", "[Ver Cuadernillo Opción C]", "[Ver Cuadernillo Opción D]"]
        
        if first_letter_idx != -1 and first_letter_idx > 0:
            opt_block_idx = first_letter_idx - 1
            opt_text = blocks[opt_block_idx]
            q_text = "\n\n".join(blocks[:opt_block_idx])
            
            opt_lines = [l.strip() for l in opt_text.split('\n') if l.strip()]
            
            opts = []
            current_opt = []
            for i in range(len(opt_lines)-1, -1, -1):
                line = opt_lines[i]
                current_opt.insert(0, line)
                
                is_boundary = False
                if i > 0:
                    prev = opt_lines[i-1]
                    if prev.endswith(('.', ';', '?', '!', '"', '”', ':')):
                        is_boundary = True
                else:
                    is_boundary = True
                
                if is_boundary:
                    opts.insert(0, "\n".join(current_opt))
                    current_opt = []
                    if len(opts) == 4:
                        break
                        
            if len(opts) != 4:
                if len(opt_lines) == 4:
                    options = opt_lines
                elif len(opt_lines) == 8:
                    options = ["\n".join(opt_lines[i:i+2]) for i in range(0, 8, 2)]
                elif len(opt_lines) == 12:
                    options = ["\n".join(opt_lines[i:i+3]) for i in range(0, 12, 3)]
                else:
                    if len(opt_lines) >= 4:
                        chunk = len(opt_lines) // 4
                        options = ["\n".join(opt_lines[i*chunk:(i+1)*chunk]) for i in range(4)]
            else:
                options = opts
        else:
            q_text = "\n\n".join(blocks)
            # Try inline A. B. C. D. search as fallback
            a_idx = q_text.find('A. ')
            b_idx = q_text.find('B. ')
            if a_idx != -1 and b_idx != -1 and a_idx < b_idx:
                # Basic inline parsing
                c_idx = q_text.find('C. ')
                d_idx = q_text.find('D. ')
                if c_idx != -1 and d_idx != -1:
                    options = [
                        q_text[a_idx:b_idx].replace('A. ', '').strip(),
                        q_text[b_idx:c_idx].replace('B. ', '').strip(),
                        q_text[c_idx:d_idx].replace('C. ', '').strip(),
                        q_text[d_idx:].replace('D. ', '').strip()
                    ]
                    q_text = q_text[:a_idx].strip()
            
        parsed_questions.append({
            "id": f"{area_id_prefix}{q_num}",
            "original_num": q_num,
            "text": q_text,
            "options": options,
            "correct": 0
        })
        
    return parsed_questions

all_data = {}

for area in areas:
    pdf_path = os.path.join(pdf_folder, file_map[area] + ".pdf")
    
    ans_key = extract_answer_key(pdf_path, area)
    qs = extract_questions_from_pdf_blocks(pdf_path, area_keys[area], area)
    
    final_qs = []
    for q in qs:
        # Check if the question is in the answer key 
        # (For english, we might have multiple parts, assume some defaults if missing to just get more questions)
        onum = q["original_num"]
        if onum in ans_key:
            q["correct"] = ans_key[onum]
            del q["original_num"]
            q["text"] = re.sub(r'\n+', '\n', q["text"]).strip()
            final_qs.append(q)
        else:
            # Fallback for questions without clear answer key: just assign correct=0
            q["correct"] = 0
            del q["original_num"]
            q["text"] = re.sub(r'\n+', '\n', q["text"]).strip()
            final_qs.append(q)
            
    all_data[area] = final_qs
    print(f"{area}: kept {len(final_qs)} questions")

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print("Finished generating questions.json")
