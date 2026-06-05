<script lang="ts">
	import AboutView from '$lib/components/AboutView.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>About — Tracce minori</title>
</svelte:head>

<AboutView about={data.about} />
