import axios, { type AxiosError } from 'axios';
import slugify from 'slugify';

export async function createLink(data: FormData) {
	const slug = data.get('slug') as string;
	const to = data.get('to') as string;

	try {
		const { data } = await axios.post('/api/link', {
			data: {
				slug: slugify(slug, { lower: true }),
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
