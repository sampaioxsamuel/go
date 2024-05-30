<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Button } from './ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from './ui/dialog';
	import Input from './ui/input/input.svelte';
	import { Label } from './ui/label';

	let errorMessage = '';
	let isOpen = false;

	function onClose() {
		history.back();
	}

	onMount(() => {
		isOpen = true;
	});
</script>

<Dialog open={isOpen} onOpenChange={onClose}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>New redirect</DialogTitle>
			<DialogDescription>Let's create a new redirect link. Ready?</DialogDescription>
		</DialogHeader>

		<form
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure' && typeof result.data?.message === 'string') {
						errorMessage = result.data.message;
						return;
					}

					await invalidateAll();
					onClose();
				};
			}}
			method="POST"
			class="w-full flex flex-col gap-4"
		>
			{#if errorMessage}
				<span class="px-5 pt-2 block font-medium text-red-500">
					{errorMessage}
				</span>
			{/if}

			<div class="space-y-1.5">
				<Label for="slug">Slug</Label>
				<Input autocomplete="off" type="text" name="slug" id="slug" placeholder="google" />
			</div>

			<div class="space-y-1.5">
				<Label for="to">Redirect To</Label>
				<Input autocomplete="off" type="text" name="to" id="to" placeholder="http://google.com" />
			</div>

			<DialogFooter class="mt-4">
				<div class="ml-auto space-x-4 flex">
					<Button variant="secondary" on:click={onClose}>Cancel</Button>
					<Button type="submit">Create</Button>
				</div>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
