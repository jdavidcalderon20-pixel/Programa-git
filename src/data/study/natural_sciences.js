export const naturalContent = {
  id: 'ciencias_naturales',
  name: 'Ciencias Naturales',
  icon: '🔬', 
  color: '#f59e0b',
  topics: [
    {
      id: 'fisica', 
      name: 'Física Clásica y Moderna', 
      icon: '⚡',
      sections: [
        {
          title: 'Cinemática: Moviendo el Mundo',
          concepto: 'La cinemática es pura geometría en movimiento sin importar qué lo empujó. El Movimiento Rectilíneo Uniforme (MRU) significa viajar sin acelerar (Velocidad Constante). En cambio, la Caída Libre es un Movimiento Acelerado (MRUA), porque la gravedad de la tierra (9.8 m/s²) jala cada vez más rápido la velocidad del objeto mientras cae.',
          datoRelevante: 'Si dejas caer una pluma y un martillo gigante desde la misma altura en un lugar donde no haya aire (como en la Luna), ¡Ambos tocarán el piso al mismo exacto milisegundo! La gravedad jala todo con la misma aceleración.',
          tipIcfes: 'Cuidado con las gráficas de Velocidad vs Tiempo. Si la línea es totalmente plana y horizontal (como el suelo), significa que la velocidad NO cambia, es decir: aceleración CERO, pero SE SIGUE MOVIENDO. ¡No pienses que está quieto!'
        },
        {
          title: 'Leyes de Sir Isaac Newton',
          concepto: '1) Inercia: Todo objeto es perezoso. Si está quieto, quiere seguir quieto. Si se desliza en el hielo, seguirá deslizándose para siempre a no ser que choquen. 2) Fuerza (F=ma): Si quieres mover algo muy gordo (alta masa), necesitas empujar muy fuerte. 3) Acción y Reacción: Si empujas fuertemente una pared, ella te empuja a ti de vuelta con la misma violencia pero hacia atrás.',
          datoRelevante: 'Newton desarrolló y propuso estas revolucionarias leyes mientras estaba aburrido y encerrado en la granja de su casa escapando de la feroz pandemia de Peste Bubónica en 1665.',
          tipIcfes: 'Pregunta clásica de Acción-Reacción: Un camión choca espectacularmente contra un humilde mosquito. ¿Quién hace más fuerza? ¡AMBOS HACEN EXACTAMENTE LA MISMA FUERZA! Pero como el mosquito tiene masa ínfima, su aceleración lo desintegra.'
        },
        {
          title: 'Conservación de la Energía',
          concepto: 'La ley suprema del universo físico dictamina: "La energía ni se crea ni se destruye, solo brinca y se transforma". Un patinador en una U gigante en el parque empieza arriba con Energía Potencial (altura). Al caer hacia el centro bajo, toda esa altura y magia potencial se convierte mágicamente en velocidad furiosa (Energía Cinética).',
          datoRelevante: 'Cuando frenas abruptamente con un carro deportivo a toda velocidad, el olor a goma quemada es literalmente el freno transformando la energía cinética del peso del coche violento en puro y extremo calor en los discos.',
          tipIcfes: 'Si un problema te lanza un bloque montaña rusa abajo y pregunta su velocidad abajo sin saber de fricción; asume sistema ideal. Energía Potencial Arriba = Energía Cinética Abajo (m·g·h = 1/2 m·v²). Puedes cancelar las masas y despejar rápido.'
        },
        {
          title: 'Electricidad e Interruptores',
          concepto: 'Imagina un río microscópico. El Voltaje (los voltios) equivale a la pendiente o inmensidad de la cascada que da la fuerza al empujón. La Corriente (los amperios) es qué tanta violenta agua fluye en los cables. La Resistencia (los ohms) son las piedras atrapadas que impiden y se resisten a que el agua circule libre. Ley de Ohm: V = I × R.',
          datoRelevante: 'Las aves pueden pararse impunemente sobre un cable hiper letal de alta tensión sin electrocutarse en cenizas simplemente porque no tocan dos puntos con diferecia de potencial (no hacen "tierra", el flujo eléctrico sigue directo ignorando sus patitas).',
          tipIcfes: 'En los Circuitos en SERIE, si quitas un solo bombillo del camino, se apaga absolutamente toda la casa. En los Circuitos en PARALELO (como en la red real moderna de tu hogar), cortar o romper un eslabón no afecta las ramificaciones sobrevivientes.'
        }
      ]
    },
    {
      id: 'quimica', 
      name: 'Química: Materia y Enlaces', 
      icon: '⚗️',
      sections: [
        {
          title: 'El Átomo y su Tabla',
          concepto: 'El modelo aceptado muestra un núcleo micro-denso con Protones (+) pesados y Neutrones sin carga, rodeado de una inmensa nube casi hueca donde viajan los Electrones (-) ágiles a velocidad luz. La Tabla Periódica es un mapa genial: cada columna (Grupo) representa átomos con la misma cantidad electrónica exterior (mismo nivel de socialización química).',
          datoRelevante: 'Si infláramos el núcleo minúsculo de un átomo de hidrógeno al enorme tamaño de una pelota de golf en el parque, su pequeño electrón orbital estaría girando loco casi a dos increíbles kilómetros de distancia.',
          tipIcfes: 'Cuando analices reacciones atómicas, confía ciegamente en la Ley de Conservación de Masa de Lavoisier. Si entran 10 miligramos de reactivo de carbono, DEBEN salir exactamente 10 miligramos de carbono entre los distintos productos, no desaparece nada en la realidad.'
        },
        {
          title: 'Enlaces Químicos Covalentes e Iónicos',
          concepto: 'Los átomos sueñan con buscar estabilidad y parecerse a su ídolo los "Gases Nobles". Para ello se enlazan. Enlace Iónico: Un metal dona agresivamente un electrón a un no metal (creando polos magnéticos que se atraen con firmeza). Enlace Covalente: Como ambos son tacaños (no metales), deciden "compartir" compasivamente el electrón para usarlo los dos al tiempo.',
          datoRelevante: 'La Sal de tu mesa (Sodio tóxico y Cloro mortal en su ambiente puro) sobreviven como Iónicos creando Na+Cl-. El Agua cristalina de la llave logra unir Oxígeno con Hidrógeno bajo Enlaces Covalentes formando vida.',
          tipIcfes: 'A la hora de la pregunta, fíjate de donde diablos salieron en la Tabla; Metal + No Metal = Típica respuesta Iónica (Sodio y Cloro).  No Metal + No Metal = Típica respuesta Covalente (Carbono y Oxígeno, formar CO2).'
        },
        {
          title: 'Ácidos, Bases y pH',
          concepto: 'El pH funciona como una regla midiendo en rango de concentración concentrada. Entre el 0 y 6 son Ácidos letriales (vinagre o limón asfixiante). El 7 puro de la mitad es Neutro puro (Agua vital). Arriba de 8 llegando al 14 son las Bases o Alcalinos resbalosas (como el cloro para piscinas, la soda o el jabón antiséptico).',
          datoRelevante: 'Cuando algo en tu digestión falla y sientes infernales ansiedades de quemadura por alta acidez gástrica natural estomacal (pH rondando a nivel ácido peligroso), nos sirven inmediatamente un vaso repleto de sal u onzas de bicarbonato (altamente "básico") para generar un brutal contra ataque o reacción de neutralización final e internamente salificadora.',
          tipIcfes: 'La infografía clásica te pondrá dos vasos disueltos, uno te da rojo al medir tornasol ácido y el de al lado azul verdoso de alcalinidad basal. Siempre recuerda: Ácido + Base = Forman Sal y Agua y terminan su propio encaje letal anulados el uno sobre el contrincante.'
        },
        {
          title: 'Química Orgánica (El Carbono)',
          concepto: 'Se centra en el átomo de Carbono (C) y su capacidad única para formar cadenas largas. Los hidrocarburos son los más simples: Alcanos (enlaces simples), Alquenos (dobles) y Alquinos (triples). También están los grupos funcionales como Alcoholes (-OH) y Ácidos Carboxílicos (-COOH).',
          datoRelevante: 'Todo lo que tiene vida en la Tierra (e incluso el petróleo y el plástico) está hecho de cadenas de Carbono. Por eso se le llama "Química de la Vida".',
          tipIcfes: 'No te compliques con los nombres gigantes IUPAC. En el ICFES, céntrate en identificar el grupo funcional. Si ves un doble enlace C=O y un -H al final, es un Aldehído. ¡Aprende los sufijos!'
        },
        {
          title: 'Termodinámica Basal',
          concepto: 'Estudia el calor y el trabajo. 1ra Ley: La energía se conserva. 2da Ley: El desorden (Entropía) del universo siempre aumenta; el calor fluye naturalmente de lo caliente a lo frío, nunca al revés sin ayuda externa.',
          datoRelevante: 'Mantener tu cuarto ordenado requiere energía; si lo dejas solo, la entropía (el caos) hará que se desordene naturalmente. ¡La física explica tu habitación!',
          tipIcfes: 'Suelen preguntar por el equilibrio térmico. Si juntas agua a 80°C y agua a 20°C, la temperatura final estará en la mitad (si las masas son iguales). El calor cedido por uno es igual al ganado por el otro.'
        }
      ]
    },
    {
      id: 'biologia', 
      name: 'Biología y Ecosistemas', 
      icon: '🧬',
      sections: [
        {
          title: 'Estructural Célula Viva',
          concepto: 'Existen dos imperios biológicos mundiales. Las ancestrales Procariotas (Simples bacterias de mil años carentes de pared protectora para ADN y centro nuclear flotando rebelde en su plasma). Y Las elaboradas Eucariotas (Que eres tú, las plantas y todo ser animal) donde sus orgánulos empaquetados operan como ciudades corporativas controladas por núcleo gerencial y mitocondrias alimentadoras.',
          datoRelevante: 'Una intrigante y genial teoría biológica contemporánea dictamina que las valiosas mitocondrias (nuestras infalibles plantas eléctricas internas) comenzaron billones de eones atrás como minúsculas bacterias procariota libres e indomables errantes y fueron sorbidas bajo simbiosis evolutiva ancestral.',
          tipIcfes: '¿La diferencia real en evaluación entre Planta y Animal Eucariota? Cloroplastos para exhalar fotosíntesis salvaje, una pared celulosa crujiente protegiéndolas fuertemente, y una inmensa pero eficiente vacuola para almacenar agua pluvial o ríos, algo que en los mamíferos y animales apenas es decorativo temporalmente.'
        },
        {
          title: 'Divisiones Genéticas Mitosis/Meiosis',
          concepto: 'La Mitosis pura e inocente replica dos clones absolutos de código intacto y su genética doble completa sirve únicamente como ladrillo de cicatrización o de puro incremento biomásico corporal (nuestros dedos sanando un tajo). Meiosis interviene sexual, es un remix barajando ADN caótico y fraccionado a medias para que, emparejado con otra mitad ovárica o seminal, un infante herede magia diversa de dos vertientes inconfundibles.',
          datoRelevante: 'Sin el glorioso "entrecruzamiento" genético que se produce durante la aleatoria Meiosis caótica, tú serías una patética versión clon exactamente igual compartida con todos y el más mínimo de tus molestos hermanos, robándole espectacularidad visual y de supervivencia a la misma vida comunal humana general.',
          tipIcfes: 'Pregunta visual repetitiva: Si una célula te marea mostrando cómo una entidad madura y entera "n" de valor base repentinamente engendra versiones resultantes separadas de mitades biológicas "n/2", subraya e indica instantáneamente sin sudar "Meiosis en etapa reproductiva o gamética espermática".'
        },
        {
          title: 'Ecología y Tramas Tróficas Estructurales',
          concepto: 'Las pirámides exponen matemáticamente la crueldad y la hermosa belleza de las cacerías de supervivencia. En la extensa y pacífica base, los inmensos Productores que generan magia lumínica vitalicia. Encima de ese suelo verde habitan pastoreadores rumiantes herbívoros (C1). Arriba aguardan ansiosos predadores primarios sanguinarios persiguiendo conagas tiernas. Todo y absolutamente termina digerido microscópicamente por laboriosos pero silenciosos Descomponedores de tierra final.',
          datoRelevante: 'El devastador "Cambio Climático" que se reporta mundialmente ocurre de forma letalmente gradual provocada porque la capa industrial de excesiva emanación de carbono impide y rechiega el rebote natural re-expulsivo desde la caliente e irradiada radiación planetaria solar infrarroja, hirviendo paulatinamente nuestro ecosistema terrenal sin pausas naturales o descensos temporales de invierno purificadores.',
          tipIcfes: 'La más dura regla ecológica obligatorísima del examen del estado: Tan solo asciende entre niveles alimenticios alimentarios a duras penas un débil pero contable 10% puro de la energía engullida brutal inicial generadora de base, y todo y el enorme 90% restante consumible orgánico base despilfarra disipado mediante escape rudo o calor biológico de funcionamiento vital.'
        }
      ]
    }
  ]
};
