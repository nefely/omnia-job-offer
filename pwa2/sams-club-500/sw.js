const CACHE = 'pwa-v8';
const BASE = '/nefely/omnia-job-offer/pwa-template/sams-club-500';
const ASSETS = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/style.css?v=8`,
    `${BASE}/script.js?v=8`,
    `${BASE}/manifest.json?v=8`,
    `${BASE}/192.png?v=8`,
    `${BASE}/512.png?v=8`,
    `${BASE}/img/logo.svg?v=8`,
    `${BASE}/img/wheel.webp?v=8`,
    `${BASE}/img/button.webp?v=8`,
    `${BASE}/img/arrow.webp?v=8`,
    `${BASE}/img/box.webp?v=8`,
    `${BASE}/img/card.webp?v=8`,
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
