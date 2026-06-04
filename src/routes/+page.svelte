<script lang="ts">
	import { resolve } from '$app/paths';
	import HomePage from '$lib/components/HomePage.svelte';

	let { data } = $props();

	const tracciatiHref = $derived(
		data.tracciati[0]
			? resolve('/tracciati/[slug]', { slug: data.tracciati[0].slug })
			: '/tracciati/tracciati-01'
	);
</script>

<svelte:head>
	<title>Tracce Minori</title>
	<meta
		name="description"
		content="Storie che attraversano la città — Tracce Minori"
	/>
</svelte:head>

<!-- Testo About: modifica qui titolo e paragrafo -->
<HomePage
	{tracciatiHref}
	aboutHref="#about"
	aboutTitle="About"
	aboutBody="Tracce Minori raccoglie storie che attraversano la città — piccoli gesti, incontri e tratti di vita quotidiana disegnati a mano."
/>
