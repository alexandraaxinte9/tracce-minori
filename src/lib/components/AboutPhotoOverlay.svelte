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
		<div class="path-fit">
			<PercorsoStatico {percorsoSvg} fit="photo" />
		</div>
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

	.path-fit {
		width: 72%;
		aspect-ratio: 569.643 / 1002;
		max-height: 92%;
		flex-shrink: 0;
	}

	.path-fit :global(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.overlay.tracce .path-fit {
		transform: translateY(2%);
	}

	.overlay.tracciati .path-fit {
		transform: translateY(-1%);
	}
</style>
