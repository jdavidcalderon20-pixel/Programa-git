export const englishContent = {
  id: 'ingles',
  name: 'Inglés',
  icon: '🗣️', 
  color: '#f87171',
  topics: [
    {
      id: 'grammar', 
      name: 'Grammar Essentials', 
      icon: '📝',
      sections: [
        {
          title: 'Tiempos Verbales: El Tiempo lo es Todo',
          concepto: 'En inglés, la base es saber CUÁNDO ocurren las cosas. Present Simple (Rutinas: "He eats"). Present Continuous (Ahora mismo: "He is eating"). Past Simple (Ya terminó: "He ate"). Present Perfect (El pasado afecta el presente: "He has eaten"). Future Simple (Promesas o decisiones: "He will eat"). Y el To-Be Going To (Planes fijos: "He is going to eat").',
          datoRelevante: 'El inglés es increíblemente pragmático. Mientras el español tiene más de 40 terminaciones verbales distintas por tiempo y persona (yo como, tú comes, él comería...), el inglés en Present Simple solo tiene dos ("eat" y "eats").',
          tipIcfes: 'Cuando la pregunta contenga palabras clave temporales como "Yesterday", "Last year" o "In 1990", ve directo a buscar el verbo en PASADO SIMPLE. Ahorrarás segundos valiosos sin leer el resto.'
        },
        {
          title: 'Conditionals (Los "Y si...")',
          concepto: 'Las condicionales muestran causo y efecto hipotético. Zero Conditional (Verdad universal: If + Presente, Presente). First Conditional (Posible futuro: If + Presente, Will). Second Conditional (Situación irreal/imaginaria: If + Pasado, Would). Third Conditional (Arrepentimiento del pasado: If + Past Perfect, Would Have + Participio).',
          datoRelevante: 'Si ganaras la lotería, usarías el Second Conditional ("If I won the lottery, I would buy a mansion") porque es un sueño imaginario. ¡Pero si no compraste el billete, usas el Third! ("If I had bought it...").',
          tipIcfes: 'Si en el examen ves la palabra "If" seguida de un verbo en pasado simple (Ejemplo: "If I *had* money..."), NUNCA elijas la opción con "Will". La respuesta obligatoria tiene que llevar la palabra "Would".'
        },
        {
          title: 'Modal Verbs (El Matiz de las Palabras)',
          concepto: 'Los verbos modales cambian la "actitud" del hablante. "Can/Could" muestran Habilidad física. "Must / Have to" indican Obligación extrema o leyes. "Should / Ought to" son puros Consejos ("deberías"). "May / Might" dictan Posibilidad dudosa (puede que llueva, o puede que no).',
          datoRelevante: 'En el inglés puro y británico, usar "Must" es muy fuerte porque implica una obligación nacida del que habla (ej. una madre regañando), mientras "Have to" es una regla externa inviolable (la policía dictando una ley).',
          tipIcfes: 'Los verbos modales JAMÁS llevan "to" después de ellos (excepto ought to / have to). Así que si en las opciones ves "He must *to* go" o "She can *to* play", es una trampa. Tácha esas opciones inmediatamente.'
        },
        {
          title: 'Passive Voice (Voz Pasiva)',
          concepto: 'Se usa cuando lo importante no es QUIÉN hizo la acción, sino A QUIÉN se la hicieron. La estructura es: Am/Is/Are/Was/Were + Past Participle (ej. "The book was written by him").',
          datoRelevante: 'Casi todas las noticias de crimen o ciencia usan la voz pasiva para enfocarse en el hecho objetivo en lugar del sujeto.',
          tipIcfes: 'Si un objeto inanimado (como un puente o una ley) aparece como el "sujeto" de la oración, busca un verbo en participio (terminado en -ed o irregular). "The bridge was *built*" es más probable que "The bridge build".'
        },
        {
          title: 'Reported Speech (Dijo que dijo)',
          concepto: 'Sirve para contar lo que alguien más dijo. La regla de oro es "Backshift": los verbos retroceden un paso al pasado. Presente -> Pasado. Pasado -> Pasado Perfecto. Will -> Would.',
          datoRelevante: 'Es la base del chisme y de los testimonios legales en inglés.',
          tipIcfes: 'Si la frase empieza con "She said that...", busca verbos en pasado. Si ves un "Will" o un "Is" en las opciones, descártalas de inmediato.'
        }
      ]
    },
    {
      id: 'reading', 
      name: 'Reading Comprehension', 
      icon: '👁️',
      sections: [
        {
          title: 'Tipos de Textos Evaluados',
          concepto: 'La prueba de lectura en Inglés te enfrentará a "Avisos Públicos" sencillos, "Conversaciones Cortas" y "Textos Articulados" largos (artículos científicos, biografías o historias literarias). Tu objetivo no es traducir palabra por palabra, sino entender el Mensaje General (Main Idea) y atrapar los Detalles Específicos (Specific Info).',
          datoRelevante: 'Un estudio lingüístico reveló que si logras comprender apenas el 75% del vocabulario de un artículo denso en inglés, tu cerebro es estadísticamente capaz de deducir mágicamente el significado oculto del 25% restante usando puro instinto de contexto.',
          tipIcfes: 'Usa la letal técnica de "Scanning" para preguntas específicas. Si el ICFES pregunta "¿En qué año viajó a París?", no leas el texto otra vez, desliza tus ojos buscando UNICAMENTE números que parezcan años, y localiza la palabra "Paris".'
        },
        {
          title: 'Conectores Lógicos Claves',
          concepto: 'Son puentes que unen dos ideas cortas. De Adición (Furthermore, Also, Besides). De Contraste (However, Although, Despite). De Resultado (Therefore, Consequently). Si no entiendes el conector, te perderás en el giro argumentativo central.',
          datoRelevante: 'La famosa palabra "Although" (Aunque) es considerada por varios exámenes internacionales rápidos la palabra de contexto y trampa más usada para engañar estudiantes.',
          tipIcfes: 'Si lees "However", el autor va a contradecir violentamente lo que acaba de decir. Es el punto exacto donde suelen esconderse las respuestas a las preguntas críticas de lectura profunda en casi todas las pruebas gringas.'
        }
      ]
    },
    {
      id: 'vocabulary', 
      name: 'Vocabulary & Phrasal Verbs', 
      icon: '💬',
      sections: [
        {
          title: 'Verbos Frasales (Phrasal Verbs)',
          concepto: 'Dos palabras que unidas crían mutaciones de significado. Verbo + Preposición. "Give" es dar, pero "Give up" es rendirse totalmente. "Look" es mirar, pero "Look into" es investigar un caso policial, y "Look after" es cuidar tiernamente a un bebé. Son el terror de las personas que intentan traducir literal.',
          datoRelevante: 'Hay más de 10,000 phrasal verbs documentados en la increíble enciclopedia del diccionario Oxford. Son la única y real diferencia entre alguien que suena a "robot de libro" y un hablante nativo natural de calle.',
          tipIcfes: 'En la sección final del ICFES donde llenas los "huecos" del texto larguísimo en inglés (Fill in the blanks), al menos dos o tres de esas opciones serán un "Phrasal Verb" oculto. Estudia los 10 más famosos: Carry out, Set up, Figure out, Turn out.'
        },
        {
          title: 'Collocations (Palabras que Andan Juntas)',
          concepto: 'Son combinaciones automáticas del idioma. En español decimos "Tomar una decisión". En inglés NUNCA dicen "Take a decision", obligatoriamente dicen "Make a decision". Decimos "Hacer tarea", ellos dicen "Do homework". Decimos "Cometer un error", ellos dictan "Make a mistake".',
          datoRelevante: 'Las collocations ahorran capacidad de procesamiento de los nativos americanos porque funcionan biológicamente como un solo bloque cerebral al hablar, en lugar de hilar y traducir dos palabras sueltas procesándolas aisladamente.',
          tipIcfes: 'Si la prueba te pide completar "He has to _____ a risk", no sirve elegir "take" solo porque suena lógico. "Take a risk" (Tomar un riesgo) es la collocation universal, y esa será la única respuesta valorada correcta.'
        }
      ]
    }
  ]
};
