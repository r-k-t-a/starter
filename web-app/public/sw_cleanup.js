/* eslint-disable no-restricted-globals */
self.addEventListener('message', (event) => {
  if (event.data === 'cleanup') {
    self.caches.delete(self.workbox.core.cacheNames.precache);
    self.registration.unregister();
  }
});
