<script lang="ts">
	// Thanks to: https://github.com/sveltejs/svelte/issues/3088#issuecomment-505785516
	import { onMount, onDestroy } from 'svelte';

	let ref: any;
	let portal: HTMLElement;

	onMount(() => {
		if (typeof document === 'undefined') return;

		portal = document.createElement('div');
		portal.id = 'portal';
		document.body.appendChild(portal);
		portal.appendChild(ref);
	});

	onDestroy(() => {
		if (typeof document === 'undefined') return;

		document.body.removeChild(portal);
	});
</script>

<div class="inner-portal" bind:this={ref}>
	<slot />
</div>
