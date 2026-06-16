<script lang="ts">
	import titoloUrl from '$lib/content/home/titolo.png?url';
	import illustrazioneAltoSinistraUrl from '$lib/content/home/illustrazione-alto-sinistra.svg?url';
	import illustrazioneAltoDestraUrl from '$lib/content/home/illustrazione-alto-destra.svg?url';
	import illustrazioneBassoSinistraUrl from '$lib/content/home/illustrazione-basso-sinistra.svg?url';
	import illustrazioneBassoDestraUrl from '$lib/content/home/illustrazione-basso-destra.svg?url';
</script>

<section class="cover" aria-label="Copertina">
	<div class="cover__stage">
		<div class="cover__corner cover__corner--alto-sinistra">
			<img
				class="cover__illus"
				src={illustrazioneAltoSinistraUrl}
				alt=""
				width="407"
				height="590"
				decoding="async"
			/>
		</div>
		<div class="cover__corner cover__corner--alto-destra">
			<img
				class="cover__illus"
				src={illustrazioneAltoDestraUrl}
				alt=""
				width="449"
				height="340"
				decoding="async"
			/>
		</div>
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
		<div class="cover__corner cover__corner--basso-sinistra">
			<img
				class="cover__illus"
				src={illustrazioneBassoSinistraUrl}
				alt=""
				width="366"
				height="482"
				decoding="async"
			/>
		</div>
		<div class="cover__corner cover__corner--basso-destra">
			<img
				class="cover__illus"
				src={illustrazioneBassoDestraUrl}
				alt=""
				width="503"
				height="425"
				decoding="async"
			/>
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
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, min-content) minmax(0, 1.15fr);
		grid-template-rows: minmax(0, 1.15fr) minmax(0, min-content) minmax(0, 1.15fr);
		width: 100%;
		height: 100%;
		gap: 0;
	}

	.cover__title {
		grid-column: 2;
		grid-row: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(0.25rem, 1vw, 0.6rem);
		text-align: center;
		max-width: min(82vw, calc(48rem - 5pt));
		z-index: 1;
	}

	.cover__title-img {
		display: block;
		width: min(82vw, clamp(calc(26rem - 5pt), calc(58vw - 5pt), calc(48rem - 5pt)));
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

	.cover__corner {
		display: flex;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}

	.cover__illus {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}

	.cover__corner--alto-sinistra {
		grid-column: 1;
		grid-row: 1;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.cover__corner--alto-sinistra .cover__illus {
		object-position: bottom right;
	}

	.cover__corner--alto-destra {
		grid-column: 3;
		grid-row: 1;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.cover__corner--alto-destra .cover__illus {
		object-position: bottom left;
	}

	.cover__corner--basso-sinistra {
		grid-column: 1;
		grid-row: 3;
		justify-content: flex-end;
		align-items: flex-start;
	}

	.cover__corner--basso-sinistra .cover__illus {
		object-position: top right;
	}

	.cover__corner--basso-destra {
		grid-column: 3;
		grid-row: 3;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.cover__corner--basso-destra .cover__illus {
		object-position: top left;
	}

	@media (max-width: 767px) {
		.cover__stage {
			grid-template-columns: minmax(0, 1fr) minmax(0, min-content) minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr) minmax(0, min-content) minmax(0, 1fr);
		}

		.cover__title-img {
			width: min(80vw, clamp(calc(15rem - 5pt), calc(56vw - 5pt), calc(24rem - 5pt)));
		}

		.cover__subtitle {
			font-size: clamp(0.52rem, 2.4vw, 0.68rem);
			letter-spacing: 0.1em;
		}
	}
</style>
