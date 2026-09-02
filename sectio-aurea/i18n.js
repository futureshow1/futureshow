/* SECTIO AUREA — warstwa językowa PL/EN. Drop-in: <script src="i18n.js"></script> (auto).
   Słownik PL→EN + obserwator DOM (tłumaczy też treść budowaną dynamicznie). Język w localStorage.
   Przełącznik dokłada menu.js (window.I18N.set). Ta sama architektura obsłuży później wersję DUDE. */
(function(){
"use strict";
const KEY='sectioAurea.lang';
let lang=(function(){try{return localStorage.getItem(KEY)||'pl'}catch(e){return 'pl'}})();

/* ---------- słownik (PL → EN). Rozbudowywany przebieg po przebiegu. ---------- */
const D={
// wspólny interfejs / chrome
"☰ Komnaty":"☰ Chambers","Komnaty":"Chambers","Nawigacja":"Navigation","Komnaty · 12":"Chambers · 12",
"Dwunastościan":"Dodecahedron","nawigator 3D":"3D navigator","Atlas":"Atlas","lista i lektura":"list & reading",
"Filary":"Pillars","ośmiu myślicieli":"eight thinkers","Skarbiec":"Treasury","złoto · rangi · odznaki":"gold · ranks · badges",
"wkrótce":"soon","Menu komnat":"Chamber menu","zamknij":"close",
// tytuły stron / meta (SEO) — komnaty i Filary obsługuje RX
"SECTIO AUREA · Dwunastościan-nawigator":"SECTIO AUREA · Dodecahedron Navigator",
"SECTIO AUREA · Interaktywny atlas Złotej Liczby Matili Ghyki":"SECTIO AUREA · An Interactive Atlas of Matila Ghyka's Golden Number",
"Złota Liczba Matili Ghyki — i poza nią. Interaktywny atlas, w którym rygor matematyczny oddzielono od romantycznej numerologii.":"Matila Ghyka's Golden Number — and beyond. An interactive atlas in which mathematical rigour is separated from romantic numerology.",
// nazwy komnat
"Liczba":"Number","Proporcja":"Proportion","Pentada":"Pentad","Bryły":"Solids","Ciało":"Body","Świątynia":"Temple",
"Eurytmia":"Eurythmy","Słowo":"Word","Ogród":"Garden","Loża":"Lodge","Nauka":"Science","Probierz":"Touchstone",
// podtytuły komnat (menu)
"Tetraktys · audio":"Tetractys · audio","Odkryj φ":"Discover φ","Pentagram · quasikryształ":"Pentagram · quasicrystal",
"Bryły platońskie 3D":"Platonic solids 3D","Witruwiusz · Modulor":"Vitruvius · Modulor","Partenon · Hambidge":"Parthenon · Hambidge",
"Botticelli · Dürer":"Botticelli · Dürer","Rytmy mowy":"Rhythms of speech","Złoty kąt 137,5°":"Golden angle 137.5°",
"Przekaz wiedzy 3D":"Transmission of knowledge · 3D","Schrödinger · Bergson":"Schrödinger · Bergson","Kamień probierczy · gra":"Touchstone · game",
// Skarbiec (progress.js)
"złota":"gold","Ranga loży:":"Lodge rank:","wyzeruj postęp":"reset progress","← do nawigatora":"← to navigator",
"Najwyższa ranga osiągnięta — Wielki Mistrz.":"Highest rank reached — Grand Master.",
"Nowa komnata":"New chamber","Wyzerować całe zebrane złoto i odznaki?":"Reset all collected gold and badges?",
// rangi
"Profan":"Profane","Adept":"Adept","Uczeń":"Apprentice","Czeladnik":"Journeyman","Mistrz":"Master","Wielki Mistrz":"Grand Master",
// odznaki
"Geometra":"Geometer","Komplet w Próbie Brył":"Full marks in the Solids quiz",
"Pitagorejczyk":"Pythagorean","Prześledzony cały przekaz Loży":"Traced the whole Lodge transmission",
"Złotnik":"Goldsmith","Zbadane wszystkie mity w Probierzu":"Assayed every myth in the Touchstone",
"Sceptyk":"Skeptic","Wszystkie werdykty trafione":"All verdicts correct",
"Ogrodnik":"Gardener","Znaleziony złoty kąt 137,5°":"Found the golden angle 137.5°",
"Mistrz konsonansu":"Master of consonance","Wysłuchane pitagorejskie interwały":"Heard the Pythagorean intervals",
"Odkrywca":"Discoverer","Samodzielnie odkryte φ (x² = x + 1)":"Discovered φ yourself (x² = x + 1)",
"Pielgrzym":"Pilgrim","Odwiedzone wszystkie komnaty":"Visited every chamber",
// nawigator (index.html)
"dwunastościan · nawigator":"dodecahedron · navigator","Wejdź przez bryłę Φ":"Enter through the solid Φ",
"Dwanaście komnat, jedna bryła":"Twelve chambers, one solid",
"Każdy z 12 pięciokątów niesie złoty podział. Obróć kosmos i wybierz drogę.":"Each of the 12 pentagons carries the golden section. Turn the cosmos and choose your path.",
"Najedź na ścianę":"Hover a face","Atlas (lista) →":"Atlas (list) →",
"Dwunastościan to nawigator portalu — 12 ścian odpowiada 12 komnatom traktatu Ghyki.":"The dodecahedron is the portal's navigator — 12 faces map to 12 chambers of Ghyka's treatise.",
"Przeciągnij — obróć":"Drag to rotate","Kliknij ścianę — wejdź":"Click a face to enter",
"składam dwunastościan":"assembling the dodecahedron","GRYWALNE →":"PLAYABLE →","wkrótce…":"soon…",
"Konstelacja przekazu":"Transmission constellation",
"Pitagorejski rdzeń":"Pythagorean core","Budowniczowie":"Builders","Ezoteryka":"Esotericism",
"Ogniwo przekazu":"Link of transmission","Filar / przewodnik":"Pillar / guide",
// nawigator — pełne linie komnat (karta)
"Tetraktys i harmonia liczb — pitagorejskie sacrum 1+2+3+4=10.":"The tetractys and the harmony of number — the Pythagorean sacred 1+2+3+4=10.",
"Boska proporcja: φ, złoty prostokąt, liczba która zawiera siebie.":"The divine proportion: φ, the golden rectangle, the number that contains itself.",
"Pentagram — figura życia. Nieskończony zoom w samopodobieństwo.":"The pentagram — figure of life. An infinite zoom into self-similarity.",
"Pięć brył platońskich i trzy złote prostokąty w dwudziestościanie.":"The five Platonic solids and three golden rectangles inside the icosahedron.",
"Człowiek Witruwiański, kanon Zeisinga, Modulor — i jego krytyka.":"Vitruvian Man, Zeising's canon, the Modulor — and its critique.",
"Partenon, Notre-Dame, prostokąty dynamiczne Hambidge’a.":"The Parthenon, Notre-Dame, Hambidge's dynamic rectangles.",
"Złota proporcja w malarstwie: Botticelli, Leonardo, Dürer.":"The golden proportion in painting: Botticelli, Leonardo, Dürer.",
"Rytmy mowy. Notacja Serviena; metafora jako analogía A:B::C:D.":"Rhythms of speech. Servien's notation; metaphor as analogía A:B::C:D.",
"Filotaksja: złoty kąt 137,5° jako fizyczne optimum upakowania.":"Phyllotaxis: the golden angle 137.5° as the physical optimum of packing.",
"„Światło pod korcem\": Pitagoras, loże katedralne, transmisja wiedzy.":"\"The light under the bushel\": Pythagoras, cathedral lodges, the transmission of knowledge.",
"Powrót do Pitagorasa: Schrödinger, de Broglie, Bergsonowskie trwanie.":"Return to Pythagoras: Schrödinger, de Broglie, Bergsonian duration.",
"Kamień probierczy: zmierz sam słynne mity — nautilus, Partenon, Mona Lisa — i odróżnij prawdziwe φ od pobożnych życzeń.":"The touchstone: measure the famous myths yourself — nautilus, Parthenon, Mona Lisa — and tell real φ from wishful thinking.",

/* ===== Komnata I · Liczba (liczba.html) ===== */
"Zagraj Tetraktys":"Play the Tetractys","φ : 1 — posłuchaj":"φ : 1 — listen",
"Kliknij sferę, by usłyszeć dźwięk":"Click a sphere to hear its tone",
"przeciągnij":"drag","= obróć ·":"= rotate ·","scroll":"scroll","= przybliż":"= zoom",
"stroję tetraktys":"tuning the tetractys",
// ROWS — names & descriptions
"Unison · jednia":"Unison · the one","Monada — punkt, źródło wszystkiego.":"The monad — the point, source of all.",
"Oktawa · diapason":"Octave · diapason","Podwojenie struny — ten sam ton, wyżej.":"Doubling the string — the same tone, higher.",
"Kwinta · diapente":"Fifth · diapente","Najczystsza współbrzmiąca konsonansja.":"The purest sounding consonance.",
"Kwarta · diatessaron":"Fourth · diatessaron","Dopełnienie kwinty do oktawy.":"The fifth's complement up to the octave.",
"Pierwszy dźwięk Tetraktysu":"First tone of the Tetractys",
// panel
"Arytmetyka · Pitagoras":"Arithmetic · Pythagoras",
"1 + 2 + 3 + 4 = 10 — liczba, która stała się słyszalna":"1 + 2 + 3 + 4 = 10 — the number that became audible",
"sfer":"spheres","rzędy":"rows","konsonanse":"consonances",
"„Na tego, który przekazał naszemu pokoleniu tetraktys — źródło i korzeń wiecznie żywej natury.\"":"„Upon him who handed down to our generation the tetractys — source and root of ever-living nature.”",
"Przysięga pitagorejska (Złote wersety)":"The Pythagorean Oath (Golden Verses)",
// panel note (fragments split by <b>)
"Pierwsze cztery liczby zawierają w sobie całą":"The first four numbers contain the whole",
"harmonia":"harmony","harmonię":"harmony",": stosunek":": the ratio",
"daje oktawę,":"gives the octave,","kwintę,":"the fifth,","kwartę. Pitagorejczycy odkryli, że":"the fourth. The Pythagoreans discovered that",
"współbrzmienie rodzi się z prostych stosunków małych liczb całkowitych":"consonance is born from simple ratios of small whole numbers",
"— liczba okazała się prawem dźwięku. Kliknij sfery, by usłyszeć kolejne rzędy.":"— number turned out to be the law of sound. Click the spheres to hear each row in turn.",
"teraz brzmi":"now sounding","kliknij sferę lub rząd":"click a sphere or a row",
// romance note
"φ — sprawdzian romansu.":"φ — the romance check.","Złoty podział (≈ 1,618)":"The golden section (≈ 1.618)",
"nie jest":"is not","interwałem muzycznym. Posłuchaj „φ : 1\": dwa tony w proporcji φ":"a musical interval. Listen to „φ : 1”: two tones in the ratio φ",
"dudnią i brzmią obco":"beat and sound alien",
"— bo to liczba niewymierna, nie da się jej sprowadzić do prostego stosunku. Harmonia mieszka w małych liczbach całkowitych, nie w φ.":"— because it is irrational, it cannot be reduced to a simple ratio. Harmony lives in small whole numbers, not in φ.",
"∴ — Rygor":"∴ — Rigor",
"złoty podział — NIE konsonansja":"golden section — NOT a consonance",

/* ===== Komnata II · Proporcja (proporcja.html) ===== */
"kreślę proporcję":"drawing the proportion",
"Rygor — czysta geometria":"Rigor — pure geometry",
// MOVES ("Odkryj φ" already in chrome dictionary above)
"Jest dokładnie jedna liczba dodatnia, której kwadrat równa się jej samej plus jeden. Przesuwaj x, aż dwa słupki — x·x oraz x+1 — zrównają się. To, co znajdziesz, to φ.":"There is exactly one positive number whose square equals itself plus one. Slide x until the two bars — x·x and x+1 — match. What you find is φ.",
"x² = x + 1  ⟹  x =":"x² = x + 1  ⟹  x =","— liczba, która zawiera samą siebie":"— the number that contains itself",
"Przesuwaj suwak, aż słupki się zrównają.":"Slide the control until the bars match.",
"Złoty prostokąt":"The golden rectangle",
"Odetnij od złotego prostokąta kwadrat o krótszym boku — zostaje znowu złoty prostokąt, mniejszy o 1/φ i obrócony o 90°. Powtarzaj: z naroży kwadratów wyłania się złota spirala.":"Cut a square on the shorter side off the golden rectangle — what remains is again a golden rectangle, smaller by 1/φ and turned 90°. Repeat: from the corners of the squares a golden spiral emerges.",
"każde cięcie zostawia":"every cut leaves","ten sam kształt":"the same shape","· ćwiartki kół = złota spirala":"· quarter-circles = golden spiral",
"Klikaj „Odetnij kwadrat\" i patrz, jak rośnie spirala.":"Click „Cut a square” and watch the spiral grow.",
"Fibonacci":"Fibonacci",
"Zacznij od 1, 1 i dodawaj dwa ostatnie: 1, 2, 3, 5, 8, 13… Iloraz kolejnych wyrazów drga coraz bliżej φ. Natura liczy w Fibonaccim — a Fibonacci dąży do złotej liczby.":"Start from 1, 1 and add the last two: 1, 2, 3, 5, 8, 13… The ratio of successive terms quivers ever closer to φ. Nature counts in Fibonacci — and Fibonacci tends toward the golden number.",
"Dodawaj kolejne wyrazy i patrz na iloraz.":"Add successive terms and watch the ratio.",
// controls
"✂ Odetnij kwadrat":"✂ Cut a square","poziom":"level","↺ od nowa":"↺ start over",
"+ Dodaj następną":"+ Add the next","iloraz":"ratio",
// canvas labels
"złoty prostokąt → kwadrat + mniejszy złoty prostokąt":"golden rectangle → square + smaller golden rectangle",
"iloraz kolejnych:":"ratio of successive terms:",
// progress toasts
"φ odkryte":"φ discovered","Złota spirala":"Golden spiral","Fibonacci → φ":"Fibonacci → φ",

/* ===== Komnata III · Pentada (pentada.html) ===== */
"kreślę pentagram":"drawing the pentagram",
// controls / dock
"⏸ pauza":"⏸ pause","▶ wznów":"▶ resume","tempo":"speed","głębokość":"depth",
"fale":"waves","symetria":"symmetry",
"Przeciągnij figurę, by ją obrócić ·":"Drag the figure to rotate it ·",
// MOVES
"Maszyna φ":"The φ machine",
"Połącz przekątnymi wszystkie wierzchołki pięciokąta — powstaje pentagram. Każde przecięcie tnie odcinek w złotej proporcji.":"Join every vertex of the pentagon with diagonals — a pentagram appears. Each intersection cuts a segment in the golden ratio.",
"przekątna ÷ bok =":"diagonal ÷ side =","·  wewnętrzny pięciokąt =":" ·  inner pentagon =","zewnętrznego":"of the outer one",
"Nieskończone zejście":"Infinite descent",
"Wewnętrzny pięciokąt to ten sam pięciokąt — mniejszy o 1/φ² i obrócony o 36°. Operację można powtarzać bez końca. Dlatego Ghyka zwał pięciokąt „figurą życia\": sam się reprodukuje.":"The inner pentagon is the same pentagon — smaller by 1/φ² and turned 36°. The operation can be repeated without end. That is why Ghyka called the pentagon the „figure of life”: it reproduces itself.",
"każdy poziom =":"each level =","poprzedniego, obrót":"of the previous, a turn of","— nieskończoność w skończonym kształcie":"— infinity in a finite shape",
"Pięć kontra sześć":"Five versus six",
"Dlaczego pięciokąt jest wyjątkowy? Trzy sześciokąty wokół punktu domykają się idealnie (kryształ). Trzy pięciokąty zostawiają lukę 36° — φ jest niewymierne, więc nie ma okresowego kafelkowania.":"Why is the pentagon special? Three hexagons around a point close up perfectly (a crystal). Three pentagons leave a 36° gap — φ is irrational, so there is no periodic tiling.",
"sześciokąt 3×120° =":"hexagon 3×120° =","·  pięciokąt 3×108° =":"(crystal)  ·  pentagon 3×108° =",", luka 36°":", gap 36°",
"Quasikryształ":"Quasicrystal",
"Skoro 5-krotna symetria nie tworzy kryształu — czy może istnieć w materii? Penrose (1974) ją wykafelkował aperiodycznie; Shechtman (1982) znalazł ją w stopie glinu. Nobel 2011. φ jest w każdym quasikrysztale.":"If 5-fold symmetry forms no crystal — can it exist in matter? Penrose (1974) tiled it aperiodically; Shechtman (1982) found it in an aluminium alloy. Nobel 2011. φ is in every quasicrystal.",
"suma fal o symetrii 2N-krotnej ·":"a sum of waves with 2N-fold symmetry ·","N=5 → 10-krotna":"N=5 → 10-fold",", jak w stopie Al-Mn Shechtmana":", as in Shechtman's Al-Mn alloy",
"Rygor + walidacja":"Rigor + validation",
// HINTS
"Przeciągnij, by obrócić":"Drag to rotate","idzie samo — zwolnij lub zatrzymaj":"it runs on its own — slow it or stop it",
"3 sześciokąty vs 3 pięciokąty":"3 hexagons vs 3 pentagons",
"przesuń „fale\" — 6-krotna to kryształ, 10-krotna to quasikryształ":"move the „waves” — 6-fold is a crystal, 10-fold is a quasicrystal",
// canvas text
"przekątna ÷ bok = φ":"diagonal ÷ side = φ","wewnętrzny pięciokąt = 1/φ² ≈ 0,382":"inner pentagon = 1/φ² ≈ 0.382",
"PIĘCIOKĄT · 3 × 108° = 324°":"PENTAGON · 3 × 108° = 324°","luka 36° — nie kafelkuje":"36° gap — does not tile",
"SZEŚCIOKĄT · 3 × 120° = 360°":"HEXAGON · 3 × 120° = 360°","domyka się — kryształ":"closes up — a crystal",
"Quasikryształ ujrzany":"Quasicrystal beheld",

/* ===== Komnata IV · Bryły (bryly.html) ===== */
"buduję bryły":"building the solids",
"3 złote prostokąty":"3 golden rectangles","Szkielet":"Wireframe","▶ Próba wiedzy":"▶ Knowledge quiz",
"= przybliż · idle obraca sam":"= zoom · idle rotates on its own",
// SOLIDS
"Czworościan":"Tetrahedron","Ogień":"Fire","cztery trójkąty — najostrzejsza z brył":"four triangles — the sharpest of the solids",
"Ogniowi przypiszmy czworościan, jako bryłę najbardziej ruchliwą i tnącą.":"To fire let us assign the tetrahedron, as the most mobile and cutting of the solids.",
"Platon, Timajos (56a)":"Plato, Timaeus (56a)",
"Bez Φ.":"No Φ.","Bryła ognia jest sama dla siebie dualna. Złota proporcja zacznie się dopiero przy pięciokącie.":"The solid of fire is self-dual. The golden ratio begins only with the pentagon.",
"Sześcian":"Cube","Ziemia":"Earth","sześć kwadratów — najtrwalszy fundament":"six squares — the most enduring foundation",
"Ziemi dajmy sześcian, bo ziemia jest z rodzajów najtrudniej ruchoma.":"To earth let us give the cube, for earth is the least mobile of the kinds.",
"Platon, Timajos (55d–56a)":"Plato, Timaeus (55d–56a)",
"Figura materii nieożywionej.":"The figure of inanimate matter.","U Ghyki sześcian i sześciokąt to świat krystaliczny — porządek bez wzrostu. Przeciwieństwo pięciokąta „figury życia\".":"For Ghyka the cube and the hexagon are the crystalline world — order without growth. The opposite of the pentagon, the „figure of life”.",
"Ośmiościan":"Octahedron","Powietrze":"Air","osiem trójkątów — dualny do sześcianu":"eight triangles — dual to the cube",
"Powietrzu — ośmiościan, pośredni między ogniem a wodą.":"To air — the octahedron, midway between fire and water.",
"Platon, Timajos":"Plato, Timaeus",
"Dualny do sześcianu:":"Dual to the cube:","środki ścian jednego są wierzchołkami drugiego. Wciąż świat „materialny\", bez Φ.":"the face centres of one are the vertices of the other. Still the „material” world, without Φ.",
"Kosmos · Eter":"Cosmos · Aether","dwanaście pięciokątów — w każdym mieszka Φ":"twelve pentagons — Φ dwells in each",
"Pozostał jeszcze jeden, piąty układ — tego bóg użył dla wszechświata, kreśląc na nim obrazy.":"One arrangement still remained, the fifth — this the god used for the universe, tracing figures upon it.",
"Platon, Timajos (55c)":"Plato, Timaeus (55c)",
"Bryła Φ.":"The Φ solid.","Każda z 12 pięciokątnych ścian niesie złoty podział (przekątna ÷ bok = φ). Dlatego u Ghyki dwunastościan to":"Each of the 12 pentagonal faces carries the golden section (diagonal ÷ side = φ). That is why for Ghyka the dodecahedron is the","kosmos":"cosmos","— i dlatego stanie się nawigatorem całego portalu: 12 ścian = 12 modułów.":"— and why it becomes the navigator of the whole portal: 12 faces = 12 modules.",
"Dwudziestościan":"Icosahedron","Woda":"Water","dwadzieścia trójkątów — wierzchołki to czyste φ":"twenty triangles — the vertices are pure φ",
"Dwa skarby geometrii: twierdzenie Pitagorasa i podział odcinka w proporcji skrajnej i średniej.":"Two treasures of geometry: the theorem of Pythagoras and the division of a line in extreme and mean ratio.",
"Johannes Kepler (1596)":"Johannes Kepler (1596)",
"Dowód Φ w 3D.":"Proof of Φ in 3D.","12 wierzchołków to dokładnie naroża":"The 12 vertices are exactly the corners of","trzech prostopadłych złotych prostokątów":"three mutually perpendicular golden rectangles","1×φ: współrzędne (0, ±1, ±φ) i cykliczne. Włącz „3 złote prostokąty\", by je zobaczyć.":"1×φ: coordinates (0, ±1, ±φ) and cyclic. Switch on „3 golden rectangles” to see them.",
// panel nums + chip
"wierzch.":"vert.","kraw.":"edges","ścian":"faces",
"Φ — Rygor":"Φ — Rigor","Bez Φ — materia":"No Φ — matter",
// QUIZ
"Dwunastościan — ile ma ścian?":"The dodecahedron — how many faces?",
"Dwanaście pięciokątów — i dlatego 12 ścian = 12 komnat portalu.":"Twelve pentagons — and that is why 12 faces = 12 chambers of the portal.",
"Którą bryłę Platon przypisał OGNIOWI?":"Which solid did Plato assign to FIRE?",
"Najostrzejsza, najbardziej „tnąca\" — stąd ogień (Timajos).":"The sharpest, most „cutting” — hence fire (Timaeus).",
"Wzór Eulera dla bryły platońskiej: W − K + Ś = ?":"Euler's formula for a Platonic solid: V − E + F = ?",
"Zawsze 2. Sześcian: 8 − 12 + 6 = 2.":"Always 2. Cube: 8 − 12 + 6 = 2.",
"Ile prostopadłych złotych prostokątów kryje dwudziestościan?":"How many perpendicular golden rectangles does the icosahedron hide?",
"Trzy prostokąty 1×φ — ich 12 naroży to 12 wierzchołków: (0, ±1, ±φ).":"Three 1×φ rectangles — their 12 corners are the 12 vertices: (0, ±1, ±φ).",
"Która bryła jest dualna do sześcianu?":"Which solid is dual to the cube?",
"Środki ścian sześcianu = wierzchołki ośmiościanu (i odwrotnie).":"The face centres of the cube = the vertices of the octahedron (and vice versa).",
"Które bryły są zbudowane z φ?":"Which solids are built from φ?",
"Dwunasto- i dwudziestościan":"Dodecahedron and icosahedron","Czworo- i sześcian":"Tetrahedron and cube","Sześcian i ośmiościan":"Cube and octahedron","Wszystkie pięć":"All five",
"Pięciokąt niesie złoty podział; ikosaedr ma współrzędne z φ.":"The pentagon carries the golden section; the icosahedron has coordinates with φ.",
"Trafione w Próbie Brył":"Correct in the Solids quiz",
// quiz chrome
"Próba ·":"Quiz ·",
"Dalej →":"Next →","Zakończ próbę":"Finish the quiz","✕ wyjdź z próby":"✕ leave the quiz",
"✓ Dobrze":"✓ Correct","✗ Niezupełnie":"✗ Not quite","Próba ukończona":"Quiz complete",
"Komplet — bryły platońskie nie mają przed Tobą tajemnic.":"Full marks — the Platonic solids hold no secrets from you.",
"Solidnie. Wróć i dopracuj resztę.":"Solid. Come back and polish the rest.",
"Pokręć jeszcze bryłami i spróbuj znów.":"Turn the solids a while longer and try again.",
"Zagraj znów":"Play again","✕ wróć do zwiedzania":"✕ back to exploring",

/* ===== Komnata X · Loża (loza.html) ===== */
"zapalam konstelację":"lighting the constellation",
"Światło pod korcem — jak złota liczba wędrowała przez 2500 lat. Obróć i najedź na węzeł.":"The light under the bushel — how the golden number travelled through 2500 years. Rotate and hover a node.",
"Pitagorejska wiedza o liczbie i proporcji nie zniknęła z katastrofą bractwa — przepływała przez Akademię, Aleksandrię, rzymskie korporacje, średniowieczne loże katedralne, aż po fizykę quasikryształów. Najedź na świetlny węzeł, by poznać ogniwo.":"Pythagorean knowledge of number and proportion did not vanish with the brotherhood's catastrophe — it flowed through the Academy, Alexandria, the Roman corporations, the medieval cathedral lodges, all the way to the physics of quasicrystals. Hover a luminous node to learn the link.",
"Budowniczowie / loże":"Builders / lodges",
"Konstelacja na":"A constellation on","złotej spirali czasu":"the golden spiral of time",
"▶ Prześledź przekaz w czasie":"▶ Trace the transmission through time","ogniwa":"links","✕ zakończ grę":"✕ end the game",
// NODES — names, places, blurbs
"Pitagoras":"Pythagoras","Kroton":"Croton",
"Bractwo pitagorejskie. Liczba jako zasada bytu; pentagram (pentalfa) — tajny znak rozpoznawczy wtajemniczonych.":"The Pythagorean brotherhood. Number as the principle of being; the pentagram (pentalpha) — the secret sign of recognition among initiates.",
"Filolaos i Archytas":"Philolaus and Archytas","Tarent":"Tarentum",
"Pitagorejczycy ocaleni po spaleniu szkoły w Metaponcie. Archytas — przyjaciel Platona, żywy most do Akademii.":"Pythagoreans saved after the school at Metapontum was burned. Archytas — friend of Plato, a living bridge to the Academy.",
"Platon":"Plato","Akademia, Ateny":"Academy, Athens",
"„Niech nie wchodzi, kto nie zna geometrii.\" Timajos: pięć brył = żywioły, dwunastościan = kosmos.":"„Let none enter who knows no geometry.” Timaeus: five solids = the elements, the dodecahedron = the cosmos.",
"Euklides":"Euclid","Aleksandria":"Alexandria",
"Elementy — pierwsza ścisła definicja „podziału w skrajnej i średniej proporcji\", czyli złotego cięcia.":"The Elements — the first rigorous definition of „division in extreme and mean ratio”, that is, the golden cut.",
"Witruwiusz":"Vitruvius","Rzym":"Rome",
"De architectura: proporcje ciała jako moduł kosmiczny — źródło późniejszego „człowieka witruwiańskiego\".":"De architectura: the proportions of the body as a cosmic module — the source of the later „Vitruvian man”.",
"Nikomachos":"Nicomachus","Geraza":"Gerasa",
"Wstęp do arytmetyki: neopitagorejska teologia liczb — tetraktys, dekada, harmonia.":"Introduction to Arithmetic: a Neopythagorean theology of number — the tetractys, the decad, harmony.",
"Collegia fabrorum":"Collegia fabrorum","Cesarstwo rzymskie":"The Roman Empire",
"Rzymskie korporacje budowniczych — wg Ghyki ogniwo przekazu geometrii warsztatowej do średniowiecza.":"The Roman builders' guilds — for Ghyka a link transmitting workshop geometry into the Middle Ages.",
"Boecjusz":"Boethius",
"Przekazuje quadrivium (arytmetyka, geometria, muzyka, astronomia) całemu łacińskiemu średniowieczu.":"Transmits the quadrivium (arithmetic, geometry, music, astronomy) to the whole Latin Middle Ages.",
"Loże katedralne":"Cathedral lodges","Chartres · Reims":"Chartres · Reims",
"„Światło pod korcem\": Bauhütte i strzechy. Pentagram na rozetach gotyckich, gmerki kamieniarzy (Rziha).":"„The light under the bushel”: the Bauhütte and the masons' guilds. The pentagram in Gothic rose windows, stonemasons' marks (Rziha).",
"Pacioli i Leonardo":"Pacioli and Leonardo","Mediolan":"Milan",
"De divina proportione, ilustrowane przez Leonarda — złota proporcja ochrzczona jako „boska\".":"De divina proportione, illustrated by Leonardo — the golden proportion christened „divine”.",
"Praga":"Prague",
"„Dwa skarby geometrii\": twierdzenie Pitagorasa i złoty podział. Bryły platońskie w modelu kosmosu.":"„Two treasures of geometry”: the theorem of Pythagoras and the golden section. The Platonic solids in a model of the cosmos.",
"Różokrzyżowcy":"The Rosicrucians","Europa":"Europe",
"Manifesty różokrzyżowe — ezoteryczna synteza geometrii, alchemii i kabały liczb.":"The Rosicrucian manifestos — an esoteric synthesis of geometry, alchemy and the cabbala of number.",
"Wielka Loża":"The Grand Lodge","Londyn":"London",
"Masoneria spekulatywna: cech budowniczych staje się bractwem symbolicznym. Pitagoras jako patron sztuki.":"Speculative Freemasonry: the builders' guild becomes a symbolic brotherhood. Pythagoras as patron of the craft.",
"Adolf Zeising":"Adolf Zeising","Lipsk":"Leipzig",
"Kanon złotego podziału w ciele i sztuce — i początek nowożytnej numerologii φ (często naciąganej).":"The canon of the golden section in body and art — and the start of modern φ numerology (often forced).",
"Jay Hambidge":"Jay Hambidge","Nowy Jork":"New York",
"Dynamic symmetry: prostokąty √2…√5 i φ jako rzekomy klucz do sztuki greckiej.":"Dynamic symmetry: √2…√5 and φ rectangles as the alleged key to Greek art.",
"Matila Ghyka":"Matila Ghyka","Paryż":"Paris",
"Le Nombre d'Or — wielka synteza całej tej tradycji. Nasz przewodnik i jeden z filarów portalu.":"Le Nombre d'Or — the great synthesis of this whole tradition. Our guide, and one of the pillars of the portal.",
"Penrose → Shechtman":"Penrose → Shechtman","Oxford · Technion":"Oxford · Technion",
"Kafle Penrose'a i quasikryształy: 5-krotna symetria i φ w materii. Nobel 2011 — naukowa pointa tradycji.":"Penrose tiles and quasicrystals: 5-fold symmetry and φ in matter. Nobel 2011 — the scientific punch line of the tradition.",
// game panel strings
"Gra · prześledź przekaz":"Game · trace the transmission","Od Pitagorasa po dziś":"From Pythagoras to today",
"Klikaj węzły":"Click the nodes","od najstarszego do najnowszego":"from oldest to newest",". Świetlista nić poprowadzi 2500 lat przekazu złotej liczby. Nie znasz dat? Zgaduj — przy pomyłce podpowiem.":". A luminous thread will lead through 2500 years of the golden number's transmission. Don't know the dates? Guess — on a mistake I'll hint.",
"✗ jeszcze nie teraz":"✗ not yet",
"Kliknij najstarsze jeszcze nieodwiedzone ogniwo. Przekaz biegnie od Pitagorasa naprzód w czasie.":"Click the oldest link not yet visited. The transmission runs from Pythagoras forward in time.",
"✓ Ukończone":"✓ Complete","2500 lat przekazu":"2500 years of transmission",
"Bezbłędnie — prześledziłeś całą nić od Pitagorasa po Shechtmana.":"Flawless — you traced the whole thread from Pythagoras to Shechtman.",
"Cała nić odsłonięta. Spróbuj raz jeszcze bez pomyłek.":"The whole thread revealed. Try once more without mistakes.",
"Przekaz prześledzony":"Transmission traced","Bez pomyłki":"No mistakes",

/* ===== Komnata XII · Probierz (probierz.html) ===== */
"rozgrzewam probierz":"warming up the touchstone",
// score bar (fragments split by <b>)
"Sprawdzone":"Checked","/4 · trafione":"/4 · correct",
"nałóż złoty prostokąt":"overlay the golden rectangle","nałóż złotą spiralę":"overlay the golden spiral",
"wzrost muszli na obrót":"shell growth per turn",
"Przeciągnij po obrazie, by zmierzyć prostokąt. Igła pokazuje, jak blisko φ jesteś.":"Drag across the image to measure a rectangle. The needle shows how close to φ you are.",
// CASES
"Partenon":"Parthenon",


"Łodzik":"Nautilus",


"Mona Lisa":"Mona Lisa",


"Karta":"The Card",


// verdict labels
"Prawda":"True","Prawie":"Almost","Zależy":"Depends","Mit":"Myth",
// canvas labels + claim bold fragments
"złota spirala — ucieka z kadru":"golden spiral — escapes the frame","muszla łodzika":"nautilus shell",
"złoty prostokąt":"golden rectangle","złota spirala":"golden spiral",
// panel
"dopasuj spiralę":"fit the spiral","zmierz prostokąt":"measure the rectangle",
"twój pomiar":"your measurement","Twój werdykt?":"Your verdict?",
"Prawdziwe φ":"Real φ","Prawie φ":"Almost φ","Zależy od pomiaru":"Depends on the measurement",
"Odsłoń werdykt":"Reveal the verdict","✓ trafione":"✓ correct","✗ pudło":"✗ missed",

"Przeciągnij po obrazie, by zmierzyć prostokąt. Przesuwaj go — zobacz, jak zmienia się wynik.":"Drag across the image to measure a rectangle. Move it — see how the result changes.",
"Eksponat zbadany":"Exhibit examined","Trafny werdykt":"Correct verdict",

/* ===== Filary (filary.html) ===== */
"wznoszę kolumnadę":"raising the colonnade",
"Ośmiu, którzy nieśli liczbę przez 2500 lat —":"Eight who carried the number through 2500 years —","Ghyka jest jednym z nich, nie autorem.":"Ghyka is one of them, not the author.",
"Rdzeń geometryczny":"Geometric core","Synteza":"Synthesis",
"Przeciągnij, by przejść wzdłuż kolumnady":"Drag to move along the colonnade","= przybliż · najedź na filar":"= zoom · hover a pillar",
// idle panel
"Osiem filarów":"Eight pillars","2500 lat matematyki piękna i wzrostu":"2500 years of the mathematics of beauty and growth",

// PILLARS
"bractwo · pentagram · harmonia":"brotherhood · pentagram · harmony",
"Liczba jest zasadą wszystkiego.":"Number is the principle of all things.",
"Pitagorejczycy, Kroton":"The Pythagoreans, Croton",

"pierwsza ścisła definicja":"the first rigorous definition",
"Podział odcinka w skrajnej i średniej proporcji.":"The division of a line in extreme and mean ratio.",
"Elementy, ks. VI":"The Elements, Book VI",

"Leonardo Fibonacci":"Leonardo Fibonacci","ciąg 1,1,2,3,5,8…":"the sequence 1,1,2,3,5,8…",
"Ilorazy kolejnych wyrazów ciągu dążą do φ.":"The ratios of successive terms of the sequence tend to φ.",
"Liber Abaci (1202)":"Liber Abaci (1202)",

"„boska proporcja\"":"the „divine proportion”",
"De divina proportione.":"De divina proportione.",
"Luca Pacioli, ilustr. Leonardo da Vinci":"Luca Pacioli, illustrated by Leonardo da Vinci",

"dwa skarby geometrii":"two treasures of geometry",
"Dwa skarby geometrii: twierdzenie Pitagorasa i złoty podział.":"Two treasures of geometry: the theorem of Pythagoras and the golden section.",

"D’Arcy Thompson":"D’Arcy Thompson","prawa kształtu w biologii":"the laws of form in biology",
"On Growth and Form.":"On Growth and Form.",
"D’Arcy Wentworth Thompson":"D’Arcy Wentworth Thompson",

"wielka synteza tradycji":"the great synthesis of the tradition",
"Le Nombre d’Or — synteza dwóch i pół tysiąca lat.":"Le Nombre d’Or — a synthesis of two and a half thousand years.",
"Matila C. Ghyka":"Matila C. Ghyka",

"Penrose i Shechtman":"Penrose and Shechtman","φ w materii · Nobel 2011":"φ in matter · Nobel 2011",
"Kafle aperiodyczne i quasikryształy.":"Aperiodic tiles and quasicrystals.",
"Roger Penrose · Dan Shechtman":"Roger Penrose · Dan Shechtman",

// komnaty chips on pillars
"Cięcie":"The Cut","Gnomon":"Gnomon","wszystkie komnaty":"all chambers",
// pillar chips
"Synteza · przewodnik":"Synthesis · guide",

/* ===== Atlas (atlas.html) ===== */
"atlas złotej liczby":"atlas of the golden number",
"Teza":"Thesis","Próba":"The Trial",
// hero
"Od Pitagorasa do quasikryształów":"From Pythagoras to quasicrystals",
"Złota Liczba,":"The Golden Number,","od liczby do życia":"from number to life",
"Interaktywny atlas najsłynniejszej liczby świata — od pitagorejskiej geometrii po fizykę quasikryształów.":"An interactive atlas of the world's most famous number — from Pythagorean geometry to the physics of quasicrystals.",
"Poznaj ją w działaniu":"Meet it in action","i naucz się odróżniać prawdę od":"and learn to tell truth from",
"pięknego złudzenia":"beautiful illusion",".":".",
"✦ Wejdź przez Dwunastościan":"✦ Enter through the Dodecahedron","↯ Ogród Złotego Kąta":"↯ The Garden of the Golden Angle","Atlas komnat":"Atlas of chambers",
"przewiń":"scroll",
// thesis band
"Dlaczego ten portal":"Why this portal",
"Najsłynniejsza liczba świata — i":"The world's most famous number — and","najczęściej nadużywana":"the most often abused",
"φ jest jednym z najgłębszych obiektów matematyki i przyrody — i zarazem liczbą, którą popkultura widzi wszędzie, także tam, gdzie jej nie ma. Ten portal pozwala":"φ is one of the deepest objects in mathematics and nature — and at the same time a number that pop culture sees everywhere, even where it is not. This portal lets you",
"dotknąć tej prawdziwej":"touch the real one","i daje Ci":"and gives you","radar":"a radar",", który odróżnia odkrycie od złudzenia. Naszym przewodnikiem jest Matila Ghyka — uwodzicielski erudyta, który w 1931 zebrał całą tę tradycję — właśnie dlatego, że ucieleśnia obie strony.":"that tells discovery from illusion. Our guide is Matila Ghyka — a seductive erudite who in 1931 gathered this whole tradition — precisely because he embodies both sides.",
"Co jest prawdą":"What is true",
"Teoria liczb (φ jako „najbardziej niewymierna” — tw. Hurwitza), filotaksja (złoty kąt jako fizyczne":"Number theory (φ as the „most irrational” — Hurwitz's theorem), phyllotaxis (the golden angle as the physical","— Douady & Couder, 1992), quasikryształy (Penrose → Shechtman, Nobel 2011), samopodobny wzrost gnomoniczny i spirala logarytmiczna. To matematyka, nie metafora — i to jej dotkniesz w komnatach.":"— Douady & Couder, 1992), quasicrystals (Penrose → Shechtman, Nobel 2011), self-similar gnomonic growth and the logarithmic spiral. This is mathematics, not metaphor — and it is this you will touch in the chambers.",
"Co jest mitem":"What is a myth",
"Partenon „zaprojektowany na φ”, muszla łodzika jako „złota spirala” (naprawdę ≈ 1,33), Mona Lisa, karta kredytowa, kanon ciała Zeisinga. Pomiary dobierane tak długo, aż wyjdzie 1,618 (Markowsky, Neveux, Livio). Komnata":"The Parthenon „designed to φ”, the nautilus shell as a „golden spiral” (really ≈ 1.33), the Mona Lisa, the credit card, Zeising's canon of the body. Measurements picked until 1.618 comes out (Markowsky, Neveux, Livio). The chamber","uczy ten odruch":"teaches this reflex","rozpoznawać":"to recognize","— to umiejętność, nie oskarżenie.":"— it is a skill, not an accusation.",
// atlas band
"Architektura · 12 komnat":"Architecture · 12 chambers","Atlas Złotej Liczby":"Atlas of the Golden Number",
"Cały korpus Ghyki, rozpisany na dwanaście interaktywnych komnat. Każda kończy się":"The whole corpus of Ghyka, set out as twelve interactive chambers. Each ends with a","werdyktem":"verdict","— rygor, mieszany czy romantyzm. Kliknij kartę:":"— rigor, mixed or romanticism. Click a card:","siedem komnat":"seven chambers","jest już grywalnych, reszta czeka jako plan.":"are already playable, the rest wait as a plan.",
// garden band
"Komnata V · na żywo":"Chamber V · live","Ogród Złotego Kąta":"The Garden of the Golden Angle",
"Roślina, która chce rozłożyć liście tak, by jak najmniej się zasłaniały, musi obracać każdy kolejny o ten sam kąt. Pytanie brzmi:":"A plant that wants to spread its leaves so they shade one another as little as possible must turn each new one by the same angle. The question is:","który kąt jest najlepszy?":"which angle is best?","Pokręć suwakiem i przekonaj się sam — odpowiedź to złoty kąt,":"Turn the slider and see for yourself — the answer is the golden angle,",
"Model Vogla ·":"Vogel's model ·","kwiatków":"florets","spirale: —":"spirals: —",
"Kąt rozbieżności Δ":"Divergence angle Δ","Ułamek obrotu":"Fraction of a turn",
"Równomierność upakowania":"Evenness of packing","— od złotego kąta":"— from the golden angle",
"Obracaj każdy kwiatek o…":"Turn each floret by…",
"Pokaż spirale (parastychy)":"Show spirals (parastichies)","Wzrost od środka":"Growth from the centre",
"Dlaczego akurat 137,507°?":"Why exactly 137.507°?",
"Bo to":"Because it is","360° ÷ φ²":"360° ÷ φ²",". Złoty kąt dzieli pełny obrót w złotej proporcji. A że φ jest „najbardziej niewymierną” z liczb — jej rozwinięcie w ułamek łańcuchowy to same jedynki —":". The golden angle divides the full turn in the golden ratio. And since φ is the „most irrational” of numbers — its continued-fraction expansion is all ones —","żaden kwiatek nigdy nie trafi dokładnie na ślad poprzedniego":"no floret ever lands exactly on the track of the previous one",". Każdy inny kąt prędzej czy później się „zapętla” w szprychy i zostawia puste luki.":". Every other angle sooner or later „loops” into spokes and leaves empty gaps.",
"Spirale, które widzisz (":"The spirals you see (","parastychy":"parastichies","), liczą się zawsze do":"), always count up to","kolejnych liczb Fibonacciego":"successive Fibonacci numbers","— 21, 34, 55… To nie ozdoba: to mianowniki najlepszych wymiernych przybliżeń złotego kąta.":"— 21, 34, 55… This is no ornament: they are the denominators of the best rational approximations of the golden angle.",
"Mit vs matematyka":"Myth vs mathematics",
"Muszla łodzika — ikona „złotej spirali” —":"The nautilus shell — icon of the „golden spiral” —","nie rośnie według φ":"does not grow according to φ",": jej spirala logarytmiczna ma współczynnik ≈ 1,33, nie 1,618. Ale złoty kąt w roślinach to twarda fizyka: Douady i Couder (1992) odtworzyli go z samego":": its logarithmic spiral has a coefficient of ≈ 1.33, not 1.618. But the golden angle in plants is hard physics: Douady and Couder (1992) reproduced it from the sheer","minimum energii":"minimum of energy","w eksperymencie z kroplami cieczy na talerzu. Ghyka przeczuł rzecz prawdziwą — choć podpierał się błędnym przykładem.":"in an experiment with drops of liquid on a plate. Ghyka sensed something true — though he leaned on a faulty example.",
// proba band
"Komnata IX · sedno podniesienia na wyższy poziom":"Chamber IX · the heart of raising it to a higher level",
"Próba —":"The Trial —","rachunek sumienia":"an examination of conscience",
"To komnata, której u Ghyki brakuje. Bierze jego najsłynniejsze przykłady i sprawdza je liczbą:":"This is the chamber Ghyka lacks. It takes his most famous examples and tests them by number:","nautilus, Partenon, Mona Lisa, karta kredytowa":"the nautilus, the Parthenon, the Mona Lisa, the credit card",". Nie po to, by ośmieszyć — lecz by nauczyć odruchu, który odróżnia naukę od pięknej opowieści. Plan tej komnaty otwiera ostatnia karta w Atlasie.":". Not to ridicule — but to teach the reflex that tells science from a beautiful story. The plan of this chamber is opened by the last card in the Atlas.",
// footer
"O atlasie":"About the atlas",
"Portal edukacyjny budujący intuicję wobec φ i geometrii proporcji. Rygor oddzielony od romantyzmu — bo dopiero wtedy Złota Liczba robi się naprawdę ciekawa.":"An educational portal building intuition about φ and the geometry of proportion. Rigor separated from romanticism — because only then does the Golden Number become truly interesting.",
"Źródła Ghyki":"Ghyka's sources","Aparat krytyczny":"Critical apparatus",
"Shechtman i in., quasikryształy (Nobel 2011)":"Shechtman et al., quasicrystals (Nobel 2011)",
"Prototyp flagowy · komnata „Ogród” w pełni grywalna · pozostałe 8 jako plan":"Flagship prototype · the „Garden” chamber fully playable · the other 8 as a plan",
// modal labels
"Idea":"Idea","Co robisz w tej komnacie":"What you do in this chamber","Matematyka pod spodem":"The mathematics beneath",
// CHAMBERS — tags ("Rytmy mowy" & "Kamień probierczy · gra" already in chrome dictionary above)
"Teoria liczb · audio":"Number theory · audio","Geometria konstrukcyjna":"Constructive geometry","Symetria pięciokrotna":"Five-fold symmetry","Geometria przestrzenna · 3D":"Spatial geometry · 3D","Proporcja w ciele i sztuce":"Proportion in body and art","Architektura · dynamiczna symetria":"Architecture · dynamic symmetry","Proporcja w malarstwie":"Proportion in painting","Filotaksja · NA ŻYWO":"Phyllotaxis · LIVE","Transmisja wiedzy · 3D":"Transmission of knowledge · 3D","Powrót do Pitagorasa":"Return to Pythagoras",
// CHAMBERS — cards
"Tetraktys 1+2+3+4=10 i harmonia liczb. Liczba, którą da się usłyszeć.":"The tetractys 1+2+3+4=10 and the harmony of number. A number you can hear.",
"Boska proporcja: φ, złoty prostokąt, liczba, która zawiera samą siebie.":"The divine proportion: φ, the golden rectangle, the number that contains itself.",
"Pentagram jako maszyna φ — każde przecięcie tnie w złotej proporcji. Aż po quasikryształy.":"The pentagram as a φ machine — every intersection cuts in the golden ratio. All the way to quasicrystals.",
"„Dwa skarby geometrii” Keplera. Pięć brył platońskich; trzy złote prostokąty w dwudziestościanie.":"Kepler's „two treasures of geometry”. The five Platonic solids; three golden rectangles in the icosahedron.",
"Człowiek Witruwiański, kanon Zeisinga, Modulor. Tu Ghyka najczęściej się myli.":"Vitruvian Man, Zeising's canon, the Modulor. Here Ghyka most often errs.",
"Partenon, Notre-Dame, prostokąty dynamiczne Hambidge'a (√2…√5, φ).":"The Parthenon, Notre-Dame, Hambidge's dynamic rectangles (√2…√5, φ).",
"Złota proporcja w malarstwie i rzeźbie: Botticelli, Leonardo, Dürer.":"The golden proportion in painting and sculpture: Botticelli, Leonardo, Dürer.",
"Rytm i metrum jako liczba. Notacja Serviena; metafora jako analogía A:B::C:D.":"Rhythm and metre as number. Servien's notation; metaphor as analogía A:B::C:D.",
"Złoty kąt 137,5°. Dlaczego słonecznik i szyszka liczą spiralami Fibonacciego.":"The golden angle 137.5°. Why the sunflower and the pine cone count in Fibonacci spirals.",
"„Światło pod korcem”: Pitagoras, loże katedralne, masoneria. 2500 lat przekazu.":"„The light under the bushel”: Pythagoras, the cathedral lodges, Freemasonry. 2500 years of transmission.",
"Cantor, Einstein, Schrödinger; materia jako liczba. Bergsonowskie trwanie.":"Cantor, Einstein, Schrödinger; matter as number. Bergsonian duration.",
"Zmierz sam słynne mity — nautilus, Partenon, Mona Lisa — i odróżnij φ od pobożnych życzeń.":"Measure the famous myths yourself — the nautilus, the Parthenon, the Mona Lisa — and tell φ from wishful thinking.",
// CHAMBERS — idea
"Zanim φ stało się estetyką, było słyszalne: proste stosunki długości struny dają współbrzmienia. Liczba zamienia się w harmonię.":"Before φ became aesthetics, it was audible: simple ratios of string length give consonances. Number turns into harmony.",
"Złoty prostokąt ma cudowną własność: odetnij od niego kwadrat, a zostanie mniejszy złoty prostokąt — i tak bez końca. To samopodobieństwo rysuje złotą spiralę.":"The golden rectangle has a wonderful property: cut a square off it and a smaller golden rectangle remains — and so on without end. This self-similarity draws the golden spiral.",
"W pięcioramiennej gwieździe φ jest wszędzie; w środku rodzi się mniejszy pentagram — i tak w nieskończoność. Pięciokąt sam się reprodukuje.":"In the five-pointed star φ is everywhere; at the centre a smaller pentagram is born — and so to infinity. The pentagon reproduces itself.",
"Dwunasto- i dwudziestościan są zbudowane z φ. Trzy złote prostokąty wpięte prostopadle dają 12 wierzchołków ikosaedru.":"The dodecahedron and icosahedron are built from φ. Three golden rectangles set perpendicular give the 12 vertices of the icosahedron.",
"Marzenie o jednej proporcji rządzącej ciałem jest stare i piękne — i właśnie dlatego niebezpieczne. Łatwo zobaczyć φ tam, gdzie go nie ma.":"The dream of a single proportion governing the body is old and beautiful — and for that very reason dangerous. It is easy to see φ where it is not.",
"Czy Grecy projektowali wedle φ? Pomiary bywają dobierane tak długo, aż liczba się zgodzi.":"Did the Greeks design according to φ? Measurements are sometimes picked until the number agrees.",
"Eurytmia — „dobry rytm” — to marzenie o φ jako tajnym kluczu kompozycji. Częściej to my dorysowujemy φ niż artysta.":"Eurythmy — „good rhythm” — is the dream of φ as the secret key of composition. More often it is we who draw φ in, not the artist.",
"Ghyka chce pokazać, że ten sam Logos działa w geometrii świątyni i w wierszu. Most między liczbą a językiem.":"Ghyka wants to show that the same Logos works in the geometry of the temple and in the poem. A bridge between number and language.",
"Złoty kąt to jedyny sposób rozłożenia nasion bez zasłaniania i bez luk. Natura znalazła to, minimalizując energię.":"The golden angle is the only way to arrange seeds without shading and without gaps. Nature found it by minimizing energy.",
"Pitagorejska wiedza o proporcji nie zniknęła z katastrofą bractwa — przepływała przez Akademię, Aleksandrię, strzechy katedralne, aż po fizykę quasikryształów.":"Pythagorean knowledge of proportion did not vanish with the brotherhood's catastrophe — it flowed through the Academy, Alexandria, the cathedral guilds, all the way to the physics of quasicrystals.",
"Ghyka twierdzi, że fizyka XX wieku spełniła ideał pitagorejski: ostateczną realnością jest wzór matematyczny.":"Ghyka claims that twentieth-century physics fulfilled the Pythagorean ideal: the ultimate reality is a mathematical formula.",
"Najważniejsza komnata, której u Ghyki nie ma. Uczy odruchu: skąd wiemy, że to naprawdę φ, a nie nasza chęć, by je zobaczyć?":"The most important chamber, which Ghyka lacks. It teaches the reflex: how do we know it is really φ, and not our wish to see it?",
// CHAMBERS — doo (what you do)
"Grywalne: klikasz świecące kule tetraktysu i słyszysz pitagorejskie interwały — oktawę 2:1, kwintę 3:2, kwartę 4:3. Słyszysz też, że φ brzmi obco.":"Playable: you click the glowing spheres of the tetractys and hear the Pythagorean intervals — the octave 2:1, the fifth 3:2, the fourth 4:3. You also hear that φ sounds alien.",
"Grywalne: odkrywasz φ suwakiem (x²=x+1), odcinasz kwadraty rodzące spiralę i patrzysz, jak ilorazy Fibonacciego gonią φ.":"Playable: you discover φ with a slider (x²=x+1), cut squares that breed the spiral and watch the Fibonacci ratios chase φ.",
"Grywalne: pentagram, nieskończone zejście, dowód „pięciokąt nie kafelkuje” i żywy shader quasikryształu (Penrose → Shechtman).":"Playable: the pentagram, the infinite descent, the proof that „the pentagon does not tile” and a live quasicrystal shader (Penrose → Shechtman).",
"Grywalne 3D: obracasz pięć brył, odsłaniasz trzy złote prostokąty, sprawdzasz współrzędne (0,±1,±φ); quiz na koniec.":"Playable 3D: you rotate the five solids, reveal the three golden rectangles, check the coordinates (0,±1,±φ); a quiz at the end.",
"Plan: gra „prawda czy apofenia?” — nakładasz siatki φ na figurę i sam dobierasz punkty; wychodzi φ, √2 albo nic.":"Planned: a game „truth or apophenia?” — you overlay φ grids on a figure and pick the points yourself; out comes φ, √2 or nothing.",
"Plan: nakładasz dynamiczne prostokąty na fasady i sam mierzysz — i widzisz, jak wynik zależy od wyboru krawędzi.":"Planned: you overlay dynamic rectangles on facades and measure yourself — and see how the result depends on the choice of edge.",
"Plan: nakładasz siatki na „Narodziny Wenus” i studia Dürera, dobierasz punkty i testujesz hipotezę.":"Planned: you overlay grids on „The Birth of Venus” and Dürer's studies, pick points and test the hypothesis.",
"Plan: wklejasz polski wiersz, system zaznacza rytm prozodyczny i pokazuje proporcje akcentów.":"Planned: you paste in a Polish poem, the system marks the prosodic rhythm and shows the proportions of the stresses.",
"Grywalne niżej: kręcisz kątem rozbieżności i patrzysz, jak głowa kwiatu przeskakuje między idealnym upakowaniem a szprychami.":"Playable below: you turn the divergence angle and watch the flower head jump between perfect packing and spokes.",
"Grywalne 3D: konstelacja 17 ogniw na złotej spirali czasu; gra „prześledź przekaz w kolejności” rysuje świetlistą nić.":"Playable 3D: a constellation of 17 links on the golden spiral of time; the game „trace the transmission in order” draws a luminous thread.",
"Plan: pakiety falowe Schrödingera; krystalografia 5-krotna vs 6-krotna; oś „liczba staje się materią”.":"Planned: Schrödinger wave packets; 5-fold vs 6-fold crystallography; the axis „number becomes matter”.",
"Grywalne: przeciągasz prostokąt pomiarowy, nakładasz złotą spiralę, zgadujesz werdykt i odsłaniasz prawdę z danymi. Nautilus ≈1,33; karta 1,586.":"Playable: you drag a measuring rectangle, overlay the golden spiral, guess the verdict and reveal the truth with data. Nautilus ≈1.33; card 1.586.",
// CHAMBERS — math
"Tetraktys=10. Oktawa 1:2, kwinta 2:3, kwarta 3:4. φ nie jest interwałem.":"Tetractys=10. Octave 1:2, fifth 2:3, fourth 3:4. φ is not an interval.",
"φ=(1+√5)/2; φ²=φ+1; 1/φ=φ−1. Fₙ₊₁/Fₙ → φ.":"φ=(1+√5)/2; φ²=φ+1; 1/φ=φ−1. Fₙ₊₁/Fₙ → φ.",
"Przekątna/bok pięciokąta = φ. Kafle Penrose'a; dyfrakcja Shechtmana (1982).":"Diagonal/side of a pentagon = φ. Penrose tiles; Shechtman's diffraction (1982).",
"Wierzchołki ikosaedru: cykliczne (0,±1,±φ). Kepler: tw. Pitagorasa i złoty podział.":"Vertices of the icosahedron: cyclic (0,±1,±φ). Kepler: the theorem of Pythagoras and the golden section.",
"Zeising (1854); Modulor (φ + Fibonacci). Krytyka: Markowsky (1992).":"Zeising (1854); Modulor (φ + Fibonacci). Critique: Markowsky (1992).",
"Stosunki √2, √3, √5, φ. Hambidge (1920); krytyka Neveux/Markowsky.":"Ratios √2, √3, √5, φ. Hambidge (1920); critique by Neveux/Markowsky.",
"Kanon Polikleta; studia proporcji Dürera. Brak dowodu intencji φ.":"The canon of Polykleitos; Dürer's proportion studies. No proof of φ intent.",
"Pius Servien (1930): formalizacja rytmu. Metafora = proporcja czteroczłonowa.":"Pius Servien (1930): a formalization of rhythm. Metaphor = a four-term proportion.",
"Model Vogla: θ=n·137,507°, r=c·√n. Parastychy = zbieżne ułamka łańcuchowego.":"Vogel's model: θ=n·137.507°, r=c·√n. Parastichies = convergents of the continued fraction.",
"Kroton → Aleksandria → Bauhütte → 1717. Pentagram jako symbolon.":"Croton → Alexandria → Bauhütte → 1717. The pentagram as symbolon.",
"Mechanika falowa de Broglie/Schrödinger; czasoprzestrzeń jako struktura geometryczna.":"Wave mechanics of de Broglie/Schrödinger; spacetime as a geometric structure.",
"Test: rozkład zmierzonych stosunków vs 1,618. Bias potwierdzenia, dobór punktów.":"Test: the distribution of measured ratios vs 1.618. Confirmation bias, point selection.",
// CHAMBERS — verdict text (vt)
"Akustyka stosunków jest twarda; „muzyka sfer” to metafora.":"The acoustics of ratios is hard; the „music of the spheres” is a metaphor.",
"Czysta geometria — tu Ghyka stoi na granicie.":"Pure geometry — here Ghyka stands on granite.",
"Mistykę pięciokąta fizyka potwierdziła Noblem 2011.":"The mysticism of the pentagon was confirmed by physics with the 2011 Nobel.",
"Współrzędne zgadzają się co do cyfry — żelazny rdzeń.":"The coordinates agree to the digit — an iron core.",
"Serce romantycznej numerologii. Komnata uczy zachwyt sprawdzać.":"The heart of romantic numerology. The chamber teaches you to verify your wonder.",
"Geometria prostokątów realna; „dynamiczna symetria” jako metoda — naciągana.":"The geometry of the rectangles is real; „dynamic symmetry” as a method is forced.",
"Piękne, ale w większości dorysowane po fakcie.":"Beautiful, but mostly drawn in after the fact.",
"Notacja rytmu realna; „ten sam Logos” — piękna spekulacja.":"The notation of rhythm is real; „the same Logos” is a beautiful speculation.",
"Twarda nauka — Douady & Couder (1992) wyprowadzili kąt z dynamiki.":"Hard science — Douady & Couder (1992) derived the angle from dynamics.",
"Twój ezoteryczny rdzeń — historia transmisji, czytana z dystansem.":"Your esoteric core — a history of transmission, read at a distance.",
"Fizyka twarda; „spełnienie Pitagorasa” — efektowna interpretacja.":"The physics is hard; „the fulfilment of Pythagoras” is a striking interpretation.",
"Paradoksalnie najbardziej pro-Ghykowa komnata: ratuje to, co u niego prawdziwe.":"Paradoxically the most pro-Ghyka chamber: it rescues what is true in him.",
// chips / verdict labels (atlas cards + modal)
"Romantyzm":"Romanticism","Mieszany":"Mixed","Krytyka":"Critique","Rygor":"Rigor",
"otwórz 3D ↗":"open 3D ↗","graj ↓":"play ↓","plan →":"plan →",
// garden presets / badges
"Złoty kąt":"Golden angle","2/5 (144°)":"2/5 (144°)","1/3 (120°)":"1/3 (120°)","1/4 (90°)":"1/4 (90°)",
"= złoty kąt":"= golden angle",
// garden spiral badge (fragments split by <b>)
"szprychy:":"spokes:","· układ wymierny":"· rational arrangement",
"spirale:":"spirals:","· poza złotym kątem":"· off the golden angle","· Fibonacci":"· Fibonacci",
"· = złoty kąt":"· = golden angle",

/* ===== Probierz claims & reveals — split into text-node fragments (CASES contain <b>) ===== */
// parthenon claim
"„Fasada Partenonu jest wpisana w idealny":"„The facade of the Parthenon is inscribed in a perfect","— Grecy projektowali wedle φ.\"":"— the Greeks designed according to φ.”",
// parthenon reveal
"Zmierz różne krawędzie — i sam zobacz problem: zależnie od tego, gdzie postawisz linijkę, wychodzi 1,6, 1,7, a nawet 2,0. Nie ma":"Measure different edges — and see the problem for yourself: depending on where you place the ruler, you get 1.6, 1.7, even 2.0. There is",
"żadnego dokumentu":"no document",
", że Fidiasz celował w φ; samo słowo „φ\" ukuto 2300 lat później. To klasyczna":", that Phidias aimed at φ; the very word „φ” was coined 2300 years later. This is a classic case of",
"apofenia":"apophenia",
": dobierasz punkty, aż liczba się zgodzi (Markowsky 1992).":": you pick the points until the number agrees (Markowsky 1992).",
// nautilus claim
"„Muszla łodzika to żywa":"„The nautilus shell is a living","— natura rośnie wedle φ.\"":"— nature grows according to φ.”",
// nautilus reveal
"Muszla to spirala logarytmiczna — owszem. Ale jej komory poszerzają się o":"The shell is a logarithmic spiral — true. But its chambers widen by",
"≈1,33 na obrót":"≈1.33 per turn",
", nie o φ. Nałóż złotą spiralę (φ na ćwierć obrotu = ~6,85 na pełny obrót) —":", not by φ. Overlay the golden spiral (φ per quarter-turn = ~6.85 per full turn) —",
"rozjeżdża się natychmiast":"it diverges at once",
". „Logarytmiczna\" pomylono ze „złotą\". Piękna, ale inna liczba.":". „Logarithmic” was confused with „golden”. A beautiful, but different, number.",
// monalisa claim
"„Twarz Mony Lisy zbudowana jest na":"„The face of the Mona Lisa is built on the","złotej proporcji":"golden proportion","— Leonardo zaszył w niej φ.\"":"— Leonardo wove φ into it.”",
// monalisa reveal
"Leonardo ilustrował „De divina proportione\" Pacioliego — znał φ. Ale w obrazie":"Leonardo illustrated Pacioli's „De divina proportione” — he knew φ. But in the painting there is",
"nie ma jej śladu":"no trace of it",
": prostokąty „φ\" rysuje się po dowolnie wybranych punktach twarzy. Przesuń pomiar — φ „znajdziesz\" wszędzie i nigdzie. Dowodu brak.":": the „φ” rectangles are drawn over arbitrarily chosen points of the face. Move the measurement — you will „find” φ everywhere and nowhere. There is no proof.",
// card claim
"„Karta płatnicza to":"„A payment card is a","— dlatego tak dobrze leży w dłoni.\"":"— that is why it sits so well in the hand.”",
// card reveal
"Zmierz ją: 85,6 × 53,98 mm →":"Measure it: 85.6 × 53.98 mm →",
". Blisko, ale to norma":". Close, but that is the standard","ISO 7810":"ISO 7810",
", nie φ — różnica ~2%. Wpadła w okolicę φ przypadkiem (i dla wygody produkcji), nie z projektu wedle złotej liczby.":", not φ — a difference of ~2%. It landed near φ by chance (and for ease of manufacture), not by design according to the golden number.",
// hint (spiral) — split by <b>wzrostu</b>
"Pokręć suwakiem":"Turn the","wzrostu":"growth slider",
", aż spirala obejmie muszlę. Potem nałóż złotą spiralę.":"until the spiral wraps the shell. Then overlay the golden spiral.",

/* ===== Filary panel notes — split into text-node fragments (PILLARS notes contain <b>) ===== */
// idle note
"Złota liczba należy do":"The golden number belongs to a","tematu":"subject",
", nie do jednego autora. Ośmiu myślicieli niosło ją przez wieki — od pitagorejskiego bractwa po quasikryształy.":", not to a single author. Eight thinkers carried it through the ages — from the Pythagorean brotherhood to quasicrystals.",
"jest jednym z tych filarów: wielkim syntetykiem, lecz nie wynalazcą. Najedź na kolumnę, by poznać filar.":"is one of these pillars: a great synthesist, but not the inventor. Hover a column to learn the pillar.",
// Pythagoras
"Założyciel tradycji.":"Founder of the tradition.","Pentagram":"The pentagram",
"(pentalfa) — tajny znak rozpoznawczy wtajemniczonych — sam w sobie kryje złoty podział. Liczba jako fundament bytu i harmonii.":"(pentalpha) — the secret sign of recognition among initiates — itself hides the golden section. Number as the foundation of being and harmony.",
// Euclid
"Pierwsza":"The first","matematycznie ścisła":"mathematically rigorous",
"definicja złotego cięcia — bez mistyki, czysta geometria. Od Euklidesa φ jest twierdzeniem, nie wierzeniem.":"definition of the golden cut — without mysticism, pure geometry. From Euclid onward φ is a theorem, not a belief.",
// Fibonacci (bold middle "złotej liczby")
"Ciąg, w którym każdy wyraz jest sumą dwóch poprzednich — a stosunek sąsiednich wyrazów zbiega do":"A sequence in which each term is the sum of the two before it — and the ratio of neighbouring terms converges to the",
"złotej liczby":"golden number",
". Most między arytmetyką a wzrostem w przyrodzie.":". A bridge between arithmetic and growth in nature.",
// Pacioli (first fragment "Złota proporcja")
"Złota proporcja":"The golden proportion",
"ochrzczona jako „boska\"":"christened „divine”",
". Pacioli pisze traktat, Leonardo rysuje bryły i kanon ciała. Renesansowy moment, w którym φ wchodzi do sztuki.":". Pacioli writes the treatise, Leonardo draws the solids and the canon of the body. The Renaissance moment when φ enters art.",
// Kepler
"Stawia złoty podział obok twierdzenia Pitagorasa jako jeden z dwóch":"He sets the golden section beside the theorem of Pythagoras as one of the two","klejnotów geometrii":"jewels of geometry",
". Bryły platońskie w modelu kosmosu — astronomia szuka w nich porządku.":". The Platonic solids in a model of the cosmos — astronomy seeks order in them.",
// D'Arcy Thompson
"Spirala logarytmiczna":"The logarithmic spiral",
"i wzrost gnomoniczny jako prawa kształtu w przyrodzie: muszle, rogi, liście. Biologia jako geometria — tu φ przestaje być estetyką, a staje się prawem wzrostu.":"and gnomonic growth as laws of form in nature: shells, horns, leaves. Biology as geometry — here φ ceases to be aesthetics and becomes a law of growth.",
// Ghyka
"Przewodnik tego portalu — i":"The guide of this portal — and","jeden z filarów, nie autor tematu":"one of the pillars, not the author of the subject",
". Spina całą tradycję w jedno. Zarazem ostrzeżenie: tu kończy się rygor, a zaczyna romantyzm. Czytamy go z podziwem i czujnością.":". He binds the whole tradition into one. At the same time a warning: here rigor ends and romanticism begins. We read him with admiration and vigilance.",
// Penrose & Shechtman
"5-krotna symetria w materii.":"5-fold symmetry in matter.",
"Kafle Penrose’a pokrywają płaszczyznę bez powtórzeń, z φ wpisanym w proporcje; Shechtman odkrywa quasikryształy — Nobel 2011. Naukowa pointa całej tradycji.":"Penrose tiles cover the plane without repetition, with φ inscribed in their proportions; Shechtman discovers quasicrystals — Nobel 2011. The scientific punch line of the whole tradition.",

// === Komnata V · Ciało (cialo.html) ===
"kreślę ciało":"drawing the body",
// dock — navel
"górny : dolny":"upper : lower","od φ":"from φ","↺ pępek":"↺ navel",
// dock — Vitruvius
"▦ Kwadrat":"▦ Square","◯ Koło":"◯ Circle","wzrost : rozpiętość =":"height : armspan =",
// dock — Modulor
"seria":"series","czerwona":"red","niebieska":"blue","podniesiona ręka":"raised hand",
// MOVES — headings ("Witruwiusz" & "Modulor" appear elsewhere; Modulor below)
"Pępek i złoty podział":"The navel and the golden section","Modulor":"Modulor",
// MOVES — body lines
"Przesuwaj poziomą linijkę po sylwetce. Odczyt pokazuje stosunek odcinka górnego do dolnego. Pępek leży około 0,61–0,63 wysokości — blisko φ, ale nie w punkt, i u każdego człowieka inaczej.":"Slide the horizontal ruler over the figure. The readout shows the ratio of the upper segment to the lower. The navel sits at about 0.61–0.63 of the height — close to φ, but not exactly, and different in every person.",
"Nałóż kwadrat (wzrost ≈ rozpiętość ramion) i koło o środku w pępku. To jest faktyczne twierdzenie Witruwiusza z „O architekturze” — proporcje proste, współmierne, kwadrat 1:1. Nie φ.":"Overlay a square (height ≈ armspan) and a circle centred on the navel. This is the actual claim of Vitruvius in „On Architecture” — simple, commensurable proportions, a 1:1 square. Not φ.",
"Le Corbusier (1948) celowo wpisał φ w skalę człowieka: postać 183 cm, pępek w φ, podniesiona ręka na 226 cm. Czerwona i niebieska seria miar wspina się po ciele jak Fibonacci.":"Le Corbusier (1948) deliberately built φ into a human scale: a figure of 183 cm, the navel at φ, the raised hand at 226 cm. The red and blue series of measures climb the body like Fibonacci.",
// MOVES — fact fragments (split by <b>)
"Zeising twierdził, że pępek dzieli ciało":"Zeising claimed that the navel divides the body",
"dokładnie":"exactly",
"w φ. To dobór pod tezę — realne ciała dają":"at φ. That is cherry-picking to fit the thesis — real bodies give",
"nigdy":"never",
"nie wspomniał φ. „Człowiek φ-witruwiański” to":"never mentioned φ. The „φ-Vitruvian man” is a",
"współczesna dorobiona":"modern, fabricated",
"nakładka.":"overlay.",
"Tu φ jest":"Here φ is",
"prawdziwe":"genuine",
"— bo architekt je":"— because the architect",
"zaprojektował":"designed it in",
", a nie dlatego, że ciało samo z siebie jest złote.":", and not because the body is golden in itself.",
// chip
"Romantyzm — serce numerologii":"Romanticism — the heart of numerology",

// === Komnata VI · Świątynia (swiatynia.html) ===
"wznoszę świątynię":"raising the temple",
// panel base
"Czy Partenon zna φ?":"Does the Parthenon know φ?",
"werdykt mieszany — wybierz nakładkę u dołu":"a mixed verdict — choose an overlay below",
"„»Partenon = φ« to mit. Ale Grecy mieli realny, piękny system proporcji.”":"„»Parthenon = φ« is a myth. But the Greeks did have a real, beautiful system of proportion.”",
"SECTIO AUREA · Komnata VI":"SECTIO AUREA · Chamber VI",
"Trzy nakładki nałożone na tę samą fasadę. Pierwsza to":"Three overlays laid on the same facade. The first is a",
"legenda":"legend",
", dwie kolejne —":", the next two —",
"prawdziwy rygor":"genuine rigor",
". Porównaj, która faktycznie pasuje do bryły.":". Compare which one actually fits the structure.",
"Werdykt · Mieszany":"Verdict · Mixed",
// panel nums labels
"stosunek":"ratio","charakter":"character","metoda":"method",
// MODES — names, glosses
"Mit złotego prostokąta":"The golden-rectangle myth","Dynamiczna symetria":"Dynamic symmetry","Prawdziwe liczby":"The real numbers",
"legenda, którą trzeba naciągnąć":"a legend that has to be forced","realna grecka logika proporcji":"the real Greek logic of proportion","współmierna harmonia liczb całkowitych":"the commensurable harmony of whole numbers",
// MODES — a/b/cN chips
"naciągane":"forced","konstruowalne":"constructible","współmierne":"commensurable","Hambidge":"Hambidge","moduł":"module","pomiar":"measurement",
// MODES — quotes + sources
"Nie ma żadnego niezawodnego dowodu, że Partenon zaprojektowano w oparciu o złoty podział.":"There is no reliable evidence that the Parthenon was designed on the golden section.",
"George Markowsky, „Misconceptions about the Golden Ratio” (1992)":"George Markowsky, „Misconceptions about the Golden Ratio” (1992)",
"Grecka sztuka projektowania operowała stosunkami niewymiernymi, ale konstruowalnymi — prostokątami pierwiastkowymi.":"The Greek art of design worked with irrational but constructible ratios — root rectangles.",
"Jay Hambidge, „Dynamic Symmetry” (1920)":"Jay Hambidge, „Dynamic Symmetry” (1920)",
"Szerokość do wysokości, długość do szerokości, rozstaw kolumn do ich średnicy — wszędzie powraca stosunek 9 do 4.":"Width to height, length to width, column spacing to their diameter — everywhere the ratio of 9 to 4 returns.",
"Analiza wymiarów Partenonu (kanon dorycki)":"Analysis of the Parthenon's dimensions (the Doric canon)",
// MODES — note fragments (split by <b>)
"pasuje tylko wtedy":"fits only when",
", gdy dobierzemy, skąd dokąd mierzyć: zaczynamy od drugiego stopnia (czerwone linie poniżej) i":"we choose where to measure from and to: starting from the second step (red lines below) and",
"pomijamy cały tympanon":"omitting the whole pediment",
"(czerwone linie u góry). Inaczej proporcja 1:φ nie wychodzi. To nie projekt — to":"(red lines above). Otherwise the 1:φ ratio does not come out. This is no design — it is",
"dopasowanie po fakcie":"a fit after the fact",
"Prostokąty":"The rectangles",
"buduje się cyrklem i linijką z kwadratu. To była":"are built with compass and straightedge from a square. This was the",
"prawdziwa":"real",
"grecka logika kompozycji — i pasuje do bryły lepiej niż mit φ. A √5 wiąże się ze złotą liczbą wprost:":"Greek logic of composition — and it fits the structure better than the φ myth. And √5 is tied to the golden number directly:",
"(przekątna prostokąta √5).":"(the diagonal of the √5 rectangle).",
"Partenonem rządzi prosty,":"The Parthenon is governed by a simple,",
"współmierny":"commensurable",
"— powtórzony w wielu wymiarach budowli. To grecka harmonia":"— repeated across many dimensions of the building. This is a Greek harmony of",
"liczb całkowitych":"whole numbers",
", a nie niewymierne φ. Rygor był — tylko liczbowy, modularny.":", not the irrational φ. Rigor there was — only numerical, modular.",
// verdict chip labels
"Mit — naciągane":"Myth — forced","Rygor — realne":"Rigor — real",

// === Komnata VII · Eurytmia (eurytmia.html) ===
"naciągam siatkę":"stretching the grid",
// dock
"obrót":"rotation","⇄ odbij":"⇄ mirror","trafień":"hits","siatka φ":"φ grid","trójpodział":"rule of thirds","różnica":"difference","moduł głowy":"head module","głów":"heads","podziałki":"subdivisions",
// MOVES — headings
"Złota spirala na płótnie":"The golden spiral on the canvas","Φ kontra trójpodział":"Φ versus the rule of thirds","Dürer naprawdę":"Dürer for real",
// MOVES — body lines
"Przeciągnij i obróć złotą spiralę po schematycznej kompozycji. Zobaczysz, że przy odrobinie swobody potrafi „trafić” w niemal każdy element — bo to TY wybierasz, gdzie ją zaczepić. Niemal każdy obraz da „dopasowanie” do φ.":"Drag and rotate the golden spiral over a schematic composition. You will see that, with a little freedom, it can „hit” almost any element — because YOU choose where to anchor it. Almost any picture will yield a „match” to φ.",
"Na ten sam obraz nałóż siatkę φ (linie w 0,382 i 0,618) ORAZ siatkę trójpodziału (0,333 i 0,667). Włącz obie naraz — leżą niemal na sobie. Deklarowane „φ w sztuce” zwykle nie da się odróżnić od zwykłej reguły trójpodziału.":"On the same picture overlay the φ grid (lines at 0.382 and 0.618) AND the rule-of-thirds grid (0.333 and 0.667). Turn on both at once — they lie almost on top of each other. Claimed „φ in art” usually cannot be told apart from the plain rule of thirds.",
"Dürer w „Czterech księgach o proporcjach człowieka” dzielił figurę na MODUŁY głowy (zwykle 8 głów wzrostu) i ich ułamki — 1/2, 1/3, 1/4. Nie używał φ. Prawdziwi mistrzowie mieli SYSTEMY proporcji — tyle że nie złoty podział.":"In his „Four Books on Human Proportion” Dürer divided the figure into head MODULES (usually 8 heads tall) and their fractions — 1/2, 1/3, 1/4. He did not use φ. The true masters had SYSTEMS of proportion — just not the golden section.",
// MOVES — fact fragments (split by <b>)
"wolny wybór zaczepienia ⟹":"free choice of anchor ⟹",
"prawie każda kompozycja":"almost any composition",
"„pasuje” do φ · to dobieranie pod tezę":"„fits” φ · this is cherry-picking to fit the thesis",
"0,618 vs 0,667 — różnica":"0.618 vs 0.667 — a difference of",
"· w skali obrazu mieści się w błędzie pomiaru":"· at the scale of a picture it falls within measurement error",
"system modularny:":"a modular system:",
"wzrost = N × głowa":"height = N × head",
"+ ułamki · u Dürera ani śladu φ":"+ fractions · in Dürer not a trace of φ",
// panel eq fragments (split by <span class="x">)
"wzrost =":"height =",
"× głowa  ·  ułamki ½, ⅓, ¼":"× head  ·  fractions ½, ⅓, ¼",
// chip
"Romantyzm — siatka po fakcie":"Romanticism — a grid after the fact",
// hints
"Przeciągnij spiralę po obrazie, obracaj suwakiem. Patrz, ile cech „dotyka”.":"Drag the spiral over the picture, rotate with the slider. Watch how many features it „touches”.",
"Włącz obie siatki naraz. Zobacz, jak blisko siebie leżą linie φ i trójpodziału.":"Turn on both grids at once. See how close the φ and rule-of-thirds lines lie.",
"Zmień liczbę „głów” wzrostu i włącz podziałki. To realny system Dürera.":"Change the number of „heads” of height and turn on the subdivisions. This is Dürer's real system.",

// === Komnata VIII · Słowo (slowo.html) ===
"odmierzam czas":"measuring out time",
// dock — buttons / labels
"Kulminacja w ½":"Climax at ½","Kulminacja w φ":"Climax at φ","▶ Przejdź łuk (89 taktów)":"▶ Cross the arc (89 bars)","kulminacja: takt":"climax: bar","● Wystukaj rytm":"● Tap out a rhythm","ostatni iloraz:":"last ratio:",
// hint fragments (split by <b>)
"φ działa w":"φ works in","czasie":"time",", nie w przestrzeni":", not in space",
// MODES (rt/t/sub)
"Punkt kulminacji":"The point of climax","A / B na ucho":"A / B by ear","Bartók":"Bartók","Lendvai · sporne":"Lendvai · disputed","Rytm mowy":"Rhythm of speech","Servien · wystukaj":"Servien · tap it out",
// PANELS — eyebrows, headings, glosses
"Prozodia · kulminacja":"Prosody · climax","Złota kulminacja":"The golden climax","gdzie postawić szczyt frazy — w połowie czy w 0,618?":"where to place the peak of a phrase — at the half or at 0.618?",
"Muzyka · Béla Bartók":"Music · Béla Bartók","Łuk 55 / 89":"The 55 / 89 arc","Ernő Lendvai: Bartók komponował na φ i Fibonaccim":"Ernő Lendvai: Bartók composed on φ and Fibonacci",
"Język · Pius Servien":"Language · Pius Servien","czy w rytmie zdania mieszka φ?":"does φ dwell in the rhythm of a sentence?",
// PANELS — body fragments (split by <b>)
"Wielu kompozytorów i poetów stawia":"Many composers and poets place the",
"punkt kulminacyjny":"climactic point",
"nie pośrodku, lecz później — około":"not in the middle but later — at about",
"trwania. Szczyt, który nadchodzi „za późno”, buduje większe napięcie. To realny chwyt warsztatowy: ucho słyszy różnicę. Posłuchaj obu wersji tej samej frazy.":"of the duration. A peak that arrives „too late” builds greater tension. This is a real craft device: the ear hears the difference. Listen to both versions of the same phrase.",
"Węgierski teoretyk":"The Hungarian theorist",
"Ernő Lendvai":"Ernő Lendvai",
"twierdził, że Bartók budował formy na":"claimed that Bartók built his forms on the",
"złotym podziale":"golden section",
"— np. kulminacja około":"— e.g. a climax at about",
"taktu 55 z 89":"bar 55 of 89",
"(kolejne liczby Fibonacciego). Bartók znał matematykę, więc brzmi to wiarygodnie.":"(successive Fibonacci numbers). Bartók knew mathematics, so it sounds plausible.",
"Uczciwie jednak:":"In fairness, though:",
"analiza Lendvaia jest":"Lendvai's analysis is",
"sporna":"disputed",
"— jednych przekonuje, inni mówią o dopasowaniu liczb po fakcie.":"— it convinces some, while others speak of fitting the numbers after the fact.",
"Pius Servien":"Pius Servien",
"szukał mierzalnych proporcji w rytmie mowy i wiersza. Wystukaj naturalny rytm — zobaczysz, że odstępy układają się w proste stosunki:":"sought measurable proportions in the rhythm of speech and verse. Tap out a natural rhythm — you will see the intervals fall into simple ratios:",
"(jak w muzyce), a nie w":"(as in music), and not in",
". φ w języku to najczęściej romantyczna projekcja.":". φ in language is most often a romantic projection.",
// panel nums labels
"złoty punkt":"golden point","rytm mowy":"speech rhythm",
// quote + src
"„Czas jest tworzywem muzyki i wiersza — a proporcja czasu bywa złota.”":"„Time is the material of music and verse — and the proportion of time is sometimes golden.”",
"parafraza prozodii dynamicznej":"a paraphrase of dynamic prosody",
// nowplaying static
"wybierz tryb i posłuchaj":"choose a mode and listen",
// mixed-verdict note (split by <b>) — "Werdykt — MIESZANY." handled by RX once MIESZANY added
"MIESZANY":"MIXED",
"W czasie φ bywa":"In time φ is sometimes",
"PRAWDZIWE":"REAL",
"— gdy twórca świadomie je wstawia (Bartók, i to sporne). „Złota” kulminacja działa na ucho. Ale „φ w każdym wierszu” to już numerologia.":"— when the maker consciously puts it in (Bartók, and even that is disputed). A „golden” climax works on the ear. But „φ in every poem” is already numerology.",
"◆ — Mieszany werdykt":"◆ — Mixed verdict",
// showNow dynamic readouts (name + sub)
"kulminacja w złotym podziale":"climax at the golden section","kulminacja w połowie frazy":"climax at the middle of the phrase","szczyt później — bardziej dramatycznie":"the peak later — more dramatic","szczyt pośrodku — spokojnie":"the peak in the middle — calm",
"takt 55 / 89":"bar 55 / 89","φ ≈ 0,618 · liczby Fibonacciego":"φ ≈ 0.618 · Fibonacci numbers","wg Ernő Lendvaia (analiza SPORNA)":"after Ernő Lendvai (a DISPUTED analysis)",
"1:1 · równo":"1:1 · even","3:2 · muzyczny":"3:2 · musical","2:1 · muzyczny":"2:1 · musical","φ · złoty":"φ · golden","najbliżej:":"nearest:",
"naturalny rytm = proste stosunki":"natural rhythm = simple ratios","φ w rytmie mowy zdarza się rzadko":"φ in speech rhythm happens rarely",
// applyMode hints (split by <b>)
"Posłuchaj obu kulminacji":"Listen to both climaxes",
"brzmi spokojnie ·":"sounds calm ·",
"— później, dramatyczniej":"— later, more dramatic",
"Łuk napięcia rośnie do":"The arc of tension rises to",
"taktu":"bar",
"55 z 89":"55 of 89",
"Wystukaj rytm:":"Tap out a rhythm:",
"spacja":"space",
"lub przycisk":"or the button",
"naturalnie wpada w 2:1 / 3:2":"it naturally falls into 2:1 / 3:2",

// === Komnata XI · Nauka (nauka.html) ===
"liczę zbieżność φ":"computing the convergence of φ",
// dock
"‹ wstecz":"‹ back","przybliżenie":"approximation","dalej ›":"next ›","▶ auto":"▶ auto","⏸ stop":"⏸ stop","kąt rozbieżności":"divergence angle","↺ złoty kąt":"↺ golden angle","↗ podziel (deflacja)":"↗ subdivide (deflation)","o krysztale życia":"on the crystal of life",
// MOVES — headings
"Ułamek łańcuchowy":"The continued fraction","Dlaczego liście":"Why leaves","Penrose i Schrödinger":"Penrose and Schrödinger",
// MOVES — body lines
"φ = 1 + 1/(1 + 1/(1 + …)) — same jedynki, w nieskończoność. Ucinając go, dostajesz iloraz kolejnych liczb Fibonacciego: 1/1, 2/1, 3/2, 5/3, 8/5, 13/8 … Ponieważ każdy współczynnik to najmniejsza możliwa jedynka, φ przybliża się ułamkami najtrudniej ze wszystkich liczb.":"φ = 1 + 1/(1 + 1/(1 + …)) — all ones, to infinity. Cut it off and you get the ratio of successive Fibonacci numbers: 1/1, 2/1, 3/2, 5/3, 8/5, 13/8 … Because every coefficient is the smallest possible one, φ is the hardest of all numbers to approximate by fractions.",
"Skoro φ opiera się przybliżeniu ułamkiem, złoty kąt 137,5° nigdy nie ustawia nasion w równe rzędy — żaden obrót nie domyka się okresowo. Efekt: upakowanie bez luk, fizyczne optimum. To wynik (Douady i Couder, 1992 — minimalizacja energii), nie magia.":"Since φ resists approximation by a fraction, the golden angle 137.5° never sets the seeds in even rows — no rotation ever closes up periodically. The effect: packing without gaps, a physical optimum. This is a result (Douady and Couder, 1992 — energy minimization), not magic.",
"Te same φ rządzą niperiodycznym kafelkowaniem Penrose’a (dwa romby o stosunku przekątnych φ) i prawdziwymi quasikryształami (Shechtman, Nobel 2011) — uporządkowanie dalekiego zasięgu bez powtarzalności. Schrödinger (1944) przewidział, że życie potrzebuje „kryształu aperiodycznego” — później okazało się nim DNA.":"The same φ governs Penrose's aperiodic tiling (two rhombi whose diagonals are in the ratio φ) and real quasicrystals (Shechtman, Nobel 2011) — long-range order without repetition. Schrödinger (1944) predicted that life needs an „aperiodic crystal” — which later turned out to be DNA.",
// MOVES — fact fragments (split by <b>)
"φ = [1; 1, 1, 1, …]  ·  zbieżne =":"φ = [1; 1, 1, 1, …]  ·  convergents =",
"Fₙ₊₁ / Fₙ":"Fₙ₊₁ / Fₙ",
"·  błąd · q² →":"·  error · q² →",
"(tw. Hurwitza)":"(Hurwitz's theorem)",
"złoty kąt = 360° · (2 − φ) =":"golden angle = 360° · (2 − φ) =",
"·  tylko tu spirala wypełnia się równomiernie":"·  only here does the spiral fill evenly",
"romby Penrose’a: cienki":"Penrose rhombi: thin",
", gruby":", thick",
"·  aperiodyczny porządek = quasikryształ":"·  aperiodic order = quasicrystal",
// HINTS
"krok po kroku — patrz, jak błąd maleje (wolniej niż dla π)":"step by step — watch the error shrink (slower than for π)",
"pokrętło kąta — równo pakuje się tylko przy 137,5°":"turn the angle dial — it packs evenly only at 137.5°",
"podziel romby (deflacja) — wzór nigdy się nie powtarza":"subdivide the rhombi (deflation) — the pattern never repeats",
// step + chip labels (note: "Ruch N / 3 · Nauka" not matched by RX → literal keys)
"Ruch 1 / 3 · Nauka":"Movement 1 / 3 · Science","Ruch 2 / 3 · Nauka":"Movement 2 / 3 · Science","Ruch 3 / 3 · Nauka":"Movement 3 / 3 · Science",
"RYGOR · NOBEL":"RIGOR · NOBEL",

// === Atlas — zmienione/nowe stringi (atlas.html) ===
// lead band fragment (split by <b>werdyktem</b> + <span>) — only the new tail fragments
"— rygor, mieszany czy romantyzm. Kliknij kartę —":"— rigor, mixed or romanticism. Click a card —",
"wszystkie dwanaście komnat":"all twelve chambers",
"jest już grywalnych.":"are now playable.",
// colophon
"Atlas kompletny · dwanaście grywalnych komnat · od rygoru po romantyzm":"Atlas complete · twelve playable chambers · from rigor to romanticism",
// new chamber tags (VIII, XI)
"Złoty podział w czasie":"The golden section in time","Najbardziej niewymierna liczba":"The most irrational number",
// chamber V · doo (changed → now playable)
"Grywalne: przeciągasz linię pomiarową po figurze (pępek ≈ 0,61–0,63, nie dokładnie φ), włączasz kwadrat i koło Witruwiusza, oglądasz φ-serię Modulora.":"Playable: you drag a measuring line across the figure (the navel ≈ 0.61–0.63, not exactly φ), switch on Vitruvius's square and circle, and look at the φ series of the Modulor.",
// chamber VI · doo (changed → now playable)
"Grywalne 3D: obracasz fasadę świątyni doryckiej i nakładasz prostokąt φ (mit, który nie pasuje), prostokąty pierwiastkowe Hambidge'a (√2·√3·√5) oraz współmierną siatkę 9:4.":"Playable 3D: you rotate a Doric temple facade and overlay the φ rectangle (a myth that does not fit), Hambidge's root rectangles (√2·√3·√5) and the commensurable 9:4 grid.",
// chamber VII · doo (changed → now playable)
"Grywalne: przesuwasz i obracasz złotą spiralę po kompozycji (trafia niemal wszędzie), porównujesz siatkę φ z trójpodziałem i dzielisz figurę na moduły głowy Dürera.":"Playable: you move and rotate the golden spiral over a composition (it hits almost everywhere), compare the φ grid with the rule of thirds and divide the figure into Dürer's head modules.",
// chamber VIII · card / idea / doo / math / vt (all new)
"Proporcja w czasie: kulminacja muzyczna w φ, łuk Bartóka, rytm mowy Serviena.":"Proportion in time: a musical climax at φ, Bartók's arc, Servien's rhythm of speech.",
"Czy ten sam Logos działa w geometrii świątyni i w biegu zdania? W czasie φ bywa prawdziwe — gdy twórca świadomie je wstawia.":"Does the same Logos work in the geometry of the temple and in the run of a sentence? In time φ is sometimes real — when the maker consciously puts it in.",
"Grywalne (audio): słuchasz kulminacji w ½ i w φ, oglądasz łuk Bartóka (takt 55 z 89 — sporne), wystukujesz rytm mowy i widzisz jego proporcje.":"Playable (audio): you listen to the climax at ½ and at φ, watch Bartók's arc (bar 55 of 89 — disputed), tap out the rhythm of speech and see its proportions.",
"Pius Servien (1930): formalizacja rytmu. Bartók/Lendvai: φ i Fibonacci w formie (sporne).":"Pius Servien (1930): a formalization of rhythm. Bartók/Lendvai: φ and Fibonacci in form (disputed).",
"Złota kulminacja działa na ucho; „φ w każdym wierszu” — już numerologia.":"The golden climax works on the ear; „φ in every poem” is already numerology.",
// chamber XI · card / idea / doo / math / vt (all new)
"Ułamek łańcuchowy, optymalne upakowanie, quasikryształy Penrose’a i Shechtmana.":"The continued fraction, optimal packing, the quasicrystals of Penrose and Shechtman.",
"Tu φ jest prawdziwe i głębokie — nie przez mistykę, lecz przez matematykę: liczba najtrudniejsza do przybliżenia ułamkiem rządzi upakowaniem liści i aperiodycznym ładem kryształów.":"Here φ is real and deep — not through mysticism, but through mathematics: the number hardest to approximate by a fraction governs the packing of leaves and the aperiodic order of crystals.",
"Grywalne: budujesz ułamek łańcuchowy φ=[1;1,1,…], kręcisz kątem rozbieżności (równe upakowanie tylko przy 137,5°) i deflujesz parkietaż Penrose’a.":"Playable: you build the continued fraction φ=[1;1,1,…], turn the divergence angle (even packing only at 137.5°) and deflate a Penrose tiling.",
"Ułamek [1;1,1,…]; tw. Hurwitza; złoty kąt 137,5° (Douady-Couder 1992); parkietaż Penrose’a; quasikryształy (Shechtman, Nobel 2011).":"The fraction [1;1,1,…]; Hurwitz's theorem; the golden angle 137.5° (Douady-Couder 1992); the Penrose tiling; quasicrystals (Shechtman, Nobel 2011).",
"Twardy rdzeń matematyczny; margines mieszany — „liczba życia” Bergsona to filozofia, nie dowód.":"A hard mathematical core; a mixed margin — Bergson's „number of life” is philosophy, not proof.",
};
/* wzorce z liczbami / interpolacją */
const RX=[
 [/^jeszcze (\d+) ✦ do rangi: (.+)$/,(m)=>`${m[1]} ✦ to rank: ${tr(m[2])}`],
 [/^Odznaki · (\d+) \/ (\d+)$/,(m)=>`Badges · ${m[1]} / ${m[2]}`],
 [/^Komnaty · (\d+) \/ (\d+)$/,(m)=>`Chambers · ${m[1]} / ${m[2]}`],
 [/^(\d+) ✦ złota$/,(m)=>`${m[1]} ✦ gold`],
 [/^Nowa komnata: (.+)$/,(m)=>`New chamber: ${tr(m[1])}`],
 [/^\+(\d+) ✦$/,(m)=>`+${m[1]} ✦`],
 /* ----- room-specific interpolated strings ----- */
 // topbar small label: "Komnata <ROMAN> · <Name>"
 [/^Komnata ([IVXLC]+) · (.+)$/,(m)=>`Chamber ${m[1]} · ${tr(m[2])}`],
 // proporcja / pentada move counter
 [/^Ruch (\d+) \/ (\d+)$/,(m)=>`Movement ${m[1]} / ${m[2]}`],
 // liczba dock: "rząd N"
 [/^rząd (\d+)$/,(m)=>`row ${m[1]}`],
 // pentada symmetry readout: "N-krotna", optionally with suffix
 [/^(\d+)-krotna( · kryształ| · quasikryształ)?$/,(m)=>`${m[1]}-fold${m[2]?(m[2]===' · kryształ'?' · crystal':' · quasicrystal'):''}`],
 // probierz exhibit step (single text node): "Eksponat N / 4 · <suffix>"
 [/^Eksponat (\d+) \/ (\d+) · (.+)$/,(m)=>`Exhibit ${m[1]} / ${m[2]} · ${tr(m[3])}`],
 // bryly quiz: middle fragment "/N · wynik"
 [/^\/(\d+) · wynik$/,(m)=>`/${m[1]} · score`],
 // bryly quiz finish: "Wynik: X / N"
 [/^Wynik: (\d+) \/ (\d+)$/,(m)=>`Result: ${m[1]} / ${m[2]}`],
 // loza years: "N p.n.e." / "N n.e."
 [/^(\d+) p\.n\.e\.$/,(m)=>`${m[1]} BCE`],
 [/^(\d+) n\.e\.$/,(m)=>`${m[1]} CE`],
 // loza meta: "<place> · N p.n.e." / "<place> · N n.e."
 [/^(.+) · (\d+) (p\.n\.e\.|n\.e\.)$/,(m)=>`${tr(m[1])} · ${m[2]} ${m[3]==='p.n.e.'?'BCE':'CE'}`],
 // loza game progress headers
 [/^✓ ogniwo (\d+) \/ (\d+)$/,(m)=>`✓ link ${m[1]} / ${m[2]}`],
 [/^(\d+) \/ (\d+) ogniw$/,(m)=>`${m[1]} / ${m[2]} links`],
 [/^(\d+) \/ (\d+) · pomyłek: (\d+)$/,(m)=>`${m[1]} / ${m[2]} · mistakes: ${m[3]}`],
 // loza game wrong-pick meta: "N p.n.e. — szukasz wcześniejszego"
 [/^(\d+) (p\.n\.e\.|n\.e\.) — szukasz wcześniejszego$/,(m)=>`${m[1]} ${m[2]==='p.n.e.'?'BCE':'CE'} — look for an earlier one`],
 // atlas card / modal chamber number: "KOMNATA <ROMAN>"
 [/^KOMNATA (.+)$/,(m)=>`CHAMBER ${m[1]}`],
 // garden badge fragments
 [/^(\d+) ramion$/,(m)=>`${m[1]} arms`],
 [/^≈ (\d+)$/,(m)=>`≈ ${m[1]}`],
 // garden distance readout: "· +N° od złotego" / "· −N° od złotego"
 [/^· ([+−-]?[\d.,]+)° od złotego$/,(m)=>`· ${m[1]}° from golden`],
 // toasty systemu złota: tytuł odznaki "🏅 Nazwa" + podlinia "Opis · +N ✦"
 [/^🏅 (.+)$/,(m)=>`🏅 ${tr(m[1])}`],
 [/^(.+) · \+(\d+) ✦$/,(m)=>`${tr(m[1])} · +${m[2]} ✦`],
 // werdykt w modalu atlasu: "Werdykt — Romantyzm." → "Verdict — Romanticism."
 [/^Werdykt — (.+)\.$/,(m)=>`Verdict — ${tr(m[1])}.`],
 // tytuły stron <title>: "Komnata I · Liczba — SECTIO AUREA" → "Chamber I · Number — SECTIO AUREA"
 [/^Komnata ([IVXLC]+) · (.+) — SECTIO AUREA$/,(m)=>`Chamber ${m[1]} · ${tr(m[2])} — SECTIO AUREA`],
 // pozostałe tytuły z sufiksem (np. "Filary — SECTIO AUREA")
 [/^(.+) — SECTIO AUREA$/,(m)=>`${tr(m[1])} — SECTIO AUREA`],
];

function tr(s){
  if(lang!=='en'||s==null)return s;
  const core=s.trim(); if(!core)return s;
  let out=D[core];
  if(out===undefined){for(const[rx,fn]of RX){const m=core.match(rx);if(m){out=fn(m);break;}}}
  // owijające cudzysłowy „X" / "X" / "X" → przetłumacz wnętrze i owiń w angielskie "…"
  if(out===undefined){const qm=core.match(/^[„"”]([\s\S]+?)["”]$/);if(qm){const inner=tr(qm[1]);if(inner!==qm[1])out='"'+inner+'"';}}
  if(out===undefined)return s;
  // zachowaj otaczające spacje/nowe linie
  const lead=s.match(/^\s*/)[0], trail=s.match(/\s*$/)[0];
  return lead+out+trail;
}
function trNode(n){const v=n.nodeValue;if(!v||!v.trim())return;const t=tr(v);if(t!==v)n.nodeValue=t;}
function trAttrs(el){['title','placeholder','aria-label'].forEach(a=>{if(el.hasAttribute&&el.hasAttribute(a)){const t=tr(el.getAttribute(a));if(t!==el.getAttribute(a))el.setAttribute(a,t);}});}
function walk(root){
  if(root.nodeType===1)trAttrs(root);
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())trNode(n);
  if(root.querySelectorAll)root.querySelectorAll('[title],[placeholder],[aria-label]').forEach(trAttrs);
}
function trHead(){
  if(document.title){const t=tr(document.title);if(t!==document.title)document.title=t;}
  const md=document.querySelector('meta[name="description"]');
  if(md){const c=md.getAttribute('content')||'';const t=tr(c);if(t!==c)md.setAttribute('content',t);}
}
let obs;
function start(){
  if(lang!=='en')return;
  trHead();
  walk(document.body);
  obs=new MutationObserver(ms=>{ms.forEach(m=>{
    if(m.type==='characterData'){trNode(m.target);return;}
    m.addedNodes.forEach(nd=>{if(nd.nodeType===3)trNode(nd);else if(nd.nodeType===1)walk(nd);});
  });});
  obs.observe(document.body,{childList:true,subtree:true,characterData:true});
}
function init(){ if(document.documentElement)document.documentElement.lang=lang; if(lang==='en')start(); }
if(document.readyState==='loading')addEventListener('DOMContentLoaded',init);else init();

window.I18N={
  get lang(){return lang;},
  set(l){if(l!==lang){try{localStorage.setItem(KEY,l)}catch(e){}location.reload();}},
  toggle(){this.set(lang==='en'?'pl':'en');},
  tr,
};
})();
