import { writable, type Writable } from 'svelte/store';

import type { Auth0Client } from '@auth0/auth0-spa-js';
import type { User } from '@prisma/client';

export const isAuthenticated = writable(false);
export const user: Writable<undefined | User> = writable(undefined);
export const popupOpen = writable(false);
export const error = writable('');
export const loging = writable(true);
export const auth0Client = writable({} as Auth0Client);
