/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

/**
 * Workbox will replace __WB_MANIFEST with
 * an array of URLs to precache.
 */
declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any[] };

// Precache the build’s asset manifest
precacheAndRoute(self.__WB_MANIFEST);

// (Optional) runtime caching example for images
registerRoute(({ request }) => request.destination === 'image', new StaleWhileRevalidate());
