<script lang="ts">
	import HubView from '$lib/components/HubView.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tracce minori</title>
</svelte:head>

<HubView tracce={data.tracce} tracciati={data.tracciati} />
