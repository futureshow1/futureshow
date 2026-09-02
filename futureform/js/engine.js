// FutureForm — silnik: punktacja wg tabel MON, grupy wiekowe, plan treningowy, adaptacja, dieta.
// Wszystkie czasy w sekundach; pływanie w metrach; ćwiczenia siłowe w powtórzeniach.

const Engine = (() => {

  const GROUP_BOUNDS = [20, 25, 30, 35, 40, 45, 50, 55, Infinity]; // górne granice wieku dla grup 0..8

  function ageGroupIndex(birthYear, testYear) {
    const age = testYear - birthYear; // wg §6 ust. 3: rok kalendarzowy minus rok urodzenia
    for (let i = 0; i < GROUP_BOUNDS.length; i++) if (age <= GROUP_BOUNDS[i]) return i;
    return 8;
  }

  // Kategoria 1 -> tabele "men" niezależnie od płci (zał. 3 obejmuje pkt 1 dla obu płci).
  function tableSex(sex, category) {
    return (String(category) === '1') ? 'men' : (sex === 'F' ? 'women' : 'men');
  }

  // Zdarzenia, w których niższy wynik = lepszy (czasy).
  const LOWER_BETTER = { run3000: true, shuttle10x10: true, koperta: true };

  function colMax(tab, gi) {
    for (const row of tab.results) if (row.p[gi] != null) return row.p[gi];
    return 0;
  }
  function colBestResult(tab, gi) {
    for (const row of tab.results) if (row.p[gi] != null) return row.r;
    return null;
  }
  function colWorstResult(tab, gi) {
    for (let i = tab.results.length - 1; i >= 0; i--) if (tab.results[i].p[gi] != null) return tab.results[i].r;
    return null;
  }

  // Punkty za wynik wg oficjalnej tabeli. Zwraca 0 gdy poniżej tabeli.
  function points(sexKey, event, gi, result) {
    const tab = NORMS[sexKey][event];
    if (!tab || result == null || isNaN(result)) return null;
    const rows = tab.results;
    if (LOWER_BETTER[event]) {
      // wiersze rosnąco (gorzej w dół); zaokrąglij wynik W GÓRĘ do kratki tabeli
      for (const row of rows) {
        if (row.r >= result - 1e-9) {
          if (row.p[gi] != null) return row.p[gi];
          // szybciej niż początek kolumny -> maksimum kolumny
          const best = colBestResult(tab, gi);
          if (best != null && result <= best) return colMax(tab, gi);
          return 0; // wolniej niż koniec kolumny
        }
      }
      return 0;
    } else {
      // wiersze malejąco (mniej w dół); zaokrąglij W DÓŁ (wynik >= wiersza)
      for (const row of rows) {
        if (result >= row.r - 1e-9) {
          if (row.p[gi] != null) return row.p[gi];
          const best = colBestResult(tab, gi);
          if (best != null && result >= best) return colMax(tab, gi);
          return 0;
        }
      }
      return 0;
    }
  }

  function eventMin(sexKey, event) { return NORMS[sexKey][event] ? NORMS[sexKey][event].min : null; }
  function eventMax(sexKey, event, gi) { return NORMS[sexKey][event] ? colMax(NORMS[sexKey][event], gi) : null; }

  // Wynik wymagany dla zadanej liczby punktów (najgorszy wynik dający >= pts).
  function resultForPoints(sexKey, event, gi, pts) {
    const tab = NORMS[sexKey][event];
    if (!tab) return null;
    let best = null;
    for (const row of tab.results) {
      if (row.p[gi] != null && row.p[gi] >= pts - 1e-9) best = row.r;
    }
    return best;
  }

  // Ocena całego sprawdzianu: {events:{ev:{result,pts,min,ok}}, total, grade, pass}
  function scoreTest(profile, config, results) {
    const testYear = new Date(config.testDate || todayISO()).getFullYear();
    const gi = ageGroupIndex(profile.birthYear, testYear);
    const sexKey = tableSex(profile.sex, config.category);
    const out = { events: {}, total: 0, gi, sexKey };
    let allMins = true, any = false;
    for (const ev of config.events) {
      const r = results[ev];
      const p = points(sexKey, ev, gi, r);
      const min = eventMin(sexKey, ev);
      const ok = p != null && p >= min - 1e-9;
      out.events[ev] = { result: r ?? null, pts: p, min, max: eventMax(sexKey, ev, gi), ok };
      if (p != null) { out.total += p; any = true; }
      if (!ok) allMins = false;
    }
    out.total = Math.round(out.total * 10) / 10;
    const th = NORMS.thresholds[String(config.category)] || NORMS.thresholds['4'];
    out.thresholds = th;
    out.grade = !any ? null :
      out.total >= th.bdb ? 5 : out.total >= th.db ? 4 : out.total >= th.dst ? 3 : 2;
    out.pass = any && allMins && out.total >= th.dst;
    return out;
  }

  // ---------- Plan treningowy ----------

  // Deficyty punktowe -> wagi nacisku na konkurencje.
  function emphasis(score, config) {
    const w = {};
    for (const ev of config.events) {
      const e = score.events[ev];
      const gap = Math.max(0, (e.max ?? 0) - (e.pts ?? 0));
      w[ev] = gap + (e.ok ? 0 : 8); // brak minimum = priorytet
    }
    const sum = Object.values(w).reduce((a, b) => a + b, 0) || 1;
    for (const k in w) w[k] = w[k] / sum;
    return w;
  }

  function weeksBetween(fromISO, toISO) {
    return Math.max(0, Math.round((new Date(toISO) - new Date(fromISO)) / (7 * 864e5)));
  }
  function todayISO() { return new Date().toISOString().slice(0, 10); }

  // Typ tygodnia: build / deload (co 4.) / taper (ostatni pełny tydzień przed testem) / test
  function weekType(weekIdx, totalWeeks) {
    if (totalWeeks > 0 && weekIdx >= totalWeeks - 1) return 'taper';
    if ((weekIdx + 1) % 4 === 0) return 'deload';
    return 'build';
  }

  // Recepty na sesje na podstawie aktualnego poziomu (prog) i wyników.
  // prog: {push:{base}, pull:{base}, sit:{base}, run:{paceAdj}, vol}
  function defaultProg(latest) {
    const p = latest?.events || {};
    return {
      pull: { base: Math.max(1, Math.round((p.pullups?.result ?? 3) || 1)) },
      push: { base: Math.max(4, Math.round((p.pushups?.result ?? 15) * 0.6) || 8) },
      sit:  { base: Math.max(8, Math.round((p.situps?.result ?? 30) * 0.45) || 12) },
      run:  { t3000: p.run3000?.result ?? 1080, paceAdj: 0 },
      agi:  { best: p.shuttle10x10?.result ?? p.koperta?.result ?? null },
      vol: 1.0
    };
  }

  function fmtTime(sec) {
    if (sec == null || isNaN(sec)) return '–';
    sec = Math.round(sec);
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  // Buduje sesję danego typu. Zwraca {kind, blocks:[{ex, scheme, note, min}], estMin}
  // min = szacowany czas bloku w minutach (praca + przerwy), estMin = suma + przejścia/rozgrzewka.
  function buildSession(kind, prog, wt, config) {
    const v = (wt === 'deload' ? 0.6 : wt === 'taper' ? 0.5 : 1) * (prog.vol || 1);
    const S = [];
    const add = (ex, scheme, note, min) => S.push({ ex, scheme, note, min: Math.round(min) });
    const pull = prog.pull.base, push = prog.push.base, sit = prog.sit.base;
    const t3000 = prog.run.t3000;
    const pace400 = t3000 != null ? Math.round((t3000 / 7.5) * 0.94) : null; // 400 m ~6% szybciej niż tempo 3 km
    const usesPull = config.events.includes('pullups');
    const usesAgi = config.events.includes('shuttle10x10') ? 'shuttle10x10' : (config.events.includes('koperta') ? 'koperta' : null);

    const round = x => Math.max(1, Math.round(x));
    let overhead = 0; // rozgrzewka/przejścia poza blokami
    if (kind === 'STR_PULL') {
      overhead = 8; // rozgrzewka ogólna + przejścia
      if (usesPull) {
        if (pull >= 3) add('ex_pullups', `${round(5 * v)}×${Math.max(1, Math.floor(pull * 0.55))}`, 'note_rest_pull', round(5 * v) * 2.5);
        else add('ex_negatives', `${round(5 * v)}×3–5`, 'note_negatives', round(5 * v) * 2);
        add('ex_rows', `${round(3 * v)}×8–12`, 'note_rows', round(3 * v) * 2);
        add('ex_hangs', `${round(3 * v)}× max s`, 'note_hangs', round(3 * v) * 1.5);
      } else {
        add('ex_pushups_dense', `${round(5 * v)}×${push}`, 'note_pushpace', round(5 * v) * 2);
        add('ex_pike', `${round(3 * v)}×6–10`, '', round(3 * v) * 2);
      }
      add('ex_situps_int', `${round(3 * v)}× 45 s`, 'note_situps', round(3 * v) * 1.5);
      add('ex_plank', `${round(3 * v)}× 40–60 s`, '', round(3 * v) * 1.5);
    } else if (kind === 'STR_PUSH') {
      overhead = 8;
      add('ex_pushups_dense', `${round(5 * v)}×${push}`, 'note_pushpace', round(5 * v) * 2);
      add('ex_pushups_var', `${round(3 * v)}×8–12`, 'note_pushvar', round(3 * v) * 2);
      if (usesPull) add('ex_pullups_easy', `${round(3 * v)}×${Math.max(1, Math.floor(pull * 0.4))}`, 'note_easy', round(3 * v) * 2);
      add('ex_situps_int', `${round(3 * v)}× 45 s`, 'note_situps', round(3 * v) * 1.5);
      add('ex_hollow', `${round(3 * v)}× 20–30 s`, '', round(3 * v) * 1);
    } else if (kind === 'RUN_INT') {
      overhead = 3;
      const reps = wt === 'deload' ? 4 : wt === 'taper' ? 3 : 6 + Math.min(4, Math.floor((prog.vol - 1) * 10));
      add('ex_warmup_run', '10–12 min', '', 12);
      add('ex_int400', `${reps}× 400 m @ ${fmtTime(pace400)}`, 'note_int_rest', reps * ((pace400 || 100) / 60 + 1.5));
      if (usesAgi) add(usesAgi === 'shuttle10x10' ? 'ex_shuttle' : 'ex_koperta', `${round(4 * v)}× przebieg`, 'note_agility', round(4 * v) * 1.5);
      add('ex_cooldown', '5–10 min', '', 8);
    } else if (kind === 'RUN_TEMPO') {
      overhead = 3;
      const mins = wt === 'deload' ? 15 : wt === 'taper' ? 15 : 25;
      const paceKm = t3000 != null ? fmtTime(Math.round(t3000 / 3 * 1.13)) : '–';
      add('ex_warmup_run', '10 min', '', 10);
      add('ex_tempo', `${mins} min @ ~${paceKm}/km`, 'note_tempo', mins);
      add('ex_strides', '4× 80 m', 'note_strides', 5);
    } else if (kind === 'MOBILITY') {
      overhead = 0;
      add('ex_easy_run', '20–30 min', 'note_easy_run', 25);
      add('ex_mobility', '15 min', 'note_mobility', 15);
    } else if (kind === 'TEST') {
      add('ex_test_full', '', 'note_test', 75);
    }
    const estMin = Math.round((S.reduce((a, b) => a + (b.min || 0), 0) + overhead) / 5) * 5;
    return { kind, blocks: S, estMin };
  }

  // Tygodniowy rozkład wg liczby sesji i nacisku.
  function weekPlan(state) {
    const cfg = state.config, prog = state.prog;
    const start = state.planStart || todayISO();
    const total = weeksBetween(start, cfg.testDate);
    const wk = Math.min(weeksBetween(start, todayISO()), Math.max(0, total));
    const wt = weekType(wk, total);
    const latest = latestScore(state);
    const emph = latest ? emphasis(latest, cfg) : null;
    const n = cfg.sessionsPerWeek || 4;
    // kolejność bazowa; przy dużym deficycie biegu dodatkowa sesja biegowa zamiast STR_PUSH
    let kinds;
    if (n <= 3) kinds = ['STR_PULL', 'RUN_INT', 'STR_PUSH'];
    else if (n === 4) kinds = ['STR_PULL', 'RUN_INT', 'STR_PUSH', 'RUN_TEMPO'];
    else kinds = ['STR_PULL', 'RUN_INT', 'STR_PUSH', 'RUN_TEMPO', 'MOBILITY'];
    if (emph && (emph.run3000 || 0) > 0.45 && n >= 3) {
      kinds = kinds.map(k => k === 'STR_PUSH' ? 'RUN_TEMPO' : k);
      if (!kinds.includes('STR_PULL')) kinds[0] = 'STR_PULL';
    }
    // tydzień retestu co 4 tygodnie (w miejsce ostatniej sesji) oraz tuż przed testem
    const isRetest = wt !== 'taper' && wk > 0 && (wk % 4 === 3);
    if (isRetest) kinds[kinds.length - 1] = 'TEST';
    return { weekIdx: wk, totalWeeks: total, type: wt, emphasis: emph, sessions: kinds.map(k => buildSession(k, prog, wt, cfg)) };
  }

  // Gotowość dzienna -> mnożnik sesji. sleep w h, soreness/energy 1-5.
  function readiness(sleep, soreness, energy) {
    let sc = 0;
    sc += sleep >= 7 ? 2 : sleep >= 6 ? 1 : 0;
    sc += energy >= 4 ? 2 : energy >= 3 ? 1 : 0;
    sc += soreness <= 2 ? 2 : soreness <= 3 ? 1 : 0;
    if (sc >= 5) return { level: 'full', factor: 1.0 };
    if (sc >= 3) return { level: 'reduced', factor: 0.7 };
    return { level: 'recovery', factor: 0.4 };
  }

  // Adaptacja po zalogowanej sesji: performedRatio = wykonane/zaplanowane (0..1+), rpe 1-10.
  function adapt(prog, kind, performedRatio, rpe) {
    const p = JSON.parse(JSON.stringify(prog));
    const upd = (obj, key, upFactor, downFactor) => {
      if (performedRatio >= 0.98 && rpe <= 7) obj[key] = Math.max(1, Math.round(obj[key] * upFactor));
      else if (performedRatio < 0.8 || rpe >= 9.5) obj[key] = Math.max(1, Math.round(obj[key] * downFactor));
    };
    if (kind === 'STR_PULL') { upd(p.pull, 'base', 1.08, 0.9); upd(p.sit, 'base', 1.06, 0.92); }
    if (kind === 'STR_PUSH') { upd(p.push, 'base', 1.07, 0.9); upd(p.sit, 'base', 1.06, 0.92); }
    if (kind === 'RUN_INT' || kind === 'RUN_TEMPO') {
      if (performedRatio >= 0.98 && rpe <= 7) p.run.t3000 = Math.max(600, Math.round(p.run.t3000 * 0.995));
      else if (performedRatio < 0.8) p.run.t3000 = Math.round(p.run.t3000 * 1.005);
    }
    // globalna objętość wg zgodności
    if (performedRatio >= 0.95 && rpe <= 8) p.vol = Math.min(1.4, (p.vol || 1) + 0.02);
    else if (performedRatio < 0.7) p.vol = Math.max(0.7, (p.vol || 1) - 0.05);
    return p;
  }

  // Tygodniowy przegląd zgodności: compliance = wykonane sesje / plan.
  function weeklyReview(state) {
    const wkAgo = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
    const done = (state.sessions || []).filter(s => s.date >= wkAgo && s.performedRatio != null);
    const planned = state.config.sessionsPerWeek || 4;
    const compliance = Math.min(1, done.length / planned);
    const avgRpe = done.length ? done.reduce((a, s) => a + (s.rpe || 6), 0) / done.length : null;
    let advice = 'review_ok';
    if (compliance < 0.5) advice = 'review_low';
    else if (compliance < 0.75) advice = 'review_mid';
    else if (avgRpe != null && avgRpe >= 8.5) advice = 'review_hard';
    return { compliance, avgRpe, done: done.length, planned, advice };
  }

  function latestScore(state) {
    const tests = state.tests || [];
    if (!tests.length) return null;
    const t = tests[tests.length - 1];
    return scoreTest(state.profile, state.config, t.results);
  }

  // ---------- Zdrowie / dieta ----------

  function bmr(profile) { // Mifflin-St Jeor
    const { weight, height, birthYear, sex } = profile;
    const age = new Date().getFullYear() - birthYear;
    return Math.round(10 * weight + 6.25 * height - 5 * age + (sex === 'F' ? -161 : 5));
  }
  const ACTIVITY = { low: 1.35, mid: 1.55, high: 1.75 };
  function tdee(profile) { return Math.round(bmr(profile) * (ACTIVITY[profile.activity] || 1.55)); }
  function dietTargets(profile) {
    const t = tdee(profile);
    const goal = profile.dietGoal || 'maintain';
    const kcal = goal === 'cut' ? Math.round(t * 0.85) : goal === 'gain' ? Math.round(t * 1.1) : t;
    const protein = Math.round(profile.weight * (goal === 'cut' ? 2.0 : 1.7));
    return { tdee: t, kcal, protein, fatMin: Math.round(profile.weight * 0.8), waterL: Math.round(profile.weight * 35 / 100) / 10 };
  }
  function bmi(profile) { const h = profile.height / 100; return Math.round(profile.weight / (h * h) * 10) / 10; }

  return { ageGroupIndex, tableSex, points, eventMin, eventMax, resultForPoints, scoreTest,
           weekPlan, buildSession, defaultProg, readiness, adapt, weeklyReview, latestScore,
           emphasis, weekType, weeksBetween, todayISO, fmtTime, bmr, tdee, dietTargets, bmi, LOWER_BETTER };
})();
