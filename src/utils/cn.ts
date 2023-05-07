import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...a: ClassValue[]) {
	return twMerge(clsx(a));
}
