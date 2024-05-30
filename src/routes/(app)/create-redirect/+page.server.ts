import type { Actions } from '@sveltejs/kit';

import { fail } from '@sveltejs/kit';
import { z } from 'zod';

import prisma from '$/lib/db';
import slugify from 'slugify';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = Object.fromEntries(formData);

		const schema = z.object({
			slug: z.string().min(3),
			to: z.string().url()
		});

		try {
			const validation = schema.safeParse(form);

			if (!validation.success) {
				return fail(400, {
					message: 'Validation Error'
				});
			}

			const { to } = validation.data;

			const slug = slugify(validation.data.slug, { lower: true });

			const slugExists = await prisma.link.findFirst({
				where: { slug }
			});

			if (slugExists) {
				return fail(400, {
					message: 'Slug already exists'
				});
			}

			const data = await prisma.link.create({
				data: { slug, redirect: to }
			});

			return {};
		} catch (e) {
			return { message: e };
		}
	}
};
