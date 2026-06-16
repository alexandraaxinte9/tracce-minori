<script lang="ts">
	import type { TracciaContent } from '$lib/tracce/types';
	import SiteHeader from './SiteHeader.svelte';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';
	import FrasiScroller from './FrasiScroller.svelte';

	let { traccia }: { traccia: TracciaContent } = $props();
	let progress = $state(0);
</script>

<div class="traccia-page">
	<SiteHeader />
	<BackButton label="Torna a Tracce minori" align="right" belowHeader />
	<div class="traccia">
	<aside class="path-column" aria-hidden="true">
		<PercorsoAnimato percorsoSvg={traccia.percorsoSvg} {progress} />
	</aside>
	<div class="text-column">
		<FrasiScroller
			fixed
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
		position: sticky;
		top: 0;
		height: 100%;
		display: grid;
		place-items: center;
		padding: 2rem;
	}
	.path-column :global(svg) {
		max-height: 90vh;
		width: auto;
	}
	.text-column {
		position: relative;
		z-index: 2;
		height: 100%;
		min-height: 0;
	}

	.text-column :global(.scroller) {
		height: 100%;
	}

	@media (max-width: 767px) {
		.traccia {
			display: block;
		}
		.path-column {
			position: fixed;
			inset: 0;
			height: 100%;
			opacity: 0.22;
			z-index: 0;
			pointer-events: none;
		}
		.text-column {
			position: relative;
			z-index: 1;
		}
	}
</style>
