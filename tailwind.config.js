import flowbite from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				'secondary-dark': '#1C2128',
				'primary-dark': '#22272E',
				'third-dark': '#2D333B',
				'vs-dark': '#1E1E1E',
				'primary-light': '#ADBAC7',
				'primary-btn': '#7F74FF',
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				}
			}
		}
	},
	plugins: [flowbite()]
};
