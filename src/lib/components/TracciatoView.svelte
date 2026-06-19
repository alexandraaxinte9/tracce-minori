<script lang="ts">
	import { browser } from '$app/environment';
	import type { TracciatoContent } from '$lib/tracciati/types';
	import { lockPageScroll } from '$lib/scroll/lock-page-scroll';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';

	let { tracciato }: { tracciato: TracciatoContent } = $props();

	let scrollProgress = $state(0);
	let activeDisegnoUrl = $state<string | null>(null);
	let tracciatiContainer = $state<HTMLDivElement | undefined>();

	lockPageScroll();

	function handleScroll() {
		const root = tracciatiContainer;
		if (!root) return;
		const max = root.scrollHeight - root.clientHeight;
		scrollProgress = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0;
	}

	$effect(() => {
		if (!browser || !tracciatiContainer) return;

		const root = tracciatiContainer;
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
		root.addEventListener('scroll', handleScroll, { passive: true });

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
				root,
				threshold: [0, 0.25, 0.5, 0.75, 1],
				rootMargin: '-30% 0px -30% 0px'
			}
		);

		for (const el of root.querySelectorAll<HTMLElement>('[data-foto-id]')) {
			observer.observe(el);
		}

		return () => {
			root.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<div class="tracciato-page">
	<BackButton href="/tracce" label="Torna a Tracce minori" theme="on-light" />

	<div class="tracciato">
		<aside class="path-layer" aria-hidden="true">
			<PercorsoAnimato
				fit="contain"
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

		<div class="tracciati-container" bind:this={tracciatiContainer}>
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
	.tracciato-page {
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		color: #0b1530;
	}

	.tracciato {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		background: #ffffff;
		color: #0b1530;
	}

	.path-layer {
		position: absolute;
		inset: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 1.5rem clamp(2rem, 12vw, 8rem) 1.5rem clamp(1rem, 6vw, 4rem);
		pointer-events: none;
	}

	.illustration-layer {
		position: absolute;
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

	.tracciati-container {
		position: relative;
		z-index: 0;
		height: 100%;
		overflow-y: scroll;
		overscroll-behavior: contain;
		scrollbar-width: none;
	}

	.tracciati-container::-webkit-scrollbar {
		display: none;
	}

	.foto {
		margin: 0;
		padding: 0.5rem 0.75rem;
		display: flex;
		justify-content: center;
	}

	.foto img {
		display: block;
		width: 100%;
		max-width: 36rem;
		margin: 0 auto;
		height: auto;
	}

	.empty {
		min-height: 100%;
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
