<script lang="ts">
	import { onMount } from 'svelte';
  import '$/ui/styles/global.css';
	import { isAuthenticated } from '$/store';

	onMount(async () => {
		if ($isAuthenticated) return;
	});
</script>

<slot />
