<script lang="ts">
	import CreateRedirect from '$/components/create-redirect.svelte';
	import { page } from '$app/stores';
	import List from '$/components/list.svelte';
</script>

{#if $page.state?.createRedirect}
	<CreateRedirect />
{/if}

{#if $page.data.user && $page.data.links}
	<List items={$page.data.links} />
{/if}
