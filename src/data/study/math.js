export const mathContent = {
  id: 'matematicas',
  name: 'Matemáticas',
  icon: '📐', 
  color: '#60a5fa',
  topics: [
    {
      id: 'algebra', 
      name: 'Álgebra y Expresiones', 
      icon: '🔢',
      sections: [
        {
          title: '¿Qué es el álgebra?',
          concepto: 'El álgebra es el idioma universal de las matemáticas. En lugar de limitarnos a números fijos, utilizamos letras (como x, y, z) para representar valores desconocidos o que pueden cambiar. Esto nos permite crear fórmulas generales (como la del área de un triángulo) y resolver problemas donde nos falta una pieza del rompecabezas.',
          datoRelevante: 'La palabra "álgebra" proviene del árabe "al-jabr", que significa "reunión de partes rotas". Fue introducida por el brillante matemático persa Al-Juarismi en el siglo IX.',
          tipIcfes: 'En el examen Saber 11, rara vez te pedirán definir "qué es álgebra". En su lugar, evaluarán tu capacidad para leer un problema cotidiano (como calcular costos en una empresa) y traducirlo a una ecuación (ej: 5000x + 2000 = Total).'
        },
        {
          title: 'Tipos de expresiones algebraicas',
          concepto: 'Las expresiones se agrupan según su tamaño y número de términos (las partes separadas por signos + o -). Un Monomio tiene un solo término (ej. 3x²). Un Binomio tiene dos (ej. 2x + 3y). Un Trinomio tiene tres (ej. x² + 5x - 6). Y a partir de ahí, los llamamos simplemente Polinomios.',
          datoRelevante: 'Cuando sumas polinomios, recuerda la regla de oro: solo puedes sumar "manzanas con manzanas". Es decir, solo puedes sumar términos que tengan la misma letra con el mismo exponente (3x² + 5x² = 8x², pero 3x² + 5x no se puede agrupar).',
          tipIcfes: 'El ICFES suele poner opciones trampa donde suman exponentes multiplicando en lugar de sumar coeficientes. Asegúrate de diferenciar bien cuándo estás sumando (2x + 3x = 5x) y cuándo estás multiplicando (2x * 3x = 6x²).'
        },
        {
          title: 'Productos notables (¡Imprescindibles!)',
          concepto: 'Son atajos matemáticos. Son multiplicaciones de polinomios cuyos resultados siguen patrones tan exactos que no necesitas hacer toda la multiplicación paso a paso. El más famoso es el cuadrado de un binomio: (a + b)² = a² + 2ab + b², ¡el famosísimo "el primero al cuadrado más dos veces el primero por el segundo más el segundo al cuadrado"!',
          datoRelevante: 'El matemático griego Euclides demostró el cuadrado de un binomio geométricamente hace más de 2000 años, dibujando literalmente un cuadrado de lados (a+b) y cortándolo en cuatro áreas.',
          tipIcfes: 'El error más común en Colombia en la prueba Saber 11 es que los estudiantes responden que (x + 3)² = x² + 9. ¡Nunca olvides el término del medio (2ab)! La respuesta correcta es x² + 6x + 9.'
        },
        {
          title: 'Factorización',
          concepto: 'Factorizar es el proceso inverso de multiplicar: es deconstruir una expresión gigante en sus "piezas de lego" originales o multiplicadores. Existen métodos clave: Factor Común (sacar lo que se repite), Diferencia de Cuadrados (a² - b² = (a+b)(a-b)) y Trinomios.',
          datoRelevante: 'La factorización es la base de la encriptación moderna en internet. La seguridad de tus mensajes de WhatsApp y cuentas bancarias se basa en que las computadoras no son muy rápidas factorizando números gigantescos.',
          tipIcfes: 'Si en el ICFES te piden simplificar una fracción algebraica enorme, el 90% de las veces debes factorizar el numerador y luego cancelar términos iguales arriba y abajo.'
        },
        {
          title: 'Ecuaciones lineales',
          concepto: 'Una ecuación lineal (ej. 3x - 9 = 0) representa gráficamente una línea completamente recta. Resolverla significa "despejar la X", moviendo todos los números al otro lado del signo igual realizando la operación contraria (si está sumando, pasa a restar).',
          datoRelevante: 'Estas ecuaciones son la forma matemática de una balanza perfecta. Cualquier operación que hagas en el lado izquierdo de la ecuación, debes hacerla idéntica en el lado derecho para mantener el equilibrio.',
          tipIcfes: 'Siempre que resuelvas una ecuación lineal en el examen, toma 10 segundos para "verificar". Reemplaza tu respuesta en la ecuación original; si la balanza encaja, tienes un punto asegurado sin importar qué digan las demás opciones.'
        },
        {
          title: 'Ecuaciones cuadráticas',
          concepto: 'Aparecen cuando la variable está elevada a la dos (x²). Su forma general es ax² + bx + c = 0, y su gráfica siempre es una curva llamada parábola. Para encontrar sus soluciones (dónde cruzan el piso o eje X), usamos la famosa "Fórmula del Estudiante": x = (-b ± √(b²-4ac)) / (2a).',
          datoRelevante: 'La trayectoria de cualquier objeto que lances al aire (un balón de fútbol, un cohete o agua saliendo de una manguera) describe exactamente una ecuación cuadrática bajo el efecto de la gravedad terrestre.',
          tipIcfes: 'Fíjate mucho en el "Discriminante" (lo que está dentro de la raíz: b²-4ac). Si te da negativo, la ecuación NO tiene soluciones reales. En el ICFES a veces preguntan "¿Cuántas soluciones tiene?" sin pedirte calcularlas; el discriminante te lo dice al instante.'
        }
      ]
    },
    {
      id: 'geometria', 
      name: 'Geometría y Trigonometría', 
      icon: '📏',
      sections: [
        {
          title: 'Áreas y Perímetros de Figuras Planas',
          concepto: 'El Perímetro es el contorno o "cerca" que rodea la figura (es una longitud, medida en metros). El Área es todo el espacio de "superficie" que hay adentro (medido en metros cuadrados). Las fórmulas esenciales son: Rectángulo (Base × Altura), Triángulo ((Base × Altura) / 2) y Círculo (π × r²).',
          datoRelevante: 'Los panales de abejas usan hexágonos perfectos porque es matemáticamente la figura que permite abarcar la mayor cantidad de área (almacenar miel) utilizando el menor perímetro posible de cera. ¡La naturaleza sabe optimizar!',
          tipIcfes: 'Suelen presentarte "figuras combinadas" (como una casa hecha de un cuadrado abajo y un triángulo arriba) y te piden el área pintada. No busques fórmulas mágicas; divídelo mentalmente en las figuras básicas que conoces, calcula cada una y ¡súmalas!'
        },
        {
          title: 'Teorema de Pitágoras',
          concepto: 'Es la regla inquebrantable de los triángulos rectángulos (que tienen un ángulo de 90 grados). Nos dice que el cuadrado de la Hipotenusa (el lado diagonal más largo) es exactamente igual a la suma de los cuadrados de los otros dos lados cortos (Ca y Cb): Hipotenusa² = Ca² + Cb².',
          datoRelevante: 'Aunque lleva el nombre de Pitágoras (Grecia, 500 a.C.), tablillas de barro de hace 4000 años demuestran que los antiguos babilonios ya conocían y usaban este teorema para medir sus terrenos.',
          tipIcfes: 'Aprende las "Ternas Pitagóricas" más famosas: 3-4-5 y 5-12-13. Si ves que un triángulo tiene catetos proporcionales a 3 y 4 (ej. 30m y 40m), pon inmediatamente tu respuesta de la hipotenusa (50m) sin gastar tiempo haciendo cálculos y raíces.'
        },
        {
          title: 'Leyes de Ángulos',
          concepto: 'Los ángulos miden aperturas. En la Prueba Saber, necesitas tres reglas vitales: 1) Dentro de cualquier triángulo en el plano, la suma total de sus tres ángulos internos SIEMPRE da mágicamente 180°. 2) Ángulos en línea recta suman 180° (suplementarios). 3) Ángulos en cruz opuestos son idénticos.',
          datoRelevante: 'Los ángulos son la base del GPS que llevas en el celular. Para ubicarte en el mapa global, se triangula tu posición midiendo los ángulos y tiempos desde múltiples satélites en el espacio.',
          tipIcfes: 'Cuando la pregunta contenga dos líneas paralelas cruzadas por una línea diagonal, pinta de un color los "ángulos grandes" y de otro los "ángulos pequeños". ¡Todos los del mismo color miden exactamente lo mismo!'
        },
        {
          title: 'Trigonometría Básica (SOH-CAH-TOA)',
          concepto: 'La trigonometría relaciona los ángulos de un triángulo con lo que miden sus lados. Memoriza: Seno (Opuesto/Hip), Coseno (Adyacente/Hip) y Tangente (Opuesto/Adyacente). Sirve para que, si conoces el ángulo de sombra de un árbol, puedas saber su altura sin tener que escalar.',
          datoRelevante: 'Seno, Coseno y Tangente nacieron de la fascinación humana antigua por analizar el cielo, midiendo el ángulo de las estrellas y el tamaño aparente de la luna.',
          tipIcfes: 'En el examen no te van a pedir que sepas el Seno de 37° de memoria, pero sí asumirán que sabes los clásicos: Seno de 30° es siempre 0.5 (1/2). Memorizar la tablita de ángulos notables (30°, 45°, 60°) te dará ventaja injusta contra el tiempo.'
        },
        {
          title: 'Sólidos: Volumen y Capacidad',
          concepto: 'Pasamos al mundo en 3D (largo, ancho y profundidad). El volumen es el espacio interno de un objeto. Para un paralelepípedo (caja), L × A × H. Para un cilindro o prisma regular, simplemente multiplicas Área de la Base × Altura. Para una pirámide o cono, haces lo mismo peeeero lo divides entre 3.',
          datoRelevante: 'Una esfera tiene exactamente 2/3 del volumen del cilindro perfecto en el que encaja (Arquímedes estaba tan orgulloso de este hallazgo que pidió que se grabara un cilindro y una esfera en su lápida).',
          tipIcfes: 'Una de las trampas más crueles es preguntar "cuántos vasitos pequeños caben en un tanque inmenso". La respuesta es el Volumen del Tanque dividido el Volumen del Vasito. Asegúrate SIEMPRE de que ambos estén en las mismas unidades (ej. todo en cm³) antes de dividir.'
        }
      ]
    },
    {
      id: 'estadistica', 
      name: 'Estadística y Probabilidad', 
      icon: '📊',
      sections: [
        {
          title: 'Medidas de Tendencia Central',
          concepto: 'Son los números que intentan resumir toda una población. \n• Media (Promedio): Es repartir todo por igual. Sumas todo y divides por el total de datos.\n• Mediana: El valor del centro exacto cuando ordenas la lista.\n• Moda: Simplemente, el que está de moda (el valor que más se repite).',
          datoRelevante: 'Promedio y Mediana pueden contar historias totalmente diferentes. Si en un bar de 10 personas comunes entra Elon Musk, el ingreso "promedio" del bar subiría a cientos de millones, engañando la estadística, pero la "mediana" ignoraría a Musk y seguiría siendo real.',
          tipIcfes: 'El ICFES explora muchísimo esta trampa (los valores extremos). Si te muestran una tabla con sueldos donde casi todos ganan el mínimo pero el jefe gana millones, te preguntarán qué medida usar. Nunca uses la Media ahí; la respuesta correcta es que la "Mediana" representa mejor la realidad de los empleados.'
        },
        {
          title: 'Medidas de Dispersión',
          concepto: 'Miden el nivel de caos. ¿Los datos están apretados todos juntos o muy sueltos y caóticos? \n• Rango: Es lo más alto menos lo más bajo.\n• Desviación Estándar: ¿Qué tan lejos, en promedio, están las personas alejándose del centro de la manada? A menor desviación, más homogéneo el grupo.',
          datoRelevante: 'En el control de calidad de las fábricas modernas, una desviación estándar baja es mejor que un buen promedio. Es preferible fabricar bombillas que SIEMPRE duren 1 año, a fabricar unas que duren 2 y otras que exploten el primer día.',
          tipIcfes: 'Visualiza la campana estadística. Te presentarán dos o tres grupos con promedios idénticos. Debes concluir quién tiene "mejor desempeño constante" o es "más homogéneo". Quien tenga menor desviación o menor rango será la respuesta correcta.'
        },
        {
          title: 'Interpretación de Gráficas de Barra, Tortas y Dispersión',
          concepto: 'Los datos puros aburren, las gráficas los vuelven visuales. Un Histograma une sus barras (datos en intervalos: 10 a 20 años). Un diagrama de Torta se basa en porcentajes donde la torta completa asume un 100% o 360 grados.',
          datoRelevante: 'El primer diagrama circular (Torta) de la historia moderna fue creado en 1801 por un ingeniero y agente secreto británico, William Playfair, para visualizar la deuda pública.',
          tipIcfes: 'El error maestro en las preguntas de gráficas es asumir totales invisibles. Si la gráfica te muestra solo porcentajes de aprobación, y no te da el número total de estudiantes por ningún lado, tú NO PUEDES afirmar de qué gráfica salieron más o menos personas en total absoluto.'
        },
        {
          title: 'Probabilidad Clásica y Eventos',
          concepto: 'La regla fundamental es: Probabilidad (P) = Casos que te sirven / Total de Casos Posibles. Un evento seguro vale 1 (ó 100%), un evento imposible vale 0. El resto flota en la mitad. Para sumar probabilidades decimos "O" (sacar as O rey). Para multiplicarlas decimos "Y" (sacar as Y sacar rey).',
          datoRelevante: 'Las matemáticas de la probabilidad literalmente nacieron de las mentes frustradas de jugadores de París en el año 1600 que querían entender científicamente por qué siempre perdían dinero tirando los dados.',
          tipIcfes: 'Te pondrán escenarios condicionantes: "Probabilidad de sacar hombre DADO QUE usa gafas". El "Dado que..." recorta la baraja. Ya no cuentas al universo en el denominador, tu universo cambia ahora únicamente a la zona de "solo las personas que usan gafas".'
        }
      ]
    },
    {
      id: 'funciones', 
      name: 'Funciones y Comportamientos', 
      icon: '📈',
      sections: [
        {
          title: 'Concepto Integral de Función',
          concepto: 'Imagina una máquina a la que le metes un número (x, billetes), ella usa sus engranajes multiplicando o sumando de forma rítmica (regla de f) y te escupe el valor definitivo (y, la gaseosa). Es una relación perfecta donde para cada "x" que ingreses, existe únicamente UN único valor de "y". Dominio es todo lo que le puedes meter, y Rango es todo lo que la máquina es capaz lanzar hacia afuera.',
          datoRelevante: 'El mismísimo Isaac Newton al inicio de sus cartas escribía "fluent variables" al referirse a la relación de tiempo y espacio, lo cual más adelante la humanidad compactaría formalmente como f(x).',
          tipIcfes: 'Fíjate en las restricciones reales que dictan la lógica; si "x" es el precio en dinero o los días de un ser humano en la tierra, la respuesta de f(x) NO puede ser gráfica o abstractamente debajo del eje horizontal saltando hacia lo negativo.'
        },
        {
          title: 'Lectura de Función Lineal: mX + b',
          concepto: 'Una línea pura en avance. La clave del secreto es que "m" representa la PENDIENTE, qué tan rápida e inclinada viaja la gráfica en cada pasito hacia adelante (tasa de interés, o costo mensual fijo). Por último, la letra "b" simboliza su punto genésico: el cruce vertical exacto en (0, b), que indica cómo inició antes de moverse el primer paso de tiempo.',
          datoRelevante: 'Si trabajas reparando PCs y cobras $50.000 por ir a la casa y $30.000 la hora... Acabas de armar mentalmente la función Ingeso = 30000x + 50000, un conocimiento valiosisímo que las computadoras visualizan casi de forma telepática.',
          tipIcfes: 'Si dos líneas cruzan en el espacio de la gráfica y la meta evaluativa te pregunta qué sentido vital tiene "su punto de contacto"; la respuesta se basa en equilibrio puro — el día, el precio o la cantidad exacta donde sucedieron y representaron ambos de igual manera el fenómeno observado.'
        },
        {
          title: 'Sistemas de Ecuaciones 2x2',
          concepto: 'Ocurre cuando tienes dos incógnitas (x e y) y dos pistas (ecuaciones). El objetivo es encontrar el valor que satisface ambos escenarios al tiempo. Los métodos clásicos son Sustitución, Igualación y Reducción.',
          datoRelevante: 'Geométricamente, resolver un sistema es encontrar el punto exacto donde dos rectas se cortan en un plano cartesiano.',
          tipIcfes: 'En el ICFES, a menudo puedes resolver estos problemas probando las opciones de respuesta en las ecuaciones. Si la Opción A dice que x=5 e y=2, y al reemplazarlos ambas ecuaciones dan resultados correctos, ¡esa es! No pierdas 5 minutos resolviendo por álgebra si puedes verificar en 30 segundos.'
        }
      ]
    }
  ]
};
