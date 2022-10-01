<script lang="ts">
	import { onMount } from 'svelte';

	import { isAuthenticated } from '$/store';
	import auth from '$/lib/auth0';

	import '$/ui/styles/global.css';

	onMount(async () => {
		if ($isAuthenticated) return;

		await auth.getUser();
	});
</script>

<slot />
