// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Link } from '@prisma/client';
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
