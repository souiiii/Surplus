import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Detect if the app is running on a mobile device
  const isMobile = () => {
    return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  };

  // Firebase email/password signup
  const signup = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  // Google sign-in for both web & mobile
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (isMobile() || window.matchMedia("(display-mode: standalone)").matches) {
      // Use redirect method on mobile or PWA
      return signInWithRedirect(auth, provider);
    } else {
      // Use popup method on web
      return signInWithPopup(auth, provider);
    }
  };

  useEffect(() => {
    // Handle user auth state on mount
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Handle redirect result after Google sign-in (on mobile)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Google Redirect Error:", error.message);
      });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    signInWithGoogle,
    setUser,
    signout,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
