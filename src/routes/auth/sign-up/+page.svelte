<script lang="ts">
	import Button from '$/components/ui/button.svelte';
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<div class="min-h-screen justify-center flex items-center">
	<form
		method="POST"
		use:enhance
		class="m-auto max-w-lg w-full gap-4 flex flex-col border rounded-md p-8 shadow-sm"
	>
		{#if form?.message}
			<span>{form?.message}</span>
		{/if}

		<span class="mx-auto text-2xl font-semibold">Sign Up</span>

		<div class="flex flex-col gap-2">
			<label class="text-sm text-gray-400" for="name">Name</label>
			<input
				class="px-4 py-2 border rounded-lg text-gray-500 outline-none focus:border-blue-600"
				id="name"
				name="name"
				type="name"
				required
				placeholder="John Doe"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label class="text-sm text-gray-400" for="email">Email</label>
			<input
				class="px-4 py-2 border rounded-lg text-gray-500 outline-none focus:border-blue-600"
				id="email"
				name="email"
				type="email"
				required
				placeholder="example@mail.com"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label class="text-sm text-gray-400" for="password">Password</label>
			<input
				class="px-4 py-2 border rounded-lg text-gray-500 outline-none focus:border-blue-600"
				id="password"
				name="password"
				type="password"
				required
				placeholder="******"
			/>
		</div>

		<Button class="mt-4" variant="solid" colorScheme="primary" type="submit">Continue</Button>
	</form>
</div>
