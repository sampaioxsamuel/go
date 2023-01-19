import axios, { type AxiosError } from 'axios';

export async function deleteLink(id: number) {
	try {
		const { data } = await axios.delete(`/api/link/${id}`);

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
