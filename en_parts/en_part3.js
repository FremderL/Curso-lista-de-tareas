
/* ============================ MÓDULO 4: SPEAKING (25%) ============================ */
MODULES.push({
  id:'m4', emoji:'🗣️', name:'Speaking', color:'#ea580c',
  desc:'Las 4 partes del oral: entrevista, foto, diálogo en pareja y discusión — practica con tu micrófono.',
  lessons:[

  /* -------- 4-1 -------- */
  { id:'4-1', title:'Speaking Part 1: la entrevista personal', time:'13 min', blocks:[
    {t:'p', h:'El oral abre con preguntas personales: <i>Where are you from? What do you do in your free time?</i> Parece fácil, pero aquí ya se evalúa: fluidez, pronunciación y <b>respuestas con detalle</b>. La regla: <b>respuesta + razón + detalle</b> (2–3 frases). “Yes” seco mata tu calificación de fluidez.'},
    {t:'code', lang:'txt', title:'la fórmula R-R-D', code:`Q: Do you like sports?
✗ "Yes."                       (3 palabras: muy poco)
✓ "Yes, I love swimming. (respuesta)
   I go twice a week with my brother, (razón)
   usually in the evenings after school." (detalle)

Q: What do you do in your free time?
✓ "Well, I'm really into photography. (respuesta)
   I bought my first camera last year, (detalle)
   and now I take photos of old buildings in my city."`},
    {t:'table', head:['Pregunta típica','Arranque natural'], rows:[
      ['Where are you from?','I’m from [ciudad], a city in the [norte/sur] of Mexico. It’s famous for…'],
      ['Free time / hobbies','In my free time, I really enjoy… / I’m into…'],
      ['Future plans','I’m hoping to… / Next year, I’d like to…'],
      ['Do you like…?','Yes, I do — especially… / Not really, but I do like…']
    ]},
    {t:'info', title:'🔑 Tu micrófono en este curso', h:'En Chrome/Edge verás el botón <b>🎤 Intentar</b>: presiona, di tu respuesta en voz alta y compara con el modelo (▶). El reconocimiento es un ayudante: si tu navegador no lo soporta (o prefieres), usa la autoevaluación de la checklist — en el examen no habrá robot, pero sí un examinador escuchando tu R-R-D.'},
    {t:'quiz', questions:[
      {type:'mc', q:'La mejor respuesta a “Do you like cooking?” es…', options:['“Yes.”','“Yes, I love it — I make pasta every Sunday with my dad.”','“Cooking is a thing people do.”','“Yes, I am like.”'], correct:1, pts:10, explain:'R-R-D: respuesta + detalle personal. Fluidez se demuestra extendiendo, no decorando.'},
      {type:'fill', q:'Frase para expresar afición: “I’m really ___ photography.” (preposición)', accept:['into'], pts:10, hint:'be into = estar metido en…'},
      {type:'mc', q:'Si no entiendes al examinador, ¿qué haces?', options:['Silencio','“Sorry, could you repeat that, please?”','Responder otra cosa','Hablar en español'], correct:1, pts:10, explain:'Pedir repetición ES comunicación: no penaliza; el silencio sí.'}
    ]},
    {t:'activity', kind:'speaking', title:'✏️ Actividad 22 · Tu entrevista R-R-D', sub:'Escucha cada pregunta (▶), responde EN VOZ ALTA (usa 🎤 si tu navegador lo permite) y evalúa tu respuesta con la rúbrica al final.',
      items:[
        {sec:'Las preguntas (responde 2–3 frases cada una)'},
        {type:'mc', q:'▶ “Where are you from? What is it like?” — ¿Qué debe INCLUIR tu respuesta?', options:['Solo el nombre de tu ciudad','Nombre + detalle (famosa por / me gusta porque)','Un saludo','Una pregunta al examinador'], correct:1, pts:10, audio:'Where are you from? What is it like?', transcript:'Where are you from? What is it like?', explain:'Modelo: “I’m from Guadalajara, a big city in western Mexico. It’s famous for its food and friendly people.”'},
        {type:'mc', q:'▶ “What do you do in your free time?” — marca la respuesta MÁS fuerte:', options:['“I watch TV.”','“Well, I’m really into basketball. I train three times a week and I never miss a game with my friends.”','“Free time yes.”','“Basketball is a sport.”'], correct:1, pts:10, audio:'What do you do in your free time?', transcript:'What do you do in your free time?', explain:'Extiende con frecuencia + detalle social: fluidez y vocabulario en acción.'},
        {type:'mc', q:'▶ “Do you plan to use English in the future? How?” — una buena razón con propósito:', options:['“Yes.”','“Maybe.”','“Yes, I do. I’m hoping to study computer science, and most of the good tutorials are in English.”','“English is important.”'], correct:2, pts:10, audio:'Do you plan to use English in the future? How?', transcript:'Do you plan to use English in the future? How?', explain:'Meta concreta + razón = respuesta B1 completa.'}
      ],
      rubricTitle:'🎙️ Rúbrica: graba tu voz (o habla en voz alta) y márcate',
      checklist:[
        {label:'Respondí cada pregunta con 2–3 frases (R-R-D)', pts:20},
        {label:'Usé al menos 1 expresión natural (I’m into… / I’m hoping to… / especially…)', pts:20},
        {label:'Mi pronunciación fue clara (puedo repetir sin leer)', pts:20},
        {label:'No respondí con sí/no secos', pts:20},
        {label:'Hablar en inglés me tomó más de 30 segundos en total', pts:20}
      ]}
  ]},

  /* -------- 4-2 -------- */
  { id:'4-2', title:'Speaking Part 2: la foto (técnica D-O-M-I-N-O)', time:'15 min', blocks:[
    {t:'p', h:'En la Parte 2 hablas SOLO ~1 minuto describiendo una foto (en tu examen real, tu compañero hace su foto después). Para que el minuto rinda, memoriza la fórmula <b>D-O-M-I-N-O</b>: Dónde, Ocasión, Mood (ambiente), Ideas (qué están haciendo), Nice detail (un detalle fino), Opinión/conclusión.'},
    {t:'code', lang:'txt', title:'tu guion de 1 minuto (D-O-M-I-N-O)', code:`D — Dónde:  "In this picture, I can see a family at a park."
O — Ocasión:"It looks like a birthday party, because of the balloons."
M — Mood:   "Everybody seems really happy and relaxed."
I — Ideas:  "The children are playing on the grass while
             the parents are preparing the food."
N — Nice:   "In the background, there's a dog trying to
             steal a sandwich — it's my favourite part."
O — Opinión:"It reminds me of the parties at my grandma's house."

⏱️ 6 frases ≈ 1 minuto. ¡Practícalo con cronómetro!`},
    {t:'table', head:['Herramienta','Frases'], rows:[
      ['Probabilidad (“se ve que”)','It looks like… · They must be… · Maybe they are…'],
      ['Acciones en progreso','They’re playing… · He’s holding… · She’s wearing…'],
      ['Especulación educada','He seems… · I guess… · I can’t tell, but probably…'],
      ['Ubicación fina','In the foreground/background, on the left, at the top']
    ]},
    {t:'warn', title:'⚠️ No describas objetos sueltos', h:'El error clásico es inventariar: “There is a table. There are chairs. There is a cake.” El examinador premia <b>acciones + especulación + conexión personal</b>. Estructura (D-O-M-I-N-O) > lista de cosas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué frase especula correctamente sobre una foto?', options:['“They are doctors.”','“They must be doctors, because of the white coats.”','“Doctors.”','“I am a doctor.”'], correct:1, pts:10, explain:'must be + evidencia = especulación correcta (no puedes saberlo seguro).'},
      {type:'fill', q:'Frase de ubicación: “In the ___ground, there’s a dog.” (fondo = back…)', accept:['back'], pts:10, hint:'Fondo de la imagen…'},
      {type:'mc', q:'¿Cuánto hablas en la Parte 2?', options:['~10 segundos','~1 minuto','5 minutos','Lo que quieras'], correct:1, pts:10, explain:'Aproximadamente un minuto: 6–8 frases bien estructuradas.'}
    ]},
    {t:'activity', kind:'speaking', title:'✏️ Actividad 23 · Describe esta foto (ordenar tu minuto)', sub:'Foto: una familia hace un picnic en el parque; los niños juegan con una pelota, el papá cocina en una parrilla, la mamá ríe; hay un perro cerca de la canasta. Ordena las frases según D-O-M-I-N-O.',
      items:[
        {type:'mc', q:'Primera frase (D — Dónde):', options:['“It reminds me of my summers.”','“In this picture, I can see a family having a picnic in a park.”','“The dog wants a sandwich.”','“They must be very happy.”'], correct:1, pts:15, explain:'La ubicación general abre siempre la descripción.'},
        {type:'mc', q:'Frase de Ocasión/Mood:', options:['“It looks like a Sunday picnic — everybody seems relaxed and cheerful.”','“There is a park.”','“I like parks.”','“Food is delicious.”'], correct:0, pts:15, explain:'It looks like + seem = especulación y ambiente.'},
        {type:'mc', q:'Frase de Ideas (acciones en progreso):', options:['“Ball.”','“The children are playing with a ball while their dad is grilling.”','“Children play ball yesterday.”','“Playing ball is fun.”'], correct:1, pts:15, explain:'Present continuous para acciones capturadas en la foto.'},
        {type:'mc', q:'Nice detail + Opinión (cierra así):', options:['“Dog.”','“Photo of family.”','“In the background, there’s a dog eyeing the picnic basket — it reminds me of my own dog at home.”','“The end.”'], correct:2, pts:15, explain:'Detalle específico + conexión personal = cierre con personalidad.'},
        {type:'mc', q:'Ahora DÍILO en voz alta (1 minuto, usa 🎤 si puedes) y márcate en la rúbrica. ¿Lograste 6+ frases sin detenerte más de 5 segundos?', options:['Sí','Casi','Todavía no — lo repito'], correct:0, pts:10, explain:'El minuto se entrena: repite la descripción 3 veces y cronometra. Cada repetición gana fluidez real.'}
      ],
      rubricTitle:'🎙️ Rúbrica de tu minuto D-O-M-I-N-O',
      checklist:[
        {label:'Abrí con ubicación general (In this picture…)', pts:20},
        {label:'Especulé al menos una vez (It looks like / must be / maybe)', pts:20},
        {label:'Usé presente continuo para acciones (are playing / is grilling)', pts:20},
        {label:'Di un detalle específico (in the background…)', pts:20},
        {label:'Hablé ~1 minuto con pausas cortas', pts:20}
      ]}
  ]},

  /* -------- 4-3 -------- */
  { id:'4-3', title:'Speaking Part 3: proponer, opinar, negociar', time:'14 min', blocks:[
    {t:'p', h:'En la Parte 3 hablas CON tu compañero: el examinador les da una situación (“Queremos organizar una fiesta de fin de cursos: ¿qué es lo más importante?”) y un mapa visual con opciones. Evalúan si <b>construyen la conversación juntos</b>: proponer, aceptar, discrepar con educación y hacer preguntas. Monologar en pareja pierde puntos.'},
    {t:'table', head:['Función','Frases B1 listas'], rows:[
      ['Proponer','Shall we start with…? · What do you think about…? · How about…?'],
      ['Opinar','I think… because… · For me, the most important is…'],
      ['Aceptar','Good idea! · I agree — and we could also…'],
      ['Discrepar educado','I see your point, but… · Maybe, but don’t you think…?'],
      ['Involucrar al otro','What’s your opinion? · Do you prefer…? · You’re the expert on…'],
      ['Concluir','So, we agree that…? · Shall we choose this one, then?']
    ]},
    {t:'info', title:'🔑 Discrepar NO es pelear (y callar tampoco es amable)', h:'“You’re wrong” suena agresivo; “I see your point, but maybe…” convierte el desacuerdo en conversación. Y silencio total por “ser amable” también resta: el examen evalúa INTERACCIÓN — pregunta, responde, contrapropón.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Tu compañero propone algo que no te convence. Frase correcta:', options:['“No.”','“You’re wrong.”','“I see your point, but maybe we could also consider…”','Silencio'], correct:2, pts:10, explain:'Discrepar con educación mostrando el punto del otro = interacción B1.'},
      {type:'fill', q:'Frase para proponer: “___ we start with the music?”', accept:['shall'], pts:10, hint:'Sh… + we…'},
      {type:'mc', q:'En la Parte 3, si tu compañero calla, tú deberías…', options:['Seguir tú solo todo el minuto','Hacerle preguntas para involucrarlo','Quejarte con el examinador','Callar también'], correct:1, pts:10, explain:'“What do you think?” — involucrar al otro ES la tarea evaluada.'}
    ]},
    {t:'activity', kind:'speaking', title:'✏️ Actividad 24 · Conversación guiada: elegir regalo', sub:'Situación: su profesor/a se jubila y el grupo le regalará algo. Opciones: un libro, una taza personalizada, una tarjeta de regalo, una foto firmada por todos. Tú quieres la foto; “tu compañero” prefiere el libro. Elige la línea correcta en cada turno.',
      items:[
        {type:'mc', q:'Abres la conversación:', options:['“I want photo. OK?”','“Shall we start? Maybe the signed photo is special because everyone writes a message.”','“The book is boring.”','“You decide.”'], correct:1, pts:15, explain:'Proponer + razón + abrir la conversación: perfecto.'},
        {type:'mc', q:'Tu compañero: “I think a book is more useful.” Tú:', options:['“I see your point, but a photo lasts forever — maybe we can combine both?”','“Book is useless.”','“OK whatever.”','“I don’t care.”'], correct:0, pts:15, explain:'Acepta el punto, mantiene tu idea y PROPOÑE combinación: negociación real.'},
        {type:'mc', q:'Tu compañero cede un poco: “Hmm, maybe.” Tú lo invitas a decidir juntos:', options:['“So, shall we choose the photo with a small book?”','“Finally you agree.”','“I told you.”','Silencio'], correct:0, pts:15, explain:'Concluir con una propuesta conjunta (shall we…) cierra la negociación como pide el examen.'},
        {type:'mc', q:'¿Cuál expresión NO ayuda en la Parte 3?', options:['“What do you think?”','“You’re the expert on books.”','“Do whatever you want.” (actitud indiferente)','“Maybe, but don’t you think…?”'], correct:2, pts:15, explain:'La indiferencia mata la interacción evaluada; todo lo demás invita a conversar.'}
      ],
      rubricTitle:'🎙️ Ahora JUEGA los dos roles en voz alta (o con un amigo) y márcate',
      checklist:[
        {label:'Usé 2+ frases para proponer (shall we / how about / maybe…)', pts:25},
        {label:'Discrepé con educación (I see your point, but…)', pts:25},
        {label:'Hice al menos 1 pregunta al “compañero”', pts:25},
        {label:'Cerré con una conclusión conjunta (So, shall we…?)', pts:25}
      ]}
  ]},

  /* -------- 4-4 -------- */
  { id:'4-4', title:'Speaking Part 4: profundizar con razones', time:'13 min', blocks:[
    {t:'p', h:'La Parte 4 continúa el tema de la Parte 3 con preguntas más generales al GRUPO: <i>“Do you prefer celebrating at home or in restaurants? Why?”</i> El examinador busca <b>opiniones con soporte</b>: opinión + porque + ejemplo. Es la versión oral del R-R-D, ahora sobre temas abstractos.'},
    {t:'code', lang:'txt', title:'plantilla de respuesta con soporte', code:`Opinión:  "Personally, I prefer celebrating at home."
Razón:    "Mainly because it's more relaxed — you can talk
           without shouting over the music."
Ejemplo:  "For example, at my last birthday we cooked
           together and it felt really special."
Extra:    "But I know people who love restaurants
           because there's no washing-up!" (matiz ✓)`},
    {t:'table', head:['Conector de razón/contra','Función'], rows:[
      ['mainly because…','tu razón principal'],
      ['For example…','el ejemplo concreto (siempre suma)'],
      ['On the other hand…','el punto de vista opuesto'],
      ['That’s why…','concluye tu argumento'],
      ['It depends…','entrada matizada (luego da las dos caras)']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'La respuesta más fuerte a “Do you prefer books or films?”:', options:['“Books.”','“Films are better, books are boring.”','“I prefer films, mainly because I’m a visual person — for example, I loved watching The Lord of the Rings after reading it.”','“Both.”'], correct:2, pts:10, explain:'Opinión + razón + ejemplo concreto: la plantilla completa.'},
      {type:'fill', q:'Conector para dar un ejemplo: “For ___…”', accept:['example','instance'], pts:10, hint:'for example / for instance'},
      {type:'mc', q:'“It depends…” funciona si…', options:['Terminas ahí','Luego das las dos caras (“…if it’s a big group, home; if it’s a date, a restaurant”)','Nunca funciona','Solo en Writing'], correct:1, pts:10, explain:'Depende + desarrollo de ambos casos = madurez argumentativa B1.'}
    ]},
    {t:'activity', kind:'speaking', title:'✏️ Actividad 25 · Opiniones con soporte', sub:'Responde en voz alta con la plantilla (opinión + razón + ejemplo). Luego marca la estructura correcta en cada pregunta.',
      items:[
        {type:'mc', q:'▶ “Do you prefer studying alone or with friends? Why?” — ¿Qué orden sigue la mejor respuesta?', options:['Ejemplo → silencio','Opinión → razón → ejemplo','Pregunta → opinión','Solo opinión'], correct:1, pts:15, audio:'Do you prefer studying alone or with friends? Why?', transcript:'Do you prefer studying alone or with friends? Why?', explain:'Siempre: posición clara, porque, y un ejemplo que lo demuestre.'},
        {type:'mc', q:'▶ “Is it better to live in a big city or a small town?” — marca la frase con MATIZ B1:', options:['“Big city good.”','“It depends: cities have more jobs, but towns are quieter — I’d choose a city while I’m young.”','“Cities are hell.”','“Small town, obviously, no discussion.”'], correct:1, pts:15, audio:'Is it better to live in a big city or a small town?', transcript:'Is it better to live in a big city or a small town?', explain:'Depende + dos caras + decisión personal: máximo nivel B1.'},
        {type:'mc', q:'▶ “What’s more important: talent or hard work?” — cierra tu respuesta con…', options:['“…that’s why I believe effort wins in the long run.”','“…bye.”','“…talent period.”','Nada'], correct:0, pts:15, audio:'What’s more important: talent or hard work?', transcript:'What’s more important: talent or hard work?', explain:'That’s why + conclusión cierra tu argumento como un ensayo hablado.'}
      ],
      rubricTitle:'🎙️ Rúbrica de tus respuestas',
      checklist:[
        {label:'Cada respuesta tuvo opinión clara (Personally, I prefer / I think…)', pts:25},
        {label:'Usé “because” o “mainly because” con una razón real', pts:25},
        {label:'Di al menos un ejemplo concreto (For example…)', pts:25},
        {label:'Incluí un matiz (On the other hand / It depends…)', pts:25}
      ]}
  ]},

  /* -------- 4-5 -------- */
  { id:'4-5', title:'Pronunciación: los sonidos que nos cuestan', time:'14 min', blocks:[
    {t:'p', h:'La pronunciación B1 no exige acento “perfecto”: exige <b>que te entiendan sin esfuerzo</b>. Para nosotros, hispanohablantes, hay 4 frentes claros. La técnica: pares mínimos (palabras que solo cambian en un sonido), escucha y repite — tienes los botones ▶ para ambos miembros de cada par.'},
    {t:'table', head:['Frente','Par mínimo','Truco físico'], rows:[
      ['/ɪ/ vs /iː/ (ship vs sheep)','ship / sheep · sit / seat · his / he’s','La /iː/ es LARGA y con “sonrisa” estirada; la /ɪ/ es corta y relajada'],
      ['ed finales (-ed regular)','worked /t/ · played /d/ · needed /ɪd/','Solo suena /ɪd/ tras T o D (want-ed, need-ed)'],
      ['s 3.ª persona','works /s/ · goes /z/ · watches /ɪz/','Tras sonidos sordos suena S; tras sonoros, Z'],
      ['TH (think / this)','think / sink · they / day · three / tree','Lengua ENTRE los dientes (suave, sin morder fuerte)']
    ]},
    {t:'info', title:'🔑 Silencios y acento de palabra', h:'El ritmo también se entiende: en “CHOColate” el acento va AL PRINCIPIO (no “chocoLATE”), y la H siempre se aspira (hello = “jello” con aire). Pronunciar claro el acento de la palabra correcta vale más que eliminar todo acento extranjero: Cambridge no penaliza el acento, penaliza la falta de claridad.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cómo suena el -ed de “worked”?', options:['/ɪd/ (wor-ked-id)','/t/ (workt)','/d/ (workd)','No suena'], correct:1, pts:10, explain:'Tras sonido sordo (k) el -ed suena /t/: “workt”.'},
      {type:'mc', q:'¿Cuál par diferencia LARGA vs corta?', options:['sheep / ship','cat / cut','red / read (presente)','big / bag'], correct:0, pts:10, explain:'/iː/ larga (sheep) vs /ɪ/ corta (ship): el par clásico del español.'},
      {type:'fill', q:'Para decir “three” sin que suene “tree”, la lengua va… (1 palabra, en español)', accept:['entre','entredientes','entrelosdientes'], pts:10, hint:'Posición de la lengua con la TH…'}
    ]},
    {t:'activity', kind:'speaking', title:'✏️ Actividad 26 · Entrenamiento de pares mínimos', sub:'Escucha cada par (▶), repítelo en voz alta y elige el que oigas en la versión grabada. Después, prueba 🎤 para comparar tu producción.',
      items:[
        {type:'mc', q:'▶ ¿Qué palabra oyes?', options:['ship','sheep'], correct:1, pts:15, audio:'Sheep. The animal is a sheep, with a long vowel: shhh-EEP.', transcript:'Sheep (long vowel) — not ship.'},
        {type:'mc', q:'▶ ¿Qué palabra oyes?', options:['sit','seat'], correct:0, pts:15, audio:'Sit. Please sit down — short vowel, sit.', transcript:'Sit (short vowel).'},
        {type:'mc', q:'▶ ¿Cómo suena el verbo?', options:['think','sink'], correct:0, pts:15, audio:'Think. I think so — tongue between the teeth: TH-ink.', transcript:'Think (TH).'},
        {type:'mc', q:'▶ ¿Qué número oyes?', options:['thirteen','thirty'], correct:0, pts:15, audio:'Thirteen. We have thirteen guests — listen to the strong TEEN at the end.', transcript:'Thirteen (strong -TEEN).', explain:'Acento final -TEEN = 13.'},
        {type:'mc', q:'▶ ¿Cómo suena el -ed?', options:['wanted (uain-i-d)','asked (as-t)'], correct:1, pts:15, audio:'Asked. He asked a question — the ED sounds like T: as-t.', transcript:'Asked — ED sounds like T.'},
        {type:'mc', q:'Escucha y repite 3 veces: “She’s been thinking about three thick sweaters.” ¿Cómo te fue?', options:['Claro y fluido','Regular, lo repito','Difícil — practico TH en Repaso del día'], correct:0, pts:15, audio:'She’s been thinking about three thick sweaters. She’s been thinking about three thick sweaters. She’s been thinking about three thick sweaters.', transcript:'She’s been thinking about three thick sweaters (×3).', explain:'“Three thick” es el gimnasio definitivo de la TH. 3 repeticiones al día y en una semana suena limpia.'}
      ]}
  ]},

  /* -------- 4-6 -------- */
  { id:'4-6', title:'Simulacro de Speaking completo', time:'20 min', blocks:[
    {t:'p', h:'El examen oral completo dura 10–12 minutos por pareja: Parte 1 entrevista (~2 min), Parte 2 fotos individuales (~1 min c/u), Parte 3 diálogo en pareja (~3 min), Parte 4 discusión (~3 min). Aquí lo simulas tú solo (o con alguien), con guion de examinador. Usa cronómetro real.'},
    {t:'steps', items:[
      '<b>Parte 1 (2 min):</b> responde 4 preguntas de entrevista con R-R-D.',
      '<b>Parte 2 (1 min):</b> describe una foto con D-O-M-I-N-O (elige cualquier foto de tu galería).',
      '<b>Parte 3 (3 min):</b> diálogo: “Elegir un lugar para un viaje de fin de cursos: playa / montaña / ciudad histórica”. Juega ambos roles.',
      '<b>Parte 4 (3 min):</b> 3 preguntas de discusión con opinión + razón + ejemplo.',
      'Autoevalúa con la rúbrica: honestidad = progreso. Repite el simulacro cada 2 semanas y compara.'
    ]},
    {t:'activity', kind:'speaking', title:'✏️ Actividad 27 · Simulacro oral + rúbrica final', sub:'Realiza las 4 partes en voz alta (cronómetro en mano) y evalúate con honestidad en la rúbrica.',
      items:[
        {sec:'📋 Parte 1 · Entrevista (escucha y responde en voz alta)'},
        {type:'mc', q:'▶ Pregunta 1: “Tell me about your family.” Tu respuesta debe…', options:['Durar 5 segundos','Tener 2–3 frases con un detalle memorable','Ser una lista de nombres','Ser en presente perfecto completo'], correct:1, pts:5, audio:'Tell me about your family.', transcript:'Tell me about your family.', explain:'Modelo: “There are four of us: my parents, my little sister and me. My sister is the funny one — she wants to be a comedian.”'},
        {type:'mc', q:'▶ Pregunta 2: “How often do you use English?” — tu mejor apertura:', options:['“Every day, especially with this course — and I talk to myself when I cook, to be honest!”','“Sometimes.”','“English is a language.”','“No.”'], correct:0, pts:5, audio:'How often do you use English?', transcript:'How often do you use English?', explain:'Frecuencia + ejemplo vivo + un toque de humor: natural y evaluada alto.'},
        {sec:'📋 Parte 2 · Tu foto (1 min) — elige una foto real de tu teléfono'},
        {type:'mc', q:'La estructura D-O-M-I-N-O pide abrir con…', options:['La opinión final','La ubicación general (In this picture…)','El detalle del fondo','Un saludo'], correct:0, pts:5, explain:'D de Dónde abre; la opinión cierra.'},
        {sec:'📋 Parte 3 · Diálogo: destino del viaje (juega ambos roles, 3 min)'},
        {type:'mc', q:'La interacción correcta incluye…', options:['Monólogo de 3 minutos','Proponer + preguntar al otro + discrepar educado + concluir','Solo responder sí/no','Hablar en español'], correct:1, pts:5, explain:'Las 4 funciones de la Parte 3 en un solo minuto de conversación.'},
        {sec:'📋 Parte 4 · Discusión (3 preguntas)'},
        {type:'mc', q:'▶ “Should students wear uniforms? Why?” — la respuesta más fuerte usa…', options:['Una sola palabra','Opinión + razón + ejemplo (y un “on the other hand…”)','Una pregunta de vuelta','Un emoji'], correct:1, pts:5, audio:'Should students wear uniforms? Why?', transcript:'Should students wear uniforms? Why?', explain:'La plantilla de la Parte 4 funciona para cualquier tema de discusión.'}
      ],
      rubricTitle:'🎙️ RÚBRICA FINAL del simulacro (sé honesto: es tu línea base)',
      checklist:[
        {label:'Hablé al menos 6 de los 9 minutos totales', pts:20},
        {label:'Usé R-R-D en la entrevista y en la discusión', pts:20},
        {label:'Mi foto siguió D-O-M-I-N-O completo', pts:20},
        {label:'En el diálogo: propuse, pregunté, discrepé y concluí', pts:20},
        {label:'Mi pronunciación fue entendible (alguien más me entendería)', pts:20}
      ]}
  ]}
]});

