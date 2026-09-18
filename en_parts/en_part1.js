/* ============================ MÓDULO 0: CONOCE TU EXAMEN ============================ */
MODULES.push({
  id:'m0', emoji:'🧭', name:'Conoce tu examen', color:'#64748b',
  desc:'Qué es el B1 Preliminary, cómo se califica y un diagnóstico para arrancar.',
  lessons:[

  /* -------- 0-1 -------- */
  { id:'0-1', title:'Tu meta: el B1 Preliminary de Cambridge', time:'12 min', blocks:[
    {t:'p', h:'Este curso te prepara para el <b>B1 Preliminary</b> (antes llamado PET) de Cambridge: el certificado que acredita un <b>nivel intermedio (B1)</b> de inglés ante universidades, empleadores y visados. Es un examen real, hecho por Cambridge Assessment English, y <b>todo el curso está alineado a su formato oficial</b>: si apruebas los simulacros de aquí, sabrás exactamente qué esperar el día del examen.'},
    {t:'table', head:['Paper (parte del examen)','Qué evalúa','Duración','Peso'], rows:[
      ['📖 <b>Reading</b>','6 partes · 32 preguntas: señales, textos, emparejar, huecos','45 min','25%'],
      ['✍️ <b>Writing</b>','2 tareas: un email obligatorio + artículo o historia (~100 palabras c/u)','45 min','25%'],
      ['🎧 <b>Listening</b>','4 partes · 25 preguntas con audios reales','~30 min','25%'],
      ['🗣️ <b>Speaking</b>','4 partes, en parejas, con 2 examinadores','10–12 min','25%']
    ]},
    {t:'p', h:'Cada paper vale <b>25% de la nota</b>: no puedes descuidar ninguno. La calificación final va en la <b>escala Cambridge (140–190)</b>: con 140 apruebas (<i>Pass</i>), con 160 <i>Pass with Merit</i> y con 170+ <i>Pass with Distinction</i>. Entre 120 y 139 recibes un certificado de nivel A2, por eso <b>cada punto cuenta</b>.'},
    {t:'info', title:'🔑 ¿Por qué B1 es EL nivel clave?', h:'B1 es el “punto de independencia”: ya puedes defenderte en viajes, escribir emails de trabajo, ver series con subtítulos y estudiar con material en inglés. Muchos empleadores y visados (por ejemplo, de estudio en Irlanda o Malta) piden exactamente B1. Es también la puerta a B2 First (FCE).'},
    {t:'tip', title:'💡 Cómo usar este curso', h:'Haz las lecciones en orden (cada una termina con una actividad calificada), practica <b>todos los días 20–30 minutos</b> con las flashcards de repaso espaciado del menú «Repaso del día», y haz los simulacros cronometrados. En el 📦 <b>Plan de estudio</b> tienes un calendario de 12 semanas listo.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuántos papers tiene el B1 Preliminary y cuánto vale cada uno?', options:['3 papers · 33% cada uno','4 papers · 25% cada uno','4 papers · el Writing vale el doble','2 papers · 50% cada uno'], correct:1, pts:10, explain:'Reading, Writing, Listening y Speaking: cuatro partes con el mismo peso (25% cada una).'},
      {type:'mc', q:'¿En qué escala se reporta la calificación final?', options:['0–100','1–10','Escala Cambridge 140–190','A–F'], correct:2, pts:10, explain:'La escala Cambridge va de 140 a 190 en B1; 140 = Pass, 160 = Merit, 170 = Distinction.'},
      {type:'mc', q:'En el Writing, ¿qué tarea es OBLIGATORIA?', options:['La historia','El artículo','El email','Un resumen'], correct:2, pts:10, explain:'La Parte 1 siempre es un email de unas 100 palabras; en la Parte 2 eliges artículo o historia.'},
      {type:'fill', q:'Paper del examen que se hace en parejas y con dos examinadores (en inglés):', accept:['speaking'], re:'^\\s*speaking\\s*$', show:'Speaking', pts:10, hint:'Es hablar…'}
    ]},
    {t:'activity', kind:'exam', title:'✏️ Actividad 1 · Checklist de tu meta B1', sub:'Responde según TU situación: te ayudará a fijar el plan (y suma tus primeros puntos).',
      items:[
        {type:'mc', q:'¿Para qué quieres el B1?', options:['Trabajo','Estudios','Viajar','Superación personal'], correct:0, pts:10, explain:'¡Cualquier motivo vale! Fijarlo te mantiene constante.'},
        {type:'mc', q:'¿Cuántos días por semana podrás estudiar 20–30 min?', options:['1–2','3–4','5–6','Todos'], correct:0, pts:10, explain:'Con 3–4 días de práctica + flashcards diarias, 12 semanas son suficientes desde un A2 sólido.'},
        {type:'mc', q:'¿Cuál paper crees que será tu más fuerte?', options:['Reading','Writing','Listening','Speaking'], correct:0, pts:10, explain:'Refuérzalo poco y tus débiles mucho: la nota final es el promedio de los 4.'},
        {type:'mc', q:'¿Cuál será tu más difícil?', options:['Reading','Writing','Listening','Speaking'], correct:0, pts:10, explain:'Apunta cuál fue: el diagnóstico de la siguiente lección lo confirmará con datos.'},
        {type:'mc', q:'La parte del examen que se hace en PAREJAS con dos examinadores es…', options:['Reading','Speaking','Listening','Writing'], correct:1, pts:10, explain:'Speaking: 10–12 min por pareja, con un examinador que conversa y otro que evalúa.'},
        {type:'mc', q:'Si obtienes 175 en la escala Cambridge, tu grado es…', options:['Pass','Pass with Merit','Pass with Distinction','A2'], correct:2, pts:10, explain:'170+ es Distinction: ¡el máximo grado en B1!'}
      ]}
  ]},

  /* -------- 0-2 -------- */
  { id:'0-2', title:'Diagnóstico: ¿dónde estás hoy?', time:'20 min', blocks:[
    {t:'p', h:'Antes de entrenar, medimos. Esta actividad replica el <b>estilo de cada paper</b> con 4 secciones cortas (lectura, gramática, vocabulario y escucha). Respuesta honesta, sin traductor 😄: al final te digo en qué enfocarte. Son 20 preguntas de 5 puntos.'},
    {t:'activity', kind:'diagnostic', title:'✏️ Actividad 2 · Test diagnóstico B1 (20 preguntas)', sub:'4 secciones con el estilo real de cada paper. Sin diccionario: se trata de medir tu punto de partida.',
      items:[
        {sec:'📖 Sección A · Estilo Reading (Part 1: señales y mensajes)'},
        {type:'mc', q:'Sign: “PLEASE QUEUE HERE AFTER 9 AM”. What should you do?', options:['Go in immediately','Wait in line after 9 am','Pay before 9 am','Come back tomorrow'], correct:1, pts:5, explain:'queue = hacer fila. La señal pide formarse en fila DESPUÉS de las 9.'},
        {type:'mc', q:'Note: “Mum — football practice moved to 5:30. Text me when you’re on the bus. – Tom”. What does Tom want?', options:['A message when his mum is on the bus','A ride at 5:30','New football boots','To skip practice'], correct:0, pts:5, explain:'“Text me” = mándame un mensaje: quiere saber cuándo ella va en camino.'},
        {type:'mc', q:'Sign: “REDUCED PRICE ON ALL WINTER JACKETS – THIS WEEKEND ONLY”. When can you pay less?', options:['All winter','Only this weekend','Never','Next month'], correct:1, pts:5, explain:'“This weekend only” limita la oferta al fin de semana.'},
        {type:'mc', q:'Email: “The meeting is now on Thursday, not Wednesday. Same time.” What changed?', options:['The time','The day','The place','Nothing'], correct:1, pts:5, explain:'Cambió el DÍA (jueves); la hora sigue igual.'},
        {type:'mc', q:'Sign at a pool: “NO LIFEGUARD ON DUTY. SWIM AT YOUR OWN RISK.” This means…', options:['The pool is closed','Nobody is watching to rescue you','Children swim free','You must swim with a friend'], correct:1, pts:5, explain:'Sin salvavidas: nadas bajo tu propio riesgo.'},
        {sec:'⚙️ Sección B · Gramática (estilo Reading Part 6: una palabra)'},
        {type:'gap', q:'She ____ to the gym every morning. (go)', accept:['goes'], pts:5, hint:'3.ª persona singular…'},
        {type:'gap', q:'I ____ never eaten sushi. (try → verbo auxiliar)', accept:['have'], pts:5, hint:'Present perfect: have/has + participio.'},
        {type:'gap', q:'We ____ studying for the exam right now. (be)', accept:['are'], pts:5, hint:'Present continuous: am/is/are + -ing.'},
        {type:'gap', q:'This book is ____ interesting than the film. (comparativo de “more/most”)', accept:['more'], pts:5, hint:'Palabras largas: more + adjetivo + than.'},
        {type:'gap', q:'If it rains, we ____ stay home. (will/can… 1 palabra)', accept:['will','shall'], pts:5, hint:'Conditional 1: if + presente, … will.'},
        {sec:'🗂️ Sección C · Vocabulario (estilo Reading Part 5)'},
        {type:'mc', q:'“The hotel was ____ — clean rooms, great breakfast and a kind staff.”', options:['terrible','excellent','expensive only','closed'], correct:1, pts:5, explain:'Las pistas positivas (clean, great, kind) apuntan a excellent.'},
        {type:'mc', q:'Choose the word that completes: “I need to ____ my passport before the trip.” (renovar)', options:['renew','return','repeat','remove'], correct:0, pts:5, explain:'renew a passport = renovar el pasaporte.'},
        {type:'mc', q:'“Can you ____ me a favour and open the window?”', options:['make','give','do','take'], correct:2, pts:5, explain:'Collocation fija: DO somebody a favour.'},
        {type:'mc', q:'A person who cooks in a restaurant is a…', options:['waiter','chef','manager','farmer'], correct:1, pts:5, explain:'chef = cocinero profesional; waiter = mesero.'},
        {type:'mc', q:'“The film was so ____ that I fell asleep.” (aburrida)', options:['boring','excited','amazing','funny'], correct:0, pts:5, explain:'boring = aburrida; bored = aburrido (la persona).'},
        {sec:'🎧 Sección D · Escucha (lee la transcripción como si la oyeras)'},
        {type:'mc', q:'Dialogue: “A: Do you have any tickets for the 7 pm show? B: Sorry, we only have the 9:30.” When CAN they watch the film?', options:['At 7 pm','At 9:30 pm','At any time','Never'], correct:1, pts:5, explain:'Solo quedan boletos para las 9:30.', transcript:'A: Do you have any tickets for the 7 pm show? B: Sorry, we only have the 9:30.'},
        {type:'mc', q:'Monologue: “I usually cycle to work, but today the bus because of the rain.” How does she NORMALLY go to work?', options:['By bus','By bike','On foot','By car'], correct:1, pts:5, explain:'“usually cycle” = normalmente en bici; hoy fue excepción.', transcript:'I usually cycle to work, but today I took the bus because of the rain.'},
        {type:'mc', q:'Dialogue: “A: Is the museum free on Sundays? B: It used to be, but now it’s £8.” What is TRUE now?', options:['It is free','It costs £8','It is closed','It costs £18'], correct:1, pts:5, explain:'“used to be free, but now…” = antes gratis, ahora £8.', transcript:'A: Is the museum free on Sundays? B: It used to be, but now it’s £8.'},
        {type:'mc', q:'Announcement: “The 10:15 train to York will leave from platform 6.” Where does the York train leave?', options:['Platform 6','Platform 10','Platform 15','Platform 6:15'], correct:0, pts:5, explain:'Platform 6; ¡cuidado con los números distractores (10:15)!', transcript:'The 10:15 train to York will leave from platform 6.'},
        {type:'mc', q:'Dialogue: “A: How was the party? B: Great! But the music was a bit loud.” What did B think about the music?', options:['Perfect','Too loud','Too slow','Terrible party'], correct:1, pts:5, explain:'“a bit loud” = un poco fuerte: crítica suave pero real.', transcript:'A: How was the party? B: Great! But the music was a bit loud.'}
      ]}
  ]}
]});

