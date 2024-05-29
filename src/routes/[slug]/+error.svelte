<script>
	import Container from '$/components/layout/container.svelte';
	import { page } from '$app/stores';

	console.trace($page.status, $page.error);
</script>

<Container class="flex flex-col items-center justify-center min-h-screen">
	<h2 class="text-2xl font-bold leading-7 text-gray-800 sm:truncate sm:text-3xl sm:tracking-tight">
		{$page.status}
	</h2>

	<span class="mt-1 mb-4 text-gray-600">{$page.error?.message}</span>

	<img
		width="300px"
		height="200px"
		src="/confused-what.gif"
		alt="Michael confused"
		title="Michael confused"
	/>
</Container>
