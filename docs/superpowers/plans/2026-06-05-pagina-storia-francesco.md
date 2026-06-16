# Pagina La storia di Francesco — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build prerendered `/storia-di-francesco` with dark-theme mockup layout (orange hero + illustration, four slot caselle), content from `src/lib/content/storia-di-francesco/`, and wire the About CTA to this route.

**Architecture:** Small `src/lib/francesco/` layer reads hero markdown, `manifest.yaml`, and optional casella images at build time (`import.meta.glob` + `js-yaml`, same pattern as `tracce/load.ts`). UI composes shared `SiteHeader`, `FrancescoCasella`, and `FrancescoView`. About keeps its layout; CTA becomes a link. Unit tests on parsing and href resolution; Playwright smoke on `/storia-di-francesco` and updated About CTA.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, TypeScript, adapter-static (prerender), `import.meta.glob`, js-yaml, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-06-04-pagina-storia-francesco-design.md`

**Note on content paths:** The spec lists nested folders (`testo/`, `illustrazione/`). The repo already uses a **flat** layout (`storiadifrancesco.md`, `illustrazione.png` at the content root). This plan follows the **current repo layout**; only `tracce/` and `tracciati/` subfolders are added for optional casella images.

---

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/content/storia-di-francesco/storiadifrancesco.md` | Hero title (`# …`) + body paragraph |
| `src/lib/content/storia-di-francesco/illustrazione.png` | Hero illustration (already present) |
| `src/lib/content/storia-di-francesco/manifest.yaml` | Section titles + four casella slots |
| `src/lib/content/storia-di-francesco/tracce/` | Optional `casella-1.png`, `casella-2.png` |
| `src/lib/content/storia-di-francesco/tracciati/` | Optional `casella-1.png`, `casella-2.png` |
| `src/lib/francesco/types.ts` | `FrancescoContent`, `FrancescoCasella`, `FrancescoManifest` |
| `src/lib/francesco/parse.ts` | `parseHeroMarkdown()` — `# title` or first-line title |
| `src/lib/francesco/parse.test.ts` | Unit tests for parser |
| `src/lib/francesco/href.ts` | `casellaHref(tipo, slug)` → `/tracce/…` or `/tracciati/…` |
| `src/lib/francesco/href.test.ts` | Unit tests for href helper |
| `src/lib/francesco/load.ts` | `loadFrancesco()` — markdown, manifest, image URLs |
| `src/lib/francesco/load.test.ts` | Unit tests for loader |
| `src/lib/components/SiteHeader.svelte` | Shared nav: home, About, Tracciati |
| `src/lib/components/AboutHeader.svelte` | Thin wrapper → `SiteHeader active="about"` |
| `src/lib/components/FrancescoCasella.svelte` | One casella: tracce (blue) / tracciati (border); conditional link |
| `src/lib/components/FrancescoView.svelte` | Full page: hero, sections, caselle grid |
| `src/routes/storia-di-francesco/+page.ts` | `load()` + `prerender = true` |
| `src/routes/storia-di-francesco/+page.svelte` | Thin wrapper around `FrancescoView` |
| `src/routes/storia-di-francesco/storia-di-francesco.e2e.ts` | Playwright smoke tests |
| `src/lib/components/AboutView.svelte` | Modify: CTA `<a>` instead of disabled `<button>` |
| `src/routes/about/about.e2e.ts` | Modify: CTA is link to `/storia-di-francesco` |

---

### Task 1: Content scaffold

**Files:**
- Modify: `src/lib/content/storia-di-francesco/storiadifrancesco.md`
- Create: `src/lib/content/storia-di-francesco/manifest.yaml`
- Create: `src/lib/content/storia-di-francesco/tracce/.gitkeep`
- Create: `src/lib/content/storia-di-francesco/tracciati/.gitkeep`

- [ ] **Step 1: Add hero markdown (definitive copy, not lorem)**

Replace the empty file with:

```markdown
# La storia di Francesco

Francesco attraversa ogni giorno quartieri che molti attraversano senza guardare. I suoi passi disegnano tracce e tracciati nella città: percorsi quotidiani che raccontano un modo diverso di abitare lo spazio urbano, tra vicoli, piazze e margini che restano spesso invisibili.
```

If the approved mockup copy differs, paste that text here instead — the loader reads this file at build time; no code change needed for copy edits.

