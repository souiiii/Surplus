// src/hooks/useAddExercise.js
import { useState } from "react";
import { db } from "../firebase/firebase"; // adjust path as needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // adjust path if it's in a different folder
import { format } from "date-fns";

export function useAddExercise() {
  const { user } = useAuth(); // use context instead of auth.currentUser
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addExercise = async ({ name, restTime, targetMuscleGroup }) => {
    setLoading(true);
    setError(null);

    try {
      if (!user) throw new Error("User not logged in");

      const userId = user.uid;
      const t = new Date();
      const today = format(t, "yyyy-MM-dd"); // Format: 'YYYY-MM-DD'

      const exercisesRef = collection(
        db,
        "users",
        userId,
        "workoutDates",
        today,
        "exercises"
      );

      await addDoc(exercisesRef, {
        name,
        restTime,
        targetMuscleGroup,
        set: 0, // Initial sets count as number
        createdAt: serverTimestamp(),
      });

      return true;
    } catch (err) {
      setError(err.message);
      console.error("Failed to add exercise:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addExercise, loading, error };
}
