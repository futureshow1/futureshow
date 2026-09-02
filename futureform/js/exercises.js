// FutureForm — biblioteka ćwiczeń: animowane SVG (SMIL) + opisy techniki PL/EN.
// Każde ćwiczenie: {anim: <typ animacji>, desc:{pl,en}, cues:{pl,en}}

const EXVIZ = (() => {
  // wspólne elementy rysunkowe
  const NS = 'http://www.w3.org/2000/svg';
  const head = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor"/>`;
  const L = (x1, y1, x2, y2, w = 3.4) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round"/>`;
  const wrap = (inner, vb = '0 0 120 90') => `<svg viewBox="${vb}" xmlns="${NS}" class="exviz" aria-hidden="true">${inner}</svg>`;
  const bar = `<line x1="18" y1="14" x2="102" y2="14" stroke="var(--acc)" stroke-width="4" stroke-linecap="round"/>${L(24, 14, 24, 4)}${L(96, 14, 96, 4)}`;
  const floor = `<line x1="8" y1="82" x2="112" y2="82" stroke="var(--acc)" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;

  // Podciąganie: sylwetka jedzie w górę/dół pod drążkiem
  function pullup(dur = '2.6s', up = -20) {
    const body = head(60, 40) + L(60, 45, 60, 62) + L(60, 62, 53, 76) + L(60, 62, 67, 76) +
      L(60, 47, 46, 16) + L(60, 47, 74, 16);
    return wrap(`${bar}<g>${body}<animateTransform attributeName="transform" type="translate"
      values="0 0; 0 ${up}; 0 ${up}; 0 0; 0 0" keyTimes="0;.35;.5;.85;1" dur="${dur}" repeatCount="indefinite"/></g>`);
  }
  // Negatywy: szybki start na górze, wolne opuszczanie
  function negative() {
    const body = head(60, 40) + L(60, 45, 60, 62) + L(60, 62, 53, 76) + L(60, 62, 67, 76) +
      L(60, 47, 46, 16) + L(60, 47, 74, 16);
    return wrap(`${bar}<g>${body}<animateTransform attributeName="transform" type="translate"
      values="0 -20; 0 -20; 0 0; 0 -20" keyTimes="0;.15;.85;1" dur="3.4s" repeatCount="indefinite"/></g>`);
  }
  // Zwis: statyczny z minimalnym wahnięciem
  function hang() {
    const body = head(60, 34) + L(60, 39, 60, 60) + L(60, 60, 55, 76) + L(60, 60, 65, 76) +
      L(60, 41, 48, 16) + L(60, 41, 72, 16);
    return wrap(`${bar}<g>${body}<animateTransform attributeName="transform" type="rotate"
      values="-2 60 14; 2 60 14; -2 60 14" dur="3s" repeatCount="indefinite"/></g>`);
  }
  // Wiosłowanie poziome pod niskim drążkiem
  function row() {
    const lowbar = `<line x1="30" y1="34" x2="90" y2="34" stroke="var(--acc)" stroke-width="4" stroke-linecap="round"/>${L(34, 34, 30, 82)}${L(86, 34, 90, 82)}`;
    const body = `<g>${head(42, 58)}${L(48, 60, 78, 66)}${L(78, 66, 92, 78)}${L(50, 60, 56, 38)}
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -16; 0 0" dur="2.4s" repeatCount="indefinite"/></g>`;
    return wrap(`${floor}${lowbar}${body}`);
  }
  // Pompka: tułów obraca się wokół stóp
  function pushup(hands = 'normal') {
    const handMark = hands === 'diamond' ? `<path d="M40 78 l5 -5 l5 5 l-5 5 z" fill="var(--acc)"/>` :
      hands === 'wide' ? `${L(34, 78, 34, 72)}${L(52, 78, 52, 72)}` : '';
    return wrap(`${floor}${handMark}<g>
      ${head(30, 56, 5)}${L(35, 58, 74, 66)}${L(74, 66, 96, 74)}${L(38, 60, 40, 80)}
      <animateTransform attributeName="transform" type="rotate" values="0 96 76; 11 96 76; 0 96 76" dur="2.2s" repeatCount="indefinite"/></g>`);
  }
  // Pike: biodra wysoko, głowa nisko
  function pike() {
    return wrap(`${floor}<g>${head(38, 66, 5)}${L(42, 64, 62, 40)}${L(62, 40, 88, 76)}${L(40, 66, 36, 80)}
      <animateTransform attributeName="transform" type="rotate" values="0 88 76; 8 88 76; 0 88 76" dur="2.4s" repeatCount="indefinite"/></g>`);
  }
  // Skłony: tułów unosi się z leżenia do kolan (obrót zgodny z osią Y w dół = dodatni kąt unosi lewy koniec)
  function situp() {
    const legs = L(72, 74, 84, 60) + L(84, 60, 96, 76);
    return wrap(`${floor}${legs}<g>${head(30, 70, 5)}${L(36, 72, 72, 74)}
      <animateTransform attributeName="transform" type="rotate" values="0 72 74; 55 72 74; 55 72 74; 0 72 74" keyTimes="0;.4;.55;1" dur="2.2s" repeatCount="indefinite"/></g>`);
  }
  // Deska: statyczna, lekki "oddech"
  function plank() {
    return wrap(`${floor}<g>${head(28, 62, 5)}${L(34, 64, 76, 66)}${L(76, 66, 98, 78)}${L(36, 66, 34, 80)}${L(38, 66, 42, 80)}
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -1.5; 0 0" dur="2.6s" repeatCount="indefinite"/></g>`);
  }
  // Hollow body: łódka, delikatne bujanie
  function hollow() {
    return wrap(`${floor}<g>${head(34, 58, 5)}<path d="M38 62 Q60 76 88 56" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>${L(40, 60, 50, 46)}
      <animateTransform attributeName="transform" type="rotate" values="-3 60 70; 3 60 70; -3 60 70" dur="2.2s" repeatCount="indefinite"/></g>`);
  }
  // Bieg: nogi i ręce wahadłowo; speed: dur w sekundach
  function run(dur = 0.7) {
    return wrap(`${floor}
      <g>${head(60, 30)}${L(60, 35, 58, 54)}
        <g>${L(58, 54, 48, 70)}${L(48, 70, 52, 80)}<animateTransform attributeName="transform" type="rotate" values="-28 58 54; 30 58 54; -28 58 54" dur="${dur}s" repeatCount="indefinite"/></g>
        <g>${L(58, 54, 68, 70)}${L(68, 70, 64, 80)}<animateTransform attributeName="transform" type="rotate" values="30 58 54; -28 58 54; 30 58 54" dur="${dur}s" repeatCount="indefinite"/></g>
        <g>${L(60, 39, 50, 50)}<animateTransform attributeName="transform" type="rotate" values="26 60 39; -30 60 39; 26 60 39" dur="${dur}s" repeatCount="indefinite"/></g>
        <g>${L(60, 39, 70, 50)}<animateTransform attributeName="transform" type="rotate" values="-30 60 39; 26 60 39; -30 60 39" dur="${dur}s" repeatCount="indefinite"/></g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="${dur / 2}s" repeatCount="indefinite"/>
      </g>`);
  }
  // Wahadłowy 10x10: punkt biega między pachołkami
  function shuttle() {
    const cone = x => `<path d="M${x - 5} 78 l5 -10 l5 10 z" fill="var(--acc)"/>`;
    return wrap(`${floor}${cone(20)}${cone(100)}
      <g>${head(0, 62, 5)}${L(0, 67, 0, 76)}
        <animateTransform attributeName="transform" type="translate" values="24 0; 96 0; 24 0" keyTimes="0;.5;1" dur="1.6s" repeatCount="indefinite"/></g>`);
  }
  // Koperta: punkt sunie po obwiedni koperty 3x5 m
  function koperta() {
    const rect = `<rect x="30" y="22" width="60" height="48" fill="none" stroke="var(--acc)" stroke-width="2.5" opacity=".8"/>
      ${L(30, 22, 90, 70, 2)}${L(90, 22, 30, 70, 2)}`;
    return wrap(`${rect}<circle r="5" fill="currentColor">
      <animateMotion dur="3.2s" repeatCount="indefinite" path="M30 70 L30 22 L90 70 L90 22 L60 46 L30 70"/></circle>`);
  }
  // Mobilność: krążenie ramion
  function mobility() {
    return wrap(`${floor}${head(60, 28)}${L(60, 33, 60, 62)}${L(60, 62, 52, 80)}${L(60, 62, 68, 80)}
      <g>${L(60, 40, 78, 40)}<animateTransform attributeName="transform" type="rotate" from="0 60 40" to="360 60 40" dur="2.4s" repeatCount="indefinite"/></g>`);
  }
  // Stoper — sprawdzian
  function stopwatch() {
    return wrap(`<circle cx="60" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="3.5"/>
      ${L(52, 16, 68, 16, 4)}${L(60, 16, 60, 24, 3)}
      <g>${L(60, 50, 60, 32, 3)}<animateTransform attributeName="transform" type="rotate" from="0 60 50" to="360 60 50" dur="4s" repeatCount="indefinite"/></g>
      <circle cx="60" cy="50" r="3.5" fill="var(--acc)"/>`);
  }
  return { pullup, negative, hang, row, pushup, pike, situp, plank, hollow, run, shuttle, koperta, mobility, stopwatch };
})();

