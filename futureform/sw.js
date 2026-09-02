// FutureForm service worker — offline; HTML/JS/CSS: sieć-najpierw, reszta: cache-najpierw
const CACHE = 'futureform-v3';
const ASSETS = [
  '.', 'index.html', 'css/style.css', 'icon.svg', 'manifest.webmanifest',
  'js/norms-data.js', 'js/i18n.js', 'js/exercises.js', 'js/engine.js', 'js/app.js'
];
self.addEventListener('install', e => {
  // cache:'reload' omija cache HTTP przeglądarki — inaczej instalacja może zapisać stare pliki
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (req, res) => {
  if (res.ok && new URL(req.url).origin === location.origin) {
    const clone = res.clone();
    caches.open(CACHE).then(c => c.put(req, clone));
  }
  return res;
};
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Nawigacje (HTML) i skrypty: sieć najpierw, cache jako zapas offline.
  // Inaczej po aktualizacji przeglądarka pokazuje starą wersję aż do drugiego odświeżenia.
  const req = e.request;
  const fresh = req.mode === 'navigate' || ['document', 'script', 'style'].includes(req.destination);
  if (fresh) {
    e.respondWith(
      fetch(req).then(res => put(req, res))
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true })
      .then(hit => hit || fetch(req).then(res => put(req, res)))
  );
});
