<script lang="ts">
	let className = '';

	export { className as class };
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class={`max-w-6xl mx-auto px-6 w-full h-full ${className}`}>
	<slot />
</main>
