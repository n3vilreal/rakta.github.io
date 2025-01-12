// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Auth with phone auth settings
const auth = getAuth(app);
// Set default country for phone numbers (Nepal)
auth.settings.appVerificationDisabledForTesting = false; // Enable real phone verification
auth.languageCode = 'en'; // Set language for SMS
auth.settings.phoneNumber = {
  defaultCountry: 'NP', // Nepal
  defaultNationalNumber: '', // Leave empty
};

export { app, auth };