<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';
	import { onMount, onDestroy } from 'svelte';

	let className = '';
	let escPressed = '';

	export { className as class };

	const dispatch = createEventDispatcher();

	function onClose(e: MouseEvent) {
		dispatch('onClose', e);
	}

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dispatch('onClose', event);
		}
	}

	onMount(() => {
		document.addEventListener('keydown', onKeyPress);
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;

		document.removeEventListener('keydown', onKeyPress);
	});
</script>

<div
	role="dialog"
	id="dialog"
	aria-labelledby="dialog"
	aria-modal="true"
	class="fixed backdrop-blur-sm inset-0 flex items-center justify-center"
>
	<div
		on:click={onClose}
		id="backdrop"
		class="bg-black h-screen w-full inset-0 absolute opacity-50"
	/>

	<div
		id="content"
		class={clsx('fade-in flex flex-col z-10 bg-white rounded-2xl shadow', className)}
	>
		<slot />
	</div>
</div>

<style>
	.fade-in {
		animation: fadeIn 500ms;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: unset;
		}
	}
</style>
