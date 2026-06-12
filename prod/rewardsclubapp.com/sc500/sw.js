const CACHE = 'pwa-v17';
const BASE = '/sc500';
const ASSETS = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/style.css?v=17`,
    `${BASE}/script.js?v=17`,
    `${BASE}/manifest.json?v=17`,
    `${BASE}/192.png?v=17`,
    `${BASE}/512.png?v=17`,
    `${BASE}/img/wheel.webp?v=17`,
    `${BASE}/img/button.webp?v=17`,
    `${BASE}/img/arrow.webp?v=17`,
    `${BASE}/img/box.webp?v=17`,
    `${BASE}/img/card.webp?v=17`,
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request).catch(() => caches.match(`${BASE}/`))
        );
        return;
    }
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
