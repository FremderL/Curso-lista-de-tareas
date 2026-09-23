const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const FILE = process.argv[2], LESSON = process.argv[3], KEY = process.argv[4];
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/could not parse css|not implemented/i.test(String(e))) errors.push('jsdomError: ' + e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ').slice(0, 160)));

const dom = new JSDOM(fs.readFileSync(FILE, 'utf8'), { runScripts: 'dangerously', url: 'http://localhost:3000/' + FILE, pretendToBeVisual: true, virtualConsole: vc });
const { window } = dom, { document } = window;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const click = el => { if (!el) { console.log('  ✗ CLICK NULO'); process.exit(1); } el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })); };
const nav = h => { window.location.hash = h; window.dispatchEvent(new window.HashChangeEvent('hashchange')); };

let ok = 0, fail = 0;
const T = (name, cond) => { if (cond) { ok++; } else { fail++; console.log('  ✗', name); } };

(async () => {
  await sleep(1400);
  window.eval('doGuest()'); await sleep(300);

  // 1. abrir la lección con editor
  nav('#/leccion/' + LESSON); await sleep(350);
  let w = document.querySelector('.edwrap');
  T('editor presente en ' + LESSON, !!w);
  T('data-edkey = ' + KEY, w && w.getAttribute('data-edkey') === KEY);
  const original = w.querySelector('textarea').value;
  T('textarea con código original', original.length > 20);

  // 2. escribir código nuevo (dispara input) → debounce 400 ms
  const ta = w.querySelector('textarea');
  ta.value = '<h1>MI CODIGO PERSISTIDO</h1>';
  ta.dispatchEvent(new window.Event('input', { bubbles: true }));
  await sleep(600);
  let st = JSON.parse(window.localStorage.getItem('codecamp-db-v2') || 'null');
  const dk = FILE === 'index.html' ? 'dataEn' : 'dataJs';
  const usr = st && st.users && st.users[st.session];
  T('edCode persistido en ' + dk, usr && usr[dk] && usr[dk].edCode && usr[dk].edCode[KEY] === '<h1>MI CODIGO PERSISTIDO</h1>');

  // 3. navegar fuera y volver → restaurado + preview auto-cargado
  nav('#/'); await sleep(300);
  nav('#/leccion/' + LESSON); await sleep(350);
  w = document.querySelector('.edwrap');
  T('código restaurado tras volver', w.querySelector('textarea').value === '<h1>MI CODIGO PERSISTIDO</h1>');
  T('preview auto-cargado con el código', w.querySelector('.edprev').srcdoc.includes('MI CODIGO PERSISTIDO'));

  // 4. botón Ejecutar guarda al instante
  w.querySelector('textarea').value = '<p>SEGUNDA VERSION</p>';
  click(w.querySelector('[data-action="run"]')); await sleep(150);
  st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
  T('run guarda al instante', st.users[st.session][dk].edCode[KEY] === '<p>SEGUNDA VERSION</p>');
  T('preview actualizado por run', w.querySelector('.edprev').srcdoc.includes('SEGUNDA VERSION'));

  // 5. Restablecer → código original + key borrada
  click(w.querySelector('[data-action="reset"]')); await sleep(200);
  T('reset devuelve el código original', w.querySelector('textarea').value === original);
  st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
  T('reset borra la clave guardada', st.users[st.session][dk].edCode && !st.users[st.session][dk].edCode[KEY]);

  // 6. sin errores de consola
  T('0 errores jsdom', errors.length === 0);
  if (errors.length) console.log(errors.slice(0, 5).join('\n'));
  console.log(FILE + ' → ' + ok + ' OK · ' + fail + ' FAIL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('EXCEPTION', e.message); process.exit(1); });
