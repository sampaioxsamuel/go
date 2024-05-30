<script lang="ts">
	import CreateRedirect from '$/components/create-redirect.svelte';
	import { page } from '$app/stores';
	import List from '$/components/ui/list.svelte';
	import type { PageData } from './$types';

	let isOpen = false;

	function onModalOpen() {
		isOpen = !isOpen;
	}

	function onClose() {
		isOpen = false;
	}

	export let data: PageData;
</script>

{#if $page.state?.createRedirect}
	<CreateRedirect />
{/if}

{#if $page.data.user && data.links}
	<List items={data.links} />
{/if}
