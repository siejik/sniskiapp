// Nama "gudang penyimpanan" offline, boleh diganti bebas
const CACHE_NAME = 'app-cache-v1';

// Daftar file yang mau disimpan biar bisa dibuka walau offline
const FILES_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Pas app pertama kali diinstall, simpan semua file di atas
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Pas app dibuka, coba ambil dari gudang offline dulu,
// kalau gak ada baru ambil dari internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
