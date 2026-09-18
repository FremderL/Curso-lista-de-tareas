# 🇬🇧 Plan de lecciones · Curso de inglés (meta: Cambridge B1 Preliminary)

> Plan de diseño para el tercer curso del campus (`ingles.html`). Documento vivo: aquí se define
> la estructura pedagógica antes de programar. Formato del examen según la documentación oficial
> de Cambridge Assessment English para **B1 Preliminary** (también válido para B1 Preliminary for Schools).

---

## 1. El examen de referencia: B1 Preliminary

Nivel CEFR: **B1** (umbral intermedio). Cuatro *papers* — cada uno vale **25%** de la calificación final.
Certificado con tres grados: *Pass* (140–159), *Pass with Merit* (160–169), *Pass with Distinction* (170+).

| Paper | Partes | Preguntas | Duración | Peso |
|---|---|---|---|---|
| **Reading** | 6 | 32 | 45 min | 25% |
| **Writing** | 2 | 2 | 45 min | 25% |
| **Listening** | 4 | 25 | ~30 min (incl. 6 min de transferencia de respuestas) | 25% |
| **Speaking** | 4 | — | 10–12 min por pareja (2 examinadores) | 25% |

### Desglose del Reading (6 partes / 32 preguntas)
1. **Part 1** — 5 anuncios, señales, mensajes cortos: opción múltiple (3 opciones).
2. **Part 2** — 5 descripciones de personas ↔ 8 textos cortos para emparejar.
3. **Part 3** — texto largo con 5 preguntas de opción múltiple.
4. **Part 4** — *gapped text*: 5 huecos con frases sueltas (una sobra).
5. **Part 5** — texto con 6 huecos de vocabulario (opción múltiple).
6. **Part 6** — texto con 6 huecos de gramática: escribir UNA palabra.

### Desglose del Writing (2 partes)
- **Part 1** — *email* de ~100 palabras: leer unas notas y responderlas. Obligatoria.
- **Part 2** — elegir UNA: artículo o historia, ~100 palabras.

### Desglose del Listening (4 partes / 25 preguntas)
1. 7 mini-diálogos cortos (imágenes/opción múltiple).
2. Monólogo/entrevista con 6 preguntas de opción múltiple.
3. Monólogo con 6 preguntas (opción múltiple).
4. Monólogo o entrevista con 6 huecos para completar (1–3 palabras).

### Desglose del Speaking (4 partes)
1. Entrevista personal con el examinador (~2–3 min).
2. Describir y comparar fotos en parejas (~2–3 min).
3. Conversación en pareja a partir de una situación con apoyos visuales.
4. Discusión general relacionada con el tema de la Parte 3.

---

## 2. Enfoque del curso

- **Un curso = un simulador del examen + gimnasio diario.** Cada módulo corresponde a un paper,
  con una capa transversal de vocabulario/gramática (SRS) y otra de herramientas web.
- **Práctica diaria corta**: flashcards con repetición espaciada (5–10 min/día) + una lección.
- **Todo calificado automáticamente** donde es posible (opción múltiple, huecos, emparejar);
  escritura y speaking con rúbrica de autoevaluación guiada + checklists.
- **Audio generado en el navegador** con la **Web Speech API** (`speechSynthesis`) para las
  lecciones de listening: velocidad ajustable (0.75×–1×), acentos (en-GB por defecto), y
  reintentos ilimitados. En el speaking, `SpeechRecognition` (donde esté disponible) para
  comparar lo dicho con la frase objetivo.
- **Progreso persistente** con la misma cuenta compartida del campus (`codecamp-db-v2`,
  nuevo campo `dataEn` por usuario).

---

## 3. Mapa del curso (7 módulos · 34 lecciones · 34 ejercicios)

### Módulo 0 · Conoce tu examen (2 lecciones) 🧭
| # | Lección | Ejercicio (calificado) |
|---|---|---|
| 0-1 | ¿Qué es el B1 Preliminary? Los 4 papers, calificación CEFR, cómo se puntúa | Quiz: estructura del examen |
| 0-2 | Test diagnóstico de 24 preguntas (6 por paper, estilo real) | Diagnóstico con plan personalizado de refuerzo |

