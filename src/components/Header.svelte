<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import { user } from '$/store';

	const dispatch = createEventDispatcher();

	function onModalOpen(event: CustomEvent<MouseEvent>) {
		dispatch('modalOpen', event);
	}

	const userData = $page.data?.session;
</script>

<header class="flex items-center justify-between mt-8 h-14">
	<Button
		href="/"
		variant="link"
		colorScheme="primary"
		size="extraLarge"
		class="text-3xl font-bold text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-white/70"
		>Go</Button
	>

	{#if userData && userData.user}
		<div class="flex gap-6 justify-center items-center">
			<Button variant="solid" colorScheme="lightRed" on:click={() => signOut()}>Sign out</Button>

			<img
				class="h-10 w-10 rounded-full"
				src={userData.user.image}
				alt={`${userData.user.name} photo`}
			/>
		</div>
	{:else}
		<Button variant="solid" colorScheme="sign" on:click={() => signIn('github')}
			>Sign In with GitHub</Button
		>
	{/if}
</header>
