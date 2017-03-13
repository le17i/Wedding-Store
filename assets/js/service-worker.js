var filesCacheName = 'ws-files';
var externalFilesCacheName = 'ws-external-files';
var dataCacheName = 'ws-data';

var filesToCache = [
    '/',
    '/assets/images/icon-144.png',
    '/assets/css/align.css',
    '/assets/css/buttons.css',
    '/assets/css/forms.css',
    '/assets/css/list.css',
    '/assets/css/theme.css',
    '/assets/css/titles.css',
    '/assets/css/toolbar.css',
    '/vendor/angular/angular.min.js',
    '/app/admin.js',
    '/app/main.js',
    '/app/store.js',
    '/assets/js/bootstrap.js'
];

var externalFilesToCache = [
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

var dataRequestsToCache = '/api/public';

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(filesCacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');

    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== filesCacheName && key !== externalFilesCacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetch', e.request.url);
    // if(externalFilesToCache.indexOf(e.request.url) > -1) {
    //     console.trace('external files');
    //     e.respondWith(
    //         caches.open(externalFilesCacheName).then(function(cache) {
    //             return fetch(e.request).then(function(response){
    //                 cache.put(e.request.url, response.clone());
    //                 return response;
    //             });
    //         })
    //     );
    // } else
    if(e.request.url.indexOf(dataRequestsToCache) > -1) {
        console.trace('data cache');
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        console.trace();
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});
