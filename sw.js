// Service worker básico para habilitar PWA
self.addEventListener('install', (e) => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
