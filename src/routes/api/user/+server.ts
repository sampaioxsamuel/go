import prisma from '$/lib/prisma';
import { Prisma } from '@prisma/client';
import { json, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	name: z.string(),
	nickname: z.string(),
	picture: z.string()
});

export async function POST({ request }: RequestEvent) {
	try {
		const body = await request.json();

		const userValidation = schema.safeParse(body.data);

		if (!userValidation.success)
			return json({
				message: 'missing params',
				error: userValidation.error.format(),
				data: null
			});

		const { nickname, email, name, picture } = userValidation.data;

		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						nickname
					},
					{
						email
					}
				]
			}
		});

		if (user) return json({ data: user });

		const data = await prisma.user.create({
			data: { nickname, email, name, picture }
		});

		return json({ data });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return json({ message: 'Duplicate user', error: 'user' });
			}
		}

		return;
	}
}
