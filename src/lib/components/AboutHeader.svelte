<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="nav">
	<a class="home" href={resolve('/')} aria-label="Home">
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
			<path fill="currentColor" d="M12 3l9 8h-3v10h-5V14H11v7H6V11H3l9-8z" />
		</svg>
	</a>
	<nav class="links" aria-label="Principale">
		<span class="current" aria-current="page">About</span>
		<a href={resolve('/tracciati/[slug]', { slug: 'tracciati-01' })}>Tracciati</a>
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
