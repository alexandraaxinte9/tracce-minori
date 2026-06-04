<script lang="ts">
	import { parsePercorsoSvg } from '$lib/percorso/parse';

	let { percorsoSvg }: { percorsoSvg: string } = $props();
	const parsed = $derived(parsePercorsoSvg(percorsoSvg));
</script>

<svg class="percorso-statico" viewBox={parsed.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
	<path class="path" d={parsed.pathD} />
</svg>

<style>
	.percorso-statico {
		display: block;
		width: 72%;
		height: auto;
		max-height: 92%;
		overflow: visible;
	}

	.path {
		fill: none;
		stroke: #e85d04;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
