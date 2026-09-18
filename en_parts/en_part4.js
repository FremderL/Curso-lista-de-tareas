
/* ============================ MÓDULO 6: EXAMEN PRELIMINAR ============================ */
MODULES.push({
  id:'m6', emoji:'🏆', name:'Examen preliminar', color:'#b45309',
  desc:'Cómo se califica cada paper, estrategia del día D y tu mock B1 con calificación estimada.',
  lessons:[

  /* -------- 6-1 -------- */
  { id:'6-1', title:'Escala Cambridge y estrategia del día D', time:'13 min', blocks:[
    {t:'p', h:'Tu B1 Preliminary se califica en la <b>escala Cambridge (120–190)</b>. Cada paper recibe puntos que se convierten a la escala y se promedian (25% cada uno). El desglose aproximado que usaremos en tu mock: <b>140 = Pass</b> · 153 = Pass fuerte · <b>160 = Merit</b> · <b>170 = Distinction</b>. Entre 120–139, recibes certificado A2.'},
    {t:'table', head:['Paper','Aciertos aprox. para Pass (140)','Aciertos aprox. para Merit (160)'], rows:[
      ['Reading (32 preguntas)','~19/32','~25/32'],
      ['Listening (25 preguntas)','~15/25','~19/25'],
      ['Writing (2 tareas)','Rúbrica: contenido completo + errores controlados','+ vocabulario específico y estructura sólida'],
      ['Speaking (4 partes)','Rúbrica: interactúa y hazte entender','+ fluidez con soporte (razones, ejemplos)']
    ]},
    {t:'h', h:'El día del examen (checklist)'},
    {t:'list', items:[
      'Llega 30 min antes con tu identificación oficial y tu confirmación de registro (llega la semana previa por correo).',
      'Reading/Writing (el día del paper escrito): reloj propio, lápiz Y pluma (según centro), agua.',
      'Listening: si falla el audio, LEVANTA LA MANO de inmediato — no sufras en silencio.',
      'Speaking: llega con tu pareja (o te la asignan); se evalúa a la pareja, no uno contra otro: ayúdense.',
      'Nada se penaliza por responder mal: NUNCA dejes huecos.'
    ]},
    {t:'info', title:'🔑 Registrarse', h:'El B1 Preliminary se presenta en centros autorizados de Cambridge (en México hay decenas: busca “B1 Preliminary centre México” en cambridgeenglish.org/es/exámenes-y-pruebas/preliminary). Hay convocatorias casi todos los meses, en papel o computadora (mismo formato y certificado), y cuesta alrededor de $2,800–3,600 MXN según centro. Los resultados llegan en ~2 semanas (computer-based) o ~4–6 (paper).'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué puntaje en la escala Cambridge equivale a “Pass”?', options:['100','140','160','190'], correct:1, pts:10, explain:'140 = Pass; 160 = Merit; 170+ = Distinction.'},
      {type:'mc', q:'Si el audio falla durante tu Listening…', options:['Aguantas','Levantas la mano de inmediato','Sales del salón','Copias al vecino'], correct:1, pts:10, explain:'El centro está obligado a resolver fallas técnicas: avisa de inmediato.'},
      {type:'mc', q:'En el Speaking en pareja, la calificación…', options:['Es una competencia entre ambos','Evalúa a cada quien, pero interactuar bien ayuda a ambos','Solo evalúa al que más habla','No existe'], correct:1, pts:10, explain:'Evaluación individual, pero la interacción es parte de la rúbrica: una buena pareja eleva los dos.'},
      {type:'mc', q:'¿Qué pasa si dejo una pregunta en blanco?', options:['Punto negativo','Nada: cero garantizado en esa pregunta','Se anula el examen','Pierden dos'], correct:1, pts:10, explain:'No hay castigo por error: un intento informado siempre ≥ blanco.'}
    ]},
    {t:'activity', kind:'exam', title:'✏️ Actividad 32 · Tu plan del día D', sub:'Decide YA (antes de la semana del examen) las decisiones operativas: así el día D solo piensas en inglés.',
      items:[
        {type:'mc', q:'¿Qué modalidad elegirás?', options:['Papel','Computadora','Aún no decido'], correct:0, pts:20, explain:'Ambas dan el mismo certificado; computer-based entrega resultados en ~2 semanas.'},
        {type:'mc', q:'¿Cuándo registrarás tu examen?', options:['Esta semana (compromiso público 💪)','En 1 mes','Cuando “esté listo”'], correct:0, pts:20, explain:'Truco de productividad: fecha + dinero invertido = constancia garantizada. “Cuando esté listo” nunca llega.'},
        {type:'mc', q:'Tu meta de grado:', options:['Pass (140)','Merit (160)','Distinction (170+)'], correct:0, pts:20, explain:'Apunta a Merit: la meta estirada te lleva cómodo al Pass.'},
        {type:'mc', q:'¿Quién será tu pareja de Speaking para practicar?', options:['Un compañero del curso/familia','Yo mismo (simulacro solo)','Nadie'], correct:0, pts:20, explain:'Idealmente alguien del campus: 2 simulacros juntos valen 10 horas de teoría.'},
        {type:'mc', q:'¿Qué harás la noche anterior al examen?', options:['Estudiar hasta medianoche','Repaso ligero de flashcards + dormir 8 horas','Ver series en inglés toda la noche','Nada de nada'], correct:1, pts:20, explain:'El sueño consolida el idioma más que cualquier re-noche. Ciérralo con 10 min de flashcards.'}
      ]}
  ]},

  /* -------- 6-2 -------- */
  { id:'6-2', title:'MOCK B1: tu examen preliminar completo', time:'45 min', blocks:[
    {t:'p', h:'Tu ensayo general. 4 secciones con el formato real: <b>Reading</b> (estilo Partes 1–6), <b>Listening</b> (con audio y transcripciones), <b>Writing</b> (con rúbrica) y <b>Speaking</b> (con rúbrica). Crono sugerido: Reading 20 min · Listening 12 min · Writing 10 min · Speaking 5 min. Tu resultado se convierte a la escala Cambridge estimada.'},
    {t:'activity', kind:'mock', title:'✏️ Actividad 33 · MOCK B1 PRELIMINAR', sub:'Completa las 4 secciones. Sé honesto en writing/speaking: la escala estimada solo sirve si los datos son reales.',
      items:[
        {sec:'📖 READING · Parte 1 (2 señales)'},
        {type:'mc', q:'“WET PAINT — DO NOT TOUCH THE DOOR”. What must you do?', options:['Open the door carefully','Paint the door','Not touch the door','Close the door'], correct:2, pts:5},
        {type:'mc', q:'“Tom — gone to the gym, back by 7. Dinner’s in the fridge. – Dad”. When will Dad return?', options:['Before 7','At 7','After dinner','Tomorrow'], correct:0, pts:5, explain:'“back by 7” = de regreso no más tarde de las 7.'},
        {sec:'📖 READING · Parte 2 (emparejar)'},
        {type:'mc', q:'PEPE busca: “clases de natación para principiantes, sábados por la mañana”. Clases: A) “Advanced swim squad, Tue/Thu evenings.” B) “Beginner lessons, Saturday 10 am, small groups.” C) “Aqua-gym for seniors, mornings.” ¿Cuál?', options:['A','B','C'], correct:1, pts:5},
        {sec:'📖 READING · Parte 3 (lectura)'},
        {type:'mc', q:'“When Diego lost his job at the factory, he didn’t tell anyone for two weeks. He applied for thirty jobs before he found one — as a baker’s assistant, half the salary. But he says the smell of fresh bread every morning cured his bad mood: ‘I lost a job I hated and found a life I love.’” ¿Qué aprendimos de Diego?', options:['Odió el pan siempre','Encontró trabajo peor y aun así mejoró su vida','Sigue desempleado','Nunca buscó trabajo'], correct:1, pts:5, explain:'Salario a la mitad pero “a life I love”: lectura de opinión/actitud.'},
        {sec:'📖 READING · Parte 5 (vocabulario)'},
        {type:'mc', q:'“The museum is ___ every Monday.” (cerrado)', options:['open','closed','busy','free'], correct:1, pts:5},
        {type:'mc', q:'“Can you ___ me a favour?”', options:['make','give','do','take'], correct:2, pts:5},
        {sec:'📖 READING · Parte 6 (gramática, UNA palabra)'},
        {type:'gap', q:'“I have known her ___ 2015.”', accept:['since'], pts:5},
        {type:'gap', q:'“There ___ two apples on the table.”', accept:['are'], pts:5},
        {sec:'🎧 LISTENING (usa ▶ o la transcripción)'},
        {type:'mc', q:'▶ ¿Qué quiere el cliente?', options:['Cambiar una camisa','Un reembolso','Otra talla de pantalón','Hablar con el gerente'], correct:2, pts:5, audio:'Excuse me, these trousers are the right colour but too small. Could I swap them for a larger size?', transcript:'Excuse me, these trousers are the right colour but too small. Could I swap them for a larger size?'},
        {type:'gap', q:'▶ ¿A qué hora llega el tren de York? (formato 0:00)', accept:['8:45','08:45'], pts:5, audio:'The eight o’clock train to York is running about forty-five minutes late tonight.', transcript:'The eight o’clock train to York is running about forty-five minutes late tonight.'},
        {type:'mc', q:'▶ ¿Por qué llama Sofía?', options:['Para invitar a cenar','Para cancelar una cita','Para pedir ayuda con el examen','Para felicitar'], correct:0, pts:5, audio:'Hey! We’re celebrating my grades tonight with pizza at eight — you’re coming, right? Say yes!', transcript:'Hey! We’re celebrating my grades tonight with pizza at eight — you’re coming, right? Say yes!'},
        {sec:'✍️ WRITING (escribe y luego evalúa tu checklist)'},
        {type:'gap', q:'Escribe tu email (80–100 palabras) en un papel o editor: responde a esta tarea: “Your friend Sam asks: What’s your favourite hobby and why? Do you do it alone or with friends? Can I try it with you next weekend?” — Escribe la palabra que ABRIRÍA tu email (saludo).', accept:['hi','hi sam','dear sam','hello','hey'], pts:5, hint:'Saludo informal.'},
        {type:'mc', q:'Autoevalúa tu email: ¿respondiste las 3 preguntas con detalles?', options:['Sí, las 3','2 de 3','Menos de 2'], correct:0, pts:5, explain:'3/3 notas respondidas = Contenido completo (el criterio más pesado).'},
        {sec:'🗣️ SPEAKING (grábate 2 min y evalúa)'},
        {type:'mc', q:'Habla 1 min: “Describe a photo of your last celebration” (D-O-M-I-N-O). ¿Lograste 6+ frases seguidas?', options:['Sí','Casi','No — lo repito mañana'], correct:0, pts:5},
        {type:'mc', q:'Di tu opinión con soporte: “Is it better to study online or in person?” (opinión+razón+ejemplo). ¿Incluiste los 3?', options:['Los 3','2','1 o menos'], correct:0, pts:5}
      ]}
  ]}
]});

