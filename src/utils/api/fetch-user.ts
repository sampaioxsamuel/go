// // import auth from '$/lib/auth0';
// import axios from 'axios';

// export async function fetchUser() {
// 	// const client = await auth.createClient();
// 	// const isAuthenticated = await client.isAuthenticated();

// 	if (!isAuthenticated) {
// 		return { user: null, isAuthenticated: false };
// 	}

// 	// const auth0User = await client.getUser();

// 	try {
// 		const { data } = await axios.post('/api/user', {
// 			data: auth0User
// 		});

// 		return { user: data.data, isAuthenticated };
// 	} catch (e) {
// 		console.trace(e);

// 		return { user: null, isAuthenticated: false };
// 	}
// }