// Mapa: klucz ćwiczenia -> generator wizualizacji
const EXANIM = {
  ex_pullups: () => EXVIZ.pullup('2.6s'),
  ex_pullups_easy: () => EXVIZ.pullup('3.4s', -18),
  ex_negatives: () => EXVIZ.negative(),
  ex_hangs: () => EXVIZ.hang(),
  ex_rows: () => EXVIZ.row(),
  ex_pushups_dense: () => EXVIZ.pushup(),
  ex_pushups_var: () => EXVIZ.pushup('diamond'),
  ex_pike: () => EXVIZ.pike(),
  ex_situps_int: () => EXVIZ.situp(),
  ex_plank: () => EXVIZ.plank(),
  ex_hollow: () => EXVIZ.hollow(),
  ex_warmup_run: () => EXVIZ.run(0.9),
  ex_easy_run: () => EXVIZ.run(1.0),
  ex_int400: () => EXVIZ.run(0.5),
  ex_tempo: () => EXVIZ.run(0.65),
  ex_strides: () => EXVIZ.run(0.45),
  ex_cooldown: () => EXVIZ.run(1.1),
  ex_shuttle: () => EXVIZ.shuttle(),
  ex_koperta: () => EXVIZ.koperta(),
  ex_mobility: () => EXVIZ.mobility(),
  ex_test_full: () => EXVIZ.stopwatch()
};

