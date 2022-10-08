<script lang="ts">
	import clsx from 'clsx';
	import { onMount } from 'svelte';

	import { createLink } from '$/utils/api';

	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import Portal from './Portal.svelte';

	let error: string | null = null;
	let slugInput: HTMLInputElement | null;

	export let onClose: () => void;

	async function handleSubmit(form: HTMLFormElement) {
		const data = new FormData(form);

		const request = await createLink(data);

		if (request.status === 400) {
			const result = request;
			// error = request;
			return;
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
			class="w-full"
		>
			<h1 class="pl-4 pt-4 font-bold text-lg">New Redirect</h1>

			<div class="px-4 space-y-6 mt-6">
				<div>
					<input
						bind:this={slugInput}
						id="slug"
						name="slug"
						class={clsx(
							'w-full py-3 px-4 ease-in-out duration-300 transition-all border border-gray-200 rounded-xl outline-none',
							'focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:border-fuchsia-600',
							'hover:ring-2 hover:ring-fuchsia-300 hover:border-fuchsia-500'
						)}
						type="text"
						placeholder="Slug"
					/>
				</div>

				<div>
					<input
						id="to"
						name="to"
						class={clsx(
							'w-full py-3 px-4 ease-in-out duration-300 transition-all border border-gray-200 rounded-xl outline-none',
							'focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:border-fuchsia-500',
							'hover:ring-2 hover:ring-fuchsia-300 hover:border-fuchsia-500',
							'disabled:opacity-70 disabled:hover:ring-0 disabled:hover:border-gray-200'
						)}
						type="text"
						placeholder="To"
					/>
				</div>
			</div>

			{#if error}
				<span class="px-5 pt-2 block font-medium text-red-500">
					{error}
				</span>
			{/if}

			<div class="mt-8 w-full relative py-4 px-4 flex border-t border-t-zinc-900 border-opacity-5">
				<div class="ml-auto space-x-4 flex">
					<Button class="px-5 py-2.5" sizes="small" on:click={onClose}>Cancel</Button>
					<Button type="submit" class="px-5 py-2.5" sizes="small" colorScheme="primary"
						>Create</Button
					>
				</div>
			</div>
		</form>
	</Modal>
</Portal>
