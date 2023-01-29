<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	function onModalOpen(event: CustomEvent<MouseEvent>) {
		dispatch('modalOpen', event);
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

	{#if $page.data.session && $page.data.session.user}
		<div class="flex gap-6 justify-center items-center">
			<strong>{$page.data.session.user.name}</strong>

			<Button variant="solid" colorScheme="lightRed" on:click={() => signOut()}>Sign out</Button>
		</div>
	{:else}
		<Button variant="solid" colorScheme="sign" on:click={() => signIn('github')}
			>Sign In with GitHub</Button
		>
	{/if}
</header>
