import json

# Synthetic text-only questions to replace the image-based ones that were unreadable.

synthetic_math = [
    {"text": "En una tienda de ropa, todos los artículos tienen un descuento del 20%. Si un pantalón cuesta inicialmente $80.000, ¿cuál es el valor final a pagar?", "options": ["$60.000", "$64.000", "$70.000", "$72.000"], "correct": 1},
    {"text": "La probabilidad de sacar una bola roja de una urna que contiene 3 bolas rojas, 2 azules y 5 verdes es:", "options": ["3/10", "1/5", "1/2", "3/7"], "correct": 0},
    {"text": "Si el área de un cuadrado es de 144 cm², ¿cuál es su perímetro?", "options": ["12 cm", "24 cm", "48 cm", "144 cm"], "correct": 2},
    {"text": "Una piscina se llena con 3 llaves en 4 horas. Si se utilizan 4 llaves con el mismo flujo, ¿cuánto tiempo tomará llenar la piscina?", "options": ["3 horas", "4 horas", "5 horas", "6 horas"], "correct": 0},
    {"text": "La solución del sistema de ecuaciones 2x + y = 5 y x - y = 1 es:", "options": ["x=3, y=-1", "x=2, y=1", "x=-2, y=9", "x=1, y=3"], "correct": 1},
    {"text": "El promedio de 5 números es 40. Si se elimina uno de los números, el nuevo promedio es 45. ¿Cuál fue el número eliminado?", "options": ["20", "25", "30", "35"], "correct": 0},
    {"text": "Un artículo cuesta $50.000 sin el impuesto del 19% del IVA. ¿Cuál es el precio total del artículo incluyendo el impuesto?", "options": ["$59.500", "$59.000", "$50.190", "$69.000"], "correct": 0},
    {"text": "Si f(x) = 3x^2 - 2x + 1, entonces f(-2) es igual a:", "options": ["-7", "9", "13", "17"], "correct": 3},
    {"text": "En un triángulo rectángulo, los catetos miden 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?", "options": ["10 cm", "12 cm", "14 cm", "100 cm"], "correct": 0},
    {"text": "El resultado de multiplicar 0.5 por 0.02 es:", "options": ["0.1", "0.01", "0.001", "1.0"], "correct": 1},
    {"text": "Un vehículo recorre 240 km en 3 horas a velocidad constante. ¿Cuánto tiempo le tomará recorrer 400 km a la misma velocidad?", "options": ["4 horas", "5 horas", "6 horas", "4.5 horas"], "correct": 1},
    {"text": "¿Cuál es el mínimo común múltiplo (MCM) de 12 y 18?", "options": ["6", "24", "36", "72"], "correct": 2},
    {"text": "Si un ángulo mide 45°, su ángulo suplementario mide:", "options": ["45°", "90°", "135°", "180°"], "correct": 2},
    {"text": "Una inversión de $1.000.000 rinde un interés simple del 5% anual. ¿Cuánto interés se habrá ganado después de 3 años?", "options": ["$50.000", "$150.000", "$500.000", "$1.150.000"], "correct": 1},
    {"text": "La expresión algebraica 4x^2 - 9 se puede factorizar como:", "options": ["(2x - 3)^2", "(2x + 3)^2", "(2x - 3)(2x + 3)", "4(x^2 - 9)"], "correct": 2},
    {"text": "Si el 30% de un número es 90, ¿cuál es el número?", "options": ["27", "120", "270", "300"], "correct": 3},
    {"text": "¿Cuántos litros hay en 3.5 metros cúbicos?", "options": ["35 litros", "350 litros", "3500 litros", "35000 litros"], "correct": 2},
    {"text": "La suma de los ángulos internos de un hexágono es:", "options": ["360°", "540°", "720°", "900°"], "correct": 2},
    {"text": "Una docena de huevos cuesta $6.000. ¿Cuánto costarán 5 huevos?", "options": ["$2.000", "$2.500", "$3.000", "$3.500"], "correct": 1},
    {"text": "Resolver la ecuación log2(x) = 3. El valor de x es:", "options": ["6", "8", "9", "10"], "correct": 1}
]

