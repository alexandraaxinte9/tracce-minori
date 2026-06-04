# Ottimizzazione immagini — design

**Data:** 2026-06-04  
**Stato:** approvato in brainstorming  
**Approccio scelto:** opzione 3 — `@sveltejs/enhanced-img` al build + guida export opzionale per la designer

**Riferimento:** [Images • SvelteKit](https://svelte.dev/docs/kit/images)

---

## Obiettivo

Rendere l’esperienza delle pagine **Tracciati** fluida su telefono e desktop, senza cambiare layout o estetica (scroll foto B/N, padding bianco, disegni SVG a destra). Priorità esplicite del progetto:

1. **Niente salti di layout** mentre le foto caricano (spazio riservato subito).
2. **File adatti allo schermo** (telefono non scarica file pensati per un monitor grande).
3. Qualità percepita **pulita**, senza aspetto “compresso” o sporco — la designer delega il bilanciamento tecnico.

La riduzione del peso in download è un effetto collaterale desiderato, non un obbligo di lavoro manuale per ogni JPG.

---

## Contesto attuale

| Elemento | Stato |
| -------- | ----- |
| Foto tracciato | ~49 JPG in `tracciati-01/foto/`, ordine naturale, `import.meta.glob` con `?url` |
| Peso sorgente | ~185 MB per `tracciati-01` (molti file 4–7 MB ciascuno) |
| UI | `TracciatoView.svelte`: `<img loading="lazy">`, `max-width: 42rem` |
| Disegni | SVG in `disegni/`, leggeri; `<img>` con filtro bianco — **invariati** |
| Altre pagine | Nessun altro `<img>` raster nel sito |
| Build | Vite + SvelteKit static adapter; **nessun** `@sveltejs/enhanced-img` oggi |

---

## Cosa cambia per il visitatore

| Prima | Dopo |
| ----- | ---- |
| Stesso JPG pesante per tutti i dispositivi | `srcset` con taglie e formati moderni (WebP/AVIF) generati al build |
| Possibile layout shift senza dimensioni intrinseche | `width` / `height` aggiunti in preprocess per riservare lo spazio |
| Lazy su tutte le foto | Prima foto con priorità più alta; le altre restano lazy allo scroll |

**Invariato:** colonna unica, padding, linea arancione fissa, logica disegno↔foto, messaggio «Foto in arrivo», pagine Tracce.

---

## Cosa cambia per la designer

| Attività | Azione |
| -------- | ------ |
| Aggiungere foto | Come oggi: JPG in `foto/` con nome numerico (`N.jpg`) |
| Disegni | Nessun cambiamento (`N.svg` in `disegni/`) |
| Export (opzionale) | Alta qualità, larghezza consigliata **1400–2000 px** — sufficiente per 2× rispetto alla colonna (~42rem). Non serve produrre WebP/AVIF o versioni mobile a mano |
| QA | Dopo deploy: controllo visivo telefono + desktop; segnalare solo se la resa appare sporca o troppo morbida |

---

## Architettura tecnica

### 1. Dipendenza e Vite

- Installare `@sveltejs/enhanced-img` come devDependency.
- In `vite.config.ts`, registrare `enhancedImages()` **prima** di `sveltekit()` (requisito documentazione).

Il primo build dopo aggiunta/modifica foto sarà più lento; output in cache (`node_modules/.cache/imagetools`) per build successivi.

### 2. Caricamento contenuti (`src/lib/tracciati/load.ts`)

- Sostituire il glob foto da `query: '?url'` a glob con `query: { enhanced: true }` (pattern estensioni come in [docs](https://svelte.dev/docs/kit/images): jpg, jpeg, png, webp, ecc.).
- Mappare ogni voce al `default` del modulo enhanced (non URL stringa grezza).
- Aggiornare `TracciatoFoto` in `types.ts`: il campo sorgente non è più `url: string` ma un riferimento compatibile con `<enhanced:img src={...}>` (tipo Picture / modulo enhanced).

Ordine foto e abbinamento disegni: **invariati** (natural sort, `disegni/N.svg` ↔ `N.jpg`).

### 3. UI (`TracciatoView.svelte`)

- Foto nel loop: `<enhanced:img>` al posto di `<img>`, con `alt` descrittivo se disponibile in futuro; per ora coerente con design esistente (alt vuoto decorativo — valutare miglioramento accessibilità fuori scope).
- Attributo **`sizes`**: allineato al layout — colonna `max-width: 42rem` e padding figura, es. `min(42rem, 100vw)` o equivalente che rifletta padding orizzontale (~`min(42rem, calc(100vw - 1.5rem))`).
- **Prima foto** della lista: `fetchpriority="high"`, **senza** `loading="lazy"`.
- **Foto 2+**: `loading="lazy"`, `decoding="async"` come oggi.
- Stile: regola CSS su `enhanced\:img` o sul contenitore `.foto img` aggiornata per il markup generato (`<picture>` wrapper) — mantenere `width: 100%`, `max-width: 42rem`, `height: auto` sul img effettivo (pattern doc: `.foto img { height: auto; }` se width/height intrinseci aggiunti dal plugin).
- **Illustrazione SVG** (`activeDisegnoUrl`): resta `<img src={url}>` con `?url` glob; SVG non passa da enhanced-img.

### 4. Tipi Svelte

- Verificare che `app.d.ts` / tipi kit riconoscano `enhanced:img` (namespace o dichiarazione da pacchetto enhanced-img se richiesto).

---

## Approcci scartati

| Approccio | Motivo esclusione |
| --------- | ----------------- |
| Solo export manuale | Lavoro ripetuto; niente srcset/formati moderni automatici |
| CDN dinamico (unpic, Cloudinary) | Foto statiche in repo; nessun CMS; overhead non necessario |
| Blur-up / placeholder colorati | Fuori scope; mockup è bianco + spazio riservato, non skeleton |

---

## Error handling e edge case

| Caso | Comportamento |
| ---- | ------------- |
| Tracciato senza foto | Invariato («Foto in arrivo») |
| Foto senza disegno gemello | Invariato (nessun disegno) |
| File `foto` non immagine / glob escluso | Build fallisce o file ignorato dal pattern — stesso principio attuale |
| Nome file non numerico (es. `13 (2).jpg`) | Ordine naturale invariato |

---

## Testing e verifica

| Verifica | Criterio |
| -------- | -------- |
| `npm run build` | Completa senza errori |
| `npm run check` | Nessun errore tipi su glob enhanced / `enhanced:img` |
| Test unitari `load.test.ts` | Aggiornati per assert su modulo enhanced, non URL string |
| Manuale | Tracciato con foto: scroll fluido, niente salti evidenti, prima foto visibile presto |
| Manuale qualità | B/N: grana e contrasto accettabili su mobile e desktop |

Eventuale test e2e Playwright: pagina tracciato carica e almeno una `<picture>` o img ottimizzata presente — solo se il setup esistente lo consente senza fragilità su URL hashati.

---

## Fuori scope

- Ottimizzazione immagini su pagine Tracce (solo SVG inline/raw).
- CDN o hosting immagini esterno.
- Rinomina / pulizia batch dei JPG già in repo (la designer può alleggerire Git col tempo con export 1400–2000 px).
- Testi `alt` descrittivi per ogni foto (miglioramento accessibilità separato).
- Animazioni di caricamento (blur, shimmer).

---

## Consigli aggiuntivi (documentazione SvelteKit)

Oltre a `enhanced-img`, tenere presente per il futuro:

- **Vite asset handling** resta adatto per asset piccoli e non-foto.
- **`sizes` accurato** su immagini “hero” larghe — qui la colonna 42rem è il vincolo principale.
- **Non usare `em`/`rem` in `sizes`** se si cambia `font-size` root del documento.
- **2× sorgente** per retina: i master possono restare più larghi di 42rem; il plugin scala verso il basso, non inventa pixel in su.

---

## Riepilogo decisioni brainstorming

| Domanda | Risposta |
| ------- | -------- |
| Problema percepito | D — fluidità generale, non testato solo mobile |
| Qualità | D — fiducia al team, niente aspetto compresso |
| Priorità visitatore | B (no salti) + C (file giusti per schermo) |
| Soluzione | Ibrido: enhanced-img + guida export opzionale |
