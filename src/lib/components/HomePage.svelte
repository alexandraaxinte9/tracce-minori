<script lang="ts">
	import { ARTBOARD, homeLayout } from '$lib/content/home/layout';
	import { homeAssets } from '$lib/content/home/assets';

	let {
		tracciatiHref = '/tracciati/tracciati-01',
		aboutHref = '#about',
		aboutTitle = 'About',
		aboutBody = 'Tracce Minori raccoglie storie che attraversano la città — piccoli gesti, incontri e tratti di vita quotidiana disegnati a mano.'
	}: {
		tracciatiHref?: string;
		aboutHref?: string;
		aboutTitle?: string;
		aboutBody?: string;
	} = $props();

	const L = homeLayout;
</script>

<div class="home">
	<section class="home__landing" id="top" aria-label="Introduzione">
		<div
			class="home__scaler"
			style="--artboard-w: {ARTBOARD.width}; --artboard-h: {ARTBOARD.height}"
		>
			<div
				class="home__artboard"
				style="width: {ARTBOARD.width}px; height: {ARTBOARD.height}px"
			>
				<header
					class="home__header"
					style="padding: {L.header.paddingTop}px {L.header.paddingX}px 0"
				>
					<a class="home__home-link" href="#top" aria-label="Torna all'inizio">
						<svg
							class="home__home-icon"
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M4 12.5 14 4l10 8.5V24a1 1 0 0 1-1 1h-6.5v-7H11.5v7H5a1 1 0 0 1-1-1V12.5Z"
								stroke="currentColor"
								stroke-width="1.25"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
					<nav class="home__nav" aria-label="Principale">
						<a class="home__nav-link" href={aboutHref}>About</a>
						<a class="home__nav-link" href={tracciatiHref}>Tracciati</a>
					</nav>
				</header>

				<!-- illustrazioni/image 1.png -->
				<figure
					class="illust illust--top-left"
					style="left: {L.illustrations.topLeft.left}px; top: {L.illustrations.topLeft.top}px; width: {L
						.illustrations.topLeft.width}px; height: {L.illustrations.topLeft.height}px"
				>
					<img
						class="illust__img"
						src={homeAssets.illustrations.topLeft}
						alt=""
						width={L.illustrations.topLeft.width}
						height={L.illustrations.topLeft.height}
						decoding="async"
					/>
				</figure>

				<!-- illustrazioni/image 2.png -->
				<figure
					class="illust illust--top-right"
					style="right: {L.illustrations.topRight.right}px; top: {L.illustrations.topRight.top}px; width: {L
						.illustrations.topRight.width}px; height: {L.illustrations.topRight.height}px"
				>
					<img
						class="illust__img"
						src={homeAssets.illustrations.topRight}
						alt=""
						width={L.illustrations.topRight.width}
						height={L.illustrations.topRight.height}
						decoding="async"
					/>
				</figure>

				<!-- illustrazioni/image 3.png -->
				<figure
					class="illust illust--bottom-left"
					style="left: {L.illustrations.bottomLeft.left}px; bottom: {L.illustrations.bottomLeft
						.bottom}px; width: {L.illustrations.bottomLeft.width}px; height: {L.illustrations.bottomLeft
						.height}px"
				>
					<img
						class="illust__img"
						src={homeAssets.illustrations.bottomLeft}
						alt=""
						width={L.illustrations.bottomLeft.width}
						height={L.illustrations.bottomLeft.height}
						decoding="async"
					/>
				</figure>

				<!-- illustrazioni/image 4.png -->
				<figure
					class="illust illust--bottom-right"
					style="right: {L.illustrations.bottomRight.right}px; bottom: {L.illustrations.bottomRight
						.bottom}px; width: {L.illustrations.bottomRight.width}px; height: {L.illustrations
						.bottomRight.height}px"
				>
					<img
						class="illust__img"
						src={homeAssets.illustrations.bottomRight}
						alt=""
						width={L.illustrations.bottomRight.width}
						height={L.illustrations.bottomRight.height}
						decoding="async"
					/>
				</figure>

				<!-- logotipo.png -->
				<div
					class="logo-reveal"
					style="left: {L.hero.left}px; top: {L.hero.top}px; width: {L.hero.width}px"
				>
					<img
						class="logo-reveal__img"
						src={homeAssets.logotipo}
						alt="Tracce Minori"
						width="555"
						height="321"
						decoding="async"
					/>
				</div>

				<p
					class="home__tagline"
					style="left: {L.tagline.left}px; top: {L.tagline.top}px; font-size: {L.tagline
						.fontSize}px; letter-spacing: {L.tagline.letterSpacing}"
				>
					STORIE CHE ATTRAVERSANO LA CITTÀ
				</p>
			</div>
		</div>
	</section>

	<section id="about" class="home__about" aria-labelledby="about-heading">
		<h2 id="about-heading" class="home__about-title">{aboutTitle}</h2>
		<p class="home__about-body">{aboutBody}</p>
	</section>
