// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2i-NszVrPnjOUvUnPNwU8OR7jIWNH2p8",
  authDomain: "rakta-13ce1.firebaseapp.com",
  projectId: "rakta-13ce1",
  storageBucket: "rakta-13ce1.appspot.com",
  messagingSenderId: "412878722945",
  appId: "1:412878722945:web:379840553c1a99dd4cba80",
  measurementId: "G-Y3DNKTYYB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