/* ============================ MÓDULO 7: TU PLAN ============================ */
MODULES.push({
  id:'m7', emoji:'📅', name:'Tu plan 12 semanas', color:'#0891b2',
  desc:'De este curso al examen real: calendario semanal, hábitos y siguientes pasos.',
  lessons:[

  /* -------- 7-1 -------- */
  { id:'7-1', title:'Tu calendario hacia el examen real', time:'12 min', blocks:[
    {t:'p', h:'Terminaste el curso: 34 lecciones, mock incluido. Ahora convierte el entrenamiento en <b>costumbre</b>. Este es el plan de 12 semanas que uso con grupos reales (también está detallado en 📦 Plan de estudio). Combínalo con <b>Repaso del día (5–10 min SIEMPRE)</b>.'},
    {t:'table', head:['Semanas','Foco','Meta medible'], rows:[
      ['1–2','Flashcards diarias + 1 Reading simulacro','85%+ en Partes 1–2'],
      ['3–4','Writing: 2 emails + 1 artículo por semana','Checklist completa en cada tarea'],
      ['5–6','Listening diario (audio de este curso o podcasts B1)','90% en gaps de números/fechas'],
      ['7–8','Speaking: 2 simulacros/semana (rúbrica 70%+)','1 min de foto sin trabarte'],
      ['9–10','Mock COMPLETO cronometrado ×2','Escala estimada 150+'],
      ['11–12','Errores específicos de tus mocks + descanso','Registro del examen hecho ✔']
    ]},
    {t:'tip', title:'💡 El hábito mínimo', h:'Ancla tu práctica a algo que ya haces: “después del café de la mañana → 10 flashcards + 1 lección”. Las cadenas de hábito vencen a la motivación. Si un día fallas, la regla es: <b>nunca falles dos seguidas</b>.'},
    {t:'milestone', title:'🎓 Logro desbloqueado', h:'Completaste el tercer curso del campus: <b>Reading, Writing, Listening y Speaking B1</b> + sistema de flashcards con repetición espaciada + mock con escala Cambridge. Tu siguiente paso está claro: registrar tu examen y seguir tu plan de 12 semanas. ¡Nos vemos con tu certificado B1! 🇬🇧'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuánto tiempo de flashcards al día sostiene el sistema?', options:['0','5–10 minutos','2 horas','Solo domingos'], correct:1, pts:10, explain:'Breve y diario: la fórmula SRS.'},
      {type:'mc', q:'La regla de las cadenas de hábito dice…', options:['Falla cuando quieras','Nunca falles dos días seguidos','Estudia solo motivado','Depende del clima'], correct:1, pts:10, explain:'Fallar 1 día es humano; 2 días empieza a romper la costumbre.'},
      {type:'fill', q:'¿En qué se convierten tus lecciones aprobadas el día del examen real? (1 palabra, en inglés)', accept:['confidence','results','points'], pts:10, hint:'Lo que sientes cuando ya sabes…'}
    ]},
    {t:'activity', kind:'exam', title:'✏️ Actividad 34 · Firma tu compromiso', sub:'El último ejercicio del campus: define tus 4 decisiones finales (y vuelve a verlas cuando falte motivación).',
      items:[
        {type:'mc', q:'Mi fecha objetivo para registrar el examen es…', options:['Este mes','En 2–3 meses','En 6 meses'], correct:0, pts:25, explain:'Con el mock aprobado, 2–3 meses de plan te llevan listo con margen.'},
        {type:'mc', q:'Mi hábito ancla será…', options:['Después del café/desayuno','Antes de dormir','Después de la escuela/trabajo'], correct:0, pts:25, explain:'Cualquiera sirve SI es consistente: mismo momento, mismo lugar.'},
        {type:'mc', q:'Mi pareja de Speaking será…', options:['Alguien del campus/familia','Solo simulacros grabados','Nadie'], correct:0, pts:25, explain:'Hablar con alguien real sube la rúbrica de interacción más rápido.'},
        {type:'mc', q:'Si fallo un día del plan…', options:['Me rindo','Fallo máximo 1: nunca dos seguidos','Empiezo el curso de nuevo'], correct:1, pts:25, explain:'La constancia realista vence a la perfección imposible. ¡Nos vemos en tu certificado! 🎓'}
      ]}
  ]}
]});

