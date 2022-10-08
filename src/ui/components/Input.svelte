<script lang="ts">
	import clsx from 'clsx';

	const styling = {
		base: 'w-full py-3 px-4 ease-in-out duration-300 transition-all border border-gray-200 rounded-xl outline-none',
		colorScheme: {
			default: [
				'hover:ring-2 hover:ring-pink-100 hover:border-pink-400',
				'focus-visible:ring-4 focus-visible:ring-pink-200 focus-visible:border-pink-500',
				'disabled:opacity-70 disabled:hover:ring-0 disabled:hover:border-gray-200'
			]
		}
	};

	type ColorScheme = keyof typeof styling['colorScheme'];

	export let placeholder = '';
	export let id: string;
	export let colorScheme: ColorScheme = 'default';
	export let type: HTMLInputElement['type'];

	const classes = clsx([styling.base, styling.colorScheme[colorScheme]]);

	export let elementRef: null | HTMLInputElement = null;
</script>

<input {...$$props} bind:this={elementRef} {type} {id} name={id} class={classes} {placeholder} />
