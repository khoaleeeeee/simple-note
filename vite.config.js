import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 8000
	},
	build: {
		rollupOptions: {
			external: ['crypto-js']
		}
	}
};

export default config;
