<script lang="ts">
	import type { TracciaContent } from '$lib/tracce/types';
	import BackButton from './BackButton.svelte';
	import PercorsoAnimato from './PercorsoAnimato.svelte';
	import FrasiScroller from './FrasiScroller.svelte';

	let { traccia }: { traccia: TracciaContent } = $props();
	let progress = $state(0);
</script>

<BackButton />
<div class="traccia">
	<aside class="path-column" aria-hidden="true">
		<PercorsoAnimato percorsoSvg={traccia.percorsoSvg} {progress} />
	</aside>
	<div class="text-column">
		<FrasiScroller
			titolo={traccia.titolo}
			frasi={traccia.frasi}
			onPathProgress={(p) => (progress = p)}
		/>
	</div>
</div>

<style>
	.traccia {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
	}
	.path-column {
		position: sticky;
		top: 0;
		height: 100vh;
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
	}
	@media (max-width: 767px) {
		.traccia {
			display: block;
		}
		.path-column {
			position: fixed;
			inset: 0;
			height: 100vh;
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