</div>

<style>
	.home {
		--home-bg: #ffffff;
		--home-ink-muted: #8a8f9a;
		--home-orange: #e87033;

		background: var(--home-bg);
		color: #0b1530;
		font-family: var(--font-sans, 'Poppins', sans-serif);
		scroll-behavior: smooth;
	}

	:global(body:has(.home)) {
		background: #ffffff;
		color: #0b1530;
	}

	.home__landing {
		width: 100vw;
		height: 100dvh;
		overflow: hidden;
		background: var(--home-bg);
	}

	/*
	 * Scala l’intera composizione 1440×900 come un’unica tavola (identica allo screen).
	 * Regola posizioni in src/lib/content/home/layout.ts
	 */
	.home__scaler {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.home__artboard {
		position: relative;
		flex-shrink: 0;
		background: var(--home-bg);
		transform: scale(min(100vw / var(--artboard-w), 100dvh / var(--artboard-h)));
		transform-origin: center center;
	}

	.home__header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.home__home-link {
		display: grid;
		place-items: center;
		color: var(--home-ink-muted);
		text-decoration: none;
	}

	.home__nav {
		display: flex;
		gap: 38px;
	}

	.home__nav-link {
		font-size: 14px;
		font-weight: 400;
		text-decoration: none;
		color: var(--home-ink-muted);
	}

	.illust {
		position: absolute;
		margin: 0;
		pointer-events: none;
		z-index: 5;
		overflow: visible;
	}

	.illust__img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.logo-reveal {
		position: absolute;
		z-index: 10;
		line-height: 0;
		mask-image: linear-gradient(90deg, #000 0%, #000 100%);
		mask-size: 0% 100%;
		mask-repeat: no-repeat;
		mask-position: left center;
		animation: logo-draw-reveal 2.6s cubic-bezier(0.33, 1, 0.45, 1) forwards;
	}

	.logo-reveal__img {
		display: block;
		width: 100%;
		height: auto;
	}

	.home__tagline {
		position: absolute;
		z-index: 11;
		margin: 0;
		font-weight: 700;
		line-height: 1.35;
		color: #000000;
		white-space: nowrap;
		opacity: 0;
		animation: tagline-fade 1s ease 1.8s forwards;
		pointer-events: none;
	}

	@keyframes logo-draw-reveal {
		0% {
			mask-size: 0% 100%;
			opacity: 0.35;
		}
		15% {
			opacity: 1;
		}
		100% {
			mask-size: 100% 100%;
			opacity: 1;
		}
	}

	@keyframes tagline-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.logo-reveal,
		.home__tagline {
			animation: none;
			opacity: 1;
			mask-size: 100% 100%;
		}
	}

	.home__about {
		max-width: 36rem;
		margin: 0 auto;
		padding: 5rem 2rem 6rem;
		scroll-margin-top: 2rem;
	}

	.home__about-title {
		margin: 0 0 1.25rem;
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--home-orange);
	}

	.home__about-body {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 300;
		line-height: 1.7;
		color: var(--home-ink-muted);
	}
</style>
