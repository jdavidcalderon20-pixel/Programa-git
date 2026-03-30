import fitz

doc = fitz.open("C:/Users/Usuario/Desktop/JUAN/Icfes/fuentes_icfes/Matemáticas.pdf")
page = doc[-1] # last page
tables = page.find_tables()
if tables:
    for t in tables:
        print("Table:")
        for r in t.extract():
            print(r)
else:
    print("No tables found")
