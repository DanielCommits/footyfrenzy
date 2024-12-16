// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import getFirestore
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrd_ft12I5BsGJS2aFjIk4R-u7QosMc5I",
  authDomain: "footyfrenzy-682fe.firebaseapp.com",
  projectId: "footyfrenzy-682fe",
  storageBucket: "footyfrenzy-682fe.firebasestorage.app",
  messagingSenderId: "768938777486",
  appId: "1:768938777486:web:b8fcd25cd4bd273cdb62df",
  measurementId: "G-GX88Y4X9W3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firestore and export it as db
const db = getFirestore(app);

// Export db so it can be used in other parts of the app
export { db };
export const storage = getStorage(app); // Export storage