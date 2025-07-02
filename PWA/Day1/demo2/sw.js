const filesToCache = [
    'index.html',
    'css/main.css',
    'page1.html',
    'offline.html',
    'wrong-url.html'
]

const staticDB = 'CacheDB';

//**
// what instaling do exexute code or read to scan it to execute */
self.addEventListener('install', event => {
    console.log('service worker installing', event);
    self.skipWaiting()
    event.waitUntil(
        caches.open(staticDB)
            .then(cache => {
                return cache.addAll(filesToCache)
            })
            .catch(err => {
                console.log(err);
            })
    )
})



self.addEventListener('activate', event => {
    console.log('service worker activating', event);

})

self.addEventListener('fetch', event => {
    console.log("fetching... ", event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('found in cache', event.request);
                    return response
                }
                return fetch(event.request).then(fetchRes => {
                    if (event.request.method === 'GET' && fetchRes.status === 200) {
                        const responseClone = fetchRes.clone();
                        caches.open(staticDB).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    if (fetchRes.status === 404 && event.request.mode === 'navigate') {
                        return caches.match('wrong-url.html');
                    }
                    return fetchRes;
                }).catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('offline.html');
                    }
                });
            })
    )
})