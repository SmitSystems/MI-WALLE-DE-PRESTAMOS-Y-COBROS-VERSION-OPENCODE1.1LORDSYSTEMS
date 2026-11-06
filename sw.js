/* Préstamos y Cobros 4.0 — Service Worker
   - Guarda la app completa para funcionar sin internet.
   - estado.json NUNCA se guarda en caché: siempre se consulta a la red.
   - Las actualizaciones esperan a que el usuario las acepte. */
const VERSION = '4.0.3';
const CACHE = 'prestamos-cobros-' + VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.ico',
  './apple-touch-icon.png',
  './icon-32.png',
  './icon-48.png',
  './icon-72.png',
  './icon-96.png',
  './icon-128.png',
  './icon-144.png',
  './icon-152.png',
  './icon-180.png',
  './icon-192.png',
  './icon-256.png',
  './icon-384.png',
  './icon-512.png',
  './icon-1024.png',
  './icon-2048.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './screenshot-wide.png',
  './screenshot-mobile.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .catch(err => console.warn('No se pudo precargar todo el shell:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // El interruptor remoto siempre va a la red, jamás a la caché.
  if (url.pathname.endsWith('/estado.json') || url.pathname.endsWith('estado.json')) {
    event.respondWith(fetch(req, { cache: 'no-store' }));
    return;
  }

  // Navegación: red primero y, si falla o responde con error, la copia offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const cache = await caches.open(CACHE);
          cache.put('./index.html', res.clone());
          return res;
        }
        const cached = (await caches.match('./index.html')) || (await caches.match('./'));
        return cached || res;
      } catch (e) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Recursos propios: caché primero, actualizando en segundo plano.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) {
      fetch(req).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res));
      }).catch(() => {});
      return cached;
    }
    try {
      const res = await fetch(req);
      if (res && res.ok) {
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    } catch (e) {
      return new Response('Sin conexión', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || './index.html#prestamos';
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of all) {
      if ('focus' in client) {
        await client.focus();
        if ('navigate' in client) await client.navigate(target);
        return;
      }
    }
    if (clients.openWindow) await clients.openWindow(target);
  })());
});
