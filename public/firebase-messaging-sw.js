importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    messagingSenderId: '1081734645922',
    projectId: 'my-student-sidekick',
    apiKey: 'AIzaSyDj4CGLkkeGLzs0fjjTvm_IJDpmvFnNjKo',
    appId: '1:1081734645922:web:adc96305eeb71596ca2ffb',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
