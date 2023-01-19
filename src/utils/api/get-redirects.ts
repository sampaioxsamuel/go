import axios, { type AxiosError } from 'axios';

export async function getRedirects() {
	try {
		const { data } = await axios.get(`/api/link`);

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
