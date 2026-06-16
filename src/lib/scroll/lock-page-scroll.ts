import { onMount } from 'svelte';

export function lockPageScroll() {
	onMount(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previous;
		};
	});
}
