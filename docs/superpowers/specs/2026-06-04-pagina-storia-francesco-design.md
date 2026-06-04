# Pagina La storia di Francesco — design

**Data:** 2026-06-04  
**Stato:** approvato in brainstorming  
**Approccio scelto:** opzione 2 — layout fedele al mockup + contenuti a slot (file per testo, illustrazione e quattro caselle)

---

## Obiettivo

Pagina dedicata a **Francesco** che equilibra tre modi di raccontare (nessuno domina): **leggere** (blocco titolo + testo), **guardare** (illustrazione hero), **esplorare** (quattro caselle verso tracce e tracciati). In questa fase le caselle sono **contenitori visivi** con proporzioni del mockup; le immagini e i collegamenti alle pagine immersive si aggiungono quando pronti.

La pagina si integra nel sito esistente: stesso **clima scuro** delle altre pagine, con **arancione** e **blu** del mockup come accenti. L’header è **identico** su tutto il sito.

---

## Decisioni di brainstorming (riepilogo)

| Tema                      | Scelta                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Esperienza                | Equilibrio lettura + immagine + invito alle quattro caselle (nessuna prevalenza)                             |
| Quattro caselle           | Sempre **2 tracce + 2 tracciati** (layout fisso come mockup)                                                 |
| Click caselle             | Apre le **pagine traccia/tracciato** già esistenti (quando i link sono configurati)                          |
| Quali 2+2                 | **Non ancora decisi** — slot uguali; href opzionale in config                                                |
| Mobile                    | **Proposta team** — colonna, caselle più alte per il tocco                                                   |
| Atmosfera                 | **Sfondo scuro** come il sito (`#0b1530`); arancione/blu del mockup come accenti (non pagina bianca isolata) |
| Header                    | **Uguale ovunque** (home, About, Tracciati)                                                                  |
| Testo hero                | **Definitivo** — da `storiadifrancesco.md` (non lorem)                                                       |
| Implementazione contenuti | **Opzione 2** — slot/file per casella, senza ridisegnare la pagina a ogni aggiunta                           |

---

## Pagine e navigazione

| Elemento     | Comportamento                                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **URL**      | `/storia-di-francesco`                                                                                                                                      |
| **Ingresso** | Pulsante _Scopri la storia di Francesco_ sulla pagina About → link attivo verso questa URL (sostituisce il pulsante disabilitato attuale su branch `about`) |
| **Header**   | Stesso componente/pattern di About: icona home → `/`; link About → `/about`; link Tracciati → destinazione coerente con il resto del sito                   |
| **Home**     | Non modificata in questa fase, salvo eventuale link esplicito in un secondo momento                                                                         |

Le pagine `/tracce/[slug]` e `/tracciati/[slug]` **non** cambiano comportamento interno.

---

## Struttura layout (mockup, adattato al tema scuro)

### Desktop

1. **Header** — come About (chiaro o adattato al tema scuro del sito; stessi link)
2. **Hero** — griglia due colonne:
   - **Sinistra:** blocco arancione (`#f26522` o token progetto) con titolo bianco + paragrafo bianco
   - **Destra:** area illustrazione (proporzione mockup; illustrazione può “scendere” leggermente sotto la linea del blocco arancione)
3. **Sezione “Le sue tracce…”** — titolo blu (`#2e3192` o token), allineato a sinistra; sotto **due caselle** affiancate, sfondo blu pieno, angoli arrotondati
4. **Sezione “e i suoi tracciati”** — titolo blu, allineato a destra (come mockup); sotto **due caselle** affiancate, sfondo scuro/trasparente con **bordo chiaro** sottile, angoli arrotondati

### Mobile (proposta approvata dal team)

Ordine verticale: header → blocco arancione (larghezza piena) → illustrazione → titolo + 2 caselle tracce (impilate o 2×2 ridotto se leggibile) → titolo + 2 caselle tracciati. Caselle con **altezza minima maggiore** del desktop per target touch (~44px area attiva se cliccabili).

### Caselle — stati visivi

| Stato                    | Aspetto                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **Vuota (fase attuale)** | Mantiene colore/bordo del mockup; area centrale libera (nessuna immagine obbligatoria) |
| **Con immagine**         | Immagine centrata (`object-fit: contain` per mappe/linee; non tagliare il disegno)     |
| **Con link**             | Intera casella cliccabile (`<a>`) verso slug traccia/tracciato configurato             |
| **Senza link**           | `<div>` o link disabilitato — nessuna navigazione finché slug non è in config          |

Non mostrare etichette tipo “placeholder” nella versione pubblica finale; in dev è ammesso un bordo tratteggiato solo se utile in anteprima locale (opzionale, non in build produzione).

---

## Contenuti (`src/lib/content/storia-di-francesco/`)

