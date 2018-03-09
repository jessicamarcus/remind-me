importScripts('./workbox-sw.js');

const workbox = new WorkboxSW({
    clientsClaim: true,
    skipWaiting: true
});

const notificationOptions = {
    requireInteraction: true,
    vibrate: [ 300, 100, 500 ],
    actions: [
        { action: 'snooze', title: 'Snooze'}
    ]
};

// https://developers.google.com/web/tools/workbox/guides/common-recipes
workbox.router.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
        cacheName: 'googleapis',
        // plugins: [
        //     new workbox.expiration.Plugin({
        //         maxEntries: 30,
        //     }),
        // ],
    }),
);

workbox.precache([]);

self.addEventListener('message', event => {
    event.waitUntil(registerNotification(event.data.message, event.data.delay));
});

self.addEventListener('notificationclick', event => {
    if (event.action === 'snooze') snoozeNotification(event);
});

function snoozeNotification(event) {
    console.log(`snoozed ${event.data}`);
}

function registerNotification(message, delay) {
    const options = {
        ...notificationOptions,
        body: message
    };

    setTimeout(() => {
        return new Promise((resolve, reject) => {
            resolve(self.registration.showNotification('Don’t forget!', options));
        });
    }, delay);
}

