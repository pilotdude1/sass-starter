<script lang="ts">
	import '../app.css';
	import { registerSW } from 'virtual:pwa-register';
	import { browser } from '$app/environment';

	if (browser) {
		const updateSW = registerSW({
			onNeedRefresh() {
				if (confirm('New content available. Reload?')) {
					updateSW();
				}
			},
			onOfflineReady() {
				console.log('App ready to work offline');
			}
		});
	}
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<main>
	<slot />
	<!-- 🔥 This is how SvelteKit renders child routes -->
</main>
