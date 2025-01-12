// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2i-NszVrPnjOUvUnPNwU8OR7jIWNH2p8",
  authDomain: "rakta-13ce1.firebaseapp.com",
  projectId: "rakta-13ce1",
  storageBucket: "rakta-13ce1.firebasestorage.app",
  messagingSenderId: "412878722945",
  appId: "1:412878722945:web:379840553c1a99dd4cba80",
  measurementId: "G-Y3DNKTYYB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };