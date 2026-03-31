# CardioSim Pro v2 - Advanced Cardiovascular Simulation
# CardioSim Pro v2 - Zaawansowana Symulacja Kardiologiczna

---

## EN | English

**CardioSim Pro** is a real-time, interactive cardiovascular simulation running entirely in the browser. It combines anatomical visualization, hemodynamic modeling, and clinical monitoring into a single-page application -- no installation, no dependencies, no server required.

### What it does

- **4-Chamber Heart Model** -- anatomically oriented heart with atria, ventricles, great vessels (aorta with arch and branches, SVC/IVC, pulmonary arteries and veins), coronary arteries (LAD, LCx, RCA), valves with open/close animation, and layered tissue rendering (pericardium, epicardium, myocardium).

- **Real-Time Blood Flow** -- 800 particles with physics-based wobble and trail rendering simulate oxygenated (arterial) and deoxygenated (venous) blood circulating through the heart and vasculature.

- **Hemodynamic Engine** -- Frank-Starling mechanics compute stroke volume, cardiac output, ejection fraction, blood pressure, MAP, SpO2, CVP, PCWP, and PA pressures based on user-adjustable parameters: heart rate, contractility, preload (blood volume), and afterload (SVR).

- **Pressure-Volume Loop** -- real-time PV diagram with ESPVR line and a moving cursor tracking the current phase of the cardiac cycle.

- **Wiggers Diagram** -- synchronized traces of LV pressure, aortic pressure, left atrial pressure, and LV volume.

- **3-Channel Monitor** -- Lead II ECG, SpO2 plethysmography, and arterial line waveform with phosphor-decay CRT effect, sweep line, and glowing trace heads.

- **4 Visualization Modes** -- Anatomy, Blood Flow Map, Pressure Gradient, Electrical Conduction (SA node, AV node, Bundle of His, Purkinje network with animated propagation).

- **8 Clinical Scenarios** -- Normal Sinus, STEMI (with visible ischemic zone), Atrial Fibrillation, Ventricular Tachycardia, Hemorrhagic Shock, Cardiac Tamponade (with pericardial effusion), Pulmonary Embolism (with visible clot), Heart Failure (HFrEF).

- **Audio** -- pulse oximeter beep with pitch proportional to SpO2 (click anywhere to activate).

- **Alarm System** -- screen border flashes red when vitals reach critical thresholds.

### How to use

Open `index.html` in any modern browser, or visit the **[live demo](https://futureshow1.github.io/futureshow/)**.

Adjust sliders on the left panel, switch view modes, or select a clinical scenario to observe the physiological response in real time.

---

## PL | Polski

**CardioSim Pro** to interaktywna symulacja ukladu sercowo-naczyniowego dzialajaca w czasie rzeczywistym, w pelni w przegladarce. Laczy wizualizacje anatomiczna, modelowanie hemodynamiczne i monitoring kliniczny w jednej aplikacji -- bez instalacji, bez zaleznosci, bez serwera.

### Co robi

- **Model serca 4-jamowego** -- anatomicznie zorientowane serce z przedsionkami, komorami, wielkimi naczyniami (aorta z lukiem i odgalezieniami, SVC/IVC, tetnice i zyly plucne), tetnicami wiencowymi (LAD, LCx, RCA), zastawkami z animacja otwierania/zamykania oraz warstwowym renderowaniem tkanek (osierdzie, nasierdzie, miesien sercowy).

- **Przeplyw krwi w czasie rzeczywistym** -- 800 czastek z fizyka ruchu i renderowaniem sladow symuluje krew utlenowana (tetnicza) i odtlenowana (zylna) krazaca przez serce i naczynia.

- **Silnik hemodynamiczny** -- mechanika Franka-Starlinga oblicza objetosc wyrzutowa, rzut serca, frakcje wyrzutowa, cisnienie krwi, MAP, SpO2, CVP, PCWP i cisnienia w tetnicach plucnych na podstawie regulowanych parametrow: czestosci akcji serca, kurczliwosci, obciazenia wstepnego (objetosc krwi) i obciazenia nastepczego (SVR).

- **Petla cisnienie-objetosc** -- diagram PV w czasie rzeczywistym z linia ESPVR i ruchomym kursorem sledzacym biezaca faze cyklu serca.

- **Diagram Wiggersa** -- zsynchronizowane przebiegi cisnienia LV, cisnienia aortalnego, cisnienia lewego przedsionka i objetosci LV.

- **3-kanalowy monitor** -- EKG odprowadzenie II, pletyzmografia SpO2 i linia tetnicza z efektem poswiety CRT, linia przemiatania i swiecacymi punktami na koncach przebiegow.

- **4 tryby wizualizacji** -- Anatomia, Mapa przeplywu krwi, Gradient cisnienia, Przewodzenie elektryczne (wezel SA, wezel AV, peczek Hisa, siec Purkinjego z animowana propagacja).

- **8 scenariuszy klinicznych** -- Rytm zatokowy, STEMI (z widoczna strefa niedokrwienia), Migotanie przedsionkow, Czestoskurcz komorowy, Wstrzas krwotoczny, Tamponada serca (z wysiekiem osierdziowym), Zatorowosc plucna (z widocznym zakrzepem), Niewydolnosc serca (HFrEF).

- **Dzwiek** -- sygnal pulsoksymetru z tonem proporcjonalnym do SpO2 (kliknij gdziekolwiek, aby aktywowac).

- **System alarmowy** -- ramka ekranu miga na czerwono, gdy parametry zyciowe osiagaja wartosci krytyczne.

### Jak uzywac

Otworz `index.html` w dowolnej nowoczesnej przegladarce lub odwiedz **[demo na zywo](https://futureshow1.github.io/futureshow/)**.

Reguluj suwaki w lewym panelu, przelaczaj tryby widoku lub wybierz scenariusz kliniczny, aby obserwowac reakcje fizjologiczna w czasie rzeczywistym.

---

### Tech

Pure HTML + CSS + Canvas 2D. Zero dependencies. Single file. ~25KB.

---

*Built with Claude Code*
