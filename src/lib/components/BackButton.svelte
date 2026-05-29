<script lang="ts">
	import { resolve } from '$app/paths';

	let {
		href = '/',
		theme = 'on-dark'
	}: {
		href?: '/';
		theme?: 'on-dark' | 'on-light';
	} = $props();
</script>

<a
	class="back"
	class:on-light={theme === 'on-light'}
	href={resolve(href)}
	aria-label="Torna all'indice"
>
	<span aria-hidden="true">←</span>
</a>

<style>
	.back {
		position: fixed;
		top: 1.25rem;
		left: 1.25rem;
		z-index: 20;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.5);
		display: grid;
		place-items: center;
		text-decoration: none;
		font-size: 1.25rem;
		background: transparent;
	}
	.back:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	.back.on-light {
		border-color: rgba(11, 21, 48, 0.35);
		color: #0b1530;
	}

	.back.on-light:hover {
		background: rgba(11, 21, 48, 0.06);
	}
</style>
