import { useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function useAddSet(date, exerciseId) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addSet = async ({ weight, reps }) => {
    setLoading(true);
    setError(null);

    try {
      if (!user) throw new Error("User not logged in");

      const userId = user.uid;

      const setsRef = collection(
        db,
        "users",
        userId,
        "workoutDates",
        date,
        "exercises",
        exerciseId,
        "sets"
      );

      // Get current number of sets
      const setsSnapshot = await getDocs(setsRef);
      const setNumber = setsSnapshot.size + 1;

      // Add the new set
      await addDoc(setsRef, {
        weight,
        reps,
        setNumber,
        createdAt: serverTimestamp(),
      });

      // Optionally: increment 'sets' field in exercise doc
      const exerciseDocRef = doc(
        db,
        "users",
        userId,
        "workoutDates",
        date,
        "exercises",
        exerciseId
      );
      await updateDoc(exerciseDocRef, {
        set: setNumber,
      });

      return true;
    } catch (err) {
      setError(err.message);
      console.error("Failed to add set:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addSet, loading, error };
}
