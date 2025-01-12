import { auth } from "./firebase";
import {
  createUserWithNumberAndPassword,
  signInWithNumberAndPassword,
  sendPasswordResetNumber,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
} from "firebase/auth";

export const doCreateUserWithNumberAndPassword = async (fullname, number,nid, password) => {
  return createUserWithNumberAndPassword(auth, fullname, number,nid, password);
};

export const doSignInWithNumberAndPassword = (number, password) => {
  return signInWithNumberAndPassword(auth, number, password);
};

// export const doSignInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   const user = result.user;

//   // add user to firestore
// };

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (number) => {
  return sendPasswordResetNumber(auth, number);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/`,
  });
};