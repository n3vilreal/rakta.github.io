import { auth, db } from "./firebase";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { 
  setDoc, 
  doc, 
  getDoc, 
  serverTimestamp,
  writeBatch
} from "firebase/firestore";

// Store confirmation result globally
let confirmationResult = null;

export const setupRecaptcha = (buttonId = 'sign-in-button') => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
          }
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
    confirmationResult = null;
    return userCredential.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  } finally {
    confirmationResult = null; // Clear confirmation result in any case
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

export const signUpWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { 
      displayName: name,
      photoURL: null // Set default photo URL if needed
    });
    console.log('User signed up successfully');
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

export const saveUserToFirestore = async (user) => {
  const batch = writeBatch(db);
  const userRef = doc(db, "users", user.uid);

  try {
    const userData = {
      uid: user.uid,
      name: user.displayName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      emailVerified: user.emailVerified,
      lastLoginAt: serverTimestamp()
    };

    batch.set(userRef, userData, { merge: true });
    await batch.commit();
    console.log('User saved to Firestore successfully');
    
    return userData;
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    if (error.code === 'unavailable' || error.code === 'resource-exhausted') {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        await batch.commit(); 
        console.log('User saved to Firestore successfully on retry');
        return userData;
      } catch (retryError) {
        console.error('Error saving user to Firestore on retry:', retryError);
        throw retryError;
      }
    }
    throw error;
  }
};

export const getUserFromFirestore = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    default:
      return 'An error occurred during sign in';
  }
};