- [ ] **Step 2: Add manifest with four empty slots**

```yaml
# src/lib/content/storia-di-francesco/manifest.yaml
titolo_sezione_tracce: 'Le sue tracce...'
titolo_sezione_tracciati: 'e i suoi tracciati'
caselle:
  - id: tracce-1
    tipo: traccia
    slug: null
    image: null
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

- [ ] **Step 3: Create empty casella image folders**

```bash
mkdir -p src/lib/content/storia-di-francesco/tracce
mkdir -p src/lib/content/storia-di-francesco/tracciati
touch src/lib/content/storia-di-francesco/tracce/.gitkeep
touch src/lib/content/storia-di-francesco/tracciati/.gitkeep
```

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path src/lib/content/storia-di-francesco/tracce, src/lib/content/storia-di-francesco/tracciati
New-Item -ItemType File -Force -Path src/lib/content/storia-di-francesco/tracce/.gitkeep, src/lib/content/storia-di-francesco/tracciati/.gitkeep
```

Verify `src/lib/content/storia-di-francesco/illustrazione.png` still exists (already in repo).

- [ ] **Step 4: Commit**

```bash
git add src/lib/content/storia-di-francesco/
git commit -m "content(francesco): add hero text, manifest and casella folders"
```

---

### Task 2: Hero markdown parser

**Files:**
- Create: `src/lib/francesco/types.ts`
- Create: `src/lib/francesco/parse.ts`
- Create: `src/lib/francesco/parse.test.ts`
- Test: `src/lib/francesco/parse.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/francesco/parse.test.ts
import { describe, it, expect } from 'vitest';
import { parseHeroMarkdown } from './parse';

describe('parseHeroMarkdown', () => {
	it('parses # heading as title and rest as body', () => {
		const raw = '# La storia di Francesco\n\nPrimo paragrafo.\nSeconda riga.';
		expect(parseHeroMarkdown(raw)).toEqual({
			titolo: 'La storia di Francesco',
			corpo: 'Primo paragrafo.\nSeconda riga.'
		});
	});

	it('falls back to first-line title without hash', () => {
		const raw = 'Titolo semplice\nCorpo breve.';
		expect(parseHeroMarkdown(raw)).toEqual({
			titolo: 'Titolo semplice',
			corpo: 'Corpo breve.'
		});
	});

	it('returns empty corpo for title-only input', () => {
		expect(parseHeroMarkdown('# Solo titolo')).toEqual({
			titolo: 'Solo titolo',
			corpo: ''
		});
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/francesco/parse.test.ts --run`  
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/francesco/types.ts
export type FrancescoCasellaTipo = 'traccia' | 'tracciato';

export type FrancescoCasella = {
	id: string;
	tipo: FrancescoCasellaTipo;
	slug: string | null;
	imageUrl: string | null;
	href: string | null;
};

