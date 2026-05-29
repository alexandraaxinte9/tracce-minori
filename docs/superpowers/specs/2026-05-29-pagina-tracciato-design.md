# Pagina tracciato — design

**Data:** 2026-05-29  
**Stato:** approvato in brainstorming  
**Approccio scelto:** opzione 1 — stessa “anima” delle Tracce per la linea che si riempie; layout dedicato a foto, linea fissa e disegni

---

## Obiettivo

Per ogni tracciato in `src/lib/content/tracciati/`, una pagina immersiva **senza testo**: uno scroll continuo di foto in bianco e nero, una **linea arancione** ferma che si completa mentre si scorre, e **disegni bianchi** che compaiono quando la foto “gemella” è al centro dello schermo. Il mockup di riferimento mostra sfondo bianco, padding intorno alle foto, linea a sinistra e illustrazioni a destra.

Le **Tracce** (testo + linea bianca su blu) restano invariate nel comportamento; cambia solo il punto di ingresso condiviso (home con due liste) e la destinazione del pulsante indietro.

---

## Pagine del sito

| Pagina              | Ruolo                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| **Home / indice**   | Unica pagina con **due sezioni**: elenco Tracce ed elenco Tracciati   |
| **Pagina tracciato**| Esperienza foto + linea + disegni per un singolo tracciato            |
| **Pagina traccia**  | Esperienza esistente (YAML + linea); comportamento invariato          |

- Una URL per tracciato (es. `tracciati-01`, `tracciati-02`, …), parallela alle URL traccia (`tracce/traccia-01`, …).
- **Pulsante indietro** (stesso stile delle Tracce: cerchio in alto a sinistra) sulla pagina tracciato: torna alla **home con le due liste**, non a un elenco solo tracce.
- **Allineamento Tracce:** anche il pulsante indietro delle pagine traccia punta alla **home** (stesso hub), così navigazione coerente.
- La route `/tracce` attuale (solo elenco tracce) viene sostituita o reindirizzata alla home; l’indice ufficiale del sito è la **home**.

L’elenco può restare minimale nella prima versione (link alle cartelle esistenti, titolo derivato dallo slug o da metadati futuri).

---

## Contenuti per tracciato

Ogni cartella in `src/lib/content/tracciati/tracciati-XX/` contiene:

| Cartella / file  | Uso                                                                 |
| ---------------- | ------------------------------------------------------------------- |
| `foto/`          | Immagini JPG del percorso, mostrate in scroll verticale continuo    |
| `disegni/`       | SVG bianchi; nome file = numero della foto gemella (es. `16.svg`)   |
| `percorso.svg`   | Linea del tracciato da animare (arancione in UI)                    |
| `dati.json`      | Metadati GPS; **non** usati nella UI di questa pagina               |

### Ordine delle foto

- Ordine per **nome file**, con ordinamento **numerico naturale** (`1`, `2`, `3`, … `10`, non `1`, `10`, `2`).
- File con nomi non numerici (es. `13 (2).jpg`) seguono l’ordinamento naturale del filesystem dopo i numeri puri; in caso di ambiguità, l’ordine alfabetico/naturale del nome vince.

### Abbinamento disegno ↔ foto

- Un disegno `N.svg` è **gemello** della foto `N.jpg` (stesso numero nel nome, estensione diversa).
- Il disegno è visibile solo mentre la foto gemella è **ben visibile nella zona centrale** del viewport (parte centrale dello schermo, non appena compare un bordo).
- Se non esiste `disegni/N.svg`, nessun disegno per quella foto (nessun errore in pagina).

### Tracciati senza foto

- Restano in elenco sulla home.
- Aprendo un tracciato senza cartella `foto/` o con cartella vuota: sfondo bianco, linea arancione comunque animabile allo scroll (se c’è almeno altezza di scroll minima), più messaggio discreto **«Foto in arrivo»** al centro. Nessun testo narrativo oltre a questo messaggio.

---

## Layout e aspetto

### Sfondo e foto

- Sfondo pagina: **bianco**.
- Foto in **colonna unica**, incollate in verticale (**scroll continuo**, senza snap a una foto per volta).
- Ogni foto ha **padding bianco** intorno (non a filo del bordo dello schermo); le immagini restano in scala ragionevole (larghezza massima del contenuto, altezza automatica).

### Linea arancione (tracciato)

- **Fissa** al viewport (come la colonna tracciato nelle Tracce): non scorre con le foto.
- **Riempimento** legato alla posizione di scroll dell’intero filone foto:
  - Inizio scroll (prima foto in alto) → linea ancora da completare.
  - Fine scroll (ultima foto in basso) → linea **completa**.
  - Progressione **proporzionale** e fluida tra 0% e 100% (stessa percezione delle Tracce: disegno progressivo con anime.js v4 e componente percorso esistente, con colori diversi).
- **Aspetto:**
  - Tratto non ancora percorso: grigio o arancione molto tenue.
  - Tratto percorso: **arancione pieno** (come mockup).
  - **Marcatori** all’inizio e sulla “testa” del disegno, in arancione (equivalente ai quadratini bianchi delle Tracce).
