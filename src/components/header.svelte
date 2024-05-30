<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { User } from 'lucia';
	import { page } from '$app/stores';
	import { Button } from './ui/button';
	import type { ButtonEventHandler } from 'bits-ui';
	import { pushState } from '$app/navigation';

	const dispatch = createEventDispatcher();

	function onModalOpen(event: ButtonEventHandler<MouseEvent>) {
		dispatch('modalOpen', event);
	}

	function onLogout(event: ButtonEventHandler<MouseEvent>) {
		event.preventDefault();
	}
</script>

<header class="flex items-center justify-between mt-8 h-14">
	<Button
		href="/"
		class="bg-transparent hover:bg-transparent text-3xl font-bold text-gray-900 hover:text-gray-600"
		>Go</Button
	>

	{#if !$page.data.user}
		<!-- <Button size="small" variant="solid" colorScheme="sign">Login</Button> -->
	{:else if $page.data.user}
		<div class="gap-4 flex items-center">
			<Button
				on:click={() => {
					pushState('/create-redirect', {
						createRedirect: true
					});
				}}>Add</Button
			>
			<!-- <Button on:click={onLogout} colorScheme="lightRed" variant="solid">Log out</Button> -->
		</div>
	{/if}
</header>