export type FrancescoContent = {
	titolo: string;
	corpo: string;
	illustrazioneUrl: string;
	titoloSezioneTracce: string;
	titoloSezioneTracciati: string;
	caselleTracce: FrancescoCasella[];
	caselleTracciati: FrancescoCasella[];
};
```

```ts
// src/lib/francesco/parse.ts
export function parseHeroMarkdown(raw: string): { titolo: string; corpo: string } {
	const trimmed = raw.trim();
	if (!trimmed) {
		return { titolo: '', corpo: '' };
	}

	if (trimmed.startsWith('#')) {
		const nl = trimmed.indexOf('\n');
		const titolo = (nl === -1 ? trimmed.slice(1) : trimmed.slice(1, nl)).trim();
		const rest = nl === -1 ? '' : trimmed.slice(nl + 1).trim();
		return { titolo, corpo: rest };
	}

	const nl = trimmed.indexOf('\n');
	if (nl === -1) {
		return { titolo: trimmed, corpo: '' };
	}
	return {
		titolo: trimmed.slice(0, nl).trim(),
		corpo: trimmed.slice(nl + 1).trim()
	};
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/francesco/parse.test.ts --run`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/francesco/types.ts src/lib/francesco/parse.ts src/lib/francesco/parse.test.ts
git commit -m "feat(francesco): add hero markdown parser"
```

---

### Task 3: Casella href helper

**Files:**
- Create: `src/lib/francesco/href.ts`
- Create: `src/lib/francesco/href.test.ts`
- Test: `src/lib/francesco/href.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/francesco/href.test.ts
import { describe, it, expect } from 'vitest';
import { casellaHref } from './href';

describe('casellaHref', () => {
	it('returns null when slug is null', () => {
		expect(casellaHref('traccia', null)).toBeNull();
		expect(casellaHref('tracciato', null)).toBeNull();
	});

	it('builds traccia URL', () => {
		expect(casellaHref('traccia', 'traccia-01')).toBe('/tracce/traccia-01');
	});

	it('builds tracciato URL', () => {
		expect(casellaHref('tracciato', 'tracciati-01')).toBe('/tracciati/tracciati-01');
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/francesco/href.test.ts --run`  
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/francesco/href.ts
import type { FrancescoCasellaTipo } from './types';

export function casellaHref(tipo: FrancescoCasellaTipo, slug: string | null): string | null {
	if (!slug) return null;
	return tipo === 'traccia' ? `/tracce/${slug}` : `/tracciati/${slug}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/francesco/href.test.ts --run`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/francesco/href.ts src/lib/francesco/href.test.ts
git commit -m "feat(francesco): add casella href resolver"
```

---

### Task 4: Content loader

**Files:**
- Create: `src/lib/francesco/load.ts`
- Create: `src/lib/francesco/load.test.ts`
- Test: `src/lib/francesco/load.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/francesco/load.test.ts
import { describe, it, expect } from 'vitest';
import { loadFrancesco } from './load';

describe('loadFrancesco', () => {
	it('loads hero, illustration, section titles and four caselle', () => {
		const content = loadFrancesco();
		expect(content.titolo).toBe('La storia di Francesco');
		expect(content.corpo.length).toBeGreaterThan(40);
		expect(content.illustrazioneUrl).toMatch(/\.png$/);
		expect(content.titoloSezioneTracce).toBe('Le sue tracce...');
		expect(content.titoloSezioneTracciati).toBe('e i suoi tracciati');
		expect(content.caselleTracce).toHaveLength(2);
		expect(content.caselleTracciati).toHaveLength(2);
		expect(content.caselleTracce.every((c) => c.tipo === 'traccia')).toBe(true);
		expect(content.caselleTracciati.every((c) => c.tipo === 'tracciato')).toBe(true);
		expect(content.caselleTracce.every((c) => c.href === null)).toBe(true);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- src/lib/francesco/load.test.ts --run`  
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/francesco/load.ts
import yaml from 'js-yaml';
import type { FrancescoCasella, FrancescoCasellaTipo, FrancescoContent } from './types';
import { parseHeroMarkdown } from './parse';
import { casellaHref } from './href';

import heroRaw from '$lib/content/storia-di-francesco/storiadifrancesco.md?raw';
import illustrazioneUrl from '$lib/content/storia-di-francesco/illustrazione.png?url';
import manifestRaw from '$lib/content/storia-di-francesco/manifest.yaml?raw';

const imageModules = import.meta.glob('/src/lib/content/storia-di-francesco/**/*.{png,svg,jpg,jpeg,webp}', {
	query: '?url',
	eager: true,
	import: 'default'
}) as Record<string, string>;

type ManifestCasella = {
	id: string;
	tipo: FrancescoCasellaTipo;
	slug: string | null;
	image: string | null;
};

type ManifestRoot = {
	titolo_sezione_tracce: string;
	titolo_sezione_tracciati: string;
	caselle: ManifestCasella[];
};

const CONTENT_PREFIX = '/src/lib/content/storia-di-francesco/';

function resolveImageUrl(relativePath: string | null): string | null {
	if (!relativePath) return null;
	const key = `${CONTENT_PREFIX}${relativePath.replace(/^\.\//, '')}`;
	return imageModules[key] ?? null;
}

function toCasella(raw: ManifestCasella): FrancescoCasella {
	return {
		id: raw.id,
		tipo: raw.tipo,
		slug: raw.slug,
		imageUrl: resolveImageUrl(raw.image),
		href: casellaHref(raw.tipo, raw.slug)
	};
}

export function loadFrancesco(): FrancescoContent {
	const manifest = yaml.load(manifestRaw) as ManifestRoot;
	if (!manifest?.caselle || manifest.caselle.length !== 4) {
		throw new Error('manifest.yaml invalido: servono esattamente 4 caselle');
	}

	const { titolo, corpo } = parseHeroMarkdown(heroRaw);
	const caselle = manifest.caselle.map(toCasella);

	return {
		titolo,
		corpo,
		illustrazioneUrl,
		titoloSezioneTracce: manifest.titolo_sezione_tracce,
		titoloSezioneTracciati: manifest.titolo_sezione_tracciati,
		caselleTracce: caselle.filter((c) => c.tipo === 'traccia'),
		caselleTracciati: caselle.filter((c) => c.tipo === 'tracciato')
	};
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- src/lib/francesco/load.test.ts --run`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/francesco/load.ts src/lib/francesco/load.test.ts
git commit -m "feat(francesco): load hero, manifest and casella slots"
```

---

### Task 5: Shared SiteHeader

**Files:**
- Create: `src/lib/components/SiteHeader.svelte`
- Modify: `src/lib/components/AboutHeader.svelte`

- [ ] **Step 1: Create SiteHeader**

```svelte
<!-- src/lib/components/SiteHeader.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';

	let { active = 'none' }: { active?: 'about' | 'none' } = $props();
</script>

<header class="nav">
	<a class="home" href={resolve('/')} aria-label="Home">
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
			<path fill="currentColor" d="M12 3l9 8h-3v10h-5V14H11v7H6V11H3l9-8z" />
		</svg>
	</a>
	<nav class="links" aria-label="Principale">
		{#if active === 'about'}
			<span class="current" aria-current="page">About</span>
		{:else}
			<a href={resolve('/about')}>About</a>
		{/if}
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

- [ ] **Step 2: Refactor AboutHeader to use SiteHeader**

Replace entire `AboutHeader.svelte` with:

```svelte
<script lang="ts">
	import SiteHeader from './SiteHeader.svelte';
</script>

<SiteHeader active="about" />
```

- [ ] **Step 3: Run check**

Run: `npm run check`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/SiteHeader.svelte src/lib/components/AboutHeader.svelte
git commit -m "refactor: extract shared SiteHeader for nav"
```

---

### Task 6: FrancescoCasella component

**Files:**
- Create: `src/lib/components/FrancescoCasella.svelte`

- [ ] **Step 1: Create component**

```svelte
<!-- src/lib/components/FrancescoCasella.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';

	type Variant = 'tracce' | 'tracciati';

	let {
		variant,
		imageUrl = null,
		href = null,
		alt = ''
	}: {
		variant: Variant;
		imageUrl?: string | null;
		href?: string | null;
		alt?: string;
	} = $props();

	const className = $derived(`casella casella--${variant}`);
</script>

{#if href}
	<a class={className} href={resolve(href)} aria-label={alt || undefined}>
		{#if imageUrl}
			<img src={imageUrl} alt={alt} />
		{/if}
	</a>
{:else}
	<div class={className} aria-hidden={!imageUrl}>
		{#if imageUrl}
			<img src={imageUrl} alt={alt} />
		{/if}
	</div>
{/if}

<style>
	.casella {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 10rem;
		border-radius: 1rem;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
	}

	.casella--tracce {
		background: #2e3192;
	}

	.casella--tracciati {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.4);
	}

	.casella img {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
	}

	a.casella:focus-visible {
		outline: 2px solid #f26522;
		outline-offset: 3px;
	}

	@media (max-width: 767px) {
		.casella {
			min-height: 11rem;
		}
	}
</style>
```

Note: `resolve(href)` works when `href` is a static path like `/tracce/traccia-01`. If TypeScript complains, cast: `href={href as '/'}` or use plain `href={href}` without resolve for fully static paths.

If `resolve()` rejects dynamic strings, use:

```svelte
<a class={className} href={href}>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/FrancescoCasella.svelte
git commit -m "feat(francesco): add casella component with tracce/tracciati variants"
```

---

### Task 7: FrancescoView layout

**Files:**
- Create: `src/lib/components/FrancescoView.svelte`

- [ ] **Step 1: Create page shell**

```svelte
<!-- src/lib/components/FrancescoView.svelte -->
<script lang="ts">
	import type { FrancescoContent } from '$lib/francesco/types';
	import SiteHeader from './SiteHeader.svelte';
	import FrancescoCasella from './FrancescoCasella.svelte';

	let { francesco }: { francesco: FrancescoContent } = $props();
</script>

<div class="francesco-page">
	<SiteHeader />

	<section class="hero" aria-label="La storia di Francesco">
		<div class="hero-text">
			<h1>{francesco.titolo}</h1>
			<p>{francesco.corpo}</p>
		</div>
		<div class="hero-art">
			<img src={francesco.illustrazioneUrl} alt="" />
		</div>
	</section>

	<section class="sezione sezione--tracce" aria-label={francesco.titoloSezioneTracce}>
		<h2 class="titolo titolo--left">{francesco.titoloSezioneTracce}</h2>
		<div class="caselle">
			{#each francesco.caselleTracce as casella (casella.id)}
				<FrancescoCasella
					variant="tracce"
					imageUrl={casella.imageUrl}
					href={casella.href}
					alt={casella.slug ? `Apri ${casella.slug}` : ''}
				/>
			{/each}
		</div>
	</section>

	<section class="sezione sezione--tracciati" aria-label={francesco.titoloSezioneTracciati}>
		<h2 class="titolo titolo--right">{francesco.titoloSezioneTracciati}</h2>
		<div class="caselle">
			{#each francesco.caselleTracciati as casella (casella.id)}
				<FrancescoCasella
					variant="tracciati"
					imageUrl={casella.imageUrl}
					href={casella.href}
					alt={casella.slug ? `Apri ${casella.slug}` : ''}
				/>
			{/each}
		</div>
	</section>
</div>

<style>
	.francesco-page {
		min-height: 100vh;
		background: var(--color-bg, #0b1530);
		color: #ffffff;
	}

	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(1rem, 3vw, 2rem);
		padding: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
	}

	.hero-text {
		background: #f26522;
		color: #ffffff;
		padding: clamp(1.5rem, 4vw, 2.5rem);
		border-radius: 0.25rem;
	}

	.hero-text h1 {
		margin: 0 0 1rem;
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
		font-weight: 600;
		line-height: 1.15;
	}

	.hero-text p {
		margin: 0;
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.55;
		white-space: pre-wrap;
	}

	.hero-art {
		display: grid;
		place-items: center;
		margin-top: 1.5rem;
	}

	.hero-art img {
		width: 100%;
		max-width: 28rem;
		height: auto;
		object-fit: contain;
	}

	.sezione {
		padding: clamp(1.5rem, 4vw, 3rem);
	}

	.titolo {
		margin: 0 0 1.25rem;
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 600;
		color: #2e3192;
	}

	.titolo--left {
		text-align: left;
	}

	.titolo--right {
		text-align: right;
	}

	.caselle {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(1rem, 3vw, 1.5rem);
	}

	@media (max-width: 767px) {
		.hero {
			grid-template-columns: 1fr;
		}

		.hero-art {
			margin-top: 0;
		}

		.titolo--right {
			text-align: left;
		}

		.caselle {
			grid-template-columns: 1fr;
		}
	}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/FrancescoView.svelte
git commit -m "feat(francesco): add dark-theme page layout shell"
```

---

### Task 8: Route and build verification

**Files:**
- Create: `src/routes/storia-di-francesco/+page.ts`
- Create: `src/routes/storia-di-francesco/+page.svelte`

- [ ] **Step 1: Add route loader**

```ts
// src/routes/storia-di-francesco/+page.ts
import { loadFrancesco } from '$lib/francesco/load';

export const prerender = true;

export function load() {
	return { francesco: loadFrancesco() };
}
```

```svelte
<!-- src/routes/storia-di-francesco/+page.svelte -->
<script lang="ts">
	import FrancescoView from '$lib/components/FrancescoView.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>La storia di Francesco — Tracce minori</title>
</svelte:head>

<FrancescoView francesco={data.francesco} />
```

- [ ] **Step 2: Run check and build**

Run: `npm run check`  
Expected: PASS

Run: `npm run build`  
Expected: PASS; output includes `/storia-di-francesco`

Run: `npm run dev` and open `http://localhost:5173/storia-di-francesco`  
Verify: dark background, orange hero with title + paragraph, illustration visible, two blue caselle + two bordered caselle, header matches About.

- [ ] **Step 3: Commit**

```bash
git add src/routes/storia-di-francesco/
git commit -m "feat(francesco): add prerendered /storia-di-francesco route"
```

---

### Task 9: Wire About CTA

**Files:**
- Modify: `src/lib/components/AboutView.svelte`
- Modify: `src/routes/about/about.e2e.ts`

- [ ] **Step 1: Replace disabled button with link**

In `AboutView.svelte`, add import and replace CTA block:

```svelte
<script lang="ts">
	import { resolve } from '$app/paths';
	// ... existing imports
</script>
```

Replace:

```svelte
	<div class="cta-wrap">
		<button type="button" class="cta" disabled aria-disabled="true">
			Scopri la storia di Francesco
		</button>
	</div>
```

With:

```svelte
	<div class="cta-wrap">
		<a class="cta" href={resolve('/storia-di-francesco')}>
			Scopri la storia di Francesco
		</a>
	</div>
```

Update `.cta` styles — replace `cursor: not-allowed` with:

```css
	.cta {
		display: inline-block;
		text-decoration: none;
		cursor: pointer;
	}
```

Remove `aria-disabled` / `disabled` rules.

- [ ] **Step 2: Update About e2e**

Replace the CTA assertions in `src/routes/about/about.e2e.ts`:

```ts
test('about page shows intro, sections and Francesco CTA link', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracciati' })).toBeVisible();
	await expect(page.getByText(/Molti percorsi urbani/i)).toBeVisible();
	const cta = page.getByRole('link', { name: /Francesco/i });
	await expect(cta).toBeVisible();
	await expect(cta).toHaveAttribute('href', /storia-di-francesco/);
	await page.locator('.overlay img').first().waitFor();
	await expect(page.locator('.overlay img')).toHaveCount(2);
	await expect(page.locator('.percorso-statico')).toHaveCount(2);
});
```

- [ ] **Step 3: Run About e2e**

Run: `npm run test:e2e -- src/routes/about/about.e2e.ts`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/AboutView.svelte src/routes/about/about.e2e.ts
git commit -m "feat(about): link CTA to storia-di-francesco page"
```

---

### Task 10: Francesco e2e smoke tests

**Files:**
- Create: `src/routes/storia-di-francesco/storia-di-francesco.e2e.ts`
- Test: `src/routes/storia-di-francesco/storia-di-francesco.e2e.ts`

- [ ] **Step 1: Write Playwright tests**

```ts
// src/routes/storia-di-francesco/storia-di-francesco.e2e.ts
import { expect, test } from '@playwright/test';

test('francesco page shows hero, sections and four caselle', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
	await expect(page.getByText(/Francesco attraversa ogni giorno/i)).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Le sue tracce...' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'e i suoi tracciati' })).toBeVisible();
	await expect(page.locator('.casella')).toHaveCount(4);
	await expect(page.locator('.hero-art img')).toBeVisible();
});

test('francesco header links home and about', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await page.getByRole('link', { name: 'Home' }).click();
	await expect(page).toHaveURL(/\/$/);
});

test('about CTA navigates to francesco page', async ({ page }) => {
	await page.goto('/about');
	await page.getByRole('link', { name: /Francesco/i }).click();
	await expect(page).toHaveURL(/storia-di-francesco/);
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
});
```

- [ ] **Step 2: Run e2e**

Run: `npm run test:e2e -- src/routes/storia-di-francesco/storia-di-francesco.e2e.ts`  
Expected: PASS

- [ ] **Step 3: Run full test suite**

Run: `npm run test`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/routes/storia-di-francesco/storia-di-francesco.e2e.ts
git commit -m "test(francesco): add Playwright smoke tests"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Route `/storia-di-francesco` prerendered | Task 8 |
| Hero title + paragraph from markdown | Task 1, 2, 4, 7 |
| Illustration area with image when present | Task 4, 7 |
| Two tracce + two tracciati caselle, distinct styles | Task 6, 7 |
| Empty caselle sized like mockup | Task 6, 7 |
| Caselle with slug → working links | Task 3, 4, 6 (href wired; slugs stay `null` until content decision) |
| Header identical to About pattern | Task 5, 7 |
| Mobile column layout + touch-friendly caselle | Task 6, 7 |
| About CTA → this page | Task 9 |
| No changes to traccia/tracciato immersive pages | — (out of scope) |
| Content via manifest slots (opzione 2) | Task 1, 4 |

**Placeholder scan:** No TBD steps. All code blocks are complete. Hero copy is real Italian text (replaceable via markdown only).

**Type consistency:** `FrancescoCasella`, `casellaHref`, `FrancescoView`, and `loadFrancesco` use matching field names (`href`, `imageUrl`, `tipo`, `slug`) throughout.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-05-pagina-storia-francesco.md`.

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
