import prismaClient from '$/lib/db';
import { createSession, lucia } from '$/lib/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import * as argon from 'argon2';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof name !== 'string' || !name) {
			return fail(400, {
				message: 'Invalid name'
			});
		}

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

		if (user) {
			return fail(400, {
				message: '  '
			});
		}

		const hashedPassword = await argon.hash(password);

		try {
			const user = await prismaClient.user.create({
				data: {
					email: email,
					password: hashedPassword,
					name: name
				}
			});

			await createSession(user.id, event.cookies);
		} catch (e) {
			console.log(e);

			return fail(400, {
				message: 'Unexpected error in Sign Up'
			});
		}

		return redirect(302, '/');
	}
};