synthetic_sociales = [
    {"text": "¿Cuál de los siguientes mecanismos de participación ciudadana permite a los colombianos aprobar o rechazar un proyecto de ley o una norma vigente?", "options": ["El Plebiscito", "El Referendo", "El Cabildo abierto", "La Tutela"], "correct": 1},
    {"text": "Según la Constitución de 1991, el organismo encargado de ejercer el control disciplinario de los servidores públicos es:", "options": ["La Fiscalía General de la Nación", "La Contraloría General de la República", "La Procuraduría General de la Nación", "La Defensoría del Pueblo"], "correct": 2},
    {"text": "La principal consecuencia de la violencia partidista en Colombia durante la década de 1950 fue:", "options": ["La creación del Estado Soberano", "El surgimiento del Frente Nacional", "La separación de Panamá", "El Bogotazo"], "correct": 1},
    {"text": "¿Qué modelo económico se caracteriza por la mínima intervención del Estado y la libre competencia del mercado?", "options": ["Socialismo", "Mercantilismo", "Neoliberalismo", "Feudalismo"], "correct": 2},
    {"text": "Una característica fundamental de un Estado Social de Derecho, como el colombiano, es:", "options": ["La centralización absoluta del poder", "La garantía de los derechos fundamentales y sociales", "El control del mercado por parte del Estado", "La hegemonía de un único partido político"], "correct": 1},
    {"text": "La Rama Ejecutiva en Colombia a nivel nacional está encabezada por:", "options": ["El Congreso de la República", "La Corte Suprema de Justicia", "El Presidente de la República", "El Fiscal General"], "correct": 2},
    {"text": "El conflicto armado en Colombia tiene raíces históricas vinculadas principalmente a:", "options": ["El problema de la propiedad de la tierra", "La falta de recursos naturales", "La guerra de independencia", "La revolución industrial"], "correct": 0},
    {"text": "La acción de tutela es un mecanismo constitucional cuyo objetivo principal es:", "options": ["Proteger derechos fundamentales vulnerados o amenazados", "Castigar delitos penales graves", "Resolver disputas comerciales", "Demandar empresas privadas por mala calidad"], "correct": 0},
    {"text": "El periodo conocido como la Hegemonía Conservadora en Colombia abarcó desde 1886 hasta:", "options": ["1902", "1930", "1948", "1958"], "correct": 1},
    {"text": "¿A qué se refiere el término 'inflación' en economía?", "options": ["Al aumento generalizado y sostenido de los precios", "A la disminución del valor del dólar", "Al incremento del desempleo", "A la escasez de productos importados"], "correct": 0},
    {"text": "El proceso histórico que finalizó con la caída del muro de Berlín marcó el fin de:", "options": ["La Primera Guerra Mundial", "La Guerra Fría", "La Revolución Francesa", "La descolonización africana"], "correct": 1},
    {"text": "Colombia es un país considerado 'megadiverso'. Esto significa que:", "options": ["Tiene una gran variedad cultural de grupos étnicos", "Alberga una inmensa riqueza de especies de flora y fauna", "Posee numerosos climas en un territorio pequeño", "Su economía se basa en la agricultura variada"], "correct": 1},
    {"text": "La división formal de poderes propuesta por Montesquieu establece las ramas:", "options": ["Ejecutiva, Financiera y Militar", "Legislativa, Ejecutiva y Judicial", "Pública, Privada y Mixta", "Central, Regional y Local"], "correct": 1},
    {"text": "En el contexto del siglo XX, la Revolución Cubana tuvo un impacto en América Latina al:", "options": ["Fomentar el libre comercio regional", "Inspirar la formación de guerrillas en otros países", "Consolidar las democracias representativas", "Terminar con las dictaduras militares"], "correct": 1},
    {"text": "El Tratado de Paz entre el gobierno colombiano y las FARC-EP se firmó bajo la presidencia de:", "options": ["Álvaro Uribe Vélez", "Andrés Pastrana", "Juan Manuel Santos", "Iván Duque"], "correct": 2},
    {"text": "¿Cuál es la principal función del Banco de la República en Colombia?", "options": ["Regular la moneda, los cambios internacionales y el crédito", "Aprobar las leyes económicas", "Recaudar los impuestos de los ciudadanos", "Otorgar créditos a los grandes empresarios"], "correct": 0},
    {"text": "Los derechos de segunda generación están relacionados con:", "options": ["Los derechos civiles y políticos", "Los derechos económicos, sociales y culturales", "El derecho al medio ambiente sano", "El derecho a la paz"], "correct": 1},
    {"text": "El desplazamiento forzado en Colombia ha generado principalmente:", "options": ["Una rápida urbanización sin planificación", "El incremento de la población rural", "La disminución del desempleo urbano", "El mejoramiento de la agricultura comercial"], "correct": 0},
    {"text": "La Revolución Industrial, que comenzó en el siglo XVIII en Inglaterra, se destacó por:", "options": ["El abandono de la producción agrícola", "El reemplazo del trabajo manual por la maquinaria", "La abolición del trabajo asalariado", "El fortalecimiento de los imperios coloniales americanos"], "correct": 1},
    {"text": "¿Qué significa que Colombia sea un Estado laico?", "options": ["Que no permite la práctica de ninguna religión", "Que asume el catolicismo como religión oficial", "Que mantiene independencia de cualquier organización religiosa", "Que prohíbe la construcción de iglesias nuevas"], "correct": 2}
]

