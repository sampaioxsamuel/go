<script lang="ts">
	import { isAuthenticated } from '$/store';
	import CreateSlug from '$/components/CreateSlug.svelte';
	import Header from '$/components/Header.svelte';
	import List from '$/components/List.svelte';
	import Main from '$/components/layout/Main.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getRedirects } from '$/utils/api';

	let isModalOpen = false;

	$: pageTitle = isModalOpen ? 'Create slug' : 'Home';

	function onModalOpen() {
		isModalOpen = !isModalOpen;
	}

	function onClose() {
		isModalOpen = false;
	}

	onMount(async () => {
		getRedirects();
	});
</script>

<Main title={pageTitle}>
	<Header on:modalOpen={onModalOpen} />

	{#if $isAuthenticated}
		<List items={$page.data.links} />
	{/if}

	{#if isModalOpen}
		<CreateSlug {onClose} />
	{/if}
</Main>
