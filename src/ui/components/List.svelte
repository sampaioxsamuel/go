<script lang="ts">
	import TrashSimple from 'phosphor-svelte/lib/TrashSimple';

	import { formatRelative, format } from 'date-fns';
	import type { Link } from '@prisma/client';
	import { deleteLink, getRedirects } from '$/utils/api/';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let items: Link[];
	const DATE_FORMAT = 'MM/dd/yyyy HH:mm';

	let currentId: number | null;

	const onHovering = (id: number | null) => {
		currentId = id;
	};

	async function onDelete(id: number) {
		console.log('aqui?');

		deleteLink(id).then(async (res) => {
			if (res.data) {
				invalidateAll();
			}
		});
	}
</script>

<section id="redirect-list" class="flex flex-col gap-4 mt-8">
	{#each items as item}
		<div class="flex items-center border p-6 rounded-xl">
			<div class="flex justify-center gap-2 flex-col">
				<div class="flex items-end gap-2.5 w-full">
					<a
						href={item.slug}
						target="_blank"
						class="leading-none text-lg text-zinc-900 font-semibold capitalize"
					>
						{item.slug}
					</a>

					<time
						class="text-xs leading-snug font-semibold text-zinc-400 capitalize"
						datetime={format(item.created_at, DATE_FORMAT)}
						title={`Created at ${format(item.created_at, DATE_FORMAT)}`}
					>
						{formatRelative(item.created_at, new Date())}</time
					>
				</div>

				<a class="text-sm text-zinc-600 font-medium truncate" href={item.redirect} target="_blank"
					>{item.redirect}</a
				>
			</div>

			<div class="ml-auto" id="actions">
				<button
					on:mouseenter={() => onHovering(item.id)}
					on:mouseleave={() => onHovering(null)}
					on:click={() => onDelete(item.id)}
					class="hover:text-red-500"
				>
					<TrashSimple weight={`${currentId === item.id ? 'fill' : 'bold'}`} size={18} />
				</button>
			</div>
		</div>
	{/each}
</section>
