<script lang="ts">
	import TrashSimple from 'phosphor-svelte/lib/TrashSimple';

	import { formatRelative, format } from 'date-fns';
	import type { Link } from '@prisma/client';
	import DeleteRedirect from './delete-redirect.svelte';

	type Props = {
		items: Link[];
	};

	const { items }: Props = $props();
	const DATE_FORMAT = 'MM/dd/yyyy HH:mm';

	let deleteId = $state(-1);
</script>

<section id="redirect-list" class="grid grid-cols-3 gap-4 mt-8">
	{#each items as item}
		<div class="flex items-center border p-6 rounded-xl shadow-sm">
			<div class="flex justify-center gap-2 flex-col">
				<time
					class="text-xs leading-snug font-semibold text-zinc-400"
					datetime={format(item.createdAt, DATE_FORMAT)}
					title={`Created at ${format(item.createdAt, DATE_FORMAT)}`}
				>
					{formatRelative(item.createdAt, new Date())}</time
				>
				<div class="flex items-end gap-2.5 w-full">
					<a
						href={item.slug}
						target="_blank"
						class="leading-none text-lg text-zinc-900 font-semibold"
					>
						{item.slug}
					</a>
				</div>

				<a class="text-sm text-zinc-600 font-medium truncate" href={item.redirect} target="_blank">
					{item.redirect}
				</a>
			</div>

			<div class="ml-auto" id="actions">
				<button onclick={() => (deleteId = item.id)} class="hover:text-red-500 transition-colors">
					<TrashSimple size={18} />
				</button>
			</div>
		</div>
	{/each}
</section>

{#if deleteId !== -1}
	<DeleteRedirect bind:id={deleteId} />
{/if}
