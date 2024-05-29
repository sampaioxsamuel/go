import { fail, json } from '@sveltejs/kit';
import { z } from 'zod';

import prisma from '$/lib/db';
import slugify from 'slugify';
import type { RequestEvent } from './$types';

export async function GET() {
	const data = await prisma.link.findMany();
	return json({ data });
}

export async function POST({ request }: RequestEvent) {
	const formData = await request.formData();
	const form = Object.fromEntries(formData);

	const schema = z.object({
		slug: z.string().min(3),
		to: z.string().url()
	});

	try {
		const validation = schema.safeParse(form);

		if (!validation.success) {
			console.log('HERE');
			return json({
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
				message: 'Slug already exists',
				path: 'slug'
			});
		}

		const data = await prisma.link.create({
			data: { slug, redirect: to }
		});

		return json({ data });
	} catch (e) {
		return fail(400, { message: e });
	}
}
