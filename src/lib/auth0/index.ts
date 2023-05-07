// import type { PopupLoginOptions } from '@auth0/auth0-spa-js';
// import createAuth0Client from '@auth0/auth0-spa-js';

// import { isAuthenticated, loging, popupOpen, user } from '$/store';
// import { fetchUser } from '$/utils/api';

// async function createClient() {
// 	const auth0Client = await createAuth0Client({
// 		domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
// 		client_id: import.meta.env.VITE_APP_CLIENT_ID as string
// 	});

// 	return auth0Client;
// }

// async function loginWithPopup(options?: PopupLoginOptions) {
// 	popupOpen.set(true);

// 	const clientId = await createClient();

// 	try {
// 		await clientId.loginWithPopup({
// 			redirect_uri: window.location.origin,
// 			...options
// 		});

// 		const userData = await fetchUser();

// 		user.set(userData.user);
// 		isAuthenticated.set(userData.isAuthenticated);
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		popupOpen.set(false);
// 	}
// }

// async function logout() {
// 	const clientId = await createClient();

// 	isAuthenticated.set(false);
// 	user.set(undefined);
// 	clientId.logout();
// }

// async function getUser() {
// 	try {
// 		loging.set(true);

// 		const userData = await fetchUser();

// 		isAuthenticated.set(userData.isAuthenticated);
// 		user.set(userData.user);
// 	} catch (e) {
// 		console.trace(e);
// 	} finally {
// 		loging.set(false);
// 	}
// }

// const auth = {
// 	createClient,
// 	loginWithPopup,
// 	logout,
// 	getUser
// };

// export default auth;
