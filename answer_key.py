import fitz

doc = fitz.open("C:/Users/Usuario/Desktop/JUAN/Icfes/fuentes_icfes/Matemáticas.pdf")
page = doc[-2] # second to last page
print(page.get_text("text", sort=True))
