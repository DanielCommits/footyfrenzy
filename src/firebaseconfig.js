// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrd_ft12I5BsGJS2aFjIk4R-u7QosMc5I",
  authDomain: "footyfrenzy-682fe.firebaseapp.com",
  projectId: "footyfrenzy-682fe",
  storageBucket: "footyfrenzy-682fe.firebasestorage.app",
  messagingSenderId: "768938777486",
  appId: "1:768938777486:web:b8fcd25cd4bd273cdb62df",
  measurementId: "G-GX88Y4X9W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);