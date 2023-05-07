import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';

import { type JsonResponseType, jsonResponse, transformError } from '$/utils/Response';
import prisma from '$/lib/prisma';
import slugify from 'slugify';

export async function GET() {
	const data = await prisma.link.findMany();
	return jsonResponse({ data }, 200);
}

export async function POST({ request, locals }: RequestEvent) {
	const user = await locals.getSession();
	const json = await request.json();

	if (!user) {
		return jsonResponse(
			{
				message: 'Missing user session',
				data: null
			},
			401
		);
	}

	const schema = z.object({
		slug: z.string().min(3),
		to: z.string().url()
	});

	try {
		const validation = schema.safeParse(json.data);

		if (!validation.success) {
			return jsonResponse(
				{
					message: 'Validation Error',
					error: transformError(validation.error)
				},
				400
			);
		}

		const { to } = validation.data;

		const slug = slugify(validation.data.slug, { lower: true });

		const slugExists = await prisma.link.findFirst({
			where: { slug }
		});

		if (slugExists) {
			return jsonResponse(
				{
					message: 'Slug already exists',
					error: [{ message: 'Slug already exists', path: 'slug' }]
				},
				400
			);
		}

		const data = await prisma.link.create({
			data: { slug, redirect: to }
		});

		return jsonResponse({ data }, 200);
	} catch (e) {
		const parsedError = e as JsonResponseType;

		return jsonResponse(parsedError, 400);
	}
}
