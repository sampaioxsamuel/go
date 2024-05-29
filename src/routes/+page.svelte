<script lang="ts">
	import { isAuthenticated } from '$/store';
	import CreateSlug from '$/ui/components/CreateSlug.svelte';
	import Header from '$/ui/components/Header.svelte';
	import List from '$/ui/components/List.svelte';
	import Main from '$/ui/layout/Main.svelte';

	import { page } from '$app/stores';

	let isModalOpen = false;

	$: pageTitle = isModalOpen ? 'Create slug' : 'Home';

	function onModalOpen() {
		isModalOpen = !isModalOpen;
	}

	function onClose() {
		isModalOpen = false;
	}
</script>

<Main title={pageTitle}>
	<Header on:modalOpen={onModalOpen} />

	<!-- {#if $isAuthenticated}
		<List items={$page.data.links} />
	{/if}

	{#if isModalOpen}
		<CreateSlug {onClose} />
	{/if} -->
</Main>
