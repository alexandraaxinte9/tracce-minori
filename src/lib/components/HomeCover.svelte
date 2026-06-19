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
			src={illustrazioneBassoSinistraUrl}
			alt=""
			width="366"
			height="482"
			decoding="async"
		/>
		<img
			class="cover__illus cover__illus--alto-destra"
			src={illustrazioneAltoSinistraUrl}
			alt=""
			width="407"
			height="590"
			decoding="async"
		/>
		<img
			class="cover__illus cover__illus--basso-sinistra"
			src={illustrazioneBassoDestraUrl}
			alt=""
			width="503"
			height="425"
			decoding="async"
		/>
		<img
			class="cover__illus cover__illus--basso-destra"
			src={illustrazioneAltoDestraUrl}
			alt=""
			width="449"
			height="340"
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
	}

	.cover__stage {
		position: relative;
		flex: 1;
		min-height: 0;
		width: 100%;
		overflow: hidden;
	}

	.cover__title {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(0.25rem, 1vw, 0.5rem);
		padding: clamp(0.5rem, 2vw, 1rem);
		text-align: center;
		pointer-events: none;
	}

	.cover__title-img {
		display: block;
		width: min(72vw, clamp(14rem, 34vw, 22rem));
		height: auto;
	}

	.cover__subtitle {
		margin: 0;
		max-width: min(100%, 22rem);
		font-family: var(--font-sans);
		font-size: clamp(0.58rem, 0.85vw, 0.78rem);
		font-weight: 600;
		line-height: 1.35;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #0b1530;
	}

	.cover__illus {
		position: absolute;
		z-index: 1;
		display: block;
		width: clamp(13rem, 36vw, 24rem);
		height: auto;
		max-height: clamp(16rem, 40vh, 26rem);
		object-fit: contain;
		pointer-events: none;
		user-select: none;
	}

	/* Orange — top-left & top-right, larger and inset toward center */
	.cover__illus--alto-sinistra {
		top: clamp(2.75rem, 9vh, 5.5rem);
		left: clamp(2.75rem, 15vw, 9rem);
		width: clamp(15rem, 40vw, 28rem);
		max-height: clamp(18rem, 44vh, 30rem);
		object-position: top left;
	}

	.cover__illus--alto-destra {
		top: clamp(2.75rem, 9vh, 5.5rem);
		right: clamp(2.75rem, 15vw, 9rem);
		width: clamp(15rem, 40vw, 28rem);
		max-height: clamp(18rem, 44vh, 30rem);
		object-position: top right;
	}

	/* Blue — bottom-left & bottom-right, inset toward center */
	.cover__illus--basso-sinistra {
		bottom: clamp(2.75rem, 9vh, 5.5rem);
		left: clamp(2.75rem, 15vw, 9rem);
		width: clamp(13rem, 38vw, 26rem);
		max-height: clamp(14rem, 36vh, 23rem);
		object-position: bottom left;
	}

	.cover__illus--basso-destra {
		bottom: clamp(2.75rem, 9vh, 5.5rem);
		right: clamp(2.75rem, 15vw, 9rem);
		width: clamp(13rem, 38vw, 26rem);
		max-height: clamp(14rem, 36vh, 23rem);
		object-position: bottom right;
	}

	@media (max-width: 767px) {
		.cover__title-img {
			width: min(70vw, clamp(12rem, 50vw, 18rem));
		}

		.cover__subtitle {
			font-size: clamp(0.5rem, 2.2vw, 0.62rem);
			letter-spacing: 0.1em;
		}

		.cover__illus {
			width: clamp(10.5rem, 42vw, 17rem);
			max-height: clamp(12rem, 32vh, 18rem);
		}

		.cover__illus--alto-sinistra {
			top: clamp(1.75rem, 6vh, 3.5rem);
			left: clamp(1.75rem, 13vw, 5.5rem);
			width: clamp(12rem, 46vw, 20rem);
			max-height: clamp(14rem, 36vh, 22rem);
		}

		.cover__illus--alto-destra {
			top: clamp(1.75rem, 6vh, 3.5rem);
			right: clamp(1.75rem, 13vw, 5.5rem);
			width: clamp(12rem, 46vw, 20rem);
			max-height: clamp(14rem, 36vh, 22rem);
		}

		.cover__illus--basso-sinistra {
			bottom: clamp(1.75rem, 6vh, 3.5rem);
			left: clamp(1.75rem, 13vw, 5.5rem);
			width: clamp(10.5rem, 44vw, 18rem);
			max-height: clamp(11rem, 30vh, 16rem);
		}

		.cover__illus--basso-destra {
			bottom: clamp(1.75rem, 6vh, 3.5rem);
			right: clamp(1.75rem, 13vw, 5.5rem);
			width: clamp(10.5rem, 44vw, 18rem);
			max-height: clamp(11rem, 30vh, 16rem);
		}
	}
</style>
