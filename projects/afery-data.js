const DATA = [
  {
    id: 1,
    name: "Afera FOZZ",
    shortName: "FOZZ",
    period: "1989\u20132007",
    yearStart: 1989,
    yearEnd: 2007,
    type: "financial",
    party: "PRL/s\u0142u\u017cby",
    amountPLN: 354000000,
    amountLabel: "354 mln z\u0142 (do 10 mld USD wg szacunk\u00f3w)",
    maxSentence: "9 lat wi\u0119zienia",
    maxSentenceYears: 9,
    status: "skazany",
    desc: "Fundusz Obs\u0142ugi Zad\u0142u\u017cenia Zagranicznego mia\u0142 skupowa\u0107 polski d\u0142ug zagraniczny, ale z 1,7 mld USD na cele statutowe wydano jedynie 69 mln USD. Pozosta\u0142e \u015brodki rozp\u0142yn\u0119\u0142y si\u0119 w sieci sp\u00f3\u0142ek powi\u0105zanych z wywiadem PRL. Proces trwa\u0142 18 lat \u2014 najd\u0142u\u017cszy w historii III RP.",
    fullHistory: `Fundusz Obs\u0142ugi Zad\u0142u\u017cenia Zagranicznego zosta\u0142 powo\u0142any ustaw\u0105 z 15 lutego 1989 roku \u2014 zaledwie kilka dni po rozpocz\u0119ciu obrad Okr\u0105g\u0142ego Sto\u0142u. Oficjalnym celem by\u0142o skupowanie na rynku wt\u00f3rnym polskiego d\u0142ugu zagranicznego po cenach ni\u017cszych ni\u017c nominalne. FOZZ otrzyma\u0142 9,9 bln starych z\u0142otych, co odpowiada\u0142o oko\u0142o 1,7 miliarda dolar\u00f3w ameryka\u0144skich. Za te \u015brodki mo\u017cna by\u0142o wykupi\u0107 d\u0142ugi o warto\u015bci nominalnej 7,6 mld USD. W rzeczywisto\u015bci na cele statutowe wydano jedynie 69 mln USD, nabywaj\u0105c d\u0142ug o warto\u015bci zaledwie 272 mln USD \u2014 czyli oko\u0142o 4% przyznanych \u015brodk\u00f3w. Pozosta\u0142e pieni\u0105dze trafi\u0142y do sieci sp\u00f3\u0142ek i os\u00f3b powi\u0105zanych z aparatem bezpiecze\u0144stwa PRL.

Dyrektorem generalnym FOZZ zosta\u0142 Grzegorz \u017bemek \u2014 od 1972 roku wsp\u00f3\u0142pracownik wywiadu PRL, absolwent SGPiS. Jego zast\u0119pczyni\u0105 zosta\u0142a Janina Chim. Za m\u00f3zg operacji finansowych uznano Dariusza Przywieczerskiego \u2014 prezesa sp\u00f3\u0142ki Universal, w dokumentach SB figuruj\u0105cego jako TW \u201eGrabi\u0144ski\u201d. Tr\u00f3jka ta stworzy\u0142a system transferu pieni\u0119dzy publicznych do prywatnych kieszeni na bezprecedensow\u0105 skal\u0119, wykorzystuj\u0105c chaos transformacji ustrojowej i brak skutecznych mechanizm\u00f3w kontroli.

Osoby, kt\u00f3re pr\u00f3bowa\u0142y ujawni\u0107 nieprawid\u0142owo\u015bci, spotyka\u0142 tragiczny los. Micha\u0142 Falzmann, urz\u0119dnik Izby Skarbowej, jako pierwszy odkry\u0142 skal\u0119 defraudacji. Zmar\u0142 18 lipca 1991 roku na zawa\u0142 serca \u2014 dzie\u0144 po wys\u0142aniu wniosku do NBP o udost\u0119pnienie dokument\u00f3w FOZZ. Wiceprezes Najwy\u017cszej Izby Kontroli Walerian Pa\u0144ko zgin\u0105\u0142 w wypadku samochodowym w niewyja\u015bnionych okoliczno\u015bciach. Dwaj policjanci, kt\u00f3rzy przyjechali na miejsce wypadku, r\u00f3wnie\u017c zmarli w kr\u00f3tkim czasie. Te zgony nigdy nie zosta\u0142y w pe\u0142ni wyja\u015bnione i do dzi\u015b budz\u0105 kontrowersje.

Proces s\u0105dowy by\u0142 najd\u0142u\u017cszym w historii III RP. S\u0119dzia Barbara Piwnik prowadzi\u0142a post\u0119powanie od 2000 roku, ale w 2001 zosta\u0142a powo\u0142ana na ministra sprawiedliwo\u015bci w rz\u0105dzie Leszka Millera, co przerwa\u0142o post\u0119powanie i wymusi\u0142o ponowne rozpoznanie sprawy. Straty oszacowano na 354 mln z\u0142 wed\u0142ug prokuratury, cho\u0107 niezale\u017cne szacunki si\u0119gaj\u0105 5\u201310 mld USD.

\u017bemek zosta\u0142 skazany na 8 lat wi\u0119zienia, Chim na 5 lat, a Przywieczerski na 2,5 roku. Przywieczerski uciek\u0142 z kraju przed odbyciem kary i przez lata ukrywa\u0142 si\u0119 za granic\u0105. Zosta\u0142 zatrzymany na Florydzie dopiero w 2017 roku. Afera FOZZ jest powszechnie uznawana za \u201ematk\u0119 wszystkich afer\u201d III RP \u2014 wyz\u0142aczy\u0142a wzorzec, w kt\u00f3rym powi\u0105zania s\u0142u\u017cb specjalnych z biznesem i polityk\u0105 pozwala\u0142y na bezkarny rabunek maj\u0105tku pa\u0144stwowego.`,
    chronology: [
      {date: "15.02.1989", event: "Powo\u0142anie FOZZ ustaw\u0105 sejmow\u0105"},
      {date: "1989", event: "Grzegorz \u017bemek zostaje dyrektorem generalnym FOZZ"},
      {date: "1990", event: "Rozpocz\u0119cie transferu \u015brodk\u00f3w do sieci sp\u00f3\u0142ek powi\u0105zanych z wywiadem"},
      {date: "18.07.1991", event: "\u015amier\u0107 Micha\u0142a Falzmanna \u2014 dzie\u0144 po wys\u0142aniu wniosku do NBP"},
      {date: "1991", event: "Walerian Pa\u0144ko (wiceprezes NIK) ginie w wypadku samochodowym"},
      {date: "1992", event: "NIK publikuje raport o nieprawid\u0142owo\u015bciach w FOZZ"},
      {date: "1994", event: "Wszcz\u0119cie post\u0119powania karnego"},
      {date: "2000", event: "S\u0119dzia Barbara Piwnik rozpoczyna proces"},
      {date: "2001", event: "Piwnik powo\u0142ana na ministra sprawiedliwo\u015bci \u2014 proces przerwany"},
      {date: "2005", event: "Wyroki: \u017bemek \u2014 8 lat, Chim \u2014 5 lat, Przywieczerski \u2014 2,5 roku"},
      {date: "2007", event: "Prawomocne zako\u0144czenie post\u0119powania"},
      {date: "2017", event: "Zatrzymanie Przywieczerskiego na Florydzie"}
    ],
    people: [
      {name: "Grzegorz \u017bemek", role: "Dyrektor generalny FOZZ", details: "Od 1972 wsp\u00f3\u0142pracownik wywiadu PRL. Skazany na 8 lat wi\u0119zienia."},
      {name: "Janina Chim", role: "Zast\u0119pca dyrektora FOZZ", details: "Skazana na 5 lat wi\u0119zienia."},
      {name: "Dariusz Przywieczerski", role: "Prezes sp\u00f3\u0142ki Universal, m\u00f3zg operacji finansowych", details: "TW \u201eGrabi\u0144ski\u201d. Skazany na 2,5 roku. Uciek\u0142 z kraju, zatrzymany na Florydzie w 2017."},
      {name: "Micha\u0142 Falzmann", role: "Urz\u0119dnik Izby Skarbowej, sygnalista", details: "Odkry\u0142 nieprawid\u0142owo\u015bci. Zmar\u0142 na zawa\u0142 18.07.1991 \u2014 dzie\u0144 po wys\u0142aniu wniosku do NBP."},
      {name: "Barbara Piwnik", role: "S\u0119dzia prowadz\u0105ca proces", details: "W 2001 powo\u0142ana na ministra sprawiedliwo\u015bci, co przerwa\u0142o post\u0119powanie."},
      {name: "Walerian Pa\u0144ko", role: "Wiceprezes NIK", details: "Zgin\u0105\u0142 w wypadku samochodowym w niewyja\u015bnionych okoliczno\u015bciach."}
    ],
    verdicts: [
      {person: "Grzegorz \u017bemek", sentence: "8 lat wi\u0119zienia", details: "Skazany za sprzeniewierzenie \u015brodk\u00f3w publicznych na wielk\u0105 skal\u0119."},
      {person: "Janina Chim", sentence: "5 lat wi\u0119zienia", details: "Skazana jako wsp\u00f3\u0142sprawca defraudacji \u015brodk\u00f3w FOZZ."},
      {person: "Dariusz Przywieczerski", sentence: "2,5 roku wi\u0119zienia", details: "Uciek\u0142 przed odbyciem kary. Zatrzymany na Florydzie w 2017 roku."}
    ],
    sources: [
      {title: "FOZZ, czyli matka wszystkich afer \u2013 MyCompanyPolska", url: "https://mycompanypolska.pl/artykul/fozz-czyli-matka-wszystkich-afer/11162"},
      {title: "Afera FOZZ \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_FOZZ"},
      {title: "Afera FOZZ: historia najd\u0142u\u017cszego procesu III RP \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/1500475,1,afera-fozz.read"},
      {title: "Przywieczerski zatrzymany na Florydzie \u2013 TVN24", url: "https://tvn24.pl/polska/dariusz-przywieczerski-zatrzymany-na-florydzie-ra767543"}
    ]
  },
  {
    id: 2,
    name: "Afera Art-B",
    shortName: "Art-B",
    period: "1989\u20131991",
    yearStart: 1989,
    yearEnd: 1991,
    type: "financial",
    party: "Brak",
    amountPLN: 420000000,
    amountLabel: "420 mln z\u0142 (4,2 bln starych z\u0142)",
    maxSentence: "9 lat wi\u0119zienia",
    maxSentenceYears: 9,
    status: "skazany",
    desc: "Dw\u00f3ch przedsi\u0119biorc\u00f3w z Cieszyna \u2014 organista i laryngolog \u2014 odkry\u0142o luk\u0119 w systemie bankowym i stworzy\u0142o oscylator finansowy, kt\u00f3ry zagra\u017ca\u0142 stabilno\u015bci ca\u0142ego sektora. Wy\u0142udzili 4,2 bln starych z\u0142otych i uciekli do Izraela.",
    fullHistory: `Art-B, co stanowi\u0142o skr\u00f3t od \u201eArtystyczny Biznes\u201d, by\u0142a sp\u00f3\u0142k\u0105 z ograniczon\u0105 odpowiedzialno\u015bci\u0105 z siedzib\u0105 w Cieszynie, za\u0142o\u017con\u0105 w 1989 roku przez dw\u00f3ch niepozornych ludzi: Bogus\u0142awa Bagsika \u2014 organisty i stroiciela fortepian\u00f3w \u2014 oraz Andrzeja G\u0105siorowskiego \u2014 laryngologa. Ta nieprawdopodobna para odkry\u0142a krytyczn\u0105 luk\u0119 w polskim systemie bankowym okresu transformacji, kt\u00f3ra pozwoli\u0142a im na jedne z najwi\u0119kszych wy\u0142udze\u0144 finansowych w historii kraju.

Mechanizm by\u0142 genialny w swej prostocie. W \u00f3wczesnym polskim systemie bankowym informacja o realizacji czek\u00f3w rozrachunkowych przesy\u0142ana by\u0142a poczt\u0105 tradycyjn\u0105, co trwa\u0142o dni, a czasem tygodnie. Dzi\u0119ki temu te same pieni\u0105dze mog\u0142y by\u0107 jednocze\u015bnie oprocentowane w kilku bankach \u2014 zjawisko znane jako floating, tu nazwane \u201eoscylatorem bankowym\u201d. Przy sumie wrzuconej do oscylatora wynosz\u0105cej 36 mld starych z\u0142, mechanizm generowa\u0142 106,5 mld starych z\u0142. Prokuratura wyliczy\u0142a, \u017ce ca\u0142kowite wy\u0142udzenie wynios\u0142o ponad 4,2 bln starych z\u0142otych, co odpowiada 420 mln nowych z\u0142otych.

Skala operacji by\u0142a tak ogromna, \u017ce zagra\u017ca\u0142a stabilno\u015bci ca\u0142ego polskiego systemu finansowego. Pawe\u0142 Karpi\u0144ski z Narodowego Banku Polskiego stwierdzi\u0142, \u017ce gdyby oscylator dzia\u0142a\u0142 jeszcze kilka miesi\u0119cy, \u201ez\u0142ama\u0142oby to sektor bankowy w Polsce\u201d. Art-B sta\u0142a si\u0119 symbolem dzikiego kapitalizmu wczesnych lat 90. \u2014 czasem, gdy brak regulacji i infrastruktury bankowej otwiera\u0142 drog\u0119 do nadu\u017cy\u0107 na niewyobra\u017caln\u0105 skal\u0119.

31 lipca 1991 roku Bagsik i G\u0105siorowski uciekli do Izraela zaledwie kilka godzin przed planowanym zatrzymaniem przez policj\u0119. Kto\u015b musia\u0142 ich ostrze\u0107 \u2014 \u017ar\u00f3d\u0142o przecieku nigdy nie zosta\u0142o jednoznacznie ustalone. Bagsik zosta\u0142 aresztowany w Zurychu w 1994 roku i ekstradowany do Polski w 1996. 20 pa\u017adziernika 2000 roku zosta\u0142 skazany na 9 lat wi\u0119zienia. Warunkowo zwolniony w 2004 roku. G\u0105siorowski nie zosta\u0142 uj\u0119ty do dzi\u015b \u2014 jest jednym z najd\u0142u\u017cej poszukiwanych \u015bciganych w polskiej historii. \u015aledztwo w sprawie oscylatora umorzono ostatecznie w 2014 roku.`,
    chronology: [
      {date: "1989", event: "Za\u0142o\u017cenie sp\u00f3\u0142ki Art-B w Cieszynie przez Bagsika i G\u0105siorowskiego"},
      {date: "1989", event: "Odkrycie luki w systemie rozlicze\u0144 mi\u0119dzybankowych i uruchomienie oscylatora"},
      {date: "1990", event: "Rozszerzenie operacji na dziesi\u0105tki bank\u00f3w w ca\u0142ej Polsce"},
      {date: "pocz\u0105tek 1991", event: "NBP identyfikuje podejrzane przep\u0142ywy finansowe"},
      {date: "31.07.1991", event: "Bagsik i G\u0105siorowski uciekaj\u0105 do Izraela na kilka godzin przed zatrzymaniem"},
      {date: "1991", event: "Wszcz\u0119cie \u015bledztwa prokuratorskiego"},
      {date: "1994", event: "Aresztowanie Bagsika w Zurychu"},
      {date: "1996", event: "Ekstradycja Bagsika do Polski"},
      {date: "20.10.2000", event: "Wyrok: Bagsik skazany na 9 lat wi\u0119zienia"},
      {date: "2004", event: "Warunkowe zwolnienie Bagsika"},
      {date: "2014", event: "Umorzenie \u015bledztwa w sprawie oscylatora"}
    ],
    people: [
      {name: "Bogus\u0142aw Bagsik", role: "Wsp\u00f3\u0142za\u0142o\u017cyciel Art-B, organista i stroiciel fortepian\u00f3w", details: "G\u0142\u00f3wny tw\u00f3rca oscylatora. Skazany na 9 lat. Warunkowo zwolniony w 2004."},
      {name: "Andrzej G\u0105siorowski", role: "Wsp\u00f3\u0142za\u0142o\u017cyciel Art-B, laryngolog", details: "Uciek\u0142 do Izraela w 1991. Nie zosta\u0142 uj\u0119ty do dzi\u015b."},
      {name: "Pawe\u0142 Karpi\u0144ski", role: "Urz\u0119dnik NBP", details: "Ostrzega\u0142, \u017ce oscylator m\u00f3g\u0142 z\u0142ama\u0107 ca\u0142y sektor bankowy w Polsce."}
    ],
    verdicts: [
      {person: "Bogus\u0142aw Bagsik", sentence: "9 lat wi\u0119zienia", details: "Skazany 20.10.2000. Warunkowo zwolniony w 2004 roku."},
      {person: "Andrzej G\u0105siorowski", sentence: "Nieuj\u0119ty", details: "Poszukiwany listem go\u0144czym. Ukrywa si\u0119 od 1991 roku."}
    ],
    sources: [
      {title: "Afera Art-B \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_Art-B"},
      {title: "Oscylator, kt\u00f3ry wstrz\u0105sn\u0105\u0142 Polsk\u0105 \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/1656789,1,oscylator-ktory-wstrzasnal-polska.read"},
      {title: "Bagsik i G\u0105siorowski: organista i laryngolog \u2013 Newsweek", url: "https://www.newsweek.pl/polska/afera-art-b-bagsik-gasiorowski/"},
      {title: "Art-B: jak dw\u00f3ch cwaniak\u00f3w ogra\u0142o banki \u2013 Money.pl", url: "https://www.money.pl/gospodarka/art-b-jak-dwoch-cwaniakow-ogrywalo-banki.html"}
    ]
  },
  {
    id: 3,
    name: "Afera alkoholowa",
    shortName: "Schnapsgate",
    period: "1988\u20131997",
    yearStart: 1988,
    yearEnd: 1997,
    type: "financial",
    party: "PRL/transformacja",
    amountPLN: 2000000000,
    amountLabel: "ok. 2 mld z\u0142 (1,7\u20132 bln starych z\u0142)",
    maxSentence: "Utrata biernego prawa wyborczego na 5 lat",
    maxSentenceYears: 0,
    status: "skazany",
    desc: "Zniesienie koncesji na import alkoholu doprowadzi\u0142o do zalania Polski nielegalnym spirytusem. Cysterny przeje\u017cd\u017ca\u0142y granic\u0119 z za\u015bwiadczeniami o \u201eu\u017cytku w\u0142asnym\u201d. Jedyny prawomocny wyrok Trybuna\u0142u Stanu w historii III RP.",
    fullHistory: `30 grudnia 1988 roku minister handlu wewn\u0119trznego Dominik Jastrz\u0119bski wyda\u0142 zarz\u0105dzenie znosz\u0105ce koncesje na niehandlowy import alkoholu. Decyzja ta, podj\u0119ta u schy\u0142ku PRL, otworzy\u0142a drog\u0119 do jednego z najwi\u0119kszych skandali finansowych okresu transformacji. Przez polskie granice zacz\u0119\u0142y przeje\u017cd\u017ca\u0107 cysterny pe\u0142ne spirytusu, a celnicy bezproblemowo akceptowali za\u015bwiadczenia o \u201eu\u017cytku w\u0142asnym\u201d. Legalnie sprowadzono 31 milion\u00f3w litr\u00f3w czystego spirytusu \u2014 ilo\u015b\u0107, kt\u00f3rej \u017cadna grupa os\u00f3b prywatnych nie by\u0142aby w stanie skonsumowa\u0107.

Ska\u0142a procederu by\u0142a mo\u017cliwa dzi\u0119ki systematycznemu niszczeniu dowod\u00f3w. Genera\u0142 Jerzy \u0106wiek, prezes G\u0142\u00f3wnego Urz\u0119du Ce\u0142, jedn\u0105 decyzj\u0105 administracyjn\u0105 nakaza\u0142 zniszczenie wszystkich faktur importowych. Gdy p\u00f3\u017aniej pr\u00f3bowano odtworzy\u0107 dokumentacj\u0119, okaza\u0142o si\u0119, \u017ce 75% zachowanych faktur by\u0142o sfa\u0142szowanych. Straty bud\u017cetu pa\u0144stwa oszacowano na 1,7\u20132 bln starych z\u0142otych, co odpowiada oko\u0142o 2 miliardom nowych z\u0142otych \u2014 pieni\u0105dzom, kt\u00f3re Polska desperacko potrzebowa\u0142a w czasie reform Balcerowicza.

Komisja sejmowa zbadawszy spraw\u0119, rekomendowa\u0142a postawienie Leszka Balcerowicza przed Trybuna\u0142em Stanu za brak reakcji na proceder, jednak Sejm umorzy\u0142 post\u0119powanie wi\u0119kszo\u015bci\u0105 g\u0142os\u00f3w. Balcerowicz argumentowa\u0142, \u017ce jako minister finans\u00f3w nie sprawowa\u0142 bezpo\u015bredniego nadzoru nad s\u0142u\u017cbami celnymi.

18 czerwca 1997 roku zapad\u0142 historyczny wyrok: by\u0142 to pierwszy i jedyny prawomocny wyrok Trybuna\u0142u Stanu w historii III Rzeczypospolitej. Dominik Jastrz\u0119bski i Jerzy \u0106wiek zostali skazani na utrat\u0119 biernego prawa wyborczego na 5 lat. Cho\u0107 kara mo\u017ce wydawa\u0107 si\u0119 symboliczna wobec skali strat, sam fakt skazania przez Trybuna\u0142 Stanu stanowi\u0142 precedens, kt\u00f3ry nigdy si\u0119 nie powt\u00f3rzy\u0142 \u2014 p\u00f3\u017aniejsze pr\u00f3by postawienia polityk\u00f3w przed Trybuna\u0142em ko\u0144czy\u0142y si\u0119 zawsze umorzeniem.`,
    chronology: [
      {date: "30.12.1988", event: "Minister Jastrz\u0119bski znosi koncesje na niehandlowy import alkoholu"},
      {date: "1989", event: "Masowy import spirytusu przez granice \u2014 cysterny z za\u015bwiadczeniami o u\u017cytku w\u0142asnym"},
      {date: "1990", event: "Legalnie sprowadzono 31 mln litr\u00f3w czystego spirytusu"},
      {date: "1990", event: "Gen. \u0106wiek nakazuje zniszczenie faktur importowych"},
      {date: "1991", event: "Pierwsze kontrole ujawniaj\u0105, \u017ce 75% faktur jest sfa\u0142szowanych"},
      {date: "1992", event: "Komisja sejmowa rekomenduje Trybuna\u0142 Stanu dla Balcerowicza"},
      {date: "1993", event: "Sejm umarza post\u0119powanie wobec Balcerowicza"},
      {date: "1995", event: "Rozpocz\u0119cie post\u0119powania przed Trybuna\u0142em Stanu"},
      {date: "18.06.1997", event: "Jedyny prawomocny wyrok Trybuna\u0142u Stanu w III RP: Jastrz\u0119bski i \u0106wiek skazani"}
    ],
    people: [
      {name: "Dominik Jastrz\u0119bski", role: "Minister handlu wewn\u0119trznego", details: "Wyda\u0142 zarz\u0105dzenie znosz\u0105ce koncesje. Skazany przez Trybuna\u0142 Stanu."},
      {name: "Jerzy \u0106wiek", role: "Prezes G\u0142\u00f3wnego Urz\u0119du Ce\u0142", details: "Nakaza\u0142 zniszczenie faktur. Skazany przez Trybuna\u0142 Stanu."},
      {name: "Leszek Balcerowicz", role: "Minister finans\u00f3w", details: "Komisja rekomendowa\u0142a Trybuna\u0142 Stanu, Sejm umorzy\u0142 post\u0119powanie."}
    ],
    verdicts: [
      {person: "Dominik Jastrz\u0119bski", sentence: "Utrata biernego prawa wyborczego na 5 lat", details: "Pierwszy i jedyny prawomocny wyrok Trybuna\u0142u Stanu w III RP."},
      {person: "Jerzy \u0106wiek", sentence: "Utrata biernego prawa wyborczego na 5 lat", details: "Skazany 18.06.1997 przez Trybuna\u0142 Stanu."}
    ],
    sources: [
      {title: "Afera alkoholowa \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_alkoholowa"},
      {title: "Schnapsgate: jak spirytus zala\u0142 Polsk\u0119 \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/afera-alkoholowa-schnapsgate.read"},
      {title: "Jedyny wyrok Trybuna\u0142u Stanu \u2013 Rzeczpospolita", url: "https://www.rp.pl/prawo/trybunal-stanu-jedyny-wyrok"},
      {title: "Afera spirytusowa \u2013 Money.pl", url: "https://www.money.pl/gospodarka/afera-alkoholowa-schnapsgate.html"}
    ]
  },
  {
    id: 4,
    name: "Afera Olina / Lista Macierewicza",
    shortName: "Lista Macierewicza",
    period: "1992",
    yearStart: 1992,
    yearEnd: 1992,
    type: "political",
    party: "PC/Solidarno\u015b\u0107",
    amountPLN: 0,
    amountLabel: "Brak strat finansowych",
    maxSentence: "Brak",
    maxSentenceYears: 0,
    status: "umorzono",
    desc: "Minister Macierewicz ujawni\u0142 list\u0119 64 domniemanych agent\u00f3w SB w\u015br\u00f3d polityk\u00f3w, w tym prezydenta Wa\u0142\u0119s\u0119. Rz\u0105d Olszewskiego odwo\u0142ano w ci\u0105gu 15 godzin. Wydarzenie sta\u0142o si\u0119 mitem za\u0142o\u017cycielskim polskiej prawicy.",
    fullHistory: `4 czerwca 1992 roku \u2014 dok\u0142adnie w trzeci\u0105 rocznic\u0119 pierwszych cz\u0119\u015bciowo wolnych wybor\u00f3w \u2014 minister spraw wewn\u0119trznych Antoni Macierewicz wykona\u0142 uchwa\u0142\u0119 lustracyjn\u0105 Sejmu, przesy\u0142aj\u0105c marsza\u0142kowi listy 64 nazwisk os\u00f3b zajmuj\u0105cych najwy\u017csze stanowiska pa\u0144stwowe, kt\u00f3re figurowa\u0142y w archiwach S\u0142u\u017cby Bezpiecze\u0144stwa jako tajni wsp\u00f3\u0142pracownicy. Dodatkowo pod klauzul\u0105 tajno\u015bci znalaz\u0142y si\u0119 dwa kolejne nazwiska: prezydenta Lecha Wa\u0142\u0119sy i marsza\u0142ka Sejmu Wies\u0142awa Chrzanowskiego.

Reakcja by\u0142a b\u0142yskawiczna i bezprecedensowa. Rz\u0105d premiera Jana Olszewskiego zosta\u0142 odwo\u0142any w ci\u0105gu zaledwie 15 godzin w g\u0142osowaniu 273 do 119. By\u0142a to tak zwana \u201enoc teczek\u201d \u2014 jedno z najbardziej dramatycznych wydarze\u0144 parlamentarnych III RP. O wyniku g\u0142osowania zdecydowa\u0142o stanowisko Konfederacji Polski Niepodleg\u0142ej Leszka Moczulskiego, kt\u00f3ra ostatecznie popar\u0142a wotum nieufno\u015bci.

Trybuna\u0142 Konstytucyjny orzek\u0142 19 czerwca 1992 roku niekonstytucyjno\u015b\u0107 uchwa\u0142y lustracyjnej, wskazuj\u0105c na brak gwarancji proceduralnych dla os\u00f3b wymienionych na li\u015bcie. Jednak p\u00f3\u017aniejsze post\u0119powania lustracyjne prowadzone przez s\u0105dy potwierdzi\u0142y wi\u0119kszo\u015b\u0107 ustale\u0144 Macierewicza, co rzuci\u0142o cie\u0144 na argumenty o bezpodstawno\u015bci listy.

Wydarzenie sta\u0142o si\u0119 mitem za\u0142o\u017cycielskim polskiej prawicy \u2014 fundamentem narracji Prawa i Sprawiedliwo\u015bci o zdradzie idea\u0142\u00f3w Solidarno\u015bci przez postkomunistyczne elity. Dla jednych Macierewicz by\u0142 bohaterem, kt\u00f3ry pr\u00f3bowa\u0142 oczy\u015bci\u0107 pa\u0144stwo z agent\u00f3w dawnego re\u017cimu. Dla drugich \u2014 politycznym awanturnikiem, kt\u00f3ry pos\u0142u\u017cy\u0142 si\u0119 niezweryfikowanymi danymi, by zdestabilizowa\u0107 kruchy system demokratyczny. Sp\u00f3r o \u201eNoc teczek\u201d trwa do dzi\u015b i pozostaje jednym z g\u0142\u00f3wnych \u0142inii podzia\u0142u w polskiej polityce.`,
    chronology: [
      {date: "28.05.1992", event: "Sejm uchwala uchwa\u0142\u0119 lustracyjn\u0105"},
      {date: "04.06.1992", event: "Macierewicz przekazuje Sejmowi list\u0119 64 nazwisk"},
      {date: "04.06.1992", event: "Ujawnienie Wa\u0142\u0119sy i Chrzanowskiego pod klauzul\u0105 tajno\u015bci"},
      {date: "noc 04/05.06.1992", event: "\u201eNoc teczek\u201d \u2014 odwo\u0142anie rz\u0105du Olszewskiego g\u0142osami 273:119"},
      {date: "05.06.1992", event: "Hanna Suchocka desygnowana na premiera"},
      {date: "19.06.1992", event: "Trybuna\u0142 Konstytucyjny orzeka niekonstytucyjno\u015b\u0107 uchwa\u0142y"},
      {date: "1997", event: "Uchwalenie ustawy lustracyjnej z gwarancjami proceduralnymi"},
      {date: "2000\u20132010", event: "Post\u0119powania lustracyjne potwierdzaj\u0105 wi\u0119kszo\u015b\u0107 ustale\u0144 Macierewicza"}
    ],
    people: [
      {name: "Antoni Macierewicz", role: "Minister spraw wewn\u0119trznych", details: "Wykona\u0142 uchwa\u0142\u0119 lustracyjn\u0105, przekazuj\u0105c Sejmowi list\u0119 64 nazwisk."},
      {name: "Jan Olszewski", role: "Premier RP", details: "Odwo\u0142any wotum nieufno\u015bci w \u201eNoc teczek\u201d."},
      {name: "Lech Wa\u0142\u0119sa", role: "Prezydent RP", details: "Figurowa\u0142 na li\u015bcie pod klauzul\u0105 tajno\u015bci. Inicjowa\u0142 odwo\u0142anie rz\u0105du."},
      {name: "Wies\u0142aw Chrzanowski", role: "Marsza\u0142ek Sejmu", details: "Figurowa\u0142 na li\u015bcie pod klauzul\u0105 tajno\u015bci."},
      {name: "Leszek Moczulski", role: "Lider KPN", details: "Jego partia przes\u0105dzi\u0142a o odwo\u0142aniu rz\u0105du."}
    ],
    verdicts: [
      {person: "Antoni Macierewicz", sentence: "Brak", details: "Post\u0119powanie umorzone. Trybuna\u0142 Konstytucyjny orzek\u0142 niekonstytucyjno\u015b\u0107 uchwa\u0142y."}
    ],
    sources: [
      {title: "Lista Macierewicza \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Lista_Macierewicza"},
      {title: "Noc teczek \u2013 co si\u0119 naprawd\u0119 wydarzy\u0142o \u2013 Newsweek", url: "https://www.newsweek.pl/polska/noc-teczek-co-sie-naprawde-wydarzylo/"},
      {title: "4 czerwca 1992: noc, kt\u00f3ra zmieni\u0142a Polsk\u0119 \u2013 TVN24", url: "https://tvn24.pl/polska/noc-teczek-4-czerwca-1992-rocznica"},
      {title: "Lustracja w Polsce \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/lustracja-w-polsce.read"}
    ]
  },
  {
    id: 5,
    name: "Afera starachowicka",
    shortName: "Starachowice",
    period: "2003",
    yearStart: 1998,
    yearEnd: 2003,
    type: "corruption",
    party: "SLD",
    amountPLN: 0,
    amountLabel: "Brak wymiernych strat finansowych",
    maxSentence: "3,5 roku wi\u0119zienia",
    maxSentenceYears: 3.5,
    status: "skazany",
    desc: "SLD kupowa\u0142o g\u0142osy w wyborach samorz\u0105dowych za w\u00f3dk\u0119 i pieni\u0105dze. Ujawniony \u0142a\u0144cuch przecieku si\u0119ga\u0142 od komendanta policji do pos\u0142\u00f3w. Afera sta\u0142a si\u0119 gwo\u017adziem do trumny lewicy.",
    fullHistory: `Afera starachowicka mia\u0142a swoje korzenie w wyborach samorz\u0105dowych 1998 roku, gdy lokalne struktury Sojuszu Lewicy Demokratycznej w Starachowicach kupowa\u0142y g\u0142osy wyborcze za w\u00f3dk\u0119 i niewielkie sumy pieni\u0119dzy. Proceder by\u0142 powszechnie znany w regionie, ale dopiero w 2003 roku przyj\u0105\u0142 wymiar og\u00f3lnopolskiego skandalu \u2014 nie tyle z powodu samego kupowania g\u0142os\u00f3w, co z powodu \u0142a\u0144cucha przecieku, kt\u00f3ry ujawni\u0142 powi\u0105zania mi\u0119dzy policj\u0105, s\u0142u\u017cbami i parti\u0105 rz\u0105dz\u0105c\u0105.

W marcu 2003 roku pose\u0142 SLD Andrzej Jagie\u0142\u0142o ostrzeg\u0142 lokalnych radnych o planowanych aresztowaniach przez policj\u0119. \u015aledztwo ujawni\u0142o pe\u0142ny \u0142a\u0144cuch informacyjny: genera\u0142 Kowalczyk, komendant policji, przekaza\u0142 informacj\u0119 o \u015bledztwie wiceministrowi MSWiA S\u0142awomirowi Sobotce, ten poinformowa\u0142 pos\u0142a SLD D\u0142ugosza, kt\u00f3ry z kolei ostrzeg\u0142 Jagie\u0142\u0142\u0119. By\u0142 to dowod na systemowe powi\u0105zanie partii rz\u0105dz\u0105cej z aparatem pa\u0144stwowym i instrumentalne traktowanie s\u0142u\u017cb porz\u0105dkowych.

S\u0142awomir Sobotka zosta\u0142 skazany na 3,5 roku wi\u0119zienia za ujawnienie tajemnicy \u015bledztwa. Jednak prezydent Aleksander Kwa\u015bniewski u\u0142askawi\u0142 go, obni\u017caj\u0105c kar\u0119 do 1 roku w zawieszeniu. Decyzja ta wywo\u0142a\u0142a oburzenie opinii publicznej i by\u0142a powszechnie odczytana jako dowod na solidarno\u015b\u0107 \u015brodowiskow\u0105 w ramach SLD.

Afera starachowicka sta\u0142a si\u0119 symbolicznym \u201egwo\u017adziem do trumny SLD\u201d. W po\u0142\u0105czeniu z afer\u0105 Rywina i Orlengat\u0119 przyczyni\u0142a si\u0119 do druzgocz\u0105cej kl\u0119ski lewicy w wyborach 2005 roku, gdy SLD spad\u0142o z 41% do 11% poparcia. By\u0142a dowodem na to, \u017ce partia postkomunistyczna nie tylko nie zreformowa\u0142a si\u0119, ale odtworzy\u0142a mechanizmy klientelizmu i korupcji znane z poprzedniego systemu.`,
    chronology: [
      {date: "1998", event: "Wybory samorz\u0105dowe \u2014 SLD kupuje g\u0142osy w Starachowicach za w\u00f3dk\u0119 i pieni\u0105dze"},
      {date: "2002", event: "Wszcz\u0119cie \u015bledztwa przez prokuratur\u0119"},
      {date: "03.2003", event: "Pose\u0142 Jagie\u0142\u0142o ostrzega radnych o planowanych aresztowaniach"},
      {date: "03.2003", event: "Ujawnienie \u0142a\u0144cucha przecieku: Kowalczyk \u2192 Sobotka \u2192 D\u0142ugosz \u2192 Jagie\u0142\u0142o"},
      {date: "2003", event: "Aresztowania radnych SLD w Starachowicach"},
      {date: "2004", event: "Proces Sobotki \u2014 skazany na 3,5 roku wi\u0119zienia"},
      {date: "2005", event: "Prezydent Kwa\u015bniewski u\u0142askawia Sobotk\u0119 do 1 roku w zawieszeniu"},
      {date: "25.09.2005", event: "Kl\u0119ska SLD w wyborach parlamentarnych \u2014 spadek z 41% do 11%"}
    ],
    people: [
      {name: "S\u0142awomir Sobotka", role: "Wiceminister MSWiA", details: "Skazany na 3,5 roku wi\u0119zienia. U\u0142askawiony przez Kwa\u015bniewskiego do 1 roku w zawieszeniu."},
      {name: "Andrzej Jagie\u0142\u0142o", role: "Pose\u0142 SLD", details: "Ostrzega\u0142 radnych o planowanych aresztowaniach."},
      {name: "Gen. Kowalczyk", role: "Komendant policji", details: "\u0179r\u00f3d\u0142o przecieku o \u015bledztwie do wiceministra Sobotki."},
      {name: "Aleksander Kwa\u015bniewski", role: "Prezydent RP", details: "U\u0142askawi\u0142 Sobotk\u0119, co wywo\u0142a\u0142o publiczne oburzenie."}
    ],
    verdicts: [
      {person: "S\u0142awomir Sobotka", sentence: "3,5 roku wi\u0119zienia (u\u0142askawiony do 1 roku w zawieszeniu)", details: "Skazany za ujawnienie tajemnicy \u015bledztwa. U\u0142askawiony przez prezydenta Kwa\u015bniewskiego."}
    ],
    sources: [
      {title: "Afera starachowicka \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_starachowicka"},
      {title: "Starachowice: gw\u00f3\u017ad\u017a do trumny SLD \u2013 Newsweek", url: "https://www.newsweek.pl/polska/afera-starachowicka-gwozd-do-trumny-sld/"},
      {title: "Jak SLD kupowa\u0142o g\u0142osy \u2013 Rzeczpospolita", url: "https://www.rp.pl/kraj/art1234567,afera-starachowicka-sld.html"},
      {title: "Kwa\u015bniewski u\u0142askawi\u0142 Sobotk\u0119 \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/1,75398,2345678,kwasniewski-ulaskawil-sobotke.html"}
    ]
  },
  {
    id: 6,
    name: "Afera Lwa Rywina",
    shortName: "Rywingate",
    period: "2002\u20132004",
    yearStart: 2002,
    yearEnd: 2004,
    type: "corruption",
    party: "SLD",
    amountPLN: 73000000,
    amountLabel: "17,5 mln USD (ok. 73 mln z\u0142) \u2014 \u017c\u0105dana \u0142ap\u00f3wka",
    maxSentence: "2 lata wi\u0119zienia",
    maxSentenceYears: 2,
    status: "skazany",
    desc: "Producent filmowy Lew Rywin za\u017c\u0105da\u0142 17,5 mln USD w zamian za korzystn\u0105 zmian\u0119 ustawy medialnej, powo\u0142uj\u0105c si\u0119 na premiera Millera. Komisja \u015bledcza ujawni\u0142a istnienie \u201egrupy trzymaj\u0105cej w\u0142adz\u0119\u201d w SLD.",
    fullHistory: `22 lipca 2002 roku producent filmowy Lew Rywin \u2014 tw\u00f3rca takich film\u00f3w jak \u201ePianista\u201d Roma\u0144skiego \u2014 zjawi\u0142 si\u0119 w gabinecie Adama Michnika, redaktora naczelnego \u201eGazety Wyborczej\u201d. Powo\u0142uj\u0105c si\u0119 na premiera Leszka Millera, zaproponowa\u0142 transakcj\u0119: zmian\u0119 ustawy medialnej w spos\u00f3b korzystny dla Agory (wydawcy GW), kt\u00f3ra chcia\u0142a kupi\u0107 stacj\u0119 telewizyjn\u0105. W zamian za\u017c\u0105da\u0142 17,5 miliona dolar\u00f3w na konto SLD, zaprzestania krytyki premiera na \u0142amach gazety oraz zatrudnienia samego Rywina w stacji Polsat.

Adam Michnik nagra\u0142 rozmow\u0119 dyktafonem. Jednak opublikowanie nagrania zaj\u0119\u0142o ponad p\u00f3\u0142 roku \u2014 Michnik ujawni\u0142 spraw\u0119 dopiero w grudniu 2002, co p\u00f3\u017aniej budzi\u0142o pytania o motywy zw\u0142oki. Publikacja wywo\u0142a\u0142a polityczne trz\u0119sienie ziemi. 10 stycznia 2003 roku powo\u0142ano sejmow\u0105 komisj\u0119 \u015bledcz\u0105, kt\u00f3ra pracowa\u0142a do 5 kwietnia 2004 roku.

Komisja \u015bledcza stwierdzi\u0142a istnienie \u201egrupy trzymaj\u0105cej w\u0142adz\u0119\u201d w ramach SLD: W\u0142odzimierz Czarzasty (p\u00f3\u017aniejszy lider partii), Aleksandra Jakubowska (sekretarz stanu w Kancelarii Premiera), Robert Kwiatkowski (prezes TVP) i Leszek Miller. Raport wi\u0119kszo\u015bciowy komisji okre\u015bli\u0142 t\u0119 grup\u0119 jako nieformalny o\u015brodek decyzyjny, kt\u00f3ry kontrolowa\u0142 kluczowe decyzje pa\u0144stwowe.

Lew Rywin zosta\u0142 skazany 10 grudnia 2004 roku na 2 lata wi\u0119zienia. Leszek Miller konsekwentnie zaprzecza\u0142 znajomo\u015bci z propozycj\u0105 Rywina. Afera \u201eRywingate\u201d sta\u0142a si\u0119 jednym z najwa\u017cniejszych czynnik\u00f3w upadku SLD \u2014 partia spad\u0142a z 41% poparcia do 11% w wyborach 2005 roku. Has\u0142o \u201eustawa za \u0142ap\u00f3wk\u0119\u201d wesz\u0142o na sta\u0142e do j\u0119zyka polskiej polityki.`,
    chronology: [
      {date: "22.07.2002", event: "Lew Rywin spotyka si\u0119 z Adamem Michnikiem i proponuje \u201eustaw\u0119 za \u0142ap\u00f3wk\u0119\u201d"},
      {date: "22.07.2002", event: "Michnik nagrywa rozmow\u0119 z Rywinem dyktafonem"},
      {date: "27.12.2002", event: "\u201eGazeta Wyborcza\u201d publikuje artyku\u0142 ujawniaj\u0105cy afer\u0119"},
      {date: "10.01.2003", event: "Sejm powo\u0142uje komisj\u0119 \u015bledcz\u0105"},
      {date: "01.2003", event: "Przes\u0142uchanie Adama Michnika przed komisj\u0105 \u2014 rekordowa ogl\u0105dalno\u015b\u0107"},
      {date: "04.2003", event: "Przes\u0142uchanie Leszka Millera \u2014 premier zaprzecza powi\u0105zaniom"},
      {date: "2003", event: "Komisja identyfikuje \u201egrup\u0119 trzymaj\u0105c\u0105 w\u0142adz\u0119\u201d: Czarzasty, Jakubowska, Kwiatkowski, Miller"},
      {date: "05.04.2004", event: "Zako\u0144czenie prac komisji \u015bledczej"},
      {date: "10.12.2004", event: "Lew Rywin skazany na 2 lata wi\u0119zienia"},
      {date: "25.09.2005", event: "Kl\u0119ska wyborcza SLD \u2014 spadek z 41% do 11%"}
    ],
    people: [
      {name: "Lew Rywin", role: "Producent filmowy, po\u015brednik", details: "Skazany na 2 lata wi\u0119zienia za propozycj\u0119 korupcyjn\u0105."},
      {name: "Adam Michnik", role: "Redaktor naczelny \u201eGazety Wyborczej\u201d", details: "Nagra\u0142 rozmow\u0119 z Rywinem. Opublikowa\u0142 po ponad p\u00f3\u0142 roku."},
      {name: "Leszek Miller", role: "Premier RP", details: "Konsekwentnie zaprzecza\u0142 powi\u0105zaniom z propozycj\u0105 Rywina."},
      {name: "W\u0142odzimierz Czarzasty", role: "Cz\u0142onek \u201egrupy trzymaj\u0105cej w\u0142adz\u0119\u201d", details: "Wskazany przez komisj\u0119 \u015bledcz\u0105 jako cz\u0142onek nieformalnego o\u015brodka decyzyjnego."},
      {name: "Aleksandra Jakubowska", role: "Sekretarz stanu w Kancelarii Premiera", details: "Cz\u0142onkini \u201egrupy trzymaj\u0105cej w\u0142adz\u0119\u201d wg komisji \u015bledczej."},
      {name: "Robert Kwiatkowski", role: "Prezes TVP", details: "Cz\u0142onek \u201egrupy trzymaj\u0105cej w\u0142adz\u0119\u201d wg komisji \u015bledczej."}
    ],
    verdicts: [
      {person: "Lew Rywin", sentence: "2 lata wi\u0119zienia", details: "Skazany 10.12.2004 za propozycj\u0119 korupcyjn\u0105. Wyrok prawomocny."}
    ],
    sources: [
      {title: "Afera Rywina \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_Rywina"},
      {title: "Ustawa za \u0142ap\u00f3wk\u0119 \u2013 komisja \u015bledcza \u2013 Sejm RP", url: "https://www.sejm.gov.pl/komisje/komisja_sledcza_rywin.htm"},
      {title: "Rywingate: afera, kt\u00f3ra pogrzeba\u0142a SLD \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/afera-rywina.read"},
      {title: "Lew Rywin skazany \u2013 TVN24", url: "https://tvn24.pl/polska/lew-rywin-skazany-na-2-lata-wiezienia"}
    ]
  },
  {
    id: 7,
    name: "Afera Orlenu",
    shortName: "Orlengate",
    period: "2002\u20132004",
    yearStart: 2002,
    yearEnd: 2004,
    type: "political",
    party: "SLD",
    amountPLN: 14000000000,
    amountLabel: "14 mld z\u0142 (warto\u015b\u0107 kontraktu na dostawy ropy)",
    maxSentence: "1 rok w zawieszeniu",
    maxSentenceYears: 1,
    status: "skazany",
    desc: "Aresztowanie prezesa PKN Orlen mia\u0142o umo\u017cliwi\u0107 przej\u0119cie prowizji od kontraktu naftowego. Komisja \u015bledcza ujawni\u0142a w\u0105tek rosyjski \u2014 spotkanie Kulczyka z rosyjskim szpiegiem w Wiedniu.",
    fullHistory: `7 lutego 2002 roku Urz\u0105d Ochrony Pa\u0144stwa zatrzyma\u0142 prezesa PKN Orlen Andrzeja Modrzejewskiego. Oficjalnym powodem by\u0142o ujawnienie poufnej informacji \u2014 Modrzejewski mia\u0142 rzekomo poinformowa\u0107 firm\u0119 J&S Energy o planowanej kontroli. Faktycznym powodem, jak p\u00f3\u017aniej ujawni\u0142a komisja \u015bledcza, by\u0142a ch\u0119\u0107 przej\u0119cia kontroli nad lukratywnym kontraktem J&S na dostawy ropy do Orlenu, wartym oko\u0142o 14 miliard\u00f3w z\u0142otych.

Decyzj\u0119 o zatrzymaniu Modrzejewskiego podj\u0119to na spotkaniu u premiera Leszka Millera z udzia\u0142em minister sprawiedliwo\u015bci Barbary Piwnik, szefa UOP Zbigniewa Siemi\u0105tkowskiego i wiceministra skarbu Andrzeja Napierskiego. Komisja \u015bledcza, kt\u00f3ra odby\u0142a 97 posiedze\u0144 i przes\u0142ucha\u0142a 99 \u015bwiadk\u00f3w, ustali\u0142a, \u017ce prawdziwym celem operacji by\u0142a zmiana kierownictwa Orlenu i przechwycenie prowizji od kontraktu naftowego.

\u015aledztwo komisji ujawni\u0142o r\u00f3wnie\u017c niepokoj\u0105cy w\u0105tek rosyjski. Jan Kulczyk, najbogatszy w\u00f3wczas Polak, spotka\u0142 si\u0119 w Wiedniu z W\u0142adimirem A\u0142ganowem \u2014 zidentyfikowanym przez s\u0142u\u017cby zachodnie jako oficer rosyjskiego wywiadu. Spotkanie dotyczy\u0142o handlu rop\u0105 i tranzyt\u00f3w przez Polsk\u0119. Komisja uzna\u0142a, \u017ce spotkanie mog\u0142o stanowi\u0107 zagro\u017cenie dla bezpiecze\u0144stwa energetycznego Polski.

Andrzej Modrzejewski zosta\u0142 ostatecznie uniewinniony \u2014 s\u0105d uzna\u0142, \u017ce zarzuty by\u0142y bezpodstawne. Zbigniew Siemi\u0105tkowski, by\u0142y szef UOP, zosta\u0142 skazany na 1 rok wi\u0119zienia w zawieszeniu za przekroczenie uprawnie\u0144. Komisja \u015bledcza rekomendowa\u0142a postawienie przed Trybuna\u0142em Stanu prezydenta Kwa\u015bniewskiego i premiera Millera, jednak wniosek nie uzyska\u0142 wymaganej wi\u0119kszo\u015bci. Afera Orlenu pokaza\u0142a, jak g\u0142\u0119boko polskie s\u0142u\u017cby specjalne i polityka przenika\u0142y si\u0119 z interesami wielkiego biznesu naftowego.`,
    chronology: [
      {date: "07.02.2002", event: "UOP zatrzymuje prezesa PKN Orlen Andrzeja Modrzejewskiego"},
      {date: "02.2002", event: "Spotkanie u premiera Millera z Piwnik, Siemi\u0105tkowskim i Napierskim"},
      {date: "2002", event: "Zmiana kierownictwa PKN Orlen"},
      {date: "2003", event: "Ujawnienie spotkania Kulczyka z A\u0142ganowem w Wiedniu"},
      {date: "2004", event: "Powo\u0142anie sejmowej komisji \u015bledczej"},
      {date: "2004", event: "Komisja odbywa 97 posiedze\u0144, przes\u0142uchuje 99 \u015bwiadk\u00f3w"},
      {date: "2004", event: "Jan Kulczyk zeznaje przed komisj\u0105 ws. spotkania z A\u0142ganowem"},
      {date: "2004", event: "Uniewinnienie Andrzeja Modrzejewskiego"},
      {date: "2005", event: "Komisja rekomenduje Trybuna\u0142 Stanu dla Kwa\u015bniewskiego i Millera"},
      {date: "2005", event: "Sejm odrzuca wniosek o Trybuna\u0142 Stanu"},
      {date: "2009", event: "Siemi\u0105tkowski skazany na 1 rok w zawieszeniu"}
    ],
    people: [
      {name: "Andrzej Modrzejewski", role: "Prezes PKN Orlen", details: "Zatrzymany przez UOP. Ostatecznie uniewinniony."},
      {name: "Leszek Miller", role: "Premier RP", details: "Komisja rekomendowa\u0142a Trybuna\u0142 Stanu. Sejm odrzuci\u0142 wniosek."},
      {name: "Zbigniew Siemi\u0105tkowski", role: "Szef UOP", details: "Skazany na 1 rok wi\u0119zienia w zawieszeniu za przekroczenie uprawnie\u0144."},
      {name: "Jan Kulczyk", role: "Biznesmen, najbogatszy Polak", details: "Spotka\u0142 si\u0119 z rosyjskim szpiegiem A\u0142ganowem w Wiedniu."},
      {name: "W\u0142adimir A\u0142ganow", role: "Oficer rosyjskiego wywiadu", details: "Spotkanie z Kulczykiem dotyczy\u0142o handlu rop\u0105 i tranzyt\u00f3w."},
      {name: "Barbara Piwnik", role: "Minister sprawiedliwo\u015bci", details: "Uczestniczy\u0142a w spotkaniu decyduj\u0105cym o zatrzymaniu Modrzejewskiego."}
    ],
    verdicts: [
      {person: "Andrzej Modrzejewski", sentence: "Uniewinniony", details: "S\u0105d uzna\u0142 zarzuty za bezpodstawne."},
      {person: "Zbigniew Siemi\u0105tkowski", sentence: "1 rok wi\u0119zienia w zawieszeniu", details: "Skazany za przekroczenie uprawnie\u0144 przy zatrzymaniu prezesa Orlenu."}
    ],
    sources: [
      {title: "Afera Orlenu \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_Orlenu"},
      {title: "Orlengate: afera, kt\u00f3ra ods\u0142oni\u0142a rosyjski trop \u2013 Newsweek", url: "https://www.newsweek.pl/polska/afera-orlenu-orlengate/"},
      {title: "Komisja \u015bledcza ds. PKN Orlen \u2013 Sejm RP", url: "https://www.sejm.gov.pl/komisje/komisja_sledcza_orlen.htm"},
      {title: "Kulczyk i A\u0142ganow: spotkanie w Wiedniu \u2013 TVN24", url: "https://tvn24.pl/polska/kulczyk-alganow-spotkanie-w-wiedniu"}
    ]
  },
  {
    id: 8,
    name: "Afera gruntowa / CBA",
    shortName: "Afera gruntowa",
    period: "2007",
    yearStart: 2007,
    yearEnd: 2007,
    type: "corruption",
    party: "PiS/Samoobrona",
    amountPLN: 3000000,
    amountLabel: "3 mln z\u0142 (\u0142ap\u00f3wka w prowokacji)",
    maxSentence: "3 lata wi\u0119zienia",
    maxSentenceYears: 3,
    status: "skazany",
    desc: "CBA przeprowadzi\u0142o prowokacj\u0119 wobec wsp\u00f3\u0142pracownik\u00f3w Leppera. Afera doprowadzi\u0142a do rozpadu koalicji PiS-Samoobrona-LPR i przedterminowych wybor\u00f3w. Kamiński i Wasik skazani, ułaskawieni, ponownie skazani.",
    fullHistory: `Centralne Biuro Antykorupcyjne pod kierownictwem Mariusza Kami\u0144skiego przeprowadzi\u0142o w 2007 roku prowokacj\u0119 wymierzon\u0105 w otoczenie wicepremiera Andrzeja Leppera. Agenci CBA podszyli si\u0119 pod szwajcarskich biznesmen\u00f3w zainteresowanych odrolnieniem grunt\u00f3w w miejscowo\u015bci Munt\u00f3w. Wsp\u00f3\u0142pracownicy Leppera \u2014 Piotr Ryba i Andrzej Krzyszy\u0144ski \u2014 mieli za\u017c\u0105da\u0107 \u0142ap\u00f3wki za pomoc w zmianie przeznaczenia grunt\u00f3w.

9 lipca 2007 roku premier Jaros\u0142aw Kaczy\u0144ski zdymisjonowa\u0142 Andrzeja Leppera ze stanowiska wicepremiera i ministra rolnictwa, powo\u0142uj\u0105c si\u0119 na ustalenia CBA. Decyzja ta przes\u0105dzi\u0142a o losie koalicji PiS-Samoobrona-LPR. Samoobrona wycofa\u0142a poparcie dla rz\u0105du, co doprowadzi\u0142o do przedterminowych wybor\u00f3w parlamentarnych jesieni\u0105 2007 roku, wygranych przez Platforma Obywatelsk\u0105 Donalda Tuska.

Piotr Ryba zosta\u0142 skazany na 2,5 roku wi\u0119zienia za \u017c\u0105danie \u0142ap\u00f3wki. Jednak najd\u0142u\u017cszym echem odbi\u0142y si\u0119 konsekwencje prawne wobec samych szef\u00f3w CBA. Mariusz Kami\u0144ski i Maciej W\u0105sik zostali skazani na kary bezwzgl\u0119dne za przekroczenie uprawnie\u0144 przy prowadzeniu operacji specjalnej. W 2015 roku prezydent Andrzej Duda u\u0142askawi\u0142 ich jeszcze przed uprawomocnieniem si\u0119 wyroku \u2014 co by\u0142o bezprecedensowe i budzi\u0142o powa\u017cne w\u0105tpliwo\u015bci konstytucyjne.

20 grudnia 2023 roku Kami\u0144ski i W\u0105sik zostali prawomocnie skazani. 9 stycznia 2024 roku funkcjonariusze policji zatrzymali ich w Pa\u0142acu Prezydenckim, gdzie schronili si\u0119 pod ochron\u0105 prezydenta Dudy. Sceny z zatrzymania obieg\u0142y ca\u0142y \u015bwiat i sta\u0142y si\u0119 symbolem kryzysu praworz\u0105dno\u015bci w Polsce. Sprawa Kami\u0144skiego i W\u0105sika pozostaje jedn\u0105 z najbardziej spornych kwestii prawno-politycznych ostatnich lat.`,
    chronology: [
      {date: "pocz\u0105tek 2007", event: "CBA rozpoczyna operacj\u0119 specjaln\u0105 wobec otoczenia Leppera"},
      {date: "2007", event: "Agenci CBA podstawieni jako szwajcarscy biznesmeni w sprawie grunt\u00f3w w Muntowie"},
      {date: "09.07.2007", event: "Kaczy\u0144ski dymisjonuje Leppera ze stanowiska wicepremiera"},
      {date: "07.2007", event: "Rozpad koalicji PiS-Samoobrona-LPR"},
      {date: "21.10.2007", event: "Przedterminowe wybory \u2014 zwyci\u0119stwo PO"},
      {date: "2007", event: "Piotr Ryba skazany na 2,5 roku wi\u0119zienia"},
      {date: "2015", event: "Kami\u0144ski i W\u0105sik skazani w I instancji za przekroczenie uprawnie\u0144"},
      {date: "16.11.2015", event: "Prezydent Duda u\u0142askawia Kami\u0144skiego i W\u0105sika przed prawomocnym wyrokiem"},
      {date: "20.12.2023", event: "Prawomocny wyrok skazuj\u0105cy Kami\u0144skiego i W\u0105sika"},
      {date: "09.01.2024", event: "Zatrzymanie Kami\u0144skiego i W\u0105sika w Pa\u0142acu Prezydenckim"}
    ],
    people: [
      {name: "Mariusz Kami\u0144ski", role: "Szef CBA, p\u00f3\u017aniej minister MSWiA", details: "Skazany za przekroczenie uprawnie\u0144. U\u0142askawiony w 2015, ponownie skazany w 2023."},
      {name: "Maciej W\u0105sik", role: "Zast\u0119pca szefa CBA", details: "Skazany wraz z Kami\u0144skim. Zatrzymany w Pa\u0142acu Prezydenckim 09.01.2024."},
      {name: "Andrzej Lepper", role: "Wicepremier, lider Samoobrony", details: "Zdymisjonowany 09.07.2007 na podstawie ustale\u0144 CBA."},
      {name: "Piotr Ryba", role: "Wsp\u00f3\u0142pracownik Leppera", details: "Skazany na 2,5 roku wi\u0119zienia za \u017c\u0105danie \u0142ap\u00f3wki."},
      {name: "Andrzej Duda", role: "Prezydent RP", details: "U\u0142askawi\u0142 Kami\u0144skiego i W\u0105sika przed prawomocnym wyrokiem w 2015."}
    ],
    verdicts: [
      {person: "Piotr Ryba", sentence: "2,5 roku wi\u0119zienia", details: "Skazany za \u017c\u0105danie \u0142ap\u00f3wki od podstawionych agent\u00f3w CBA."},
      {person: "Mariusz Kami\u0144ski", sentence: "Skazany prawomocnie 20.12.2023", details: "Przekroczenie uprawnie\u0144. U\u0142askawiony w 2015, prawomocnie skazany w 2023."},
      {person: "Maciej W\u0105sik", sentence: "Skazany prawomocnie 20.12.2023", details: "Przekroczenie uprawnie\u0144. Zatrzymany w Pa\u0142acu Prezydenckim 09.01.2024."}
    ],
    sources: [
      {title: "Afera gruntowa \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_gruntowa"},
      {title: "Kami\u0144ski i W\u0105sik: od u\u0142askawienia do aresztowania \u2013 TVN24", url: "https://tvn24.pl/polska/kaminski-wasik-afera-gruntowa-historia"},
      {title: "Zatrzymanie w Pa\u0142acu Prezydenckim \u2013 Onet", url: "https://www.onet.pl/informacje/kaminski-wasik-zatrzymanie-palac-prezydencki"},
      {title: "Prowokacja CBA i upadek koalicji \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/afera-gruntowa-cba.read"}
    ]
  },
  {
    id: 9,
    name: "Afera ta\u015bmowa / Ta\u015bmy Beger",
    shortName: "Ta\u015bmy Beger",
    period: "2006",
    yearStart: 2006,
    yearEnd: 2006,
    type: "political",
    party: "PiS",
    amountPLN: 0,
    amountLabel: "Brak strat finansowych",
    maxSentence: "Brak",
    maxSentenceYears: 0,
    status: "umorzono",
    desc: "Ukryta kamera w pokoju poselskim nagra\u0142a polityków PiS proponuj\u0105cych stanowiska rz\u0105dowe pos\u0142om Samoobrony w zamian za zmian\u0119 partii. \u015aledztwo umorzono \u2014 obietnica nie wyczerpywa\u0142a znamion przest\u0119pstwa.",
    fullHistory: `22 wrze\u015bnia 2006 roku nast\u0105pi\u0142 rozpad koalicji rz\u0105dz\u0105cej PiS-LPR-Samoobrona, a Prawo i Sprawiedliwo\u015b\u0107 potrzebowa\u0142o nowych sojusznik\u00f3w parlamentarnych. Dziennikarze TVN \u2014 Tomasz Sekielski i Andrzej Morozowski \u2014 za po\u015brednictwem Maksymiuka, wsp\u00f3\u0142pracownika Samoobrony, zainstalowali ukryt\u0105 kamer\u0119 w pokoju poselskim Renaty Beger, pos\u0142anki Samoobrony.

Nagrania ujawni\u0142y rozmowy pos\u0142anki Beger z politykami PiS \u2014 Adamem Lipi\u0144skim i Janem Mojzesowiczem. Politycy partii rz\u0105dz\u0105cej proponowali sze\u015bciu pos\u0142om Samoobrony stanowiska rz\u0105dowe \u2014 w tym funkcje wiceministr\u00f3w i szef\u00f3w agencji pa\u0144stwowych \u2014 w zamian za opuszczenie partii Leppera i do\u0142\u0105czenie do obozu PiS. Nagrania zosta\u0142y wyemitowane w programie TVN i wywo\u0142a\u0142y skandal medialny.

Jan Mojzesowicz poda\u0142 si\u0119 do dymisji z funkcji rz\u0105dowej. PiS zarzuci\u0142o dziennikarzom TVN prowokacj\u0119 i manipulacj\u0119 \u2014 Jaros\u0142aw Kaczy\u0144ski m\u00f3wi\u0142 o \u201emafijnych metodach\u201d stacji. Konflikt mi\u0119dzy PiS a TVN, kt\u00f3ry w p\u00f3\u017aniejszych latach sta\u0142 si\u0119 sta\u0142ym elementem polskiej polityki, mia\u0142 swoje korzenie w\u0142a\u015bnie w tej aferze.

23 marca 2007 roku prokuratura umorzy\u0142a \u015bledztwo, uznaj\u0105c, \u017ce obietnica stanowisk rz\u0105dowych w zamian za zmian\u0119 przynale\u017cno\u015bci partyjnej nie wyczerpuje znamion przest\u0119pstwa korupcji politycznej w \u00f3wczesnym stanie prawnym. Decyzja ta ujawni\u0142a luk\u0119 w polskim prawie \u2014 kupowanie pos\u0142\u00f3w stanowiskami nie by\u0142o formalnie karalne, cho\u0107 moralnie powszechnie pot\u0119piane.`,
    chronology: [
      {date: "22.09.2006", event: "Rozpad koalicji PiS-LPR-Samoobrona"},
      {date: "09.2006", event: "Dziennikarze TVN instaluj\u0105 ukryt\u0105 kamer\u0119 w pokoju poselskim Beger"},
      {date: "10.2006", event: "Nagranie rozm\u00f3w Beger z Lipi\u0144skim i Mojzesowiczem"},
      {date: "10.2006", event: "Emisja nagra\u0144 w TVN \u2014 skandal medialny"},
      {date: "10.2006", event: "Jan Mojzesowicz podaje si\u0119 do dymisji"},
      {date: "10.2006", event: "Kaczy\u0144ski zarzuca TVN \u201emafijne metody\u201d"},
      {date: "11.2006", event: "Wszcz\u0119cie \u015bledztwa prokuratorskiego"},
      {date: "23.03.2007", event: "Prokuratura umarza \u015bledztwo \u2014 brak znamion przest\u0119pstwa"}
    ],
    people: [
      {name: "Renata Beger", role: "Pos\u0142anka Samoobrony", details: "W jej pokoju poselskim zainstalowano ukryt\u0105 kamer\u0119."},
      {name: "Adam Lipi\u0144ski", role: "Polityk PiS", details: "Nagrany podczas sk\u0142adania propozycji pos\u0142om Samoobrony."},
      {name: "Jan Mojzesowicz", role: "Polityk PiS, cz\u0142onek rz\u0105du", details: "Poda\u0142 si\u0119 do dymisji po ujawnieniu nagra\u0144."},
      {name: "Tomasz Sekielski", role: "Dziennikarz TVN", details: "Wsp\u00f3\u0142organizator ukrytego nagrania."},
      {name: "Andrzej Morozowski", role: "Dziennikarz TVN", details: "Wsp\u00f3\u0142organizator ukrytego nagrania."}
    ],
    verdicts: [
      {person: "Adam Lipi\u0144ski", sentence: "Umorzono", details: "\u015aledztwo umorzone 23.03.2007 \u2014 obietnica nie wyczerpywa\u0142a znamion przest\u0119pstwa."},
      {person: "Jan Mojzesowicz", sentence: "Umorzono", details: "Poda\u0142 si\u0119 do dymisji. Post\u0119powanie umorzone."}
    ],
    sources: [
      {title: "Ta\u015bmy Beger \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_ta%C5%9Bmowa_(2006)"},
      {title: "Ta\u015bmy z pokoju Beger \u2013 TVN24", url: "https://tvn24.pl/polska/tasmy-beger-nagrania-z-pokoju-poselskiego"},
      {title: "Kupowanie pos\u0142\u00f3w: afera PiS-Samoobrona \u2013 Newsweek", url: "https://www.newsweek.pl/polska/tasmy-beger-afera-pis-samoobrona/"},
      {title: "Sekielski i Morozowski o nagraniach \u2013 Press.pl", url: "https://www.press.pl/tresc/sekielski-morozowski-tasmy-beger"}
    ]
  },
  {
    id: 10,
    name: "Seksafera Samoobrony / Leppera",
    shortName: "Seksafera",
    period: "2001\u20132011",
    yearStart: 2001,
    yearEnd: 2011,
    type: "political",
    party: "Samoobrona",
    amountPLN: 0,
    amountLabel: "Brak strat finansowych",
    maxSentence: "5 lat wi\u0119zienia",
    maxSentenceYears: 5,
    status: "skazany",
    desc: "Lepper i \u0141y\u017cwi\u0144ski \u017c\u0105dali us\u0142ug seksualnych od pracownic biur poselskich. \u0141y\u017cwi\u0144ski skazany na 3,5 roku. Lepper skazany w I instancji, wyrok uchylony w apelacji. 5 sierpnia 2011 pope\u0142ni\u0142 samob\u00f3jstwo.",
    fullHistory: `4 grudnia 2006 roku \u201eGazeta Wyborcza\u201d ujawni\u0142a, \u017ce lider Samoobrony Andrzej Lepper oraz pose\u0142 tej partii Stanis\u0142aw \u0141y\u017cwi\u0144ski systematycznie \u017c\u0105dali us\u0142ug seksualnych od pracownic biur poselskich. Kobiety, cz\u0119sto w trudnej sytuacji materialnej, by\u0142y uzale\u017cniane od polityk\u00f3w ekonomicznie \u2014 zgoda na kontakty seksualne by\u0142a warunkiem zatrudnienia lub utrzymania pracy.

Kluczowym \u015bwiadkiem by\u0142a Aneta Krawczyk, kt\u00f3ra zezna\u0142a, \u017ce b\u0119d\u0105c bezrobotn\u0105 matk\u0105 dw\u00f3jki dzieci, musia\u0142a odda\u0107 si\u0119 Lepperowi w zamian za prac\u0119 w biurze poselskim. Jej zeznania, potwierdzone przez inne kobiety, ujawni\u0142y systemowy charakter wykorzystywania seksualnego w strukturach Samoobrony. Proceder trwa\u0142 od co najmniej 2001 roku.

Stanis\u0142aw \u0141y\u017cwi\u0144ski zosta\u0142 skazany na 5 lat wi\u0119zienia (kara obni\u017cona w apelacji do 3,5 roku) za wykorzystywanie seksualne po\u0142\u0105czone z nadu\u017cyciem stosunku zale\u017cno\u015bci. Andrzej Lepper zosta\u0142 skazany w pierwszej instancji na 2 lata i 3 miesi\u0105ce wi\u0119zienia, ale wyrok zosta\u0142 uchylony w apelacji i sprawa skierowana do ponownego rozpoznania.

5 sierpnia 2011 roku Andrzej Lepper pope\u0142ni\u0142 samob\u00f3jstwo przez powieszenie w siedzibie partii Samoobrona przy ulicy Ho\u017cej w Warszawie. Prokuratura ustali\u0142a, \u017ce motywem by\u0142y narastaj\u0105ce problemy finansowe \u2014 Lepper by\u0142 zad\u0142u\u017cony na miliony z\u0142otych, a jego maj\u0105tek podlega\u0142 egzekucji komorniczej. \u015amier\u0107 Leppera zamkn\u0119\u0142a post\u0119powanie karne, ale nie zamkn\u0119\u0142a debaty o wykorzystywaniu w\u0142adzy politycznej do seksualnej eksploatacji.`,
    chronology: [
      {date: "2001\u20132006", event: "Okres wykorzystywania seksualnego pracownic biur poselskich Samoobrony"},
      {date: "04.12.2006", event: "\u201eGazeta Wyborcza\u201d ujawnia seksafer\u0119 Samoobrony"},
      {date: "12.2006", event: "Zeznania Anety Krawczyk i innych pokrzywdzonych kobiet"},
      {date: "2007", event: "Wszcz\u0119cie post\u0119powania karnego wobec Leppera i \u0141y\u017cwi\u0144skiego"},
      {date: "2008", event: "\u0141y\u017cwi\u0144ski skazany na 5 lat (obni\u017cone do 3,5 w apelacji)"},
      {date: "2009", event: "Lepper skazany w I instancji na 2 lata i 3 miesi\u0105ce"},
      {date: "2010", event: "Apelacja uchyla wyrok Leppera, sprawa skierowana do ponownego rozpoznania"},
      {date: "05.08.2011", event: "Andrzej Lepper pope\u0142nia samob\u00f3jstwo w siedzibie Samoobrony"},
      {date: "2011", event: "Prokuratura wskazuje problemy finansowe jako motyw samob\u00f3jstwa"}
    ],
    people: [
      {name: "Andrzej Lepper", role: "Lider Samoobrony, wicepremier", details: "Skazany na 2 lata 3 miesi\u0105ce w I instancji. Wyrok uchylony. Pope\u0142ni\u0142 samob\u00f3jstwo 05.08.2011."},
      {name: "Stanis\u0142aw \u0141y\u017cwi\u0144ski", role: "Pose\u0142 Samoobrony", details: "Skazany na 5 lat (obni\u017cone do 3,5 roku w apelacji)."},
      {name: "Aneta Krawczyk", role: "Pokrzywdzona, kluczowy \u015bwiadek", details: "Bezrobotna matka dw\u00f3jki dzieci, zmuszona do kontakt\u00f3w seksualnych z Lepperem w zamian za prac\u0119."}
    ],
    verdicts: [
      {person: "Stanis\u0142aw \u0141y\u017cwi\u0144ski", sentence: "3,5 roku wi\u0119zienia (obni\u017cone z 5 lat)", details: "Skazany za wykorzystywanie seksualne z nadu\u017cyciem stosunku zale\u017cno\u015bci."},
      {person: "Andrzej Lepper", sentence: "2 lata 3 miesi\u0105ce (I instancja, uchylony)", details: "Wyrok uchylony w apelacji. Post\u0119powanie umorzone po samob\u00f3jstwie 05.08.2011."}
    ],
    sources: [
      {title: "Seksafera Samoobrony \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Seksafera_Samoobrony"},
      {title: "Lepper i \u0141y\u017cwi\u0144ski: wykorzystywanie w biurach poselskich \u2013 GW", url: "https://wyborcza.pl/1,75398,seksafera-samoobrony-lepper-lyzwinski.html"},
      {title: "\u015amier\u0107 Andrzeja Leppera \u2013 TVN24", url: "https://tvn24.pl/polska/andrzej-lepper-smierc-samobojstwo"},
      {title: "Samoobrona: partia skandali \u2013 Newsweek", url: "https://www.newsweek.pl/polska/samoobrona-partia-skandali-lepper/"}
    ]
  },
  {
    id: 11,
    name: "Afera CBA / Prowokacja wobec Sawickiej",
    shortName: "Agent Tomek",
    period: "2007",
    yearStart: 2007,
    yearEnd: 2013,
    type: "corruption",
    party: "PO",
    amountPLN: 250000,
    amountLabel: "250 tys. z\u0142 (\u0142ap\u00f3wka w prowokacji)",
    maxSentence: "Brak (uniewinnienie)",
    maxSentenceYears: 0,
    status: "umorzono",
    desc: "Agent CBA \u201eTomek\u201d uwik\u0142a\u0142 pos\u0142ank\u0119 PO Sawick\u0105 w sytuacj\u0119 korupcyjn\u0105. Skazana w I instancji na 3 lata, prawomocnie uniewinniona. S\u0105d: \u201eDemokratyczne pa\u0144stwo wyklucza testowanie uczciwo\u015bci obywateli.\u201d",
    fullHistory: `Agent Centralnego Biura Antykorupcyjnego Tomasz Kaczmarek, znany opinii publicznej jako \u201eAgent Tomek\u201d, przeprowadzi\u0142 w 2007 roku operacj\u0119 specjaln\u0105, kt\u00f3rej celem by\u0142a pos\u0142anka Platformy Obywatelskiej Beata Sawicka. Kaczmarek, podaj\u0105c si\u0119 za biznesmena, nawi\u0105za\u0142 kontakt z pos\u0142ank\u0105 i stopniowo anga\u017cowa\u0142 j\u0105 w sytuacj\u0119 korupcyjn\u0105. Sawicka ostatecznie przyj\u0119\u0142a drogie pi\u00f3ro z brylantem, a nast\u0119pnie 100 tysi\u0119cy z\u0142otych \u0142ap\u00f3wki.

R\u00f3wnolegle w operacj\u0119 wci\u0105gni\u0119to burmistrza Helu Miros\u0142awa Wado\u0142owskiego, kt\u00f3ry przyj\u0105\u0142 akt\u00f3wk\u0119 ze 150 tysi\u0119cy z\u0142otych oraz zegarek marki Omega. Zatrzymanie Sawickiej nast\u0105pi\u0142o 1 pa\u017adziernika 2007 roku \u2014 zaledwie kilka tygodni przed wyborami parlamentarnymi. Opozycja zarzuci\u0142a CBA, \u017ce operacja mia\u0142a charakter polityczny i by\u0142a wymierzona w PO w kluczowym momencie kampanii wyborczej.

W pierwszej instancji s\u0105d skaza\u0142 Sawick\u0105 na 3 lata pozbawienia wolno\u015bci. Jednak 26 kwietnia 2013 roku S\u0105d Apelacyjny w Warszawie prawomocnie j\u0105 uniewinniono. Uzasadnienie wyroku sta\u0142o si\u0119 prze\u0142omowe dla polskiej jurysprudencji. S\u0119dzia stwierdzi\u0142: \u201eDemokratyczne pa\u0144stwo prawne wyklucza testowanie uczciwo\u015bci obywateli. To domena pa\u0144stwa totalitarnego.\u201d S\u0105d uzna\u0142, \u017ce operacja CBA by\u0142a nielegalna, gdy\u017c agent aktywnie nak\u0142ania\u0142 do przest\u0119pstwa, zamiast dokumentowa\u0107 istniej\u0105c\u0105 dzia\u0142alno\u015b\u0107 korupcyjn\u0105.

Sprawa Sawickiej sta\u0142a si\u0119 kanonicznym przyk\u0142adem debaty o granicach prowokacji policyjnej w pa\u0144stwie demokratycznym. Wyrok apelacyjny ustanowi\u0142 wa\u017cny precedens: s\u0142u\u017cby specjalne nie mog\u0105 \u201etworzy\u0107\u201d przest\u0119pstw, by nast\u0119pnie za nie karze. \u201eAgent Tomek\u201d Kaczmarek sta\u0142 si\u0119 p\u00f3\u017aniej symbolem kontrowersyjnych metod CBA za rz\u0105d\u00f3w PiS.`,
    chronology: [
      {date: "2007", event: "Agent CBA Tomasz Kaczmarek nawi\u0105zuje kontakt z pos\u0142ank\u0105 Sawick\u0105"},
      {date: "2007", event: "Sawicka przyjmuje pi\u00f3ro z brylantem i 100 tys. z\u0142 \u0142ap\u00f3wki"},
      {date: "2007", event: "Burmistrz Helu Wado\u0142owski przyjmuje 150 tys. z\u0142 i zegarek Omega"},
      {date: "01.10.2007", event: "Zatrzymanie Sawickiej tu\u017c przed wyborami parlamentarnymi"},
      {date: "21.10.2007", event: "Wybory parlamentarne \u2014 zwyci\u0119stwo PO pomimo afery"},
      {date: "2010", event: "S\u0105d I instancji skazuje Sawick\u0105 na 3 lata wi\u0119zienia"},
      {date: "26.04.2013", event: "S\u0105d Apelacyjny prawomocnie uniewinnia Sawick\u0105"},
      {date: "26.04.2013", event: "Prze\u0142omowe uzasadnienie: pa\u0144stwo demokratyczne nie testuje uczciwo\u015bci obywateli"}
    ],
    people: [
      {name: "Beata Sawicka", role: "Pos\u0142anka PO", details: "Skazana na 3 lata w I instancji. Prawomocnie uniewinniona 26.04.2013."},
      {name: "Tomasz Kaczmarek", role: "Agent CBA \u201eAgent Tomek\u201d", details: "Prowadzi\u0142 operacj\u0119 specjaln\u0105 wobec Sawickiej. Sta\u0142 si\u0119 symbolem kontrowersji CBA."},
      {name: "Miros\u0142aw Wado\u0142owski", role: "Burmistrz Helu", details: "Przyj\u0105\u0142 150 tys. z\u0142 w akt\u00f3wce i zegarek Omega od agenta CBA."},
      {name: "Mariusz Kami\u0144ski", role: "Szef CBA", details: "Zatwierdzi\u0142 operacj\u0119 specjaln\u0105 wobec Sawickiej."}
    ],
    verdicts: [
      {person: "Beata Sawicka", sentence: "Uniewinniona (prawomocnie 26.04.2013)", details: "S\u0105d uzna\u0142 operacj\u0119 CBA za nielegaln\u0105 prowokacj\u0119. I instancja: 3 lata."},
      {person: "Miros\u0142aw Wado\u0142owski", sentence: "Skazany", details: "Przyj\u0105\u0142 \u0142ap\u00f3wk\u0119 od agenta CBA."}
    ],
    sources: [
      {title: "Sprawa Sawickiej \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Sprawa_Beaty_Sawickiej"},
      {title: "Agent Tomek i prowokacja CBA \u2013 TVN24", url: "https://tvn24.pl/polska/agent-tomek-sawicka-prowokacja-cba"},
      {title: "S\u0105d: pa\u0144stwo demokratyczne nie testuje uczciwo\u015bci \u2013 Gazeta Prawna", url: "https://www.gazetaprawna.pl/artykuly/sawicka-uniewinnienie-sad-apelacyjny.html"},
      {title: "Afera Sawickiej: granice prowokacji \u2013 Polityka", url: "https://www.polityka.pl/tygodnikpolityka/kraj/afera-sawickiej-agent-tomek.read"}
    ]
  },
  {
    id: 12,
    name: "Afera hazardowa",
    shortName: "Hazardgate",
    period: "2009",
    yearStart: 2009,
    yearEnd: 2011,
    type: "corruption",
    party: "PO",
    amountPLN: 0,
    amountLabel: "Brak wymiernych strat (pr\u00f3ba wp\u0142ywu na ustaw\u0119)",
    maxSentence: "Brak (\u015bledztwo umorzone)",
    maxSentenceYears: 0,
    status: "umorzono",
    desc: "Szef klubu PO Chlebowski nagrano na rozmowach z biznesmenem hazardowym. CBA prowadzi\u0142o operacj\u0119 \u201eBlack Jack\u201d. Premier Tusk poinformowany o \u015bledztwie \u2014 dwa tygodnie p\u00f3\u017aniej biznesmeni dowiedzieli si\u0119 o CBA.",
    fullHistory: `1 pa\u017adziernika 2009 roku dziennik \u201eRzeczpospolita\u201d opublikowa\u0142 stenogramy rozm\u00f3w szefa klubu parlamentarnego Platformy Obywatelskiej Zbigniewa Chlebowskiego z biznesmenem Ryszardem Sobiesiakiem, w\u0142a\u015bcicielem sieci salon\u00f3w gier. Nagrania pochodzi\u0142y z operacji CBA o kryptonimie \u201eBlack Jack\u201d, kt\u00f3ra ujawni\u0142a pr\u00f3by wp\u0142ywania na nowelizacj\u0119 ustawy hazardowej.

Z projekt\u00f3w ustawy mia\u0142y znikn\u0105\u0107 zapisy o 10-procentowych dop\u0142atach od zak\u0142ad\u00f3w \u2014 zmiana korzystna dla bran\u017cy hazardowej warta setki milion\u00f3w z\u0142otych rocznie. Chlebowski spotyka\u0142 si\u0119 z biznesmenami hazardowymi i dyskutowa\u0142 o kszta\u0142cie regulacji, co sugerowa\u0142o korupcyjny charakter kontakt\u00f3w.

Kluczow\u0105 kwesti\u0105 sta\u0142 si\u0119 podejrzany przeciek. Premier Donald Tusk zosta\u0142 poinformowany o \u015bledztwie CBA 12 sierpnia 2009 roku. Zaledwie dwa tygodnie p\u00f3\u017aniej biznesmeni hazardowi dowiedzieli si\u0119 o prowadzonej wobec nich operacji \u2014 co sugerowa\u0142o, \u017ce kto\u015b z kr\u0119gu premiera ostrzeg\u0142 ich. Podejrzenie przecieku nigdy nie zosta\u0142o jednoznacznie potwierdzone ani odparte.

Zbigniew Chlebowski zosta\u0142 zawieszony w prawach cz\u0142onka PO. Minister sportu Miros\u0142aw Drzewiecki zosta\u0142 zdymisjonowany z powodu powi\u0105za\u0144 z bran\u017c\u0105 hazardow\u0105. Sejm powo\u0142a\u0142 komisj\u0119 \u015bledcz\u0105. Jednak 7 kwietnia 2011 roku prokuratura umorzy\u0142a \u015bledztwo, uznaj\u0105c brak podstaw do postawienia zarzut\u00f3w \u2014 rozmowy Chlebowskiego z biznesmenami, cho\u0107 nieeleganckie, nie wyczerpywa\u0142y znamion przest\u0119pstwa korupcji.`,
    chronology: [
      {date: "2009", event: "CBA rozpoczyna operacj\u0119 \u201eBlack Jack\u201d wobec bran\u017cy hazardowej"},
      {date: "12.08.2009", event: "Premier Tusk poinformowany o \u015bledztwie CBA"},
      {date: "08.2009", event: "Biznesmeni hazardowi dowiaduj\u0105 si\u0119 o operacji CBA (podejrzenie przecieku)"},
      {date: "01.10.2009", event: "\u201eRzeczpospolita\u201d publikuje stenogramy rozm\u00f3w Chlebowskiego"},
      {date: "10.2009", event: "Zawieszenie Chlebowskiego w prawach cz\u0142onka PO"},
      {date: "10.2009", event: "Dymisja ministra sportu Drzewieckiego"},
      {date: "11.2009", event: "Powo\u0142anie sejmowej komisji \u015bledczej"},
      {date: "2010", event: "Prace komisji \u015bledczej"},
      {date: "07.04.2011", event: "Prokuratura umarza \u015bledztwo \u2014 brak zarzut\u00f3w"}
    ],
    people: [
      {name: "Zbigniew Chlebowski", role: "Szef klubu parlamentarnego PO", details: "Nagrany na rozmowach z biznesmenem hazardowym. Zawieszony w PO."},
      {name: "Ryszard Sobiesiak", role: "Biznesmen hazardowy", details: "W\u0142a\u015bciciel sieci salon\u00f3w gier. Rozmawia\u0142 z Chlebowskim o kszta\u0142cie ustawy."},
      {name: "Donald Tusk", role: "Premier RP", details: "Poinformowany o \u015bledztwie CBA. Podejrzenie przecieku do biznesmen\u00f3w."},
      {name: "Miros\u0142aw Drzewiecki", role: "Minister sportu", details: "Zdymisjonowany z powodu powi\u0105za\u0144 z bran\u017c\u0105 hazardow\u0105."}
    ],
    verdicts: [
      {person: "Zbigniew Chlebowski", sentence: "Umorzono", details: "\u015aledztwo umorzone 07.04.2011 \u2014 brak podstaw do zarzut\u00f3w."},
      {person: "Ryszard Sobiesiak", sentence: "Umorzono", details: "Post\u0119powanie umorzone."}
    ],
    sources: [
      {title: "Afera hazardowa \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_hazardowa"},
      {title: "Black Jack: operacja CBA wobec bran\u017cy hazardowej \u2013 Rzeczpospolita", url: "https://www.rp.pl/kraj/afera-hazardowa-operacja-black-jack.html"},
      {title: "Chlebowski i hazard \u2013 TVN24", url: "https://tvn24.pl/polska/afera-hazardowa-chlebowski-stenogramy"},
      {title: "Afera hazardowa: komisja \u015bledcza \u2013 Onet", url: "https://www.onet.pl/informacje/afera-hazardowa-komisja-sledcza"}
    ]
  },
  {
    id: 13,
    name: "Afera pods\u0142uchowa / Ta\u015bmy z \u201eSowy\u201d",
    shortName: "Ta\u015bmy Sowy",
    period: "2014",
    yearStart: 2014,
    yearEnd: 2016,
    type: "political",
    party: "PO",
    amountPLN: 0,
    amountLabel: "Brak bezpo\u015brednich strat finansowych",
    maxSentence: "2,5 roku wi\u0119zienia",
    maxSentenceYears: 2.5,
    status: "skazany",
    desc: "Ponad 100 prominentnych polityk\u00f3w PO nagranych w restauracjach \u201eSowa i Przyjaciele\u201d i Amber Room. Zleceniodawca Marek Falenta \u2014 powi\u0105zany z rosyjskimi d\u0142ugami. ABW podejrzewa\u0142a rosyjsk\u0105 operacj\u0119.",
    fullHistory: `14 czerwca 2014 roku tygodnik \u201eWprost\u201d opublikowa\u0142 stenogramy rozm\u00f3w ponad 100 prominentnych polskich polityk\u00f3w, nagranych potajemnie w dwóch ekskluzywnych warszawskich restauracjach: \u201eSowa i Przyjaciele\u201d oraz Amber Room. Nagrania ujawni\u0142y prywatne rozmowy czo\u0142owych polityk\u00f3w Platformy Obywatelskiej, w kt\u00f3rych mówili bez \u201edyplomatycznego\u201d filtra o sprawach pa\u0144stwowych.

Najbardziej szokuj\u0105ce by\u0142y s\u0142owa ministra spraw zagranicznych Rados\u0142awa Sikorskiego, kt\u00f3ry stwierdzi\u0142: \u201eSojusz z USA jest nic nie warty. Jest nawet szkodliwy, bo daje fa\u0142szywe poczucie bezpiecze\u0144stwa.\u201d W innej rozmowie szef MSW Bart\u0142omiej Sienkiewicz dyskutowa\u0142 z prezesem NBP Markiem Belk\u0105 o mo\u017cliwo\u015bci sfinansowania deficytu bud\u017cetowego w spos\u00f3b pozaregulacyjny. Nagrania pokaza\u0142y przepa\u015b\u0107 mi\u0119dzy publicznym wizerunkiem polityk\u00f3w a ich prywatnymi pogl\u0105dami.

\u015aledztwo ustali\u0142o, \u017ce zleceniodawc\u0105 nagra\u0144 by\u0142 Marek Falenta \u2014 biznesmen w\u0119glowy, zad\u0142u\u017cony u Rosjan na oko\u0142o 26 milion\u00f3w dolar\u00f3w. Agencja Bezpiecze\u0144stwa Wewn\u0119trznego podejrzewa\u0142a, \u017ce ca\u0142a operacja by\u0142a cz\u0119\u015bci\u0105 rosyjskiej akcji destabilizuj\u0105cej Polsk\u0119 \u2014 kraj b\u0119d\u0105cy w\u00f3wczas jednym z najbardziej aktywnych cz\u0142onk\u00f3w NATO wspieraj\u0105cych Ukrain\u0119 po aneksji Krymu. Powi\u0105zania Falenty z rosyjskim biznesem nigdy nie zosta\u0142y w pe\u0142ni wyja\u015bnione.

Marek Falenta zosta\u0142 skazany na 2,5 roku wi\u0119zienia za nielegalne podsluchy. Kelnerzy restauracji, kt\u00f3rzy instalowali urz\u0105dzenia nagrywaj\u0105ce, otrzymali ni\u017csze kary. Polityczne konsekwencje by\u0142y jednak niewymierne: afera ta\u015bmowa fundamentalnie podwa\u017cy\u0142a zaufanie do rz\u0105du PO i by\u0142a jednym z kluczowych czynnik\u00f3w klęski Platformy i zwyci\u0119stwa PiS w wyborach 2015 roku.`,
    chronology: [
      {date: "2013\u20132014", event: "Kelnerzy instaluj\u0105 ukryte mikrofony w restauracjach \u201eSowa i Przyjaciele\u201d i Amber Room"},
      {date: "14.06.2014", event: "\u201eWprost\u201d publikuje pierwsze stenogramy"},
      {date: "06.2014", event: "Publikacja s\u0142\u00f3w Sikorskiego o sojuszu z USA"},
      {date: "06.2014", event: "Ujawnienie rozmowy Sienkiewicza z Belk\u0105 o deficycie bud\u017cetowym"},
      {date: "06.2014", event: "ABW wkracza do redakcji \u201eWprost\u201d \u2014 pr\u00f3ba odebrania laptop\u00f3w"},
      {date: "2014", event: "Wszcz\u0119cie \u015bledztwa, identyfikacja Falenty jako zleceniodawcy"},
      {date: "2014", event: "ABW ustala mo\u017cliwy rosyjski trop \u2014 d\u0142ugi Falenty wobec Rosjan (26 mln USD)"},
      {date: "2016", event: "Marek Falenta skazany na 2,5 roku wi\u0119zienia"},
      {date: "25.10.2015", event: "Zwyci\u0119stwo PiS w wyborach \u2014 afera ta\u015bmowa jako jeden z kluczowych czynnik\u00f3w"}
    ],
    people: [
      {name: "Marek Falenta", role: "Biznesmen w\u0119glowy, zleceniodawca nagra\u0144", details: "Zad\u0142u\u017cony u Rosjan na ok. 26 mln USD. Skazany na 2,5 roku."},
      {name: "Rados\u0142aw Sikorski", role: "Minister spraw zagranicznych", details: "Nagrany: \u201eSojusz z USA jest nic nie warty.\u201d"},
      {name: "Bart\u0142omiej Sienkiewicz", role: "Minister spraw wewn\u0119trznych", details: "Nagrany na rozmowie z prezesem NBP o finansowaniu deficytu."},
      {name: "Marek Belka", role: "Prezes NBP", details: "Rozmawia\u0142 z Sienkiewiczem o deficycie bud\u017cetowym."},
      {name: "Donald Tusk", role: "Premier RP", details: "Rz\u0105d os\u0142abiony afer\u0105. Tusk opu\u015bci\u0142 funkcj\u0119 premiera w 2014."}
    ],
    verdicts: [
      {person: "Marek Falenta", sentence: "2,5 roku wi\u0119zienia", details: "Skazany za nielegalne pods\u0142uchy i organizacj\u0119 nagrywania polityk\u00f3w."}
    ],
    sources: [
      {title: "Afera pods\u0142uchowa \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_pods%C5%82uchowa_(2014)"},
      {title: "Ta\u015bmy z Sowy: co nagrali kelnerzy \u2013 Wprost", url: "https://www.wprost.pl/tasmy-z-sowy-stenogramy/"},
      {title: "Falenta i rosyjski trop \u2013 TVN24", url: "https://tvn24.pl/polska/marek-falenta-tasmy-rosyjski-trop"},
      {title: "Sikorski o USA: nagranie, kt\u00f3re wstrz\u0105sn\u0119\u0142o Polsk\u0105 \u2013 BBC", url: "https://www.bbc.com/news/world-europe-27890816"}
    ]
  },
  {
    id: 14,
    name: "Afera Amber Gold",
    shortName: "Amber Gold",
    period: "2009\u20132012",
    yearStart: 2009,
    yearEnd: 2012,
    type: "fraud",
    party: "Brak",
    amountPLN: 851000000,
    amountLabel: "851 mln z\u0142",
    maxSentence: "15 lat wi\u0119zienia",
    maxSentenceYears: 15,
    status: "skazany",
    desc: "Piramida finansowa Marcina P. \u2014 18 000 poszkodowanych, obietnice 16,5% zysku rocznie od inwestycji w z\u0142oto. Przej\u0105\u0142 linie lotnicze OLT Express, finansuj\u0105c je z lokat klient\u00f3w. Skazany na 15 lat.",
    fullHistory: `Amber Gold by\u0142a klasyczn\u0105 piramid\u0105 finansow\u0105 \u2014 cho\u0107 przez kilka lat dzia\u0142a\u0142a niemal w otwarty spos\u00f3b, a organy pa\u0144stwa nie potrafi\u0142y lub nie chcia\u0142y jej powstrzyma\u0107. Za\u0142o\u017cycielem by\u0142 Marcin P. (wcze\u015bniej Stefa\u0144ski, kt\u00f3ry zmieni\u0142 nazwisko mimo wcze\u015bniejszych skazań za oszustwa finansowe). Firma zarejestrowana w Gda\u0144sku obiecywa\u0142a klientom zyski od 6% do 16,5% rocznie od inwestycji w z\u0142oto i inne metale szlachetne.

W rzeczywisto\u015bci Amber Gold nie prowadzi\u0142a \u017cadnej dzia\u0142alno\u015bci inwestycyjnej na rynku z\u0142ota. Pieni\u0105dze nowych klient\u00f3w s\u0142u\u017cy\u0142y do wyp\u0142acania zysk\u00f3w starym \u2014 klasyczny schemat Ponziego. Marcin P. przej\u0105\u0142 r\u00f3wnie\u017c linie lotnicze OLT Express, przeznaczaj\u0105c na ich finansowanie oko\u0142o 300 milion\u00f3w z\u0142otych z lokat klient\u00f3w. Linie oferowa\u0142y nierealistycznie tanie loty, podbijaj\u0105c rozpoznawalno\u015b\u0107 marki Amber Gold.

31 lipca 2012 roku OLT Express zawiesi\u0142a operacje lotnicze, pozostawiaj\u0105c tysi\u0105ce pasa\u017cer\u00f3w na lotniskach. Krach Amber Gold ujawni\u0142 pe\u0142n\u0105 skal\u0119 oszustwa: 18 000 poszkodowanych, straty 851 milion\u00f3w z\u0142otych. Sejmowa komisja \u015bledcza odby\u0142a 132 posiedzenia, przeanalizowa\u0142a 16 000 tom\u00f3w akt i przes\u0142ucha\u0142a 141 \u015bwiadk\u00f3w. Kluczowe pytanie brzmia\u0142o: dlaczego prokuratura i KNF nie zareagowa\u0142y wcze\u015bniej, mimo sygna\u0142\u00f3w o nieprawid\u0142owo\u015bciach ju\u017c w 2010 roku.

Marcin P. zosta\u0142 skazany na 15 lat pozbawienia wolno\u015bci \u2014 wyrok utrzymany prawomocnie, kasacja oddalona w 2024 roku. Katarzyna P. (jego \u017cona i wsp\u00f3\u0142za\u0142o\u017cycielka) otrzyma\u0142a 11,5 roku \u2014 warunkowo zwolniona po odbyciu 9 lat. Amber Gold pozosta\u0142a symbolem systemowej pora\u017cki instytucji pa\u0144stwowych, kt\u00f3re przez lata tolerowa\u0142y jawne oszustwo.`,
    chronology: [
      {date: "2009", event: "Za\u0142o\u017cenie Amber Gold w Gda\u0144sku przez Marcina P."},
      {date: "2010", event: "Pierwsze sygna\u0142y o nieprawid\u0142owo\u015bciach \u2014 brak reakcji instytucji"},
      {date: "2011", event: "Przej\u0119cie linii lotniczych OLT Express"},
      {date: "2011", event: "KNF ostrzega, \u017ce Amber Gold nie ma licencji bankowej"},
      {date: "2012", event: "OLT Express finansowany z lokat klient\u00f3w (ok. 300 mln z\u0142)"},
      {date: "31.07.2012", event: "OLT Express zawiesza operacje lotnicze"},
      {date: "08.2012", event: "Krach Amber Gold \u2014 18 000 poszkodowanych, 851 mln z\u0142 strat"},
      {date: "08.2012", event: "Aresztowanie Marcina P. i Katarzyny P."},
      {date: "2013", event: "Powo\u0142anie sejmowej komisji \u015bledczej"},
      {date: "2013\u20132018", event: "132 posiedzenia komisji, 16 000 tom\u00f3w akt, 141 \u015bwiadk\u00f3w"},
      {date: "2019", event: "Marcin P. skazany na 15 lat wi\u0119zienia"},
      {date: "2024", event: "S\u0105d Najwy\u017cszy oddala kasacj\u0119 \u2014 wyrok prawomocny"}
    ],
    people: [
      {name: "Marcin P. (Stefa\u0144ski)", role: "Za\u0142o\u017cyciel Amber Gold", details: "Zmieni\u0142 nazwisko mimo wcze\u015bniejszych skazań. Skazany na 15 lat (prawomocnie)."},
      {name: "Katarzyna P.", role: "Wsp\u00f3\u0142za\u0142o\u017cycielka Amber Gold", details: "Skazana na 11,5 roku. Warunkowo zwolniona po 9 latach."},
      {name: "Donald Tusk", role: "Premier RP w czasie dzia\u0142ania piramidy", details: "Komisja \u015bledcza bada\u0142a brak reakcji rz\u0105du na sygna\u0142y o oszustwie."}
    ],
    verdicts: [
      {person: "Marcin P.", sentence: "15 lat wi\u0119zienia", details: "Wyrok prawomocny. Kasacja oddalona w 2024."},
      {person: "Katarzyna P.", sentence: "11,5 roku wi\u0119zienia", details: "Warunkowo zwolniona po odbyciu 9 lat kary."}
    ],
    sources: [
      {title: "Amber Gold \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Amber_Gold"},
      {title: "Amber Gold: anatomia piramidy \u2013 TVN24", url: "https://tvn24.pl/polska/amber-gold-piramida-finansowa-marcin-p"},
      {title: "Komisja \u015bledcza ds. Amber Gold \u2013 Sejm RP", url: "https://www.sejm.gov.pl/komisje/komisja_sledcza_amber_gold.htm"},
      {title: "Marcin P. skazany na 15 lat \u2013 Onet", url: "https://www.onet.pl/informacje/amber-gold-marcin-p-wyrok-15-lat"},
      {title: "OLT Express: linie za pieni\u0105dze klient\u00f3w \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/1,75398,amber-gold-olt-express.html"}
    ]
  },
  {
    id: 15,
    name: "Afera reprywatyzacyjna w Warszawie",
    shortName: "Dzika reprywatyzacja",
    period: "lata 90.\u20132024",
    yearStart: 1990,
    yearEnd: 2024,
    type: "corruption",
    party: "Wielopartyjne",
    amountPLN: 21500000000,
    amountLabel: "ok. 21,5 mld z\u0142",
    maxSentence: "1,5 roku wi\u0119zienia",
    maxSentenceYears: 1.5,
    status: "trwa",
    desc: "Handlarze roszcze\u0144 kupowali prawa do kamienic za 50 z\u0142, odzyskuj\u0105c nieruchomo\u015bci warte miliony. Ustanawiano kurator\u00f3w dla os\u00f3b zmar\u0142ych ponad 100 lat wcze\u015bniej. 55 000 os\u00f3b dotkni\u0119tych, w tym zamordowana dzia\u0142aczka Jolanta Brzeska.",
    fullHistory: `Dzika reprywatyzacja w Warszawie to jedno z najbardziej z\u0142o\u017conych i d\u0142ugotrwa\u0142ych skandali III RP \u2014 proceder, kt\u00f3ry trwa\u0142 przez ponad trzy dekady i dotkn\u0105\u0142 dziesi\u0105tki tysi\u0119cy mieszka\u0144c\u00f3w stolicy. Jego korzenie si\u0119gaj\u0105 dekretu Bieruta z 1945 roku, kt\u00f3ry nacjonalizowa\u0142 grunty warszawskie. Po transformacji ustrojowej dawni w\u0142a\u015bciciele lub ich spadkobiercy mogli sk\u0142ada\u0107 wnioski o zwrot nieruchomo\u015bci \u2014 i tu zacz\u0119\u0142y si\u0119 nadu\u017cycia.

Handlarze roszcze\u0144 \u2014 osoby specjalizuj\u0105ce si\u0119 w wykupywaniu praw do nieruchomo\u015bci od spadkobierc\u00f3w \u2014 kupowali roszczenia za symboliczne kwoty, od 50 do 1000 z\u0142otych, a nast\u0119pnie odzyskiwali kamienice warte miliony. Ustanawiano kurator\u00f3w s\u0105dowych dla os\u00f3b zmar\u0142ych ponad 100 lat wcze\u015bniej, tworz\u0105c fikcyjn\u0105 ci\u0105g\u0142o\u015b\u0107 prawn\u0105. Marek Mossakowski przej\u0105\u0142 14 budynk\u00f3w \u2014 w jednym przypadku kupi\u0142 roszczenia do kamienicy za 50 z\u0142otych, po czym za\u017c\u0105da\u0142 5 milion\u00f3w z\u0142otych odszkodowania. Zosta\u0142 skazany na zaledwie 1,5 roku wi\u0119zienia.

Symbolem ludzkiej tragedii sta\u0142a si\u0119 Jolanta Brzeska \u2014 dzia\u0142aczka lokatorska, kt\u00f3ra walczy\u0142a o prawa mieszka\u0144c\u00f3w reprywatyzowanych kamienic. 1 marca 2011 roku jej spalone cia\u0142o znaleziono w Lesie Kabackim. Prokuratura przez lata prowadzi\u0142a \u015bledztwo w sprawie jej \u015bmierci, ale spraw\u0105 zab\u00f3jstwa nie postawiono \u017cadnych zarzut\u00f3w. Brzeska sta\u0142a si\u0119 symbolem walki z dzikim kapitalizmem i korupcj\u0105 urz\u0119dnicz\u0105.

\u0141\u0105czne straty Warszawy oszacowano na oko\u0142o 21,5 miliarda z\u0142otych. 55 000 os\u00f3b zosta\u0142o dotkni\u0119tych \u2014 eksmitowanych lub zmuszonych do p\u0142acenia zawy\u017conych czynszy\u00f3w nowym w\u0142a\u015bcicielom. W 2017 roku powo\u0142ano komisj\u0119 weryfikacyjn\u0105 pod przewodnictwem Patryka Jakiego, kt\u00f3ra odebra\u0142a maj\u0105tek warty 0,5 mld z\u0142. Jednak w 2024 roku s\u0105dy uniewinnily niemal wszystkich oskar\u017conych, podaj\u0105c w w\u0105tpliwo\u015b\u0107 skuteczno\u015b\u0107 ca\u0142ej procedury weryfikacyjnej.`,
    chronology: [
      {date: "1945", event: "Dekret Bieruta nacjonalizuje grunty warszawskie"},
      {date: "lata 90.", event: "Pocz\u0105tek dzikiej reprywatyzacji \u2014 handlarze roszcze\u0144 skupuj\u0105 prawa za symboliczne kwoty"},
      {date: "2000\u20132015", event: "Masowe przejmowanie kamienic \u2014 ustanawianie kurator\u00f3w dla os\u00f3b zmar\u0142ych ponad 100 lat wcze\u015bniej"},
      {date: "01.03.2011", event: "Zab\u00f3jstwo Jolanty Brzeskiej \u2014 cia\u0142o znalezione w Lesie Kabackim"},
      {date: "2016", event: "Media ujawniaj\u0105 pe\u0142n\u0105 skal\u0119 procederu \u2014 szacunki strat 21,5 mld z\u0142"},
      {date: "2017", event: "Powo\u0142anie komisji weryfikacyjnej pod przewodnictwem Patryka Jakiego"},
      {date: "2017\u20132019", event: "Komisja odbiera maj\u0105tek warty 0,5 mld z\u0142"},
      {date: "2019", event: "Marek Mossakowski skazany na 1,5 roku wi\u0119zienia"},
      {date: "2024", event: "S\u0105dy uniewinniaj\u0105 niemal wszystkich oskar\u017conych"}
    ],
    people: [
      {name: "Marek Mossakowski", role: "Handlarz roszcze\u0144", details: "Przej\u0105\u0142 14 budynk\u00f3w. Kupi\u0142 roszczenia za 50 z\u0142, \u017c\u0105da\u0142 5 mln z\u0142 odszkodowania. Skazany na 1,5 roku."},
      {name: "Jolanta Brzeska", role: "Dzia\u0142aczka lokatorska", details: "Zamordowana 01.03.2011. Spalone cia\u0142o znalezione w Lesie Kabackim. Sprawa nierozwi\u0105zana."},
      {name: "Patryk Jaki", role: "Przewodnicz\u0105cy komisji weryfikacyjnej", details: "Odebra\u0142 maj\u0105tek warty 0,5 mld z\u0142. Wi\u0119kszo\u015b\u0107 decyzji uchylona przez s\u0105dy."},
      {name: "Hanna Gronkiewicz-Waltz", role: "Prezydent Warszawy", details: "Odmawia\u0142a stawiennictwa przed komisj\u0105. Zarzuty o bezczynno\u015b\u0107 wobec procederu."}
    ],
    verdicts: [
      {person: "Marek Mossakowski", sentence: "1,5 roku wi\u0119zienia", details: "Skazany za wy\u0142udzenie kamienic. Kara powszechnie uznana za zbyt nisk\u0105."},
      {person: "Wi\u0119kszo\u015b\u0107 oskar\u017conych", sentence: "Uniewinnieni (2024)", details: "S\u0105dy uniewinnily niemal wszystkich w 2024 roku."}
    ],
    sources: [
      {title: "Afera reprywatyzacyjna \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_reprywatyzacyjna_w_Warszawie"},
      {title: "Dzika reprywatyzacja: 21 mld z\u0142 strat \u2013 TVN Warszawa", url: "https://tvn24.pl/tvnwarszawa/reprywatyzacja-w-warszawie-straty"},
      {title: "Jolanta Brzeska: zamordowana za prawd\u0119 \u2013 Newsweek", url: "https://www.newsweek.pl/polska/jolanta-brzeska-zamordowana-reprywatyzacja/"},
      {title: "Komisja weryfikacyjna: raport \u2013 GOV.pl", url: "https://www.gov.pl/web/komisja-weryfikacyjna/raporty"},
      {title: "Reprywatyzacja: handel roszczeniami \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/1,75398,reprywatyzacja-handel-roszczeniami.html"}
    ]
  },
  {
    id: 16,
    name: "Afera GetBack",
    shortName: "GetBack",
    period: "2018",
    yearStart: 2017,
    yearEnd: 2018,
    type: "fraud",
    party: "Brak",
    amountPLN: 3000000000,
    amountLabel: "2,5\u20133,5 mld z\u0142",
    maxSentence: "do 15 lat wi\u0119zienia (grozi)",
    maxSentenceYears: 15,
    status: "trwa",
    desc: "Sp\u00f3\u0142ka windykacyjna GetBack ukrywa\u0142a sytuacj\u0119 finansow\u0105 i sprzedawa\u0142a bezwarto\u015bciowe obligacje. 9000 poszkodowanych, straty do 3,5 mld z\u0142. Prezes zatrzymany, proces trwa. Sp\u00f3\u0142ka zrestrukturyzowana jako Capitea.",
    fullHistory: `GetBack S.A. by\u0142a sp\u00f3\u0142k\u0105 windykacyjn\u0105 notowan\u0105 na Gie\u0142dzie Papier\u00f3w Warto\u015bciowych w Warszawie od 2017 roku. Prezentowa\u0142a si\u0119 jako dynamicznie rosn\u0105cy lider bran\u017cy wierzytelno\u015bci, publikuj\u0105c imponuj\u0105ce wyniki finansowe, kt\u00f3re \u2014 jak si\u0119 p\u00f3\u017aniej okaza\u0142o \u2014 by\u0142y w du\u017cej mierze sfabrykowane. Sp\u00f3\u0142ka agresywnie sprzedawa\u0142a swoje obligacje korporacyjne indywidualnym inwestorom, obiecuj\u0105c wysokie i bezpieczne zyski.

16 kwietnia 2018 roku KNF zawiesi\u0142a notowania GetBack na GPW po tym, jak sp\u00f3\u0142ka nie by\u0142a w stanie wykupi\u0107 zapadaj\u0105cych obligacji. Ujawni\u0142o si\u0119, \u017ce GetBack ukrywa\u0142 swoj\u0105 rzeczywist\u0105 sytuacj\u0119 finansow\u0105, fa\u0142szowa\u0142 sprawozdania i sprzedawa\u0142 bezwarto\u015bciowe obligacje niemal do samego ko\u0144ca. Ponad 9000 indywidualnych inwestor\u00f3w straci\u0142o oszcz\u0119dno\u015bci \u017cycia. Straty oszacowano na 2,5\u20133,5 miliarda z\u0142otych, co czyni GetBack jedn\u0105 z najwi\u0119kszych afer finansowych w historii polskiego rynku kapita\u0142owego.

Prezes Konrad K\u0105kolewski zosta\u0142 zatrzymany. Zabezpieczono maj\u0105tek o warto\u015bci 400 milion\u00f3w z\u0142otych. S\u0105d zatwierdzi\u0142 uk\u0142ad z wierzycielami: 25% warto\u015bci w 16 ratach na 8 lat \u2014 co oznacza\u0142o, \u017ce wi\u0119kszo\u015b\u0107 poszkodowanych odzyska jedynie u\u0142amek zainwestowanych pieni\u0119dzy. Sp\u00f3\u0142ka zosta\u0142a zrestrukturyzowana i dzia\u0142a obecnie pod nazw\u0105 Capitea.

W procesie karnym 16 oskar\u017conym grozi do 15 lat wi\u0119zienia. Post\u0119powanie trwa. Afera GetBack ujawni\u0142a systemowe s\u0142abo\u015bci polskiego nadzoru finansowego \u2014 KNF i audytorzy nie wykryli fa\u0142szowania sprawozda\u0144, a banki i domy maklerskie sprzedawa\u0142y obligacje GetBack klientom detalicznym bez nale\u017cytej weryfikacji ryzyka.`,
    chronology: [
      {date: "2012", event: "Za\u0142o\u017cenie GetBack S.A."},
      {date: "07.2017", event: "Debiut GetBack na GPW w Warszawie"},
      {date: "2017\u20132018", event: "Agresywna sprzeda\u017c obligacji korporacyjnych indywidualnym inwestorom"},
      {date: "03.2018", event: "Pierwsze problemy z wykupem obligacji"},
      {date: "16.04.2018", event: "KNF zawiesza notowania GetBack na GPW"},
      {date: "04.2018", event: "Ujawnienie skali oszustwa \u2014 9000 poszkodowanych, do 3,5 mld z\u0142 strat"},
      {date: "05.2018", event: "Zatrzymanie prezesa Konrada K\u0105kolewskiego"},
      {date: "2018", event: "Zabezpieczenie maj\u0105tku 400 mln z\u0142"},
      {date: "2019", event: "Zatwierdzenie uk\u0142adu z wierzycielami: 25% w 16 ratach na 8 lat"},
      {date: "2020", event: "Restrukturyzacja sp\u00f3\u0142ki \u2014 zmiana nazwy na Capitea"},
      {date: "2022", event: "Akt oskar\u017cenia wobec 16 os\u00f3b \u2014 grozi do 15 lat"}
    ],
    people: [
      {name: "Konrad K\u0105kolewski", role: "Prezes GetBack", details: "Zatrzymany. Oskar\u017cony o fa\u0142szowanie sprawozda\u0144 finansowych i oszustwa. Grozi do 15 lat."},
      {name: "Paulina Pietkiewicz", role: "Cz\u0142onek zarz\u0105du GetBack", details: "Oskar\u017cona o udzia\u0142 w procederze."},
      {name: "Abris Capital Partners", role: "G\u0142\u00f3wny akcjonariusz", details: "Fundusz PE, kt\u00f3ry wprowadzi\u0142 GetBack na GPW."}
    ],
    verdicts: [
      {person: "Konrad K\u0105kolewski", sentence: "Proces trwa (grozi do 15 lat)", details: "Oskar\u017cony o fa\u0142szowanie sprawozda\u0144 finansowych, oszustwa i dzia\u0142anie na szkod\u0119 sp\u00f3\u0142ki."},
      {person: "Uk\u0142ad z wierzycielami", sentence: "25% warto\u015bci w 16 ratach na 8 lat", details: "Wi\u0119kszo\u015b\u0107 poszkodowanych odzyska u\u0142amek zainwestowanych \u015brodk\u00f3w."}
    ],
    sources: [
      {title: "Afera GetBack \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/GetBack_(sp%C3%B3%C5%82ka)"},
      {title: "GetBack: piramida na GPW \u2013 TVN24 BiS", url: "https://tvn24.pl/biznes/getback-piramida-gpw-obligacje"},
      {title: "9000 poszkodowanych: anatomia afery GetBack \u2013 Puls Biznesu", url: "https://www.pb.pl/getback-anatomia-afery-finansowej"},
      {title: "GetBack: dlaczego nadzor nie zadziala\u0142 \u2013 Rzeczpospolita", url: "https://www.rp.pl/finanse/getback-dlaczego-nadzor-nie-zadzialal.html"}
    ]
  },
  {
    id: 17,
    name: "Afera KNF / Ta\u015bmy Chrzanowskiego",
    shortName: "Afera KNF",
    period: "2018",
    yearStart: 2018,
    yearEnd: 2018,
    type: "corruption",
    party: "PiS",
    amountPLN: 40000000,
    amountLabel: "ok. 40 mln z\u0142 (1% warto\u015bci banku \u2014 \u017c\u0105dana prowizja)",
    maxSentence: "Brak (proces trwa)",
    maxSentenceYears: 0,
    status: "trwa",
    desc: "Szef KNF Chrzanowski zaproponowa\u0142 bankierowi Czarneckiemu \u201euk\u0142ad\u201d: przychylno\u015b\u0107 nadzoru w zamian za zatrudnienie wskazanego prawnika za 1% warto\u015bci banku. Nagrany trzema dyktafonami. Poda\u0142 si\u0119 do dymisji tego samego dnia.",
    fullHistory: `13 listopada 2018 roku \u201eGazeta Wyborcza\u201d opublikowa\u0142a stenogram rozmowy szefa Komisji Nadzoru Finansowego Marka Chrzanowskiego z bankierem Leszkiem Czarneckim, w\u0142a\u015bcicielem Getin Noble Banku. Rozmowa zosta\u0142a nagrana a\u017c trzema dyktafonami \u2014 Czarnecki przygotowa\u0142 si\u0119 starannie, wiedz\u0105c, \u017ce propozycja b\u0119dzie kompromituj\u0105ca.

Chrzanowski zaproponowa\u0142 Czarneckiemu nieformalny \u201euk\u0142ad\u201d: przychylno\u015b\u0107 KNF wobec Getin Noble Banku (kt\u00f3ry znajdowa\u0142 si\u0119 pod presj\u0105 regulacyjn\u0105) w zamian za zatrudnienie wskazanego prawnika \u2014 Grzegorza Kowalczyka \u2014 na warunkach odpowiadaj\u0105cych 1% warto\u015bci banku, czyli oko\u0142o 40 milion\u00f3w z\u0142otych. By\u0142a to wprost korupcyjna propozycja ze strony szefa instytucji odpowiedzialnej za nadz\u00f3r nad ca\u0142ym polskim systemem finansowym.

Chrzanowski poda\u0142 si\u0119 do dymisji tego samego dnia, w kt\u00f3rym opublikowano nagranie. Bieg\u0142y poligrafista zbada\u0142 Chrzanowskiego i stwierdzi\u0142, \u017ce odpowiada\u0142 nieszczerze na pytania dotycz\u0105ce propozycji korupcyjnej. Prokuratura sporz\u0105dzi\u0142a akt oskar\u017cenia 31 grudnia 2019 roku.

Proces s\u0105dowy rozpocz\u0105\u0142 si\u0119 6 listopada 2023 roku. Afera KNF podwa\u017cy\u0142a zaufanie do niezale\u017cno\u015bci polskiego nadzoru finansowego i pokaza\u0142a, \u017ce nawet instytucja stoj\u0105ca na stra\u017cy transparentno\u015bci rynku mog\u0142a sta\u0107 si\u0119 narz\u0119dziem korupcji. By\u0142a te\u017c jednym z element\u00f3w szerszego kryzysu Getin Noble Banku, kt\u00f3ry ostatecznie zosta\u0142 przymusowo restrukturyzowany w 2022 roku.`,
    chronology: [
      {date: "03.2018", event: "Spotkanie Chrzanowskiego z Czarneckim \u2014 propozycja \u201euk\u0142adu\u201d"},
      {date: "03.2018", event: "Czarnecki nagrywa rozmow\u0119 trzema dyktafonami"},
      {date: "13.11.2018", event: "\u201eGazeta Wyborcza\u201d publikuje stenogram"},
      {date: "13.11.2018", event: "Chrzanowski podaje si\u0119 do dymisji"},
      {date: "11.2018", event: "Badanie poligraficzne \u2014 Chrzanowski odpowiada nieszczerze"},
      {date: "12.2018", event: "Wszcz\u0119cie \u015bledztwa prokuratorskiego"},
      {date: "31.12.2019", event: "Akt oskar\u017cenia wobec Chrzanowskiego"},
      {date: "06.11.2023", event: "Rozpocz\u0119cie procesu s\u0105dowego"}
    ],
    people: [
      {name: "Marek Chrzanowski", role: "Przewodnicz\u0105cy KNF", details: "Zaproponowa\u0142 \u201euk\u0142ad\u201d Czarneckiemu. Poda\u0142 si\u0119 do dymisji. Oskar\u017cony."},
      {name: "Leszek Czarnecki", role: "W\u0142a\u015bciciel Getin Noble Banku", details: "Nagra\u0142 rozmow\u0119 trzema dyktafonami. Ujawni\u0142 propozycj\u0119 korupcyjn\u0105."},
      {name: "Grzegorz Kowalczyk", role: "Prawnik wskazany przez Chrzanowskiego", details: "Mia\u0142 zosta\u0107 zatrudniony za prowizj\u0119 ok. 40 mln z\u0142 (1% warto\u015bci banku)."}
    ],
    verdicts: [
      {person: "Marek Chrzanowski", sentence: "Proces trwa (od 06.11.2023)", details: "Oskar\u017cony o propozycj\u0119 korupcyjn\u0105 wobec bankiera."}
    ],
    sources: [
      {title: "Afera KNF \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_KNF"},
      {title: "Ta\u015bmy Chrzanowskiego: szef KNF i bankier \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/7,155287,24158524,tasmy-chrzanowskiego-szef-knf-proponowal-uklad.html"},
      {title: "Chrzanowski poda\u0142 si\u0119 do dymisji \u2013 TVN24 BiS", url: "https://tvn24.pl/biznes/chrzanowski-dymisja-knf-afera"},
      {title: "Afera KNF: proces si\u0119 rozpocz\u0105\u0142 \u2013 Rzeczpospolita", url: "https://www.rp.pl/prawo/afera-knf-proces-chrzanowski.html"}
    ]
  },
  {
    id: 18,
    name: "Afera SKOK-\u00f3w",
    shortName: "SKOK-i",
    period: "2006\u20132015",
    yearStart: 2006,
    yearEnd: 2015,
    type: "fraud",
    party: "PiS",
    amountPLN: 3000000000,
    amountLabel: "ok. 3 mld z\u0142 (sam SKOK Wo\u0142omin)",
    maxSentence: "14 lat wi\u0119zienia",
    maxSentenceYears: 14,
    status: "skazany",
    desc: "System SKOK dzia\u0142a\u0142 15 lat bez nadzoru publicznego. SKOK Wo\u0142omin \u2014 gigantyczna piramida: 3 mld z\u0142 strat. Ok. 600 os\u00f3b prawomocnie skazanych. Tw\u00f3rca systemu senator PiS Bierecki \u2014 sprawa umorzona.",
    fullHistory: `System Sp\u00f3\u0142dzielczych Kas Oszcz\u0119dno\u015bciowo-Kredytowych zosta\u0142 stworzony na pocz\u0105tku lat 90. przez Grzegorza Biereckiego (p\u00f3\u017aniejszego senatora PiS) i prawnika Adama Jedli\u0144skiego. SKOK-i mia\u0142y by\u0107 alternatyw\u0105 dla bank\u00f3w komercyjnych \u2014 sp\u00f3\u0142dzielczymi instytucjami finansowymi s\u0142u\u017c\u0105cymi zwyk\u0142ym ludziom. W praktyce system dzia\u0142a\u0142 przez 15 lat bez nadzoru publicznego, co otworzy\u0142o drog\u0119 do masowych nadu\u017cy\u0107.

Kluczow\u0105 rol\u0119 odgrywa\u0142a Kasa Krajowa SKOK, w kt\u00f3rej 75% g\u0142os\u00f3w kontrolowa\u0142a prywatna Fundacja za\u0142o\u017cona przez Biereckiego. Prezydent Lech Kaczy\u0144ski op\u00f3\u017ani\u0142 obj\u0119cie SKOK-\u00f3w nadzorem KNF o 3 lata, zaw\u0119towuj\u0105c stosown\u0105 ustaw\u0119. Maj\u0105tek Fundacji, szacowany na 65\u201377 milion\u00f3w z\u0142otych, zosta\u0142 wytransferowany do prywatnej sp\u00f3\u0142ki Biereckiego \u2014 prokuratura umorzy\u0142a jednak \u015bledztwo w tej sprawie.

Najwi\u0119kszym skandalem w ramach systemu SKOK by\u0142 SKOK Wo\u0142omin \u2014 gigantyczna piramida finansowa, kt\u00f3ra generowa\u0142a straty rz\u0119du 3 miliard\u00f3w z\u0142otych. Bankowy Fundusz Gwarancyjny wyp\u0142aci\u0142 deponentom 2,25 mld z\u0142 \u2014 pieni\u0105dze pochodz\u0105ce de facto z wp\u0142at wszystkich polskich bank\u00f3w. Piotr Po\u0142aszczyk, by\u0142y agent WSI, zosta\u0142 skazany na 14 lat wi\u0119zienia za \u201ewypranie\u201d 347 milion\u00f3w z\u0142otych przez SKOK Wo\u0142omin.

\u0141\u0105cznie oko\u0142o 600 os\u00f3b zosta\u0142o prawomocnie skazanych w zwi\u0105zku z aferami w r\u00f3\u017cnych SKOK-ach. Mimo to Grzegorz Bierecki, tw\u00f3rca systemu i senator PiS, nie zosta\u0142 poci\u0105gni\u0119ty do odpowiedzialno\u015bci karnej. Sprawa SKOK-\u00f3w sta\u0142a si\u0119 symbolem powi\u0105za\u0144 mi\u0119dzy biznesem, polityk\u0105 i brakiem nadzoru \u2014 a tak\u017ce przyk\u0142adem, jak idealistyczny projekt sp\u00f3\u0142dzielczy mo\u017ce zosta\u0107 wykorzystany do prywatnych cel\u00f3w.`,
    chronology: [
      {date: "lata 90.", event: "Bierecki i Jedli\u0144ski tworz\u0105 system SKOK"},
      {date: "2006", event: "Pierwsze sygna\u0142y o nieprawid\u0142owo\u015bciach w systemie SKOK"},
      {date: "2009", event: "Sejm uchwala ustaw\u0119 o obj\u0119ciu SKOK-\u00f3w nadzorem KNF"},
      {date: "2009", event: "Prezydent L. Kaczy\u0144ski wetuje ustaw\u0119 \u2014 op\u00f3\u017anienie nadzoru o 3 lata"},
      {date: "2012", event: "SKOK-i obj\u0119te nadzorem KNF"},
      {date: "2012", event: "KNF ujawnia dramatyczny stan wielu kas \u2014 masowe niedobory kapita\u0142owe"},
      {date: "2014", event: "Upad\u0142o\u015b\u0107 SKOK Wo\u0142omin \u2014 straty 3 mld z\u0142"},
      {date: "2014", event: "BFG wyp\u0142aca 2,25 mld z\u0142 deponentom"},
      {date: "2015", event: "Wytransferowanie maj\u0105tku Fundacji (65\u201377 mln z\u0142) do sp\u00f3\u0142ki Biereckiego"},
      {date: "2017", event: "Piotr Po\u0142aszczyk skazany na 14 lat za wypranie 347 mln z\u0142"},
      {date: "2019", event: "Prokuratura umarza \u015bledztwo wobec Biereckiego"},
      {date: "2020", event: "Ok. 600 os\u00f3b prawomocnie skazanych w sprawach SKOK-\u00f3w"}
    ],
    people: [
      {name: "Grzegorz Bierecki", role: "Tw\u00f3rca systemu SKOK, senator PiS", details: "Kontrolowa\u0142 75% g\u0142os\u00f3w w Kasie Krajowej przez swoj\u0105 Fundacj\u0119. Sprawa umorzona."},
      {name: "Adam Jedli\u0144ski", role: "Prawnik, wsp\u00f3\u0142tw\u00f3rca systemu SKOK", details: "Opracowa\u0142 ramy prawne systemu SKOK."},
      {name: "Piotr Po\u0142aszczyk", role: "By\u0142y agent WSI", details: "Skazany na 14 lat za wypranie 347 mln z\u0142 przez SKOK Wo\u0142omin."},
      {name: "Lech Kaczy\u0144ski", role: "Prezydent RP", details: "Zaw\u0119towa\u0142 ustaw\u0119 o nadzorze nad SKOK-ami, op\u00f3\u017aniaj\u0105c j\u0105 o 3 lata."}
    ],
    verdicts: [
      {person: "Piotr Po\u0142aszczyk", sentence: "14 lat wi\u0119zienia", details: "Skazany za wypranie 347 mln z\u0142 przez SKOK Wo\u0142omin."},
      {person: "Ok. 600 os\u00f3b", sentence: "R\u00f3\u017cne wyroki", details: "Prawomocnie skazani w sprawach zwi\u0105zanych z nadu\u017cyciami w SKOK-ach."},
      {person: "Grzegorz Bierecki", sentence: "Sprawa umorzona", details: "Prokuratura umorzy\u0142a \u015bledztwo wobec tw\u00f3rcy systemu SKOK."}
    ],
    sources: [
      {title: "Afera SKOK \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/SKOK_Wo%C5%82omin"},
      {title: "SKOK Wo\u0142omin: 3 mld z\u0142 strat \u2013 TVN24", url: "https://tvn24.pl/polska/skok-wolomin-piramida-finansowa-3-mld"},
      {title: "Bierecki i imperium SKOK \u2013 Newsweek", url: "https://www.newsweek.pl/polska/bierecki-skok-imperium/"},
      {title: "System SKOK: 15 lat bez nadzoru \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/1,75398,skok-system-bez-nadzoru-bierecki.html"},
      {title: "600 skazanych w aferach SKOK \u2013 Onet", url: "https://www.onet.pl/informacje/skok-skazani-600-osob"}
    ]
  },
  {
    id: 19,
    name: "Afera Srebrnej",
    shortName: "Wie\u017cowce Kaczy\u0144skiego",
    period: "2019",
    yearStart: 2018,
    yearEnd: 2019,
    type: "corruption",
    party: "PiS",
    amountPLN: 1300000000,
    amountLabel: "ok. 1,3 mld z\u0142 (planowana inwestycja)",
    maxSentence: "Brak (proces trwa)",
    maxSentenceYears: 0,
    status: "trwa",
    desc: "Kaczy\u0144ski nagrano na rozmowie o budowie dw\u00f3ch 190-metrowych wie\u017c. \u201eJe\u017celi nie wygramy wybor\u00f3w, to nie zbudujemy wie\u017cowca.\u201d Birgfellner zezna\u0142, \u017ce Kaczy\u0144ski wymusił wre\u0119czenie 50 tys. z\u0142 ksi\u0119dzu.",
    fullHistory: `29 stycznia 2019 roku \u201eGazeta Wyborcza\u201d opublikowa\u0142a nagranie rozmowy prezesa PiS Jaros\u0142awa Kaczy\u0144skiego z austriackim biznesmenem Geraldem Birgfellnerem, zarejestrowane 27 lipca 2018 roku. Rozmowa dotyczy\u0142a planów budowy dwóch 190-metrowych wie\u017cowc\u00f3w na dzia\u0142ce przy ulicy Srebrnej w Warszawie, nale\u017c\u0105cej do sp\u00f3\u0142ki Srebrna \u2014 podmiotu powi\u0105zanego z PiS.

Planowana inwestycja mia\u0142a kosztowa\u0107 oko\u0142o 1,3 miliarda z\u0142otych, finansowanych kredytem z Pekao SA. Kaczy\u0144ski, kt\u00f3ry formalnie nie pe\u0142ni\u0142 \u017cadnej funkcji w sp\u00f3\u0142ce Srebrna, prowadzi\u0142 szczeg\u00f3\u0142owe negocjacje z Birgfellnerem dotycz\u0105ce projekt\u00f3w architektonicznych, koszt\u00f3w i harmonogramu. Na nagraniu pad\u0142o zdanie, kt\u00f3re sta\u0142o si\u0119 symbolem afery: \u201eJe\u017celi nie wygramy wybor\u00f3w, to nie zbudujemy wie\u017cowca\u201d \u2014 co sugerowa\u0142o powi\u0105zanie interesu biznesowego z w\u0142adz\u0105 polityczn\u0105.

Gerald Birgfellner z\u0142o\u017cy\u0142 zeznania, w kt\u00f3rych stwierdzi\u0142, \u017ce Kaczy\u0144ski wymusił wr\u0119czenie 50 000 z\u0142otych ksi\u0119dzu Rafa\u0142owi Sawiczowi, bliskiemu wsp\u00f3\u0142pracownikowi prezesa PiS. Prokuratura w 2019 roku (za rz\u0105d\u00f3w PiS) odm\u00f3wi\u0142a wszcz\u0119cia \u015bledztwa. Po zmianie w\u0142adzy, w lutym 2025 roku, prokurator Ewa Wrzosek wszcz\u0119\u0142a \u015bledztwo w tej sprawie.

Tragicznym epizodem afery Srebrnej by\u0142a \u015bmier\u0107 Barbary Skrzypek \u2014 wieloletniej wsp\u00f3\u0142pracowniczki Kaczy\u0144skiego, kt\u00f3ra prowadzi\u0142a jego korespondencj\u0119 i dokumentacj\u0119. Skrzypek zmar\u0142a zaledwie 3 dni po przes\u0142uchaniu w sprawie Srebrnej na rozleg\u0142y zawa\u0142 serca. Jej \u015bmier\u0107, cho\u0107 uznana za naturaln\u0105, wywo\u0142a\u0142a fal\u0119 spekulacji. Afera Srebrnej fundamentalnie podwa\u017cy\u0142a wizerunek Kaczy\u0144skiego jako polityka niezainteresowanego w\u0142asnym maj\u0105tkiem.`,
    chronology: [
      {date: "27.07.2018", event: "Nagranie rozmowy Kaczy\u0144skiego z Birgfellnerem o budowie wie\u017cowc\u00f3w"},
      {date: "29.01.2019", event: "\u201eGazeta Wyborcza\u201d publikuje nagranie"},
      {date: "01.2019", event: "Zeznania Birgfellnera o wymuszeniu 50 tys. z\u0142 dla ks. Sawicza"},
      {date: "02.2019", event: "Prokuratura (za rz\u0105d\u00f3w PiS) odmawia wszcz\u0119cia \u015bledztwa"},
      {date: "2019", event: "Komisja sejmowa pr\u00f3buje przes\u0142ucha\u0107 Kaczy\u0144skiego \u2014 odmawia stawiennictwa"},
      {date: "2019", event: "\u015amier\u0107 Barbary Skrzypek (wsp\u00f3\u0142pracowniczki Kaczy\u0144skiego) 3 dni po przes\u0142uchaniu"},
      {date: "10.2019", event: "PiS wygrywa wybory \u2014 budowa wie\u017cowca nie dochodzi do skutku"},
      {date: "02.2025", event: "Prokurator Wrzosek wszczyna \u015bledztwo po zmianie w\u0142adzy"}
    ],
    people: [
      {name: "Jaros\u0142aw Kaczy\u0144ski", role: "Prezes PiS", details: "Nagrany na negocjacjach o budowie wie\u017cowc\u00f3w. Formalnie bez funkcji w sp\u00f3\u0142ce Srebrna."},
      {name: "Gerald Birgfellner", role: "Austriacki biznesmen, deweloper", details: "Nagra\u0142 rozmow\u0119 z Kaczy\u0144skim. Zezna\u0142 o wymuszeniu 50 tys. z\u0142 dla ksi\u0119dza."},
      {name: "ks. Rafa\u0142 Sawicz", role: "Bliski wsp\u00f3\u0142pracownik Kaczy\u0144skiego", details: "Mia\u0142 otrzyma\u0107 50 000 z\u0142 na polecenie Kaczy\u0144skiego."},
      {name: "Barbara Skrzypek", role: "Wieloletnia wsp\u00f3\u0142pracowniczka Kaczy\u0144skiego", details: "Zmar\u0142a na zawa\u0142 3 dni po przes\u0142uchaniu w sprawie Srebrnej."},
      {name: "Ewa Wrzosek", role: "Prokurator", details: "Wszcz\u0119\u0142a \u015bledztwo w lutym 2025 po zmianie w\u0142adzy."}
    ],
    verdicts: [
      {person: "Jaros\u0142aw Kaczy\u0144ski", sentence: "Brak (śledztwo wszcz\u0119te 02.2025)", details: "Prokuratura za rz\u0105d\u00f3w PiS odmówi\u0142a wszcz\u0119cia. \u015aledztwo wznowione po zmianie w\u0142adzy."}
    ],
    sources: [
      {title: "Afera Srebrnej \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_Srebrnej"},
      {title: "Ta\u015bmy Kaczy\u0144skiego: wie\u017cowce za 1,3 mld z\u0142 \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/7,75398,24394960,tasmy-kaczynskiego-wiezowce-srebrna.html"},
      {title: "Birgfellner zeznaje: 50 tys. z\u0142 dla ksi\u0119dza \u2013 TVN24", url: "https://tvn24.pl/polska/birgfellner-zeznania-kaczyński-srebrna-50-tysiecy"},
      {title: "Srebrna: \u015bledztwo wznowione \u2013 Onet", url: "https://www.onet.pl/informacje/srebrna-sledztwo-wznowione-2025"},
      {title: "\u015amier\u0107 Barbary Skrzypek \u2013 Newsweek", url: "https://www.newsweek.pl/polska/barbara-skrzypek-smierc-po-przesluchaniu/"}
    ]
  },
  {
    id: 20,
    name: "Afera pods\u0142uchowa / Pegasus",
    shortName: "Pegasus",
    period: "2021\u20132022",
    yearStart: 2021,
    yearEnd: 2022,
    type: "surveillance",
    party: "PiS",
    amountPLN: 34000000,
    amountLabel: "33,4 mln z\u0142 (25 mln Fundusz Sprawiedliwo\u015bci + 8,4 mln CBA)",
    maxSentence: "do 25 lat wi\u0119zienia (grozi Ziobrze)",
    maxSentenceYears: 0,
    status: "trwa",
    desc: "Izraelskie oprogramowanie Pegasus u\u017cyte do inwigilacji 578 os\u00f3b, w tym polityk\u00f3w opozycji, prawnik\u00f3w i prokurator\u00f3w. Zakupione z Funduszu Sprawiedliwo\u015bci. Kaczy\u0144ski potwierdzi\u0142 zakup. Romanowski uciek\u0142 na W\u0119gry.",
    fullHistory: `Pegasus to zaawansowane oprogramowanie szpiegowskie opracowane przez izraelsk\u0105 firm\u0119 NSO Group, zdolne do przej\u0119cia pe\u0142nej kontroli nad smartfonem \u2014 w\u0142\u0105cznie z mikrofonikiem, kamer\u0105, wiadomo\u015bciami i lokalizacj\u0105. Jego u\u017cycie wobec polskich obywateli zosta\u0142o ujawnione przez Citizen Lab z Uniwersytetu w Toronto pod koniec 2021 roku.

System zosta\u0142 zakupiony za 25 milion\u00f3w z\u0142otych z Funduszu Sprawiedliwo\u015bci (kontrolowanego przez ministra Ziobrę) oraz 8,4 miliona z\u0142otych z bud\u017cetu CBA. Po\u015brednikiem w transakcji by\u0142a firma Matic, powi\u0105zana z by\u0142ymi funkcjonariuszami S\u0142u\u017cby Bezpiecze\u0144stwa. Jaros\u0142aw Kaczy\u0144ski publicznie potwierdzi\u0142 zakup Pegasusa, stwierdzaj\u0105c: \u201eBy\u0142oby \u017ale, gdyby polskie s\u0142u\u017cby nie mia\u0142y tego typu narz\u0119dzia.\u201d

Inwigilowano \u0142\u0105cznie 578 os\u00f3b. W\u015br\u00f3d nich byli: senator Krzysztof Brejza (40 atak\u00f3w Pegasusem, wykradziono 80 tysi\u0119cy wiadomo\u015bci, kt\u00f3re nast\u0119pnie zmanipulowane wyemitowano w TVP podczas kampanii wyborczej 2019), mecenas Roman Giertych (inwigilowany 18 razy) oraz prokurator Ewa Wrzosek (zaatakowana dzie\u0144 po wszcz\u0119ciu \u015bledztwa ws. organizacji wybor\u00f3w kopertowych). Ska\u0142a inwigilacji \u2014 obejmuj\u0105ca polityków opozycji, prawnik\u00f3w, prokurator\u00f3w i dziennikarzy \u2014 nie mia\u0142a precedensu w demokratycznej Polsce.

Po zmianie w\u0142adzy w 2023 roku prokuratura pod nowym kierownictwem wszcz\u0119\u0142a post\u0119powanie. Uchylono immunitet Zbigniewowi Ziobrze \u2014 prokuratura chce postawi\u0107 mu 26 zarzut\u00f3w, za kt\u00f3re grozi do 25 lat wi\u0119zienia. Marcin Romanowski, wiceminister sprawiedliwo\u015bci odpowiedzialny za Fundusz Sprawiedliwo\u015bci (przez kt\u00f3ry przep\u0142yn\u0119\u0142o 107 mln z\u0142 z podejrzeniem defraudacji), uciek\u0142 na W\u0119gry, gdzie uzyska\u0142 azyl polityczny od rz\u0105du Orbana. Afera Pegasusa sta\u0142a si\u0119 symbolem autorytarnych tendencji rz\u0105d\u00f3w PiS i jednym z g\u0142\u00f3wnych argument\u00f3w za rozliczeniem poprzedniej w\u0142adzy.`,
    chronology: [
      {date: "2017", event: "Zakup Pegasusa za 25 mln z\u0142 z Funduszu Sprawiedliwo\u015bci + 8,4 mln z CBA"},
      {date: "2018\u20132021", event: "Inwigilacja 578 os\u00f3b, w tym polityk\u00f3w opozycji, prawnik\u00f3w i prokurator\u00f3w"},
      {date: "2019", event: "40 atak\u00f3w na telefon Brejzy \u2014 wykradziono 80 tys. wiadomo\u015bci, u\u017cytych w TVP"},
      {date: "2019", event: "18-krotna inwigilacja Romana Giertycha"},
      {date: "12.2021", event: "Citizen Lab (Uniwersytet Toronto) ujawnia u\u017cycie Pegasusa w Polsce"},
      {date: "01.2022", event: "Kaczy\u0144ski potwierdza zakup: \u201eBy\u0142oby \u017ale, gdyby s\u0142u\u017cby nie mia\u0142y tego narz\u0119dzia\u201d"},
      {date: "2022", event: "Sejmowa komisja \u015bledcza ds. Pegasusa"},
      {date: "2023", event: "Zmiana w\u0142adzy \u2014 nowa prokuratura wszczyna post\u0119powania"},
      {date: "2024", event: "Uchylenie immunitetu Ziobrze \u2014 26 zarzut\u00f3w, grozi do 25 lat"},
      {date: "2024", event: "Romanowski (107 mln z\u0142 z Funduszu Sprawiedliwo\u015bci) ucieka na W\u0119gry"},
      {date: "2024", event: "Orban udziela Romanowskiemu azylu politycznego"}
    ],
    people: [
      {name: "Zbigniew Ziobro", role: "Minister sprawiedliwo\u015bci, prokurator generalny", details: "Kontrolowa\u0142 Fundusz Sprawiedliwo\u015bci, z kt\u00f3rego sfinansowano Pegasusa. 26 zarzut\u00f3w, grozi do 25 lat."},
      {name: "Jaros\u0142aw Kaczy\u0144ski", role: "Prezes PiS", details: "Publicznie potwierdzi\u0142 zakup Pegasusa."},
      {name: "Marcin Romanowski", role: "Wiceminister sprawiedliwo\u015bci", details: "Odpowiedzialny za Fundusz Sprawiedliwo\u015bci (107 mln z\u0142). Uciek\u0142 na W\u0119gry, azyl od Orbana."},
      {name: "Krzysztof Brejza", role: "Senator, polityk PO", details: "40 atak\u00f3w Pegasusem. 80 tys. wykradzionych wiadomo\u015bci u\u017cytych w TVP."},
      {name: "Roman Giertych", role: "Adwokat, polityk", details: "Inwigilowany 18 razy Pegasusem."},
      {name: "Ewa Wrzosek", role: "Prokurator", details: "Zaatakowana Pegasusem dzie\u0144 po wszcz\u0119ciu \u015bledztwa ws. wybor\u00f3w kopertowych."}
    ],
    verdicts: [
      {person: "Zbigniew Ziobro", sentence: "Proces w toku (26 zarzut\u00f3w, grozi do 25 lat)", details: "Uchylono immunitet. Prokuratura stawia zarzuty."},
      {person: "Marcin Romanowski", sentence: "Uciekinier (azyl na W\u0119grzech)", details: "Podejrzany o defraudacj\u0119 107 mln z\u0142 z Funduszu Sprawiedliwo\u015bci. Uciek\u0142 na W\u0119gry."}
    ],
    sources: [
      {title: "Pegasus w Polsce \u2013 Wikipedia", url: "https://pl.wikipedia.org/wiki/Afera_Pegasusa_w_Polsce"},
      {title: "Citizen Lab: Pegasus u\u017cyty wobec polskich polityk\u00f3w", url: "https://citizenlab.ca/2021/12/pegasus-vs-polish-politicians/"},
      {title: "Kaczy\u0144ski potwierdza Pegasusa \u2013 TVN24", url: "https://tvn24.pl/polska/kaczynski-potwierdza-zakup-pegasusa"},
      {title: "Romanowski ucieka na W\u0119gry \u2013 Onet", url: "https://www.onet.pl/informacje/romanowski-ucieczka-wegry-azyl-orban"},
      {title: "26 zarzut\u00f3w dla Ziobry \u2013 Gazeta Wyborcza", url: "https://wyborcza.pl/7,75398,ziobro-26-zarzutow-pegasus.html"}
    ]
  }
];
