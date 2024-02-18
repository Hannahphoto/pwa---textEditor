
const { StaleWhileRevalidate } = require('workbox-strategies');
const {warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Implement asset caching
registerRoute(
  //Define callback function that will filter the requests we want to cache (JS & CSS files
  ({request})=>['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    //Name of cache storage
    cacheName: 'asset-cache',
    plugins: [
      //This plug-m will cache response with these headers to maximum age of 30 days
      new CacheableResponsePlugin({
        statuses: [0,200],
      }),
    ],
  })
  );

