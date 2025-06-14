// svelte.config.js
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Enable PostCSS/Tailwind inside .svelte files
	preprocess: preprocess({ postcss: true }),

	kit: {
		// Use the Node adapter
		adapter: adapter()

		// Any other kit options (aliased paths, etc) go here
	}
};

export default config;
