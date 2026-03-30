import fitz  # PyMuPDF
import glob
import os

pdf_dir = r"C:\Users\Usuario\Desktop\JUAN\Icfes\fuentes_icfes"
pdf_files = glob.glob(os.path.join(pdf_dir, "*.pdf"))

for pdf_path in pdf_files:
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        out_path = pdf_path.replace(".pdf", ".txt")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Successfully parsed {os.path.basename(pdf_path)}")
    except Exception as e:
        print(f"Error parsing {pdf_path}: {e}")
