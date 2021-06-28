'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "dfb5077a9dd8a41b917ba6c7e93af3df",
"assets/assets/fonts/Almarai-Bold.ttf": "62027b7aa5859e5ecdf9a09a5ee7cdac",
"assets/assets/fonts/Almarai-ExtraBold.ttf": "20c3062a86935ec6b5e50d70b3af45bb",
"assets/assets/fonts/Almarai-Light.ttf": "484f968404893edf87a29965d05711d3",
"assets/assets/fonts/Almarai-Regular.ttf": "a19edc26bbe86c6fd4921f2b4cc3477e",
"assets/assets/images/deli.png": "3e4f52de1863ee4022b6bc88572823ac",
"assets/assets/images/deliveryBoyRunning.gif": "17ea1d4c8c493a4e78c474da4712baf2",
"assets/assets/images/for-final-exportpng.png": "5cc04f5448a760558234a5134c98211a",
"assets/assets/images/home_screen_no_bg.gif": "c3f1dd199fa176d2fd74d2ecb363d4a8",
"assets/assets/images/icon_for_manager.png": "69f0e8abccc5c8f3858923e3fd76246e",
"assets/assets/images/labeeny_icon.png": "1d0a766486600af52fd099dbc174f1f8",
"assets/assets/images/labeeny_icon2.svg": "ce6496436f44c9c7fa4a4a5d4a4a0767",
"assets/assets/images/labeeny_icon3.png": "e348d471e7d5314c11046bce500925c0",
"assets/assets/images/logo-icon.png": "01d613543de7ec25ede6d0a6e6cc688c",
"assets/assets/images/Logo_labeeny_black.svg": "a3cb267ceb47e98ee5694e3d71071b10",
"assets/assets/images/managermanagement.png": "614e0ee666c91a19145bf6c1eef6f277",
"assets/assets/images/MapSyria.png": "49eef48eae9a6290924c0fbeb9a95d98",
"assets/assets/images/oops.png": "3dd36ace50670e88cf8440c82eb00b96",
"assets/assets/images/product_size_images/L_DARK.png": "e51f631bfc7c646ff554d560cfa58312",
"assets/assets/images/product_size_images/L_LIGHT.png": "c006844380f4ab31a86d76da343badb8",
"assets/assets/images/product_size_images/M_DARK.png": "a2b047f106e141ff256b9023ea2dc700",
"assets/assets/images/product_size_images/M_LIGHT.png": "3baafc28219858ca374e6ca9ef4281e9",
"assets/assets/images/product_size_images/S_DARK.png": "05f0bfea8f4030ba98aae76026e55710",
"assets/assets/images/product_size_images/S_LIGHT.png": "468ac1e1b19a7cd808e1694a6a401097",
"assets/assets/images/product_size_images/XL_DARK.png": "b14eec57dcbaa7587f4f4286d28074cf",
"assets/assets/images/product_size_images/XL_LIGHT.png": "f65c1471bcdec32da24758d79b5fed98",
"assets/assets/images/product_size_images/XS_DARK.png": "8bc3514e233d543766789ee98b1d0bf4",
"assets/assets/images/product_size_images/XS_LIGHT.png": "381c3ab5db88811cfcfa726a7af0d2f5",
"assets/assets/images/product_size_images/XXL_DARK.png": "b52cb60f88256138fda1e47deb3940a6",
"assets/assets/images/product_size_images/XXL_LIGHT.png": "57a43bfb651b5ac699ee7666af5a1ff9",
"assets/assets/images/product_size_images/XXS_DARK.png": "fb1793a7e90689864d989d643d0f7f24",
"assets/assets/images/product_size_images/XXS_LIGHT.png": "72f42ee8ea61c90206d4808840853c19",
"assets/assets/images/sadanimation.gif": "b1969a9a05bbea0fe3c91668111dc097",
"assets/assets/images/sd.gif": "19dc44ca501c14db5c43ac3fcca57e65",
"assets/FontManifest.json": "99b83368cc269b0d176e5eaaf0604bec",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "c92c83944a0b92fb78595a72edbc01a9",
"assets/packages/community_material_icon/fonts/materialdesignicons-webfont.ttf": "174c02fc4609e8fc4389f5d21f16a296",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "7e766902727ecb941a09b9287154e01d",
"/": "7e766902727ecb941a09b9287154e01d",
"main.dart.js": "23999ef5bfe40751881f0c535ca94c4f",
"manifest.json": "ee85d0827d188da221bde6e26bfd85e6",
"version.json": "8802d5e631023df08df36319fca7a632"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
