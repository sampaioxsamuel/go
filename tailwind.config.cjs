/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/**/**/*.{html,js,svelte,ts}',
		'./src/**/**/**/*.{html,js,svelte,ts}'
	],
	theme: {
		fontFamily: {
			sans: [
				'Inter',
				'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
			]
		},
		extend: {
			boxShadow: {
				default: '0 0 0 3px rgba(66, 153, 225, 0.6)',
				dark: '0 0 0 3px rgb(135 135 135 / 60%)',
				rose: '0 0 0 3px rgb(234 76 137 / 10%)'
			}
		}
	},
	plugins: []
};
