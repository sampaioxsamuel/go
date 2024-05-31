<script lang="ts">
	import { enhance } from '$app/forms';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from './ui/button';
</script>

<header class="flex items-center justify-between mt-8 h-14">
	<Button class="text-2xl" href="/" variant="link">Go</Button>

	{#if !$page.data.user}
		<Button size="sm" href="/auth/sign-in">Login</Button>
	{:else if $page.data.user}
		<div class="gap-4 flex items-center">
			<Button
				on:click={() => {
					pushState('/create-redirect', {
						createRedirect: true
					});
				}}>New</Button
			>

			<form use:enhance action="?/logout" method="post">
				<Button variant="secondary" type="submit">Log out</Button>
			</form>
		</div>
	{/if}
</header>
