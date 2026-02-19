const CACHE_VERSION = "v3";
const CACHE_NAME = `james-neely-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/experience",
  "/education",
  "/skills",
  "/projects",
  "/tools",
  "/contact",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const AD_NETWORK_DOMAINS = [
  "googlesyndication.com",
  "googleadservices.com",
  "doubleclick.net",
  "fundingchoicesmessages.google.com",
];

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (AD_NETWORK_DOMAINS.some((domain) => url.hostname.endsWith(domain))) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      caches
        .match(request)
        .then((cached) => cached || fetch(request))
        .catch(() => caches.match("/")),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
      return cached || networkFetch;
    }),
  );
});
