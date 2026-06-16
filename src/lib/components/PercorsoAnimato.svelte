<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { animate } from 'animejs';
	import { createDrawable } from 'animejs/svg';
	import type { DrawableSVGGeometry } from 'animejs';
	import { parsePercorsoSvg } from '$lib/percorso/parse';

	const MARKER_SIZE = 8;

	let {
		percorsoSvg,
		progress = 0,
		variant = 'traccia',
		fit = 'viewport'
	}: {
		percorsoSvg: string;
		progress?: number;
		variant?: 'traccia' | 'tracciato';
		fit?: 'viewport' | 'contain';
	} = $props();

	const parsed = $derived(parsePercorsoSvg(percorsoSvg));

	let pathDoneEl: SVGPathElement | undefined;
	let headMarker: SVGRectElement | undefined;
	let startMarker: SVGRectElement | undefined;
	let drawable: DrawableSVGGeometry | undefined;
	let ready = false;

	function updateMarkers(p: number) {
		if (!pathDoneEl || !headMarker || !startMarker) return;

		const length = pathDoneEl.getTotalLength();
		const clamped = Math.max(0, Math.min(1, p));
		const half = MARKER_SIZE / 2;

		const startPoint = pathDoneEl.getPointAtLength(0);
		startMarker.setAttribute('x', String(startPoint.x - half));
		startMarker.setAttribute('y', String(startPoint.y - half));

		const headPoint = pathDoneEl.getPointAtLength(length * clamped);
		headMarker.setAttribute('x', String(headPoint.x - half));
		headMarker.setAttribute('y', String(headPoint.y - half));
	}

	function applyProgress(p: number) {
		if (!browser || !ready || !drawable || !pathDoneEl) return;

		const clamped = Math.max(0, Math.min(1, p));

		animate(drawable, {
			draw: `0 ${clamped}`,
			duration: 0
		});
		updateMarkers(clamped);
	}

	onMount(() => {
		if (!pathDoneEl) return;

		[drawable] = createDrawable(pathDoneEl, 0, 0);
		ready = true;
		applyProgress(progress);
	});

	$effect(() => {
		if (browser && ready) {
			applyProgress(progress);
		}
	});
</script>

<svg
	class={variant}
	class:fit-contain={fit === 'contain'}
	viewBox={parsed.viewBox}
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<path class="path-todo" d={parsed.pathD} />
	<path class="path-done" bind:this={pathDoneEl} d={parsed.pathD} />
	<rect class="marker" bind:this={startMarker} width={MARKER_SIZE} height={MARKER_SIZE} />
	<rect class="marker" bind:this={headMarker} width={MARKER_SIZE} height={MARKER_SIZE} />
</svg>

<style>
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

	svg {
		display: block;
		height: min(90vh, 52rem);
		width: auto;
		max-width: 100%;
		overflow: visible;
	}

	svg.fit-contain {
		height: auto;
		width: auto;
		max-height: min(100%, 40rem);
		max-width: min(72%, 15rem);
		margin: 0 auto;
	}

	svg.tracciato.fit-contain {
		max-width: min(68%, 14rem);
		max-height: min(100%, 36rem);
	}

	svg.tracciato {
		--color-path-done: #e85d04;
		--color-path-todo: rgba(232, 93, 4, 0.35);
	}

	svg.tracciato .path-todo,
	svg.tracciato .path-done {
		stroke-width: 3;
	}

	svg.tracciato .marker {
		fill: #e85d04;
	}
</style>
