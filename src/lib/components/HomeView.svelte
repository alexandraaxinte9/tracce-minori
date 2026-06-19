<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import HomeCover from '$lib/components/HomeCover.svelte';
</script>

<div class="home-page">
	<SiteHeader />
	<HomeCover />
</div>

<style>
	.home-page {
		height: 100svh;
		max-height: 100svh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: #ffffff;
	}
</style>
