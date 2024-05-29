import prismaClient from '$/lib/db';
import { error, redirect, type LoadEvent } from '@sveltejs/kit';

export async function load({ params, setHeaders }: LoadEvent) {
	const { slug } = params;

	if (!slug || slug === '/') {
		return;
	}

	const data = await prismaClient.link.findFirst({
		where: { slug }
	});

	if (!data) {
		throw error(404, 'Slug not found');
	}

	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	});

	throw redirect(307, data.redirect);
}
