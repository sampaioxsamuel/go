import { json } from '@sveltejs/kit';

export type JsonResponseType =
	| {
			data?: any;
			message?: string;
			error?: never;
	  }
	| {
			data?: never;
			message?: string;
			error?: {
				status: number;
				body: any;
			};
	  };

const JsonResponse = (data: JsonResponseType, status: number) => {
	return json(data, { status });
};

export default JsonResponse;
