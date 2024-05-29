<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	const styling = {
		base: ['disabled:opacity-80 disabled:cursor-not-allowed transition-all'],
		sizes: {
			small: 'text-sm',
			medium: 'text-base',
			large: 'text-xl',
			extraLarge: 'text-2xl'
		},
		variants: {
			link: 'whitespace-nowrap ',
			solid: [
				'font-medium px-6 py-2 border border-transparent rounded-md',
				'ease-in-out duration-300 flex items-center justify-center'
			]
		},
		colorSchemes: {
			base: {
				link: 'text-white',
				solid: [
					'border border-gray-300 text-gray-900',
					'hover:bg-gray-100',
					'focus-visible:ring focus-visible:ring-gray-200 focus-visible:border-gray-400 outline-none'
				]
			},
			primary: {
				link: 'text-gray-800',
				solid: [
					'bg-zinc-900 text-white hover:bg-zinc-800 hover:border-zinc-800 border border-zinc-900',
					'focus-visible:ring focus-visible:ring-zinc-400 outline-none'
				]
			},
			red: {
				link: 'text-red-500 focus-visible:ring focus-visible:ring-red-300 focus-visible:outline-none',
				solid: [
					'bg-red-500 text-gray-50',
					'focus-visible:ring focus-visible:ring-red-300 focus-visible:outline-none'
				]
			},
			lightRed: {
				link: '',
				solid: [
					'bg-red-100 text-red-600 font-semibold',
					'hover:bg-red-200 focus-visible:ring focus-visible:ring-red-200 focus-visible:outline-none'
				]
			},
			sign: {
				link: '',
				solid: [
					'bg-zinc-100 text-zinc-900 focus-visible:outline-none font-semibold',
					'hover:bg-zinc-200'
				]
			}
		}
	};

	let classNames = '';
	export { classNames as class };

	type ColorScheme = keyof (typeof styling)['colorSchemes'];
	type Variant = keyof (typeof styling)['variants'];
	type Size = keyof (typeof styling)['sizes'];

	export let colorScheme: ColorScheme = 'base';
	export let variant: Variant = 'link';
	export let size: Size = 'medium';

	const classes = clsx([
		classNames,
		styling.base,
		styling.sizes[size],
		styling.variants[variant],
		styling.colorSchemes[colorScheme][variant]
	]);

	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' = 'button';

	const dispatch = createEventDispatcher();

	function onClick(event: MouseEvent) {
		dispatch('click', event);
	}
</script>

{#if href}
	<a class={classes} {href} on:click={onClick}>
		<slot />
	</a>
{/if}

{#if !href}
	<button class={classes} on:click={onClick} {type}>
		<slot />
	</button>
{/if}
