import axios, { AxiosError } from 'axios';

export async function createLink(data: FormData) {
	const slug = data.get('slug');
	const to = data.get('to');

	try {
		const { data } = await axios.post('/api/link', {
			data: {
				slug,
				to
			}
		});

		return {
			data,
			status: 200
		};
	} catch (e) {
		const parsedError = e as AxiosError;

		return {
			message: parsedError.response?.data,
			status: parsedError.response?.status
		};
	}
}
