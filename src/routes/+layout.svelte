<script lang="ts">
	import '../app.css';
	import { registerSW } from 'virtual:pwa-register';
	import { browser } from '$app/environment';

	let { children } = $props();

	// Register service worker only on client side
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
	<!-- PWA manifest -->
	<link rel="manifest" href="/manifest.webmanifest" />
	<!-- Optional: match your manifest theme_color -->
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<main>
	{@render children()}
</main>
