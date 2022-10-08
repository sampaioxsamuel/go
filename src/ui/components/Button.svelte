<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';

	let classNames = '';
	export { classNames as class };

	const size = {
		small: 'text-sm',
		medium: 'text-base',
		large: 'text-xl'
	};

	const buttonClasses = cva(
		[
			'px-4 py-2 flex items-center justify-center border border-transparent',
			'font-medium',
			'disabled:opacity-80 disabled:cursor-not-allowed',
			'transition-all ease-in-out duration-300 rounded-xl'
		],
		{
			variants: {
				colorScheme: {
					primary: [
						'bg-gray-800 text-white hover:bg-gray-700 border border-gray-800',
						'focus-visible:ring focus-visible:ring-gray-400 focus-visible:outline-none'
					],
					red: [
						'bg-red-500 text-gray-50',
						'focus-visible:ring focus-visible:ring-red-300 focus-visible:outline-none'
					],
					base: [
						'border-gray-300 text-gray-900 hover:bg-gray-100 outline-none',
						'focus-visible:ring focus-visible:ring-fuchsia-400 focus-visible:border-fuchsia-600'
					],
					ghost:
						'focus-visible:ring focus-visible:ring-blue-400 focus-visible:border-blue-600 focus-visible:outline-none'
				},
				size
			},
			defaultVariants: {
				colorScheme: 'base'
			}
		}
	);

	const linkStyle = cva('whitespace-nowrap text-base font-medium', {
		variants: {
			size,
			colorScheme: {
				primary: 'text-gray-50 hover:text-gray-100',
				red: 'text-gray-800 hover:text-gray-600',
				base: 'text-white',
				ghost: ''
			}
		},
		defaultVariants: {
			colorScheme: 'base',
			size: 'medium'
		}
	});

	type Props = VariantProps<typeof buttonClasses>;

	export let colorScheme: Props['colorScheme'] = 'base';
	export let sizes: Props['size'] = undefined;
	export let href = '';
	export let type: 'button' | 'submit' = 'button';

	const dispatch = createEventDispatcher();

	function onClick(event: MouseEvent) {
		dispatch('click', event);
	}
</script>

{#if href}
	<a
		{href}
		on:click={onClick}
		class={linkStyle({
			colorScheme,
			size: sizes,
			class: classNames
		})}
	>
		<slot />
	</a>
{/if}

{#if !href}
	<button
		on:click={onClick}
		{type}
		class={buttonClasses({
			colorScheme,
			size: sizes,
			class: classNames
		})}
	>
		<slot />
	</button>
{/if}
