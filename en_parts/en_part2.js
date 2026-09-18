
/* ============================ MÓDULO 2: WRITING (25%) ============================ */
MODULES.push({
  id:'m2', emoji:'✍️', name:'Writing', color:'#7c3aed',
  desc:'El email obligatorio, el artículo, la historia y cómo corrige un examinador.',
  lessons:[

  /* -------- 2-1 -------- */
  { id:'2-1', title:'Anatomía del email (Part 1 obligatoria)', time:'15 min', blocks:[
    {t:'p', h:'La Parte 1 del Writing es SIEMPRE un <b>email de unas 100 palabras</b>. Recibes un texto corto (un email de un amigo/una amiga o de tu profesora) con <b>4 notas</b> escritas al margen, y debes <b>responder TODAS las notas</b> en tu email. La rúbrica premia 3 cosas: <b>Contenido</b> (¿respondiste todo?), <b>Organización</b> (¿tiene estructura de email?) y <b>Lenguaje</b> (gramática y vocabulario B1).'},
    {t:'code', lang:'txt', title:'la tarea tipo', code:`--- Te llega esto: ---------------------------------
From: Alex
Hi! I'm so excited you're visiting my city next month!
Where do you want to stay?  ·  [NOTA: ¿qué tipo de lugar?]
What would you like to do? · [NOTA: 2 actividades]
Do you eat everything?     · [NOTA: -no me gusta el picante]
Let's talk soon!

--- Tu email debe: --------------------------------
1. Saludo (Hi Alex, / Dear Alex,)
2. Párrafo 1: responder nota 1 (+ motivo breve)
3. Párrafo 2: responder nota 2
4. Párrafo 3: responder nota 3 (+ pregunta de vuelta 😉)
5. Cierre (See you soon, / Best wishes,) + tu nombre`},
    {t:'table', head:['Parte del email','Frases B1 listas para usar'], rows:[
      ['Abrir','<i>Hi Alex, Thanks for your email — it was great to hear from you.</i>'],
      ['Responder nota','<i>About the accommodation, I’d love to stay in a small hotel near the centre because…</i>'],
      ['Añadir detalle','<i>Also, what really matters to me is…</i>'],
      ['Devolver pregunta','<i>By the way, do you know if…? / What about you?</i>'],
      ['Cerrar','<i>Anyway, I have to go now. See you soon! Marta</i>']
    ]},
    {t:'info', title:'🔑 La regla de las 4 notas', h:'Cada nota sin responder te cuesta puntos de <b>Contenido</b> (el bloque más pesado). Marca las 4 notas al recibir la tarea y, al terminar, táchalas una por una en tu borrador mental: 4/4 respondidas = contenido completo. Añadir UN detalle propio por nota sube tu nota de lenguaje.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuántas notas debes responder en el email?', options:['Las que quieras','Todas (normalmente 4)','Solo las fáciles','Ninguna: escribes libre'], correct:1, pts:10, explain:'Todas. Cada nota ignorada es contenido perdido y baja la calificación.'},
      {type:'mc', q:'¿Qué longitud apunta el examen?', options:['~50 palabras','~100 palabras','~250 palabras','No importa'], correct:1, pts:10, explain:'Unas 100 palabras: lo justo para desarrollar las 4 notas sin relleno.'},
      {type:'fill', q:'Palabra que usas para devolver una pregunta al remitente: “By the ___…”', accept:['way'], pts:10, hint:'By the… (a propósito).'}
    ]},
    {t:'activity', kind:'writing', title:'✏️ Actividad 10 · Reconstruye el email', sub:'Estas frases de un email B1 están desordenadas. Elige el ORDEN correcto (numeración 1–5).',
      items:[
        {sec:'Frases sueltas: <b>a)</b> “Anyway, I have to go now — see you on Friday!” · <b>b)</b> “Hi Sam, thanks for your last email!” · <b>c)</b> “About the party: yes, I can bring the music — I have great playlists.” · <b>d)</b> “One question: should I arrive at 8 or later?” · <b>e)</b> “Love, Ana”'},
        {type:'mc', q:'¿Qué frase abre el email?', options:['a','b','c','d','e'], correct:1, pts:15, explain:'El saludo + agradecimiento abre siempre: “Hi Sam, thanks for your last email!”'},
        {type:'mc', q:'¿Qué frases van en el CUERPO (desarrollo)?', options:['c y d','a y e','solo c','b y e'], correct:0, pts:15, explain:'El cuerpo responde las notas (c: aporta la música) y pregunta de vuelta (d).'},
        {type:'mc', q:'¿Qué frase cierra ANTES de la despedida?', options:['a','b','c','d'], correct:0, pts:15, explain:'“Anyway, I have to go now…” es el cierre típico antes de “Love, Ana”.'},
        {type:'mc', q:'El orden completo correcto es…', options:['b → c → d → a → e','b → a → c → d → e','c → b → d → a → e','d → c → b → a → e'], correct:0, pts:15, explain:'Saludo (b) → cuerpo (c, d) → cierre (a) → despedida (e). Estructura = puntos.'}
      ]}
  ]},

  /* -------- 2-2 -------- */
  { id:'2-2', title:'Registro informal: cómo suena a natural', time:'13 min', blocks:[
    {t:'p', h:'El email del examen va dirigido a un amigo o tu profesora: <b>registro informal</b>. Escribir “Dear Sir” a tu amigo pierde puntos. El registro se controla con 4 palancas: <b>contracciones, conectores coloquiales, vocabulario cotidiano y tono personal</b>.'},
    {t:'table', head:['❌ Demasiado formal','✅ Informal natural'], rows:[
      ['I would like to inform you…','Just wanted to tell you…'],
      ['Dear Mr. Smith,','Hi Mr. Smith, / Hi Pedro,'],
      ['I am writing to request…','I’m writing because…'],
      ['Furthermore,','Also, / Plus, / And another thing:'],
      ['Therefore,','So, / That’s why…'],
      ['I await your response.','Write back soon! / Let me know!'],
      ['It was a pleasure to receive your correspondence.','Great to hear from you!']
    ]},
    {t:'h', h:'Las 4 palancas (con ejemplos)'},
    {t:'list', items:[
      '<b>Contracciones</b>: I’m, don’t, can’t, it’s — el inglés hablado/escrito casual las usa SIEMPRE. (Ojo: “it’s” = it is, “its” = posesivo.)',
      '<b>Conectores suaves</b>: anyway, by the way, so, plus, actually — ordenan la conversación sin sonar a ensayo.',
      '<b>Vocabulario de todos los días</b>: get (get home, get tickets), stuff, hang out — vs. obtain, purchase, reside.',
      '<b>Emoción personal</b>: “I was so happy when…”, “I can’t wait!” — el examen premia que suene a persona, no a robot.'
    ]},
    {t:'warn', title:'⚠️ Informal ≠ descuidado', h:'Informal NO significa sin gramática: “hi how r u” pierde puntos por ortografía. La meta es <b>correcto y natural</b>, como un mensaje a un amigo culto. Y los emojis no existen en el examen: no los uses 😉.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuál frase es adecuada para tu email a un amigo en el examen?', options:['“I am writing to inquire about…”','“Great to hear from you!”','“Dear Sir or Madam,”','“Yours faithfully,”'], correct:1, pts:10, explain:'Las demás son fórmulas de carta formal: suenan artificiales entre amigos.'},
      {type:'fill', q:'Forma contraída de “do not”:', accept:["don't","do not"], pts:10, hint:'Con apóstrofe…'},
      {type:'mc', q:'“Furthermore” y “Therefore” en un email informal…', options:['Son perfectos','Suena a ensayo académico, no a carta a un amigo','Son errores','Son emojis'], correct:1, pts:10, explain:'Register equivocado: usa Also / So / Plus.'},
      {type:'mc', q:'¿Cuál oración usa bien “its/it’s”?', options:['Its raining a lot','The dog wagged it’s tail','It’s been a long week','The city is famous for it’s market'], correct:2, pts:10, explain:'“It’s been…” = It has been ✓. Las demás confunden posesivo (its) con contraída (it’s).'}
    ]},
    {t:'activity', kind:'writing', title:'✏️ Actividad 11 · Baja el registro (corrige 6 frases)', sub:'Estas frases son demasiado formales para un email a un amigo. Elige la versión informal correcta.',
      items:[
        {type:'mc', q:'“I would like to request additional information regarding the trip.”', options:['“Can you tell me more about the trip?”','“Information about trip, please send.”','“Regarding: trip — info.”','“I request trip data.”'], correct:0, pts:15, explain:'Pregunta directa y natural, correcta gramaticalmente.'},
        {type:'mc', q:'“I regret to inform you that I cannot attend.”', options:['“Unfortunately I can’t make it.”','“No attend.”','“Me no go.”','“I have regret about attending.”'], correct:0, pts:15, explain:'can’t make it = no poder ir: informal y perfectamente correcta.'},
        {type:'mc', q:'“Please respond at your earliest convenience.”', options:['“Response required immediately.”','“Write back when you can!”','“Responding is convenient.”','“Please convenience.”'], correct:1, pts:15, explain:'Write back = escríbeme: fórmula informal estándar.'},
        {type:'mc', q:'“I am in receipt of your message.”', options:['“Message received by me.”','“I got your message!”','“Your message is in my receipt.”','“Receipt of message done.”'], correct:1, pts:15, explain:'I got your message: simple, natural, correcta.'},
        {type:'mc', q:'“It was most enjoyable to see you.”', options:['“Enjoyment occurred seeing you.”','“Seeing you was enjoyful.”','“It was so great to see you!”','“See you was nice enjoyed.”'], correct:2, pts:15, explain:'It was so great to see you: cariño natural sin errores.'},
        {type:'mc', q:'“I anticipate your prompt reply.”', options:['“Hope to hear from you soon!”','“Anticipation of reply.”','“Prompt reply now.”','“You must reply fast.”'], correct:0, pts:15, explain:'Hope to hear from you soon: cierre informal clásico de email B1.'}
      ]}
  ]},

  /* -------- 2-3 -------- */
  { id:'2-3', title:'Escribe tu email B1 (práctica guiada)', time:'20 min', blocks:[
    {t:'p', h:'Hora de escribir el email completo. Usa la plantilla de la 2-1 y el registro de la 2-2. El ejercicio se autoevalúa con la <b>misma checklist que usa un examinador</b>: sé honesto — la autoevaluación rigurosa es un superpoder B1.'},
    {t:'code', lang:'txt', title:'TU TAREA (Part 1 estilo examen)', code:`From: your friend Chris
Hi!
I'm so happy you're coming to my town next weekend!
Where do you want to stay?                [NOTA 1: tipo de lugar y por qué]
What do you want to do on Saturday?       [NOTA 2: dos actividades]
There's a great Italian restaurant —      [NOTA 3: di que sí + qué vas a pedir]
    do you want to go?
How are you getting here?                 [NOTA 4: transporte + hora aprox.]

Write soon!
Chris`},
    {t:'steps', items:[
      'Saludo + frase de apertura (¡gracias por tu email!).',
      'Un párrafo corto por nota (4 párrafos), con UN detalle extra en cada uno.',
      'Una pregunta de vuelta en alguna parte (sube tu nota de lenguaje).',
      'Cierre informal + tu nombre. Objetivo: 90–110 palabras.'
    ]},
    {t:'activity', kind:'writing', title:'✏️ Actividad 12 · Tu email completo (autoevaluado con rúbrica)', sub:'Escribe el email (~100 palabras) en el recuadro y luego completa la checklist con HONESTIDAD. Mínimo recomendado: 80 palabras.',
      prompt:'From: Chris — “Where do you want to stay? What do you want to do on Saturday? Do you want to go to the Italian restaurant? How are you getting here?”',
      notes:['NOTA 1: tipo de lugar para quedarte + por qué','NOTA 2: dos actividades para el sábado','NOTA 3: aceptar el restaurante + qué pedirás','NOTA 4: cómo llegarás y a qué hora'],
      minWords:60,
      checklist:[
        {label:'Saludo + apertura (Hi Chris, thanks for your email…)', pts:10},
        {label:'Respondió la NOTA 1 (alojamiento + razón)', pts:15},
        {label:'Respondió la NOTA 2 (dos actividades)', pts:15},
        {label:'Respondió la NOTA 3 (acepta restaurante + pedido)', pts:15},
        {label:'Respondió la NOTA 4 (transporte + hora)', pts:15},
        {label:'Registro informal (contracciones, tono natural, sin fórmulas formales)', pts:15},
        {label:'Cierre + nombre (Anyway… / See you soon! + nombre)', pts:10},
        {label:'Ortografía y puntuación revisadas', pts:5}
      ]}
  ]},

  /* -------- 2-4 -------- */
  { id:'2-4', title:'El artículo (Part 2, opción A)', time:'14 min', blocks:[
    {t:'p', h:'En la Parte 2 eliges entre <b>artículo</b> o <b>historia</b> (~100 palabras). El artículo pide TU opinión sobre un tema (un lugar que vale la pena, la mejor manera de relajarse, tu app favorita…) y se dirige a <b>otros lectores</b> de una revista/web estudiantil.'},
    {t:'code', lang:'txt', title:'esqueleto de artículo ganador', code:`TÍTULO con gancho:  "My perfect lazy Sunday"
   ↓ (un título específico > uno genérico)
GANCHO inicial:     pregunta o frase sorprendente
   "Do you ever feel that weekends fly by?"
DESARROLLO:         2 párrafos con UNA idea c/opero
   + un ejemplo personal concreto (¡lo que sube puntos!)
OPINIÓN clara:      In my opinion… / For me, the best thing is…
CIERRE:             recomendación o pregunta al lector
   "Try it this weekend — you won't regret it!"`},
    {t:'table', head:['Herramienta','Frases modelo'], rows:[
      ['Opinión','In my opinion… · For me… · I really think…'],
      ['Ejemplo personal','Last month, for example… · Take my cousin: he…'],
      ['Dirigirse al lector','Have you ever tried…? · You should definitely…'],
      ['Comparar','The best thing about… is… · What I love most is…']
    ]},
    {t:'tip', title:'💡 El detalle concreto vale oro', h:'“Restaurants there are good” es relleno. “You can eat tacos al pastor for three dollars two steps from the beach” demuestra vocabulario específico + contenido desarrollado. Un ejemplo concreto vale más que tres frases genéricas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué abre mejor un artículo?', options:['Dear reader,','Un título con gancho + pregunta al lector','Once upon a time…','Yours truly,'], correct:1, pts:10, explain:'El artículo usa TÍTULO + gancho; “Dear reader” es carta; “Once upon a time” es historia.'},
      {type:'fill', q:'Frase de opinión de 3 palabras: “In my ___…”', accept:['opinion'], pts:10, hint:'Lo que piensas…'},
      {type:'mc', q:'¿Qué ORACIÓN demuestra más vocabulario B1?', options:['The food is very good there.','You can try homemade mole for a few pesos in the market.','I like food.','Food is food.'], correct:1, pts:10, explain:'Detalle concreto + vocabulario específico = nota alta de lenguaje.'}
    ]},
    {t:'activity', kind:'writing', title:'✏️ Actividad 13 · Tu artículo (autoevaluado)', sub:'Tema: “The best free activity in my city”. Escribe ~100 palabras y evalúa con la checklist.',
      prompt:'Write an article for a student magazine: “The best free activity in my city”. Tell readers what it is, why you love it and why they should try it.',
      notes:['Un lugar/actividad concreta','Por qué te encanta (opinión)','Un ejemplo o detalle específico','Una recomendación o pregunta al lector'],
      minWords:60,
      checklist:[
        {label:'TÍTULO con gancho', pts:15},
        {label:'Apertura que engancha (pregunta o idea sorprendente)', pts:15},
        {label:'Opinión clara (In my opinion / For me…)', pts:15},
        {label:'Un ejemplo personal CONCRETO (no genérico)', pts:20},
        {label:'Interactúa con el lector (pregunta o recomendación)', pts:15},
        {label:'~100 palabras, ortografía revisada', pts:20}
      ]}
  ]},

  /* -------- 2-5 -------- */
  { id:'2-5', title:'La historia (Part 2, opción B)', time:'14 min', blocks:[
    {t:'p', h:'La otra opción de la Parte 2: escribir una <b>historia</b> que empiece con una frase dada (ej.: “It was a day I will never forget.”). El músculo clave aquí es el <b>pasado</b>: pasado simple para la cadena de eventos, pasado continuo para el fondo, pasado perfecto para lo anterior.'},
    {t:'table', head:['Tiempo','Uso en la historia','Ejemplo'], rows:[
      ['Past simple','Los eventos en secuencia','I woke up, had breakfast and left.'],
      ['Past continuous','El “fondo” / acción en progreso','It was raining when I arrived.'],
      ['Past perfect','Algo ANTES del pasado de la historia','When I got there, the bus had already left.'],
      ['Used to / would','Costumbres del pasado (opcional)','My grandpa would tell us stories.']
    ]},
    {t:'h', h:'Conectores temporales que ordenan todo'},
    {t:'list', items:[
      '<b>Inicio:</b> One day… · Last summer… · It all started when…',
      '<b>Secuencia:</b> first, then, after that, suddenly, meanwhile',
      '<b>Clímax:</b> Suddenly… · To my surprise… · At that moment…',
      '<b>Final:</b> In the end… · Finally… · That’s why I’ll never forget that day.'
    ]},
    {t:'warn', title:'⚠️ Los verbos irregulares no negocian', h:'La historia es el terreno de los irregulares: go→went (no “goed”), see→saw, take→took, think→thought. Si algún irregular te falla, consulta el 📘 Libro de texto, capítulo 3: tienes la tabla completa con las tres formas para practicar con flashcards.'},
    {t:'quiz', questions:[
      {type:'fill', q:'Past simple de “go”:', accept:['went'], pts:10, hint:'Ir → …'},
      {type:'fill', q:'Past simple de “see”:', accept:['saw'], pts:10, hint:'Ver → …'},
      {type:'mc', q:'“I ___ dinner when the phone rang.”', options:['cooked','was cooking','had cooked','cook'], correct:1, pts:10, explain:'Acción en progreso interrumpida: past continuous (was cooking) + past simple (rang).'},
      {type:'mc', q:'“When I arrived, the film ___ already started.”', options:['has','had','was','did'], correct:1, pts:10, explain:'Past perfect: algo ocurrió ANTES de otro momento pasado.'}
    ]},
    {t:'activity', kind:'writing', title:'✏️ Actividad 14 · Tu mini-historia (autoevaluada)', sub:'Empieza con: “It was a day I will never forget.” Escribe ~100 palabras (pasado, conectores, final claro).',
      prompt:'Your story must begin with this sentence: “It was a day I will never forget.” — Tell what happened. Use past tenses and time connectors.',
      notes:['Comienza con la frase dada','Mínimo 6 verbos en pasado (mín. 2 irregulares)','Usa 3 conectores temporales (then, suddenly, in the end…)','Final que cierra la anécdota'],
      minWords:60,
      checklist:[
        {label:'Comienza con “It was a day I will never forget.”', pts:10},
        {label:'Cadena de eventos en past simple (irregulares correctos)', pts:25},
        {label:'Usa past continuous para el fondo (It was raining when…)', pts:15},
        {label:'3+ conectores temporales', pts:15},
        {label:'Final que cierra (In the end… / That’s why…)', pts:15},
        {label:'~100 palabras, ortografía revisada', pts:20}
      ]}
  ]},

  /* -------- 2-6 -------- */
  { id:'2-6', title:'Cómo corrige un examinador (errores que cuestan)', time:'13 min', blocks:[
    {t:'p', h:'El Writing no se califica “a ojo”: hay una rúbrica con 4 criterios (Contenido, Comunicación, Organización y Lenguaje). Saber <b>dónde pierdes puntos</b> convierte tu práctica en cirugía. Los errores B1 más castigados, de mayor a menor:'},
    {t:'table', head:['Error','Ejemplo','Corrección'], rows:[
      ['No responder una nota/parte de la tarea','Ignorar la pregunta del transporte','Tacha tus 4 notas al final: ¿respondí todas?'],
      ['Artículo a/an/the','I saw movie','I saw a movie / the movie we saw'],
      ['3.ª persona -s','She like coffee','She likes coffee'],
      ['Concordancia singular/plural','There is many options','There are many options'],
      ['Preposiciones fijas','depend of / good in','depend on / good at'],
      ['Tiempo mezclado','Yesterday I go to…','Yesterday I went to…'],
      ['Palabras confundidas','information(s) / advices','information / advice (incontables)']
    ]},
    {t:'info', title:'🔑 La cuenta de palabras no se castiga… mucho', h:'Escribir 20 palabras de menos no anula, pero te impide desarrollar el contenido (y eso sí baja puntos). Escribir 200 en una tarea de 100 tampoco suma: calidad > cantidad. Apunta al rango indicado (~100) y dedica los últimos 2 minutos a RELEER buscando tu “error firma” (el que más repites tú).'},
    {t:'quiz', questions:[
      {type:'fill', q:'Corrige: “She don’t like coffee.” → “She ___ like coffee.”', accept:["doesn't","does not"], pts:10, hint:'Auxiliar en 3.ª persona…'},
      {type:'fill', q:'Completa: “I’m very good ___ maths.” (preposición)', accept:['at'], pts:10, hint:'good + preposición…'},
      {type:'mc', q:'¿Cuál es INCONTABLE (no lleva -s)?', options:['Ideas','Advice','Books','Friends'], correct:1, pts:10, explain:'advice es incontable: “some advice”, nunca “advices”.'},
      {type:'mc', q:'Al releer tu writing en los últimos 2 minutos, qué buscas primero:', options:['Sinónimos bonitos','Tu error más frecuente + que cada nota esté respondida','Palabras más largas','Emojis'], correct:1, pts:10, explain:'Contenido completo + tu error firma: lo que más puntos rescata por minuto.'}
    ]},
    {t:'activity', kind:'writing', title:'✏️ Actividad 15 · Caza los 6 errores', sub:'Este email tiene 6 errores clásicos. Identifica la corrección correcta en cada caso.<br><br>“Hi Lisa,<br> yesterday I go to the market with my brother. There is many stalls with fruit. I bought two apple and a information about cooking classes. She was very happy because she loves cook.<br>Write back!<br>Sofia”',
      items:[
        {type:'mc', q:'“yesterday I go to the market” → corrección:', options:['I goed','I went','I was go','I going'], correct:1, pts:15, explain:'Ayer = pasado simple: went (irregular).'},
        {type:'mc', q:'“There is many stalls” → corrección:', options:['There was many','There are many','There is much','There be many'], correct:1, pts:15, explain:'many + plural → There ARE.'},
        {type:'mc', q:'“I bought two apple” → corrección:', options:['two apples','two of apple','apples two','a apples'], correct:0, pts:15, explain:'Contable en plural: two apples.'},
        {type:'mc', q:'“a information about cooking” → corrección:', options:['an information','some information','informations','the informations'], correct:1, pts:15, explain:'information es incontable: some information.'},
        {type:'mc', q:'“She was very happy because she loves cook.” → la mejor corrección del final:', options:['…she love cooking.','…she loves to cooking.','…she loves cooking.','…she love to cook.'], correct:2, pts:15, explain:'3.ª persona “loves” + love + -ing (o love to cook). “loves cooking” es lo natural.'},
        {type:'mc', q:'¿Qué error queda por mencionar en el email?', options:['“Write back!” es formal','El saludo “Hi Lisa” está mal','Falta coma tras “Yesterday” y el nombre final sin coma es menor — pero el error REAL es la falta de coma introductoria','No hay más errores'], correct:2, pts:15, explain:'“Yesterday I go…” necesita coma después del adverbio inicial; los cierres están bien. La puntuación fina separa Merit de Pass.'}
      ]}
  ]}
]});

