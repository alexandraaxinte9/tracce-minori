<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
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

	let pageEl: HTMLElement | undefined;
	let reducedMotion = $state(false);

	/** Intensità movimento — profilo C (più vivace) */
	const parallaxFactors = {
		topLeft: { x: 32, y: 24 },
		topRight: { x: -28, y: 24 },
		bottomLeft: { x: 28, y: -26 },
		bottomRight: { x: -32, y: -28 }
	} as const;

	function parallaxIntensity() {
		if (!browser) return 1;
		return window.innerWidth < 768 ? 0.5 : 1;
	}

	function setParallax(mx: number, my: number) {
		if (!pageEl || reducedMotion) return;
		const scale = parallaxIntensity();
		for (const [corner, factor] of Object.entries(parallaxFactors)) {
			pageEl.style.setProperty(`--parallax-${corner}-x`, `${mx * factor.x * scale}px`);
			pageEl.style.setProperty(`--parallax-${corner}-y`, `${my * factor.y * scale}px`);
		}
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!browser || reducedMotion) return;

		const handleMove = (event: PointerEvent) => {
			const mx = event.clientX / window.innerWidth - 0.5;
			const my = event.clientY / window.innerHeight - 0.5;
			setParallax(mx, my);
		};

		window.addEventListener('pointermove', handleMove, { passive: true });
		return () => window.removeEventListener('pointermove', handleMove);
	});
</script>

<div class="home" bind:this={pageEl} class:home--reduced={reducedMotion}>
	<header class="home__header">
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

	<section class="home__landing" id="top" aria-label="Introduzione">
	<div class="home__stage">
		<!-- Angolo alto sinistra — file: illustrazioni/image 1.png -->
		<figure class="illust illust--top-left">
			<div class="illust__float">
				<div class="illust__parallax">
					<img
						class="illust__img"
						src={homeAssets.illustrations.topLeft}
						alt=""
						width="420"
						height="420"
						decoding="async"
					/>
				</div>
			</div>
		</figure>

		<!-- Angolo alto destra — file: illustrazioni/image 2.png -->
		<figure class="illust illust--top-right">
			<div class="illust__float">
				<div class="illust__parallax">
					<img
						class="illust__img"
						src={homeAssets.illustrations.topRight}
						alt=""
						width="420"
						height="420"
						decoding="async"
					/>
				</div>
			</div>
		</figure>

		<!-- Angolo basso sinistra — file: illustrazioni/image 3.png -->
		<figure class="illust illust--bottom-left">
			<div class="illust__float">
				<div class="illust__parallax">
					<img
						class="illust__img"
						src={homeAssets.illustrations.bottomLeft}
						alt=""
						width="420"
						height="420"
						decoding="async"
					/>
				</div>
			</div>
		</figure>

		<!-- Angolo basso destra — file: illustrazioni/image 4.png -->
		<figure class="illust illust--bottom-right">
			<div class="illust__float">
				<div class="illust__parallax">
					<img
						class="illust__img"
						src={homeAssets.illustrations.bottomRight}
						alt=""
						width="420"
						height="420"
						decoding="async"
					/>
				</div>
			</div>
		</figure>

		<main class="home__hero">
			<!-- Logo — file: logotipo.png (reveal progressivo) -->
			<div class="logo-reveal">
				<img
					class="logo-reveal__img"
					src={homeAssets.logotipo}
					alt="Tracce Minori"
					width="520"
					height="280"
					decoding="async"
				/>
			</div>
			<p class="home__tagline">STORIE CHE ATTRAVERSANO LA CITTÀ</p>
		</main>
	</div>
	</section>

	<!-- Sezione About: modifica titolo e testo in +page.svelte (props aboutTitle / aboutBody) -->
	<section id="about" class="home__about" aria-labelledby="about-heading">
		<h2 id="about-heading" class="home__about-title">{aboutTitle}</h2>
		<p class="home__about-body">{aboutBody}</p>
	</section>
</div>

