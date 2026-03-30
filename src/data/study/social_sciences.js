export const socialContent = {
  id: 'sociales',
  name: 'Sociales y Ciudadanas',
  icon: '🌍', 
  color: '#34d399',
  topics: [
    {
      id: 'colombia', 
      name: 'Historia de Colombia', 
      icon: '🏛️',
      sections: [
        {
          title: 'Conquista y Colonia (1499–1810)',
          concepto: 'La llegada europea transformó radicalmente el territorio. Los españoles impusieron un sistema económico extractivista basado en la minería (oro y plata) y sistemas de trabajo forzado como la Encomienda y la Mita. La sociedad se estructuró en una pirámide rígidamente racial: peninsulares arriba, criollos, mestizos, indígenas y africanos esclavizados en la base.',
          datoRelevante: 'Cartagena de Indias se convirtió en uno de los puertos de comercio de esclavos más grandes de América, lo que explica la inmensa y rica herencia afrocolombiana en la cultura de las costas hoy en día.',
          tipIcfes: 'El ICFES casi nunca te pedirá memorizar fechas exactas como "1538". En cambio, te pedirá analizar las *causas y consecuencias* sociales (ej. cómo el sistema de castas colonial generó la desigualdad sistémica que aún vemos).'
        },
        {
          title: 'Independencia y Formación (1810–1830)',
          concepto: 'El "Grito" de 1810 no fue independentista al inicio, sino una exigencia de los criollos por gobernar localmente en nombre del Rey cautivo. Tras el caos interno (La Patria Boba) y la violenta Reconquista Española, Simón Bolívar lidera la Campaña Libertadora sellada en Boyacá en 1819, dando paso al efímero sueño de la Gran Colombia.',
          datoRelevante: 'La famosa "Patria Boba" se llamó así irónicamente porque los colombianos recién independizados, en lugar de unirse contra España, gastaron 6 años matándose entre ellos decidiendo si querían ser un país Federalista o Centralista.',
          tipIcfes: 'Cuando veas textos sobre Bolívar vs Santander, recuerda sus ideologías: Bolívar tendía al centralismo fuerte (poder concentrado en Bogotá), mientras Santander defendía el legalismo y el federalismo (poder repartido en regiones).'
        },
        {
          title: 'El Violento Siglo XX (Bogotazo y Frente Nacional)',
          concepto: 'El siglo XX estuvo marcado por la violencia bipartidista. El asesinato del líder populista Jorge Eliécer Gaitán en 1948 desencadenó "El Bogotazo", hundiendo al país en el periodo conocido como "La Violencia". Para detenerla, los líderes liberales y conservadores firmaron el "Frente Nacional" (1958-1974), donde se turnaron el poder excluyendo a cualquier otro partido político.',
          datoRelevante: 'El Frente Nacional detuvo la matanza entre liberales y conservadores, pero al cerrar las puertas a otras voces políticas, se convirtió en la semilla directa del nacimiento de las guerrillas (FARC, ELN) en los años 60.',
          tipIcfes: 'Pregunta clásica del ICFES: ¿Cuál fue la principal consecuencia negativa del Frente Nacional? Respuesta clave: La exclusión ciudadana y la restricción democrática a grupos políticos alternativos.'
        }
      ]
    },
    {
      id: 'constitucion', 
      name: 'Constitución y Ciudadanía', 
      icon: '⚖️',
      sections: [
        {
          title: 'El Estado Social de Derecho',
          concepto: 'A diferencia de un Estado simple, el "Estado Social de Derecho" (nacido en Colombia con la Constitución del 91) obliga al gobierno no solo a mantener el orden, sino a intervenir activamente para garantizar condiciones mínimas de vida digna, equidad, salud y educación para sus ciudadanos más vulnerables.',
          datoRelevante: 'La Constitución de 1991 fue redactada en gran parte gracias a un movimiento estudiantil universitario ("La Séptima Papeleta"), demostrando que los jóvenes sí pueden cambiar legalmente un país.',
          tipIcfes: 'Si un caso del ICFES describe a una persona a la que le niegan atención médica en urgencias por no tener dinero, la respuesta correcta siempre apelará a la vulneración del Estado Social de Derecho y el derecho fundamental a la vida.'
        },
        {
          title: 'Ramas del Poder y Órganos de Control',
          concepto: 'El poder no puede estar en una sola persona (para evitar tiranías). Se divide en Ejecutiva (Presidente y Alcaldes, que administran), Legislativa (Congreso, que hace leyes) y Judicial (Jueces y Cortes, que castigan). Además, existen Órganos de Control independientes como la Procuraduría (vigila funcionarios) y la Contraloría (vigila el dinero público).',
          datoRelevante: 'La Corte Constitucional es la guardiana máxima de la Constitución. Si el Presidente o el Congreso hacen una ley que viola los derechos de las personas, la Corte tiene el poder absoluto de tumbarla.',
          tipIcfes: 'Suele confundirse Procuraduría con Fiscalía. Tip: La Fiscalía investiga crímenes (ladrones, asesinos, cárcel). La Procuraduría investiga faltas disciplinarias de empleados del gobierno (alcaldes corruptos, destituciones).'
        },
        {
          title: 'Mecanismos de Protección: La Tutela',
          concepto: 'La Acción de Tutela (Art. 86) es el mecanismo estrella de la constitución. Permite a CUALQUIER ciudadano reclamar ante un juez la protección INMEDIATA de sus derechos fundamentales (vida, salud, libre desarrollo de la personalidad) cuando estos son violados, sin necesidad de abogados y con respuesta máxima en 10 días.',
          datoRelevante: 'Colombia es pionero mundial con la Tutela; se interponen más de 600,000 al año, salvando miles de vidas al obligar a las EPS a entregar medicamentos de alto costo.',
          tipIcfes: 'Para que una Acción de Tutela proceda en un caso del examen, debes asegurar que se cumplan dos requisitos: 1) Que el derecho vulnerado sea FUNDAMENTAL. 2) Que no haya otro medio judicial de defensa más rápido (peligro inminente).'
        },
        {
          title: 'Participación Ciudadana',
          concepto: 'Votar para elegir presidente no es la única forma de participar. Los ciudadanos pueden usar el Plebiscito (el presidente pregunta algo vital al pueblo), el Referendo (el pueblo vota para aprobar o derogar un artículo de ley), la Consulta Popular (preguntas locales para alcaldes) y el Cabildo Abierto (reuniones públicas).',
          datoRelevante: 'El Plebiscito más famoso de la historia reciente de Colombia fue en 2016, cuando se le preguntó a los ciudadanos si apoyaban o no el proceso de paz firmado con las FARC.',
          tipIcfes: 'Lee bien los enunciados: Si la gente quiere CAMBIAR una ley de la constitución, el mecanismo es el Referendo Constitucional. Si la gente quiere echar a su alcalde por mala gestión, es Revocatoria del Mandato.'
        }
      ]
    },
    {
      id: 'economia', 
      name: 'Economía y Globalización', 
      icon: '💰',
      sections: [
        {
          title: 'Oferta, Demanda e Inflación',
          concepto: 'El mercado se maneja por dos fuerzas. La Oferta: la cantidad de productos disponibles. La Demanda: cuánta gente quiere comprarlos. Si hay muchos compradores y poco producto, los precios suben (ej. el limón en escasez). La inflación ocurre cuando el dinero pierde valor a lo largo del tiempo y todo se vuelve más caro genéricamente.',
          datoRelevante: 'En 1923, la inflación en Alemania fue tan ridícula que el precio del pan subía a cada hora, al punto de que a los niños los dejaban jugar a los bloques de construcción apilando fajos de billetes que no valían nada.',
          tipIcfes: 'Pregunta clásica: "Si se impone un precio máximo a un producto (como la leche) por debajo del precio normal..." La respuesta lógica es que habrá ESCASEZ, porque la gente comprará todo rápido y los productores no querrán producir a pérdida.'
        },
        {
          title: 'Globalización y TLCs',
          concepto: 'La globalización es el proceso de interconexión mundial de los mercados, culturas y tecnología. Los Tratados de Libre Comercio (TLC) buscan eliminar los "aranceles" (impuestos de frontera) para que exportar e importar sea más barato.',
          datoRelevante: 'Un iPhone se diseña en California, su procesador se fabrica en Taiwán, sus pantallas en Corea del Sur y se ensamblan todas las piezas finales en China. ¡Esa es la globalización en tu bolsillo!',
          tipIcfes: 'El ICFES siempre pide evaluar pros y contras. El mayor desafío de un TLC en Colombia suele ser para el campesinado (sector agrícola), que debe competir contra alimentos extranjeros que entran súper baratos porque en EE.UU. u otros lados reciben subsidios del gobierno.'
        },
        {
          title: 'Geografía y Desarrollo Sostenible',
          concepto: 'La geografía no es solo mapas; es entender cómo el relieve, el clima y los recursos naturales definen la economía de un país. Colombia es un país andino, caribeño y amazónico. El desarrollo sostenible busca que crezcamos económicamente sin destruir la selva ni agotar el agua para nuestros hijos.',
          datoRelevante: 'Colombia es el segundo país más biodiverso del mundo por metro cuadrado, pero también uno de los más vulnerables al cambio climático debido a la deforestación.',
          tipIcfes: 'Suelen preguntar por el impacto de proyectos mineros o represas. La respuesta ganadora siempre equilibra el beneficio económico inmediato con la protección ambiental a largo plazo y el derecho de las comunidades locales.'
        },
        {
          title: 'Relaciones Internacionales y Organismos',
          concepto: 'Los países no viven solos. Se unen en organismos como la ONU (paz mundial), la OEA (América), el Banco Mundial (préstamos) y la OCDE (buenas prácticas de gobierno). Estos entes dictan reglas que Colombia debe seguir para ser parte de la comunidad global.',
          datoRelevante: 'La Declaración Universal de los Derechos Humanos de 1948 es el documento más traducido del mundo y la base de casi todas las constituciones modernas.',
          tipIcfes: 'Si un problema menciona un conflicto entre dos países, el ICFES evaluará si conoces el principio de "No Intervención" y la "Solución Pacífica de Controversias" a través del diálogo y el derecho internacional.'
        }
      ]
    }
  ]
};
