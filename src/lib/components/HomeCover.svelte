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
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, min-content) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, min-content) minmax(0, 1fr);
		width: 100%;
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 clamp(0.5rem, 2vw, 1.5rem);
	}

	.cover__title {
		grid-column: 2;
		grid-row: 2;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(0.25rem, 1vw, 0.5rem);
		padding: clamp(0.5rem, 2vw, 1rem);
		text-align: center;
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
		display: block;
		height: auto;
		width: auto;
		max-width: 100%;
		pointer-events: none;
		user-select: none;
	}

	/* Orange — top row */
	.cover__illus--alto-sinistra {
		grid-column: 1;
		grid-row: 1;
		align-self: end;
		justify-self: end;
		width: clamp(11rem, 30vw, 20rem);
	}

	.cover__illus--alto-destra {
		grid-column: 3;
		grid-row: 1;
		align-self: end;
		justify-self: start;
		width: clamp(11rem, 28vw, 19rem);
	}

	/* Blue — bottom row */
	.cover__illus--basso-sinistra {
		grid-column: 1;
		grid-row: 3;
		align-self: start;
		justify-self: end;
		width: clamp(10rem, 26vw, 17rem);
	}

	.cover__illus--basso-destra {
		grid-column: 3;
		grid-row: 3;
		align-self: start;
		justify-self: start;
		width: clamp(10rem, 27vw, 18rem);
	}

	@media (max-width: 767px) {
		.cover__title-img {
			width: min(70vw, clamp(12rem, 50vw, 18rem));
		}

		.cover__subtitle {
			font-size: clamp(0.5rem, 2.2vw, 0.62rem);
			letter-spacing: 0.1em;
		}

		.cover__illus--alto-sinistra {
			width: clamp(8rem, 36vw, 13rem);
		}

		.cover__illus--alto-destra {
			width: clamp(7.5rem, 34vw, 12rem);
		}

		.cover__illus--basso-sinistra {
			width: clamp(7rem, 32vw, 11rem);
		}

		.cover__illus--basso-destra {
			width: clamp(7rem, 32vw, 11rem);
		}
	}
</style>
