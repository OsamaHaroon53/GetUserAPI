var cacheName = "app0";
var getUser = "Users"
var filesToAdd = [
    '/index.html',
    '/app.js',
    '/'
];
self.addEventListener('install', function (e) {
    console.log("SW installed succesfully");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("ServiceWorker caches succesfully");
            return cache.addAll(filesToAdd);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

self.addEventListener('fetch', function (e) {
    if(e.request.url.startsWith("https://api.github.com")){
        caches.match(getUser)
        .then(function(res){
            return res || fetch(e.request)
            .then(function(response){
            caches.open(getUser).then(function (cache) {
            console.log("Update caches succesfully");
            cache.put(getUser,response);
            
            })
        })
        });
    }
    else{
        e.respondWith(
            caches.match(e.request).then(function(res){
                return res || fetch(e.request);
            })
        );
    }
    
});