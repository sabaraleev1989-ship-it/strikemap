const CACHE_NAME = 'scorpion-tactical-v1';
const ASSETS = [
  './',
  './index.html', // Проверь, что твой основной файл называется именно так
  './logo1.png',
  './logo2.png',
  './logo3.png',
  './logo4.png',
  'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js'
];

// Установка: скачиваем все файлы в кеш
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация: чистим старый кеш, если версия изменилась
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Перехват запросов: сначала смотрим в кеше, если нет — идем в интернет
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
