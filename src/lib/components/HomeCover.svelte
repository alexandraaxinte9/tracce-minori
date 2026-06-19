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
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: #ffffff;
		padding: clamp(0.25rem, 1vw, 0.75rem) clamp(1rem, 3vw, 2rem)
			clamp(0.75rem, 2vw, 1.25rem);
	}

	.cover__stage {
		position: relative;
		flex: 1;
		min-height: 0;
		width: min(100%, 72rem);
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
		gap: clamp(0.25rem, 1vw, 0.6rem);
		padding: clamp(5rem, 16vh, 8rem) clamp(1rem, 4vw, 2rem);
		pointer-events: none;
		text-align: center;
	}

	.cover__title-img {
		display: block;
		width: min(82vw, clamp(22rem, 48vw, 34rem));
		height: auto;
	}

	.cover__subtitle {
		margin: 0;
		max-width: min(100%, 28rem);
		font-family: var(--font-sans);
		font-size: clamp(0.65rem, 1vw, 0.9rem);
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
		width: clamp(9.5rem, 24vw, 17rem);
	}

	.cover__illus--alto-destra {
		top: 0;
		right: 0;
		width: clamp(10.5rem, 27vw, 18.5rem);
	}

	.cover__illus--basso-sinistra {
		bottom: 0;
		left: 0;
		width: clamp(8.5rem, 22vw, 15rem);
	}

	.cover__illus--basso-destra {
		right: 0;
		bottom: 0;
		width: clamp(9.5rem, 25vw, 17rem);
	}

	@media (max-width: 767px) {
		.cover__title-img {
			width: min(80vw, clamp(15rem, 56vw, 24rem));
		}

		.cover__subtitle {
			font-size: clamp(0.52rem, 2.4vw, 0.68rem);
			letter-spacing: 0.1em;
		}

		.cover__illus--alto-sinistra {
			width: clamp(7rem, 32vw, 11rem);
		}

		.cover__illus--alto-destra {
			width: clamp(7.5rem, 34vw, 12rem);
		}

		.cover__illus--basso-sinistra {
			width: clamp(6.5rem, 30vw, 10rem);
		}

		.cover__illus--basso-destra {
			width: clamp(7rem, 32vw, 11rem);
		}
	}
</style>