/* ============================ MÓDULO 1: READING (25%) ============================ */
MODULES.push({
  id:'m1', emoji:'📖', name:'Reading', color:'#2563eb',
  desc:'Las 6 partes del Reading B1: señales, emparejar, lectura larga, cohesión, vocabulario y gramática.',
  lessons:[

  /* -------- 1-1 -------- */
  { id:'1-1', title:'Estrategia general del Reading (45 min, 32 preguntas)', time:'14 min', blocks:[
    {t:'p', h:'El Reading son <b>32 preguntas en 45 minutos</b>: ~1.4 minutos por pregunta. La gente que no termina no lee lento: lee <b>sin estrategia</b>. Aquí construyes la tuya. Dos modos de lectura que debes alternar a voluntad:'},
    {t:'table', head:['Modo','Para qué','Cómo se ve'], rows:[
      ['<b>Skimming</b> (ojear)','Saber DE QUÉ trata el texto en 20–30 s','Leer título + primera línea de cada párrafo'],
      ['<b>Scanning</b> (buscar)','Encontrar datos puntuales (nombres, fechas, precios)','Los ojos buscan la palabra clave, no leen todo'],
      ['<b>Lectura detallada</b>','Responder la pregunta específica','Solo el párrafo que importa, línea por línea']
    ]},
    {t:'steps', items:[
      'Lee PRIMERO la pregunta (y subraya la palabra clave: quién, cuándo, qué).',
      'Ve al texto y haz scanning de esa palabra clave o sinónimo.',
      'Lee detalladamente SOLO la zona encontrada.',
      'Descarta opciones: las que exageran (all, never, always) suelen ser trampa.',
      'Nunca dejes huecos: no hay puntos negativos. Si dudas, tu mejor instinto.'
    ]},
    {t:'info', title:'🔑 La trampa de la paráfrasis', h:'El examen casi nunca usa las mismas palabras del texto en la respuesta correcta: usa <b>sinónimos</b> (“cheap” → “not expensive”, “postponed” → “moved to a later date”). Las opciones con palabras idénticas al texto suelen ser distractores que cambian el sentido. Busca el SIGNIFICADO, no las palabras.'},
    {t:'tip', title:'💡 Tu presupuesto de tiempo', h:'Partes 1–2: 12 min · Parte 3: 8 min · Parte 4: 8 min · Parte 5: 9 min · Parte 6: 8 min. Si una pregunta te traba &gt;2 min, marca tu mejor opción y sigue. Revisa marcados al final.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Vas a buscar un precio específico dentro de un texto largo. Qué modo usas?', options:['Skimming','Scanning','Traducir todo','Leer en voz alta'], correct:1, pts:10, explain:'Scanning: los ojos cazan cifras y palabras clave sin leer todo.'},
      {type:'fill', q:'Técnica de leer título y primeras líneas para saber el tema general (en inglés):', accept:['skimming','skim'], pts:10, hint:'Empieza con “sk”…'},
      {type:'mc', q:'Una opción de respuesta dice “ALL tourists love this place” pero el texto dice “most visitors enjoy it”. La opción es…', options:['Correcta','Un distractor que exagera','Más correcta que el texto','La traducción literal'], correct:1, pts:10, explain:'all/never/always = exageración típica de distractores. El texto dice “most”, no “all”.'},
      {type:'mc', q:'¿Cuánto tiempo aprox. por pregunta en el Reading?', options:['30 segundos','~1.4 minutos','5 minutos','No hay límite'], correct:1, pts:10, explain:'45 min / 32 preguntas ≈ 1.4 min. Administrar tiempo ES parte de la estrategia.'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 3 · Entrena tu scanner', sub:'Encuentra el dato exacto en cada aviso corto. Practica scanning: primero la pregunta, luego el texto.',
      items:[
        {type:'mc', q:'“GYM RULES: Members may bring ONE guest on weekends only. Guests must sign in at reception.” ¿Cuándo puede entrar un invitado?', options:['Cualquier día','Solo fines de semana','Solo entre semana','Nunca'], correct:1, pts:10, explain:'“ONE guest on weekends only”: invitados solo en fin de semana.'},
        {type:'mc', q:'“LIBRARY NOTICE: Books may be borrowed for 14 days. Late returns: 20p per day per book.” ¿Cuánto se paga por 1 libro con 3 días de retraso?', options:['20p','60p','£14','£20'], correct:1, pts:10, explain:'20p × 3 días = 60p (un solo libro).'},
        {type:'mc', q:'“CINEMA: Students with valid ID get 25% off on Tuesdays.” ¿Qué necesitas para el descuento?', options:['Estar en la universidad','Credencial de estudiante vigente','Ir un martes cualquiera sin más','Comprar 2 boletos'], correct:1, pts:10, explain:'valid ID = credencial vigente; el descuento es los martes.'},
        {type:'gap', q:'“RESTAURANT: Kitchen opens at 12:30. Last orders 10 pm. Closed Mondays.” ¿A qué hora es la ÚLTIMA comanda? Escribe la hora (ej. 9 pm).', accept:['10 pm','10pm','10:00 pm','22:00','10 pm.'], pts:10, hint:'“Last orders” = última petición a cocina.'},
        {type:'mc', q:'“PARKING: Maximum stay 2 hours. £3 per hour. Free on Sundays.” ¿Cuánto pagas por 2 horas un sábado?', options:['Gratis','£3','£6','£12'], correct:2, pts:10, explain:'£3 × 2 horas = £6. El domingo es gratis, pero esto es sábado.'},
        {type:'mc', q:'“FLIGHT INFO: Gates close 30 minutes before departure.” Tu vuelo sale a las 14:00. ¿A qué hora CIERRA la puerta?', options:['13:00','13:30','14:00','14:30'], correct:1, pts:10, explain:'14:00 − 30 min = 13:30. Los cálculos de tiempo son clásicos del examen.'}
      ]}
  ]},

  /* -------- 1-2 -------- */
  { id:'1-2', title:'Reading Part 1: señales, anuncios y mensajes', time:'15 min', blocks:[
    {t:'p', h:'La <b>Parte 1</b> son 5 textos muy cortos (señales, emails, notas, anuncios) con una pregunta de 3 opciones cada uno. Es la parte más “rápida” del examen, pero sus distractores son quirúrgicos: toman una palabra real del texto y cambian el sentido.'},
    {t:'code', lang:'txt', title:'ejemplo real de Parte 1', code:`Email from a sports centre:
"We are closing the pool EARLY today (at 6 pm) for cleaning.
Morning sessions as usual tomorrow."

Question: What is different today?
A) The pool opens later.            B) The pool closes sooner.   ✔
C) There is no morning session tomorrow.

Por qué B: "closing early = closes sooner".
A cambia la dirección (closing ≠ opening) y C contradice
"tomorrow as usual". Clásico: usar palabras del texto
con sentido alterado.`},
    {t:'table', head:['Palabra de señal','Significado','Truco'], rows:[
      ['only / just','limita (“solo”)','Pregunta: ¿qué EXCLUYE?'],
      ['until / from…to','intervalos de tiempo','Dibuja la línea de tiempo'],
      ['must / must not','obligación / prohibición','No confundir con “can”'],
      ['free / reduced','gratis / con descuento','¿De qué o para quién?'],
      ['instead / moved to','cambio de plan','¿Qué sustituye a qué?']
    ]},
    {t:'warn', title:'⚠️ Los 3 errores típicos en Parte 1', h:'1) Leer la pregunta deprisa y responder sobre OTRA cosa (pregunta por HOY, respondes sobre mañana). 2) Elegir la opción porque “suena” igual al texto sin verificar el sentido. 3) Ignorar negaciones: <i>no, never, don’t, without</i> invierten todo.'},
    {t:'quiz', questions:[
      {type:'mc', q:'“POOL CLOSED FOR CLEANING UNTIL FRIDAY”. ¿Qué es verdad?', options:['Abre el viernes','Está cerrada desde el viernes','Limpian los viernes','Nunca abre'], correct:0, pts:10, explain:'until Friday = hasta el viernes: reabre ese día.'},
      {type:'mc', q:'¿Cuál opción suele ser un distractor en Parte 1?', options:['Un sinónimo exacto del sentido del texto','Una frase con palabras copiadas del texto pero sentido cambiado','La opción más corta','La opción B'], correct:1, pts:10, explain:'Palabras idénticas + sentido alterado = el distractor favorito de Cambridge.'},
      {type:'fill', q:'Palabra que limita como “solo” y aparece muchísimo en señales:', accept:['only','just'], pts:10, hint:'O-N-L-Y'},
      {type:'mc', q:'“SALE: Buy one, get the second at HALF PRICE”. Si compras 2 camisetas de $20…', options:['Pagas $40','Pagas $30','Pagas $20','Pagas $10'], correct:1, pts:10, explain:'20 + 10 = $30. Half price SOLO en la segunda.'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 4 · Simulacro Parte 1 (6 avisos)', sub:'Estilo exacto de examen: lee el aviso, elige A, B o C. Apunta a 5/6 o mejor.',
      items:[
        {type:'mc', q:'Notice: “THIS BRIDGE IS CLOSED TO VEHICLES. CYCLISTS AND PEDESTRIANS ONLY.” Who CAN cross?', options:['Cars and cyclists','People walking and cyclists','Only cars','Nobody'], correct:1, pts:10, explain:'pedestrians = peatones; vehicles prohibidos.'},
        {type:'mc', q:'Text from boss: “Can you swap your day off from Friday to Monday next week?” What does the boss want?', options:['Give an extra day off','Move the day off to Monday','Cancel the day off','Meet on Friday'], correct:1, pts:10, explain:'swap = intercambiar: mueve el día libre al lunes.'},
        {type:'mc', q:'Sign: “ELEVATOR OUT OF ORDER – PLEASE USE THE STAIRS”. What is wrong with the elevator?', options:['It is dirty','It is not working','It is too slow','It is for staff only'], correct:1, pts:10, explain:'out of order = fuera de servicio.'},
        {type:'mc', q:'Ad: “SPANISH COURSES – BEGINNERS WELCOME. FIRST CLASS FREE. STARTS IN SEPTEMBER.” What can you do?', options:['Try one class without paying','Learn in August','Only advanced students','Teach Spanish'], correct:0, pts:10, explain:'first class free = la primera clase es gratis (una prueba).'},
        {type:'mc', q:'Note: “Jess – your parcel is at the neighbour’s, number 12. I took it in this morning. – Mrs. Lee”. Where is the parcel?', options:['At the post office','At number 12','At Jess’s work','Lost'], correct:1, pts:10, explain:'La vecina lo recibió: está en la casa número 12.'},
        {type:'mc', q:'Sign in a museum: “PHOTOGRAPHY PERMITTED WITHOUT FLASH”. What are visitors allowed to do?', options:['Take photos without flash','Not take photos','Use flash only at night','Touch the exhibits'], correct:0, pts:10, explain:'permitted without flash = permitido sin flash.'}
      ]}
  ]},

  /* -------- 1-3 -------- */
  { id:'1-3', title:'Reading Part 2: emparejar personas con textos', time:'14 min', blocks:[
    {t:'p', h:'La <b>Parte 2</b> te da <b>5 personas</b> (cada una describe qué busca/necesita) y <b>8 textos cortos</b> (hoteles, cursos, clubes…). Debes elegir qué texto conviene a cada persona. <b>Hay 3 textos que sobran</b> y cada texto se usa máximo una vez.'},
    {t:'steps', items:[
      'Lee primero LAS 5 PERSONAS y subraya sus 2–3 requisitos (ej.: “cerca de la playa + wifi + barato”).',
      'Haz scanning de los 8 textos buscando esos requisitos (con sinónimos: “cheap” ≈ “low price” ≈ “affordable”).',
      'Empieza por la persona con requisitos MÁS específicos (la más difícil): descarta textos al ritmo que la resuelves.',
      'Cada texto usado se descarta: táchalo. Sobran 3 al final.',
      'Verifica: cada persona debe cumplir TODOS sus requisitos, no solo uno.'
    ]},
    {t:'info', title:'🔑 El requisito trampa', h:'Casi siempre, 2–3 textos cumplen la MAYORÍA de los requisitos de una persona, pero fallan UNO. Por eso sirves tus requisitos como checklist: ✅ cerca del centro ✅ desayuno incluido ❌ permite mascotas → descartado. La respuesta correcta cumple el 100%.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuántos textos sobran en la Parte 2?', options:['Ninguno','2','3','5'], correct:2, pts:10, explain:'8 textos para 5 personas: sobran 3 (y ningún texto se usa dos veces).'},
      {type:'mc', q:'Ana quiere: “piscina + cocina propia + cerca del metro”. El hotel A tiene piscina y metro pero sin cocina. ¿Es válido?', options:['Sí, cumple 2 de 3','No: debe cumplir TODOS los requisitos','Sí, si es barato','Depende del precio'], correct:1, pts:10, explain:'Checklist completa o nada: un requisito fallido descarta el texto.'},
      {type:'mc', q:'¿Con qué persona conviene empezar?', options:['La primera siempre','La de requisitos más específicos','La última','Una al azar'], correct:1, pts:10, explain:'La más específica descarta más textos y simplifica las demás.'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 5 · Empareja persona ↔ curso', sub:'3 personas buscan curso de idiomas; hay 5 escuelas. Elige la escuela correcta para cada persona (checklist mental).',
      items:[
        {sec:'Las personas'},
        {type:'mc', q:'MARTA: “Trabajo de mañana; necesito clases por la NOCHE y quiero practicar conversación en grupo pequeño (máx. 6). Presenciales.” ¿Qué escuela?', options:['A','B','C','D','E'], correct:1, pts:10, explain:'B cumple: noche (7–9 pm), grupos de 6, presencial. A es online, D es de mañana, C son clases individuales, E no tiene nocturno.'},
        {type:'mc', q:'LUIS: “Solo puedo los SÁBADOS y prefiero estudiar desde casa sin viajar.” ¿Qué escuela?', options:['A','B','C','D','E'], correct:0, pts:10, explain:'A: sábados online (9–1). Es la única online y de sábado.'},
        {type:'mc', q:'ELENA: “Voy a Londres 2 semanas; quiero clases INTENSIVAS de mañana y alojamiento con familia.” ¿Qué escuela?', options:['A','B','C','D','E'], correct:3, pts:10, explain:'D: intensivo matutino + familia. E tiene familia pero solo 5 h/semana.'},
        {sec:'Las escuelas (para tu referencia)'},
        {type:'mc', q:'ESCUELA A: “Online-only school. Saturday intensive mornings, 9 am–1 pm. Recorded lessons included.” · ESCUELA B: “Evening group classes (7–9 pm), max 6 students, in-person in the city centre.” · ESCUELA C: “Private one-to-one lessons, any time you choose. £30/hour.” · ESCUELA D: “Intensive morning course (9 am–1 pm) + homestay with local families. 2-week minimum.” · ESCUELA E: “Homestay weekends + 5 hours of lessons per week, evenings only.”<br><br>✅ Ya respondiste arriba: Marta → B · Luis → A · Elena → D. La escuela que NO usó nadie es…', options:['Escuela C (individuales)','Escuela E','Ninguna: las 5 se usaron'], correct:1, pts:20, explain:'E (evenings, 5 h/semana) no cumplía el checklist de ninguno de los tres: sobraba, como las 3 escuelas/textos que sobran en el examen real.'}
      ]}
  ]},

  /* -------- 1-4 -------- */
  { id:'1-4', title:'Reading Part 3: la lectura larga', time:'15 min', blocks:[
    {t:'p', h:'La <b>Parte 3</b> es un texto largo (350–400 palabras: un artículo, biografía o reseña) con <b>5 preguntas de opción múltiple</b> (3 opciones). Aquí se premia entender <b>opinión, intención y detalle</b>, no solo datos.'},
    {t:'steps', items:[
      'Skimming: lee el título + primera línea de cada párrafo (30 s). ¿De qué trata y qué tono tiene?',
      'Lee la pregunta 1 + sus 3 opciones. Identifica la palabra clave.',
      'Scanning al texto → zona clave → lectura detallada → elige.',
      'Las preguntas siguen el ORDEN del texto (la 1 al inicio, la 5 al final): úsalo como mapa.',
      'Preguntas de “propósito” (why did the writer…?) se responden con el tono general, no con una frase suelta.'
    ]},
    {t:'code', lang:'txt', title:'anatomía de las opciones', code:`Texto: "I didn't plan to love running. My sister dragged me
to a 5K 'just for fun', and I complained the whole way.
But crossing that line... I signed up for a marathon
before I even got home."

Q: Why did the writer take part in the 5K?
A) She wanted to beat her sister.
B) Her sister persuaded her to go.   ✔  ("dragged me" = persuadió a la fuerza)
C) She needed to train for a marathon. (al revés: el maratón fue DESPUÉS)

Lección: la correcta casi siempre es una PARÁFRASIS
("dragged me" → "persuaded her"); las trampa usan palabras
del texto con lógica invertida.`},
    {t:'tip', title:'💡 Preguntas de opinión/propósito', h:'“What does the writer think about…?” → busca adjetivos de opinión en el texto (surprisingly, luckily, boring, worth it). “Why did X happen?” → busca conectores causales: because, so, that’s why, due to.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Las 5 preguntas de la Parte 3…', options:['Van en desorden','Siguen el orden del texto','Todas al final','Están solo al inicio'], correct:1, pts:10, explain:'Pregunta 1 ≈ inicio del texto, pregunta 5 ≈ final: tu mapa de búsqueda.'},
      {type:'mc', q:'“dragged me to a 5K” significa…', options:['Me arrastró literalmente','Me convenció/prácticamente me llevó a la fuerza','Me ganó la carrera','Me enseñó a correr'], correct:1, pts:10, explain:'Uso figurado: llevar a alguien a algo casi a la fuerza. El examen ama los phrasal/idiom suaves.'},
      {type:'fill', q:'Conector causal típico que introduce la razón de algo (1 palabra, en inglés):', accept:['because','since','as'], pts:10, hint:'La más común empieza con “be”…'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 6 · Simulacro Parte 3 (texto + 5 preguntas)', sub:'Lee el texto COMPLETO una vez (2 min) y responde. Aplica skimming → scanning → detalle.',
      items:[
        {sec:'“The Cake That Almost Wasn’t” — When Maria opened her tiny bakery, everyone told her it would fail...' },
        {type:'mc', q:'Texto: “When Maria opened her tiny bakery, everyone told her it would fail. Her father even refused to lend her money, so she sold her car. The first month, she had three customers a day. Instead of closing, she started giving free samples outside the school nearby — and mothers started coming in. By winter, there was a queue out of the door, and the same father who said no became her delivery driver.” ¿Por qué vendió su coche?', options:['Le gustaba caminar','Su padre no le prestó dinero','El coche era viejo','Para comprar harina'], correct:1, pts:10, explain:'“Her father refused to lend her money, SO she sold her car”: causa directa.'},
        {type:'mc', q:'(Mismo texto) ¿Qué cambió la situación del negocio?', options:['Bajar precios','Regalar muestras frente a una escuela','Contratar personal','Cerrar un mes'], correct:1, pts:10, explain:'“giving free samples outside the school” atrajo a las madres: la clave del giro.'},
        {type:'mc', q:'(Mismo texto) La frase “a queue out of the door” sugiere que…', options:['La puerta se rompió','Había muchos clientes','Hacía frío','El local era pequeño'], correct:1, pts:10, explain:'Fila/fuera de la puerta = clientela abundante. Interpretar expresiones es parte de B1.'},
        {type:'mc', q:'(Mismo texto) ¿Qué dice el texto sobre el padre?', options:['Nunca apoyó a Maria','Terminó trabajando con ella','Le prestó dinero al final','Vendió el coche'], correct:1, pts:10, explain:'“became her delivery driver”: cambió de escéptico a empleado suyo.'},
        {type:'mc', q:'(Mismo texto) ¿Cuál sería el mejor título según el texto?', options:['How free samples saved a bakery','My father’s bakery','Bread is bad for you','A queue out of the door'], correct:0, pts:10, explain:'Resume la idea central (las muestras gratis salvaron el negocio), no un detalle.'}
      ]}
  ]},

  /* -------- 1-5 -------- */
  { id:'1-5', title:'Reading Part 4: las frases sueltas (cohesión)', time:'14 min', blocks:[
    {t:'p', h:'La <b>Parte 4</b> es un texto con <b>5 huecos</b>. Debajo hay 6 frases sueltas: debes colocar 5 en su hueco. <b>Una sobra</b> (¡y se parece a alguna correcta!). Esta parte mide <b>cohesión</b>: cómo las frases se enganchan entre sí.'},
    {t:'h', h:'Los 4 ganchos que delatan la respuesta'},
    {t:'table', head:['Gancho','Ejemplo','Cómo usarlo'], rows:[
      ['<b>Pronombres</b>','“She loved it” → ¿quién es <i>she</i>?','El hueco ANTES debe nombrar a una mujer'],
      ['<b>Conectores</b>','“However,” “Then,” “Finally,”','However = contradicción con lo anterior'],
      ['<b>Repeticiones/sinónimos</b>','“that trip” → antes hubo un viaje','Busca el sustantivo al que se refiere'],
      ['<b>Progresión temporal</b>','First → Then → After that → Finally','Ordena por lógica de eventos']
    ]},
    {t:'warn', title:'⚠️ La frase que sobra', h:'La frase sobrante siempre es <b>verosímil</b>: usa palabras del texto y “podría caber”. Prueba TODAS las frases en TODOS los huecos antes de decidir; la sobrante suele ser la que “casi” encaja en dos huecos — y por eso no encaja bien en ninguno.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Un hueco va precedido de “My brother Pablo visited us in July.” y el hueco dice “_____ sent us the best photos from the coast.” La frase correcta se referencia con…', options:['un conector de contraste','un pronombre (He)','un número','una pregunta'], correct:1, pts:10, explain:'He = Pablo (hermano): el pronombre apunta al sustantivo masculino anterior.'},
      {type:'mc', q:'Si un hueco empieza con “However,”, la frase anterior presenta…', options:['Una idea opuesta','Un ejemplo','Una conclusión','Una lista'], correct:0, pts:10, explain:'However = “sin embargo”: contraste.'},
      {type:'mc', q:'¿Cuántas frases hay en total y cuántas sobran en Parte 4?', options:['5 y sobra 1','6 y sobra 1','6 y sobran 2','5 y no sobra ninguna'], correct:1, pts:10, explain:'6 frases para 5 huecos: una sobra.'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 7 · Coloca las frases sueltas', sub:'Texto con 3 huecos y 4 frases (sobra 1). Para cada hueco elige la frase correcta (A–D).',
      items:[
        {sec:'Texto: “Last summer I travelled to Oaxaca with my cousin Andrea. (1) _____. We signed up for a cooking course, but on the first morning the teacher didn’t appear. (2) _____. She taught us to make mole and fresh tortillas instead. By the end of the week we didn’t want to leave. (3) _____. Next year, we’re going back for the market tour.”<br><br>Frases sueltas: <b>A)</b> “However, the hotel receptionist called her friend Rosario, a local cook.” · <b>B)</b> “It was, without a doubt, the best trip of our lives.” · <b>C)</b> “She had invited me three times before, and this time I finally said yes.” · <b>D)</b> “The flight was delayed by two hours, which is normal in August.”'},
        {type:'mc', q:'Hueco (1) — tras “travelled to Oaxaca with my cousin Andrea”:', options:['Frase A','Frase B','Frase C','Frase D'], correct:2, pts:15, explain:'C: el pronombre “She” apunta a Andrea (mencionada justo antes) y “this time I finally said yes” explica cómo nació el viaje.'},
        {type:'mc', q:'Hueco (2) — tras “the teacher didn’t appear”:', options:['Frase A','Frase B','Frase C','Frase D'], correct:0, pts:15, explain:'A: “However” marca contraste y “called her friend Rosario” resuelve la ausencia de la profesora (además “She taught us” necesita una mujer antes: Rosario).'},
        {type:'mc', q:'Hueco (3) — antes de “Next year, we’re going back”:', options:['Frase A','Frase B','Frase C','Frase D'], correct:1, pts:15, explain:'B: cierra con el balance emocional del viaje y prepara “vamos a volver”.'},
        {type:'mc', q:'¿Cuál frase SOBRA en el texto anterior?', options:['Frase A','Frase B','Frase C','Frase D'], correct:3, pts:15, explain:'D (el vuelo retrasado) no conecta con ningún hueco: es la trampa verosímil.'}
      ]}
  ]},

  /* -------- 1-6 -------- */
  { id:'1-6', title:'Reading Part 5: vocabulario en contexto', time:'14 min', blocks:[
    {t:'p', h:'La <b>Parte 5</b> es un texto con <b>6 huecos de opción múltiple</b> (4 opciones): mide <b>vocabulario</b> — collocations, palabras confundibles y phrasal verbs en contexto. La técnica: nunca elijas “la palabra bonita”; elige la que <b>el contexto exige</b> (gramática + significado + compañía de palabras).'},
    {t:'h', h:'Collocations B1 que salvan preguntas'},
    {t:'table', head:['Verbo','Compañía fija','Ejemplo'], rows:[
      ['do','a favour, homework, the shopping, sport','Can you do me a favour?'],
      ['make','a mistake, a decision, noise, friends, money','We made a decision together.'],
      ['take','a photo, a bus, medicine, an exam, place','The exam takes place in May.'],
      ['get','home, lost, married, better, a job','I got lost in the old town.'],
      ['have','breakfast, fun, a rest, an accident','We had fun at the party.'],
      ['go','shopping, swimming, home, abroad','Let’s go swimming.']
    ]},
    {t:'info', title:'🔑 El método de las 3 preguntas', h:'Ante cada hueco pregúntate: 1) <b>¿Qué significa</b> la frase completa? 2) <b>¿Qué palabra pide la gramática?</b> (sustantivo/verbo/adjetivo). 3) <b>¿Con qué palabra se acompaña?</b> (collocation). Si dos opciones significan parecido, la diferencia casi siempre es la collocation.'},
    {t:'quiz', questions:[
      {type:'mc', q:'“We ___ a lot of photos during the trip.”', options:['make','do','take','put'], correct:2, pts:10, explain:'take photos: collocation fija.'},
      {type:'mc', q:'“I need to ___ a decision soon.”', options:['do','make','take','have'], correct:1, pts:10, explain:'make a decision (aunque en otros idiomas sea “tomar”).'},
      {type:'fill', q:'Collocation: “Can you ___ me a favour?” (verbo)', accept:['do'], pts:10, hint:'Hacer en el sentido de hacer un favor…'},
      {type:'mc', q:'“The festival ___ place every October.”', options:['makes','takes','does','gives'], correct:1, pts:10, explain:'take place = tener lugar (se lleva a cabo).'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 8 · Cloze de vocabulario (6 huecos)', sub:'Estilo Parte 5 con 4 opciones por hueco. Lee la frase COMPLETA antes de elegir.',
      items:[
        {type:'mc', q:'“My sister ___ up early to catch the first bus.”', options:['woke','stood','rose up','awoke up'], correct:0, pts:10, explain:'wake up = despertarse. “awake up” y “rise up” no existen así.'},
        {type:'mc', q:'“I’m not hungry — I’ve just ___ lunch.”', options:['made','had','taken','given'], correct:1, pts:10, explain:'have lunch = comer/almorzar: collocation con comidas.'},
        {type:'mc', q:'“She ___ her driving test on the first attempt.”', options:['passed','succeeded','won','got'], correct:0, pts:10, explain:'pass a test = aprobar un examen. succeed va con in + -ing.'},
        {type:'mc', q:'“We arrived ___ the airport two hours early.”', options:['to','at','in','on'], correct:1, pts:10, explain:'arrive AT (lugares puntuales) / arrive IN (ciudades, países). La preposición también es vocabulario.'},
        {type:'mc', q:'“It was raining, so the match was ___ until Sunday.”', options:['played','cancelled','postponed','denied'], correct:2, pts:10, explain:'postponed = pospuesto (se jugará después). Cancelled = anulado para siempre.'},
        {type:'mc', q:'“He ___ a mistake in the report, but his boss was understanding.”', options:['did','made','took','put'], correct:1, pts:10, explain:'make a mistake: la collocation más preguntada de todas.'}
      ]}
  ]},

  /* -------- 1-7 -------- */
  { id:'1-7', title:'Reading Part 6: gramática en huecos', time:'14 min', blocks:[
    {t:'p', h:'La <b>Parte 6</b> cierra el Reading: un texto con <b>6 huecos</b> donde escribes <b>UNA palabra</b> (sin opciones). Mide gramática activa: aquí no hay suerte. La buena noticia: las respuestas caen en <b>categorías predecibles</b>.'},
    {t:'table', head:['Categoría (frecuencia real)','Palabras típicas','Pista en la frase'], rows:[
      ['Artículos','a, an, the','Hueco antes de sustantivo'],
      ['Preposiciones','in, on, at, to, for, of, with','Tras verbos/adjetivos fijos (depend ON, interested IN)'],
      ['Auxiliares','is, are, have, has, did, will, do','Preguntas, negaciones, perfectos, pasivas'],
      ['Pronombres/posesivos','it, them, his, their, who','Sustituyen a alguien ya mencionado'],
      ['Conectores','and, but, because, so, if','Unen dos ideas'],
      ['Modales','can, must, should, might','Antes de verbo base']
    ]},
    {t:'steps', items:[
      'Lee la frase COMPLETA del hueco (no la línea suelta): ¿qué función falta?',
      'Reduce: ¿artículo, preposición, auxiliar…? Cada categoría tiene pocas candidatas.',
      'Escribe UNA palabra. Las contracciones (don’t) cuentan como una.',
      'Al terminar, relee todo el texto: la palabra debe sonar natural en voz alta.'
    ]},
    {t:'warn', title:'⚠️ Ortografía = punto', h:'Una falta de ortografía anula la respuesta (recieved ✗). Al final del Reading reserva 1 minuto para releer TUS palabras escritas. Los clásicos: because (no “becuase”), which (no “wich”), usually (no “usully”).'},
    {t:'quiz', questions:[
      {type:'fill', q:'“I have lived here ___ 2019.” (1 palabra)', accept:['since'], pts:10, hint:'Punto de inicio en el tiempo…'},
      {type:'fill', q:'“She’s interested ___ learning Korean.” (1 palabra)', accept:['in'], pts:10, hint:'interested + preposición…'},
      {type:'fill', q:'“___ he speak French? — Only a little.” (1 palabra, pregunta)', accept:['does'], pts:10, hint:'Auxiliar para 3.ª persona…'},
      {type:'fill', q:'“The film was boring, ___ we left early.” (1 palabra, contraste)', accept:['so'], pts:10, hint:'Causa → consecuencia…'}
    ]},
    {t:'activity', kind:'reading', title:'✏️ Actividad 9 · Cloze de gramática (6 huecos, UNA palabra)', sub:'Escribe una palabra por hueco. Sin opciones: activa tus categorías gramaticales.',
      items:[
        {type:'gap', q:'“My brother and I share a room, ___ we don’t always get along.” (contraste)', accept:['but'], pts:10, hint:'Conector de contraste.'},
        {type:'gap', q:'“There ___ a lot of people at the concert last night.” (verbo be, pasado)', accept:['were'], pts:10, hint:'a lot of people = plural.'},
        {type:'gap', q:'“I’m looking forward ___ the holidays.” (preposición)', accept:['to'], pts:10, hint:'look forward + …'},
        {type:'gap', q:'“You ___ wear a helmet when you ride a bike here. It’s the law.” (obligación, 1 palabra)', accept:['must','have','must to'], pts:10, hint:'Obligación fuerte…'},
        {type:'gap', q:'“This is the phone ___ I bought yesterday.” (pronombre relativo)', accept:['which','that'], pts:10, hint:'Para cosas…'},
        {type:'gap', q:'“If I ___ you, I would take the job.” (verbo be, conditional 2)', accept:['were','was'], pts:10, hint:'Conditional 2 clásico…'}
      ]}
  ]}
]});
