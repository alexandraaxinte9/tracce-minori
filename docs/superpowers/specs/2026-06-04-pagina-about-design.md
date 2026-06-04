# Pagina About — design

**Data:** 2026-06-04  
**Stato:** approvato in brainstorming  
**Approccio scelto:** opzione 1 — composizione in pagina (foto B/N + linea SVG sopra, linee da `traccia-01` e `tracciati-01`)

---

## Obiettivo

Pagina **About** che presenta il progetto: blocco introduttivo, definizioni di **Tracce** e **Tracciati** affiancate, due foto verticali in bianco e nero con **linea arancione fissa** sopra, pulsante CTA in basso. Layout **identico al mockup** fornito in brainstorming.

Le linee non sono incorporate nelle foto export: provengono dai `percorso.svg` della prima traccia (`traccia-01`) e del primo tracciato (`tracciati-01`). Il pulsante *“Scopri la storia di Francesco”* è **solo visivo** (nessun link) finché il contenuto Francesco non esiste.

---

## Decisioni di brainstorming (riepilogo)

| Tema | Scelta |
|------|--------|
| Linee per foto | Una sola linea per colonna: traccia a sinistra, tracciato a destra |
| Fonte linee | Prima traccia + primo tracciato del progetto |
| Layout | Fedele al mockup (intro blu, due colonne, CTA) |
| File in `about/` | Foto solo B/N; linea aggiunta in UI |
| Pulsante CTA | Visivo, senza destinazione per ora |
| Comportamento linee | Fisse, senza animazione scroll |

---

## Pagine e navigazione

| Elemento | Comportamento |
|----------|---------------|
| **URL** | `/about` (route dedicata) |
| **Header** | Icona home (sinistra); link “About” e “Tracciati” (destra). About = pagina corrente |
| **Home** | L’icona home porta alla home del sito (`/`) |
| **Tracciati** (link header) | Porta all’hub o alla sezione tracciati coerente con il resto del sito (stesso target usato altrove per “Tracciati”) |

Le pagine traccia/tracciato esistenti **non** cambiano comportamento in questa fase.

---

## Struttura layout (mockup)

1. **Header** — sfondo chiaro, link come mockup  
2. **Intro** — blocco pieno `#0b1530`, testo bianco, padding generoso  
3. **Sezione due colonne** (desktop affiancate; mobile impilate):
   - **Colonna sinistra — Tracce:** titolo “Tracce”, paragrafo da contenuto, riquadro foto + overlay linea-traccia  
   - **Colonna destra — Tracciati:** titolo “Tracciati”, paragrafo, riquadro foto + overlay linea-tracciato  
4. **CTA** — pulsante centrato, blu scuro, testo bianco, bordi arrotondati: *“Scopri la storia di Francesco”* — elemento `<button>` o `<span>` con aspetto da pulsante, **non** link attivo

### Responsive

- Stessa gerarchia verticale su mobile: intro → Tracce (testo + foto) → Tracciati (testo + foto) → CTA  
- Testi e foto leggibili a larghezza piena; colonne non restano affiancate su viewport stretti

---

## Contenuti (`src/lib/content/about/`)

| Percorso | Uso |
|----------|-----|
| `testi/intro.md` | Testo blocco intro (markdown/plain: paragrafo unico) |
| `testi/tracce.md` | Prima riga = titolo sezione (“Tracce”); resto = corpo |
| `testi/tracciati.md` | Prima riga = titolo (“Tracciati”); resto = corpo |
| `tracce.png/Mask group.png` | Foto B/N colonna Tracce |
| `tracciati.png/Mask group (1).png` | Foto B/N colonna Tracciati |

### Linee SVG (non in `about/`)

| Colonna | File sorgente |
|---------|----------------|
| Tracce | `src/lib/content/tracce/traccia-01/percorso.svg` |
| Tracciati | `src/lib/content/tracciati/tracciati-01/percorso.svg` |

Caricamento tramite stesso meccanismo glob/`load` già usato nel progetto, senza duplicare gli SVG in `about/`.

---

## Composizione foto + linea (opzione 1)

Componente riutilizzabile (es. `AboutPhotoOverlay`):

- Contenitore `position: relative` con rapporto adatto a foto verticali del mockup  
- **Strato 1:** `<img>` foto da `about/`, `object-fit: cover` (o `contain` se necessario per non tagliare), **filtro grayscale** in CSS  
- **Strato 2:** SVG derivato da `percorso.svg`, `position: absolute`, centrato, `pointer-events: none`, `aria-hidden="true"`  
- **Stile linea:** arancione `#e85d04` su **entrambe** le colonne (come mockup About, non bianco come pagina traccia)  
- **Nessun** tratto “todo”, **nessun** marcatore quadrato — solo path completo visibile (progress = 1, variante statica senza anime.js scroll)  
- `stroke-width` coerente con tracciato (~3px nel design system esistente)

### Regolazione visiva (fallback)

Se l’overlay non coincide con il mockup in prova browser, è ammesso **un solo** offset/scala per colonna (CSS custom properties o classi `tracce` / `tracciati`), documentato nel codice — senza pre-compositing PNG e senza coordinate hardcoded per ogni punto del path.

---

## Tipografia e colori

- **Sfondo pagina (sotto intro):** bianco  
- **Testi sezione:** blu scuro `#0b1530` (titoli e corpo definizioni)  
- **Intro:** sfondo `#0b1530`, testo bianco  
- **Font:** Poppins (`--font-sans` esistente)  
- **CTA:** sfondo `#0b1530`, testo bianco, padding e `border-radius` come mockup (pill)

---

## Accessibilità

- Foto decorative: `alt=""`  
- Linee decorative: contenitore con `aria-hidden="true"`  
- Pulsante CTA non attivo: `disabled` o ruolo esplicito con `aria-disabled="true"` per non suggerire un’azione disponibile

---

## Criteri di accettazione

1. Route `/about` raggiungibile e coerente con link header “About”.  
2. Testi corrispondono ai file in `about/testi/`.  
3. Foto mostrate in B/N; linee arancioni visibili e fisse sopra, da `traccia-01` e `tracciati-01`.  
4. Layout desktop e mobile rispettano la gerarchia del mockup.  
5. CTA visibile con testo *“Scopri la storia di Francesco”*, **senza** navigazione al click.  
6. Nessuna regressione sulle pagine `/tracce/[slug]` e `/tracciati/[slug]`.

---

## Fuori scope (questa fase)

- Animazione linee allo scroll su About  
- Link del pulsante verso Francesco / traccia-01  
- Scelta dinamica di traccia/tracciato diversi dalla prima coppia  
- Ridisegno home hub o pagine traccia/tracciato  
- Rinomina file PNG “Mask group” (opzionale cleanup futuro, non bloccante)

---

## Evoluzione futura

- Quando esiste la storia Francesco: CTA diventa link verso la traccia corretta; testo pulsante aggiornabile senza cambiare layout.  
- Linee About aggiornabili cambiando slug sorgente in config/contenuto, mantenendo foto B/N in `about/`.

---

## Riferimenti

- Mockup: `SPIEGAZIONE_PROGETTO` (brainstorming 2026-06-04)  
- Arancione tracciato: `#e85d04` (`PercorsoAnimato`, variante `tracciato`)  
- Spec correlate: `2026-05-28-pagina-traccia-design.md`, `2026-05-29-pagina-tracciato-design.md`
