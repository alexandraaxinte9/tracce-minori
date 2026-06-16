<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import FrancescoCasella from '$lib/components/FrancescoCasella.svelte';

	type HubItem = {
		slug: string;
		titolo: string;
		previewSvg: string;
	};

	let {
		tracce,
		tracciati
	}: {
		tracce: HubItem[];
		tracciati: HubItem[];
	} = $props();
</script>

<div class="hub-page">
	<SiteHeader active="tracciati" />

	<main class="hub">
	<section class="sezione" aria-labelledby="tracce-heading">
		<h2 id="tracce-heading" class="titolo titolo--left">Tracce</h2>
		<p class="intro">
			Frasi e orari lungo un percorso: il racconto di una giornata, passo dopo passo.
		</p>
		<div class="caselle">
			{#each tracce as traccia (traccia.slug)}
				<FrancescoCasella
					variant="tracce"
					slug={traccia.slug}
					titolo={traccia.titolo}
					previewSvg={traccia.previewSvg}
				/>
			{/each}
		</div>
	</section>

	<section class="sezione" aria-labelledby="tracciati-heading">
		<h2 id="tracciati-heading" class="titolo titolo--right">Tracciati</h2>
		<p class="intro intro--right">
			Foto e disegni lungo la linea: ciò che resta visibile del passaggio.
		</p>
		<div class="caselle">
			{#each tracciati as tracciato (tracciato.slug)}
				<FrancescoCasella
					variant="tracciati"
					slug={tracciato.slug}
					titolo={tracciato.titolo}
					previewSvg={tracciato.previewSvg}
				/>
			{/each}
		</div>
	</section>
	</main>
</div>

<style>
	.hub-page {
		min-height: 100vh;
	}

	.hub {
		padding: clamp(1.5rem, 4vw, 3rem);
		background: var(--color-bg, #0b1530);
		color: #ffffff;
	}

	.sezione {
		padding: 0 0 clamp(2rem, 4vw, 3rem);
	}

	.sezione:last-child {
		padding-bottom: 0;
	}

	.titolo {
		margin: 0 0 0.75rem;
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

	.intro {
		margin: 0 0 1.5rem;
		max-width: 28rem;
		font-size: 1rem;
		line-height: 1.5;
		opacity: 0.75;
	}

	.intro--right {
		margin-left: auto;
		text-align: right;
	}

	.caselle {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(1rem, 3vw, 1.5rem);
	}

	@media (max-width: 767px) {
		.titolo--right,
		.intro--right {
			text-align: left;
			margin-left: 0;
		}

		.caselle {
			grid-template-columns: 1fr;
		}
	}
</style>
