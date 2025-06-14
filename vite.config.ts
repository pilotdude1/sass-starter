// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),

		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',

			// automatically update the SW when new deployment is available
			registerType: 'autoUpdate',

			// keep SW enabled in dev, but mute globbing warnings
			devOptions: {
				enabled: true,
				type: 'module',
				suppressWarnings: true
			},

			// your web-app manifest
			manifest: {
				name: 'SASS Starter',
				short_name: 'SASS',
				description: 'SASS Starter Application',
				theme_color: '#ffffff',
				icons: [
					{ src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
				]
			},

			// workbox runtime caching settings
			workbox: {
				cleanupOutdatedCaches: true,
				sourcemap: true
			},

			// tell Workbox where your authored SW is, and what to output
			injectManifest: {
				swSrc: 'src/service-worker.ts', // ← this file must exist
				swDest: 'service-worker.js' // ← output in your build root
			}
		})
	],

	// allow Vite to serve files from the project root
	server: {
		fs: {
			allow: ['.']
		}
	}
});
