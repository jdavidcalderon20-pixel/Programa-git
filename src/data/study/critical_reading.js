export const readingContent = {
  id: 'lectura_critica',
  name: 'Lectura Crítica',
  icon: '📖', 
  color: '#a78bfa',
  topics: [
    {
      id: 'tipologia', 
      name: 'Tipología Textual', 
      icon: '📄',
      sections: [
        {
          title: 'Tipos de Textos según su Propósito',
          concepto: 'Todo texto nace con una "misión". El texto Narrativo busca contarte una historia (cuentos, novelas, noticias). El Argumentativo intenta convencerte de una postura (ensayos, columnas de opinión). El Expositivo solo quiere informarte de manera neutral (enciclopedias, libros de ciencia). El Descriptivo pinta un cuadro con palabras, y el Instructivo te da órdenes o pasos a seguir (recetas o manuales).',
          datoRelevante: 'Si ves un texto que mezcla funciones (por ejemplo, una noticia que empieza a dar opiniones fuertes sobre lo que narra), el ICFES te preguntará por su "intención principal". Siempre prevalece el que domina el cierre y la estructura general.',
          tipIcfes: 'Los textos argumentativos son los reyes de la Prueba Saber 11. Busca inmediatamente la "Tesis" en el primer o último párrafo. Si no tienes clara la postura del autor, estarás adivinando en las preguntas de nivel profundo.'
        },
        {
          title: 'Arquitectura del Texto Narrativo',
          concepto: 'Las historias son el esqueleto de la literatura. Siempre tienen un Narrador (quien cuenta: "yo" en primera persona o "él/ella" en tercera). Incluyen Personajes (el prota y el antagonista), y se mueven a través del Tiempo y el Espacio. Su estructura clásica es: Planteamiento (¿dónde y quiénes?), Nudo (el problema estalla) y Desenlace (cómo se resuelve).',
          datoRelevante: 'Gabriel García Márquez empezaba a escribir "Cien años de soledad" narrando el final en su primer párrafo ("Muchos años después, frente al pelotón de fusilamiento..."). A esto se le llama alterar la cronología lineal (prolepsis).',
          tipIcfes: 'Si el ICFES te pregunta "¿Qué tipo de narrador tiene el fragmento?", busca los pronombres verbales. Si dice "Caminé por la calle", es primera persona. Si dice "Caminó sin rumbo fijo", es un narrador externo que observa.'
        },
        {
          title: 'La Columna Vertebral del Texto Argumentativo',
          concepto: 'Todo texto de opinión tiene una estructura invencible: 1) Tesis: La idea central e inamovible que el autor quiere tatuar en tu cerebro. 2) Argumentos: Los pilares que sostienen esa tesis (datos, ejemplos, citas de expertos). 3) Contraargumentos: Cuando el autor se adelanta a quien lo va a contradecir ("Algunos dirán que X, pero se equivocan por Y"). 4) Conclusión: El remate final.',
          datoRelevante: 'El contraargumento es la técnica retórica más persuasiva psicológicamente demostrada. Al darle voz a la objeción antes de que la persona la piense, robas su capacidad de atacarte.',
          tipIcfes: 'La Tesis *no* es el tema. El tema es "El Aborto" o "El Medio Ambiente". La tesis es la postura firme frente al tema: "El aborto debe despenalizarse por motivos de salud pública".'
        },
        {
          title: 'Tipología según la Secuencia Textual',
          concepto: 'A veces un texto largo es como un sándwich de diferentes tipos. Un ensayo argumentativo puede comenzar con una secuencia narrativa (contando una anécdota) para luego pasar a una secuencia descriptiva y finalizar con la argumentación real.',
          datoRelevante: 'Reconocer la secuencia dominante versus las secuencias secundarias es vital. Una novela puede tener una descripción larguísima de un castillo, pero su esencia sigue siendo narrativa.',
          tipIcfes: 'Cuando la pregunta diga: "En el segundo párrafo, el autor utiliza una secuencia...", no mires todo el texto, enfócate exclusiva y aisladamente en ese párrafo. Si ese pedazo específico solo muestra datos, es expositiva.'
        }
      ]
    },
    {
      id: 'inferencia', 
      name: 'Niveles de Lectura: Inferencia', 
      icon: '🔍',
      sections: [
        {
          title: 'Los Tres Niveles de Comprensión',
          concepto: 'El ICFES clasifica tu capacidad lectora en tres niveles. 1) Literal: Entiendes lo que está escrito textualmente (datos de la superficie). 2) Inferencial: Lees "entre líneas", deduces cosas que no están escritas pero que lógicamente se infieren. 3) Crítico-Valorativo: Evalúas la validez del texto, descubres la ideología oculta del autor o comparas el texto con tu conocimiento externo.',
          datoRelevante: 'A nivel crítico, el ICFES suele usar caricaturas (ej. Mafalda o Matador). En ellas casi no hay texto, forzándote al 100% a extraer la ironía o la crítica política subyacente de la imagen visual.',
          tipIcfes: 'Cuidado con las "respuestas atractivas". Muchas opciones de respuesta son cosas lógicas y verdaderas en el mundo real, pero que NO se pueden concluir usando el texto. Básate estrictamente en lo que la lectura te permite probar.'
        },
        {
          title: 'Preguntas Clásicas y Estrategia',
          concepto: 'Reconoce al "enemigo": Las preguntas de idea principal ("¿De qué trata el texto?"). Las de detalle literal ("Según el autor, en 1999 ocurrió..."). Las de vocabulario ("La expresión X denota..."). Las de estructura ("¿Qué rol juega el párrafo tres respecto al segundo?").',
          datoRelevante: 'La técnica de lectura más recomendada no es leer rápido, es el "Skimming and Scanning": leer rápido títulos y picos para mapa mental, y luego buscar quirúrgicamente la palabra clave al leer las preguntas.',
          tipIcfes: 'Siempre debes leer primero el texto completamente de forma atenta, pero si te falta tiempo en el simulacro: lee las preguntas primero. Te darán el mapa exacto de lo que necesitas "cazar" cuando vayas a la lectura.'
        },
        {
          title: 'Cazando Inferencias',
          concepto: 'Una inferencia perfecta es como un trabajo detectivesco. El autor deja pistas esparcidas, y tú debes conectar los puntos. Nunca es una suposición aleatoria. Si el texto dice "Al sonar la alarma, Pedro agarró su casco y corrió hacia el camión rojo brillante", la inferencia lógica es que Pedro es un bombero (aunque la palabra "bombero" jamás aparezca).',
          datoRelevante: 'Arthur Conan Doyle aplicó magistralmente la diferencia entre observar (literal) y deducir (inferencia) en su personaje Sherlock Holmes, cambiando para siempre el género policial.',
          tipIcfes: 'Si una opción repite literalmente y de manera textual una frase del texto, y la pregunta arranca diciendo "¿De la lectura se puede inferir que...", ¡esa opción es la INCORRECTA! Una inferencia NUNCA es algo literal.'
        },
        {
          title: 'Vocabulario Oculto en Contexto',
          concepto: 'El ICFES jamás te pondrá un diccionario de sinónimos plano. Usarán una palabra común en un contexto totalmente extraño. Por ejemplo, "La nave zarpó hacia el *seno* del mar oscuro". Ahí no habla de anatomía humana, habla de la "profundidad" o el "centro" del océano.',
          datoRelevante: 'El uso de palabras en sentidos figurados o secundarios se llama lenguaje polisémico. El español tiene más de 93,000 palabras oficialmente, e incontables contextos poéticos.',
          tipIcfes: 'No corras a marcar la respuesta que suene "más elegante". Selecciona tu opción, reemplázala mentalmente en la frase original y lee de corrido. Si la oración pierde la lógica interna o el flujo del parrafo, descártala.'
        },
        {
          title: 'Conectores Lógicos: El Cemento del Texto',
          concepto: 'Los conectores son flechas de tráfico en la cabeza del lector. "Sin embargo" o "pero" anuncian que viene un giro o contraste. "Por lo tanto" o "en consecuencia" alertan una conclusión. "Además" indica que el autor agregará otra idea que apoya su punto anterior.',
          datoRelevante: 'En lingüística estructurada, el mal uso de un "sin embargo" puede alterar toda la prueba legal de un documento de abogados; el orden lógico de las palabras modifica la realidad.',
          tipIcfes: 'El ICFES ama la pregunta: "¿Cuál de los siguientes conectores podría reemplazar la frase subrayada sin alterar el sentido?". Para acertarla, clasifica la frase: ¿Es de pausa, es de contradicción o es de resultado? Luego busca un conector de esa misma familia.'
        }
      ]
    },
    {
      id: 'argumentacion', 
      name: 'Argumentación y Falacias', 
      icon: '💬',
      sections: [
        {
          title: 'Armas de un Argumento Válido',
          concepto: 'Para convencer de una idea irracional, primero debemos seducir usando la racionalidad. Existen: Argumento de Autoridad (Basado en lo que dijo Einstein u otro experto en el tema). Argumento de Datos (Apoyado en que "el 85% de estudios demuestran..."). Y el Argumento por Analogía (Explicar cómo funciona el cerebro comparándolo con un sistema operativo).',
          datoRelevante: 'Aunque el "Argumento de Autoridad" es válido, su abuso (creer algo simplemente porque alguien famoso lo dijo, sin base comprobable) se le conoce como la falacia de apelación irracional a la autoridad.',
          tipIcfes: 'Cuando la pregunta diga: "¿Qué estrategia usaría para fortalecer el último párrafo?", suele ser una respuesta basada en Datos (ej. incluir estadísticas) o en Ejemplos específicos que den solidez a las afirmaciones sueltas.'
        },
        {
          title: 'Ataque Letal a Argumentos',
          concepto: 'Refutar es el arte de desactivar bombas dialécticas. Consiste en demostrar por qué el argumento expuesto es científicamente falso, carece de sustento en la realidad o arranca de premisas ilusorias sin conexión lógica con la conclusión pretendida.',
          datoRelevante: 'Durante los clásicos debates presidenciales desde la era moderna transmitidos por TV (ej. Nixon vs Kennedy en el 60), los analistas juzgan y miden no solo lo que dicen argumentando su lado, sino el porcentaje numérico de minutos de TV gastado en intentar dinamitar la defensa ajena.',
          tipIcfes: 'Aparecen constantes interrogantes tipo: "¿Cuál de estos siguientes hechos, de ser ciertos de manera fáctica en este mundo, aniquilaría completamente la tesis del tercer parrafo?". Trata al documento como un juicio legal donde tu cerebro debe convertirse en la antítesis que tacha la validez.'
        },
        {
          title: 'Cohesión Textual (El Rompecabezas Perfecto)',
          concepto: 'Un texto requiere no solo de ideas brillantes (Coherencia) sino también de un cableado perfecto que interconecte sin fallas oraciones independientes (Cohesión Textual) con uso majestuoso y no abusivo de pronombres (este, esa, aquel, dichos temas, estos casos).',
          datoRelevante: 'Los grandes escritores como Jorge Luis Borges logran cuentos alucinantes no solo por su complejidad matemática y literaria, sino porque gozan de una cohesión impecable que evita repetir y marear visualmente al lector empedernido.',
          tipIcfes: 'Al enfrentar la evaluación, los examinadores del estado podrían extraerte párrafos alterados o con pedazos quitados a manera de supresión de elementos, la solución técnica siempre requiere probar qué variante pronominal le otorga sentido perfecto a las uniones.'
        }
      ]
    }
  ]
};
