<script lang="ts">
	import type { TracciatoContent } from '$lib/tracciati/types';
	import SiteHeader from './SiteHeader.svelte';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';

	let { tracciato }: { tracciato: TracciatoContent } = $props();

	const firstFoto = $derived(tracciato.fotos[0] ?? null);
	const firstDisegnoUrl = $derived(
		Object.values(tracciato.disegni)[0] ?? null
	);
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
				progress={0}
			/>
		</aside>

		{#if firstDisegnoUrl}
			<div class="illustration-layer" aria-hidden="true">
				<img class="illustration" src={firstDisegnoUrl} alt="" />
			</div>
		{/if}

		<div class="content">
			{#if firstFoto}
				<figure class="foto">
					<img src={firstFoto.url} alt="" />
				</figure>
			{:else}
				<p class="empty">Foto in arrivo</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.tracciato-page {
		height: 100vh;
		overflow: hidden;
		background: #ffffff;
		color: #0b1530;
	}

	.top-bar {
		position: sticky;
		top: 0;
		z-index: 20;
	}

	.tracciato {
		position: relative;
		height: calc(100vh - 4rem);
		background: #ffffff;
		color: #0b1530;
		overflow: hidden;
	}

	.path-layer {
		position: absolute;
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
	}

	.illustration {
		max-width: 100%;
		max-height: min(70vh, 36rem);
		width: auto;
		height: auto;
		object-fit: contain;
		filter: brightness(0) invert(1);
	}

	.content {
		position: relative;
		z-index: 0;
		height: 100%;
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.foto {
		margin: 0;
		max-width: 42rem;
		width: 100%;
	}

	.foto img {
		display: block;
		width: 100%;
		height: auto;
		max-height: min(70vh, 36rem);
		object-fit: contain;
		margin: 0 auto;
	}

	.empty {
		margin: 0;
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
	}
</style>
