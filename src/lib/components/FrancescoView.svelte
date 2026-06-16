<script lang="ts">
	import type { FrancescoContent } from '$lib/francesco/types';
	import SiteHeader from './SiteHeader.svelte';
	import FrancescoCasella from './FrancescoCasella.svelte';

	let { francesco }: { francesco: FrancescoContent } = $props();
</script>

<div class="francesco-page">
	<SiteHeader active="francesco" />

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
		<div class="caselle caselle--tracce">
			{#each francesco.caselleTracce as casella (casella.id)}
				<FrancescoCasella
					variant="tracce"
					slug={casella.slug}
					titolo={casella.titolo}
					imageUrl={casella.imageUrl}
					previewSvg={casella.previewSvg}
				/>
			{/each}
		</div>
	</section>

	<section class="sezione sezione--tracciati" aria-label={francesco.titoloSezioneTracciati}>
		<h2 class="titolo titolo--right">{francesco.titoloSezioneTracciati}</h2>
		<div class="caselle caselle--tracciati">
			{#each francesco.caselleTracciati as casella (casella.id)}
				<FrancescoCasella
					variant="tracciati"
					slug={casella.slug}
					titolo={casella.titolo}
					imageUrl={casella.imageUrl}
					previewSvg={casella.previewSvg}
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
		grid-template-columns: repeat(3, 1fr);
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
