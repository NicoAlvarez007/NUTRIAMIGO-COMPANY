const CACHE_NAME = 'nutriamigo-v10';
const CORE_ASSETS = [
  './', './index.html', './dashboard.html', './onboarding.html', './alimentacion.html',
  './entrenamiento.html', './comunidad.html', './premium.html',
  './css/styles.css', './css/app.css', './css/chat.css', './css/onboarding.css', './css/community.css',
  './js/script.js', './js/app.js', './js/faq-bot.js', './js/demo-mode.js', './js/calorias.js',
  './js/plan-shared.js', './js/ads.js', './js/settings.js', './js/pwa.js',
  './js/dashboard.js', './js/alimentacion.js', './js/entrenamiento.js', './js/comunidad.js', './js/onboarding.js',
  './data/meals.js', './data/workouts.js', './data/faq.js',
  './manifest.json', './assets/logo.png', './assets/icon-192.png', './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/') || event.request.url.includes('/socket.io/')) return;

  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() => caches.match('./index.html'))
    )
  );
});
