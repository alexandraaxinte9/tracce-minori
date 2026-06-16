<script lang="ts">
	import { resolve } from '$app/paths';

	type Variant = 'tracce' | 'tracciati';

	let {
		variant,
		slug,
		titolo,
		imageUrl = null,
		previewSvg
	}: {
		variant: Variant;
		slug: string;
		titolo: string;
		imageUrl?: string | null;
		previewSvg: string;
	} = $props();

	const className = $derived(`casella casella--${variant}`);
	const linkHref = $derived(
		variant === 'tracce'
			? resolve('/tracce/[slug]', { slug })
			: resolve('/tracciati/[slug]', { slug })
	);
</script>

<a class={className} href={linkHref} aria-label={`Apri ${titolo}`}>
	<div class="preview" aria-hidden="true">
		{#if imageUrl}
			<img src={imageUrl} alt="" />
		{:else}
			{@html previewSvg}
		{/if}
	</div>
	<span class="label">{titolo}</span>
</a>

<style>
	.casella {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		aspect-ratio: 1;
		padding: 1rem;
		border-radius: 1rem;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		box-sizing: border-box;
	}

	.casella--tracce {
		background: #2e3192;
	}

	.casella--tracciati {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.4);
	}

	.preview {
		flex: 1;
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 0;
	}

	.preview img,
	.preview :global(svg) {
		max-width: 82%;
		max-height: 82%;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.preview :global(svg) {
		filter: brightness(0) invert(1);
	}

	.label {
		font-size: 0.85rem;
		font-weight: 600;
		opacity: 0.9;
		text-align: center;
	}

	a.casella:focus-visible {
		outline: 2px solid #f26522;
		outline-offset: 3px;
	}

	@media (max-width: 767px) {
		.casella {
			aspect-ratio: auto;
			min-height: 11rem;
		}
	}
</style>