### Módulo 1 · Reading (7 lecciones) 📖
| # | Lección | Ejercicio |
|---|---|---|
| 1-1 | Estrategia general: administración del tiempo (45 min), lectura activa, *skimming* vs *scanning* | Quiz de estrategia |
| 1-2 | Part 1: señales, anuncios y mensajes — léxico de la vida diaria | 8 mini-textos estilo examen |
| 1-3 | Part 2: emparejar personas con textos — leer por ideas clave | 1 ejercicio de emparejar completo |
| 1-4 | Part 3: lectura larga — paráfrasis y distractores típicos | Texto + 5 preguntas |
| 1-5 | Part 4: frases sueltas — conectores y cohesión | Gapped text completo |
| 1-6 | Part 5: vocabulario en contexto — collocations frecuentes B1 | Cloze de opción múltiple |
| 1-7 | Part 6: gramática en huecos — qué categorías piden (artículos, preposiciones, auxiliares) | Cloze de una palabra |

### Módulo 2 · Writing (6 lecciones) ✍️
| # | Lección | Ejercicio |
|---|---|---|
| 2-1 | Anatomía del email (Part 1): saludo, párrafos, responder TODAS las notas, cierre | Reordenar un email modelo |
| 2-2 | Registro informal: contracciones, frases hechas, tono | Corregir 6 frases demasiado formales |
| 2-3 | Escribir el email: plantilla + práctica con notas reales de examen | Editor con checklist autoevaluable (rúbrica 10 pts) |
| 2-4 | El artículo: título gancho, opinión + ejemplos, ~100 palabras | Editor con checklist |
| 2-5 | La historia: narración en pasado, conectores temporales | Editor con checklist |
| 2-6 | Errores comunes B1 en writing y cómo la corrige un examinador | Quiz: identificar el error |

### Módulo 3 · Listening con Web Speech API (6 lecciones) 🎧
| # | Lección | Ejercicio |
|---|---|---|
| 3-1 | Cómo escuchar: predicción, palabras clave, no entrar en pánico | Quiz de estrategia |
| 3-2 | Part 1: diálogos cortos con audio sintetizado (velocidad ajustable) | 7 audios + 7 preguntas |
| 3-3 | Part 2–3: monólogos largos — tomar notas mientras escuchas | 1 audio largo + 6 preguntas |
| 3-4 | Part 4: completar huecos — ortografía al escribir lo escuchado | 6 huecos con audio |
| 3-5 | Números, fechas, precios y deletreo (los clásicos del Listening) | Dictado de números/fechas |
| 3-6 | Simulacro Listening completo (25 preguntas, cronómetro real, transferencia) | Mini-mock calificado |

### Módulo 4 · Speaking (6 lecciones) 🗣️
| # | Lección | Ejercicio |
|---|---|---|
| 4-1 | Part 1: entrevista personal — preguntas tipo y respuestas con detalle | Práctica con reconocimiento de voz (donde haya soporte) + checklist |
| 4-2 | Part 2: la foto — técnica DOMINO-C (Dónde, Occasion, Mood, Ideas, Nice detail, Conclusión) | Describir 3 fotos con cronómetro 1 min + rúbrica |
| 4-3 | Part 3: proponer, opinar, estar en desacuerdo (lenguaje para negociar en pareja) | Diálogo guiado con opciones |
| 4-4 | Part 4: profundizar — dar razones y ejemplos | Preguntas de discusión + checklist |
| 4-5 | Pronunciación: sonidos difíciles para hispanohablantes (/ɪ/ vs /iː/, /b/ vs /v/, *th*) | Pares mínimos con reconocimiento de voz |
| 4-6 | Simulacro speaking completo con guion de examinador (auto- o entre-parejas) | Rúbrica guiada 25 pts |

