// set $page.data.user to all routes using the current layout
export const load = async ({ locals }) => {
	return {
		user: locals.user
	};
};
