<section class="cover" aria-label="Copertina">
	<div class="cover__stage">
		<div class="cover__title">
			<h1 class="cover__heading">Tracce minori</h1>
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
		background: #ffffff;
	}

	.cover__stage {
		flex: 1;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.cover__title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(0.25rem, 1vw, 0.6rem);
		text-align: center;
		max-width: min(82vw, calc(48rem - 5pt));
	}

	.cover__heading {
		margin: 0;
		font-family: var(--font-sans);
		font-size: clamp(2rem, 8vw, 4.5rem);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #0b1530;
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

	@media (max-width: 767px) {
		.cover__heading {
			font-size: clamp(1.5rem, 10vw, 2.5rem);
		}

		.cover__subtitle {
			font-size: clamp(0.52rem, 2.4vw, 0.68rem);
			letter-spacing: 0.1em;
		}
	}
</style>
