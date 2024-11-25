import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			strict: false
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/exle-svelte' : ''
		}
	}
};

export default config;
