<script lang="ts">
	import { parsePercorsoSvg } from '$lib/percorso/parse';

	let {
		percorsoSvg,
		fit = 'default'
	}: {
		percorsoSvg: string;
		fit?: 'default' | 'photo';
	} = $props();
	const parsed = $derived(parsePercorsoSvg(percorsoSvg));
</script>

<svg
	class="percorso-statico"
	class:photo={fit === 'photo'}
	viewBox={parsed.viewBox}
	preserveAspectRatio="xMidYMid meet"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
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

	.percorso-statico.photo {
		width: 100%;
		height: 100%;
	}

	.path {
		fill: none;
		stroke: #e85d04;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
