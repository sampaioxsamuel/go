<script lang="ts">
	import CreateSlug from '$/ui/components/CreateSlug.svelte';
	import Header from '$/ui/components/Header.svelte';
	import Main from '$/ui/layout/Main.svelte';

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

	{#if isModalOpen}
		<CreateSlug {onClose} />
	{/if}
</Main>
