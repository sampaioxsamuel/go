import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismaClient from './lib/prisma';

export const handle = SvelteKitAuth({
	// https://github.com/nextauthjs/next-auth/issues/6174
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	providers: [GitHub({ clientId: AUTH_CLIENT_ID, clientSecret: AUTH_CLIENT_SECRET })],
	adapter: PrismaAdapter(prismaClient)
});
