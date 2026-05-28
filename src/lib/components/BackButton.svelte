<script lang="ts">
	let { href = '/tracce' }: { href?: string } = $props();
</script>

<a class="back" {href} aria-label="Torna alle tracce">
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
</style>
