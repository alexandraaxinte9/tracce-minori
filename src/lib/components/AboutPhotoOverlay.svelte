<script lang="ts">
	import PercorsoStatico from './PercorsoStatico.svelte';

	let {
		photoUrl,
		percorsoSvg,
		column = 'tracce'
	}: {
		photoUrl: string;
		percorsoSvg: string;
		column?: 'tracce' | 'tracciati';
	} = $props();
</script>

<figure class="overlay" class:tracce={column === 'tracce'} class:tracciati={column === 'tracciati'}>
	<img src={photoUrl} alt="" decoding="async" />
	<div class="path-layer">
		<PercorsoStatico {percorsoSvg} fit="photo" />
	</div>
</figure>

<style>
	.overlay {
		position: relative;
		margin: 0;
		width: 100%;
		max-width: 22rem;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		background: #f0f0f0;
	}

	.overlay img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(1);
	}

	.path-layer {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		pointer-events: none;
	}

	.overlay.tracce .path-layer :global(svg) {
		transform: translateY(2%);
	}

	.overlay.tracciati .path-layer :global(svg) {
		transform: translateY(-1%);
	}
</style>
