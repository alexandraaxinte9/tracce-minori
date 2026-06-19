<script lang="ts">
	import { resolve } from '$app/paths';
	import type { FrancescoContent } from '$lib/francesco/types';
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
				<a class="cta" href={resolve('/tracce')}>
					Scopri le sue tracce e i suoi tracciati
				</a>
			</div>
		</div>
		<div class="hero-art">
			<img src={francesco.illustrazioneUrl} alt="" />
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

	.hero-copy {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
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

	.cta-wrap {
		display: flex;
		justify-content: flex-start;
	}

	.cta {
		display: inline-block;
		text-decoration: none;
		background: #f26522;
		color: #ffffff;
		font: inherit;
		font-size: 1rem;
		padding: 0.85rem 1.75rem;
		border-radius: 999px;
		cursor: pointer;
	}

	.cta:focus-visible {
		outline: 2px solid #ffffff;
		outline-offset: 3px;
	}

	@media (max-width: 767px) {
		.hero {
			grid-template-columns: 1fr;
		}

		.hero-art {
			margin-top: 0;
		}
	}
</style>