| Percorso                                         | Uso                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `testo/storiadifrancesco.md`                     | Titolo (prima riga `# …` o convenzione documentata nel loader) + corpo paragrafo hero — **testo definitivo**, non segnaposto    |
| `illustrazione/*`                                | File immagine hero (es. PNG esistente); un solo file attivo o campo `hero` in manifest                                          |
| `tracce/casella-1.*`, `tracce/casella-2.*`       | Immagini opzionali per le due caselle blu (png/svg)                                                                             |
| `tracciati/casella-1.*`, `tracciati/casella-2.*` | Immagini opzionali per le due caselle con bordo                                                                                 |
| `manifest.yaml` (o equivalente)                  | Quattro slot: `id`, `tipo` (`traccia` \| `tracciato`), `image` (opzionale), `href` / `slug` (opzionale finché non scelti i 2+2) |

### Manifest — schema minimo

```yaml
titolo_sezione_tracce: 'Le sue tracce...'
titolo_sezione_tracciati: 'e i suoi tracciati'
caselle:
  - id: tracce-1
    tipo: traccia
    slug: null # es. traccia-01 quando deciso
    image: null # path relativo quando presente
  - id: tracce-2
    tipo: traccia
    slug: null
    image: null
  - id: tracciati-1
    tipo: tracciato
    slug: null
    image: null
  - id: tracciati-2
    tipo: tracciato
    slug: null
    image: null
```

Quando `slug` è valorizzato, la casella risolve l’URL con le stesse regole del sito (`/tracce/[slug]`, `/tracciati/[slug]`).

---

## Architettura componenti

| Unità                                         | Responsabilità                                                                               |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/lib/francesco/load.ts`                   | Legge markdown, manifest e glob immagini a build time                                        |
| `src/lib/francesco/types.ts`                  | Tipi `FrancescoContent`, `FrancescoCasella`                                                  |
| `FrancescoHeader.svelte`                      | Riutilizza `AboutHeader` o estrae header condiviso `SiteHeader` se branch `about` è mergeato |
| `FrancescoView.svelte`                        | Composizione layout: hero, sezioni, griglia caselle                                          |
| `FrancescoCasella.svelte`                     | Una casella: varianti `tracce` (blu) / `tracciati` (bordo); link condizionale                |
| `src/routes/storia-di-francesco/+page.ts`     | Load + prerender                                                                             |
| `src/routes/storia-di-francesco/+page.svelte` | Shell pagina                                                                                 |

**Interfaccia casella:** props `variant`, `imageUrl?`, `href?`, `alt?` — consumatore non legge il filesystem.

---

## Tipografia e colori

| Token                   | Valore (mockup / sito)                        | Uso                                                      |
| ----------------------- | --------------------------------------------- | -------------------------------------------------------- |
| Sfondo pagina           | `#0b1530` (`--color-bg`)                      | Corpo pagina                                             |
| Arancione               | `#f26522` (o `#e85d04` se allineato ad About) | Blocco hero, linee nelle caselle quando non c’è immagine |
| Blu titoli              | `#2e3192`                                     | “Le sue tracce…”, “e i suoi tracciati”                   |
| Blu caselle tracce      | `#2e3192`                                     | Sfondo dei due riquadri tracce                           |
| Testo su arancione      | bianco                                        | Titolo + paragrafo hero                                  |
| Bordo caselle tracciati | bianco / `rgba(255,255,255,0.4)`              | Riquadri tracciati                                       |
| Font                    | `Poppins` (`--font-sans`)                     | Coerente con `app.css`                                   |

Il blocco arancione resta **pieno e leggibile** sul fondo scuro della pagina (non invertire in “pagina bianca”).

---

## Integrazione About

Su merge del branch `about`:

- Il `<button disabled>` CTA diventa `<a href="/storia-di-francesco">` (o `resolve()` SvelteKit).
- Testo CTA invariato: _Scopri la storia di Francesco_.

---

## Criteri di accettazione

1. Route `/storia-di-francesco` prerenderizzata e raggiungibile.
2. Hero mostra **titolo e paragrafo** da `storiadifrancesco.md` nel blocco arancione.
3. Area illustrazione riservata con proporzione mockup; con file in `illustrazione/` l’immagine compare.
4. Sezioni _Le sue tracce…_ e _e i suoi tracciati_ con **due caselle ciascuna**, stili distinti (blu vs bordo).
5. Caselle senza immagine: vuote ma dimensionate come mockup.
6. Caselle con `slug` in manifest: link funzionante alle pagine traccia/tracciato esistenti.
7. Header identico al pattern About (stessi link).
8. Layout mobile in colonna con caselle usabili al tocco.
9. CTA About punta a questa pagina quando About è integrato.

---

## Fuori scope (questa fase)

- Scelta dei due slug traccia e due slug tracciato (compito contenuto; manifest resta `null`).
- Animazioni scroll o linee SVG animate nelle caselle (linee **statiche** come immagini o SVG fissi).
- Modifica delle pagine immersive traccia/tracciato.
- Nuove voci in home oltre al flusso About → Francesco.

---

## Riferimenti

- Mockup: _La storia di Francesco_ (brainstorming 2026-06-04)
- Spec correlata: `docs/superpowers/specs/2026-06-04-pagina-about-design.md` (branch `origin/about`)
- Contenuti esistenti su `origin/about`: `src/lib/content/storia-di-francesco/`
