import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useChangeName = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth(); // From AuthContext

  const changeName = async (newName) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Update in Firebase Auth user profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newName });
      }

      // 2. Update in Firestore
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { name: newName });

      // 3. Update in local context (optional, for immediate UI update)
      setUser({
        ...user,
        displayName: newName,
      });
    } catch (err) {
      setError(err.message || "Something went wrong while updating name.");
    } finally {
      setLoading(false);
    }
  };

  return { changeName, loading, error };
};