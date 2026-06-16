<script lang="ts">
	import FrancescoView from '$lib/components/FrancescoView.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>La storia di Francesco — Tracce minori</title>
</svelte:head>

<FrancescoView francesco={data.francesco} />
