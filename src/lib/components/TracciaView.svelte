<script lang="ts">
	import type { TracciaContent } from '$lib/tracce/types';
	import { lockPageScroll } from '$lib/scroll/lock-page-scroll';
	import SiteHeader from './SiteHeader.svelte';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';
	import FrasiScroller from './FrasiScroller.svelte';

	let { traccia }: { traccia: TracciaContent } = $props();
	let progress = $state(0);
	let tracceContainer = $state<HTMLDivElement | undefined>();

	lockPageScroll();
</script>

<div class="traccia-page">
	<SiteHeader />
	<BackButton label="Torna a Tracce minori" align="right" belowHeader />
	<div class="traccia">
		<aside class="path-column" aria-hidden="true">
			<PercorsoAnimato percorsoSvg={traccia.percorsoSvg} {progress} />
		</aside>
		<div class="tracce-container" bind:this={tracceContainer}>
			<FrasiScroller
				scrollRoot={tracceContainer}
				titolo={traccia.titolo}
				frasi={traccia.frasi}
				onPathProgress={(p) => (progress = p)}
			/>
		</div>
	</div>
</div>

<style>
	.traccia-page {
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: var(--color-bg, #0b1530);
	}

	.traccia {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.path-column {
		display: grid;
		place-items: center;
		padding: 2rem;
		min-height: 0;
	}

	.path-column :global(svg) {
		max-height: 100%;
		width: auto;
	}

	.tracce-container {
		container-type: size;
		height: 100%;
		min-height: 0;
		overflow-y: scroll;
		overscroll-behavior: contain;
		scroll-snap-type: y proximity;
		scrollbar-width: none;
		position: relative;
		z-index: 2;
	}

	.tracce-container::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 767px) {
		.traccia {
			display: block;
			position: relative;
		}

		.path-column {
			position: absolute;
			inset: 0;
			opacity: 0.22;
			z-index: 0;
			pointer-events: none;
		}

		.tracce-container {
			position: relative;
			z-index: 1;
			height: 100%;
		}
	}
</style>
