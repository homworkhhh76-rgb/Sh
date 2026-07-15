const CACHE_NAME = 'cash-top-v8-20260714';
const APP_SHELL = [
  './',
  './index.html',
  './charge_point_app.html',
  './style.css',
  './app.js',
  './sync.js',
  './firebase-config.js',
  './manifest.json',
  './logo.png',
  './logo-192.png',
  './logo-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;
  const url = new URL(request.url);

  if(request.mode === 'navigate'){
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy=response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  if(url.origin === self.location.origin){
    event.respondWith(
      caches.match(request).then(cached => {
        const network = fetch(request).then(response => {
          if(response && response.ok){
            const copy=response.clone();
            caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));
          }
          return response;
        }).catch(()=>cached);
        return cached || network;
      })
    );
  }
});