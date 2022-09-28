var cacheName = "cache-pwa-app";

self.addEventListener("install", function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      "/",
      "/index.html",
      "/manifest.json",
      "/app.css",
      "/style.js",
      "/scripts.css",
      "/assets/add.png",
      "/assets/airplane.png",
      "/assets/bus.png",
      "/assets/car.png",
      "/assets/dolar.png",
      "/assets/edit.png",
      "/assets/money-bag.png",
      "/assets/remove.png",
      "/assets/screenshots/01.jpg",
      "/assets/screenshots/02.jpg",
      "/assets/screenshots/03.jpg",
      "/assets/screenshots/04.jpg",
      "/assets/screenshots/05.jpg",
    ]);
  });
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;
      return fetch(event.request).then((recurso) => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});