### Módulo 5 · Vocabulario y gramática con SRS (4 lecciones + app de flashcards) 🃏
| # | Lección | Ejercicio |
|---|---|---|
| 5-1 | Tu mazo de flashcards: cómo funciona la repetición espaciada (Leitner/SM-2 simplificado) | Crear tu primera sesión de repaso |
| 5-2 | Vocabulario B1 por temas (12 mazos: trabajo, viajes, salud, tecnología…) | Repaso SRS con contador de dominio |
| 5-3 | Verbos regulares e irregulares (pasado y participio) — el mazo más importante | Repaso SRS de verbos con 3 formas |
| 5-4 | Gramática B1 en una lección: presente perfecto vs pasado simple, comparativos, condicionales 1–2, pasiva básica | Quiz de 12 preguntas |

### Módulo 6 · Examen preliminar B1 (2 lecciones + mock) 🏆
| # | Lección | Ejercicio |
|---|---|---|
| 6-1 | Cómo se califica cada paper y estrategia de examen (qué hacer si te atascas) | Quiz de estrategia |
| 6-2 | **Examen preliminar B1**: Reading (32) + Listening (25, con audio) + Writing guiada + Speaking con rúbrica — calificación estimada en escala Cambridge | Mock completo calificado |

### Módulo 7 · Tu plan de estudio (1 lección) 📅
| # | Lección | Ejercicio |
|---|---|---|
| 7-1 | Plan de 12 semanas hacia el examen real (dónde inscribirse, costos, qué llevar) | Generador de plan personalizado con fechas |

---

## 4. Tecnología del curso (para `ingles.html`)

- **Misma arquitectura del campus**: un `html` autocontenido, login compartido (`codecamp-db-v2`),
  nuevo campo `dataEn` por usuario, Modo de recuperación, boleta y certificado.
- **Flashcards SRS**: algoritmo de cajas (Leitner): 5 cajas; acierto → sube, fallo → baja a la 1.
  Intervalos: 1, 2, 4, 8, 16 días (revisado al abrir el curso). Todo en `localStorage`.
- **Audio**: `speechSynthesis` con voz `en-GB`, velocidad configurable por lección
  (listening Parte 1 a 0.85×, simulacro a 1×). Botones: ▶ escuchar · 🔁 repetir · 🐢 lento.
- **Reconocimiento de voz** (opcional, si el navegador lo soporta): comparación por similitud
  de palabras para dar feedback de pronunciación; siempre con fallback a autoevaluación.
- **Cronómetros reales** por paper (45/45/30 min) reutilizando el patrón del Juego de Memoria.
- **Escalado de nota**: conversión de aciertos a escala Cambridge (140–190) igual que el examen real.

## 5. Bibliografía real (verificada)

- Cambridge Assessment English — *B1 Preliminary Handbook for Teachers* (gratis, cambridgeenglish.org) y exámenes de muestra oficiales.
- Capel, A. & Sharp, W. — *Objective Preliminary Student's Book*, Cambridge University Press.
- Heyderman, E. et al. — *Complete Preliminary*, Cambridge University Press.
- Murphy, R. — *English Grammar in Use*, 5.ª ed., Cambridge University Press (2019).
- Redman, S. — *English Vocabulary in Use: Pre-intermediate & Intermediate*, Cambridge University Press.
- Latham-Koenig, C. & Oxenden, C. — *English File Pre-intermediate*, Oxford University Press.

## 6. Criterios de éxito del curso

- [ ] 34 lecciones con su ejercicio calificado (mismo estándar que el curso de JS).
- [ ] Mock de Reading con las 6 partes reales y 32 preguntas.
- [ ] Listening reproducible con velocidad ajustable y 25 preguntas en el simulacro.
- [ ] Speaking con rúbricas de autoevaluación fieles a las escalas analíticas de Cambridge.
- [ ] Flashcards SRS funcionando con persistencia por cuenta.
- [ ] Boleta final con calificación estimada en escala Cambridge (140–190).
