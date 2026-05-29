<script lang="ts">
	import TracciaView from '$lib/components/TracciaView.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.traccia.titolo} — Tracce minori</title>
</svelte:head>

<TracciaView traccia={data.traccia} />
