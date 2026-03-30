import json

with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for area, qs in data.items():
    original_len = len(qs)
    # keep questions where the first option doesn't start with "[Ver Cuadernillo"
    valid_qs = [
        q for q in qs 
        if not (isinstance(q["options"], list) and len(q["options"]) > 0 and q["options"][0].startswith("[Ver Cuadernillo"))
    ]
    
    # Also for Matemáticas, let's check if any options are extremely empty or just letters
    filtered_qs = []
    for q in valid_qs:
        # If options are just empty strings or only contain "A.", "B." it means it's mostly images
        # Actually our "startsWith([Ver Cuadernillo" covers the fallback. Wait, let's ensure the fallback is always applied when needed
        is_bad = False
        for opt in q["options"]:
            if opt.startswith("[Ver Cuadernillo"):
                is_bad = True
                break
        if not is_bad:
            filtered_qs.append(q)

    data[area] = filtered_qs
    print(f"{area}: kept {len(filtered_qs)} out of {original_len} (removed {original_len - len(filtered_qs)})")

with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("questions.json updated.")
