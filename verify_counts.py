import json

def verify_counts(path):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for area, qs in data.items():
        print(f"{area}: {len(qs)} questions")

if __name__ == "__main__":
    verify_counts('src/data/questions_pro.json')