// Opisy techniki + wskazówki. Zwięzłe, eksperckie.
const EXINFO = {
  ex_pullups: {
    pl: { d: 'Zwis nachwytem na szerokość barków, ramiona wyprostowane. Ściągnij łopatki w dół, potem ciągnij łokcie do żeber, aż broda znajdzie się nad drążkiem (na sprawdzianie: powyżej prężnika). Opuść się kontrolowanie do pełnego wyprostu.', c: ['pełny wyprost na dole — tak liczy egzaminator', 'bez bujania i „kipowania"', 'napnij brzuch i pośladki: ciało jak deska'] },
    en: { d: 'Overhand grip at shoulder width, arms straight. Set shoulder blades down, then drive elbows toward your ribs until the chin clears the bar. Lower under control to a full hang.', c: ['full extension at the bottom — that\'s what counts', 'no swinging or kipping', 'brace abs and glutes: body like a plank'] }
  },
  ex_negatives: {
    pl: { d: 'Wskocz (lub wejdź z podestu) do pozycji z brodą nad drążkiem i opuszczaj się możliwie wolno — 3–5 sekund. To najszybsza droga do pierwszego podciągnięcia: budujesz siłę dokładnie w tym samym ruchu.', c: ['licz w głowie do 4–5 podczas opuszczania', 'walcz szczególnie w ostatniej fazie', 'przerwij serię, gdy opadasz szybciej niż 2 s'] },
    en: { d: 'Jump (or step) up to chin-over-bar and lower yourself as slowly as possible — 3–5 seconds. The fastest road to a first pull-up: you build strength in the exact movement.', c: ['count to 4–5 on the way down', 'fight hardest in the final phase', 'end the set when you drop faster than 2 s'] }
  },
  ex_rows: {
    pl: { d: 'Pod niskim drążkiem lub solidnym stołem: chwyt, ciało proste jak deska, pięty na podłodze. Ciągnij klatkę do drążka, ściągając łopatki, i wróć kontrolowanie. Poziomy ciąg równoważy pracę i chroni barki.', c: ['biodra w linii — nie wypinaj ich w górę', 'im bardziej poziomo, tym trudniej', '2 s w górę, 2 s w dół'] },
    en: { d: 'Under a low bar or sturdy table: grip, body straight like a plank, heels on the floor. Pull your chest to the bar, squeezing shoulder blades, and return under control. Horizontal pulling balances the work and protects shoulders.', c: ['hips in line — don\'t pike up', 'the more horizontal, the harder', '2 s up, 2 s down'] }
  },
  ex_hangs: {
    pl: { d: 'Zwis na wyprostowanych ramionach, łopatki lekko ściągnięte w dół, nogi spokojnie. Trzymaj do granicy pewnego chwytu. Silny chwyt to fundament podciągania i często pierwszy słaby punkt.', c: ['oddychaj normalnie', 'nie wzruszaj barków do uszu', 'schodź, zanim chwyt puści gwałtownie'] },
    en: { d: 'Hang on straight arms, shoulder blades gently pulled down, legs quiet. Hold to the limit of a confident grip. Grip strength is the foundation of pull-ups and often the first weak point.', c: ['breathe normally', 'don\'t shrug shoulders to ears', 'come down before the grip fails abruptly'] }
  },
  ex_pushups_dense: {
    pl: { d: 'Podpór przodem, dłonie pod barkami, ciało napięte w jednej linii. Zejdź, aż klatka niemal dotknie podłoża (na sprawdzianie: na ławeczce, pełne ugięcie i wyprost), i dynamicznie wróć. Serie „gęstościowe": stała liczba powtórzeń, krótkie przerwy.', c: ['łokcie ~45° od tułowia, nie na boki', 'biodra nie opadają ani nie uciekają w górę', 'pełny wyprost ramion na górze'] },
    en: { d: 'Front support, hands under shoulders, body braced in one line. Lower until the chest nearly touches (on the test: full bend and lockout on the bench), then press back up. Density sets: fixed reps, short rests.', c: ['elbows ~45° from the torso, not flared', 'hips neither sag nor pike', 'full lockout at the top'] }
  },
  ex_pushups_var: {
    pl: { d: 'Wariant pompki celujący w słabsze ogniwo: diamentowe (dłonie razem — triceps) lub szerokie (klatka). Technika jak w pompce klasycznej: ciało sztywne, pełny zakres.', c: ['wybierz wariant, który idzie Ci gorzej', 'zakres ważniejszy niż liczba', 'wolniej = więcej efektu'] },
    en: { d: 'A push-up variant targeting your weaker link: diamond (hands together — triceps) or wide (chest). Technique as in the classic push-up: rigid body, full range.', c: ['pick the variant you\'re worse at', 'range beats rep count', 'slower = more effect'] }
  },
  ex_pullups_easy: {
    pl: { d: 'Podciąganie z dużym zapasem (ok. 40% maksimum) — idealne powtórzenia techniczne. Uczysz układ nerwowy wzorca, nie zbierając zmęczenia.', c: ['każde powtórzenie jak wzorcowe', 'daleko od upadku mięśniowego', 'zatrzymaj się na 1 s z brodą nad drążkiem'] },
    en: { d: 'Pull-ups with a big reserve (about 40% of max) — perfect technical reps. You teach the nervous system the pattern without accumulating fatigue.', c: ['every rep textbook quality', 'far from muscular failure', 'pause 1 s with chin over the bar'] }
  },
  ex_pike: {
    pl: { d: 'Z podporu unieś biodra wysoko (odwrócone „V") i uginaj ramiona, kierując głowę ku podłodze między dłońmi. Buduje siłę barków — pomost między pompką a trudniejszymi wariantami.', c: ['ciężar nad dłońmi, pięty mogą się unieść', 'głowa przed linię dłoni, nie na nie', 'łokcie do tyłu, nie na boki'] },
    en: { d: 'From a push-up position lift your hips high (inverted "V") and bend the arms, lowering your head toward the floor between the hands. Builds shoulder strength — a bridge from push-ups to harder variants.', c: ['weight over the hands, heels may lift', 'head ahead of the hand line, not onto it', 'elbows back, not flared'] }
  },
  ex_situps_int: {
    pl: { d: 'Leżenie tyłem, nogi ugięte (na sprawdzianie stopy przytrzymane, palce splecione za głową). Skłon do dotknięcia łokciami kolan, powrót łopatkami do materaca. Interwały 45 s pracy / 45 s przerwy uczą tempa z testu.', c: ['rytm równy jak metronom — nie zrywami', 'nie szarp karku rękami', 'wydech przy skłonie'] },
    en: { d: 'Lying on your back, knees bent (on the test: feet held, fingers laced behind the head). Sit up to touch elbows to knees, return shoulder blades to the mat. 45 s work / 45 s rest intervals teach the test\'s pace.', c: ['metronome-even rhythm — no bursts', 'don\'t yank the neck with your hands', 'exhale on the way up'] }
  },
  ex_plank: {
    pl: { d: 'Podpór na przedramionach, łokcie pod barkami, ciało w idealnej linii od głowy do pięt. Napnij brzuch i pośladki, jakbyś spodziewał się lekkiego uderzenia.', c: ['miednica lekko podwinięta', 'nie zadzieraj głowy', 'gdy forma siada — zakończ serię'] },
    en: { d: 'Forearm support, elbows under shoulders, body in a perfect line head to heels. Brace abs and glutes as if expecting a light punch.', c: ['pelvis slightly tucked', 'don\'t crane the neck', 'when form breaks — end the set'] }
  },
  ex_hollow: {
    pl: { d: 'Leżenie tyłem: lędźwie dociśnięte do podłogi, ramiona i nogi uniesione nisko nad ziemię, ciało w kształcie łódki. Fundament sztywnego tułowia — przenosi się na podciąganie i pompki.', c: ['lędźwie przyklejone do podłogi cały czas', 'im niżej nogi, tym trudniej', 'skracaj dźwignię, gdy lędźwie odchodzą'] },
    en: { d: 'On your back: lower back pressed into the floor, arms and legs raised just off the ground, body shaped like a shallow boat. The foundation of a rigid trunk — carries over to pull-ups and push-ups.', c: ['lower back glued to the floor at all times', 'the lower the legs, the harder', 'shorten the lever if the lower back lifts'] }
  },
  ex_warmup_run: {
    pl: { d: 'Trucht narastający: zacznij bardzo spokojnie, w ostatnich minutach dołóż 2–3 kilkudziesięciometrowe przebieżki. Rozgrzewka podnosi temperaturę mięśni i przygotowuje stawy — nie omijaj jej przed interwałami.', c: ['pierwsze minuty naprawdę wolno', 'krążenia ramion i bioder w trakcie', 'zakończ gotowy, nie zmęczony'] },
    en: { d: 'Progressive jog: start very easy, add 2–3 short strides in the final minutes. The warm-up raises muscle temperature and prepares joints — never skip it before intervals.', c: ['first minutes genuinely slow', 'arm and hip circles along the way', 'finish ready, not tired'] }
  },
  ex_int400: {
    pl: { d: 'Powtórzenia 400 m w tempie wyraźnie szybszym niż docelowe tempo na 3 km, z truchtem 90 s między nimi. To główne narzędzie poprawy czasu marszobiegu: uczysz organizm biec szybciej, niż wymaga test.', c: ['równe czasy okrążeń — ostatnie jak pierwsze', 'jeśli zwalniasz >3 s, wydłuż przerwę, nie tempo', 'kadencja wysoka, krok lekki'] },
    en: { d: '400 m repeats clearly faster than your target 3 km pace, with a 90 s jog between. The main tool for improving the run time: you teach the body to run faster than the test demands.', c: ['even splits — last rep like the first', 'if you slow >3 s, lengthen the rest, not the pace', 'high cadence, light step'] }
  },
  ex_tempo: {
    pl: { d: 'Bieg ciągły w tempie „komfortowo ciężkim" — na granicy, przy której możesz wypowiadać pojedyncze słowa. Podnosi próg, dzięki któremu tempo testowe staje się łatwiejsze.', c: ['start zbyt wolny > start zbyt szybki', 'oddech w rytmie 2:2', 'to nie wyścig — zostaw rezerwę'] },
    en: { d: 'Continuous run at a "comfortably hard" pace — right at the edge where single words are possible. Raises the threshold that makes test pace feel easier.', c: ['starting too slow beats too fast', 'breathe in a 2:2 rhythm', 'not a race — keep a reserve'] }
  },
  ex_strides: {
    pl: { d: 'Luźne, płynne przyspieszenia na ~80 m: rozpędź się do ~90% sprintu, utrzymaj kilka sekund, wybiegnij. Poprawiają technikę i ekonomię biegu bez kosztu zmęczenia.', c: ['to płynność, nie sprint z bloków', 'wysokie biodra, spojrzenie daleko', 'pełna swoboda ramion'] },
    en: { d: 'Relaxed, flowing accelerations over ~80 m: build to ~90% of a sprint, hold a few seconds, coast out. They improve mechanics and running economy at almost no fatigue cost.', c: ['flow, not a block start', 'tall hips, gaze far ahead', 'arms fully relaxed'] }
  },
  ex_easy_run: {
    pl: { d: 'Bieg (lub marszobieg) w tempie rozmowy. Buduje bazę tlenową i przyspiesza regenerację — jego jedynym błędem może być zbyt szybkie tempo.', c: ['rozmowa pełnymi zdaniami możliwa cały czas', 'gdy tętno rośnie — maszeruj', 'regularność > dystans'] },
    en: { d: 'A run (or run-walk) at conversation pace. Builds the aerobic base and speeds recovery — the only way to do it wrong is too fast.', c: ['full sentences possible throughout', 'heart rate climbing — walk', 'consistency > distance'] }
  },
  ex_cooldown: {
    pl: { d: 'Kilka minut truchtu przechodzącego w marsz, potem spokojne rozciąganie łydek, ud i bioder. Łagodne wyjście z wysiłku wspiera regenerację.', c: ['tętno ma zejść stopniowo', 'rozciąganie statyczne dopiero teraz', '30 s na partię wystarczy'] },
    en: { d: 'A few minutes of jog fading into a walk, then easy stretching of calves, thighs and hips. A gentle exit from effort supports recovery.', c: ['let the heart rate fall gradually', 'static stretching only now', '30 s per muscle group is enough'] }
  },
  ex_shuttle: {
    pl: { d: 'Bieg wahadłowy 10×10 m: sprint do linii, dotknięcie/przekroczenie, zwrot i powrót — dziesięć odcinków. O wyniku decyduje technika zwrotu: niskie wejście, zatrzymanie na zewnętrznej nodze, dynamiczne wyjście.', c: ['ostatnie 2 kroki krótkie, biodra nisko', 'zwrot zawsze w tę samą stronę? ćwicz obie', 'wyjście z zwrotu = pierwsze 3 kroki agresywne'] },
    en: { d: '10×10 m shuttle: sprint to the line, touch/cross, turn and return — ten lengths. The turn decides the result: enter low, brake on the outside leg, exit explosively.', c: ['last 2 steps short, hips low', 'always turning one way? train both', 'first 3 steps out of the turn aggressive'] }
  },
  ex_koperta: {
    pl: { d: 'Bieg po kopercie (prostokąt 3×5 m z przekątnymi): trasa jak na sprawdzianie, trzy okrążenia. Trenuj płynne wchodzenie w skosy i mijanie chorągiewek bez szerokich łuków.', c: ['tnij trasę ciasno przy chorągiewkach', 'krótkie kroki w zwrotach', 'zapamiętaj sekwencję — błąd trasy = powtórka próby'] },
    en: { d: 'The "envelope" run (3×5 m rectangle with diagonals): the exact test route, three laps. Train smooth entries into the diagonals and tight flag passes without wide arcs.', c: ['cut tight at the flags', 'short steps in the turns', 'memorize the sequence — a route error voids the attempt'] }
  },
  ex_mobility: {
    pl: { d: 'Zestaw krążeń i rozciągania dynamicznego: barki, biodra, nadgarstki, grzbiet (koci grzbiet, wypady z rotacją, wieszanie się na drążku). Utrzymuje zakresy, których wymagają podciąganie i pompki.', c: ['ruch płynny, bez sprężynowania', 'większy zakres z każdym powtórzeniem', 'idealne na dzień „niby-wolny"'] },
    en: { d: 'A set of circles and dynamic stretches: shoulders, hips, wrists, spine (cat-camel, rotational lunges, bar hangs). Maintains the ranges pull-ups and push-ups demand.', c: ['smooth movement, no bouncing', 'a little more range each rep', 'perfect for a "sort-of rest" day'] }
  },
  ex_test_full: {
    pl: { d: 'Pełny sprawdzian próbny w kolejności testowej, po rozgrzewce, z realnymi przerwami. To punkt kalibracji: wynik wpisz w zakładce Test — plan przeliczy się na jego podstawie.', c: ['warunki jak najbliższe egzaminowi', 'zmierz uczciwie — plan działa na prawdzie', 'dzień wcześniej: lekko albo wcale'] },
    en: { d: 'A full mock test in test order, warmed up, with realistic rests. This is the calibration point: enter results in the Test tab — the plan recalculates from them.', c: ['conditions as close to exam day as possible', 'measure honestly — the plan runs on truth', 'the day before: easy or nothing'] }
  }
};
