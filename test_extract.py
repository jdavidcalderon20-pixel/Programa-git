import fitz
doc = fitz.open("C:/Users/Usuario/Desktop/JUAN/Icfes/fuentes_icfes/Inglés.pdf")
for page_num in range(2, 6):
    blocks = doc[page_num].get_text("blocks")
    for b in blocks:
        text = b[4].strip()
        print(f"Block on page {page_num}: {text[:50].encode('ascii', 'ignore').decode()}...")
