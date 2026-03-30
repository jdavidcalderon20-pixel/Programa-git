import json

# ============================================================
# COMPLETE ICFES-STYLE QUESTION BANK
# Fully self-contained, no image dependencies.
# ============================================================

questions = {
  "Matemáticas": [
    {
      "id": "mat_1",
      "text": "Una tienda vende 3 tipos de pantalones. El tipo A cuesta $45.000, el tipo B cuesta $60.000 y el tipo C cuesta $80.000. Si un cliente compra 2 pantalones tipo A, 1 tipo B y 1 tipo C, y paga con un billete de $250.000, ¿cuánto dinero le deben devolver?",
      "options": ["$10.000", "$15.000", "$20.000", "$25.000"],
      "correct": 2
    },
    {
      "id": "mat_2",
      "text": "En una urna hay 5 bolas rojas, 3 azules y 2 verdes. Si se saca una bola al azar, ¿cuál es la probabilidad de que sea azul?",
      "options": ["1/2", "3/10", "1/3", "2/5"],
      "correct": 1
    },
    {
      "id": "mat_3",
      "text": "La función f(x) = 2x² - 3x + 1. ¿Cuánto vale f(3)?",
      "options": ["8", "10", "12", "14"],
      "correct": 1
    },
    {
      "id": "mat_4",
      "text": "Un rectángulo tiene un perímetro de 48 cm y su ancho mide 10 cm. ¿Cuál es el área del rectángulo?",
      "options": ["140 cm²", "150 cm²", "160 cm²", "170 cm²"],
      "correct": 0
    },
    {
      "id": "mat_5",
      "text": "Si x + y = 10 y x - y = 4, ¿cuánto vale x · y?",
      "options": ["21", "24", "25", "28"],
      "correct": 0
    },
    {
      "id": "mat_6",
      "text": "Dos trabajadores terminan una tarea en 6 días trabajando juntos. El primero solo tardaría 10 días. ¿Cuántos días tardaría el segundo solo?",
      "options": ["12 días", "15 días", "18 días", "20 días"],
      "correct": 1
    },
    {
      "id": "mat_7",
      "text": "¿Cuál es el valor de la expresión: (3 + 5)² ÷ 4 - 2 × 3?",
      "options": ["10", "16", "10", "8"],
      "correct": 0
    },
    {
      "id": "mat_8",
      "text": "Un automóvil recorre 300 km en 5 horas a velocidad constante. ¿Qué distancia recorre en 8 horas a la misma velocidad?",
      "options": ["400 km", "420 km", "480 km", "500 km"],
      "correct": 2
    },
    {
      "id": "mat_9",
      "text": "La media aritmética de los números 8, 12, 15, 20 y x es 14. ¿Cuál es el valor de x?",
      "options": ["13", "14", "15", "16"],
      "correct": 2
    },
    {
      "id": "mat_10",
      "text": "¿Cuánto es el 35% de 1.200?",
      "options": ["380", "400", "420", "440"],
      "correct": 2
    },
    {
      "id": "mat_11",
      "text": "La hipotenusa de un triángulo rectángulo mide 13 cm y uno de sus catetos mide 5 cm. ¿Cuánto mide el otro cateto?",
      "options": ["8 cm", "10 cm", "12 cm", "14 cm"],
      "correct": 2
    },
    {
      "id": "mat_12",
      "text": "Un capital de $2.000.000 se invierte al 8% de interés anual simple. ¿Cuánto interés se gana en 3 años?",
      "options": ["$320.000", "$400.000", "$480.000", "$560.000"],
      "correct": 2
    },
    {
      "id": "mat_13",
      "text": "El Mínimo Común Múltiplo (MCM) de 12, 18 y 24 es:",
      "options": ["36", "48", "72", "144"],
      "correct": 2
    },
    {
      "id": "mat_14",
      "text": "¿Cuántos números enteros hay entre -7 y 4 (sin incluirlos)?",
      "options": ["9", "10", "11", "12"],
      "correct": 1
    },
    {
      "id": "mat_15",
      "text": "Un polígono regular tiene 8 lados. ¿Cuánto mide la suma de sus ángulos internos?",
      "options": ["900°", "1080°", "1200°", "1440°"],
      "correct": 1
    },
    {
      "id": "mat_16",
      "text": "Si un artículo cuesta $120.000 con IVA del 19%, ¿cuál era su precio sin IVA (aproximado)?",
      "options": ["$98.000", "$100.840", "$101.000", "$103.450"],
      "correct": 1
    },
    {
      "id": "mat_17",
      "text": "¿Cuál es el valor de x en la ecuación: 3x - 7 = 2x + 5?",
      "options": ["10", "12", "14", "16"],
      "correct": 1
    },
    {
      "id": "mat_18",
      "text": "En una clase de 30 estudiantes, el 40% son hombres. ¿Cuántas mujeres hay en la clase?",
      "options": ["12", "15", "18", "20"],
      "correct": 2
    },
    {
      "id": "mat_19",
      "text": "La expresión algebraica x² - 16 se factoriza como:",
      "options": ["(x - 4)²", "(x + 4)²", "(x - 4)(x + 4)", "(x - 2)(x + 8)"],
      "correct": 2
    },
    {
      "id": "mat_20",
      "text": "¿Cuánto es el 60% de 3/5?",
      "options": ["18/50", "36/100", "9/25", "Todas las anteriores son equivalentes"],
      "correct": 3
    },
    {
      "id": "mat_21",
      "text": "Un cubo tiene un volumen de 64 cm³. ¿Cuánto mide la arista del cubo?",
      "options": ["2 cm", "4 cm", "6 cm", "8 cm"],
      "correct": 1
    },
    {
      "id": "mat_22",
      "text": "La suma de los primeros 10 números naturales (1 + 2 + 3 + ... + 10) es:",
      "options": ["45", "50", "55", "60"],
      "correct": 2
    },
    {
      "id": "mat_23",
      "text": "Si log₂(x) = 5, ¿cuánto vale x?",
      "options": ["10", "25", "32", "64"],
      "correct": 2
    },
    {
      "id": "mat_24",
      "text": "Un tren sale de la ciudad A a las 8:00 a.m. viajando a 90 km/h. Otro sale de la ciudad B (a 360 km de A) a las 10:00 a.m. viajando a 70 km/h en dirección contraria. ¿A qué hora se encuentran?",
      "options": ["11:30 a.m.", "12:00 m.", "12:30 p.m.", "1:00 p.m."],
      "correct": 1
    },
    {
      "id": "mat_25",
      "text": "Las soluciones de la ecuación x² - 5x + 6 = 0 son:",
      "options": ["x = 1 y x = 6", "x = 2 y x = 3", "x = -2 y x = -3", "x = -1 y x = -6"],
      "correct": 1
    }
  ],
  "Lectura Crítica": [
    {
      "id": "lc_1_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"La educación no es la preparación para la vida; la educación es la vida misma.\" — John Dewey\n\n¿Qué postura filosófica expresa la cita de Dewey respecto a la educación?",
      "options": ["La educación es una preparación técnica para el trabajo futuro.", "La educación y la experiencia de vivir son inseparables e idénticas.", "La educación debe ocurrir exclusivamente dentro de las instituciones escolares.", "La vida cotidiana impide el verdadero aprendizaje académico."],
      "correct": 1
    },
    {
      "id": "lc_2_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Las redes sociales han transformado la manera en que los seres humanos se relacionan entre sí. Por un lado, permiten la conexión instantánea con personas de todo el mundo. Sin embargo, estudios recientes señalan un aumento en los niveles de soledad y ansiedad en usuarios frecuentes de estas plataformas.\"\n\n¿Cuál es la idea principal del texto?",
      "options": ["Las redes sociales son perjudiciales para la salud mental.", "Las redes sociales solo tienen efectos positivos en la comunicación.", "Las redes sociales transforman las relaciones humanas, con efectos tanto positivos como negativos.", "El uso de redes sociales debe ser regulado por los gobiernos."],
      "correct": 2
    },
    {
      "id": "lc_3_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Todos los hombres son mortales. Sócrates es un hombre. Por lo tanto, Sócrates es mortal.\"\n\n¿Qué tipo de argumento presenta el texto anterior?",
      "options": ["Argumento inductivo, porque concluye de casos específicos a lo general.", "Argumento por analogía, porque compara dos situaciones similares.", "Argumento deductivo, pues parte de premisas generales para llegar a una conclusión particular.", "Argumento causal, porque establece una relación de causa y efecto."],
      "correct": 2
    },
    {
      "id": "lc_4_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"El agua es un recurso renovable pero finito. Aunque el ciclo hidrológico garantiza su circulación continua, la contaminación y el consumo desmedido amenazan su disponibilidad. En muchas regiones del planeta, millones de personas no tienen acceso a agua potable, una paradoja alarmante en un planeta cubierto en su 71% por agua.\"\n\n¿Cuál es la paradoja que señala el texto?",
      "options": ["El agua es renovable pero también contaminable.", "El ciclo hidrológico funciona de manera continua aunque el agua escasea.", "La mayor parte de la Tierra está cubierta por agua, pero millones de personas no tienen acceso a agua potable.", "Las regiones más lluviosas son las que más sufren de escasez hídrica."],
      "correct": 2
    },
    {
      "id": "lc_5_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"El calentamiento global no es un problema futuro: es una realidad presente. Los glaciares retroceden, el nivel del mar sube y los fenómenos climáticos extremos son cada vez más frecuentes. Los científicos coinciden en que la principal causa es la emisión de gases de efecto invernadero producto de las actividades humanas.\"\n\n¿Con qué propósito principal el autor incluye hechos como el retroceso de glaciares y la subida del nivel del mar?",
      "options": ["Para demostrar que el futuro del planeta es incierto.", "Para evidenciar que el calentamiento global ya es un hecho constatado, no una predicción.", "Para argumentar que los gobiernos deben actuar de forma inmediata.", "Para describir los fenómenos climáticos más impresionantes del planeta."],
      "correct": 1
    },
    {
      "id": "lc_6_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Algunas personas creen que leer libros significa vivir muchas vidas. Cada novela nos sumerge en un mundo distinto, en pensamientos que nunca hubiéramos tenido y en emociones que quizás nunca experimentaríamos en nuestra existencia real. La lectura es, en ese sentido, la forma más accesible de trascender los límites de nuestra propia experiencia.\"\n\n¿Cuál es la función de las palabras 'quizás nunca experimentaríamos en nuestra existencia real'?",
      "options": ["Afirmar que las emociones literarias son idénticas a las reales.", "Contradecir la idea de que leer es una experiencia transformadora.", "Matizar la afirmación, reconociendo que la lectura puede proporcionar experiencias imposibles de vivir de otra forma.", "Aclarar que las novelas son más entretenidas que la vida real."],
      "correct": 2
    },
    {
      "id": "lc_7_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Colombia es uno de los países más biodiversos del mundo. Alberga aproximadamente el 10% de la biodiversidad total del planeta en tan solo el 0,7% de la superficie terrestre. Sin embargo, la deforestación y la expansión agropecuaria amenazan los ecosistemas que sustentan esta riqueza natural.\"\n\nSegún el texto, ¿qué consecuencia tendría la deforestación en Colombia?",
      "options": ["Reducción del porcentaje de superficie terrestre que ocupa el país.", "Pérdida de ecosistemas que sostienen la gran biodiversidad colombiana.", "Aumento de la expansión agropecuaria a nivel mundial.", "Disminución del total de la biodiversidad del planeta en un 10%."],
      "correct": 1
    },
    {
      "id": "lc_8_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"El lenguaje no es simplemente un medio de comunicación, es el instrumento con el cual pensamos y construimos nuestra realidad. Los límites de mi lenguaje significan los límites de mi mundo.\" — Ludwig Wittgenstein\n\n¿Qué implica la afirmación de Wittgenstein sobre la relación entre lenguaje y pensamiento?",
      "options": ["El mundo existe independientemente del lenguaje que usamos para describirlo.", "Aprender nuevos idiomas no amplía nuestra capacidad de pensar.", "Nuestra capacidad de pensar y comprender el mundo está limitada por el lenguaje que dominamos.", "El lenguaje es únicamente una herramienta de comunicación social."],
      "correct": 2
    },
    {
      "id": "lc_9_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Proponente: Las cámaras de seguridad en espacios públicos son necesarias para reducir el crimen.\nOponente: Pero eso viola el derecho a la privacidad de los ciudadanos.\nProponente: La seguridad colectiva debe estar por encima de la privacidad individual.\"\n\n¿Cuál es la estrategia argumentativa del Proponente en su segunda intervención?",
      "options": ["Descalificar el argumento del Oponente por irrelevante.", "Aceptar la premisa del Oponente sobre privacidad, pero argumentar que la seguridad tiene más valor.", "Cambiar el tema para evitar responder al argumento sobre privacidad.", "Presentar evidencias estadísticas que refuten al Oponente."],
      "correct": 1
    },
    {
      "id": "lc_10_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Era tan alto el temporal que los marineros tuvieron miedo. Pero el capitán, impasible, permaneció en el timón durante toda la tormenta, sin pronunciar una sola palabra. Al amanecer, cuando el mar se calmó, fue él quien primero rompió el silencio: 'El mar siempre recuerda quién lo respeta.'\".\n\n¿Qué rasgo del carácter del capitán se destaca principalmente en el fragmento?",
      "options": ["Su loquacidad y facilidad de palabra en momentos de tensión.", "Su valentia miedosa ante el peligro.", "Su serenidad y temple ante la adversidad.", "Su indiferencia ante los problemas del equipo."],
      "correct": 2
    },
    {
      "id": "lc_11_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"La publicidad moderna no vende productos; vende estilos de vida, emociones y aspiraciones. Cuando una marca anuncia un automóvil, no habla de su motor ni de su eficiencia: habla de libertad, de estatus y de aventura. En consecuencia, el consumidor no compra un carro, sino un sueño.\"\n\n¿Qué figura retórica se usa en la expresión 'el consumidor compra un sueño'?",
      "options": ["Ironía", "Hipérbole", "Metáfora", "Comparación"],
      "correct": 2
    },
    {
      "id": "lc_12_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Los jóvenes de hoy están menos informados que los de generaciones anteriores, a pesar de tener acceso a más información. Paradójicamente, el exceso de información parece producir un efecto narcotizante: se recibe tanta, de tantas fuentes y tan rápido, que el resultado es la pasividad y la superficialidad.\"\n\n¿Qué término describe mejor el fenómeno que el autor llama 'efecto narcotizante'?",
      "options": ["Analfabetismo digital: incapacidad de usar las tecnologías de información.", "Infoxicación: sobrecarga de información que genera desorientación e incapacidad crítica.", "Polarización: división ideológica causada por el uso de redes sociales.", "Desinformación: circulación deliberada de noticias falsas."],
      "correct": 1
    },
    {
      "id": "lc_13_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"La novela realista del siglo XIX buscaba reproducir fielmente la sociedad de su época, sus conflictos económicos, sus jerarquías sociales y la psicología de sus personajes. Autores como Balzac, Flaubert y Tolstói crearon vastos universos ficcionales que funcionaban como espejos críticos de la realidad.\"\n\n¿Con qué propósito se mencionan a Balzac, Flaubert y Tolstói en el texto?",
      "options": ["Para contrastar sus estilos literarios entre sí.", "Para ilustrar con ejemplos la afirmación sobre el realismo literario del siglo XIX.", "Para argumentar que la novela realista es superior a otros géneros literarios.", "Para establecer una cronología de los autores más importantes de la historia."],
      "correct": 1
    },
    {
      "id": "lc_14_ctx",
      "text": "Lee el siguiente poema y responde:\n\n\"Hoy la tierra y los cielos me sonríen,\nhoy llega al fondo de mi alma el sol,\nhoy la he visto... la he visto y me ha mirado...¡Hoy creo en Dios!\"\n— Gustavo Adolfo Bécquer\n\n¿Qué genera en el hablante lírico el encuentro con 'ella'?",
      "options": ["Tristeza y nostalgia por el amor perdido.", "Una profunda decepción romántica.", "Una súbita experiencia de plenitud y fe.", "Un sentimiento de odio hacia quienes no aman."],
      "correct": 2
    },
    {
      "id": "lc_15_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"El siglo XXI trajo consigo la llamada 'economía de la atención'. Las empresas tecnológicas compiten ferozmente por capturar el tiempo y la concentración de los usuarios: cada notificación, cada algoritmo, está diseñado para mantener a la persona enganchada a la pantalla el mayor tiempo posible.\"\n\n¿Qué crítica implícita contiene el texto respecto a las plataformas tecnológicas?",
      "options": ["Las plataformas tecnológicas deberían ser reguladas para que sean más educativas.", "Las plataformas manipulan el comportamiento del usuario de manera deliberada para su propio beneficio económico.", "La tecnología es fundamentalmente incompatible con la salud mental.", "Los usuarios deben apagar sus dispositivos para ser más productivos."],
      "correct": 1
    },
    {
      "id": "lc_16_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"El Gobierno anunció una nueva reforma tributaria que aumentará el impuesto a los dividendos del 10% al 20%. Grandes empresarios la rechazan, calificándola de 'confiscatoria'. El Ministerio de Hacienda, en cambio, la defiende como una medida de equidad para financiar programas sociales.\"\n\n¿Qué tipo de conflicto refleja el texto?",
      "options": ["Un conflicto entre ramas del poder público.", "Un enfrentamiento político entre dos partidos por el gobierno del país.", "Una tensión entre intereses del sector privado y objetivos de política pública.", "Un debate académico sobre las teorías de la tributación."],
      "correct": 2
    },
    {
      "id": "lc_17_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"Dicen que el tiempo cura todas las heridas. Pero yo he comprobado que el tiempo no cura: el tiempo simplemente aleja. La herida permanece; solo cambia la distancia desde la que la miramos.\"\n\n¿Cuál es el propósito principal del hablante al refutar el proverbio?",
      "options": ["Contradecir por contradecir, sin ofrecer una alternativa real.", "Expresar resignación total ante el paso del tiempo.", "Cuestionar la idea popular y proponer una visión más matizada sobre el duelo y el dolor.", "Demostrar que los proverbios son siempre incorrectos."],
      "correct": 2
    },
    {
      "id": "lc_18_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"En el debate político moderno, a menudo se observa el fenómeno conocido como 'hombre de paja': en lugar de refutar el argumento real del oponente, se distorsiona o exagera su postura para facilitar su refutación.\"\n\nEjemplo: 'Mi oponente quiere aumentar el gasto público; básicamente quiere arruinar el país.'\n\n¿Por qué el ejemplo constituye una falacia del 'hombre de paja'?",
      "options": ["Porque el orador utiliza datos estadísticos falsos para defender su punto.", "Porque distorsiona la postura del oponente exagerando sus consecuencias para atacar una versión deformada.", "Porque el argumento carece de premisas que lo sustenten.", "Porque el orador ataca la persona en lugar del argumento."],
      "correct": 1
    },
    {
      "id": "lc_19_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"El mundo está lleno de personas que confunden la familiaridad con la verdad. Solo porque algo se repite muchas veces no significa que sea correcto. Es lo que se conoce como el 'efecto ilusión de la verdad': entre más frecuente es la exposición a una afirmación, más creíble parece.\"\n\n¿Cuál afirmación describe mejor el 'efecto ilusión de la verdad' según el texto?",
      "options": ["Una afirmación verdadera se vuelve falsa si se repite demasiado.", "La repetición sistemática de una idea hace que las personas la perciban como verdadera, independientemente de su validez.", "Las personas creen más fácilmente la información que se les presenta de forma visual.", "La verdad siempre termina imponiéndose sobre las mentiras que se repiten."],
      "correct": 1
    },
    {
      "id": "lc_20_ctx",
      "text": "Lee el siguiente fragmento y responde:\n\n\"A lo largo de la historia, las utopías han sido tanto un motor de progreso como una fuente de peligro. Las visiones de mundos perfectos han impulsado revoluciones, reformas sociales y movimientos de derechos. Pero también han justificado regímenes totalitarios que, en nombre de un ideal, arrasaron con libertades fundamentales.\"\n\n¿Cuál es la tesis principal del texto?",
      "options": ["Las utopías son únicamente peligrosas y deben ser abandonadas.", "Las utopías son siempre positivas porque impulsan el progreso social.", "Las utopías son un fenómeno ambivalente, capaz tanto de impulsar el bien como de legitimar el mal.", "El totalitarismo es la única consecuencia posible de los ideales utópicos."],
      "correct": 2
    }
  ],
  "Sociales y Ciudadanas": [
    {
      "id": "soc_1",
      "text": "La Constitución Política de Colombia de 1991 define al país como un Estado Social de Derecho. ¿Cuál de los siguientes principios es fundamental en este concepto?",
      "options": ["La concentración del poder en un solo órgano del Estado.", "El Estado garantiza los derechos fundamentales y tiene responsabilidad en el bienestar de sus ciudadanos.", "La economía de mercado libre sin intervención estatal.", "La supremacía de la religión sobre las normas jurídicas."],
      "correct": 1
    },
    {
      "id": "soc_2",
      "text": "¿Cuál es la principal diferencia entre el Plebiscito y el Referendo como mecanismos de participación ciudadana en Colombia?",
      "options": ["El plebiscito consulta la opinión ciudadana sobre una decisión del Ejecutivo; el referendo somete a votación normas jurídicas.", "El plebiscito solo puede ser convocado por el Congreso; el referendo solo por el Presidente.", "El plebiscito modifica la Constitución; el referendo cambia leyes ordinarias.", "No hay ninguna diferencia; son sinónimos en el derecho colombiano."],
      "correct": 0
    },
    {
      "id": "soc_3",
      "text": "El Frente Nacional (1958-1974) en Colombia fue un acuerdo político que consistió en:",
      "options": ["La alianza del ejército y la iglesia para gobernar el país.", "La alternancia del poder entre los partidos Liberal y Conservador para frenar la violencia bipartidista.", "La formación de un gobierno de coalición con múltiples partidos.", "La entrega del poder político a los militares tras la dictadura de Rojas Pinilla."],
      "correct": 1
    },
    {
      "id": "soc_4",
      "text": "En economía, el Producto Interno Bruto (PIB) mide:",
      "options": ["El total de las exportaciones menos las importaciones de un país en un año.", "El valor total de todos los bienes y servicios producidos dentro de un país durante un período de tiempo.", "El ingreso promedio de los ciudadanos de un país.", "La cantidad de dinero en circulación en una economía."],
      "correct": 1
    },
    {
      "id": "soc_5",
      "text": "La Revolución Francesa (1789) tuvo como una de sus principales consecuencias ideológicas:",
      "options": ["La difusión del mercantilismo como sistema económico global.", "La expansión del feudalismo por toda Europa occidental.", "La consolidación de los ideales de libertad, igualdad y fraternidad como fundamentos del pensamiento político moderno.", "El fortalecimiento de las monarquías absolutas europeas."],
      "correct": 2
    },
    {
      "id": "soc_6",
      "text": "¿Cuál es la función de la Contraloría General de la República en Colombia?",
      "options": ["Investigar y sancionar disciplinariamente a los servidores públicos.", "Ejercer el control fiscal sobre los recursos y bienes del Estado.", "Defender los derechos humanos de los ciudadanos.", "Administrar el sistema de seguridad social del país."],
      "correct": 1
    },
    {
      "id": "soc_7",
      "text": "El proceso de colonización española en América tuvo como uno de sus efectos más devastadores:",
      "options": ["El enriquecimiento material de las comunidades indígenas americanas.", "El intercambio equitativo de culturas entre Europa y América.", "La drástica disminución de la población indígena por las enfermedades, la explotación y la violencia.", "La instauración de democracias representativas en los territorios conquistados."],
      "correct": 2
    },
    {
      "id": "soc_8",
      "text": "El deber del Estado colombiano ante una violación a los derechos fundamentales de un ciudadano incluye:",
      "options": ["Garantizar que el ciudadano pueda interponer una acción de tutela para su protección inmediata.", "Cobrar una tarifa para investigar el caso.", "Derivar el caso exclusivamente a organismos internacionales de derechos humanos.", "Archivar la queja si no hay pruebas fotográficas."],
      "correct": 0
    },
    {
      "id": "soc_9",
      "text": "El concepto de 'separación de poderes' desarrollado por Montesquieu busca principalmente:",
      "options": ["Concentrar la autoridad en el poder judicial para garantizar la justicia.", "Distribuir el poder del Estado en órganos independientes que se controlen mutuamente para evitar el abuso.", "Eliminar la figura del Ejecutivo y transferir sus funciones al Legislativo.", "Permitir que el ejército ejerza control sobre las ramas civiles del gobierno."],
      "correct": 1
    },
    {
      "id": "soc_10",
      "text": "La Segunda Guerra Mundial (1939-1945) fue desencadenada principalmente por:",
      "options": ["La crisis económica latinoamericana y la Revolución Cubana.", "El expansionismo del régimen nazi alemán y sus aliados fascistas.", "Un conflicto por el control de las rutas comerciales del Océano Pacífico.", "Las disputas coloniales entre Francia e Inglaterra en África."],
      "correct": 1
    },
    {
      "id": "soc_11",
      "text": "En el sistema político colombiano, ¿cuál es la función principal del Congreso de la República?",
      "options": ["Hacer cumplir las leyes y administrar los recursos del Estado.", "Impartir justicia en los casos de mayor trascendencia nacional.", "Crear, modificar y derogar las leyes, y ejercer control político sobre el Ejecutivo.", "Elegir al Presidente de la República en segunda vuelta."],
      "correct": 2
    },
    {
      "id": "soc_12",
      "text": "El desplazamiento forzado interno en Colombia ha generado como consecuencia social más significativa:",
      "options": ["Una mayor integración cultural entre las regiones del país.", "La creciente urbanización de zonas rurales.", "El crecimiento desordenado de las ciudades y la agudización de la pobreza urbana.", "La disminución del conflicto en las zonas receptoras de población desplazada."],
      "correct": 2
    },
    {
      "id": "soc_13",
      "text": "¿Qué implica la laicidad del Estado colombiano, consagrada en la Constitución de 1991?",
      "options": ["Se prohíbe cualquier expresión religiosa en espacios públicos.", "El Estado no profesa ni financia ninguna religión oficial, garantizando la libertad de culto.", "Solo las religiones reconocidas por el Estado pueden practicarse libremente.", "La Iglesia Católica posee un estatus especial reconocido por el Estado."],
      "correct": 1
    },
    {
      "id": "soc_14",
      "text": "La Guerra Fría (1947-1991) fue un enfrentamiento principalmente entre:",
      "options": ["China y Japón por el dominio del Pacífico asiático.", "Estados Unidos y la Unión Soviética por la hegemonía global, basado en modelos capitalista y comunista respectivamente.", "Los países europeos por el control de las colonias africanas.", "América Latina y Europa por la soberanía económica regional."],
      "correct": 1
    },
    {
      "id": "soc_15",
      "text": "¿Cuál de los siguientes es un derecho de tercera generación?",
      "options": ["Derecho al voto.", "Derecho a la educación.", "Derecho al medio ambiente sano.", "Derecho al debido proceso."],
      "correct": 2
    },
    {
      "id": "soc_16",
      "text": "El modelo económico neoliberal, que ganó predominio global desde la década de 1980, se caracteriza por:",
      "options": ["La propiedad estatal de los medios de producción y la planificación centralizada.", "La liberalización de los mercados, la privatización de empresas públicas y la reducción del gasto estatal.", "El fomento de los aranceles altos para proteger la industria nacional de la competencia extranjera.", "La redistribución radical de la riqueza mediante impuestos a los capitales."],
      "correct": 1
    },
    {
      "id": "soc_17",
      "text": "El Acuerdo de Paz firmado en 2016 entre el Gobierno colombiano y las FARC-EP contempló como uno de sus pilares fundamentales:",
      "options": ["La simple amnistía general sin condiciones para todos los miembros de la guerrilla.", "La extradición inmediata a Estados Unidos de todos los jefes de la organización.", "La Reforma Rural Integral, orientada a transformar las condiciones del campo como causa estructural del conflicto.", "La disolución del ejército colombiano como condición para la paz."],
      "correct": 2
    },
    {
      "id": "soc_18",
      "text": "¿Qué es la inflación en economía?",
      "options": ["El incremento del valor de la moneda nacional frente al dólar.", "El aumento sostenido y generalizado del nivel de precios de bienes y servicios en una economía.", "La disminución del desempleo como resultado de políticas de inversión.", "El aumento de las exportaciones de un país en relación a sus importaciones."],
      "correct": 1
    },
    {
      "id": "soc_19",
      "text": "Los grupos étnicos en Colombia cuentan con derechos especiales reconocidos en la Constitución de 1991, entre ellos:",
      "options": ["La exención total del pago de impuestos nacionales.", "El derecho a la consulta previa cuando se toman decisiones que puedan afectar sus territorios o forma de vida.", "La posibilidad de crear sus propios Estados soberanos dentro del territorio colombiano.", "El derecho exclusivo a la explotación de recursos naturales en sus territorios."],
      "correct": 1
    },
    {
      "id": "soc_20",
      "text": "La Independencia de Colombia (proclamada en 1810) fue impulsada principalmente por:",
      "options": ["Una invasión militar de los Estados Unidos al virreinato neogranadino.", "Las ideas ilustradas de la época, el descontento con el monopolio comercial español y el ejemplo de otras revoluciones.", "El apoyo directo del rey de España para separarse de la corona.", "Un levantamiento exclusivamente campesino e indígena sin participación criolla."],
      "correct": 1
    }
  ],
  "Ciencias Naturales": [
    {
      "id": "cn_1",
      "text": "Durante la fotosíntesis, las plantas utilizan dióxido de carbono (CO₂), agua (H₂O) y energía solar para producir glucosa y oxígeno. ¿En qué parte de la célula vegetal ocurre esta reacción?",
      "options": ["En la mitocondria", "En el núcleo celular", "En el cloroplasto", "En el ribosoma"],
      "correct": 2
    },
    {
      "id": "cn_2",
      "text": "Según la primera Ley de Newton (Ley de la inercia), un objeto en reposo permanecerá en reposo a menos que:",
      "options": ["Su temperatura aumente lo suficiente.", "Una fuerza neta externa actúe sobre él.", "Cambie su composición química.", "Se encuentre en el vacío."],
      "correct": 1
    },
    {
      "id": "cn_3",
      "text": "¿Cuál de los siguientes procesos describe correctamente la meiosis?",
      "options": ["División celular que produce dos células hijas idénticas a la célula madre, con el mismo número de cromosomas.", "División celular que produce cuatro células haploides con la mitad de cromosomas de la célula original, generando variabilidad genética.", "Proceso de duplicación del ADN sin división celular.", "Mecanismo de reproducción asexual por gemación."],
      "correct": 1
    },
    {
      "id": "cn_4",
      "text": "Al mezclar un ácido y una base en proporciones estequiométricas, se produce una reacción de neutralización. ¿Cuáles son los productos típicos de esta reacción?",
      "options": ["Un ácido más fuerte y un gas inflamable.", "Agua y una sal.", "Dos gases distintos y vapor de agua.", "Un óxido metálico y hidrógeno."],
      "correct": 1
    },
    {
      "id": "cn_5",
      "text": "El principio de conservación de la energía establece que en un sistema aislado:",
      "options": ["La energía cinética siempre es mayor que la energía potencial.", "La energía total no se crea ni se destruye, sino que se transforma de una forma a otra.", "La energía mecánica siempre aumenta con el tiempo.", "La energía calorífica se convierte en mecánica sin pérdidas."],
      "correct": 1
    },
    {
      "id": "cn_6",
      "text": "La relación ecológica en la que ambas especies se benefician se denomina:",
      "options": ["Parasitismo", "Comensalismo", "Mutualismo", "Competencia"],
      "correct": 2
    },
    {
      "id": "cn_7",
      "text": "Una solución con pH igual a 7 se considera:",
      "options": ["Fuertemente ácida", "Ligeramente básica", "Neutra", "Fuertemente básica"],
      "correct": 2
    },
    {
      "id": "cn_8",
      "text": "¿Cuál es la función principal de los linfocitos B en el sistema inmunológico humano?",
      "options": ["Producir anticuerpos específicos contra antígenos.", "Transportar el oxígeno desde los pulmones a los tejidos.", "Fagocitar células cancerosas directamente.", "Regular la temperatura corporal."],
      "correct": 0
    },
    {
      "id": "cn_9",
      "text": "El número atómico de un elemento químico indica:",
      "options": ["El número de neutrones en el núcleo del átomo.", "El peso en gramos de un mol del elemento.", "El número de protones en el núcleo, que determina la identidad del elemento.", "El número total de partículas en el átomo."],
      "correct": 2
    },
    {
      "id": "cn_10",
      "text": "¿Qué sucede con la energía cinética de un objeto cuando su velocidad se duplica?",
      "options": ["Se duplica", "Se triplica", "Se cuadruplica", "Permanece igual"],
      "correct": 2
    },
    {
      "id": "cn_11",
      "text": "El ciclo del carbono es fundamental para la vida. ¿Qué proceso realizan los seres autótrofos (plantas) que incorpora el carbono atmosférico a la biosfera?",
      "options": ["Respiración celular aerobia", "Fotosíntesis", "Descomposición microbiana", "Fermentación"],
      "correct": 1
    },
    {
      "id": "cn_12",
      "text": "En la tabla periódica, los elementos de un mismo grupo (columna vertical) comparten:",
      "options": ["El mismo número de neutrones.", "El mismo número de niveles de energía.", "El mismo número de electrones de valencia y propiedades químicas similares.", "La misma masa atómica."],
      "correct": 2
    },
    {
      "id": "cn_13",
      "text": "Un circuito eléctrico en serie tiene tres resistencias de 4Ω, 6Ω y 10Ω. Si se conecta a una fuente de 40 V, ¿cuánta corriente circula por el circuito?",
      "options": ["1 A", "2 A", "3 A", "4 A"],
      "correct": 1
    },
    {
      "id": "cn_14",
      "text": "El ADN es la molécula portadora de la información genética. ¿Cuál de las siguientes afirmaciones sobre el ADN es correcta?",
      "options": ["Está formado por una sola cadena de nucleótidos.", "Su información se transcribe directamente a proteínas sin intermediarios.", "Está constituido por dos cadenas antiparalelas de nucleótidos unidas por puentes de hidrógeno.", "Solo se encuentra en el núcleo de las células procariotas."],
      "correct": 2
    },
    {
      "id": "cn_15",
      "text": "La teoría de la evolución por selección natural propuesta por Darwin establece que:",
      "options": ["Los organismos adquieren características durante su vida y las transmiten a su descendencia.", "Las especies surgieron simultáneamente y no han cambiado desde su origen.", "Los individuos con características más adaptadas a su entorno tienen mayor probabilidad de sobrevivir y reproducirse, transmitiendo esas características.", "La evolución ocurre únicamente por mutaciones aleatorias sin ningún mecanismo de selección."],
      "correct": 2
    },
    {
      "id": "cn_16",
      "text": "¿Cuál de los siguientes gases tiene mayor responsabilidad en el efecto invernadero de origen humano?",
      "options": ["Oxígeno (O₂)", "Nitrógeno (N₂)", "Dióxido de carbono (CO₂)", "Gas noble Argón (Ar)"],
      "correct": 2
    },
    {
      "id": "cn_17",
      "text": "La ley de la gravitación universal de Newton establece que la fuerza gravitacional entre dos objetos:",
      "options": ["Es independiente de la masa de los objetos.", "Aumenta al incrementarse la distancia entre ellos.", "Es directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia entre ellos.", "Solo existe entre objetos de la misma masa."],
      "correct": 2
    },
    {
      "id": "cn_18",
      "text": "Con respecto a la herencia genética, un individuo con genotipo Aa (heterocigoto dominante) para el carácter color de ojos (A = marrón dominante, a = azul recesivo) tendrá los ojos de color:",
      "options": ["Azul, porque el alelo recesivo siempre se expresa en el fenotipo.", "Marrón, porque el alelo dominante A se expresa en el fenotipo.", "Verde, porque se mezclan los dos alelos.", "Gris, porque el carácter es codominante."],
      "correct": 1
    },
    {
      "id": "cn_19",
      "text": "¿Cuál de los siguientes es un ejemplo de energía renovable?",
      "options": ["Gas natural", "Carbón mineral", "Petróleo", "Energía solar fotovoltaica"],
      "correct": 3
    },
    {
      "id": "cn_20",
      "text": "La respiración celular aerobia ocurre principalmente en la mitocondria y tiene como objetivo:",
      "options": ["Producir dióxido de carbono para la fotosíntesis.", "Sintetizar glucosa a partir de CO₂ y agua.", "Obtener energía (en forma de ATP) a partir de la oxidación de la glucosa.", "Eliminar el exceso de oxígeno de la célula."],
      "correct": 2
    }
  ],
  "Inglés": [
    {
      "id": "ing_1",
      "text": "Read the following text: 'Exercise has numerous benefits for both the body and mind. Regular physical activity helps reduce the risk of chronic diseases such as diabetes and heart disease. Furthermore, it improves mood, reduces stress, and enhances sleep quality.'\n\nWhat is the main idea of the text?",
      "options": ["Exercise is only beneficial for mental health.", "Regular exercise provides multiple health benefits for body and mind.", "Chronic diseases can only be cured through exercise.", "Sleep quality is the most important factor in health."],
      "correct": 1
    },
    {
      "id": "ing_2",
      "text": "Choose the correct option to complete the sentence:\n\n'If I ________ more time, I would study another language.'",
      "options": ["have", "will have", "had", "would have"],
      "correct": 2
    },
    {
      "id": "ing_3",
      "text": "Select the sentence that uses the present perfect correctly:",
      "options": ["She has went to the market this morning.", "They have already seen that movie.", "We has finished the project last week.", "He have called me three times today."],
      "correct": 1
    },
    {
      "id": "ing_4",
      "text": "Read the advertisement: 'GRAND OPENING! Fresh Bakery Downtown. We offer artisan bread, pastries, and custom cakes. Open Monday to Saturday, 7 a.m. - 8 p.m. First 50 customers get a FREE muffin!'\n\nWhich of the following statements is TRUE according to the advertisement?",
      "options": ["The bakery is open every day of the week.", "All customers receive a free muffin.", "The bakery sells bread, pastries, and custom cakes.", "The bakery opens at 8 a.m."],
      "correct": 2
    },
    {
      "id": "ing_5",
      "text": "Choose the word that best completes the sentence:\n\n'The results of the new study are very ________; scientists from around the world are excited about the potential implications.'",
      "options": ["disappointing", "ordinary", "promising", "confusing"],
      "correct": 2
    },
    {
      "id": "ing_6",
      "text": "What does the word 'HOWEVER' express in the following sentence?\n\n'She trained for months; however, she did not win the race.'",
      "options": ["Addition of similar ideas.", "Cause and effect relationship.", "Contrast between two ideas.", "Temporal sequence of events."],
      "correct": 2
    },
    {
      "id": "ing_7",
      "text": "Read the email: 'Dear Mr. Johnson, I am writing to apply for the Marketing Manager position advertised on your website. I have five years of experience in digital marketing and I am confident that my skills would be a great asset to your team. I have attached my CV for your consideration. Sincerely, Laura Gómez'\n\nWhat is the purpose of this email?",
      "options": ["To complain about a product.", "To apply for a job offer.", "To request information about a course.", "To confirm an appointment."],
      "correct": 1
    },
    {
      "id": "ing_8",
      "text": "Choose the correct passive voice form:\n\n'Someone stole my wallet yesterday.' → (passive voice)",
      "options": ["My wallet was stolen yesterday.", "My wallet is stolen yesterday.", "My wallet has stolen yesterday.", "My wallet were stolen yesterday."],
      "correct": 0
    },
    {
      "id": "ing_9",
      "text": "What does 'CALL OFF' mean in this sentence?\n\n'The outdoor concert was called off because of the heavy rain.'",
      "options": ["To postpone to a later date.", "To cancel completely.", "To move to a different location.", "To reduce the duration of."],
      "correct": 1
    },
    {
      "id": "ing_10",
      "text": "Read the following text: 'Deforestation in the Amazon rainforest represents one of the greatest ecological threats of our time. Every year, millions of hectares of forest are destroyed, releasing huge amounts of CO₂ and eliminating the habitat of thousands of species. Despite international agreements, the pace of destruction continues to accelerate.'\n\nWhat can be inferred from the last sentence of the text?",
      "options": ["International agreements have been very effective in stopping deforestation.", "The deforestation problem has been solved thanks to global cooperation.", "Despite efforts through international agreements, deforestation continues to increase.", "The Amazon rainforest will be completely destroyed in ten years."],
      "correct": 2
    },
    {
      "id": "ing_11",
      "text": "Choose the correct question tag:\n\n'She hasn't finished her homework, ________?'",
      "options": ["has she", "hasn't she", "does she", "is she"],
      "correct": 0
    },
    {
      "id": "ing_12",
      "text": "Which sentence expresses a COMPLAINT?",
      "options": ["'Could you tell me where the bank is, please?'", "'I'd like to book a table for two, please.'", "'I'm afraid I must point out that my order arrived late and the food was cold.'", "'Would you like some help with that?'"],
      "correct": 2
    },
    {
      "id": "ing_13",
      "text": "Select the meaning of the underlined idiom:\n\n'After years of hard work, the young entrepreneur finally made it BIG in the technology industry.'",
      "options": ["She made large technology products.", "She worked for very large companies.", "She achieved great success.", "She invested a lot of money in the industry."],
      "correct": 2
    },
    {
      "id": "ing_14",
      "text": "Choose the correct option:\n\n'By the time the ambulance arrived, the patient ________ unconscious for ten minutes.'",
      "options": ["was", "has been", "had been", "is"],
      "correct": 2
    },
    {
      "id": "ing_15",
      "text": "Read the notice: 'IMPORTANT NOTICE: This facility uses CCTV cameras for security purposes. Anyone entering the premises is considered to have given their consent to being filmed.'\n\nWhere would this notice most likely be found?",
      "options": ["In a personal letter.", "At the entrance of a building or public establishment.", "In a medical prescription.", "In a recipe book."],
      "correct": 1
    },
    {
      "id": "ing_16",
      "text": "Which option best describes the tone of the following sentence?\n\n'After countless delays, broken promises, and a complete lack of transparency, one can only conclude that the administration has utterly failed its citizens.'",
      "options": ["Enthusiastic and celebratory.", "Neutral and informative.", "Critical and accusatory.", "Uncertain and doubtful."],
      "correct": 2
    },
    {
      "id": "ing_17",
      "text": "Choose the sentence that uses reported speech correctly:\n\nDirect speech: 'I will call you tomorrow,' said Tom.",
      "options": ["Tom said that he will call me the next day.", "Tom said that he would call me the following day.", "Tom said that he called me the next day.", "Tom says that he would call me the next day."],
      "correct": 1
    },
    {
      "id": "ing_18",
      "text": "Read the review: 'The hotel's location was perfect—right in the heart of the city, close to all major attractions. However, the rooms were smaller than expected and the walls were thin, making it hard to sleep. The staff was friendly and the breakfast was excellent.'\n\nWhat is the reviewer's OVERALL impression of the hotel?",
      "options": ["Entirely negative; they would not recommend it.", "Entirely positive; it was a perfect stay.", "Mixed; it had both positive and negative aspects.", "Not specified; the review lacks a conclusion."],
      "correct": 2
    },
    {
      "id": "ing_19",
      "text": "Which word has the OPPOSITE meaning to 'ABUNDANT'?",
      "options": ["Plentiful", "Scarce", "Wealthy", "Generous"],
      "correct": 1
    },
    {
      "id": "ing_20",
      "text": "Read the following excerpt from a short story:\n\n'The old man sat alone on the park bench every afternoon, feeding the pigeons. He never spoke to anyone. But the children who played nearby had given him a name: 'The Guardian of the Pigeons.' He didn't know this, but it would have made him smile.'\n\nWhat does the last sentence reveal about the old man?",
      "options": ["He was sad because no one ever spoke to him.", "Despite his solitude, he had a kind heart and would have appreciated the children's affection.", "He was indifferent to the children's games and presence.", "He intentionally avoided contact with the children."],
      "correct": 1
    }
  ]
}

with open("C:/Users/Usuario/Desktop/JUAN/Icfes/SimulacroSaber11/src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

# Count
for area, qs in questions.items():
    print(f"{area}: {len(qs)} preguntas")
print("\nquestions.json reemplazado exitosamente con preguntas bien formuladas.")
