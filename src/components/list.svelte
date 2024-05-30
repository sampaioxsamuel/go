<script lang="ts">
	import TrashSimple from 'phosphor-svelte/lib/TrashSimple';

	import { formatRelative, format } from 'date-fns';
	import type { Link } from '@prisma/client';
	import { invalidateAll } from '$app/navigation';
	import DeleteRedirect from './delete-redirect.svelte';

	export let items: Link[];
	const DATE_FORMAT = 'MM/dd/yyyy HH:mm';

	let currentId: number | null;

	let deleteId = -1;

	const onHovering = (id: number | null) => {
		currentId = id;
	};
</script>

<section id="redirect-list" class="grid grid-cols-3 gap-4 mt-8">
	{#each items as item}
		<div class="flex items-center border p-6 rounded-xl shadow-sm">
			<div class="flex justify-center gap-2 flex-col">
				<time
					class="text-xs leading-snug font-semibold text-zinc-400"
					datetime={format(item.created_at, DATE_FORMAT)}
					title={`Created at ${format(item.created_at, DATE_FORMAT)}`}
				>
					{formatRelative(item.created_at, new Date())}</time
				>
				<div class="flex items-end gap-2.5 w-full">
					<a
						href={item.slug}
						target="_blank"
						class="leading-none text-lg text-zinc-900 font-semibold capitalize"
					>
						{item.slug}
					</a>
				</div>

				<a class="text-sm text-zinc-600 font-medium truncate" href={item.redirect} target="_blank">
					{item.redirect}
				</a>
			</div>

			<div class="ml-auto" id="actions">
				<button
					on:mouseenter={() => onHovering(item.id)}
					on:mouseleave={() => onHovering(null)}
					on:click={() => (deleteId = item.id)}
					class="hover:text-red-500"
				>
					<TrashSimple size={18} />
				</button>
			</div>
		</div>
	{/each}
</section>

{#if deleteId !== -1}
	<DeleteRedirect id={deleteId} />
{/if}
