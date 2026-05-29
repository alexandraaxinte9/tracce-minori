<script lang="ts">
	import TracciatoView from '$lib/components/TracciatoView.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.tracciato.titolo} — Tracce minori</title>
</svelte:head>

<TracciatoView tracciato={data.tracciato} />
