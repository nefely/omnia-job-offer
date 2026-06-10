var CACHE = 'pwa-v4';
var SHELL = [
    '/nefely/pwa2/',
    '/nefely/pwa2/index.html',
    '/nefely/pwa2/css/style.css',
    '/nefely/pwa2/js/scripts.js',
    '/nefely/pwa2/js/jquery-3.6.4.min.js',
    '/nefely/pwa2/192.png',
    '/nefely/pwa2/512.png'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE).then(function(c) { return c.addAll(SHELL); }).then(function() { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
        }).then(function() { return self.clients.claim(); })
    );
});

self.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'OPEN_APP') {
        e.waitUntil(clients.openWindow('/nefely/pwa2/'));
    }
});

self.addEventListener('fetch', function(e) {
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request).catch(function() { return caches.match('/nefely/pwa2/'); })
        );
        return;
    }
    e.respondWith(
        caches.match(e.request).then(function(cached) { return cached || fetch(e.request); })
    );
});
