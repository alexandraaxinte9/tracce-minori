# Pagina About — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/about` with mockup layout (intro blu, due colonne Tracce/Tracciati, foto B/N + linea arancione fissa, CTA disabilitato), content from `src/lib/content/about/` and paths from `traccia-01` / `tracciati-01`.

**Architecture:** Small `src/lib/about/` loader (markdown + PNG URLs + `percorsoSvg` via existing `loadTraccia` / `loadTracciato`). UI composes `AboutHeader`, `AboutPhotoOverlay` (grayscale img + static SVG), and `AboutView`. Prerender single route. Unit tests on markdown parsing; Playwright smoke on `/about`.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, TypeScript, adapter-static (prerender), `import.meta.glob`, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-06-04-pagina-about-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/about/types.ts` | `AboutContent`, `AboutSection` types |
| `src/lib/about/parse.ts` | Split title/body from section markdown |
| `src/lib/about/parse.test.ts` | Unit tests for parser |
| `src/lib/about/load.ts` | `loadAbout()` — testi, foto URLs, percorso SVG |
| `src/lib/about/load.test.ts` | Unit tests for `loadAbout()` |
| `src/lib/percorso/parse.ts` | Shared `parsePercorsoSvg()` (viewBox + path `d`) |
| `src/lib/components/PercorsoStatico.svelte` | Single orange path, no anime.js / markers |
| `src/lib/components/AboutPhotoOverlay.svelte` | Photo + `PercorsoStatico` stacked |
| `src/lib/components/AboutHeader.svelte` | Home + About + Tracciati nav (light theme) |
| `src/lib/components/AboutView.svelte` | Full page layout shell |
| `src/routes/about/+page.ts` | `load()` → `about`, `prerender = true` |
| `src/routes/about/+page.svelte` | Thin wrapper around `AboutView` |
| `src/routes/about/about.e2e.ts` | Playwright smoke tests |
| `src/lib/components/PercorsoAnimato.svelte` | Modify: import shared `parsePercorsoSvg` |

---

### Task 1: Shared SVG path parser

**Files:**
- Create: `src/lib/percorso/parse.ts`
- Modify: `src/lib/components/PercorsoAnimato.svelte`
- Create: `src/lib/percorso/parse.test.ts`
- Test: `src/lib/percorso/parse.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/percorso/parse.test.ts
import { describe, it, expect } from 'vitest';
import { parsePercorsoSvg } from './parse';

