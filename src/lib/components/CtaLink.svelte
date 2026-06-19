<script lang="ts">
	import { resolve } from '$app/paths';

	let {
		href,
		label,
		variant = 'orange'
	}: {
		href: '/' | '/about' | '/tracce-e-tracciati' | '/storia-di-francesco';
		label: string;
		variant?: 'orange' | 'navy';
	} = $props();
</script>

<a class="cta" class:orange={variant === 'orange'} class:navy={variant === 'navy'} href={resolve(href)}>
	<span class="label">{label}</span>
	<span class="arrow" aria-hidden="true">
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
			<path
				d="M5 12h14M13 6l6 6-6 6"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</span>
</a>

<style>
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: #ffffff;
		font: inherit;
		font-size: 1rem;
		padding: 0.85rem 1.75rem;
		border-radius: 999px;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	.cta.orange {
		background: #f26522;
	}

	.cta.orange:hover {
		background: #ff7a3d;
		box-shadow: 0 6px 20px rgba(242, 101, 34, 0.35);
	}

	.cta.navy {
		background: #0b1530;
	}

	.cta.navy:hover {
		background: #152a5c;
		box-shadow: 0 6px 20px rgba(11, 21, 48, 0.25);
	}

	.cta:hover {
		transform: translateX(4px);
	}

	.cta:focus-visible {
		outline: 2px solid #ffffff;
		outline-offset: 3px;
	}

	.label {
		line-height: 1.2;
	}

	.arrow {
		display: flex;
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}

	.cta:hover .arrow {
		transform: translateX(4px);
	}

	@media (prefers-reduced-motion: reduce) {
		.cta,
		.arrow {
			transition: none;
		}

		.cta:hover {
			transform: none;
		}

		.cta:hover .arrow {
			transform: none;
		}
	}
</style>
