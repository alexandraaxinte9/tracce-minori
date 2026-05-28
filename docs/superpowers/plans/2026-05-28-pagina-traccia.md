# Pagina traccia — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the track list page and one immersive scroll page per track (SVG path draw + YAML phrases with snap scroll), matching `docs/superpowers/specs/2026-05-28-pagina-traccia-design.md`.

**Architecture:** SvelteKit prerender loads YAML/SVG from `static/tracce/` at build time via a small `src/lib/tracce/` data layer. The track page composes `PercorsoAnimato` (anime.js `createDrawable`) and `FrasiScroller` (CSS scroll-snap + IntersectionObserver + anime.js text transitions). Layout switches at 768px: split columns on desktop, full-bleed background path on mobile.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, TypeScript, adapter-static (prerender), js-yaml, animejs v4 (`animate`, `createDrawable`, `onScroll` from `animejs` / `animejs/svg` / `animejs/events` as needed), Vitest (unit), optional Playwright (smoke).

**Spec:** `docs/superpowers/specs/2026-05-28-pagina-traccia-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/tracce/types.ts` | `TracciaContent`, `Frase`, `TracciaSummary` types |
| `src/lib/tracce/load.ts` | Read `static/tracce/*` at build time (Node `fs`) |
| `src/lib/tracce/load.test.ts` | Unit tests for loaders |
| `src/lib/tracce/progress.ts` | `pathProgress(activeStopIndex, phraseCount)` pure helper |
| `src/lib/tracce/progress.test.ts` | Unit tests for progress mapping |
| `src/lib/components/BackButton.svelte` | Circle back link to `/tracce` |
| `src/lib/components/PercorsoAnimato.svelte` | Inline SVG path, gray base + white draw, markers |
| `src/lib/components/FrasiScroller.svelte` | Snap scroll list, active index, text emphasis |
| `src/lib/components/TracciaView.svelte` | Desktop/mobile layout shell |
| `src/routes/tracce/+page.ts` | `load()` → list of tracce |
| `src/routes/tracce/+page.svelte` | Minimal list UI |
| `src/routes/tracce/[slug]/+page.ts` | `load()`, `entries()`, error handling |
| `src/routes/tracce/[slug]/+page.svelte` | Track page |
| `src/routes/+page.ts` | Redirect `/` → `/tracce` |
| `src/app.css` | Global tokens (navy bg, typography) |
| `static/tracce/traccia-0X/frasi.yaml` | Add `titolo` field to each track |

---

### Task 1: Data layer — types and path progress

**Files:**
- Create: `src/lib/tracce/types.ts`
- Create: `src/lib/tracce/progress.ts`
- Create: `src/lib/tracce/progress.test.ts`
- Test: `src/lib/tracce/progress.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/tracce/progress.test.ts
import { describe, it, expect } from 'vitest';
import { pathProgress, stopCount } from './progress';

describe('pathProgress', () => {
	it('returns 0 on title stop (index 0)', () => {
		expect(pathProgress(0, 6)).toBe(0);
	});

	it('returns i/N for phrase stop i', () => {
		expect(pathProgress(1, 6)).toBeCloseTo(1 / 6);
		expect(pathProgress(3, 6)).toBeCloseTo(3 / 6);
		expect(pathProgress(6, 6)).toBe(1);
	});

	it('works with variable phrase counts', () => {
		expect(pathProgress(2, 4)).toBe(0.5);
	});
});

describe('stopCount', () => {
	it('is 1 + phrase count', () => {
		expect(stopCount(6)).toBe(7);
		expect(stopCount(4)).toBe(5);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/tracce/progress.test.ts --run`  
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/tracce/progress.ts
/** Scroll stop index: 0 = title, 1..N = phrases */
export function pathProgress(activeStopIndex: number, phraseCount: number): number {
	if (activeStopIndex <= 0 || phraseCount === 0) return 0;
	return Math.min(activeStopIndex / phraseCount, 1);
}

export function stopCount(phraseCount: number): number {
	return 1 + phraseCount;
}
```

```ts
// src/lib/tracce/types.ts
export type Frase = {
	orario: string;
	frase: string;
};

export type TracciaContent = {
	slug: string;
	titolo: string;
	frasi: Frase[];
	percorsoSvg: string;
};

