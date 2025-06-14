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

			// Inject your custom service worker
			injectManifest: {
				swSrc: 'src/service-worker.ts',
				swDest: 'service-worker.js'
			},

			// Development options
			devOptions: {
				enabled: true,
				type: 'module',
				suppressWarnings: true
			},

			// PWA manifest config
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

			// Workbox runtime caching
			workbox: {
				cleanupOutdatedCaches: true,
				sourcemap: true
			}
		})
	],

	// Optional: Allow Vite to read files outside root
	server: {
		fs: {
			allow: ['.']
		}
	}
});
