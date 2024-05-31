import db from '$/lib/db';
import { error, redirect, type LoadEvent } from '@sveltejs/kit';

export async function load({ params, setHeaders }: LoadEvent) {
	const { slug } = params;

	if (!slug || slug === '/') {
		return;
	}

	const data = await db.link.findFirst({
		where: { slug }
	});

	if (!data) {
		throw error(404, 'Slug not found');
	}

	await db.link.update({
		where: {
			id: data.id
		},
		data: {
			views: {
				increment: 1
			}
		}
	});

	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
		// 'Cache-Control': 'max-age=3600'
	});

	throw redirect(307, data.redirect);
}
