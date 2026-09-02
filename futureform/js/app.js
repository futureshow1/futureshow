// FutureForm — UI aplikacji. Vanilla JS, stan w localStorage, bez zależności.

const STORE_KEY = 'futureform.v1';
const LEGACY_STORE_KEY = 'poligon.v1'; // dane zapisane przed zmianą nazwy aplikacji
let state = load();
let view = 'today';
let todayReadiness = null;

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) || {};
    const legacy = localStorage.getItem(LEGACY_STORE_KEY);
    if (legacy) { localStorage.setItem(STORE_KEY, legacy); localStorage.removeItem(LEGACY_STORE_KEY); return JSON.parse(legacy) || {}; }
    return {};
  } catch { return {}; }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

// ---------- helpers ----------
const $ = sel => document.querySelector(sel);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const EVENT_UNITS = { run3000: 'time', swim12: 'int', pullups: 'int', pushups: 'int', shuttle10x10: 'dec', koperta: 'dec', situps: 'int' };

function parseResult(ev, str) {
  if (str == null) return null;
  str = String(str).trim().replace(',', '.');
  if (!str) return null;
  if (EVENT_UNITS[ev] === 'time') {
    const m = str.match(/^(\d{1,2})[:.](\d{1,2})$/);
    if (m) return (+m[1]) * 60 + (+m[2]);
    const f = parseFloat(str); return isNaN(f) ? null : Math.round(f * 60); // "14.5" -> minuty
  }
  const f = parseFloat(str);
  if (isNaN(f)) return null;
  return EVENT_UNITS[ev] === 'dec' ? Math.round(f * 10) / 10 : Math.round(f);
}
function formatResult(ev, val) {
  if (val == null) return '–';
  if (EVENT_UNITS[ev] === 'time') return Engine.fmtTime(val);
  if (EVENT_UNITS[ev] === 'dec') return String(val).replace('.', ',') + ' s';
  return String(val) + (ev === 'swim12' ? ' m' : '');
}
function resultPlaceholder(ev) {
  return EVENT_UNITS[ev] === 'time' ? 'mm:ss' : EVENT_UNITS[ev] === 'dec' ? 'np. 30,5' : ev === 'swim12' ? 'm' : t('m_reps');
}

function daysTo(iso) { return Math.ceil((new Date(iso) - new Date()) / 864e5); }
function isoToday() { return Engine.todayISO(); }

// ---------- rendering root ----------
function render() {
  document.documentElement.lang = LANG;
  $('#app-tag').textContent = t('app_tag');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.querySelector('span').textContent = t('nav_' + b.dataset.view);
    b.classList.toggle('active', b.dataset.view === view);
  });
  const main = $('#main');
  main.innerHTML = '';
  if (!state.profile) { renderOnboarding(); return; }
  $('#onboarding').classList.add('hidden');
  ({ today: renderToday, plan: renderPlan, test: renderTest, progress: renderProgress, health: renderHealth, info: renderInfo })[view](main);
}

