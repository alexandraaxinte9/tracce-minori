<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { animate } from 'animejs';
	import { createDrawable } from 'animejs/svg';
	import type { DrawableSVGGeometry } from 'animejs';

	const MARKER_SIZE = 8;

	let {
		percorsoSvg,
		progress = 0
	}: {
		percorsoSvg: string;
		progress?: number;
	} = $props();

	function parsePercorsoSvg(svg: string) {
		const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i);
		const pathMatch = svg.match(/<path[^>]*\sd=["']([^"']+)["']/i);

		return {
			viewBox: viewBoxMatch?.[1] ?? '0 0 100 100',
			pathD: pathMatch?.[1] ?? ''
		};
	}

	const parsed = $derived(parsePercorsoSvg(percorsoSvg));

	let pathDoneEl: SVGPathElement | undefined;
	let headMarker: SVGRectElement | undefined;
	let startMarker: SVGRectElement | undefined;
	let drawable: DrawableSVGGeometry | undefined;
	let drawAnimation: ReturnType<typeof animate> | null = null;
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

		drawAnimation?.pause();
		drawAnimation = animate(drawable, {
			draw: `0 ${clamped}`,
			duration: 400,
			ease: 'outQuad'
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

<svg viewBox={parsed.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
</style>
