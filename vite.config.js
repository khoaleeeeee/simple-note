import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 8000
	},
	resolve: {
		alias: {
			'crypto-js': resolve(__dirname, 'node_modules/crypto-js')
		}
	},
	build: {
		rollupOptions: {
			external: ['crypto-js']
		}
	}
};

export default config;
