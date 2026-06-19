<script lang="ts">
	import type { FrancescoContent } from '$lib/francesco/types';
	import CtaLink from './CtaLink.svelte';
	import SiteHeader from './SiteHeader.svelte';

	let { francesco }: { francesco: FrancescoContent } = $props();
</script>

<div class="francesco-page">
	<SiteHeader active="francesco" />

	<section class="hero" aria-label="La storia di Francesco">
		<div class="hero-copy">
			<div class="hero-text">
				<h1>{francesco.titolo}</h1>
				<p>{francesco.corpo}</p>
			</div>
			<div class="cta-wrap">
				<CtaLink href="/tracce" label="Scopri le sue tracce e i suoi tracciati" />
			</div>
		</div>
		<div class="hero-art">
			<img src={francesco.illustrazioneUrl} alt="" />
		</div>
	</section>
</div>

<style>
	.francesco-page {
		background: var(--color-bg, #0b1530);
		color: #ffffff;
	}

	.hero {
		--hero-pad: clamp(1.5rem, 4vw, 3rem);
		--hero-gap: clamp(0.5rem, 1.5vw, 1rem);
		position: relative;
		padding: var(--hero-pad);
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: calc(50% - var(--hero-gap));
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
		position: absolute;
		top: var(--hero-pad);
		right: var(--hero-pad);
		bottom: var(--hero-pad);
		left: calc(50% + var(--hero-gap));
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 0;
		pointer-events: none;
	}

	.hero-art img {
		display: block;
		max-height: 100%;
		max-width: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.cta-wrap {
		display: flex;
		justify-content: flex-start;
	}

	.cta-wrap :global(.cta) {
		pointer-events: auto;
	}

	@media (max-width: 767px) {
		.hero-copy {
			max-width: none;
		}

		.hero-art {
			position: static;
			display: grid;
			place-items: center;
			margin-top: 0.25rem;
			pointer-events: auto;
		}

		.hero-art img {
			max-width: min(100%, 20rem);
			max-height: 14rem;
		}
	}
</style>
