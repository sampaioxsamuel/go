import prismaClient from '$/lib/db';
import { jsonResponse, type JsonResponseType } from '$/utils/Response';
import type { RequestEvent } from '@sveltejs/kit';

export async function DELETE({ params }: RequestEvent) {
	if (!params.id) {
		return jsonResponse(
			{
				message: 'Missing slug id',
				error: [{ message: 'Missing slug id', path: 'id' }]
			},
			400
		);
	}

	try {
		await prismaClient.link.delete({
			where: {
				id: +params.id
			}
		});

		return jsonResponse({ data: true }, 200);
	} catch (e) {
		const parsedError = e as JsonResponseType;

		return jsonResponse(parsedError, 400);
	}
}
