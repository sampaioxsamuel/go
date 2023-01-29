import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [GitHub({ clientId: AUTH_CLIENT_ID, clientSecret: AUTH_CLIENT_SECRET })]
});