- Il file `percorso.svg` può avere tratto nero in sorgente; in pagina i colori sono sovrascritti dal tema tracciato.

### Disegni bianchi

- Strato sopra le foto, **sotto** la linea (z-index: foto < disegni < linea < pulsante indietro).
- Posizione di default: **lato destro** dello schermo, come nel mockup; il SVG mantiene le proporzioni del file.
- **Entrata/uscita:** dissolvenza morbida (opacity) quando la foto gemella entra/esce dalla zona centrale.
- Su schermi stretti i disegni possono **ridimensionarsi** leggermente per non coprire tutta la foto; stesso comportamento logico (gemella al centro).

### Mobile

- Stessa esperienza: scroll lungo, linea ferma, disegni a destra con eventuale riduzione di scala.
- Nessuna variante “solo foto a tutto schermo senza linea”.

### Distinzione visiva Tracce vs Tracciati

| Elemento        | Tracce              | Tracciati                    |
| --------------- | ------------------- | ---------------------------- |
| Sfondo          | Blu scuro           | Bianco                       |
| Linea attiva    | Bianca              | Arancione                    |
| Contenuto scroll| Frasi + titolo      | Solo foto                    |
| Extra           | —                   | Disegni bianchi su foto gemelle |

---

## Comportamento scroll (sintesi)

```text
[ Home: liste Tracce + Tracciati ]

        ↓ apri tracciato

┌─────────────────────────────────────┐
│  ← indietro (fisso)                 │
│                                     │
│   [linea arancione fissa]  [disegno]│  ← disegno solo se foto N al centro
│         ↑ si riempie                │
│         │   con lo scroll           │
│   ┌─────────────┐                   │
│   │  foto 1     │  padding bianco   │
│   ├─────────────┤                   │
│   │  foto 2     │  scroll continuo  │
│   ├─────────────┤                   │
│   │  ...        │                   │
│   └─────────────┘                   │
└─────────────────────────────────────┘
```

- **Nessun testo** (titoli, frasi, orari) sulla pagina tracciato.
- Progresso linea = `scrollTop / (scrollHeight - viewportHeight)` (clamp 0–1), aggiornato durante lo scroll; animazione morbida del tratto disegnato come su `PercorsoAnimato`.

---

## Implementazione (note per il piano tecnico)

- Riutilizzare `PercorsoAnimato` (o variante tematizzata) con variabili CSS `--color-path-todo` / `--color-path-done` arancione/grigio.
- Nuovo componente vista tracciato (es. `TracciatoView`) + caricamento contenuti da `src/lib/content/tracciati/` (pattern analogo a `$lib/tracce/load`).
- Home: `src/routes/+page.svelte` con due liste; loader che elenca cartelle `tracciati-*` e tracce esistenti.
- Route tracciato: es. `src/routes/tracciati/[slug]/`.
- Rilevamento foto gemella: `IntersectionObserver` (o equivalente) sulla sezione di ogni foto con soglia centrata sul viewport.

Dettagli file, test e token colore esatti restano al piano di implementazione.

---

## Fuori scope — prima versione

- Testi narrativi, titoli di tracciato in pagina, orari.
- Audio, video, mappa, dati GPS in UI.
- Icone o elementi extra oltre indietro (es. aeroplanino delle Tracce).
- Animazioni sui disegni oltre alla dissolvenza.
- Editor o upload contenuti dal sito.

---

## Criteri di successo

1. La **home** mostra due liste (Tracce e Tracciati) con link funzionanti.
2. Ogni tracciato con contenuto in `src/lib/content/tracciati/` ha una pagina dedicata raggiungibile dalla home.
3. Le foto scorrono in **colonna continua** con **padding bianco**; ordine **numerico naturale** per nome file.
4. La **linea arancione** resta **ferma** e si **riempie** dall’inizio alla fine dello scroll, in modo fluido come sulle Tracce.
5. I **disegni** compaiono/scompaiono con dissolvenza solo quando la **foto gemella** è nella zona centrale.
6. Tracciati **senza foto** mostrano messaggio «Foto in arrivo» senza rompere la pagina.
7. Il pulsante **indietro** da tracciato (e da traccia) torna alla **home** a due liste.
8. Su **mobile** il comportamento è equivalente a desktop (scroll, linea fissa, disegni).

---

## Riferimenti

- Mockup: screenshot pagina tracciato (foto B/N, linea arancione, disegni bianchi a destra).
- Contenuto esempio completo: `src/lib/content/tracciati/tracciati-01/` (foto, disegni, `percorso.svg`).
- Tracciati parziali: `tracciati-02`, `tracciati-03` (solo `percorso.svg` + `dati.json` al momento del design).
- Pagina traccia esistente: `docs/superpowers/specs/2026-05-28-pagina-traccia-design.md`, componenti `TracciaView`, `PercorsoAnimato`.
- Dipendenze: `animejs` ^4 (già in progetto).
