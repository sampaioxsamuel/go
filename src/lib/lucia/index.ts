import { dev } from '$app/environment';
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite';
import { Lucia } from 'lucia';
import { libsql } from '../db';
import type { RequestEvent } from '../../routes/$types';
import type { Cookies } from '@sveltejs/kit';

const adapter = new LibSQLAdapter(libsql, {
	user: 'user',
	session: 'session'
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email
		};
	}
});

export async function createSession(id: string, cookies: Cookies) {
	const session = await lucia.createSession(id, {});

	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
}
