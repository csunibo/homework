const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				cartabinaria: {
					primary: '#971327',
					secondary: '#EA8C55',
					accent: '#4281A4',
					neutral: '#02111B',
					'base-100': '#F1FAEE'
				},
				cartabinaria_dark: {
					primary: '#971327',
					secondary: '#EA8C55',
					accent: '#4281A4',
					'base-100': '#02111B',
					neutral: '#F1FAEE'
				}
			}
		],
		darkTheme: 'cartabinaria_dark'
	},
	plugins: [
		// Iconify plugin
		addDynamicIconSelectors(),
		require('daisyui')
	]
};
