<script lang="ts">
	import { resolve } from '$app/paths';

	let { active = 'none' }: { active?: 'about' | 'francesco' | 'none' } = $props();
</script>

<header class="nav">
	<a class="home" href={resolve('/')} aria-label="Home">
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
			<path fill="currentColor" d="M12 3l9 8h-3v10h-5V14H11v7H6V11H3l9-8z" />
		</svg>
	</a>
	<nav class="links" aria-label="Principale">
		{#if active === 'about'}
			<span class="current" aria-current="page">About</span>
		{:else}
			<a href={resolve('/about')}>About</a>
		{/if}
		{#if active === 'francesco'}
			<span class="current" aria-current="page">Francesco</span>
		{:else}
			<a href={resolve('/storia-di-francesco')}>Francesco</a>
		{/if}
		<a href={resolve('/')}>Tracciati</a>
	</nav>
</header>

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: #ffffff;
		color: #0b1530;
	}

	.home {
		color: inherit;
		display: grid;
		place-items: center;
	}

	.links {
		display: flex;
		gap: 1.5rem;
		font-size: 0.95rem;
	}

	.links a {
		text-decoration: none;
		color: inherit;
	}

	.links a:hover {
		text-decoration: underline;
	}

	.current {
		font-weight: 600;
	}
</style>
