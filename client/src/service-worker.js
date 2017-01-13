/**
 * More in detail info about service worker and sw-toolbox usage on
 * https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 */

'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
