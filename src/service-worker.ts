/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/info" />
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope & {
	__WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

// ✅ Prevent crash in dev mode
if (Array.isArray(self.__WB_MANIFEST)) {
	precacheAndRoute(self.__WB_MANIFEST);
} else {
	console.warn('⚠️ No precache manifest found – likely running in dev mode');
}
