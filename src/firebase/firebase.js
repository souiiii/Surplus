// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXVW9A8xhy47XvqJYQE1SGBoZt0oHOyz8",
  authDomain: "surplus-gymtrack.firebaseapp.com",
  projectId: "surplus-gymtrack",
  storageBucket: "surplus-gymtrack.appspot.com",
  messagingSenderId: "550295844324",
  appId: "1:550295844324:web:2de78583e12ac8dcd0c3f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
