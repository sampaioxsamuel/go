<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Button from '$/components/ui/button.svelte';
	import type { User } from 'lucia';
	import { page } from '$app/stores';

	const dispatch = createEventDispatcher();

	function onModalOpen(event: CustomEvent<MouseEvent>) {
		dispatch('modalOpen', event);
	}

	function onLogout(event: CustomEvent<MouseEvent>) {
		event.preventDefault();
	}
</script>

<header class="flex items-center justify-between mt-8 h-14">
	<Button
		href="/"
		variant="link"
		colorScheme="primary"
		size="extraLarge"
		class="text-3xl font-bold text-gray-900 hover:text-gray-600">Go</Button
	>

	{#if !$page.data.user}
		<Button size="small" variant="solid" colorScheme="sign">Login</Button>
	{:else if $page.data.user}
		<div class="gap-4 flex items-center">
			<Button on:click={onModalOpen} colorScheme="sign" variant="solid" class="">Add</Button>
			<Button on:click={onLogout} colorScheme="lightRed" variant="solid">Log out</Button>
		</div>
	{/if}
</header>
