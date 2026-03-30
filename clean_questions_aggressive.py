import json

with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for area, qs in data.items():
    original_len = len(qs)
    # keep questions where all options actually have text
    valid_qs = []
    for q in qs:
        # Check if any option is empty or just letters like "A."
        is_bad = False
        if not q["options"] or len(q["options"]) != 4:
            is_bad = True
        else:
            for opt in q["options"]:
                cleaned = opt.strip()
                if not cleaned or cleaned in ["[Ver Cuadernillo Opción A]", "[Ver Cuadernillo Opción B]", "[Ver Cuadernillo Opción C]", "[Ver Cuadernillo Opción D]"] or len(cleaned) <= 2:
                    # length <= 2 captures stuff like "A." or "B"
                    # But wait, what if the answer is really just "3" or "0" in Math?
                    # Let's be careful. if it's literally empty "", it's bad.
                    if not cleaned:
                        is_bad = True
                        break
        
        if not is_bad:
            valid_qs.append(q)

    data[area] = valid_qs
    print(f"{area}: kept {len(valid_qs)} out of {original_len} (removed {original_len - len(valid_qs)})")

with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("questions.json aggressively cleaned.")
