/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'secondary-dark': '#1C2128',
				'primary-dark': '#22272E',
				'third-dark': '#2D333B',
				'vs-dark': '#1E1E1E',
				'primary-light': '#ADBAC7',
				'primary-btn': '#7F74FF'
			}
		}
	},
	plugins: []
};
