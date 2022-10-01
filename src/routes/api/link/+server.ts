import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';

import JsonResponse, { type JsonResponseType } from '$/utils/Response';
import prisma from '$/lib/prisma';

const schema = z.object({
	slug: z.string().min(3),
	to: z.string().url()
});

export async function POST({ request }: RequestEvent) {
	const json = await request.json();

	try {
		const validation = schema.safeParse(json.data);

		if (!validation.success) {
			return JsonResponse({ message: 'bad request amigao' }, 400);
		}

		const { slug, to } = json.data;

		const slugExists = await prisma.link.findFirst({
			where: { slug }
		});

		if (slugExists) {
			return JsonResponse({ message: 'ja existe' }, 400);
		}

		const data = await prisma.link.create({
			data: { slug, redirect: to }
		});

		return JsonResponse({ data }, 200);
	} catch (e) {
		const parsedError = e as JsonResponseType;

		return JsonResponse(parsedError, 400);
	}
}
