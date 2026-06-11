const CACHE = 'pwa-v7';
const BASE = '/nefely/omnia-job-offer/pwa-template/sams-club-500';
const ASSETS = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/style.css?v=7`,
    `${BASE}/script.js?v=7`,
    `${BASE}/manifest.json?v=7`,
    `${BASE}/192.png?v=7`,
    `${BASE}/512.png?v=7`,
    `${BASE}/img/logo.svg?v=7`,
    `${BASE}/img/wheel.webp?v=7`,
    `${BASE}/img/button.webp?v=7`,
    `${BASE}/img/arrow.webp?v=7`,
    `${BASE}/img/box.webp?v=7`,
    `${BASE}/img/card.webp?v=7`,
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