/* ============================ EXAMEN FINAL DEL CURSO (30 preguntas · 300 pts) ============================ */
const EXAM = {
  questions:[
    /* --- M0 (2) --- */
    {type:'mc', q:'M0 · ¿Cómo se distribuye el peso del B1 Preliminary?', options:['Reading 50%, resto 50%','4 papers con 25% cada uno','Speaking vale el doble','Solo el examen escrito cuenta'], correct:1, pts:10, explain:'Reading, Writing, Listening y Speaking: 25% cada uno.'},
    {type:'mc', q:'M0 · La escala de calificación Cambridge es…', options:['0–100','140–190','A–F','1–10'], correct:1, pts:10, explain:'140 = Pass, 160 = Merit, 170+ = Distinction.'},
    /* --- M1 Reading (5) --- */
    {type:'mc', q:'M1 · En Reading, la técnica de buscar datos concretos sin leer todo es…', options:['skimming','scanning','traducir','subvocalizar'], correct:1, pts:10, explain:'Scanning: ojos en modo radar de palabras clave.'},
    {type:'mc', q:'M1 · En Part 2 (emparejar), ¿cuántos textos sobran?', options:['0','2','3','Todos se usan'], correct:2, pts:10, explain:'8 textos, 5 personas: sobran 3 y ninguno se repite.'},
    {type:'fill', q:'M1 · Conector que marca contraste en Reading Part 4: “H___ver,”', accept:['how'], re:'^\\s*however\\s*,?\\s*$', show:'However,', pts:10, hint:'Empieza con How…'},
    {type:'mc', q:'M1 · “take photos” es la collocation correcta. ¿Cuál NO existe?', options:['take a photo','make a photo (para foto suelta)','take pictures','take a picture'], correct:1, pts:10, explain:'Con fotos: TAKE. (make a film sí existe, pero foto no.)'},
    {type:'fill', q:'M1 · Reading Part 6 pide UNA palabra por hueco. “She’s good ___ maths.”', accept:['at'], pts:10, hint:'good + preposición.'},
    /* --- M2 Writing (4) --- */
    {type:'mc', q:'M2 · La tarea OBLIGATORIA del Writing es…', options:['el artículo','la historia','el email (~100 palabras)','el ensayo'], correct:2, pts:10, explain:'Part 1 = email. Part 2 = elegir artículo o historia.'},
    {type:'mc', q:'M2 · En un email informal a un amigo conviene…', options:['“Dear Sir,”','contracciones y tono natural','“Yours faithfully,”','vocabulario académico'], correct:1, pts:10, explain:'Registro informal: I’m, don’t, Great to hear from you…'},
    {type:'fill', q:'M2 · Palabra para iniciar una historia: “O___ upon a time…” (2 palabras)', accept:['once upon'], re:'^\\s*once\\s+upon\\s*$', show:'Once upon', pts:10, hint:'Cuento clásico…'},
    {type:'mc', q:'M2 · “She don’t like tea” falla en…', options:['ortografía','concordancia de 3.ª persona (doesn’t)','registro','puntuación'], correct:1, pts:10, explain:'she DOESN’T: el -s de 3.ª persona también gobierna el auxiliar.'},
    /* --- M3 Listening (3) --- */
    {type:'mc', q:'M3 · ¿Cuántas veces se escucha cada audio en el examen?', options:['1','2','3','libre'], correct:1, pts:10, explain:'Dos veces, con tiempo para leer preguntas antes.'},
    {type:'fill', q:'M3 · “A quarter to five” = 4:__ (escribe los dos dígitos, ej. 30)', accept:['45'], pts:10, hint:'Cuarto PARA las cinco…'},
    {type:'mc', q:'M3 · Oyes “THIRty pounds”. Son…', options:['13','30','3','33'], correct:1, pts:10, explain:'THIRty = 30 (acento inicial); thirTEEN = 13.'},
    /* --- M4 Speaking (3) --- */
    {type:'mc', q:'M4 · En Speaking Part 2 (la foto), la técnica recomendada es…', options:['Listar objetos','D-O-M-I-N-O (dónde, ocasión, mood, ideas, detalle, opinión)','Callar y sonreír','Recitar el alfabeto'], correct:1, pts:10, explain:'Estructura de 6 movimientos ≈ 1 minuto de habla con calidad.'},
    {type:'fill', q:'M4 · Frase para discrepar con educación: “I see your ___, but…”', accept:['point'], pts:10, hint:'Lo que el otro ve…'},
    {type:'mc', q:'M4 · La mejor respuesta a “Do you like sports?” aplica R-R-D: respuesta + razón + …', options:['repetición','detalle','rebaja','resumen'], correct:1, pts:10, explain:'Respuesta + Razón + Detalle: la fórmula anti “yes seco”.'},
    /* --- M5 Vocab/Grammar (8) --- */
    {type:'mc', q:'M5 · En el sistema Leitner, al fallar una tarjeta esta…', options:['se elimina','vuelve a la caja 1 (mañana)','sube de nivel','se duplica'], correct:1, pts:10, explain:'Fallo → caja 1. Acierto → sube de caja.'},
    {type:'fill', q:'M5 · Pasado de “take”:', accept:['took'], pts:10},
    {type:'fill', q:'M5 · Participio de “write”:', accept:['written'], pts:10},
    {type:'mc', q:'M5 · “He has ___ to Rome” (fue y sigue allá):', options:['been','gone','went','go'], correct:1, pts:10, explain:'gone = ida sin regreso; been = fue y volvió.'},
    {type:'fill', q:'M5 · “I have lived here ___ 2019.” (punto de inicio)', accept:['since'], pts:10, hint:'since vs for…'},
    {type:'mc', q:'M5 · Comparativo correcto:', options:['more big','bigger','bigger than more','most big'], correct:1, pts:10, explain:'Adjetivo corto → -er + than.'},
    {type:'mc', q:'M5 · Conditional 2 correcto:', options:['If I will see him, I would say hi.','If I saw him, I would say hi.','If I see him, I said hi.','If I would see…'], correct:1, pts:10, explain:'If + pasado simple → would + verbo.'},
    {type:'fill', q:'M5 · “I can’t ___ it — it’s too expensive.” (pagarlo)', accept:['afford'], pts:10, hint:'A-F-F…'},
    /* --- M6+M7 (5) --- */
    {type:'mc', q:'M6 · ¿Qué puntaje equivale a “Pass with Merit”?', options:['140','150','160','139'], correct:2, pts:10, explain:'160–169 = Merit; 170+ = Distinction.'},
    {type:'mc', q:'M6 · Si el audio falla en tu examen, debes…', options:['aguantar','levantar la mano de inmediato','abandonar','esperar el final'], correct:1, pts:10, explain:'Avisar de inmediato: el centro debe resolverlo.'},
    {type:'fill', q:'M6 · El Speaking se hace en ___ (1 palabra, en español).', accept:['parejas','pareja','equipo'], pts:10, hint:'Dos candidatos juntos…'},
    {type:'mc', q:'M7 · La regla de oro del hábito de estudio es…', options:['estudiar solo cuando haya ganas','nunca fallar dos días seguidos','estudiar 5 horas el domingo','esperar motivación'], correct:1, pts:10, explain:'Frecuencia + tolerancia al fallo: nunca dos seguidos.'},
    {type:'mc', q:'M7 · ¿Qué conviene hacer ANTES de la semana del examen?', options:['Nada','Registrar el examen y definir pareja de Speaking','Aprender otro idioma','Ver series sin subtítulos toda la noche'], correct:1, pts:10, explain:'Compromiso público (fecha + registro) dispara la constancia.'}
  ]
};