/* ============================ MÓDULO 5: VOCABULARIO SRS ============================ */
MODULES.push({
  id:'m5', emoji:'🃏', name:'Vocabulario y gramática', color:'#16a34a',
  desc:'Flashcards con repetición espaciada: tu gimnasio diario de palabras, verbos y gramática B1.',
  lessons:[

  /* -------- 5-1 -------- */
  { id:'5-1', title:'Tu mazo de flashcards: repetición espaciada', time:'12 min', blocks:[
    {t:'p', h:'Aprender vocabulario no es un problema de inteligencia, es un problema de <b>repaso en el momento justo</b>. Tu cerebro borra lo que no usa (la curva del olvido), pero cada repaso a tiempo aplana la curva. Eso es la <b>repetición espaciada</b> (SRS): repasar justo antes de olvidar. Es la técnica con más evidencia científica para vocabulario.'},
    {t:'code', lang:'txt', title:'el sistema de cajas (Leitner) que usa este curso', code:`Caja 1 → repasar mañana        (lo nuevo / lo fallado)
Caja 2 → repasar en 2 días
Caja 3 → repasar en 4 días
Caja 4 → repasar en 8 días
Caja 5 → repasar en 16 días    (¡ya es tuya!)

Aciertas  → la tarjeta SUBE de caja
Fallas    → vuelve a la Caja 1 (y ya está: sin culpa)

5–10 min al día > 2 horas el domingo.`},
    {t:'info', title:'🔑 Tu “Repaso del día”', h:'En el menú lateral está <b>🃏 Repaso del día (SRS)</b>: te muestra cuántas tarjetas caen para hoy de cada mazo (verbos irregulares, vocabulario B1). Tu progreso se guarda en tu cuenta y las tarjetas regresas cuando toca. La meta no es “terminar el mazo”: es que las cajas 4–5 se llenen.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Si fallas una tarjeta, ¿qué pasa en el sistema de cajas?', options:['Se borra','Vuelve a la caja 1 (repaso mañana)','Baja un nivel','Se marca en rojo para siempre'], correct:1, pts:10, explain:'Fallo → caja 1. Sin drama: el sistema te la repropondrá hasta dominarla.'},
      {type:'mc', q:'¿Qué es mejor para el vocabulario?', options:['2 horas el domingo','5–10 minutos diarios con SRS','Leer la lista una vez','Nada, con el examen basta'], correct:1, pts:10, explain:'Frecuencia breve vence a maratones: así funciona la memoria.'},
      {type:'fill', q:'Nombre en inglés de la técnica: spaced ___ (1 palabra)', accept:['repetition'], pts:10, hint:'Spaced r________.'}
    ]},
    {t:'activity', kind:'vocab', title:'✏️ Actividad 28 · Primera sesión de repaso', sub:'Responde estas tarjetas de calibración: te dicen cuánto sabes hoy (y van directo a tu progreso).',
      items:[
        {type:'mc', q:'“achieve” significa…', options:['fallar','lograr','intentar','olvidar'], correct:1, pts:12, explain:'achieve a goal = lograr una meta.'},
        {type:'mc', q:'“however” es un conector de…', options:['suma','contraste','causa','ejemplo'], correct:1, pts:12, explain:'however = sin embargo (contraste).'},
        {type:'gap', q:'Pasado de “buy”:', accept:['bought'], pts:12, hint:'B-O-U…'},
        {type:'gap', q:'Completa: “I’m looking forward to ___ you.” (ver see en -ing)', accept:['seeing'], pts:12, hint:'to + gerundio aquí.'},
        {type:'mc', q:'“depend on” significa…', options:['depender de','bajar de','decidir','confiar en cualquiera'], correct:0, pts:12, explain:'depend ON (con “on”): depender de.'},
        {type:'mc', q:'“It’s up to you” significa…', options:['Está arriba','Tú decides','Está terminado','Depende del clima'], correct:1, pts:12, explain:'it’s up to you = decisión tuya. Frase de Speaking Parte 3 😉'}
      ]}
  ]},

  /* -------- 5-2 -------- */
  { id:'5-2', title:'Vocabulario B1 por temas (12 mazos)', time:'15 min', blocks:[
    {t:'p', h:'El examen B1 vive de temas cotidianos: <b>trabajo, viajes, salud, tecnología, educación, compras, clima, comida, transporte, casa, hobbyes y relaciones</b>. Para cada tema necesitas ~30–40 palabras activas. Aquí tienes el muestreo de las más rentables (palabras que aparecen en TODOS los simulacros):'},
    {t:'table', head:['Tema','Palabras estrella B1'], rows:[
      ['💼 Trabajo','apply for, salary, boss, staff, deadline, skill, experience, hire'],
      ['✈️ Viajes','book (v.), luggage, flight, abroad, sightseeing, accommodation, delay'],
      ['🏥 Salud','hurt, ache, medicine, recover, healthy, appointment, prescription'],
      ['📱 Tecnología','download, device, screen, charge, share, online, password'],
      ['🎓 Educación','degree, subject, pass/fail, revise, knowledge, skills, course'],
      ['🛒 Compras','afford, bargain, receipt, refund, exchange, discount, fit']
    ]},
    {t:'tip', title:'💡 Aprende frases, no palabras', h:'No aprendas “book” solo: aprende “<b>book a flight</b>”, “<b>book a table</b>”. Las collocations son las unidades reales del inglés y son justo lo que mide Reading Part 5. En las flashcards, cada tarjeta trae ejemplo.'},
    {t:'quiz', questions:[
      {type:'mc', q:'“I can’t ___ a new laptop — it’s too expensive for me right now.”', options:['afford','apply','avoid','accept'], correct:0, pts:10, explain:'can’t afford = no poder pagarlo (compras).'},
      {type:'fill', q:'Verbo para reservar (vuelo/mesa) en inglés:', accept:['book','reserve'], pts:10, hint:'También es un libro…'},
      {type:'mc', q:'“My leg ___ after the marathon.” (doler)', options:['hurts','hurted','injures','paints'], correct:0, pts:10, explain:'hurt (doler) es irregular pero igual en pasado: it hurt / it hurts.'},
      {type:'mc', q:'Pedir un “refund” es pedir…', options:['un cambio de producto','tu dinero de vuelta','un descuento','un recibo'], correct:1, pts:10, explain:'refund = devolución del dinero; exchange = cambio por otro producto.'}
    ]},
    {t:'activity', kind:'vocab', title:'✏️ Actividad 29 · Vocabulario de alta frecuencia', sub:'8 tarjetas de los mazos más rentables. Si fallas alguna, ya sabes qué caja la recibe 😄.',
      items:[
        {type:'mc', q:'“We’re going ___ next summer — probably Italy.” (al extranjero)', options:['abroad','outside','away from','far'], correct:0, pts:12, explain:'go abroad = ir al extranjero.'},
        {type:'gap', q:'“I need to ___ for that job — the deadline is Friday.” (aplicar)', accept:['apply'], pts:12},
        {type:'mc', q:'“Can we ___ a table for four at eight?”', options:['reserve','book','ask','order'], correct:1, pts:12, explain:'book a table: la collocation canónica (reserve también vale, pero “book” es la más usada).'},
        {type:'mc', q:'“The flight had a two-hour ___ because of the storm.”', options:['delay','late','slow','long'], correct:0, pts:12, explain:'delay (retraso) — sustantivo; late es adjetivo.'},
        {type:'gap', q:'“Keep the ___ in case you want a refund.” (recibo)', accept:['receipt'], pts:12, hint:'Se pronuncia /ri-SIIT/.'},
        {type:'mc', q:'“I don’t ___ social media much anymore.” (usar)', options:['do','use','make','take'], correct:1, pts:12, explain:'use social media — verbos generales: use.'},
        {type:'mc', q:'“She ___ her exam with 85%.” (aprobar)', options:['passed','failed','took','made'], correct:0, pts:12, explain:'pass an exam = aprobar; fail = reprobar.'},
        {type:'mc', q:'“This jacket doesn’t ___ me — it’s too small.” (quedar)', options:['fit','match','suit','fix'], correct:0, pts:12, explain:'fit = de talla; suit = de estilo; match = combina con otra cosa.'}
      ]}
  ]},

  /* -------- 5-3 -------- */
  { id:'5-3', title:'Verbos irregulares: tu mazo más importante', time:'15 min', blocks:[
    {t:'p', h:'Los <b>verbos irregulares</b> aparecen en TODO: Writing (historias), Reading (textos narrativos), Listening (diálogos) y Speaking. No son “una lista para memorizar”: son el motor del pasado inglés. Aquí los 12 que más se usan — la tabla completa (45 verbos, con 3.ª persona, -ing y español) está en el 📘 Libro de texto, capítulo 3, y como mazo de flashcards.'},
    {t:'table', head:['Base','Pasado','Participio','3.ª persona','-ing','Español'], rows:[
      ['be','was/were','been','is','being','ser/estar'],
      ['have','had','had','has','having','tener/haber'],
      ['do','did','done','does','doing','hacer'],
      ['go','went','gone','goes','going','ir'],
      ['make','made','made','makes','making','hacer/fabricar'],
      ['say','said','said','says','saying','decir'],
      ['get','got','got(gotten)','gets','getting','obtener/ponerse'],
      ['know','knew','known','knows','knowing','saber/conocer'],
      ['take','took','taken','takes','taking','tomar/llevar'],
      ['see','saw','seen','sees','seeing','ver'],
      ['come','came','come','comes','coming','venir'],
      ['think','thought','thought','thinks','thinking','pensar']
    ]},
    {t:'warn', title:'⚠️ Los 3 pares que más se confunden', h:'1) <b>said</b> se pronuncia /sed/ (no “sa-id”). 2) <b>bought/thought</b> terminan en /t/ seco (no “bought-ed”). 3) <b>gone vs been</b>: “He has gone to Rome” (sigue allá / fue y no ha vuelto) vs “He has been to Rome” (fue y ya volvió — experiencia). El par been/gone cae SIEMPRE en algún simulacro.'},
    {t:'quiz', questions:[
      {type:'fill', q:'Pasado de “think”:', accept:['thought'], pts:10, hint:'T-H…'},
      {type:'fill', q:'Participio de “see”:', accept:['seen'], pts:10, hint:'have + …'},
      {type:'mc', q:'“He isn’t here — he ___ to the bank.”', options:['has been','has gone','has went','is going been'], correct:1, pts:10, explain:'gone = fue y sigue allá. “has been” significaría que ya volvió.'},
      {type:'mc', q:'La 3.ª persona de “do” es…', options:['dos','does','doz','does'], correct:1, pts:10, explain:'he/she/it DOES (se pronuncia /dʌz/).'}
    ]},
    {t:'activity', kind:'vocab', title:'✏️ Actividad 30 · Motor de irregulares (8 verbos)', sub:'Completa las formas. Estos verbos valen oro en Writing Part 2 (la historia).',
      items:[
        {type:'gap', q:'Pasado de “write”:', accept:['wrote'], pts:12},
        {type:'gap', q:'Participio de “write”:', accept:['written'], pts:12},
        {type:'gap', q:'Pasado de “bring”:', accept:['brought'], pts:12},
        {type:'gap', q:'Pasado de “teach”:', accept:['taught'], pts:12},
        {type:'gap', q:'Participio de “speak”:', accept:['spoken'], pts:12},
        {type:'gap', q:'Pasado de “find”:', accept:['found'], pts:12},
        {type:'mc', q:'“I’ve never ___ sushi before today.”', options:['ate','eaten','eat','eated'], correct:1, pts:12, explain:'have + participio: eaten (ate es pasado simple).'},
        {type:'mc', q:'“When she was young, she ___ to be a pilot.”', options:['wanted','wants','will want','wanting'], correct:0, pts:12, explain:'“When she was young” marca pasado simple: wanted.'}
      ]}
  ]},

  /* -------- 5-4 -------- */
  { id:'5-4', title:'Gramática B1 en una lección', time:'16 min', blocks:[
    {t:'p', h:'La gramática que separa B1 de A2 son 5 estructuras. Domínalas y Reading Part 6 + Writing se vuelven terrenos conquistados. Aquí van con su regla y su error típico.'},
    {t:'table', head:['Estructura','Cuándo','Ejemplo vs error'], rows:[
      ['<b>Present perfect</b> (have/has + pp)','Experiencias sin tiempo fijo; noticias','✓ I have visited Rome twice. ✗ I have visited Rome in 2020 (con fecha fija → pasado simple)'],
      ['<b>PP vs Past simple</b>','¿La fecha importa?','✓ I saw it yesterday. ✗ I have seen it yesterday'],
      ['<b>Comparativos/superlativos</b>','short: -er/-est · long: more/most','✓ bigger than, the most beautiful ✗ more bigger'],
      ['<b>Condicionales 1 y 2</b>','real vs hipotético','C1: If it rains, I will stay. C2: If I had money, I would travel (soy realista vs sueño)'],
      ['<b>Pasiva</b> (be + pp)','Cuando el agente no importa','✓ The film was directed in 2019 ✗ The film directed'],
      ['<b>used to / would</b>','Costumbres pasadas que ya no son','✓ I used to play outside ✗ I use to play']
    ]},
    {t:'code', lang:'txt', title:'el triángulo del present perfect', code:`SIN tiempo definido → have/has + participio
  "I have lost my keys." (¡importa el AHORA!)
CON tiempo definido → pasado simple
  "I lost my keys yesterday."
SINCE (punto) / FOR (duración)
  "I have lived here since 2019." (punto)
  "I have lived here for five years." (duración)`},
    {t:'quiz', questions:[
      {type:'fill', q:'“___ you ever tried Korean food?” (auxiliar)', accept:['have'], pts:10, hint:'Present perfect con ever…'},
      {type:'mc', q:'Elige la correcta:', options:['She is more taller than me.','She is taller than me.','She is tallest than me.','She is more tall than me.'], correct:1, pts:10, explain:'Adjetivo corto: taller than. Nunca “more taller”.'},
      {type:'mc', q:'“If I ___ rich, I would buy a farm.”', options:['am','was being','were/was','will be'], correct:2, pts:10, explain:'Conditional 2: If I were/was rich… (hipotético presente).'},
      {type:'fill', q:'Pasiva: “They built the bridge in 1990” → “The bridge ___ built in 1990.”', accept:['was'], pts:10, hint:'be en pasado + participio…'}
    ]},
    {t:'activity', kind:'vocab', title:'✏️ Actividad 31 · Los 5 movimientos de gramática B1', sub:'Una pregunta por estructura. Si fallas alguna, la lección te dice exactamente qué repasar.',
      items:[
        {type:'gap', q:'“I ___ (live) here since 2020.” — escribe el verbo completo (present perfect).', accept:['have lived',"‘ve lived"], pts:15, hint:'since 2020 → have/has + participio.'},
        {type:'gap', q:'Corrige: “I have seen him yesterday.” → “I ___ him yesterday.” (1 palabra + verbo: escribe TODO, ej. “saw”)', accept:['saw'], pts:15, hint:'Con “yesterday”…'},
        {type:'mc', q:'La más natural:', options:['This is the most cheap option.','This is the cheaperest option.','This is the cheapest option.','This is more cheap.'], correct:2, pts:15, explain:'cheap es corto: cheaper / the cheapest.'},
        {type:'mc', q:'Conditional 2 correcto:', options:['If I will win, I would travel.','If I won the lottery, I would travel the world.','If I win, I travelled.','If I would win…'], correct:1, pts:15, explain:'If + pasado simple, … would + verbo. Sin “will” en la cláusula del if.'},
        {type:'gap', q:'Pasiva: “Someone cleans this room daily” → “This room ___ cleaned daily.”', accept:['is'], pts:15, hint:'be en presente…'},
        {type:'gap', q:'“My grandpa ___ to walk to school.” (costumbre pasada: used to → escribe las 2 palabras)', accept:['used to'], pts:15, hint:'U-S-E-D + to…'}
      ]}
  ]}
]});