// ---------- onboarding ----------
let obStep = 0, obData = null;
function renderOnboarding(prefill) {
  const ob = $('#onboarding');
  ob.classList.remove('hidden');
  if (!obData) obData = prefill || {
    profile: { sex: 'M', birthYear: 1985, height: 178, weight: 78, activity: 'mid', sleep: 7, injuries: '', dietGoal: 'maintain', name: '' },
    config: { category: '4', events: ['run3000', 'pullups', 'shuttle10x10', 'situps'], testDate: addMonthsISO(3), targetGrade: 4, sessionsPerWeek: 4 },
    baseline: {}
  };
  const d = obData;
  const steps = [t('ob_step_profile'), t('ob_step_test'), t('ob_step_baseline'), t('ob_step_plan')];
  let html = `<div class="ob-card"><div class="ob-head"><div class="logo">Future<em>Form</em></div><p class="ob-intro">${obStep === 0 ? esc(t('ob_intro')) : ''}</p>
    <div class="ob-steps">${steps.map((s, i) => `<span class="${i === obStep ? 'on' : i < obStep ? 'done' : ''}">${s}</span>`).join('')}</div></div><div class="ob-body">`;
  if (obStep === 0) {
    html += `
      <label>${t('ob_name')}<input id="ob-name" value="${esc(d.profile.name)}"></label>
      <label>${t('ob_sex')}<select id="ob-sex"><option value="M" ${d.profile.sex === 'M' ? 'selected' : ''}>${t('ob_sex_m')}</option><option value="F" ${d.profile.sex === 'F' ? 'selected' : ''}>${t('ob_sex_f')}</option></select></label>
      <div class="row3">
        <label>${t('ob_birth')}<input id="ob-birth" type="number" min="1940" max="2010" value="${d.profile.birthYear}"></label>
        <label>${t('ob_height')}<input id="ob-height" type="number" min="120" max="230" value="${d.profile.height}"></label>
        <label>${t('ob_weight')}<input id="ob-weight" type="number" min="35" max="220" step="0.1" value="${d.profile.weight}"></label>
      </div>
      <div class="row2">
        <label>${t('ob_activity')}<select id="ob-activity">${['low', 'mid', 'high'].map(a => `<option value="${a}" ${d.profile.activity === a ? 'selected' : ''}>${t('act_' + a)}</option>`).join('')}</select></label>
        <label>${t('ob_sleep')}<input id="ob-sleep" type="number" min="3" max="12" step="0.5" value="${d.profile.sleep}"></label>
      </div>
      <label>${t('ob_injuries')}<input id="ob-injuries" value="${esc(d.profile.injuries)}"></label>`;
  } else if (obStep === 1) {
    const evSel = (label, opts) => `<label>${label}<select data-evslot>${opts.map(o => `<option value="${o}" ${d.config.events.includes(o) ? 'selected' : ''}>${t('ev_' + o)}</option>`).join('')}</select></label>`;
    html += `
      <label>${t('ob_category')}<select id="ob-cat">${[1, 2, 3, 4, 5].map(c => `<option value="${c}" ${String(d.config.category) == c ? 'selected' : ''}>${t('cat' + c)}</option>`).join('')}</select></label>
      ${evSel(t('ob_ev_endurance'), ['run3000', 'swim12'])}
      ${evSel(t('ob_ev_strength'), ['pullups', 'pushups'])}
      ${evSel(t('ob_ev_agility'), ['shuttle10x10', 'koperta'])}
      <p class="hint">+ ${t('ev_situps')}</p>`;
  } else if (obStep === 2) {
    html += `<p class="hint">${t('ob_baseline_hint')}</p>`;
    for (const ev of currentObEvents()) {
      html += `<label>${t('ev_' + ev)}<input data-baseline="${ev}" placeholder="${resultPlaceholder(ev)}" value="${esc(d.baseline[ev] ?? '')}"></label>`;
    }
  } else {
    html += `
      <label>${t('ob_testdate')}<input id="ob-date" type="date" value="${d.config.testDate}"></label>
      <label>${t('ob_target')}<select id="ob-target">${[[3, 'target_pass'], [4, 'target_db'], [5, 'target_bdb']].map(([v, k]) => `<option value="${v}" ${d.config.targetGrade == v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></label>
      <label>${t('ob_sessions')}<select id="ob-sess">${[3, 4, 5].map(n => `<option ${d.config.sessionsPerWeek == n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>`;
  }
  html += `</div><div class="ob-foot">
    ${obStep > 0 ? `<button class="btn ghost" id="ob-back">${t('back')}</button>` : '<span></span>'}
    <button class="btn primary" id="ob-next">${obStep === 3 ? t('ob_start') : t('next')}</button></div></div>`;
  ob.innerHTML = html;
  const grab = () => {
    if (obStep === 0) {
      d.profile.name = $('#ob-name').value.trim();
      d.profile.sex = $('#ob-sex').value;
      d.profile.birthYear = +$('#ob-birth').value; d.profile.height = +$('#ob-height').value; d.profile.weight = +$('#ob-weight').value;
      d.profile.activity = $('#ob-activity').value; d.profile.sleep = +$('#ob-sleep').value; d.profile.injuries = $('#ob-injuries').value.trim();
    } else if (obStep === 1) {
      d.config.category = $('#ob-cat').value;
      const slots = [...document.querySelectorAll('[data-evslot]')].map(s => s.value);
      d.config.events = [...slots, 'situps'];
    } else if (obStep === 2) {
      document.querySelectorAll('[data-baseline]').forEach(inp => { d.baseline[inp.dataset.baseline] = inp.value.trim(); });
    } else {
      d.config.testDate = $('#ob-date').value; d.config.targetGrade = +$('#ob-target').value; d.config.sessionsPerWeek = +$('#ob-sess').value;
    }
  };
  $('#ob-next').onclick = () => {
    grab();
    if (obStep === 0 && (!d.profile.birthYear || !d.profile.height || !d.profile.weight)) { alert(t('err_required')); return; }
    if (obStep < 3) { obStep++; renderOnboarding(); return; }
    finishOnboarding(d);
  };
  const back = $('#ob-back'); if (back) back.onclick = () => { grab(); obStep--; renderOnboarding(); };
}
function currentObEvents() { return obData.config.events.filter(e => e !== 'situps').concat(['situps']); }
function addMonthsISO(m) { const d = new Date(); d.setMonth(d.getMonth() + m); return d.toISOString().slice(0, 10); }

function finishOnboarding(d) {
  const editing = !!state.profile;
  state.profile = d.profile; state.config = d.config;
  if (!editing) { state.tests = []; state.sessions = []; state.weights = []; state.planStart = isoToday(); }
  // baseline z kroku 2 (tylko przy pierwszym starcie lub gdy coś wpisano)
  const res = {};
  let any = false;
  for (const ev of d.config.events) {
    const v = parseResult(ev, d.baseline[ev]);
    if (v != null) { res[ev] = v; any = true; }
  }
  if (any && !editing) state.tests.push({ date: isoToday(), results: res, baseline: true });
  if (!state.weights?.length && d.profile.weight) state.weights = [{ date: isoToday(), kg: d.profile.weight }];
  const latest = Engine.latestScore(state);
  if (!state.prog || !editing) state.prog = Engine.defaultProg(latest);
  obData = null; obStep = 0;
  save(); view = 'today'; render();
}

// ---------- widok: Dziś ----------
function renderToday(main) {
  const score = Engine.latestScore(state);
  const days = daysTo(state.config.testDate);
  const head = el('div', 'card hero');
  if (score) {
    const gname = I18N[LANG].grade_names[score.grade] || '–';
    head.innerHTML = `
      <div class="hero-top"><div><div class="big">${score.total.toFixed(1)}</div><div class="sub">${t('d_total')}</div></div>
      <div class="hero-grade ${score.pass ? 'ok' : 'bad'}"><div class="big">${gname}</div><div class="sub">${score.pass ? t('d_pass') : t('d_fail')}</div></div>
      <div><div class="big">${days >= 0 ? days : '–'}</div><div class="sub">${t('d_days_to_test')}</div></div></div>
      <div class="thresholds">${['dst', 'db', 'bdb'].map(k => `<span class="${score.total >= score.thresholds[k] ? 'hit' : ''}">${k} ≥ ${score.thresholds[k]}</span>`).join('')}
      <span class="agegroup">${t('d_age_group')}: ${NORMS.groups[score.gi]}</span></div>`;
    main.append(head);
    // paski konkurencji
    const evCard = el('div', 'card');
    let weakest = null, weakGap = -1;
    for (const ev of state.config.events) {
      const e = score.events[ev];
      const pct = e.max ? Math.min(100, (e.pts / e.max) * 100) : 0;
      const gap = (e.max ?? 0) - (e.pts ?? 0);
      if (gap > weakGap) { weakGap = gap; weakest = ev; }
      evCard.append(el('div', 'evrow', `
        <div class="evname">${t('ev_' + ev)}<span class="evres">${formatResult(ev, e.result)}</span></div>
        <div class="bar"><div class="fill ${e.ok ? '' : 'warn'}" style="width:${pct}%"></div><span class="min-mark" style="left:${e.max ? Math.min(100, e.min / e.max * 100) : 0}%"></span></div>
        <div class="evpts ${e.ok ? '' : 'warn'}">${e.pts != null ? e.pts.toFixed(1) : '–'} / ${e.max?.toFixed(0) ?? '–'} ${t('d_event_pts')}${e.ok ? '' : ' · ' + t('d_min_missing')}</div>`));
    }
    if (weakest) evCard.append(el('p', 'hint', `⚔ ${t('d_weakest')}: <b>${t('ev_' + weakest)}</b>`));
    // trajektoria
    const th = score.thresholds[state.config.targetGrade === 5 ? 'bdb' : state.config.targetGrade === 4 ? 'db' : 'dst'];
    evCard.append(el('p', 'hint', score.total >= th ? '✓ ' + t('d_trajectory_ok') : '→ ' + t('d_trajectory_bad')));
    main.append(evCard);
  } else {
    head.innerHTML = `<p>${t('d_no_baseline')}</p>`;
    main.append(head);
  }
  // gotowość
  const r = el('div', 'card');
  r.innerHTML = `<h3>${t('d_readiness')}</h3><div class="row3">
    <label>${t('d_sleep')}<input id="rd-sleep" type="number" min="0" max="14" step="0.5" value="${state.profile.sleep || 7}"></label>
    <label>${t('d_soreness')}<input id="rd-sore" type="number" min="1" max="5" value="2"></label>
    <label>${t('d_energy')}<input id="rd-energy" type="number" min="1" max="5" value="4"></label></div>
    <button class="btn" id="rd-check">${t('d_check')}</button><p id="rd-out" class="hint"></p>`;
  main.append(r);
  r.querySelector('#rd-check').onclick = () => {
    todayReadiness = Engine.readiness(+$('#rd-sleep').value, +$('#rd-sore').value, +$('#rd-energy').value);
    $('#rd-out').innerHTML = `<b>${t('r_' + todayReadiness.level)}</b>`;
    renderTodaySession();
  };
  // dzisiejsza sesja
  const s = el('div', 'card'); s.id = 'today-session'; main.append(s);
  renderTodaySession();
  const logBtn = el('button', 'btn primary wide', t('d_log_session'));
  logBtn.onclick = () => openLogDialog();
  main.append(logBtn);
}

function sessionsThisWeek() {
  const monday = new Date(); const day = (monday.getDay() + 6) % 7; monday.setDate(monday.getDate() - day);
  const iso = monday.toISOString().slice(0, 10);
  return (state.sessions || []).filter(s => s.date >= iso);
}

function renderTodaySession() {
  const box = $('#today-session'); if (!box) return;
  const plan = Engine.weekPlan(state);
  const doneCount = sessionsThisWeek().length;
  const sess = plan.sessions[doneCount];
  box.innerHTML = `<h3>${t('d_today_session')}</h3>`;
  if (!sess) { box.innerHTML += `<p class="hint">${t('d_no_session')}</p>`; return; }
  const factor = todayReadiness ? todayReadiness.factor : 1;
  box.append(sessionCard(sess, factor));
}

function sessionCard(sess, factor = 1) {
  const c = el('div', 'session');
  const mins = sess.estMin ? Math.round(sess.estMin * (factor < 1 ? factor : 1) / 5) * 5 : null;
  c.innerHTML = `<div class="skind k-${sess.kind}">${t('k_' + sess.kind)}${factor < 1 ? ` <span class="factor">×${factor}</span>` : ''}
    ${mins ? `<span class="est">⏱ ≈ ${mins} ${t('m_min')}</span>` : ''}</div>`;
  const grid = el('div', 'ex-grid');
  for (const b of sess.blocks) {
    const card = el('button', 'ex-card');
    card.innerHTML = `${EXANIM[b.ex] ? EXANIM[b.ex]() : ''}
      <div class="ex-name">${t(b.ex)}</div>
      ${b.scheme ? `<div class="ex-scheme">${esc(b.scheme)}</div>` : ''}
      <div class="ex-more">ⓘ</div>`;
    card.onclick = () => openExerciseModal(b);
    grid.append(card);
  }
  c.append(grid);
  return c;
}

// Karta ćwiczenia: duża animacja + opis techniki + wskazówki
function openExerciseModal(b) {
  const m = $('#modal');
  const info = EXINFO[b.ex]?.[LANG] || EXINFO[b.ex]?.pl;
  m.classList.remove('hidden');
  m.innerHTML = `<div class="modal-card ex-modal">
    <div class="ex-modal-viz">${EXANIM[b.ex] ? EXANIM[b.ex]() : ''}</div>
    <h3>${t(b.ex)}</h3>
    ${b.scheme ? `<div class="ex-scheme big">${esc(b.scheme)}</div>` : ''}
    ${b.min ? `<div class="ex-time">⏱ ≈ ${b.min} ${t('m_min')}</div>` : ''}
    ${info ? `<p class="ex-desc">${info.d}</p><ul class="cues">${info.c.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
    ${b.note ? `<p class="hint">▸ ${t(b.note)}</p>` : ''}
    <div class="ob-foot"><span></span><button class="btn primary" id="ex-close">${t('close')}</button></div></div>`;
  $('#ex-close').onclick = () => m.classList.add('hidden');
  m.onclick = e => { if (e.target === m) { m.classList.add('hidden'); m.onclick = null; } };
}

// ---------- log sesji ----------
function openLogDialog(kindPreset) {
  const plan = Engine.weekPlan(state);
  const kinds = [...new Set(plan.sessions.map(s => s.kind))];
  const m = $('#modal');
  m.classList.remove('hidden');
  m.innerHTML = `<div class="modal-card"><h3>${t('l_title')}</h3>
    <label>${t('l_kind')}<select id="lg-kind">${kinds.map(k => `<option value="${k}" ${k === kindPreset ? 'selected' : ''}>${t('k_' + k)}</option>`).join('')}</select></label>
    <label>${t('l_ratio')}<select id="lg-ratio">
      <option value="1">${t('l_ratio_all')}</option><option value="0.85">${t('l_ratio_most')}</option>
      <option value="0.5">${t('l_ratio_half')}</option><option value="0.25">${t('l_ratio_little')}</option></select></label>
    <label>${t('l_rpe')}<input id="lg-rpe" type="number" min="1" max="10" step="0.5" value="7"></label>
    <label class="chk"><input id="lg-pain" type="checkbox"> ${t('l_pain')}</label>
    <label>${t('l_notes')}<input id="lg-notes"></label>
    <div class="ob-foot"><button class="btn ghost" id="lg-cancel">${t('cancel')}</button><button class="btn primary" id="lg-save">${t('save')}</button></div></div>`;
  $('#lg-cancel').onclick = () => m.classList.add('hidden');
  $('#lg-save').onclick = () => {
    const kind = $('#lg-kind').value, ratio = +$('#lg-ratio').value, rpe = +$('#lg-rpe').value, pain = $('#lg-pain').checked;
    state.sessions = state.sessions || [];
    state.sessions.push({ date: isoToday(), kind, performedRatio: ratio, rpe, pain, notes: $('#lg-notes').value.trim(), readiness: todayReadiness?.level || null });
    state.prog = Engine.adapt(state.prog, kind, ratio, rpe);
    save(); m.classList.add('hidden');
    if (pain) alert(t('l_pain_warn'));
    render();
  };
}

// ---------- widok: Plan ----------
function renderPlan(main) {
  const plan = Engine.weekPlan(state);
  const head = el('div', 'card');
  const typeName = t('p_type_' + (plan.type === 'taper' ? 'taper' : plan.type));
  head.innerHTML = `<h3>${t('p_week')} ${plan.weekIdx + 1}${plan.totalWeeks ? ` ${t('p_of')} ${plan.totalWeeks}` : ''} · <span class="wt-${plan.type}">${typeName}</span></h3>`;
  if (plan.emphasis) {
    head.append(el('div', 'chips', `${t('p_emph')}: ` + Object.entries(plan.emphasis).sort((a, b) => b[1] - a[1])
      .map(([ev, w]) => `<span class="chip">${t('ev_' + ev)} ${(w * 100).toFixed(0)}%</span>`).join(' ')));
  }
  main.append(head);
  const done = sessionsThisWeek();
  plan.sessions.forEach((sess, i) => {
    const c = el('div', 'card');
    const logged = done[i];
    c.innerHTML = `<div class="sess-head"><h4>${t('p_session')} ${i + 1}</h4>${logged ? `<span class="done">✓ ${t('p_done')} (${logged.date})</span>` : `<button class="btn small" data-log="${sess.kind}">${t('p_log')}</button>`}</div>`;
    c.append(sessionCard(sess));
    c.querySelectorAll('[data-log]').forEach(b => b.onclick = () => openLogDialog(b.dataset.log));
    main.append(c);
  });
  // przegląd tygodnia
  const rev = Engine.weeklyReview(state);
  const rc = el('div', 'card');
  rc.innerHTML = `<h3>${t('p_review')}</h3><p>${t('p_compliance')}: <b>${(rev.compliance * 100).toFixed(0)}%</b> (${rev.done}/${rev.planned})${rev.avgRpe ? ` · ${t('p_avg_rpe')}: <b>${rev.avgRpe.toFixed(1)}</b>` : ''}</p><p class="hint">${t(rev.advice)}</p>`;
  main.append(rc);
}

// ---------- widok: Test ----------
function renderTest(main) {
  const c = el('div', 'card');
  c.innerHTML = `<h3>${t('t_new')}</h3><p class="hint">${t('t_hint')}</p>
    <label>${t('t_date')}<input id="tst-date" type="date" value="${isoToday()}"></label>`;
  for (const ev of state.config.events) {
    c.innerHTML += `<label>${t('ev_' + ev)}<input data-tst="${ev}" placeholder="${resultPlaceholder(ev)}"></label>`;
  }
  c.innerHTML += `<div id="tst-live" class="live"></div><button class="btn primary" id="tst-save">${t('t_save')}</button>`;
  main.append(c);
  const liveCalc = () => {
    const res = {};
    document.querySelectorAll('[data-tst]').forEach(inp => { const v = parseResult(inp.dataset.tst, inp.value); if (v != null) res[inp.dataset.tst] = v; });
    if (!Object.keys(res).length) { $('#tst-live').innerHTML = ''; return; }
    const sc = Engine.scoreTest(state.profile, state.config, res);
    $('#tst-live').innerHTML = `<b>${t('t_calc')}:</b> ` + state.config.events.map(ev => {
      const e = sc.events[ev];
      return `<span class="${e.ok ? 'ok' : 'warn'}">${t('ev_' + ev)}: ${e.pts != null ? e.pts.toFixed(1) : '–'}</span>`;
    }).join(' · ') + ` → <b>${sc.total.toFixed(1)} ${t('d_event_pts')}</b> (${I18N[LANG].grade_names[sc.grade] ?? '–'})`;
  };
  c.querySelectorAll('[data-tst]').forEach(inp => inp.oninput = liveCalc);
  $('#tst-save').onclick = () => {
    const res = {};
    document.querySelectorAll('[data-tst]').forEach(inp => { const v = parseResult(inp.dataset.tst, inp.value); if (v != null) res[inp.dataset.tst] = v; });
    if (!Object.keys(res).length) { alert(t('err_required')); return; }
    state.tests = state.tests || [];
    // scal z ostatnim znanym kompletem (retest częściowy nadpisuje tylko wpisane)
    const prev = state.tests.length ? state.tests[state.tests.length - 1].results : {};
    state.tests.push({ date: $('#tst-date').value || isoToday(), results: { ...prev, ...res } });
    const latest = Engine.latestScore(state);
    state.prog = { ...state.prog, ...Engine.defaultProg(latest), vol: state.prog?.vol ?? 1 };
    save(); render();
  };
  // historia
  const h = el('div', 'card');
  h.innerHTML = `<h3>${t('t_history')}</h3>`;
  const tests = (state.tests || []).slice().reverse();
  if (!tests.length) h.append(el('p', 'hint', t('g_none')));
  else {
    const tbl = el('table', 'tbl');
    tbl.innerHTML = `<tr><th>${t('t_date')}</th>${state.config.events.map(ev => `<th>${t('ev_' + ev)}</th>`).join('')}<th>Σ</th><th></th></tr>`;
    tests.forEach((tst, ri) => {
      const sc = Engine.scoreTest(state.profile, state.config, tst.results);
      const tr = el('tr', '', `<td>${tst.date}${tst.baseline ? ` <span class="tag">${t('t_baseline')}</span>` : ''}</td>` +
        state.config.events.map(ev => `<td>${formatResult(ev, tst.results[ev])}<div class="subpts">${sc.events[ev].pts?.toFixed(1) ?? '–'}</div></td>`).join('') +
        `<td><b>${sc.total.toFixed(1)}</b><div class="subpts">${I18N[LANG].grade_names[sc.grade] ?? ''}</div></td><td><button class="btn tiny ghost" data-del="${state.tests.length - 1 - ri}">✕</button></td>`);
      tbl.append(tr);
    });
    h.append(tbl);
    h.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (confirm(t('t_delete') + '?')) { state.tests.splice(+b.dataset.del, 1); save(); render(); } });
  }
  main.append(h);
  // podgląd tabel
  const tb = el('div', 'card');
  tb.innerHTML = `<h3>${t('t_tables')}</h3><p class="hint">${t('t_tables_hint')}</p>
    <select id="tbl-ev">${state.config.events.map(ev => `<option value="${ev}">${t('ev_' + ev)}</option>`).join('')}</select>
    <div id="tbl-out"></div>`;
  main.append(tb);
  const showTbl = () => {
    const ev = $('#tbl-ev').value;
    const sexKey = Engine.tableSex(state.profile.sex, state.config.category);
    const gi = Engine.ageGroupIndex(state.profile.birthYear, new Date(state.config.testDate || isoToday()).getFullYear());
    const tab = NORMS[sexKey][ev];
    const rows = tab.results.filter(r => r.p[gi] != null);
    const step = Math.max(1, Math.floor(rows.length / 25));
    let html = `<table class="tbl"><tr><th>${t('t_result')}</th><th>${t('t_pts')}</th></tr>`;
    rows.forEach((r, i) => {
      if (i % step !== 0 && i !== rows.length - 1 && Math.abs(r.p[gi] - tab.min) > 0.01) return;
      const isMin = Math.abs(r.p[gi] - tab.min) < 0.01;
      html += `<tr class="${isMin ? 'minrow' : ''}"><td>${formatResult(ev, r.r)}</td><td>${r.p[gi].toFixed(1)}${isMin ? ` ← ${t('t_min_req')}` : ''}</td></tr>`;
    });
    html += '</table>';
    $('#tbl-out').innerHTML = html;
  };
  $('#tbl-ev').onchange = showTbl; showTbl();
}

// ---------- widok: Postępy ----------
function renderProgress(main) {
  main.append(el('h2', 'pagetitle', t('g_title')));
  const tests = state.tests || [];
  const mkCanvas = (title) => { const c = el('div', 'card'); c.innerHTML = `<h3>${title}</h3>`; const cv = el('canvas'); cv.width = 640; cv.height = 220; c.append(cv); main.append(c); return cv; };
  if (tests.length >= 2) {
    const cv = mkCanvas(t('g_total_pts'));
    const pts = tests.map(tst => ({ x: tst.date.slice(5), y: Engine.scoreTest(state.profile, state.config, tst.results).total }));
    const sc = Engine.latestScore(state);
    drawLine(cv, pts, { hlines: sc ? [sc.thresholds.dst, sc.thresholds.db, sc.thresholds.bdb] : [], ymax: 100 });
  }
  if ((state.weights || []).length >= 2) {
    const cv = mkCanvas(t('g_weight'));
    drawLine(cv, state.weights.map(w => ({ x: w.date.slice(5), y: w.kg })), {});
  }
  const sess = state.sessions || [];
  if (sess.length) {
    const cv = mkCanvas(t('g_sessions'));
    const byWeek = {};
    sess.forEach(s => { const d = new Date(s.date); const wk = `${d.getFullYear()}-${String(Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 864e5 + 1) / 7)).padStart(2, '0')}`; byWeek[wk] = (byWeek[wk] || 0) + 1; });
    drawBars(cv, Object.entries(byWeek).slice(-16).map(([k, v]) => ({ x: k.slice(5), y: v })), { target: state.config.sessionsPerWeek });
  }
  if (tests.length < 2 && (state.weights || []).length < 2 && !sess.length) main.append(el('div', 'card', `<p class="hint">${t('g_none')}</p>`));
}

function chartColors() {
  const s = getComputedStyle(document.documentElement);
  return { line: s.getPropertyValue('--acc').trim() || '#7fae60', grid: 'rgba(128,128,128,.25)', txt: s.getPropertyValue('--fg-dim').trim() || '#888' };
}
function drawLine(cv, pts, opts = {}) {
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height, P = 34, C = chartColors();
  ctx.clearRect(0, 0, W, H);
  if (!pts.length) return;
  const ys = pts.map(p => p.y);
  let ymin = opts.ymin ?? Math.min(...ys), ymax = opts.ymax ?? Math.max(...ys);
  if (opts.hlines) { ymin = Math.min(ymin, ...opts.hlines); ymax = Math.max(ymax, ...opts.hlines); }
  const pad = (ymax - ymin) * 0.1 || 5; ymin -= pad; ymax += pad;
  const X = i => P + (W - 2 * P) * (pts.length === 1 ? 0.5 : i / (pts.length - 1));
  const Y = v => H - P - (H - 2 * P) * ((v - ymin) / (ymax - ymin));
  ctx.strokeStyle = C.grid; ctx.fillStyle = C.txt; ctx.font = '11px system-ui'; ctx.lineWidth = 1;
  (opts.hlines || []).forEach(h => { ctx.beginPath(); ctx.moveTo(P, Y(h)); ctx.lineTo(W - P, Y(h)); ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]); ctx.fillText(String(h), 4, Y(h) + 4); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath();
  pts.forEach((p, i) => { i ? ctx.lineTo(X(i), Y(p.y)) : ctx.moveTo(X(0), Y(p.y)); }); ctx.stroke();
  ctx.fillStyle = C.line;
  pts.forEach((p, i) => { ctx.beginPath(); ctx.arc(X(i), Y(p.y), 3.5, 0, 7); ctx.fill(); });
  ctx.fillStyle = C.txt;
  const lb = Math.max(1, Math.ceil(pts.length / 8));
  pts.forEach((p, i) => { if (i % lb === 0 || i === pts.length - 1) ctx.fillText(p.x, X(i) - 14, H - 8); });
  ctx.fillText(String(Math.round(ymax)), 4, P); ctx.fillText(String(Math.round(ymin)), 4, H - P);
}
function drawBars(cv, pts, opts = {}) {
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height, P = 30, C = chartColors();
  ctx.clearRect(0, 0, W, H);
  if (!pts.length) return;
  const ymax = Math.max(...pts.map(p => p.y), opts.target || 0) + 1;
  const bw = (W - 2 * P) / pts.length;
  ctx.fillStyle = C.line;
  pts.forEach((p, i) => { const h = (H - 2 * P) * p.y / ymax; ctx.fillRect(P + i * bw + 3, H - P - h, bw - 6, h); });
  if (opts.target) { const y = H - P - (H - 2 * P) * opts.target / ymax; ctx.strokeStyle = C.grid; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(P, y); ctx.lineTo(W - P, y); ctx.stroke(); ctx.setLineDash([]); }
  ctx.fillStyle = C.txt; ctx.font = '11px system-ui';
  pts.forEach((p, i) => { if (pts.length <= 16 || i % 2 === 0) ctx.fillText(p.x, P + i * bw, H - 8); });
}

// ---------- widok: Zdrowie ----------
function renderHealth(main) {
  main.append(el('h2', 'pagetitle', t('h_title')));
  const d = Engine.dietTargets(state.profile);
  const c = el('div', 'card');
  c.innerHTML = `
    <label>${t('h_goal')}<select id="h-goal">${[['cut', 'goal_cut'], ['maintain', 'goal_maintain'], ['gain', 'goal_gain']].map(([v, k]) => `<option value="${v}" ${state.profile.dietGoal === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></label>
    <div class="stats">
      <div><b>${Engine.bmr(state.profile)}</b><span>${t('h_bmr')} kcal</span></div>
      <div><b>${d.tdee}</b><span>${t('h_tdee')} kcal</span></div>
      <div><b>${d.kcal}</b><span>${t('h_kcal')} kcal</span></div>
      <div><b>${d.protein} g</b><span>${t('h_protein')}</span></div>
      <div><b>${d.fatMin} g</b><span>${t('h_fat')}</span></div>
      <div><b>${d.waterL} l</b><span>${t('h_water')}</span></div>
      <div><b>${Engine.bmi(state.profile)}</b><span>${t('h_bmi')}</span></div>
    </div>`;
  main.append(c);
  c.querySelector('#h-goal').onchange = e => { state.profile.dietGoal = e.target.value; save(); render(); };
  // waga
  const w = el('div', 'card');
  w.innerHTML = `<h3>${t('h_weight_log')}</h3><p class="hint">${t('h_weight_hint')}</p>
    <div class="row2"><input id="w-kg" type="number" step="0.1" placeholder="${t('m_kg')}"><button class="btn" id="w-add">${t('h_add_weight')}</button></div><div id="w-chart"></div>`;
  main.append(w);
  $('#w-add').onclick = () => {
    const kg = parseFloat($('#w-kg').value.replace(',', '.'));
    if (!kg) return;
    state.weights = state.weights || [];
    state.weights.push({ date: isoToday(), kg });
    state.profile.weight = kg;
    save(); render();
  };
  if ((state.weights || []).length >= 2) {
    const cv = el('canvas'); cv.width = 600; cv.height = 180; $('#w-chart').append(cv);
    drawLine(cv, state.weights.map(x => ({ x: x.date.slice(5), y: x.kg })), {});
  }
  const s = el('div', 'card', `<h3>${t('h_sleep_title')}</h3><p class="hint">${t('h_sleep_tips')}</p>`);
  main.append(s);
  main.append(el('div', 'card disclaimer', `⚕ ${t('h_disclaimer')}`));
}

// ---------- widok: Info / podstawy naukowe ----------
const EVIDENCE = [
  {
    pl: { h: 'Normy i punktacja', p: 'Tabele punktowe, grupy wiekowe, minima konkurencji i progi ocen odwzorowane 1:1 z obowiązującego prawa. Kopia rozporządzenia w folderze docs/ aplikacji.' },
    en: { h: 'Norms & scoring', p: 'Point tables, age groups, event minimums and grade thresholds mirrored 1:1 from the binding regulation. A copy ships in the app\'s docs/ folder.' },
    refs: ['Rozporządzenie Ministra Obrony Narodowej z dn. 7.03.2024 r. w sprawie przeprowadzania sprawdzianu sprawności fizycznej żołnierzy zawodowych, <a href="https://dziennikustaw.gov.pl/DU/2024/396" target="_blank" rel="noopener">Dz.U. 2024 poz. 396</a>, zał. 2–4']
  },
  {
    pl: { h: 'Progresje kalisteniczne', p: 'Drabina wariantów każdego ruchu (negatywy → podciąganie → warianty trudniejsze) i kryteria przejścia między nimi pochodzą z najpełniejszego podręcznika programowania treningu z masą własnego ciała.' },
    en: { h: 'Calisthenics progressions', p: 'The ladder of variants for each movement (negatives → pull-up → harder variants) and the mastery criteria between them come from the most complete manual of bodyweight programming.' },
    refs: ['Low S., <i>Overcoming Gravity: A Systematic Approach to Gymnastics and Bodyweight Strength</i>, 2nd ed., Battle Ground Creative 2016']
  },
  {
    pl: { h: 'Podwójna progresja i periodyzacja', p: 'Schemat serie×powtórzenia rośnie dopiero po spełnieniu kryterium w bieżącym obciążeniu; co 4. tydzień deload, przed testem taper. Standard metodyczny treningu siły.' },
    en: { h: 'Double progression & periodization', p: 'Sets×reps advance only after meeting the criterion at the current load; every 4th week a deload, a taper before the test. The methodological standard of strength training.' },
    refs: ['Haff G.G., Triplett N.T. (red.), <i>Essentials of Strength Training and Conditioning</i> (NSCA), 4th ed., Human Kinetics 2016']
  },
  {
    pl: { h: 'Autoregulacja wysiłku (RPE)', p: 'Ocena ciężkości sesji w skali 1–10 steruje progresją: lekko → przyspieszamy, zbyt ciężko → wycofujemy. Narzędzie zwalidowane w badaniach nad treningiem oporowym.' },
    en: { h: 'Effort autoregulation (RPE)', p: 'Rating session difficulty on a 1–10 scale steers progression: easy → advance, too hard → back off. A tool validated in resistance-training research.' },
    refs: ['Helms E.R. i in., „Application of the Repetitions in Reserve-Based Rating of Perceived Exertion Scale for Resistance Training", <i>Strength & Conditioning Journal</i> 38(4), 2016']
  },
  {
    pl: { h: 'Dawka objętości treningowej', p: 'Objętość tygodniowa rośnie stopniowo i ma sufit: więcej nie znaczy lepiej. Zależność dawka–efekt dla liczby serii potwierdza metaanaliza; praktyczne landmarki MEV/MRV porządkują jej stosowanie.' },
    en: { h: 'Training volume dosing', p: 'Weekly volume climbs gradually and has a ceiling: more is not better. The dose–response for set counts is meta-analytically confirmed; the practical MEV/MRV landmarks organize its use.' },
    refs: ['Schoenfeld B.J., Ogborn D., Krieger J.W., „Dose-response relationship between weekly resistance training volume and increases in muscle mass", <i>Journal of Sports Sciences</i> 35(11), 2017', 'Israetel M. i in., <i>Scientific Principles of Hypertrophy Training</i>, Renaissance Periodization 2021']
  },
  {
    pl: { h: 'Trening biegowy: interwały + tempo + baza', p: 'Rozkład intensywności (dużo spokojnie, mało bardzo szybko) i praca progowa odpowiadają najlepiej udokumentowanej praktyce treningu wytrzymałości; szablony pod testy służb z literatury taktycznej.' },
    en: { h: 'Run training: intervals + tempo + base', p: 'The intensity distribution (mostly easy, a little very fast) and threshold work follow the best-documented endurance practice; the military-test templates come from tactical literature.' },
    refs: ['Seiler S., „What is Best Practice for Training Intensity and Duration Distribution in Endurance Athletes?", <i>International Journal of Sports Physiology and Performance</i> 5(3), 2010', 'Black K., <i>Tactical Barbell II: Conditioning</i>, 3rd ed. 2016; Smith S., <i>Tactical Fitness</i>, Hatherleigh 2015; Lauren M., <i>You Are Your Own Gym</i>, Ballantine 2011']
  },
  {
    pl: { h: 'Bezpieczeństwo i screening', p: 'Pytania o stan zdrowia, zasada „ból ostry = stop" i zalecenie konsultacji lekarskiej przed intensywnym programem odpowiadają wytycznym kwalifikacji do wysiłku.' },
    en: { h: 'Safety & screening', p: 'The health questions, the "sharp pain = stop" rule and the advice to consult a physician before an intense program follow exercise pre-participation guidelines.' },
    refs: ['American College of Sports Medicine, <i>ACSM\'s Guidelines for Exercise Testing and Prescription</i>, 11th ed., Wolters Kluwer 2021', 'Warburton D.E.R. i in., „The Physical Activity Readiness Questionnaire (PAR-Q+)", <i>Health & Fitness Journal of Canada</i> 4(2), 2011']
  },
  {
    pl: { h: 'Energetyka i białko', p: 'Zapotrzebowanie kaloryczne z równania Mifflina-St Jeor (najtrafniejsze wg badań walidacyjnych), cel białkowy 1,6–2,2 g/kg zgodny z metaanalizą i stanowiskiem towarzystw żywieniowych.' },
    en: { h: 'Energy & protein', p: 'Caloric needs from the Mifflin-St Jeor equation (most accurate per validation studies); the 1.6–2.2 g/kg protein target follows the meta-analysis and joint position stand.' },
    refs: ['Mifflin M.D., St Jeor S.T. i in., „A new predictive equation for resting energy expenditure in healthy individuals", <i>American Journal of Clinical Nutrition</i> 51(2), 1990', 'Morton R.W. i in., „A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains", <i>British Journal of Sports Medicine</i> 52(6), 2018', 'Thomas D.T., Erdman K.A., Burke L.M., „Nutrition and Athletic Performance" (ACSM/AND/DC position stand), <i>Medicine & Science in Sports & Exercise</i> 48(3), 2016']
  },
  {
    pl: { h: 'Sen i regeneracja', p: 'Zalecenia 7–9 h, stałych pór i higieny snu odzwierciedlają przegląd interwencji snu u sportowców — sen to najtańszy środek ergogeniczny.' },
    en: { h: 'Sleep & recovery', p: 'The 7–9 h, consistent-schedule and sleep-hygiene advice reflects the review of sleep interventions in athletes — sleep is the cheapest ergogenic aid.' },
    refs: ['Bonnar D. i in., „Sleep Interventions Designed to Improve Athletic Performance and Recovery", <i>Sports Medicine</i> 48(3), 2018']
  }
];

function renderInfo(main) {
  main.append(el('h2', 'pagetitle', t('i_title')));
  main.append(el('div', 'card', `<p>${t('i_norms')}</p><p class="hint">${t('i_privacy')}</p>`));
  const ev = el('div', 'card');
  ev.innerHTML = `<h3>${t('i_evidence')}</h3><p class="hint">${t('i_evidence_sub')}</p>`;
  for (const item of EVIDENCE) {
    const loc = item[LANG] || item.pl;
    ev.append(el('div', 'evid', `<h4>${loc.h}</h4><p>${loc.p}</p><ul class="src">${item.refs.map(r => `<li>${r}</li>`).join('')}</ul>`));
  }
  main.append(ev);
}

// ---------- ustawienia ----------
function openSettings() {
  const m = $('#modal');
  m.classList.remove('hidden');
  m.innerHTML = `<div class="modal-card"><h3>${t('s_title')}</h3>
    <label>${t('s_lang')}<select id="st-lang"><option value="pl" ${LANG === 'pl' ? 'selected' : ''}>Polski</option><option value="en" ${LANG === 'en' ? 'selected' : ''}>English</option></select></label>
    <button class="btn wide" id="st-edit">${t('s_edit_profile')}</button>
    <button class="btn wide" id="st-export">${t('s_export')}</button>
    <label class="btn wide file-btn">${t('s_import')}<input id="st-import" type="file" accept=".json" hidden></label>
    <button class="btn wide danger" id="st-reset">${t('s_reset')}</button>
    <div class="ob-foot"><span></span><button class="btn primary" id="st-close">${t('close')}</button></div></div>`;
  $('#st-lang').onchange = e => { setLang(e.target.value); openSettings(); render(); };
  $('#st-close').onclick = () => m.classList.add('hidden');
  $('#st-edit').onclick = () => {
    m.classList.add('hidden');
    obStep = 0;
    obData = { profile: { ...state.profile }, config: { ...state.config, events: [...state.config.events] }, baseline: {} };
    state.profile = null; // wymusza kreator; dane w obData
    const keep = { ...state };
    renderOnboarding(obData);
    state.profile = keep.profile; // przywróć po renderze (finishOnboarding nadpisze)
    state = keep;
  };
  $('#st-export').onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `futureform-${isoToday()}.json`; a.click();
  };
  $('#st-import').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(txt => {
      try { const d = JSON.parse(txt); if (!d.profile) throw 0; state = d; save(); m.classList.add('hidden'); render(); }
      catch { alert(t('err_import')); }
    });
  };
  $('#st-reset').onclick = () => {
    if (confirm(t('s_reset_confirm'))) { localStorage.removeItem(STORE_KEY); state = {}; m.classList.add('hidden'); render(); }
  };
}

// ---------- init ----------
document.querySelectorAll('.nav-btn').forEach(b => b.onclick = () => { view = b.dataset.view; render(); });
$('#btn-settings').onclick = openSettings;
$('#btn-lang').onclick = () => { setLang(LANG === 'pl' ? 'en' : 'pl'); render(); };
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
render();