export type TracciaSummary = {
	slug: string;
	titolo: string;
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/tracce/progress.test.ts --run`  
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/tracce/types.ts src/lib/tracce/progress.ts src/lib/tracce/progress.test.ts
git commit -m "feat(tracce): add types and path progress helper"
```

---

### Task 2: Data layer — load tracce from disk

**Files:**
- Create: `src/lib/tracce/load.ts`
- Create: `src/lib/tracce/load.test.ts`
- Modify: `static/tracce/traccia-01/frasi.yaml`, `traccia-02`, `traccia-03` (add `titolo`)

- [ ] **Step 1: Add `titolo` to YAML files**

```yaml
# static/tracce/traccia-01/frasi.yaml (top of file)
titolo: "Traccia 01"
frasi:
  # ... existing entries unchanged
```

Use human titles (can match folder name for now): `Traccia 01`, `Traccia 02`, `Traccia 03`.

- [ ] **Step 2: Write the failing test**

```ts
// src/lib/tracce/load.test.ts
import { describe, it, expect } from 'vitest';
import { listTracce, loadTraccia } from './load';

describe('listTracce', () => {
	it('returns at least traccia-01', () => {
		const list = listTracce();
		expect(list.some((t) => t.slug === 'traccia-01')).toBe(true);
		expect(list[0]).toHaveProperty('titolo');
	});
});

describe('loadTraccia', () => {
	it('loads traccia-01 with titolo and frasi', () => {
		const t = loadTraccia('traccia-01');
		expect(t.slug).toBe('traccia-01');
		expect(t.titolo).toBeTruthy();
		expect(t.frasi.length).toBeGreaterThan(0);
		expect(t.percorsoSvg).toContain('<svg');
	});

	it('throws on unknown slug', () => {
		expect(() => loadTraccia('non-esiste')).toThrow();
	});
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/tracce/load.test.ts --run`  
Expected: FAIL

- [ ] **Step 4: Implement loader**

```ts
// src/lib/tracce/load.ts
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import type { TracciaContent, TracciaSummary, Frase } from './types';

const TRACCE_ROOT = join(process.cwd(), 'static', 'tracce');

type YamlRoot = {
	titolo: string;
	frasi: Frase[];
};

export function listTracce(): TracciaSummary[] {
	const dirs = readdirSync(TRACCE_ROOT, { withFileTypes: true })
		.filter((d) => d.isDirectory() && d.name.startsWith('traccia-'))
		.map((d) => d.name)
		.sort();

	return dirs.map((slug) => {
		const { titolo } = parseYaml(slug);
		return { slug, titolo };
	});
}

export function loadTraccia(slug: string): TracciaContent {
	const dir = join(TRACCE_ROOT, slug);
	if (!existsSync(dir)) {
		throw new Error(`Traccia non trovata: ${slug}`);
	}
	const { titolo, frasi } = parseYaml(slug);
	const percorsoSvg = readFileSync(join(dir, 'percorso.svg'), 'utf8');
	return { slug, titolo, frasi, percorsoSvg };
}

function parseYaml(slug: string): YamlRoot {
	const raw = readFileSync(join(TRACCE_ROOT, slug, 'frasi.yaml'), 'utf8');
	const data = yaml.load(raw) as YamlRoot;
	if (!data?.titolo || !Array.isArray(data.frasi)) {
		throw new Error(`YAML invalido per ${slug}`);
	}
	return data;
}

export function tracciaSlugs(): string[] {
	return listTracce().map((t) => t.slug);
}
```

- [ ] **Step 5: Run tests**

Run: `npm run test:unit -- src/lib/tracce --run`  
Expected: PASS (all tracce tests)

- [ ] **Step 6: Commit**

```bash
git add src/lib/tracce/load.ts src/lib/tracce/load.test.ts static/tracce/*/frasi.yaml
git commit -m "feat(tracce): load YAML and SVG from static/tracce"
```

---

### Task 3: Global styles and back button

**Files:**
- Create: `src/app.css`
- Modify: `src/routes/+layout.svelte`
- Create: `src/lib/components/BackButton.svelte`

- [ ] **Step 1: Add CSS tokens**

```css
/* src/app.css */
:root {
	--color-bg: #0b1530;
	--color-text: #ffffff;
	--color-text-muted: rgba(255, 255, 255, 0.35);
	--color-path-done: #ffffff;
	--color-path-todo: rgba(255, 255, 255, 0.25);
	--font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

html,
body {
	margin: 0;
	min-height: 100%;
	background: var(--color-bg);
	color: var(--color-text);
	font-family: var(--font-sans);
}

a {
	color: inherit;
}
```

- [ ] **Step 2: Import in layout**

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}
```

- [ ] **Step 3: BackButton component**

```svelte
<!-- src/lib/components/BackButton.svelte -->
<script lang="ts">
	let { href = '/tracce' }: { href?: string } = $props();