describe('parsePercorsoSvg', () => {
	it('extracts viewBox and path d from traccia-01 svg', () => {
		const svg = `<svg viewBox="0 0 272 1002"><path d="M 1 2 L 3 4"/></svg>`;
		const parsed = parsePercorsoSvg(svg);
		expect(parsed.viewBox).toBe('0 0 272 1002');
		expect(parsed.pathD).toBe('M 1 2 L 3 4');
	});

	it('returns empty path when missing', () => {
		const parsed = parsePercorsoSvg('<svg viewBox="0 0 10 10"></svg>');
		expect(parsed.pathD).toBe('');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/percorso/parse.test.ts --run`  
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/percorso/parse.ts
export function parsePercorsoSvg(svg: string): { viewBox: string; pathD: string } {
	const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i);
	const pathMatch = svg.match(/<path[^>]*\sd=["']([^"']+)["']/i);
	return {
		viewBox: viewBoxMatch?.[1] ?? '0 0 100 100',
		pathD: pathMatch?.[1] ?? ''
	};
}
```

In `PercorsoAnimato.svelte`, remove local `parsePercorsoSvg` and add:

```ts
import { parsePercorsoSvg } from '$lib/percorso/parse';
```

Keep `const parsed = $derived(parsePercorsoSvg(percorsoSvg));` unchanged.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/percorso/parse.test.ts --run`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/percorso/parse.ts src/lib/percorso/parse.test.ts src/lib/components/PercorsoAnimato.svelte
git commit -m "refactor: extract parsePercorsoSvg for reuse"
```

---

### Task 2: About markdown parser

**Files:**
- Create: `src/lib/about/types.ts`
- Create: `src/lib/about/parse.ts`
- Create: `src/lib/about/parse.test.ts`
- Test: `src/lib/about/parse.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/about/parse.test.ts
import { describe, it, expect } from 'vitest';
import { parseSectionMarkdown, parseIntroMarkdown } from './parse';

describe('parseSectionMarkdown', () => {
	it('splits first line as title and rest as body', () => {
		const raw = 'Tracce\nPrima riga corpo.\nSeconda riga.';
		expect(parseSectionMarkdown(raw)).toEqual({
			titolo: 'Tracce',
			corpo: 'Prima riga corpo.\nSeconda riga.'
		});
	});
});

describe('parseIntroMarkdown', () => {
	it('returns trimmed intro text', () => {
		expect(parseIntroMarkdown('  Testo intro  \n')).toBe('Testo intro');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/about/parse.test.ts --run`  
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/about/types.ts
export type AboutSection = {
	titolo: string;
	corpo: string;
};

export type AboutContent = {
	intro: string;
	tracce: AboutSection;
	tracciati: AboutSection;
	fotoTracceUrl: string;
	fotoTracciatiUrl: string;
	percorsoTracceSvg: string;
	percorsoTracciatiSvg: string;
};
```

```ts
// src/lib/about/parse.ts
import type { AboutSection } from './types';

export function parseSectionMarkdown(raw: string): AboutSection {
	const trimmed = raw.trim();
	const nl = trimmed.indexOf('\n');
	if (nl === -1) {
		return { titolo: trimmed, corpo: '' };
	}
	return {
		titolo: trimmed.slice(0, nl).trim(),
		corpo: trimmed.slice(nl + 1).trim()
	};
}

export function parseIntroMarkdown(raw: string): string {
	return raw.trim();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/about/parse.test.ts --run`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/about/types.ts src/lib/about/parse.ts src/lib/about/parse.test.ts
git commit -m "feat(about): add markdown section parser"
```

---

### Task 3: About content loader

**Files:**
- Create: `src/lib/about/load.ts`
- Create: `src/lib/about/load.test.ts`
- Test: `src/lib/about/load.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/about/load.test.ts
import { describe, it, expect } from 'vitest';
import { loadAbout } from './load';

describe('loadAbout', () => {
	it('loads intro, sections, photos and percorso svgs', () => {
		const about = loadAbout();
		expect(about.intro.length).toBeGreaterThan(20);
		expect(about.tracce.titolo).toBe('Tracce');
		expect(about.tracciati.titolo).toBe('Tracciati');
		expect(about.fotoTracceUrl).toMatch(/\.png$/);
		expect(about.fotoTracciatiUrl).toMatch(/\.png$/);
		expect(about.percorsoTracceSvg).toContain('<svg');
		expect(about.percorsoTracciatiSvg).toContain('<svg');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/about/load.test.ts --run`  
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/about/load.ts
import { loadTraccia } from '$lib/tracce/load';
import { loadTracciato } from '$lib/tracciati/load';
import type { AboutContent } from './types';
import { parseIntroMarkdown, parseSectionMarkdown } from './parse';

const TRACCIA_SLUG = 'traccia-01';
const TRACCIATO_SLUG = 'tracciati-01';

const introModules = import.meta.glob('/src/lib/content/about/testi/intro.md', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const tracceTextModules = import.meta.glob('/src/lib/content/about/testi/tracce.md', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const tracciatiTextModules = import.meta.glob('/src/lib/content/about/testi/tracciati.md', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const fotoTracceModules = import.meta.glob('/src/lib/content/about/tracce.png/*.png', {
	query: '?url',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const fotoTracciatiModules = import.meta.glob('/src/lib/content/about/tracciati.png/*.png', {
	query: '?url',
	eager: true,
	import: 'default'
}) as Record<string, string>;

function soleValue(map: Record<string, string>, label: string): string {
	const values = Object.values(map);
	if (values.length !== 1) {
		throw new Error(`About: atteso un solo file per ${label}, trovati ${values.length}`);
	}
	return values[0];
}

export function loadAbout(): AboutContent {
	const intro = parseIntroMarkdown(soleValue(introModules, 'intro'));
	const tracce = parseSectionMarkdown(soleValue(tracceTextModules, 'tracce'));
	const tracciati = parseSectionMarkdown(soleValue(tracciatiTextModules, 'tracciati'));
	const fotoTracceUrl = soleValue(fotoTracceModules, 'foto tracce');
	const fotoTracciatiUrl = soleValue(fotoTracciatiModules, 'foto tracciati');
	const { percorsoSvg: percorsoTracceSvg } = loadTraccia(TRACCIA_SLUG);
	const { percorsoSvg: percorsoTracciatiSvg } = loadTracciato(TRACCIATO_SLUG);

	return {
		intro,
		tracce,
		tracciati,
		fotoTracceUrl,
		fotoTracciatiUrl,
		percorsoTracceSvg,
		percorsoTracciatiSvg
	};
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/about/load.test.ts --run`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/about/load.ts src/lib/about/load.test.ts
git commit -m "feat(about): load about content at build time"
```

---

### Task 4: Static orange path component

**Files:**
- Create: `src/lib/components/PercorsoStatico.svelte`

- [ ] **Step 1: Create component**

```svelte
<!-- src/lib/components/PercorsoStatico.svelte -->
<script lang="ts">
	import { parsePercorsoSvg } from '$lib/percorso/parse';

	let { percorsoSvg }: { percorsoSvg: string } = $props();
	const parsed = $derived(parsePercorsoSvg(percorsoSvg));
</script>

<svg class="percorso-statico" viewBox={parsed.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
	<path class="path" d={parsed.pathD} />
</svg>

<style>
	.percorso-statico {
		display: block;
		width: 72%;
		height: auto;
		max-height: 92%;
		overflow: visible;
	}

	.path {
		fill: none;
		stroke: #e85d04;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
```

- [ ] **Step 2: Run check**

Run: `npm run check`  
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/PercorsoStatico.svelte
git commit -m "feat: add PercorsoStatico for fixed orange paths"
```

---

### Task 5: Photo overlay component

**Files:**
- Create: `src/lib/components/AboutPhotoOverlay.svelte`

- [ ] **Step 1: Create component**

```svelte
<!-- src/lib/components/AboutPhotoOverlay.svelte -->
<script lang="ts">
	import PercorsoStatico from './PercorsoStatico.svelte';

	let {
		photoUrl,
		percorsoSvg,
		column = 'tracce'
	}: {
		photoUrl: string;
		percorsoSvg: string;
		column?: 'tracce' | 'tracciati';
	} = $props();
</script>

<figure class="overlay" class:tracce={column === 'tracce'} class:tracciati={column === 'tracciati'}>
	<img src={photoUrl} alt="" decoding="async" />
	<div class="path-layer">
		<PercorsoStatico {percorsoSvg} />
	</div>
</figure>

<style>
	.overlay {
		position: relative;
		margin: 0;
		width: 100%;
		max-width: 22rem;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		background: #f0f0f0;
	}

	.overlay img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1);
	}

	.path-layer {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		pointer-events: none;
	}

	/* Fine-tune per column if mockup alignment needs it */
	.overlay.tracce .path-layer :global(svg) {
		transform: translateY(2%);
	}

	.overlay.tracciati .path-layer :global(svg) {
		transform: translateY(-1%);
	}
</style>
```

Adjust `transform` after visual check in Task 7 if needed.

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/AboutPhotoOverlay.svelte
git commit -m "feat(about): photo with static path overlay"
```

---

### Task 6: Header and page shell

**Files:**
- Create: `src/lib/components/AboutHeader.svelte`
- Create: `src/lib/components/AboutView.svelte`

- [ ] **Step 1: Create AboutHeader**

```svelte
<!-- src/lib/components/AboutHeader.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="nav">
	<a class="home" href={resolve('/')} aria-label="Home">
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M12 3l9 8h-3v10h-5V14H11v7H6V11H3l9-8z"
			/>
		</svg>
	</a>
	<nav class="links" aria-label="Principale">
		<span class="current" aria-current="page">About</span>
		<a href={resolve('/tracciati/[slug]', { slug: 'tracciati-01' })}>Tracciati</a>
	</nav>
</header>

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: #ffffff;
		color: #0b1530;
	}

	.home {
		color: inherit;
		display: grid;
		place-items: center;
	}

	.links {
		display: flex;
		gap: 1.5rem;
		font-size: 0.95rem;
	}

	.links a {
		text-decoration: none;
		color: inherit;
	}

	.links a:hover {
		text-decoration: underline;
	}

	.current {
		font-weight: 600;
	}
</style>
```

- [ ] **Step 2: Create AboutView**

```svelte
<!-- src/lib/components/AboutView.svelte -->
<script lang="ts">
	import type { AboutContent } from '$lib/about/types';
	import AboutHeader from './AboutHeader.svelte';
	import AboutPhotoOverlay from './AboutPhotoOverlay.svelte';

	let { about }: { about: AboutContent } = $props();
</script>

<div class="about-page">
	<AboutHeader />

	<section class="intro">
		<p>{about.intro}</p>
	</section>

	<section class="columns" aria-label="Tracce e Tracciati">
		<article class="column">
			<h2>{about.tracce.titolo}</h2>
			<p class="copy">{about.tracce.corpo}</p>
			<AboutPhotoOverlay
				photoUrl={about.fotoTracceUrl}
				percorsoSvg={about.percorsoTracceSvg}
				column="tracce"
			/>
		</article>

		<article class="column">
			<h2>{about.tracciati.titolo}</h2>
			<p class="copy">{about.tracciati.corpo}</p>
			<AboutPhotoOverlay
				photoUrl={about.fotoTracciatiUrl}
				percorsoSvg={about.percorsoTracciatiSvg}
				column="tracciati"
			/>
		</article>
	</section>

	<div class="cta-wrap">
		<button type="button" class="cta" disabled aria-disabled="true">
			Scopri la storia di Francesco
		</button>
	</div>
</div>

<style>
	.about-page {
		min-height: 100vh;
		background: #ffffff;
		color: #0b1530;
	}

	.intro {
		background: #0b1530;
		color: #ffffff;
		padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem);
	}

	.intro p {
		margin: 0;
		max-width: 52rem;
		font-size: clamp(1.05rem, 2.2vw, 1.35rem);
		line-height: 1.55;
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		padding: clamp(2rem, 5vw, 3.5rem);
		align-items: start;
	}

	.column h2 {
		margin: 0 0 1rem;
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 600;
	}

	.copy {
		margin: 0 0 1.5rem;
		line-height: 1.5;
		white-space: pre-wrap;
		max-width: 28rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: left;
		width: 100%;
	}

	.cta-wrap {
		display: grid;
		place-items: center;
		padding: 2rem 1.5rem 4rem;
	}

	.cta {
		appearance: none;
		border: none;
		background: #0b1530;
		color: #ffffff;
		font: inherit;
		font-size: 1rem;
		padding: 0.85rem 1.75rem;
		border-radius: 999px;
		cursor: not-allowed;
		opacity: 1;
	}

	@media (max-width: 767px) {
		.columns {
			grid-template-columns: 1fr;
		}
	}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/AboutHeader.svelte src/lib/components/AboutView.svelte
git commit -m "feat(about): header and page layout shell"
```

---

### Task 7: Route and visual verification

**Files:**
- Create: `src/routes/about/+page.ts`
- Create: `src/routes/about/+page.svelte`

- [ ] **Step 1: Add route loader**

```ts
// src/routes/about/+page.ts
import { loadAbout } from '$lib/about/load';

export const prerender = true;

export function load() {
	return { about: loadAbout() };
}
```

```svelte
<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import AboutView from '$lib/components/AboutView.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>About — Tracce minori</title>
</svelte:head>

<AboutView about={data.about} />
```

- [ ] **Step 2: Run build and dev check**

Run: `npm run check`  
Expected: PASS

Run: `npm run build`  
Expected: PASS; `/about` in output

Run: `npm run dev` and open `http://localhost:5173/about`  
Verify: intro blu, due colonne, foto B/N, linee arancioni, CTA disabilitato. Tweak `AboutPhotoOverlay` transforms only if alignment off mockup.

- [ ] **Step 3: Commit**

```bash
git add src/routes/about/+page.ts src/routes/about/+page.svelte
git commit -m "feat(about): add prerendered /about route"
```

---

### Task 8: E2E smoke test

**Files:**
- Create: `src/routes/about/about.e2e.ts`
- Test: `src/routes/about/about.e2e.ts`

- [ ] **Step 1: Write Playwright test**

```ts
// src/routes/about/about.e2e.ts
import { expect, test } from '@playwright/test';

test('about page shows intro, sections and disabled CTA', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracciati' })).toBeVisible();
	await expect(page.getByText(/Molti percorsi urbani/i)).toBeVisible();
	const cta = page.getByRole('button', { name: /Francesco/i });
	await expect(cta).toBeVisible();
	await expect(cta).toBeDisabled();
	await expect(page.locator('.overlay img')).toHaveCount(2);
	await expect(page.locator('.percorso-statico')).toHaveCount(2);
});

test('about header links home and tracciati', async ({ page }) => {
	await page.goto('/about');
	await page.getByRole('link', { name: 'Home' }).click();
	await expect(page).toHaveURL(/\/$/);
});
```

- [ ] **Step 2: Run e2e**

Run: `npm run test:e2e -- src/routes/about/about.e2e.ts`  
Expected: PASS

- [ ] **Step 3: Run full test suite**

Run: `npm run test`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/routes/about/about.e2e.ts
git commit -m "test(about): add Playwright smoke tests"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| `/about` route | Task 7 |
| Header home / About / Tracciati | Task 6 |
| Intro + two columns + CTA | Task 6–7 |
| Content from `about/testi` + PNG | Task 3 |
| Lines from `traccia-01` / `tracciati-01` | Task 3 |
| Fixed orange paths, no scroll animation | Task 4–5 |
| Grayscale photos | Task 5 |
| Disabled CTA | Task 6, 8 |
| Mobile stack | Task 6 (`@media`) |
| No regression traccia/tracciato pages | Task 1 only refactors shared parse |

---

## Execution handoff

Plan saved to `docs/superpowers/plans/2026-06-04-pagina-about.md`.

**1. Subagent-Driven (recommended)** — one subagent per task, review between tasks  

**2. Inline Execution** — implement in this session with checkpoints  

Which approach do you want?
