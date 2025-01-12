// src/firebase/auth.js
import { auth } from "./firebase";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  signOut 
} from "firebase/auth";

// Store confirmation result globally
let confirmationResult = null;

export const setupRecaptcha = (buttonId = 'sign-in-button') => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
      });
    }
  } catch (error) {
    console.error('Error setting up reCAPTCHA:', error);
    throw error;
  }
};

export const doSignInWithPhoneNumber = async (phoneNumber) => {
  try {
    // Format phone number
    const formattedNumber = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+977${phoneNumber}`; // Add Nepal country code if not present
    
    if (!window.recaptchaVerifier) {
      setupRecaptcha();
    }

    const appVerifier = window.recaptchaVerifier;
    confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
    console.log('OTP sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    throw error;
  }
};

export const verifyOTP = async (otp) => {
  try {
    if (!confirmationResult) {
      throw new Error('Please request OTP first');
    }

    const userCredential = await confirmationResult.confirm(otp);
    console.log('OTP verified successfully');
    // Reset confirmation result after successful verification
    confirmationResult = null;
    return userCredential.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const doSignOut = async () => {
  try {
    await signOut(auth);
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};