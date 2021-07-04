importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
    apiKey: '************',
    authDomain: '************',
    projectId: '************',
    storageBucket: '************',
    messagingSenderId: '************',
    appId: '************',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
