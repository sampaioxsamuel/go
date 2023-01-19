import { json } from '@sveltejs/kit';
import type { ZodError } from 'zod';

export type JsonResponseType<T = any> =
	| {
			data?: T;
			message?: string;
			error?: never;
	  }
	| {
			data?: never;
			message?: string;
			error?: {
				message: string;
				path: string;
			}[];
	  };

export function jsonResponse<T>(data: JsonResponseType<T>, status: number) {
	return json(data, { status });
}

export function transformError<Schema>(validation: ZodError<Schema>) {
	return validation.errors.map((error) => ({
		path: error.path.join(''),
		message: error.message
	}));
}
