<script lang="ts">
	import illustrazioneAltoSinistraUrl from '$lib/content/home/illustrazione-alto-sinistra.svg?url';
	import illustrazioneAltoDestraUrl from '$lib/content/home/illustrazione-alto-destra.svg?url';
	import illustrazioneBassoSinistraUrl from '$lib/content/home/illustrazione-basso-sinistra.svg?url';
	import illustrazioneBassoDestraUrl from '$lib/content/home/illustrazione-basso-destra.svg?url';
</script>

<section class="cover" aria-labelledby="cover-title">
	<div class="cover__stage">
		<img
			class="cover__illus cover__illus--alto-sinistra"
			src={illustrazioneAltoSinistraUrl}
			alt=""
			width="407"
			height="590"
			decoding="async"
		/>
		<img
			class="cover__illus cover__illus--alto-destra"
			src={illustrazioneAltoDestraUrl}
			alt=""
			width="449"
			height="340"
			decoding="async"
		/>
		<img
			class="cover__illus cover__illus--basso-sinistra"
			src={illustrazioneBassoSinistraUrl}
			alt=""
			width="366"
			height="482"
			decoding="async"
		/>
		<img
			class="cover__illus cover__illus--basso-destra"
			src={illustrazioneBassoDestraUrl}
			alt=""
			width="503"
			height="425"
			decoding="async"
		/>

		<div class="cover__center">
			<h1 id="cover-title" class="cover__titolo">Tracce minori</h1>
			<p class="cover__tagline">Storie che attraversano la città</p>
		</div>
	</div>
</section>

<style>
	.cover {
		background: #ffffff;
		color: #0b1530;
		padding: clamp(0.75rem, 2.5vw, 2rem) clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem);
	}

	.cover__stage {
		position: relative;
		width: min(100%, 72rem);
		min-height: clamp(28rem, 78vh, 46rem);
		margin: 0 auto;
	}

	.cover__illus {
		position: absolute;
		display: block;
		height: auto;
		pointer-events: none;
		user-select: none;
	}

	.cover__illus--alto-sinistra {
		top: 0;
		left: 0;
		width: clamp(9rem, 28vw, 18rem);
	}

	.cover__illus--alto-destra {
		top: 0;
		right: 0;
		width: clamp(10rem, 32vw, 20rem);
	}

	.cover__illus--basso-sinistra {
		bottom: 0;
		left: 0;
		width: clamp(9rem, 28vw, 17rem);
	}

	.cover__illus--basso-destra {
		right: 0;
		bottom: 0;
		width: clamp(10rem, 30vw, 19rem);
	}

	.cover__center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(0.75rem, 2vw, 1.25rem);
		padding: clamp(6rem, 18vh, 10rem) clamp(1rem, 8vw, 4rem);
		text-align: center;
	}

	.cover__titolo {
		margin: 0;
		max-width: min(100%, 34rem);
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.cover__tagline {
		margin: 0;
		max-width: 24rem;
		font-size: clamp(0.7rem, 1.6vw, 0.85rem);
		font-weight: 600;
		letter-spacing: 0.08em;
		line-height: 1.4;
		text-transform: uppercase;
	}

	@media (max-width: 767px) {
		.cover__stage {
			min-height: clamp(24rem, 68vh, 34rem);
		}

		.cover__illus--alto-sinistra {
			width: clamp(7rem, 34vw, 12rem);
		}

		.cover__illus--alto-destra {
			width: clamp(7.5rem, 36vw, 13rem);
		}

		.cover__illus--basso-sinistra {
			width: clamp(7rem, 34vw, 12rem);
		}

		.cover__illus--basso-destra {
			width: clamp(7.5rem, 36vw, 13rem);
		}

		.cover__center {
			padding-inline: clamp(0.5rem, 5vw, 1.5rem);
		}
	}
</style>
