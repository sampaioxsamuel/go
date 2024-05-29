<script lang="ts">
	import CreateSlug from '$/components/create-redirect.svelte';
	import Header from '$/components/ui/header.svelte';
	import Container from '$/components/layout/container.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import List from '../components/ui/list.svelte';

	let isModalOpen = false;

	function onModalOpen() {
		isModalOpen = !isModalOpen;
	}

	function onClose() {
		isModalOpen = false;
	}

	export let data: PageData;
</script>

<Container>
	<Header on:modalOpen={onModalOpen} />

	{#if $page.data.user && data.links}
		<List items={data.links} />
	{/if}

	{#if isModalOpen}
		<CreateSlug {onClose} />
	{/if}
</Container>