</script>

<a class="back" {href} aria-label="Torna alle tracce">
	<span aria-hidden="true">←</span>
</a>

<style>
	.back {
		position: fixed;
		top: 1.25rem;
		left: 1.25rem;
		z-index: 20;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.5);
		display: grid;
		place-items: center;
		text-decoration: none;
		font-size: 1.25rem;
		background: transparent;
	}
	.back:hover {
		background: rgba(255, 255, 255, 0.08);
	}
</style>
```

- [ ] **Step 4: Manual check**

Run: `npm run dev` — no errors on startup.

- [ ] **Step 5: Commit**

```bash
git add src/app.css src/routes/+layout.svelte src/lib/components/BackButton.svelte
git commit -m "feat: global track page styles and back button"
```

---

### Task 4: Track list route (`/tracce`)

**Files:**
- Create: `src/routes/tracce/+page.ts`
- Create: `src/routes/tracce/+page.svelte`
- Create: `src/routes/+page.ts`

- [ ] **Step 1: load function**

```ts
// src/routes/tracce/+page.ts
import { listTracce } from '$lib/tracce/load';

export const prerender = true;

export function load() {
	return { tracce: listTracce() };
}
```

- [ ] **Step 2: List page UI**

```svelte
<!-- src/routes/tracce/+page.svelte -->
<script lang="ts">
	let { data } = $props();
</script>

