<script lang="ts">
	import titoloUrl from '$lib/content/home/titolo.png?url';
	import illustrazioneAltoSinistraUrl from '$lib/content/home/illustrazione-alto-sinistra.svg?url';
	import illustrazioneAltoDestraUrl from '$lib/content/home/illustrazione-alto-destra.svg?url';
	import illustrazioneBassoSinistraUrl from '$lib/content/home/illustrazione-basso-sinistra.svg?url';
	import illustrazioneBassoDestraUrl from '$lib/content/home/illustrazione-basso-destra.svg?url';
</script>

<section class="cover" aria-label="Copertina">
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
		<div class="cover__title">
			<img
				class="cover__title-img"
				src={titoloUrl}
				alt="Tracce minori"
				width="555"
				height="321"
				decoding="async"
			/>
			<p class="cover__subtitle">Storie che attraversano la città</p>
		</div>
	</div>
</section>

<style>
	.cover {
		background: #ffffff;
		padding: clamp(0.75rem, 2.5vw, 2rem) clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem);
	}

	.cover__stage {
		position: relative;
		width: min(100%, 72rem);
		min-height: clamp(28rem, 78vh, 46rem);
		margin: 0 auto;
	}

	.cover__title {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(0.35rem, 1.2vw, 0.65rem);
		padding: clamp(5.5rem, 18vw, 9rem) clamp(1rem, 4vw, 2rem);
		pointer-events: none;
		text-align: center;
	}

	.cover__title-img {
		display: block;
		width: min(88%, 26rem);
		height: auto;
	}

	.cover__subtitle {
		margin: 0;
		max-width: 24rem;
		font-family: var(--font-sans);
		font-size: clamp(0.68rem, 1.6vw, 0.9rem);
		font-weight: 600;
		line-height: 1.35;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #0b1530;
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
	}
</style>