/* ============================ LIBRO DE TEXTO (Inglés B1) ============================ */
const TEXTBOOK = [
  { n:1, emoji:'🗂️', short:'Guía del examen B1', title:'Guía oficial del B1 Preliminary', time:'12 min', blocks:[
    {t:'p', h:'El <b>B1 Preliminary</b> certifica nivel intermedio (CEFR B1) y lo emite Cambridge Assessment English. Son 4 papers con el mismo peso: Reading (6 partes, 32 preguntas, 45 min), Writing (2 tareas, 45 min), Listening (4 partes, 25 preguntas, ~30 min) y Speaking (4 partes, 10–12 min en parejas). La escala de resultados va de 120 a 190: 140–159 = Pass, 160–169 = Pass with Merit, 170+ = Pass with Distinction; 120–139 reporta nivel A2.'},
    {t:'table', head:['Paper','Partes','Preguntas','Tiempo','Consejo #1'], rows:[
      ['Reading','6','32','45 min','Lee las preguntas antes del texto'],
      ['Writing','2','2','45 min','Responde TODAS las notas del email'],
      ['Listening','4','25','~30 min','Dos escuchas: 1ª respuestas, 2ª verificación'],
      ['Speaking','4','—','10–12 min','Respuesta + razón + detalle (R-R-D)']
    ]},
    {t:'info', title:'📚 Muestras oficiales', h:'Cambridge publica <b>sample papers gratuitos</b> con audios y respuestas oficiales en cambridgeenglish.org (busca “B1 Preliminary sample test”). Haz al menos 2 completos antes de tu examen: el formato exacto no debería sorprenderte nunca.'}
  ]},
  { n:2, emoji:'⚙️', short:'Gramática esencial B1', title:'Gramática esencial B1: las 12 estructuras', time:'18 min', blocks:[
    {t:'p', h:'Referencia rápida de lo que el examen asume que dominas. Cada estructura con su patrón y una trampa típica:'},
    {t:'table', head:['Estructura','Patrón','Trampa típica'], rows:[
      ['Present simple','I work / he works','Olvidar la -s en 3.ª persona'],
      ['Present continuous','am/is/are + -ing','Usarla con verbos de estado (like, know, want)'],
      ['Past simple','worked / went','“did + verbo en pasado”: ✗ did went'],
      ['Past continuous','was/were + -ing','Fondo interrumpido: I was cooking when he arrived'],
      ['Present perfect','have/has + participio','Con “yesterday” → pasado simple'],
      ['Past perfect','had + participio','Para lo anterior al pasado: the bus had left'],
      ['Future: will / going to','decisión espontánea vs plan','“I will help you” (ahora) vs “I’m going to study” (plan)'],
      ['Comparativos','bigger than / more important than','Mezclar sistemas: ✗ more bigger'],
      ['Superlativos','the biggest / the most important','Olvidar “the”: ✗ biggest city is…'],
      ['Condicionales 1–2','If + pres → will · If + past → would','Will dentro del if: ✗ If it will rain…'],
      ['Pasiva','be + participio (+ by)','✗ The house built (falta was)'],
      ['used to','used to + verbo base','✗ I use to (sin -d)']
    ]},
    {t:'info', title:'📚 Para profundizar', h:'Raymond Murphy, <i>English Grammar in Use</i> (5.ª ed., Cambridge University Press, 2019): la referencia autodescriptiva número 1 — unidades de 2 páginas con ejercicios y respuestas. Empieza por los temas que falles en tus quizzes de este curso.'}
  ]},
  { n:3, emoji:'📰', short:'Tabla de verbos irregulares', title:'Los 45 verbos irregulares B1 (tabla completa)', time:'20 min', blocks:[
    {t:'p', h:'Base · pasado · participio · 3.ª persona · -ing · español. Esta tabla ES el mazo <b>Verbos</b> de “Repaso del día”: imprímela o tenla abierta mientras escribes tus historias del Writing.'},
    {t:'table', head:['Base','Pasado','Participio','3.ª pers.','-ing','Español'], rows:[
      ['be','was/were','been','is','being','ser/estar'],
      ['become','became','become','becomes','becoming','convertirse'],
      ['begin','began','begun','begins','beginning','empezar'],
      ['break','broke','broken','breaks','breaking','romper'],
      ['bring','brought','brought','brings','bringing','traer'],
      ['build','built','built','builds','building','construir'],
      ['buy','bought','bought','buys','buying','comprar'],
      ['catch','caught','caught','catches','catching','atrapar'],
      ['choose','chose','chosen','chooses','choosing','elegir'],
      ['come','came','come','comes','coming','venir'],
      ['do','did','done','does','doing','hacer'],
      ['drink','drank','drunk','drinks','drinking','beber'],
      ['drive','drove','driven','drives','driving','manejar'],
      ['eat','ate','eaten','eats','eating','comer'],
      ['fall','fell','fallen','falls','falling','caerse'],
      ['feel','felt','felt','feels','feeling','sentir'],
      ['find','found','found','finds','finding','encontrar'],
      ['fly','flew','flown','flies','flying','volar'],
      ['forget','forgot','forgotten','forgets','forgetting','olvidar'],
      ['get','got','got/gotten','gets','getting','obtener'],
      ['give','gave','given','gives','giving','dar'],
      ['go','went','gone','goes','going','ir'],
      ['have','had','had','has','having','tener'],
      ['hear','heard','heard','hears','hearing','oír'],
      ['keep','kept','kept','keeps','keeping','guardar'],
      ['know','knew','known','knows','knowing','saber'],
      ['leave','left','left','leaves','leaving','dejar/irse'],
      ['lose','lost','lost','loses','losing','perder'],
      ['make','made','made','makes','making','hacer'],
      ['meet','met','met','meets','meeting','conocer/reunirse'],
      ['pay','paid','paid','pays','paying','pagar'],
      ['put','put','put','puts','putting','poner'],
      ['read','read','read','reads','reading','leer'],
      ['run','ran','run','runs','running','correr'],
      ['say','said','said','says','saying','decir'],
      ['see','saw','seen','sees','seeing','ver'],
      ['sell','sold','sold','sells','selling','vender'],
      ['send','sent','sent','sends','sending','enviar'],
      ['sit','sat','sat','sits','sitting','sentarse'],
      ['sleep','slept','slept','sleeps','sleeping','dormir'],
      ['speak','spoke','spoken','speaks','speaking','hablar'],
      ['take','took','taken','takes','taking','tomar'],
      ['teach','taught','taught','teaches','teaching','enseñar'],
      ['tell','told','told','tells','telling','contar'],
      ['think','thought','thought','thinks','thinking','pensar'],
      ['understand','understood','understood','understands','understanding','entender'],
      ['write','wrote','written','writes','writing','escribir']
    ]},
    {t:'tip', title:'💡 Cómo estudiarla', h:'En “Repaso del día”, el mazo Verbos te pregunta las 3 formas con audio. 10 tarjetas al día = tabla completa dominada en ~3 semanas. Y en el Writing: cada historia que escribas debe usar mínimo 5 irregulares — el pasado se automatiza usándolo.'}
  ]},
  { n:4, emoji:'📚', short:'Vocabulario y bibliografía', title:'Vocabulario B1 y bibliografía real', time:'10 min', blocks:[
    {t:'p', h:'El vocabulario B1 se organiza por temas (trabajo, viajes, salud, tecnología, educación, compras…). La referencia clásica por temas:'},
    {t:'list', items:[
      '<b>Stuart Redman</b> — <i>English Vocabulary in Use: Pre-intermediate & Intermediate</i> (Cambridge University Press): 100 unidades temáticas con ejercicios; el compañero ideal de tus mazos SRS.',
      '<b>Christina Latham-Koenig & Clive Oxenden</b> — <i>English File Pre-intermediate</i> (Oxford University Press): el curso de aula más usado; su Online Practice trae audio y video reales.',
      '<b>Annette Capel & Wendy Sharp</b> — <i>Objective Preliminary</i> (Cambridge University Press): curso específico para este examen, 20 unidades temáticas.',
      '<b>Emma Heyderman et al.</b> — <i>Complete Preliminary</i> (Cambridge University Press): preparación integral con simulacros oficiales.',
      '<b>Raymond Murphy</b> — <i>English Grammar in Use</i> (5.ª ed., 2019): ya lo conoces del capítulo 2.',
      '<b>Cambridge Assessment English</b> — <i>B1 Preliminary Handbook for Teachers</i> + sample papers (gratuitos, cambridgeenglish.org): la fuente oficial de formato, rúbricas de Writing/Speaking y escalas.'
    ]},
    {t:'table', head:['Recurso','Para qué'], rows:[
      ['Sample papers oficiales','Formato exacto + audios reales + answer keys'],
      ['“6 Minute English” (BBC)','Listening diario de 6 min con transcripción'],
      ['Podcasts B1 (Luke’s English Podcast, esroles básicos)','Escucha extensiva agradable'],
      ['Series con subtítulos EN (no en español)','Escucha + lectura simultánea'],
      ['Este curso · Repaso del día','SRS diario de verbos + vocabulario']
    ]},
    {t:'tip', title:'💡 La regla 80/20 del input', h:'20 minutos diarios de inglés real (podcast, serie, este curso) superan a 3 horas el sábado. El cerebro aprende idiomas por frecuencia de exposición, no por maratones. Tu plan de 12 semanas ya lo incorpora: confía en el sistema.'}
  ]}
];
