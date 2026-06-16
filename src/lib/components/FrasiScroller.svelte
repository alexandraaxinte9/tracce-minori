<script lang="ts">
	import { scrollPathProgress, smoothstep } from '$lib/tracce/progress';
	import type { Frase } from '$lib/tracce/types';

	type Stop = { type: 'titolo'; text: string } | { type: 'frase'; orario: string; frase: string };

	let {
		titolo,
		frasi,
		scrollRoot = undefined,
		onActiveIndex,
		onPathProgress
	}: {
		titolo: string;
		frasi: Frase[];
		scrollRoot?: HTMLElement | undefined;
		onActiveIndex?: (i: number) => void;
		onPathProgress?: (p: number) => void;
	} = $props();

	let activeIndex = $state(0);
	let contentEl: HTMLDivElement | undefined;

	const stops = $derived<Stop[]>([
		{ type: 'titolo', text: titolo },
		...frasi.map((f) => ({ type: 'frase' as const, orario: f.orario, frase: f.frase }))
	]);

	const usesExternalScroll = $derived(scrollRoot !== undefined);

	$effect(() => {
		const root = scrollRoot ?? contentEl;
		if (!root) return;

		let ticking = false;

		const update = () => {
			const centerY = root.scrollTop + root.clientHeight / 2;
			const falloff = root.clientHeight * 0.62;
			const stopEls = root.querySelectorAll<HTMLElement>('.stop');

			let closestIdx = 0;
			let closestDist = Infinity;

			stopEls.forEach((el) => {
				const idx = Number(el.dataset.index);
				const elCenter = el.offsetTop + el.offsetHeight / 2;
				const dist = Math.abs(centerY - elCenter);
				const proximity = smoothstep(1 - dist / falloff);

				el.style.setProperty('--proximity', proximity.toFixed(3));

				if (dist < closestDist) {
					closestDist = dist;
					closestIdx = idx;
				}
			});

			activeIndex = closestIdx;
			const centers = [...stopEls].map((el) => el.offsetTop + el.offsetHeight / 2);
			onPathProgress?.(scrollPathProgress(centerY, centers, frasi.length));
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				update();
				ticking = false;
			});
		};

		root.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		update();

		return () => {
			root.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	$effect(() => {
		onActiveIndex?.(activeIndex);
	});
</script>

<div class="scroller" class:in-container={usesExternalScroll} bind:this={contentEl}>
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

<style>
	.scroller {
		height: 100vh;
		overflow-y: auto;
		scroll-snap-type: y proximity;
		overscroll-behavior-y: contain;
		scrollbar-width: none;
	}

	.scroller.in-container {
		height: auto;
		overflow: visible;
		scroll-snap-type: none;
	}

	.scroller::-webkit-scrollbar {
		display: none;
	}

	.stop {
		--proximity: 0;
		min-height: 100vh;
		scroll-snap-align: center;
		scroll-snap-stop: normal;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem 2rem 2rem 4rem;
		box-sizing: border-box;
	}

	.in-container .stop {
		min-height: 100cqh;
		scroll-snap-align: center;
	}

	.copy {
		margin: 0;
		transform-origin: center left;
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 600;
		opacity: calc(0.35 + 0.65 * var(--proximity));
		transform: scale(calc(0.72 + 0.28 * var(--proximity)));
	}

	.orario {
		margin: 0 0 0.5rem;
		font-size: 0.875rem;
		opacity: calc(0.25 + 0.75 * var(--proximity));
		transform: translateY(calc(8px * (1 - var(--proximity))));
	}
</style>
