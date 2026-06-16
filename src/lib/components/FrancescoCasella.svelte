<script lang="ts">
	type Variant = 'tracce' | 'tracciati';

	let {
		variant,
		imageUrl = null,
		href = null,
		alt = ''
	}: {
		variant: Variant;
		imageUrl?: string | null;
		href?: string | null;
		alt?: string;
	} = $props();

	const className = $derived(`casella casella--${variant}`);
</script>

{#if href}
	<a class={className} {href} aria-label={alt || undefined}>
		{#if imageUrl}
			<img src={imageUrl} alt={alt} />
		{/if}
	</a>
{:else}
	<div class={className} aria-hidden={!imageUrl}>
		{#if imageUrl}
			<img src={imageUrl} alt={alt} />
		{/if}
	</div>
{/if}

<style>
	.casella {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 10rem;
		border-radius: 1rem;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
	}

	.casella--tracce {
		background: #2e3192;
	}

	.casella--tracciati {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.4);
	}

	.casella img {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
	}

	a.casella:focus-visible {
		outline: 2px solid #f26522;
		outline-offset: 3px;
	}

	@media (max-width: 767px) {
		.casella {
			min-height: 11rem;
		}
	}
</style>
