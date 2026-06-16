<script lang="ts">
	import { resolve } from '$app/paths';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tracce minori</title>
</svelte:head>

<div class="hub-page">
	<SiteHeader />

	<main class="hub">
	<h1>Tracce minori</h1>

	<section class="section" aria-labelledby="tracce-heading">
		<h2 id="tracce-heading">Tracce</h2>
		<ul>
			{#each data.tracce as traccia (traccia.slug)}
				<li>
					<a href={resolve('/tracce/[slug]', { slug: traccia.slug })}>{traccia.titolo}</a>
				</li>
			{/each}
		</ul>
	</section>

	<section class="section" aria-labelledby="tracciati-heading">
		<h2 id="tracciati-heading">Tracciati</h2>
		<ul>
			{#each data.tracciati as tracciato (tracciato.slug)}
				<li>
					<a href={resolve('/tracciati/[slug]', { slug: tracciato.slug })}>
						{tracciato.titolo}
					</a>
				</li>
			{/each}
		</ul>
	</section>
	</main>
</div>

<style>
	.hub-page {
		min-height: 100vh;
		background: var(--color-bg, #0b1530);
		color: var(--color-text, #ffffff);
	}

	.hub {
		padding: 2.5rem 2rem 3rem;
		max-width: 40rem;
		margin: 0 auto;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 0 0 2.5rem;
	}

	.section {
		margin-bottom: 2.5rem;
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.55;
		margin: 0 0 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin: 0.75rem 0;
	}

	a {
		font-size: 1.25rem;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