synthetic_ciencias = [
    {"text": "Durante la fotosíntesis, las plantas convierten la energía solar en energía química. ¿Qué gas es necesario que la planta absorba de la atmósfera para realizar este proceso?", "options": ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Monóxido de carbono"], "correct": 1},
    {"text": "La ley de conservación de la masa establece que en una reacción química ordinaria:", "options": ["La masa total de los reactivos es menor que la de los productos", "La masa no se crea ni se destruye, solo se transforma", "Los productos tienen diferente cantidad de átomos que los reactivos", "La masa depende de la temperatura del ambiente"], "correct": 1},
    {"text": "¿Cuál de las siguientes es una magnitud vectorial en física?", "options": ["Masa", "Temperatura", "Velocidad", "Tiempo"], "correct": 2},
    {"text": "El proceso mediante el cual una célula diploide se divide para formar cuatro células haploides con variabilidad genética se llama:", "options": ["Mitosis", "Meiosis", "Fagocitosis", "Bipartición"], "correct": 1},
    {"text": "Al mezclar ácido clorhídrico (HCl) con hidróxido de sodio (NaOH), se produce una reacción de neutralización. ¿Qué productos se obtienen?", "options": ["Agua y una sal neutra (NaCl)", "Óxido de sodio y gas hidrógeno", "Gas cloro y gas hidrógeno", "Ácido sulfúrico y agua"], "correct": 0},
    {"text": "Un objeto de 2 kg se mueve con una aceleración de 3 m/s². Según la segunda ley de Newton, la fuerza neta aplicada sobre el objeto es:", "options": ["1.5 N", "5 N", "6 N", "12 N"], "correct": 2},
    {"text": "En biología ecológica, ¿cómo se denomina a la relación en la que una especie se beneficia y la otra no se ve afectada ni perjudicada?", "options": ["Mutualismo", "Comensalismo", "Parasitismo", "Competencia"], "correct": 1},
    {"text": "El pH es una medida de la acidez o alcalinidad. Una solución con un pH de 2 se considera:", "options": ["Fuertemente alcalina", "Fuertemente ácida", "Neutra", "Ligeramente alcalina"], "correct": 1},
    {"text": "La primera ley de la termodinámica está directamente relacionada con:", "options": ["El aumento de la entropía", "La conservación de la energía", "La conductividad térmica", "La expansión de los gases ideales"], "correct": 1},
    {"text": "¿Cuál es la función principal de los ribosomas en la célula?", "options": ["La respiración celular", "La digestión de nutrientes", "La síntesis de proteínas", "El almacenamiento de agua"], "correct": 2},
    {"text": "El calentamiento global es intensificado por la emisión de gases de efecto invernadero. ¿Cuál de los siguientes es el gas de efecto invernadero de origen antropogénico más abundante?", "options": ["Metano", "Óxido nitroso", "Dióxido de carbono", "Ozono troposférico"], "correct": 2},
    {"text": "Si un cuerpo cae en el vacío desde cierta altura, ¿qué magnitud permanece constante durante su caída?", "options": ["La velocidad", "La aceleración", "La energía cinética", "La energía potencial"], "correct": 1},
    {"text": "El enlace químico que se forma mediante la transferencia completa de electrones de un átomo a otro se llama:", "options": ["Enlace covalente", "Enlace iónico", "Enlace metálico", "Puente de hidrógeno"], "correct": 1},
    {"text": "De acuerdo con las leyes de Mendel, el cruce de dos individuos heterocigotos (Aa x Aa) producirá una descendencia genotípica en la proporción:", "options": ["1:2:1", "3:1", "9:3:3:1", "1:1"], "correct": 0},
    {"text": "Un isótopo es un átomo que tiene el mismo número de protones pero diferente número de:", "options": ["Electrones", "Quarks", "Fotones", "Neutrones"], "correct": 3},
    {"text": "La energía cinética de un objeto en movimiento depende de su:", "options": ["Altura y masa", "Masa y velocidad", "Volumen y densidad", "Presión y temperatura"], "correct": 1},
    {"text": "El sistema inmunológico humano produce anticuerpos específicos como defensa humoral. ¿Qué células son responsables de producirlos?", "options": ["Linfocitos T", "Linfocitos B", "Macrófagos", "Eritrocitos"], "correct": 1},
    {"text": "¿Qué órgano humano es el principal encargado de filtrar la sangre para formar la orina y eliminar desechos metabólicos?", "options": ["El hígado", "Los riñones", "Los pulmones", "El bazo"], "correct": 1},
    {"text": "Un circuito en serie tiene dos resistencias de 5 ohmios cada una. Si están conectadas a una fuente de 10 V, ¿cuál es la corriente total del circuito según la ley de Ohm?", "options": ["0.5 A", "1 A", "2 A", "10 A"], "correct": 1},
    {"text": "¿Cuál es la teoría más aceptada actualmente que explica el origen y evolución del universo?", "options": ["Teoría del Estado Estacionario", "Teoría Cosmocéntrica", "Teoría Inflacionaria o del Big Bang", "Teoría Creacionista Literal"], "correct": 2}
]

synthetic_ingles = [
    {"text": "Choose the correct word to complete the sentence: 'She has been living in Paris ______ 2015.'", "options": ["for", "since", "until", "in"], "correct": 1},
    {"text": "Read the text: 'Cats are very independent animals. They don't require walks like dogs and prefer mostly their own company.' What does the text imply?", "options": ["Cats are better pets than dogs.", "Cats demand a lot of attention.", "Cats are self-sufficient pets.", "Cats hate being with dogs."], "correct": 2},
    {"text": "Choose the best response to 'Would you mind opening the window?'", "options": ["No, of course not.", "Yes, please.", "I am opening now.", "Yes, it is closed."], "correct": 0},
    {"text": "Select the sentence that is grammatically correct.", "options": ["He don't like playing soccer.", "She hasn't seen that movie yet.", "They was walking in the park yesterday.", "We is going to the hospital tomorrow."], "correct": 1},
    {"text": "What does the sign mean? 'DO NOT LEAVE LUGGAGE UNATTENDED'", "options": ["You cannot bring luggage here.", "You must stay with your bags at all times.", "Someone will watch your bags for you.", "You can leave your bags if you are fast."], "correct": 1},
    {"text": "Complete the sentence: 'If I ______ enough money, I would travel around the world.'", "options": ["have", "will have", "had", "have had"], "correct": 2},
    {"text": "Which word is the synonym of 'Quick'?", "options": ["Slow", "Heavy", "Fast", "Quiet"], "correct": 2},
    {"text": "Where can you see this notice? 'DO NOT FEED THE ANIMALS'", "options": ["At a restaurant", "At a zoo", "At a library", "At a bank"], "correct": 1},
    {"text": "Complete the conversation: \nTom: 'I passed my driving test today!'\nAnna: '______!'", "options": ["Good luck", "Congratulations", "I'm sorry to hear that", "Be careful"], "correct": 1},
    {"text": "What is the opposite of 'expensive'?", "options": ["Cheap", "Costly", "Beautiful", "Terrible"], "correct": 0},
    {"text": "Choose the correct relative pronoun: 'The man ______ jacket is black is my father.'", "options": ["who", "whom", "whose", "which"], "correct": 2},
    {"text": "Read carefully: 'It's a device used for typing information into a computer.' What is it?", "options": ["A mouse", "A screen", "A keyboard", "A printer"], "correct": 2},
    {"text": "Complete with the correct passive voice: 'The letter ______ delivered yesterday.'", "options": ["is", "was", "will be", "were"], "correct": 1},
    {"text": "Which sentence uses the present perfect correctly?", "options": ["I have went to London twice.", "She has wrote three letters today.", "They have visited the museum already.", "He has see the doctor."], "correct": 2},
    {"text": "What is the meaning of 'Call off' in the sentence: 'The concert was called off because of the rain'?", "options": ["To postpone", "To cancel", "To announce", "To begin"], "correct": 1},
    {"text": "Choose the correct comparative: 'This book is ______ than the one we read last week.'", "options": ["more interesting", "most interesting", "interesting", "much interesting"], "correct": 0},
    {"text": "Select the correct option: 'I look forward to ______ you soon.'", "options": ["see", "saw", "seeing", "seen"], "correct": 2},
    {"text": "What does the prefix 'un-' mean in words like 'unhappy' or 'unusual'?", "options": ["Very", "Not", "Again", "Before"], "correct": 1},
    {"text": "Complete: 'By the time we arrived at the cinema, the movie ______.'", "options": ["started", "was starting", "has started", "had started"], "correct": 3},
    {"text": "A person who designs buildings is called an:", "options": ["Engineer", "Architect", "Electrician", "Mechanic"], "correct": 1}
]

def append_synthetic_questions(questions_list, synthetic_list, prefix, current_length, target=40):
    to_add = target - current_length
    if to_add <= 0: return questions_list
    
    # We add up to 'to_add' or all available synthetic questions
    added_count = 0
    for sq in synthetic_list:
        if added_count >= to_add:
            break
        # Create a new question object
        new_q = {
            "id": f"{prefix}_syn_{added_count}",
            "original_num": f"syn_{added_count}",
            "text": sq["text"],
            "options": sq["options"],
            "correct": sq["correct"]
        }
        questions_list.append(new_q)
        added_count += 1
        
    return questions_list


with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# The keys in the actual json
data["Matemáticas"] = append_synthetic_questions(data["Matemáticas"], synthetic_math, "mat", len(data["Matemáticas"]), target=23)
data["Lectura Crítica"] = append_synthetic_questions(data["Lectura Crítica"], [], "lc", len(data["Lectura Crítica"]), target=40) # already has 40
data["Sociales y Ciudadanas"] = append_synthetic_questions(data["Sociales y Ciudadanas"], synthetic_sociales, "soc", len(data["Sociales y Ciudadanas"]), target=27)
data["Ciencias Naturales"] = append_synthetic_questions(data["Ciencias Naturales"], synthetic_ciencias, "cn", len(data["Ciencias Naturales"]), target=20)
data["Inglés"] = append_synthetic_questions(data["Inglés"], synthetic_ingles, "ing", len(data["Inglés"]), target=24)

for area, qs in data.items():
    print(f"{area}: final count = {len(qs)}")

with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("questions.json successfully padded with text-only mock questions.")
