importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCoKoDJjLqUgFW30FPeGft9yt95AOCUPsY",
  authDomain: "alhaya-travel.firebaseapp.com",
  projectId: "alhaya-travel",
  storageBucket: "alhaya-travel.firebasestorage.app",
  messagingSenderId: "990194431037",
  appId: "1:990194431037:web:843500911743f7a9f1e654",
  measurementId: "G-3RG9Q10E83"
});

const messaging = firebase.messaging();

// استقبال الإشعارات عندما تكون الصفحة مغلقة
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title || 'ALHAYAT TRAVEL';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
