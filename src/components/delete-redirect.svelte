<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Button } from './ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogDescription
	} from './ui/dialog';

	let isOpen = $state(false);

	let { id = $bindable() } = $props();

	function onClose() {
		id = -1;
		isOpen = false;
	}

	onMount(() => {
		isOpen = true;
	});
</script>

<Dialog open={isOpen} onOpenChange={onClose}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Delete redirect</DialogTitle>
			<DialogDescription>Are you sure you want to delete this redirect?</DialogDescription>
		</DialogHeader>

		<form
			use:enhance={() => {
				return async () => {
					await invalidateAll();
					onClose();
				};
			}}
			method="POST"
			action="?/delete"
			class="w-full flex flex-col gap-4"
		>
			<input hidden value={id} name="id" />
			<DialogFooter class="mt-4">
				<div class="ml-auto space-x-4 flex">
					<Button variant="secondary" on:click={onClose}>Cancel</Button>
					<Button type="submit" variant="destructive">Yes</Button>
				</div>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
