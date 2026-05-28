<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<main class="list">
	<h1>Tracce</h1>
	<ul>
		{#each data.tracce as traccia (traccia.slug)}
			<li>
				<a href={resolve('/tracce/[slug]', { slug: traccia.slug })}>{traccia.titolo}</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	.list {
		padding: 4rem 2rem 2rem;
		max-width: 40rem;
		margin: 0 auto;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin: 1rem 0;
	}
	a {
		font-size: 1.25rem;
	}
</style>