/* ============================ MÓDULO 3: LISTENING (25%) ============================ */
MODULES.push({
  id:'m3', emoji:'🎧', name:'Listening', color:'#db2777',
  desc:'Escuchar con estrategia: diálogos, monólogos, números y ortografía — con audio real en tu navegador.',
  lessons:[

  /* -------- 3-1 -------- */
  { id:'3-1', title:'Cómo se escucha con estrategia', time:'13 min', blocks:[
    {t:'p', h:'En el examen, el Listening se escucha <b>DOS veces</b> y antes de cada audio tienes tiempo de leer las preguntas. Ese tiempo es tu arma principal: quien lee las preguntas ANTES, ya sabe qué buscar. La escucha pasiva (series, música) es genial para el largo plazo, pero el examen se gana con <b>escucha con propósito</b>.'},
    {t:'steps', items:[
      'ANTES del audio: lee las preguntas y subraya palabras clave (¿quién? ¿cuándo? ¿cuánto?).',
      'PRIMERA escucha: responde lo que puedas. No entres en pánico si se te escapa una.',
      'SEGUNDA escucha: confirma y completa SOLO las que faltan.',
      'Nunca dejes una en blanco: tras dos escuchas, tu mejor instinto.',
      'Cuidado con las trampas de “mención doble”: el audio menciona 2 opciones y descarta una (“the 7 o’clock… no wait, the 7:30”).'
    ]},
    {t:'info', title:'🔑 En este curso, el audio es de tu navegador', h:'Usamos la Web Speech API: cada actividad tiene botones ▶ para escuchar (voz en inglés, velocidad normal o 🐢 lenta) y la 📄 transcripción por si tu navegador no reproduce audio o quieres verificar. En el examen real la escucha es dos veces — aquí puedes repetir todas las que quieras mientras entrenas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuántas veces se escucha cada audio en el examen real?', options:['Una','Dos','Tantas como quieras','Tres'], correct:1, pts:10, explain:'Dos veces, con tiempo para leer preguntas antes de cada una.'},
      {type:'mc', q:'¿Qué haces ANTES de que empiece el audio?', options:['Relajarte','Leer las preguntas y subrayar palabras clave','Escribir la respuesta 1','Cerrar los ojos'], correct:1, pts:10, explain:'Leer preguntas = saber qué cazar mientras escuchas.'},
      {type:'mc', q:'El audio dice: “Let’s meet at 6… actually, make it 6:30, I finish late.” La hora final es…', options:['6:00','6:30','7:00','No se dice'], correct:1, pts:10, explain:'La autocorrección del hablante (“actually, make it…”) cambia la respuesta: trampa clásica.'}
    ]},
    {t:'activity', kind:'listening', title:'✏️ Actividad 16 · Calentamiento de oído', sub:'Presiona ▶ en cada mini-diálogo (o lee la transcripción), luego responde. Puedes escuchar todas las veces que quieras.',
      items:[
        {type:'mc', q:'▶ Escucha. ¿Qué tiempo hará?', options:['Lluvia','Sol','Nieve','Viento'], correct:1, pts:10, audio:'It looks like a beautiful sunny day for our picnic, don’t you think?', transcript:'It looks like a beautiful sunny day for our picnic, don’t you think?'},
        {type:'mc', q:'▶ Escucha. ¿Qué compró?', options:['Pan','Leche','Huevos','Café'], correct:0, pts:10, audio:'I stopped at the bakery and got us a fresh loaf of bread.', transcript:'I stopped at the bakery and got us a fresh loaf of bread.', explain:'bakery + loaf of bread = pan.'},
        {type:'mc', q:'▶ Escucha. ¿A qué hora queda la cita?', options:['4:15','4:45','5:15','5:45'], correct:1, pts:10, audio:'The dentist can see you at a quarter to five, is that all right?', transcript:'The dentist can see you at a quarter to five, is that all right?', explain:'a quarter to five = las cuatro y cuarenta y cinco (4:45).'},
        {type:'gap', q:'▶ Escucha y escribe el NÚMERO de teléfono que oyes (solo dígitos).', accept:['5550132','555 0132','555-0132'], pts:10, audio:'You can call me at five five five, zero one three two.', transcript:'You can call me at five five five, zero one three two.', hint:'Dígitos: 555 + 4 más.'},
        {type:'mc', q:'▶ Escucha. ¿Cómo irá al aeropuerto?', options:['Taxi','Autobús','Tren','A pie'], correct:2, audio:'Taxis are so expensive now, so I’m taking the train — it goes directly to the airport.', transcript:'Taxis are so expensive now, so I’m taking the train — it goes directly to the airport.', pts:10, explain:'Descarta el taxi (caro); elige train.'}
      ]}
  ]},

  /* -------- 3-2 -------- */
  { id:'3-2', title:'Listening Part 1: 7 mini-diálogos, imágenes', time:'14 min', blocks:[
    {t:'p', h:'La <b>Parte 1</b> son 7 conversaciones muy cortas con una pregunta cada una (en el examen real eliges entre 3 imágenes). Claves: el diálogo empieza con una situación y la RESPUESTA casi siempre aparece con un giro al final (“actually…”, “but…”, “the thing is…”).'},
    {t:'code', lang:'txt', title:'estructura de los mini-diálogos', code:`A: Are we still on for tennis on Saturday?
B: I'm afraid I have to work. What about Sunday morning?
A: Perfect.

Q: When will they play?  → Sunday morning.
La PRIMERA opción mencionada (Saturday) se DESCARTA.
El giro ("I'm afraid… what about…") decide.`},
    {t:'table', head:['Frase que anuncia el giro','Qué esperar después'], rows:[
      ['“I’m afraid…” / “Unfortunately…”','Un NO educado o cambio de plan'],
      ['“Actually…” / “Well…”','Corrección de lo que se acaba de decir'],
      ['“The thing is…” / “You see…”','La razón real (a veces escondida)'],
      ['“What about…?” / “How about…?”','La propuesta alternativa (¡fíjate!)'],
      ['“I’d rather…” / “I’d prefer…”','Preferencia — la respuesta suele ser esa']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'En los mini-diálogos, la respuesta final suele estar…', options:['En la primera frase','Tras un giro (“actually”, “the thing is…”)','En la pregunta','No está'], correct:1, pts:10, explain:'Cambridge ama la mención-doble: opción falsa primero, giro, respuesta real.'},
      {type:'fill', q:'Palabra que marca una corrección al hablar: “A___ly, make it 6:30.”', accept:['actually'], pts:10, hint:'Empieza con “act”…'},
      {type:'mc', q:'“I’d rather stay home tonight” significa que la persona…', options:['Sale de fiesta','Prefiere quedarse en casa','Llega tarde','No entendió'], correct:1, pts:10, explain:'would rather + verbo base = preferencia.'}
    ]},
    {t:'activity', kind:'listening', title:'✏️ Actividad 17 · 6 mini-diálogos con giro', sub:'Escucha (▶) o lee la transcripción, atento al GIRO final, y responde.',
      items:[
        {type:'mc', q:'¿Qué va a comer Ana?', options:['Pollo','Pescado','Pasta','Ensalada'], correct:1, pts:15, audio:'A: The chicken here is amazing. B: Actually, I think I’ll go for the grilled fish today — I had chicken yesterday.', transcript:'A: The chicken here is amazing. B: Actually, I think I’ll go for the grilled fish today — I had chicken yesterday.', explain:'“Actually” corrige: elige fish.'},
        {type:'mc', q:'¿Cuándo es el cumpleaños de la hermana?', options:['El viernes','El sábado','El domingo','La próxima semana'], correct:1, pts:15, audio:'A: Is your sister’s party on Friday? B: No, that’s when we decorate. The party is on Saturday.', transcript:'A: Is your sister’s party on Friday? B: No, that’s when we decorate. The party is on Saturday.', explain:'Viernes = decorar; la fiesta = sábado.'},
        {type:'mc', q:'¿Por qué Tom no puede ir al cine?', options:['Está enfermo','Tiene que estudiar','No hay entradas','Trabaja'], correct:1, pts:15, audio:'A: Cinema tonight? B: I wish! I’ve got a history exam tomorrow, so it’s books for me tonight.', transcript:'A: Cinema tonight? B: I wish! I’ve got a history exam tomorrow, so it’s books for me tonight.', explain:'Examen mañana → estudia esta noche.'},
        {type:'mc', q:'¿Cómo se siente Laura?', options:['Enojada','Cansada','Emocionada','Aburrida'], correct:2, pts:15, audio:'A: You look excited, Laura! B: I can’t help it — we leave for Italy in two days!', transcript:'A: You look excited, Laura! B: I can’t help it — we leave for Italy in two days!', explain:'excited + can’t help it = emoción contenida.'},
        {type:'mc', q:'¿Dónde quedaron de ver?', options:['En el café de siempre','Frente al cine','En casa de B','En la estación'], correct:1, pts:15, audio:'A: Same place as usual, the café? B: Let’s meet outside the cinema instead, so we don’t miss the previews.', transcript:'A: Same place as usual, the café? B: Let’s meet outside the cinema instead, so we don’t miss the previews.', explain:'“instead” = cambio: frente al cine.'},
        {type:'mc', q:'¿Qué problema tuvo el autobús?', options:['Se averió','Estaba lleno','Se retrasó','Cambió de ruta'], correct:2, pts:15, audio:'A: You’re late! B: I know — the bus was stuck in traffic for twenty minutes. Sorry!', transcript:'A: You’re late! B: I know — the bus was stuck in traffic for twenty minutes. Sorry!', explain:'stuck in traffic = se retrasó por el tráfico (no se averió).'}
      ]}
  ]},

  /* -------- 3-3 -------- */
  { id:'3-3', title:'Listening Parts 2–3: monólogos largos y notas', time:'15 min', blocks:[
    {t:'p', h:'En las Partes 2 y 3 escuchas <b>monólogos más largos</b> (una charla, un mensaje telefónico, una entrevista) con 6 preguntas cada uno. Aquí la técnica estrella es <b>tomar notas mientras escuchas</b>: nombres, números, lugares — en tu idioma si hace falta, son TUS notas.'},
    {t:'steps', items:[
      'Lee las 6 preguntas ANTES: te dan el esqueleto del monólogo.',
      'Primera escucha: anota datos junto a cada pregunta (no frases: palabras).',
      'Segunda escucha: verifica números y ortografía.',
      'Los distractores repiten palabras de preguntas con datos FALSOS: confía en lo que ESCUCHASTE, no en lo que suena lógico.'
    ]},
    {t:'info', title:'🔑 El orden también manda aquí', h:'Como en Reading Part 3, las preguntas siguen el orden del audio: la respuesta a la 1 suena al principio, la de la 6 al final. Si te perdiste la 3, sigue: no te quedes anclado mientras el audio avanza.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Para qué sirven las notas durante la escucha?', options:['Para decorar','Anclar datos (nombres, números) que luego responden preguntas','Para traducir todo','No sirven'], correct:1, pts:10, explain:'Palabras sueltas bien anotadas = respuestas listas para la segunda escucha.'},
      {type:'mc', q:'Te perdiste la pregunta 3. ¿Qué haces?', options:['Reiniciar el audio mentalmente','Seguir escuchando desde la 4','Rendirse en todo','Escribir lo primero que pienses en la 4'], correct:1, pts:10, explain:'El audio no espera: adelante, y en la segunda pasada recuperas la 3.'},
      {type:'mc', q:'Una opción “suena” lógica pero el audio dijo otra cosa. ¿Qué gana?', options:['Tu lógica','Lo que se escuchó realmente','La opción más larga','La primera'], correct:1, pts:10, explain:'El examen castiga responder con lógica previa en vez de evidencia escuchada.'}
    ]},
    {t:'activity', kind:'listening', title:'✏️ Actividad 18 · Monólogo: mensaje del club de cine', sub:'Escucha el mensaje (▶, dos veces recomendado), toma notas y responde las 5 preguntas.',
      items:[
        {sec:'▶ Mensaje completo (escúchalo 2 veces como en el examen)', audio:'Hi, this is Marta from the Film Club with details for Saturday. We’ll meet at the New World Cinema at half past six — not seven as we said last week, because our room only fits twenty people and we need to set up. This month’s film is a documentary about penguins, called “Frozen Journeys”. After the film, instead of our usual pizza place, we’re trying the new sushi restaurant on King Street. Tickets cost four pounds, but if you bring a friend, it’s two pounds each. Please reply to this message by Friday to confirm. See you Saturday!', transcript:'Hi, this is Marta from the Film Club with details for Saturday. We’ll meet at the New World Cinema at half past six — not seven as we said last week, because our room only fits twenty people and we need to set up. This month’s film is a documentary about penguins, called “Frozen Journeys”. After the film, instead of our usual pizza place, we’re trying the new sushi restaurant on King Street. Tickets cost four pounds, but if you bring a friend, it’s two pounds each. Please reply to this message by Friday to confirm. See you Saturday!'},
        {type:'mc', q:'¿A qué hora quedan?', options:['6:00','6:30','7:00','7:30'], correct:1, pts:15, explain:'“half past six — not seven as we said last week”: 6:30, con corrección incluida.'},
        {type:'gap', q:'¿Cuántas personas caben en la sala? (número)', accept:['20','twenty'], pts:15, hint:'El límite de la sala…'},
        {type:'mc', q:'¿Qué verán?', options:['Una película de terror','Un documental de pingüinos','Una comedia','Un cortometraje'], correct:1, pts:15, explain:'“a documentary about penguins”.', audio:'This month’s film is a documentary about penguins, called Frozen Journeys.'},
        {type:'mc', q:'¿Dónde comerán después?', options:['Pizzería de siempre','Restaurante de sushi en King Street','En el cine','En casa de Marta'], correct:1, pts:15, explain:'“instead of our usual pizza place… the new sushi restaurant on King Street”.'},
        {type:'gap', q:'Si vas CON un amigo, ¿cuánto paga cada uno? (en libras, solo el número)', accept:['2','two'], pts:15, hint:'Descuento por traer amigo…'}
      ]}
  ]},

  /* -------- 3-4 -------- */
  { id:'3-4', title:'Listening Part 4: completar huecos (ortografía!)', time:'14 min', blocks:[
    {t:'p', h:'La última parte del Listening: un monólogo y <b>6 huecos para completar</b> con 1–3 palabras (un nombre, una fecha, un precio…). Aquí la respuesta casi siempre SUENA claramente — el reto es <b>escribirla bien</b>: ortografía exacta y sin inventar palabras de más.'},
    {t:'h', h:'Reglas de oro del gap-fill'},
    {t:'list', items:[
      'La respuesta usa las MISMAS palabras que oyes (sin parafrasear): el examen busca datos, no redacción.',
      'Respeta el límite: si pide ONE WORD AND/OR A NUMBER, no escribas una frase.',
      'Nombres propios: se deletrean en el audio (“M-A-R-C-O”) — anota letra por letra.',
      'Números: cuidado con thirteen/30 vs thirty/13 (el acento cae distinto: thirTEEN vs THIRty).',
      'Relee al final: ¿tu respuesta tiene sentido gramatical en el hueco?'
    ]},
    {t:'table', head:['Se oye','Significa','Trampa típica'], rows:[
      ['thirTEEN / THIRty','13 / 30','El acento: -TEEN fuerte = 13'],
      ['double 7','77','“double” repite el dígito'],
      ['£4.50','“four pounds fifty”','No confundir con £450'],
      ['the 15th of May / May the fifteenth','15 de mayo','Escribir 5 de mayo'],
      ['R-E-C-E-I-P-T','receipt','Deletreo letra por letra']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'El audio deletrea “B-R-O-W-N”. El apellido es…', options:['Brown','Brow','Browne','Brawn'], correct:0, pts:10, explain:'Deletreo exacto: Brown (sin e final).'},
      {type:'mc', q:'Oyes “thirTEEN euros”. Son…', options:['30','13','3','33'], correct:1, pts:10, explain:'Acento en -TEEN = 13. THIRty lleva el acento al inicio.'},
      {type:'fill', q:'Oyes: “the appointment is on the twenty-second of June”. Escribe la fecha (número + mes en inglés).', accept:['22 june','june 22','22nd june','june 22nd','the 22nd of june'], pts:10, hint:'Veintidós de junio…'}
    ]},
    {t:'activity', kind:'listening', title:'✏️ Actividad 19 · Completa los huecos del anuncio', sub:'Escucha el anuncio del centro deportivo y completa los 5 huecos (1–2 palabras o números).',
      items:[
        {sec:'▶ Anuncio completo', audio:'Good morning, and welcome to Riverside Sports Centre. A quick update before you start. The swimming pool closes at nine pm on weekdays, but at six pm at weekends. From next month, yoga classes will move to Tuesdays, and they start at seven thirty in the morning. For membership renewals, the fee is now forty-five pounds a year — students pay twenty-five. Finally, the car park is free for the first two hours only. Enjoy your workout!', transcript:'Good morning, and welcome to Riverside Sports Centre. A quick update before you start. The swimming pool closes at nine pm on weekdays, but at six pm at weekends. From next month, yoga classes will move to Tuesdays, and they start at seven thirty in the morning. For membership renewals, the fee is now forty-five pounds a year — students pay twenty-five. Finally, the car park is free for the first two hours only. Enjoy your workout!'},
        {type:'gap', q:'La alberca cierra a las ___ pm entre semana.', accept:['9','nine'], pts:15},
        {type:'gap', q:'Los fines de semana cierra a las ___ pm.', accept:['6','six'], pts:15},
        {type:'gap', q:'Yoga se moverá a los ___ (día en inglés).', accept:['tuesdays','tuesday'], pts:15},
        {type:'gap', q:'La membresía anual cuesta ___ libras (número).', accept:['45','forty-five','forty five'], pts:15},
        {type:'gap', q:'El estacionamiento es gratis las primeras ___ horas.', accept:['2','two'], pts:15}
      ]}
  ]},

  /* -------- 3-5 -------- */
  { id:'3-5', title:'Números, fechas, precios y deletreo', time:'14 min', blocks:[
    {t:'p', h:'Hay datos que aparecen en TODOS los Listenings: números de teléfono, precios, fechas, horas y nombres deletreados. Es vocabulario mecánico: si lo dominas, ganas puntos garantizados. Practícalo hoy con oído.'},
    {t:'h', h:'Las reglas que debes automatizar'},
    {t:'list', items:[
      '<b>0</b> en teléfonos se dice “oh” o “zero”; 555-0132 → “double five, oh one, three two”.',
      '<b>Horas</b>: 4:15 → “a quarter past four” · 4:45 → “a quarter to five” · 4:30 → “half past four”.',
      '<b>Fechas</b>: se dice con ordinal: “May the fifth” (5 de mayo) · “the first of March”.',
      '<b>Precios</b>: £4.50 → “four pounds fifty” · $0.99 → “ninety-nine cents”.',
      '<b>Números confundibles</b>: 13/30, 14/40, 15/50, 16/60 — el acento decide: -TEEN fuerte = teen.'
    ]},
    {t:'tip', title:'💡 Entrena el oído con esto mismo', h:'En “Repaso del día” tienes el mazo de números y horas: tarjetas con audio para automatizar 5 minutos al día. Es de los retornos más altos por minuto invertido del curso.'},
    {t:'quiz', questions:[
      {type:'mc', q:'“It’s a quarter past nine.” Hora:', options:['8:45','9:15','9:45','9:00'], correct:1, pts:10, explain:'past = después: 9:15. (a quarter to nine sería 8:45.)'},
      {type:'mc', q:'Oyes “thirty pounds”. Son…', options:['13','30','3','33'], correct:1, pts:10, explain:'THIRty (acento inicial) = 30.'},
      {type:'fill', q:'Escribe la hora: “The class is at half past two.” (formato: número + pm si es de la tarde; ej. 2:30 pm)', accept:['2:30','2:30 pm','2:30pm','14:30','half past two'], pts:10},
      {type:'fill', q:'“Call me at oh seven double two, three one five.” El teléfono: (solo dígitos, sin espacios)', accept:['0772315','0772315'], pts:10, hint:'oh = 0; double two = 22.'}
    ]},
    {t:'activity', kind:'listening', title:'✏️ Actividad 20 · Dictado de datos (8 ítems)', sub:'Escucha cada dato y escríbelo exacto. Aquí se gana el pan del Listening Part 4.',
      items:[
        {type:'gap', q:'▶ Precio: “That will be seven pounds twenty.” (£ ? , formato 0.00)', accept:['7.20','7,20','seven pounds twenty'], pts:12, audio:'That will be seven pounds twenty, please.', transcript:'That will be seven pounds twenty, please.'},
        {type:'gap', q:'▶ Fecha: “Your appointment is on the third of December.” (número + mes en inglés)', accept:['3 december','december 3','3rd december','december 3rd','the 3rd of december'], pts:12, audio:'Your appointment is on the third of December.', transcript:'Your appointment is on the third of December.'},
        {type:'gap', q:'▶ Hora: “The ferry leaves at a quarter to ten.” (formato 0:00)', accept:['9:45','09:45'], pts:12, audio:'The ferry leaves at a quarter to ten.', transcript:'The ferry leaves at a quarter to ten.'},
        {type:'gap', q:'▶ Apellido deletreado: “It’s G-R-E-E-N, like the colour.” (en inglés)', accept:['green'], pts:12, audio:'My surname is spelled G R E E N, like the colour.', transcript:'My surname is spelled G R E E N, like the colour.'},
        {type:'gap', q:'▶ Año: “The school opened in nineteen ninety-eight.” (número)', accept:['1998'], pts:12, audio:'The school opened in nineteen ninety-eight.', transcript:'The school opened in nineteen ninety-eight.'},
        {type:'gap', q:'▶ Teléfono: “It’s oh two oh, seven nine four six, double one.” (solo dígitos)', accept:['020794611','020794611'], pts:12, audio:'You can reach us at oh two oh, seven nine four six, double one.', transcript:'You can reach us at oh two oh, seven nine four six, double one.'},
        {type:'mc', q:'▶ ¿Cuántas personas van a la cena?', options:['8','9','18','80'], correct:2, pts:14, audio:'We’re eighteen for dinner tonight — eight adults and ten kids.', transcript:'We’re eighteen for dinner tonight — eight adults and ten kids.', explain:'“eighteen” con acento -TEEN; el audio incluso lo desglosa (8+10).'},
        {type:'mc', q:'▶ ¿A qué puerta (gate) abordar?', options:['B4','B14','B40','E4'], correct:1, pts:14, audio:'Passengers for Madrid, please go to gate B fourteen — not B four.', transcript:'Passengers for Madrid, please go to gate B fourteen — not B four.', explain:'Corrección explícita: B14.'}
      ]}
  ]},

  /* -------- 3-6 -------- */
  { id:'3-6', title:'Simulacro de Listening (cronometrado)', time:'22 min', blocks:[
    {t:'p', h:'Juntamos todo: un mini-simulacro con las 4 variantes del Listening real. Reglas: escucha cada audio <b>máximo 2 veces</b>, responde en orden y no vuelvas atrás entre secciones. (En el examen real son 25 preguntas y ~30 minutos; este simulacro condensado entrena el mismo músculo.)'},
    {t:'activity', kind:'listening', title:'✏️ Actividad 21 · Mini-mock de Listening (16 puntos + 4 de actitud)', sub:'4 secciones: Parte 1 (2 diálogos), Parte 2 (monólogo+3 preguntas), Parte 4 (3 huecos). Crono mental: 15 min.',
      items:[
        {sec:'🎧 Parte 1 · Diálogos cortos'},
        {type:'mc', q:'¿Qué regalará a su mamá?', options:['Una bufanda','Un libro','Flores','Un pastel'], correct:2, pts:10, audio:'A: What are you getting your mum for her birthday? B: I thought about a scarf, but in the end I chose flowers — her favourite.', transcript:'A: What are you getting your mum for her birthday? B: I thought about a scarf, but in the end I chose flowers — her favourite.', explain:'“in the end I chose” = decisión final: flores.'},
        {type:'mc', q:'¿Cómo irá al trabajo hoy?', options:['Bici','Auto','Autobús','Metro'], correct:0, pts:10, audio:'A: Bus strike again tomorrow! B: No problem for me — I’ll dust off my bike.', transcript:'A: Bus strike again tomorrow! B: No problem for me — I’ll dust off my bike.', explain:'“dust off my bike” = sacará la bici.'},
        {sec:'🎧 Parte 2 · Monólogo (escucha 2 veces)'},
        {type:'mc', q:'¿Qué celebra la biblioteca?', options:['Su 10º aniversario','Un festival de invierno','La semana de lectura infantil','Un concurso de escritura'], correct:0, pts:10, audio:'Hello everyone. I’m here to tell you that Hill Street Library is turning ten years old this Saturday, and we’re throwing a party.', transcript:'Hello everyone. I’m here to tell you that Hill Street Library is turning ten years old this Saturday, and we’re throwing a party.'},
        {type:'gap', q:'¿A qué hora empieza la fiesta? (formato 0:00)', accept:['11:00','11'], pts:10, audio:'The celebration starts at eleven in the morning with storytelling for kids.', transcript:'The celebration starts at eleven in the morning with storytelling for kids.'},
        {type:'mc', q:'¿Qué habrá para los adultos?', options:['Cuentacuentos','Un taller de poesía y café gratis','Cine','Nada'], correct:1, pts:10, audio:'Adults aren’t forgotten: at noon there’s a poetry workshop, and yes — free coffee all morning.', transcript:'Adults aren’t forgotten: at noon there’s a poetry workshop, and yes — free coffee all morning.'},
        {sec:'🎧 Parte 4 · Completa los huecos'},
        {type:'gap', q:'La fiesta es el ___ (día en inglés).', accept:['saturday'], pts:10, audio:'…we’re throwing a party this Saturday…', transcript:'…this Saturday…'},
        {type:'gap', q:'El taller de poesía es al ___ (hora en palabras: “mediodía” en inglés).', accept:['noon','midday'], pts:10, audio:'…at noon there’s a poetry workshop…', transcript:'…at noon there’s a poetry workshop…'},
        {type:'gap', q:'El café es ___ (gratis/libre en inglés).', accept:['free'], pts:10, audio:'…free coffee all morning.', transcript:'…free coffee all morning.'},
        {type:'mc', q:'Autoevalúa tu hábito: ¿leíste las preguntas ANTES de escuchar en cada sección?', options:['Sí, todas','Algunas','No (¡empieza a hacerlo!)'], correct:0, pts:10, explain:'Leer antes = mitad de la técnica del Listening. El otro 50% es constancia con audio diario.'}
      ]}
  ]}
]});