<style>
	.home {
		--home-bg: #ffffff;
		--home-ink: #0b1530;
		--home-ink-muted: rgba(11, 21, 48, 0.72);
		--home-orange: #e85f2a;
		--parallax-topLeft-x: 0px;
		--parallax-topLeft-y: 0px;
		--parallax-topRight-x: 0px;
		--parallax-topRight-y: 0px;
		--parallax-bottomLeft-x: 0px;
		--parallax-bottomLeft-y: 0px;
		--parallax-bottomRight-x: 0px;
		--parallax-bottomRight-y: 0px;

		position: relative;
		overflow-x: hidden;
		scroll-behavior: smooth;
		background: var(--home-bg);
		color: var(--home-ink);
		font-family: var(--font-sans, 'Poppins', sans-serif);
	}

	.home__header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 30;
		background: color-mix(in srgb, var(--home-bg) 88%, transparent);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: clamp(1rem, 2.5vw, 1.75rem) clamp(1.25rem, 4vw, 2.5rem);
	}

	.home__home-link {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		color: var(--home-ink-muted);
		text-decoration: none;
		transition: color 0.25s ease;
	}

	.home__home-link:hover {
		color: var(--home-ink);
	}

	.home__nav {
		display: flex;
		gap: clamp(1.25rem, 3vw, 2.5rem);
	}

	.home__nav-link {
		font-size: clamp(0.8125rem, 1.6vw, 0.9375rem);
		font-weight: 400;
		letter-spacing: 0.04em;
		text-decoration: none;
		color: var(--home-ink-muted);
		transition: color 0.25s ease;
	}

	.home__nav-link:hover {
		color: var(--home-ink);
	}

	.home__landing {
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
		isolation: isolate;
	}

	/* Composizione a schermo intero come nello screen */
	.home__stage {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: clamp(3.5rem, 8vh, 5rem) clamp(0.75rem, 2vw, 1.5rem);
	}

	.home__hero {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(0.75rem, 2vw, 1.25rem);
		max-width: min(92vw, 36rem);
		text-align: center;
		padding: 0 1rem;
	}

	.logo-reveal {
		width: min(82vw, 32rem);
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
		object-fit: contain;
	}

	.home__tagline {
		margin: 0;
		font-size: clamp(0.6875rem, 1.8vw, 0.8125rem);
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1.35;
		color: var(--home-ink);
		opacity: 0;
		animation: tagline-fade 1s ease 1.8s forwards;
	}

	.illust {
		position: absolute;
		margin: 0;
		pointer-events: none;
		z-index: 5;
	}

	.illust__float {
		will-change: transform;
	}

	.illust__parallax {
		transform: translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
		transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
	}

	.illust__img {
		display: block;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	/* Posizione angoli — regola --illust-x / --illust-y / --illust-w se sposti gli asset */
	.illust--top-left {
		--illust-x: -28%;
		--illust-y: -6%;
		--illust-h: clamp(14rem, 52vh, 30rem);
		top: 0;
		left: 0;
		transform: translate(var(--illust-x), var(--illust-y));
		transform-origin: top left;
		animation: illust-enter-tl 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	.illust--top-left .illust__img {
		height: var(--illust-h);
		width: auto;
		max-width: none;
	}

	.illust--top-left .illust__parallax {
		--parallax-x: var(--parallax-topLeft-x);
		--parallax-y: var(--parallax-topLeft-y);
	}

	.illust--top-left .illust__float {
		animation: float-tl 6.5s ease-in-out 1.1s infinite;
	}

	.illust--top-right {
		--illust-x: 24%;
		--illust-y: -4%;
		--illust-w: clamp(12rem, 38vw, 30rem);
		top: 0;
		right: 0;
		left: auto;
		transform: translate(var(--illust-x), var(--illust-y));
		transform-origin: top right;
		animation: illust-enter-tr 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.12s forwards;
	}

	.illust--top-right .illust__parallax,
	.illust--bottom-right .illust__parallax {
		display: flex;
		justify-content: flex-end;
	}

	.illust--top-right .illust__img,
	.illust--bottom-right .illust__img {
		width: var(--illust-w);
		max-width: none;
	}

	.illust--top-right .illust__parallax {
		--parallax-x: var(--parallax-topRight-x);
		--parallax-y: var(--parallax-topRight-y);
	}

	.illust--top-right .illust__float {
		animation: float-tr 7s ease-in-out 1.25s infinite;
	}

	.illust--bottom-left {
		--illust-x: -26%;
		--illust-y: 10%;
		--illust-h: clamp(13rem, 46vh, 28rem);
		bottom: 0;
		left: 0;
		top: auto;
		transform: translate(var(--illust-x), var(--illust-y));
		transform-origin: bottom left;
		animation: illust-enter-bl 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.22s forwards;
	}

	.illust--bottom-left .illust__img {
		height: var(--illust-h);
		width: auto;
		max-width: none;
	}

	.illust--bottom-left .illust__parallax {
		--parallax-x: var(--parallax-bottomLeft-x);
		--parallax-y: var(--parallax-bottomLeft-y);
	}

	.illust--bottom-left .illust__float {
		animation: float-bl 7.5s ease-in-out 1.4s infinite;
	}

	.illust--bottom-right {
		--illust-x: 22%;
		--illust-y: 12%;
		--illust-w: clamp(12rem, 36vw, 28rem);
		bottom: 0;
		right: 0;
		left: auto;
		top: auto;
		transform: translate(var(--illust-x), var(--illust-y));
		transform-origin: bottom right;
		animation: illust-enter-br 1.25s cubic-bezier(0.22, 1, 0.36, 1) 0.32s forwards;
	}

	.illust--bottom-right .illust__parallax {
		--parallax-x: var(--parallax-bottomRight-x);
		--parallax-y: var(--parallax-bottomRight-y);
	}

	.illust--bottom-right .illust__float {
		animation: float-br 6.8s ease-in-out 1.55s infinite;
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
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes illust-enter-tl {
		from {
			opacity: 0;
			transform: translate(calc(var(--illust-x) - 8%), calc(var(--illust-y) - 8%)) scale(0.9)
				rotate(-2deg);
		}
		to {
			opacity: 1;
			transform: translate(var(--illust-x), var(--illust-y)) scale(1) rotate(0deg);
		}
	}

	@keyframes illust-enter-tr {
		from {
			opacity: 0;
			transform: translate(calc(var(--illust-x) + 8%), calc(var(--illust-y) - 8%)) scale(0.9)
				rotate(2deg);
		}
		to {
			opacity: 1;
			transform: translate(var(--illust-x), var(--illust-y)) scale(1) rotate(0deg);
		}
	}

	@keyframes illust-enter-bl {
		from {
			opacity: 0;
			transform: translate(calc(var(--illust-x) - 8%), calc(var(--illust-y) + 8%)) scale(0.9)
				rotate(1.5deg);
		}
		to {
			opacity: 1;
			transform: translate(var(--illust-x), var(--illust-y)) scale(1) rotate(0deg);
		}
	}

	@keyframes illust-enter-br {
		from {
			opacity: 0;
			transform: translate(calc(var(--illust-x) + 8%), calc(var(--illust-y) + 8%)) scale(0.9)
				rotate(-1.5deg);
		}
		to {
			opacity: 1;
			transform: translate(var(--illust-x), var(--illust-y)) scale(1) rotate(0deg);
		}
	}

	@keyframes float-tl {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(6px, -10px) rotate(1.4deg);
		}
		66% {
			transform: translate(-4px, -6px) rotate(-0.8deg);
		}
	}

	@keyframes float-tr {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(-8px, -9px) rotate(-1.2deg);
		}
		66% {
			transform: translate(5px, -12px) rotate(0.9deg);
		}
	}

	@keyframes float-bl {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(9px, 11px) rotate(1.1deg);
		}
		66% {
			transform: translate(-5px, 7px) rotate(-0.7deg);
		}
	}

	@keyframes float-br {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(-7px, 10px) rotate(-1.3deg);
		}
		66% {
			transform: translate(6px, 6px) rotate(0.8deg);
		}
	}

	@media (max-width: 768px) {
		.illust--top-left {
			--illust-x: -18%;
			--illust-y: -2%;
			--illust-h: clamp(10rem, 38vh, 16rem);
		}

		.illust--top-right {
			--illust-x: 16%;
			--illust-y: 0%;
			--illust-w: clamp(9rem, 44vw, 15rem);
		}

		.illust--bottom-left {
			--illust-x: -16%;
			--illust-y: 6%;
			--illust-h: clamp(9.5rem, 34vh, 15rem);
		}

		.illust--bottom-right {
			--illust-x: 14%;
			--illust-y: 8%;
			--illust-w: clamp(9rem, 42vw, 15rem);
		}

		.home__stage {
			padding-top: 4rem;
			padding-bottom: 2rem;
		}

		.logo-reveal {
			width: min(84vw, 20rem);
		}
	}

	@media (max-width: 480px) {
		.illust--top-left {
			--illust-x: -14%;
			--illust-h: min(42vh, 11rem);
		}

		.illust--top-right {
			--illust-x: 12%;
			--illust-w: min(40vw, 10.5rem);
		}

		.illust--bottom-left {
			--illust-x: -12%;
			--illust-h: min(36vh, 10rem);
		}

		.illust--bottom-right {
			--illust-x: 10%;
			--illust-w: min(40vw, 10.5rem);
		}
	}

	.home--reduced .logo-reveal,
	.home--reduced .home__tagline,
	.home--reduced .illust {
		animation: none;
		opacity: 1;
		mask-size: 100% 100%;
	}

	.home--reduced .illust__float {
		animation: none;
	}

	.home--reduced .illust__parallax {
		transition: none;
	}

	.home__about {
		position: relative;
		z-index: 20;
		max-width: 36rem;
		margin: 0 auto;
		padding: clamp(4rem, 12vw, 7rem) clamp(1.5rem, 5vw, 2.5rem) clamp(5rem, 14vw, 8rem);
		scroll-margin-top: 4.5rem;
	}

	.home__about-title {
		margin: 0 0 1.25rem;
		font-size: clamp(0.75rem, 1.6vw, 0.8125rem);
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--home-orange);
	}

	.home__about-body {
		margin: 0;
		font-size: clamp(1rem, 2.2vw, 1.125rem);
		font-weight: 300;
		line-height: 1.7;
		color: var(--home-ink-muted);
	}
</style>
