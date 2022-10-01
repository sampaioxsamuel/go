<script lang="ts">
	import Plus from 'phosphor-svelte/lib/Plus';
	import SignOut from 'phosphor-svelte/lib/SignOut';
	import { createEventDispatcher } from 'svelte';

	import auth from '$/lib/auth0';
	import { isAuthenticated, loging, user } from '$/store';
	import Button from '$/ui/components/Button.svelte';
	import Spinner from '$/ui/components/Spinner.svelte';

	const dispatch = createEventDispatcher();

	function onModalOpen(event: CustomEvent<MouseEvent>) {
		dispatch('modalOpen', event);
	}

	function onLogout(event: CustomEvent<MouseEvent>) {
		event.preventDefault();
		auth.logout();
	}
</script>

<header class="flex items-center justify-between mt-8 h-14">
	<a href="/" class="text-2xl font-medium text-gray-900">Go</a>

	{#if $loging}
		<Spinner />
	{/if}

	{#if !$loging && !$isAuthenticated}
		<Button on:click={auth.loginWithPopup} class="text-sm" colorScheme="primary">Login</Button>
	{:else if $user}
		<div class="gap-4 flex items-center">
			<Button on:click={onModalOpen} colorScheme="primary" class="py-3">
				<Plus size={15} weight="bold" />
			</Button>

			<Button on:click={onLogout} colorScheme="rose" class="py-3">
				<SignOut size={15} weight="bold" />
			</Button>
		</div>
	{/if}
</header>
