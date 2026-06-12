# Mondrian/Malewicz

*Composition in Space* — interaktywny tryptyk przestrzeni 3D: teza, antyteza
i synteza w trzech pokojach, połączonych bramami:

1. **POKÓJ** (synteza) — ściany to proceduralnie generowane kompozycje neoplastyczne
   (Mondrian), a w środku dryfują suprematystyczne formy (Malewicz): czarny kwadrat,
   krzyż, koło, barwne płaszczyzny, belki i stojący na podłodze architekton.
2. **MIASTO** (Mondrian solo) — „Broadway Boogie Woogie" w 3D: żółta siatka ulic
   ze staccato kolorowych komórek, białe wieże z akcentami barw podstawowych,
   jeżdżący ruch uliczny (zatrzymuje się na skrzyżowaniach), generatywny boogie-bas
   i czarny kwadrat unoszący się nad miastem jak gość z trzeciego pokoju.
   Żadnych diagonali — miasto samo argumentuje De Stijl.
3. **BIEL** (Malewicz solo) — biała nieskończoność we mgle: dryfujące formy,
   czarne słońce, czerwona belka-sputnik, niebieski pył — i białe na białym,
   którego trzeba szukać. Ścian brak, więc **myśli ma tu nawet pustka** —
   tapnięcie w nicość też odpowiada cytatem.

Dialektyka jest prosta: **porządek De Stijl** (pion, poziom, siatka) kontra
**suprematystyczna nieważkość** (diagonale, dryf, formy uwolnione od grawitacji) —
a pomiędzy nimi pokój, w którym mieszkamy.

## Dwie wersje językowe

Przycisk **EN/PL** w nagłówku panelu przełącza całość (zapamiętywane w localStorage):

- **PL** (domyślnie): cytaty w polskich przekładach (wykonanych na potrzeby tej pracy,
  ze wskazaniem oryginalnego źródła), noty **DZIŚ** i interfejs po polsku
- **EN**: kanoniczne cytaty angielskie, noty **TODAY**, źródła i interfejs po angielsku,
  pisownia Malevich

Nazwy przestrzeni (POKÓJ · MIASTO · BIEL) pozostają po polsku w obu wersjach —
jak tytuły dzieł.

## Weryfikacja cytatów

Wszystkie cytaty i fakty zweryfikowano ze źródłami (2026-06-11): brzmienie angielskie
według przekładów kanonicznych (Dearstyne — „The Non-Objective World"; Bowlt — manifesty
Malewicza; Andersen — „Essays on Art"; Holtzman & James — pisma Mondriana; notatki
J.J. Sweeneya, MoMA Bulletin 1946), atrybucje sprawdzone m.in. w pełnym tekście
„The Non-Objective World" (1959), katalogach MoMA/Tate/Guggenheim i literaturze
przedmiotu. Przekłady polskie własne, wierne wobec wersji kanonicznych.

## Warstwa myśli

Każde tapnięcie w formę lub powierzchnię pokoju wywołuje **chmurę myśli** w stylu
komiksowym (prostokątny dymek + ogonek z malejących kwadracików — komiks przepisany
na De Stijl): oryginalny cytat z pism/listów/rozmów artysty (kanoniczne przekłady
angielskie, z podanym źródłem i rokiem), a po chwili — czerwona plakietka **DZIŚ**
z współczesnym komentarzem filozoficznym po polsku (realne koncepcje m.in. Fishera,
Han, Steyerl, Zuboff, Bridle'a, Odell — bez zmyślonych cytatów współczesnych).

- 42 myśli bazowe w trzech przestrzeniach: formy mówią głosem „swojego" artysty,
  ściany i podłoga — Mondriana, sufit — Malewicza (to on przebił błękit ku bieli);
  w MIEŚCIE myślą wieże, ulica i ruch uliczny (złap jadącą myśl!), w BIELI — formy i sama pustka
- cytat pisze się na maszynie (napięcie), notka DZIŚ wchodzi z opóźnieniem
- dymek rozpływa się po czasie lektury (pasek-odliczanie; najechanie wstrzymuje,
  klik kończy pisanie / zamyka, Esc zamyka)
- licznik **MYŚLI x/42** w panelu (zapisywany w localStorage)
- **myśli ukryte**: uwolnienie architektona ma własną; białe na białym trzeba najpierw
  znaleźć; a po przeczytaniu wszystkich 26 myśli POKOJU czarny kwadrat wygłasza finał

## Uruchomienie

```bash
cd mondrian-malewicz-room
python3 -m http.server 8000
# → http://localhost:8000
```

Zwykle działa też samo otwarcie `index.html` w przeglądarce.
Wymagany internet — three.js ładuje się z CDN (jsdelivr).

## Interakcje

- **przeciągnij formę** — przesuwasz ją w przestrzeni (w płaszczyźnie kamery, także w pionie)
- **tapnij formę** — pulsuje, wiruje, gra nutę (pentatonika) i myśli na głos
- **tapnij ścianę / podłogę / sufit** — pokój też myśli
- **tapnij bramę** (albo przycisk POKÓJ/MIASTO/BIEL w panelu) — podróż między przestrzeniami
- **przeciągnij pustkę** — orbitowanie kamerą; scroll/pinch = zoom; prawy przycisk / dwa palce = pan; strzałki = pan
- **NEW WALLS** — generuje nowe kompozycje Mondriana (działa w POKOJU)
- **RESET** — formy płynnie wracają na swoje miejsca
- **SOUND** — dźwięk wł./wył.
- architekton stoi na podłodze; uniesiony wyżej — zostaje „uwolniony" i zaczyna dryfować

Bez build stepu, bez zależności lokalnych — jeden plik HTML (three.js r165 przez import map).
