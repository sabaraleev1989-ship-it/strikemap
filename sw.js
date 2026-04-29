const CACHE_NAME = 'scorpion-tactical-v2';
// Список всех файлов, которые нужны приложению
const ASSETS = [
  './',
  './index.html',
  './logo3.png',           // Твой стартовый экран
  './logo1.png',           // Полигон 1
  './logo2.png',           // Полигон 2
  'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js'
];

// Установка: кэшируем все ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кэширование ресурсов...');
      return cache.addAll(ASSETS);
    })
  );
});

// Активация: удаляем старые версии кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// Перехват запросов: сначала смотрим в кэше, потом в сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
