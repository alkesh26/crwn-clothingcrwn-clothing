import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDU3HwlKes1mPv9DRTZMEgQCHYVm48qvE",
  authDomain: "crwn-db-d6671.firebaseapp.com",
  projectId: "crwn-db-d6671",
  storageBucket: "crwn-db-d6671.firebasestorage.app",
  messagingSenderId: "51448854417",
  appId: "1:51448854417:web:cb850a0257bd673271cc30",
  measurementId: "G-LW3X6DRNXJ"
};

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
