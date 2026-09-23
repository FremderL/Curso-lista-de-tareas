const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const FILE = process.argv[2], DECK = process.argv[3], TOTAL = parseInt(process.argv[4], 10);
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/could not parse css|not implemented/i.test(String(e))) errors.push('jsdomError: ' + e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ').slice(0, 160)));

const dom = new JSDOM(fs.readFileSync(FILE, 'utf8'), { runScripts: 'dangerously', url: 'http://localhost:3000/' + FILE, pretendToBeVisual: true, virtualConsole: vc });
const { window } = dom, { document } = window;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const click = el => { if (!el) { console.log('  ✗ CLICK NULO — stack:'); console.log(new Error().stack.split('\n')[2]); process.exit(1); } el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })); };

let ok = 0, fail = 0;
const T = (name, cond) => { if (cond) { ok++; } else { fail++; console.log('  ✗', name); } };

(async () => {
  await sleep(1400);
  // login invitado (vía doGuest: el tab del modal re-renderiza la capa)
  window.eval('doGuest()'); await sleep(300);

  // 1. entrada en sidebar con badge = TOTAL
  const sb = document.getElementById('sidebar');
  const srsBtn = sb.querySelector('[data-um-nav="srs"]');
  T('sidebar 🃏 presente', !!srsBtn);
  T('badge = ' + TOTAL, srsBtn && srsBtn.textContent.includes(String(TOTAL)));

  // 2. navegar vía el botón
  click(srsBtn); await sleep(300);
  T('hash #/repaso', window.location.hash === '#/repaso');
  const c = document.getElementById('content');
  T('título Repaso del día', c.textContent.includes('Repaso del día'));
  T('deck visible', c.querySelector('[data-srsbox="' + DECK + '"]') !== null);
  T('chip Nuevas: ' + TOTAL, c.textContent.includes('Nuevas: ' + TOTAL));
  T('scroll arriba', window.scrollY === 0);

  // 3. iniciar sesión de repaso
  click(c.querySelector('[data-srs="start"]')); await sleep(200);
  let zone = c.querySelector('.srs-zone');
  T('tarjeta 1 visible', zone.querySelector('.srs-card .front') !== null);
  T('prog 1 de 10', zone.textContent.includes('Tarjeta 1 de 10'));
  T('sin botón escuchar', zone.querySelector('[data-say]') === null);

  // 4. revelar + good
  click(zone.querySelector('[data-srs="reveal"]')); await sleep(150);
  T('back mostrado', zone.querySelector('.srs-card .back') !== null);
  T('botones good/again', !!zone.querySelector('[data-srs="good"]') && !!zone.querySelector('[data-srs="again"]'));
  click(zone.querySelector('[data-srs="good"]')); await sleep(150);
  T('avanza a tarjeta 2', zone.textContent.includes('Tarjeta 2 de 10'));
  T('prog con caja visible', /Caja \d\/5/.test(zone.textContent));

  // 5. again re-encola
  click(zone.querySelector('[data-srs="reveal"]')); await sleep(100);
  click(zone.querySelector('[data-srs="again"]')); await sleep(150);
  T('re-encola y avanza (3 de 11)', zone.textContent.includes('Tarjeta 3 de 11'));

  // 6. persistencia en state.srs → localStorage
  const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2') || 'null');
  const dataKey = FILE === 'index.html' ? 'dataEn' : 'dataJs';
  const usr = st && st.users && st.users[st.session];
  T('state.srs existe en ' + dataKey, usr[dataKey] && usr[dataKey].srs && Object.keys(usr[dataKey].srs).length >= 2);
  T('rec deck-0 box=1', usr[dataKey].srs[DECK + '-0'] && usr[dataKey].srs[DECK + '-0'].box === 1);
  T('rec deck-1 box=0', usr[dataKey].srs[DECK + '-1'] && usr[dataKey].srs[DECK + '-1'].box === 0);

  // 7. completar la sesión: revelar + «Lo sabía» en todas (incluida la re-encolada)
  for (let k = 0; k < 30; k++) {
    zone = c.querySelector('.srs-zone');
    if (zone.textContent.includes('¡Sesión lista!')) break;
    const rv = zone.querySelector('[data-srs="reveal"]');
    if (rv) { click(rv); await sleep(90); }
    const gd = zone.querySelector('[data-srs="good"]');
    if (gd) { click(gd); await sleep(90); }
  }
  zone = c.querySelector('.srs-zone');
  T('sesión completa (✅)', zone.textContent.includes('¡Sesión lista!'));
  T('10 correctas · 1 a repasar', zone.innerHTML.includes('Correctas: <b>10</b>') && zone.innerHTML.includes('A repasar: <b>1</b>'));
  click(zone.querySelector('[data-srs="exit"]')); await sleep(250);
  const sb2 = document.getElementById('sidebar');
  const srsBtn2 = sb2.querySelector('[data-um-nav="srs"]');
  T('badge = nuevas restantes ' + Math.max(0, TOTAL - 10), srsBtn2 && srsBtn2.textContent.includes(String(Math.max(0, TOTAL - 10))));

  // 8. login/registro nav no roto: ir a home
  window.location.hash = '#/'; await sleep(250);
  T('home carga tras SRS', document.getElementById('content').innerHTML.length > 500);

  // 9. sin errores de consola
  T('0 errores jsdom', errors.length === 0);
  if (errors.length) console.log(errors.slice(0, 5).join('\n'));
  console.log(FILE + ' → ' + ok + ' OK · ' + fail + ' FAIL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('EXCEPTION', e.message); process.exit(1); });
