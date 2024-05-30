<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from './ui/button';
	import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

	let isOpen = true;
	export let id: number;

	function onClose() {
		id = -1;
		isOpen = false;
	}
</script>

<Dialog open={isOpen} onOpenChange={onClose}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Are you sure you want to delete this redirect?</DialogTitle>
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
