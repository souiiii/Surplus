import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const useDeleteExercise = () => {
  const { user } = useAuth();

  const deleteExercise = useCallback(
    async (dateId, exerciseId, setError, setLoading) => {
      if (!user) {
        console.error("No user logged in");
        return;
      }

      try {
        setLoading(true);

        // First delete all sets (if any)
        const setsRef = collection(
          db,
          "users",
          user.uid,
          "workoutDates",
          dateId,
          "exercises",
          exerciseId,
          "sets"
        );

        const setsSnap = await getDocs(setsRef);
        await Promise.all(setsSnap.docs.map((doc) => deleteDoc(doc.ref)));

        // Then delete the exercise
        const exerciseRef = doc(
          db,
          "users",
          user.uid,
          "workoutDates",
          dateId,
          "exercises",
          exerciseId
        );
        await deleteDoc(exerciseRef);

        console.log("Exercise and sets deleted successfully");
      } catch (error) {
        console.error("Error deleting exercise:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return deleteExercise;
};

export default useDeleteExercise;
