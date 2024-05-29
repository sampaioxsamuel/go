import prismaClient from '$/lib/db';
import { createSession } from '$/lib/lucia';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import * as argon from 'argon2';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || !email) {
			return fail(400, {
				message: 'Invalid email'
			});
		}

		if (typeof password !== 'string' || !password) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const user = await prismaClient.user.findFirst({ where: { email } });

		if (!user) {
			return fail(400, {
				message: 'Check your credentials'
			});
		}

		const validPassword = await argon.verify(user?.password, password);

		if (!validPassword) {
			return fail(400, {
				message: 'Check your credentials'
			});
		}

		try {
			await createSession(user.id, event.cookies);
		} catch (e) {
			return fail(400, {
				message: 'Unexpected error in Sign In'
			});
		}

		return redirect(302, '/');
	}
};
