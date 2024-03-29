<script lang="ts">
	import clsx from 'clsx';
	import { onMount } from 'svelte';

	import { createLink } from '$/utils/api';

	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import Portal from './Portal.svelte';
	import Input from './Input.svelte';
	import { invalidateAll } from '$app/navigation';

	let error: string | null = null;
	let slugInput: HTMLInputElement | null;

	export let onClose: () => void;

	async function handleSubmit(form: HTMLFormElement) {
		const data = new FormData(form);

		const request = await createLink(data);

		if (request.status === 400) {
			return;
		}

		if (request.data) {
			invalidateAll();
		}

		onClose();
	}

	onMount(() => {
		slugInput?.focus();
	});
</script>

<Portal>
	<Modal class="max-w-lg w-full items-start relative rounded-2xl" on:onClose={onClose}>
		<form
			on:submit|preventDefault={({ currentTarget }) => handleSubmit(currentTarget)}
			method="POST"
			class="w-full px-6"
		>
			<h1 class="pt-6 font-bold text-lg">New Redirect</h1>

			<div class="space-y-6 mt-6">
				<Input
					bind:elementRef={slugInput}
					autocomplete="off"
					id="slug"
					name="slug"
					type="text"
					placeholder="Slug"
				/>

				<Input autocomplete="off" type="text" id="to" placeholder="To" />
			</div>

			{#if error}
				<span class="px-5 pt-2 block font-medium text-red-500">
					{error}
				</span>
			{/if}

			<div class="w-full py-4 flex mt-8">
				<div
					class="absolute left-0 bottom-[75px] before:content-[''] w-full h-[1px] bg-gray-900 opacity-5"
				/>

				<div class="ml-auto space-x-4 flex">
					<Button
						class="px-5 py-2.5"
						size="small"
						colorScheme="base"
						variant="solid"
						on:click={onClose}>Cancel</Button
					>
					<Button
						type="submit"
						class="px-5 py-2.5"
						size="small"
						colorScheme="primary"
						variant="solid">Create</Button
					>
				</div>
			</div>
		</form>
	</Modal>
</Portal>
