<script lang="ts">
	import type { AboutContent } from '$lib/about/types';
	import AboutHeader from './AboutHeader.svelte';
	import AboutPhotoOverlay from './AboutPhotoOverlay.svelte';
	import CtaLink from './CtaLink.svelte';

	let { about }: { about: AboutContent } = $props();
</script>

<div class="about-page">
	<AboutHeader />

	<section class="intro">
		<p>{about.intro}</p>
	</section>

	<section class="columns" aria-label="Tracce e Tracciati">
		<article class="column">
			<h2>{about.tracce.titolo}</h2>
			<p class="copy">{about.tracce.corpo}</p>
			<AboutPhotoOverlay
				photoUrl={about.fotoTracceUrl}
				percorsoSvg={about.percorsoTracceSvg}
				column="tracce"
			/>
		</article>

		<article class="column">
			<h2>{about.tracciati.titolo}</h2>
			<p class="copy">{about.tracciati.corpo}</p>
			<AboutPhotoOverlay
				photoUrl={about.fotoTracciatiUrl}
				percorsoSvg={about.percorsoTracciatiSvg}
				column="tracciati"
			/>
		</article>
	</section>

	<div class="cta-wrap">
		<CtaLink
			href="/storia-di-francesco"
			label="Scopri la storia di Francesco"
			variant="navy"
		/>
	</div>
</div>

<style>
	.about-page {
		min-height: 100vh;
		background: #ffffff;
		color: #0b1530;
	}

	.intro {
		background: #0b1530;
		color: #ffffff;
		padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem);
	}

	.intro p {
		margin: 0;
		max-width: 52rem;
		font-size: clamp(1.05rem, 2.2vw, 1.35rem);
		line-height: 1.55;
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		padding: clamp(2rem, 5vw, 3.5rem);
		align-items: start;
	}

	.column h2 {
		margin: 0 0 1rem;
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 600;
	}

	.copy {
		margin: 0 0 1.5rem;
		line-height: 1.5;
		white-space: pre-wrap;
		max-width: 28rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: left;
		width: 100%;
	}

	.cta-wrap {
		display: grid;
		place-items: center;
		padding: 2rem 1.5rem 4rem;
	}

	@media (max-width: 767px) {
		.columns {
			grid-template-columns: 1fr;
		}
	}
</style>
