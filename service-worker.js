const VERSION = 'juice-pos-v7-cashtop-rest';
const CORE_CACHE = `${VERSION}-core`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const ALL_CACHES = [CORE_CACHE, RUNTIME_CACHE];
const INDEX_URL = new URL('./index.html', self.location.href).href;

const APP_SHELL = [
  './index.html',
  './firebase-config.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

const STATIC_EXTERNAL_HOSTS = new Set([
  'cdn.tailwindcss.com',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net',
  'www.gstatic.com'
]);

function isDataApi(url) {
  return url.hostname === 'cash-top-api-2026.vercel.app' ||
    url.hostname.endsWith('.firebaseio.com') ||
    url.hostname.endsWith('.firebasedatabase.app') ||
    url.hostname === 'firestore.googleapis.com' ||
    url.hostname.endsWith('.firestore.googleapis.com');
}

async function putIfCacheable(cacheName, request, response) {
  if (!response || !(response.ok || response.type === 'opaque')) return response;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  return response;
}

async function updateInBackground(request, cacheName) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    await putIfCacheable(cacheName, request, response);
    return response;
  } catch (_) {
    return null;
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE_CACHE);
    await Promise.allSettled(APP_SHELL.map(url => cache.add(new Request(url, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !ALL_CACHES.includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'CLEAR_RUNTIME_CACHE') event.waitUntil(caches.delete(RUNTIME_CACHE));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // طلبات قاعدة البيانات لا تدخل كاش الـ Service Worker.
  if (isDataApi(url)) return;

  // Cache First للتنقل: افتح التطبيق فوراً من الكاش حتى مع وجود الإنترنت،
  // ثم حدّث index.html في الخلفية للفتحة التالية.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cached = await caches.match(INDEX_URL);
      const refresh = updateInBackground(new Request(INDEX_URL, { cache: 'no-store' }), CORE_CACHE);
      if (cached) {
        event.waitUntil(refresh);
        return cached;
      }
      const network = await refresh;
      return network || new Response('التطبيق غير متوفر حالياً. افتحه مرة واحدة مع الإنترنت لتجهيز الكاش.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })());
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const externalStatic = STATIC_EXTERNAL_HOSTS.has(url.hostname);
  if (!sameOrigin && !externalStatic) return;

  // Cache First + تحديث صامت في الخلفية للملفات المحلية ومكتبات الواجهة.
  event.respondWith((async () => {
    const cacheName = sameOrigin ? CORE_CACHE : RUNTIME_CACHE;
    const cached = await caches.match(request);
    const refresh = updateInBackground(request, cacheName);
    if (cached) {
      event.waitUntil(refresh);
      return cached;
    }
    const network = await refresh;
    return network || Response.error();
  })());
});
