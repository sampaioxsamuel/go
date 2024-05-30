import db from '$/lib/db';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { z } from 'zod';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		return {
			links: null
		};
	}

	const links = await db.link.findMany();

	return {
		links
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!locals.session) return;

		const formData = await request.formData();

		const schema = z.object({
			id: z.coerce.number()
		});

		const parsedData = schema.safeParse(Object.fromEntries(formData));

		console.log({ parsedData });

		if (!parsedData.success) return;

		await db.link.delete({ where: { id: parsedData.data.id } });
	}
};
