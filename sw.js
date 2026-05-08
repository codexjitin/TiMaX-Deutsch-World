// Service Worker for PWA support
// Cache logic removed so the site always loads fresh assets from the network.

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
