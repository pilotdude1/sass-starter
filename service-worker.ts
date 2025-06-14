/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/info" />
import { precacheAndRoute } from 'workbox-precaching';

// ✅ Safe global self type with injected manifest from VitePWA
declare const self: ServiceWorkerGlobalScope & {
	__WB_MANIFEST: Array<{
		url: string;
		revision: string | null;
	}>;
};

// ✅ Only run precaching in production (Vite injects manifest only on build)
if (Array.isArray(self.__WB_MANIFEST)) {
	precacheAndRoute(self.__WB_MANIFEST);
} else {
	console.warn('⚠️ No precache manifest found. Likely running in dev mode.');
}
