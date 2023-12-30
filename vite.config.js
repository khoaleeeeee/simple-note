import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	server: {
		host: true,
		port: 8000,
		proxy: {
			'/api': {
				target: 'http://localhost:8001'
			}
		}
	}
};

export default config;