<main class="list">
	<h1>Tracce</h1>
	<ul>
		{#each data.tracce as traccia (traccia.slug)}
			<li>
				<a href="/tracce/{traccia.slug}">{traccia.titolo}</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	.list {
		padding: 4rem 2rem 2rem;
		max-width: 40rem;
		margin: 0 auto;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin: 1rem 0;
	}
	a {
		font-size: 1.25rem;
	}
</style>
```

- [ ] **Step 3: Redirect home → /tracce**

```ts
// src/routes/+page.ts
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	redirect(307, '/tracce');
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `/` and `/tracce` — list shows 3 links.

- [ ] **Step 5: Commit**

```bash
git add src/routes/tracce/+page.ts src/routes/tracce/+page.svelte src/routes/+page.ts
git commit -m "feat: add /tracce list and redirect home"
```

---

### Task 5: PercorsoAnimato — SVG path with anime.js draw

**Files:**
- Create: `src/lib/components/PercorsoAnimato.svelte`

- [ ] **Step 1: Component skeleton**

Parse `percorsoSvg` string: extract inner `<path d="...">` (regex or DOMParser in browser). Render:

- One `<path class="path-todo">` (gray, full length, static)
- One `<path class="path-done">` (white, animated draw via `createDrawable`)
- Two `<rect>` markers: start (fixed) and head (position along path — use `getPointAtLength` on path element when progress updates)

Props:

```ts
let {
	percorsoSvg,
	progress = 0 // 0..1
}: { percorsoSvg: string; progress?: number } = $props();
```

- [ ] **Step 2: Initialize drawable on mount**

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'animejs';
	import { createDrawable } from 'animejs/svg';
	import { pathProgress } from '$lib/tracce/progress'; // only if needed in parent

	let { percorsoSvg, progress = 0 } = $props();
	let pathDoneEl: SVGPathElement;
	let pathTodoEl: SVGPathElement;
	let headMarker: SVGRectElement;
	let drawAnimation: ReturnType<typeof animate> | null = null;

	function applyProgress(p: number) {
		if (!pathDoneEl) return;
		drawAnimation?.pause();
		animate(createDrawable(pathDoneEl), {
			draw: `0 ${p}`,
			duration: 400,
			ease: 'outQuad'
		});
		// update headMarker x/y from pathDoneEl.getPointAtLength(pathDoneEl.getTotalLength() * p)
	}

	$effect(() => {
		applyProgress(progress);
	});

	onMount(() => {
		applyProgress(progress);
	});
</script>
```

Extract `viewBox` from source SVG for `<svg viewBox="...">`. Style:

```css
.path-todo {
	stroke: var(--color-path-todo);
	fill: none;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
}
.path-done {
	stroke: var(--color-path-done);
	fill: none;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
}
.marker {
	fill: var(--color-path-done);
}
```

- [ ] **Step 3: Manual test in isolation**

Temporarily render `<PercorsoAnimato percorsoSvg={...} progress={0.5} />` on a throwaway route or Storybook; confirm half path is white.

- [ ] **Step 4: Run svelte-check**

Run: `npm run check`  
Expected: no errors in `PercorsoAnimato.svelte`

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/PercorsoAnimato.svelte
git commit -m "feat: animated SVG path component with anime.js drawable"
```

---

### Task 6: FrasiScroller — snap scroll + active index + text animation

**Files:**
- Create: `src/lib/components/FrasiScroller.svelte`

- [ ] **Step 1: Build stops array in parent or inside component**

Stops = `[{ type: 'titolo', text: titolo }, ...frasi.map(f => ({ type: 'frase', orario, frase }))]`

- [ ] **Step 2: Markup + scroll-snap CSS**

```svelte
<div class="scroller" bind:this={scrollerEl}>
	{#each stops as stop, i (i)}
		<section class="stop" data-index={i}>
			{#if stop.type === 'titolo'}
				<h2 class="copy titolo">{stop.text}</h2>
			{:else}
				<p class="orario">{stop.orario}</p>
				<p class="copy frase">{stop.frase}</p>
			{/if}
		</section>
	{/each}
</div>
```

```css
.scroller {
	height: 100vh;
	overflow-y: auto;
	scroll-snap-type: y mandatory;
	scrollbar-width: none;
}
.stop {
	min-height: 100vh;
	scroll-snap-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2rem 2rem 2rem 4rem;
	box-sizing: border-box;
}
.copy {
	margin: 0;
	transform-origin: center left;
}
.orario {
	margin: 0 0 0.5rem;
	font-size: 0.875rem;
	opacity: 0.6;
}
.stop:not(.is-active) .copy {
	font-size: clamp(0.9rem, 2vw, 1.1rem);
	opacity: 0.35;
	transform: scale(0.92);
}
.stop.is-active .copy {
	font-size: clamp(1.5rem, 4vw, 2.5rem);
	font-weight: 600;
	opacity: 1;
	transform: scale(1);
}
```

- [ ] **Step 3: IntersectionObserver for active stop**

```ts
let activeIndex = $state(0);
let scrollerEl: HTMLDivElement;

onMount(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					const idx = Number((e.target as HTMLElement).dataset.index);
					if (!Number.isNaN(idx)) activeIndex = idx;
				}
			}
		},
		{ root: scrollerEl, threshold: 0.55 }
	);
	scrollerEl.querySelectorAll('.stop').forEach((el) => observer.observe(el));
	return () => observer.disconnect();
});
```

Export active index to parent:

```ts
let { onActiveIndex }: { onActiveIndex?: (i: number) => void } = $props();
$effect(() => {
	onActiveIndex?.(activeIndex);
});
```

- [ ] **Step 4: anime.js on class change**

When `activeIndex` changes, run:

```ts
import { animate } from 'animejs';

function animateStops() {
	animate('.stop.is-active .copy', {
		opacity: [0.35, 1],
		scale: [0.92, 1],
		duration: 450,
		ease: 'outQuad'
	});
}
```

Toggle `is-active` class in `$effect` on each `.stop` by index.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/FrasiScroller.svelte
git commit -m "feat: snap scroller with active phrase emphasis"
```

---

### Task 7: TracciaView layout + track route

**Files:**
- Create: `src/lib/components/TracciaView.svelte`
- Create: `src/routes/tracce/[slug]/+page.ts`
- Create: `src/routes/tracce/[slug]/+page.svelte`

- [ ] **Step 1: Dynamic route load + prerender entries**

```ts
// src/routes/tracce/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import { loadTraccia, tracciaSlugs } from '$lib/tracce/load';

export const prerender = true;

export function entries() {
	return tracciaSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	try {
		return { traccia: loadTraccia(params.slug) };
	} catch {
		error(404, 'Traccia non trovata');
	}
}
```

- [ ] **Step 2: TracciaView — wire path progress**

```svelte
<!-- src/lib/components/TracciaView.svelte -->
<script lang="ts">
	import type { TracciaContent } from '$lib/tracce/types';
	import { pathProgress } from '$lib/tracce/progress';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';
	import FrasiScroller from './FrasiScroller.svelte';

	let { traccia }: { traccia: TracciaContent } = $props();
	let activeIndex = $state(0);
	const phraseCount = traccia.frasi.length;
	let progress = $derived(pathProgress(activeIndex, phraseCount));
</script>

<BackButton />
<div class="traccia">
	<aside class="path-column" aria-hidden="true">
		<PercorsoAnimato percorsoSvg={traccia.percorsoSvg} {progress} />
	</aside>
	<div class="text-column">
		<FrasiScroller
			titolo={traccia.titolo}
			frasi={traccia.frasi}
			onActiveIndex={(i) => (activeIndex = i)}
		/>
	</div>
</div>

<style>
	.traccia {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
	}
	.path-column {
		position: sticky;
		top: 0;
		height: 100vh;
		display: grid;
		place-items: center;
		padding: 2rem;
	}
	.path-column :global(svg) {
		max-height: 90vh;
		width: auto;
	}
	.text-column {
		position: relative;
		z-index: 2;
	}
	@media (max-width: 767px) {
		.traccia {
			display: block;
		}
		.path-column {
			position: fixed;
			inset: 0;
			height: 100vh;
			opacity: 0.22;
			z-index: 0;
			pointer-events: none;
		}
		.text-column {
			position: relative;
			z-index: 1;
		}
	}
</style>
```

- [ ] **Step 3: Page wrapper**

```svelte
<!-- src/routes/tracce/[slug]/+page.svelte -->
<script lang="ts">
	import TracciaView from '$lib/components/TracciaView.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.traccia.titolo} — Tracce minori</title>
</svelte:head>

<TracciaView traccia={data.traccia} />
```

- [ ] **Step 4: Verify all three slugs**

Run: `npm run dev`  
Visit `/tracce/traccia-01`, `02`, `03` — title stop, phrase snaps, path draws 0 → 1.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/TracciaView.svelte src/routes/tracce/[slug]/
git commit -m "feat: track page route with split layout and mobile background path"
```

---

### Task 8: Build, check, and smoke test

**Files:**
- Optional: `src/routes/tracce/tracce.e2e.ts` (Playwright)

- [ ] **Step 1: Typecheck and lint**

Run: `npm run check`  
Expected: 0 errors

Run: `npm run lint`  
Expected: pass (run `npm run format` if prettier fails)

- [ ] **Step 2: Unit tests**

Run: `npm run test:unit -- --run`  
Expected: all pass

- [ ] **Step 3: Production build**

Run: `npm run build`  
Expected: prerendered pages include `/tracce`, `/tracce/traccia-01`, etc.

- [ ] **Step 4: Playwright smoke (optional but recommended)**

```ts
// src/routes/tracce/tracce.e2e.ts
import { expect, test } from '@playwright/test';

test('lists tracce and opens traccia-01', async ({ page }) => {
	await page.goto('/tracce');
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await page.getByRole('link', { name: /Traccia 01/i }).click();
	await expect(page).toHaveURL(/traccia-01/);
});
```

Run: `npm run test:e2e`  
Expected: pass

- [ ] **Step 5: Commit**

```bash
git add src/routes/tracce/tracce.e2e.ts
git commit -m "test: smoke test for tracce list and track page"
```

---

## Spec coverage checklist

| Requirement | Task |
|-------------|------|
| Elenco tracce | Task 4 |
| Pagina per traccia | Task 7 |
| YAML `titolo` + variabile `frasi` | Task 2 |
| Snap scroll a capitoli | Task 6 |
| Titolo = stop 0, path = 0 | Task 1, 6, 7 |
| Path avanza 1/N per frase | Task 1, 5, 7 |
| Desktop split, path sticky | Task 7 |
| Mobile path background | Task 7 CSS |
| Back → `/tracce` | Task 3, 7 |
| anime.js v4 path + text | Task 5, 6 |
| No aeroplanino | — (omitted) |

---

## Notes for implementer

- Run **svelte-autofixer** MCP on every new `.svelte` file before marking task done.
- If `createDrawable` import path fails, use `import { createDrawable } from 'animejs/svg'` per package exports.
- `PercorsoAnimato` must run only in browser (`onMount` / `$effect` with `browser` check from `$app/environment`) for DOM/SVG APIs.
- Adjust `IntersectionObserver` `threshold` if snap feels sticky on mobile Safari.
- `lang` in `app.html` can be set to `it` in a small follow-up if desired.
