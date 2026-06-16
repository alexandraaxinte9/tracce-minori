<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { TracciatoContent } from '$lib/tracciati/types';
	import SiteHeader from './SiteHeader.svelte';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';

	let { tracciato }: { tracciato: TracciatoContent } = $props();

	let scrollProgress = $state(0);
	let activeDisegnoUrl = $state<string | null>(null);

	function handleScroll() {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
	}

	onMount(() => {
		if (!browser) return;

		const visibleRatios = new Map<string, number>();

		function syncActiveDisegno() {
			let bestId: string | null = null;
			let bestRatio = 0;
			for (const [id, ratio] of visibleRatios) {
				if (ratio > bestRatio) {
					bestRatio = ratio;
					bestId = id;
				}
			}
			activeDisegnoUrl =
				bestId && tracciato.disegni[bestId] ? tracciato.disegni[bestId] : null;
		}

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const id = (entry.target as HTMLElement).dataset.fotoId;
					if (!id) continue;
					if (entry.isIntersecting) {
						visibleRatios.set(id, entry.intersectionRatio);
					} else {
						visibleRatios.delete(id);
					}
				}
				syncActiveDisegno();
			},
			{
				root: null,
				threshold: [0, 0.25, 0.5, 0.75, 1],
				rootMargin: '-30% 0px -30% 0px'
			}
		);

		for (const el of document.querySelectorAll<HTMLElement>('[data-foto-id]')) {
			observer.observe(el);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<div class="tracciato-page">
	<div class="top-bar">
		<SiteHeader />
	</div>

	<BackButton
		label="Torna a Tracce minori"
		align="right"
		belowHeader
		theme="on-light"
	/>

	<div class="tracciato">
		<aside class="path-layer" aria-hidden="true">
			<PercorsoAnimato
				variant="tracciato"
				percorsoSvg={tracciato.percorsoSvg}
				progress={scrollProgress}
			/>
		</aside>

		{#if activeDisegnoUrl}
			<div class="illustration-layer" aria-hidden="true">
				<img class="illustration" src={activeDisegnoUrl} alt="" />
			</div>
		{/if}

		<div class="photos">
			{#if tracciato.fotos.length === 0}
				<p class="empty">Foto in arrivo</p>
			{:else}
				{#each tracciato.fotos as foto (foto.id)}
					<figure class="foto" data-foto-id={foto.id}>
						<img src={foto.url} alt="" loading="lazy" decoding="async" />
					</figure>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.top-bar {
		position: sticky;
		top: 0;
		z-index: 20;
	}

	.tracciato {
		background: #ffffff;
		color: #0b1530;
		min-height: 100vh;
	}

	.path-layer {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 1rem;
		pointer-events: none;
	}

	.illustration-layer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		width: min(48%, 28rem);
		display: grid;
		place-items: center;
		padding: 2rem 1.5rem 2rem 1rem;
		pointer-events: none;
		animation: fade-in 0.45s ease;
	}

	.illustration {
		max-width: 100%;
		max-height: min(70vh, 36rem);
		width: auto;
		height: auto;
		object-fit: contain;
		filter: brightness(0) invert(1);
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.photos {
		position: relative;
		z-index: 0;
	}

	.foto {
		margin: 0;
		padding: 0.5rem 0.75rem;
	}

	.foto img {
		display: block;
		width: 100%;
		max-width: 42rem;
		margin: 0 auto;
		height: auto;
	}

	.empty {
		min-height: 200vh;
		display: grid;
		place-items: center;
		margin: 0;
		padding: 4rem 2rem;
		font-size: 1.125rem;
		color: rgba(11, 21, 48, 0.45);
		text-align: center;
	}

	@media (max-width: 767px) {
		.path-layer {
			padding: 0.5rem;
		}

		.illustration-layer {
			width: min(52%, 16rem);
			padding-right: 0.75rem;
		}

		.illustration {
			max-height: 50vh;
		}

		.foto {
			padding: 0.375rem 0.5rem;
		}
	}
</style>
