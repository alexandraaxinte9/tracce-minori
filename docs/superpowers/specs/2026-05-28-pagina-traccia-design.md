# Pagina traccia — design

**Data:** 2026-05-28  
**Stato:** approvato in brainstorming  
**Approccio scelto:** opzione 1 — due metà fisse (desktop) / tracciato sullo sfondo (mobile)

---

## Obiettivo

Per ogni traccia in `static/tracce/`, una pagina del sito che racconta il percorso: a sinistra (o sullo sfondo su mobile) il tracciato SVG che si completa mentre si scorre; a destra le frasi dal YAML, con enfasi sulla frase al centro. Animazioni con anime.js v4 legate allo scroll.

---

## Pagine del sito

| Pagina | Ruolo |
|--------|--------|
| **Elenco tracce** | Mostra tutte le tracce disponibili; punto di ingresso per sceglierne una |
| **Pagina traccia** | Esperienza immersiva di una singola traccia (mockup di riferimento) |

- Una URL per traccia (es. `traccia-01`, `traccia-02`, …).
- Pulsante **indietro** in alto a sinistra: torna sempre all’**elenco tracce** (non la home generica, non “indietro browser”).

L’elenco tracce è parte dello stesso progetto ma può essere minimale nella prima versione (link alle tre tracce esistenti).

---

## Contenuti per traccia

Ogni cartella in `static/tracce/traccia-XX/` contiene:

| File | Uso |
|------|-----|
| `frasi.yaml` | Titolo + elenco frasi (orario + testo) |
| `percorso.svg` | Linea del tracciato da animare |
| `dati.json` | Metadati GPS (non usati direttamente nella UI di questa pagina) |

### Schema YAML

```yaml
titolo: "Nome della traccia"
frasi:
  - orario: "9:55"
    frase: "Testo della frase..."
  # ... un numero qualsiasi di voci
```

- **`titolo`**: obbligatorio; mostrato nella prima fermata dello scroll (senza orario).
- **`frasi`**: array di lunghezza variabile (non fisso a 6); ogni voce ha `orario` e `frase`.

Il numero di frasi può differire tra una traccia e l’altra.

---

## Layout

### Desktop (≥ breakpoint da definire in implementazione)

- Sfondo: blu scuro (come mockup).
- **Colonna sinistra (~50%)**: tracciato SVG verticale, **fisso** durante lo scroll delle frasi.
- **Colonna destra**: lista frasi con scroll verticale a **capitoli** (snap).
- **Alto sinistra**: pulsante indietro (cerchio + freccia bianca).

### Mobile

- Stesso sfondo.
- **Tracciato**: a tutto schermo, **sullo sfondo**, leggermente attenuato per la leggibilità del testo.
- **Frasi**: sopra il tracciato, stesso comportamento a capitoli e stessa gerarchia visiva.
- Pulsante indietro sempre raggiungibile.

---

## Scroll e fermate

### Numero di fermate (variabile)

Le fermate dello scroll sono:

1. **Una fermata per il titolo** (sempre la prima).
2. **Una fermata per ogni voce in `frasi`** — il conteggio dipende dal YAML (es. 4, 6, 8…).

**Totale fermate = 1 + numero di frasi** (non è fisso a 7).

### Comportamento dello scroll

- Scroll **a capitoli**: ogni fermata si aggancia al centro del viewport (snap).
- La frase (o il titolo) al centro è **grande**, bianco pieno, in evidenza.
- Le voci sopra e sotto sono **più piccole** e con **opacità minore**.
- Transizioni morbide tra fermate (anime.js v4 + eventi di scroll).

### Sincronizzazione tracciato ↔ frasi

- Sulla **fermata titolo**: il percorso è ancora **tutto da fare** (linea grigia/trasparente; nessun tratto bianco “completato”).
- Su ogni **fermata frase** *i* (dalla prima all’ultima): il tracciato avanza di **1/N**, dove **N = numero di frasi** nel YAML.
  - Esempio: 6 frasi → alla frase 3 il percorso è disegnato per 3/6 della lunghezza.
  - Esempio: 4 frasi → alla frase 2 per 2/4, ecc.

Il titolo **non** consuma un segmento del percorso; i segmenti sono solo legati alle frasi.

### Tracciato (aspetto)

- Tratto **non percorso**: grigio / semi-trasparente (come mockup).
- Tratto **percorso**: bianco pieno.
- **Marcatori**: quadratino/punto bianco all’inizio del percorso e sulla “testa” del disegno (confine tra fatto e da fare), come nel mockup.

---

## Animazioni (anime.js v4)

- **Percorso**: disegno progressivo del tratto bianco (es. `stroke-dashoffset` o equivalente) allineato alla fermata/frase corrente.
- **Testi**: scala e opacità della voce attiva vs. quelle periferiche durante il cambio fermata e, se utile, leggero aggiornamento continuo mentre si avvicina al centro.

Dettagli tecnici (timeline, ScrollObserver, ecc.) restano all’implementazione; il comportamento percepito deve rispettare le regole sopra.

---

## Gerarchia visiva del testo

| Posizione | Aspetto |
|-----------|---------|
| Centro (fermata attiva) | Grande, bianco, massima leggibilità |
| Sopra / sotto | Più piccolo, opacità ridotta |
| Titolo (prima fermata) | Stesso trattamento “in evidenza” al centro; senza riga orario |

Tipografia e colori esatti seguono il mockup allegato (sans-serif bianco su blu scuro).

---

## Fuori scope — prima versione

- Icona aeroplanino in basso a destra (rimandata).
- Link o interazioni extra oltre elenco ↔ pagina traccia.
- Uso dei dati in `dati.json` nella UI di questa pagina.

---

## Criteri di successo

1. Ogni traccia in `static/tracce/` ha una pagina navigabile dall’elenco.
2. Il titolo e tutte le frasi del YAML compaiono come fermate snap; funziona con un numero variabile di frasi.
3. Sul titolo il percorso è ancora tutto “da fare”; ogni frase fa avanzare il disegno di 1/N.
4. Desktop rispecchia il mockup (split + tracciato fisso); mobile ha tracciato sullo sfondo e testo sopra.
5. Il pulsante indietro porta all’elenco tracce.
6. Le animazioni percorso e testo usano anime.js v4 e reagiscono allo scroll/snap in modo fluido.

---

## Riferimenti

- Mockup: pagina traccia (layout split, colori, marcatori sul percorso).
- Dati esempio: `static/tracce/traccia-01/` (e 02, 03).
- Dipendenze già in progetto: `animejs` ^4, `js-yaml`.
