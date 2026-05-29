<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { animate } from 'animejs';
	import type { Frase } from '$lib/tracce/types';

	type Stop = { type: 'titolo'; text: string } | { type: 'frase'; orario: string; frase: string };

	let {
		titolo,
		frasi,
		onActiveIndex
	}: {
		titolo: string;
		frasi: Frase[];
		onActiveIndex?: (i: number) => void;
	} = $props();

	let activeIndex = $state(0);
	let scrollerEl: HTMLDivElement | undefined;

	const stops = $derived<Stop[]>([
		{ type: 'titolo', text: titolo },
		...frasi.map((f) => ({ type: 'frase' as const, orario: f.orario, frase: f.frase }))
	]);

	onMount(() => {
		if (!scrollerEl) return;

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

	$effect(() => {
		onActiveIndex?.(activeIndex);
	});

	$effect(() => {
		if (!browser || !scrollerEl) return;

		void activeIndex;

		const copies = scrollerEl.querySelectorAll('.stop.is-active .copy');
		if (copies.length === 0) return;

		animate(copies, {
			opacity: [0.35, 1],
			scale: [0.92, 1],
			duration: 450,
			ease: 'outQuad'
		});
	});
</script>

<div class="scroller" bind:this={scrollerEl}>
	{#each stops as stop, i (i)}
		<section class="stop" class:is-active={activeIndex === i} data-index={i}>
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
		scroll-snap-type: y mandatory;
		scrollbar-width: none;
	}

	.scroller::-webkit-scrollbar {
		display: none;
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
</style>
