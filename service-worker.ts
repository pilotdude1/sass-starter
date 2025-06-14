// src/service-worker.ts
/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any[] };

// placeholder for Workbox to inject into
precacheAndRoute(self.__WB_MANIFEST);

// any runtime handlers…
