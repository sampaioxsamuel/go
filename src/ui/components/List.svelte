<script lang="ts">
	import { formatRelative, format } from 'date-fns';
	import type { Link } from '@prisma/client';

	export let items: Link[];
	const DATE_FORMAT = 'MM/dd/yyyy HH:mm';
</script>

<section id="redirect-list" class="flex flex-col mt-8">
	<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
			<div class="overflow-hidden">
				<table class="min-w-full">
					<thead class="border-b px-4">
						<tr>
							<th scope="col" class="text-sm font-bold text-gray-900 py-4 text-left w-16"> # </th>
							<th scope="col" class="text-sm font-bold text-gray-900 py-4 text-left"> Slug </th>
							<th scope="col" class="text-sm font-bold text-gray-900 py-4 text-left"> To </th>
							<th scope="col" class="text-sm font-bold text-gray-900 py-4 text-left">
								Created At
							</th>
						</tr>
					</thead>
					<tbody class="px-4">
						{#each items as item}
							<tr class="border-b">
								<td class="py-4 whitespace-nowrap text-base font-medium text-gray-900">{item.id}</td
								>
								<td class="text-base text-gray-900 font-light py-4 w-96">
									<a href={item.slug} target="_blank" class="underline">{item.slug}</a>
								</td>

								<td class="text-base text-gray-900 font-light py-4">
									<a href={item.redirect} target="_blank" class="underline">{item.redirect}</a>
								</td>

								<td class="text-base text-gray-900 font-light py-4">
									<time
										datetime={format(item.created_at, DATE_FORMAT)}
										title={format(item.created_at, DATE_FORMAT)}
									>
										{formatRelative(item.created_at, new Date())}</time
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
