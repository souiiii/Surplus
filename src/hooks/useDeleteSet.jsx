import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const useDeleteSet = () => {
  const { user } = useAuth();

  const deleteSet = useCallback(
    async (dateId, exerciseId, setId, setError, setLoading, setExercise) => {
      if (!user) {
        console.error("No user logged in");
        return;
      }

      try {
        setLoading(true);

        // Step 1: Delete the selected set
        const setRef = doc(
          db,
          "users",
          user.uid,
          "workoutDates",
          dateId,
          "exercises",
          exerciseId,
          "sets",
          setId
        );

        await deleteDoc(setRef);
        console.log("Set deleted successfully");

        // Step 2: Re-fetch all remaining sets
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

        const setsQuery = query(setsRef, orderBy("setNumber", "asc"));
        const setsSnap = await getDocs(setsQuery);

        // Step 3: Re-index setNumbers
        const reorderedSets = [];
        let newSetNumber = 1;

        for (const docSnap of setsSnap.docs) {
          const data = docSnap.data();
          if (data.setNumber !== newSetNumber) {
            await updateDoc(docSnap.ref, { setNumber: newSetNumber });
          }

          reorderedSets.push({
            id: docSnap.id,
            ...data,
            setNumber: newSetNumber,
          });

          newSetNumber++;
        }

        // ✅ Step 4: Update the "set" field in the exercise document in Firestore
        const exerciseRef = doc(
          db,
          "users",
          user.uid,
          "workoutDates",
          dateId,
          "exercises",
          exerciseId
        );

        await updateDoc(exerciseRef, {
          set: reorderedSets.length, // ← total number of sets in Firestore
        });

        // Step 5: Update local React state
        setExercise((prev) => ({
          ...prev,
          setList: reorderedSets,
          set: reorderedSets.length, // ← total number of sets in state
        }));
      } catch (error) {
        console.error("Error deleting and reordering sets:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return deleteSet;
};

export default useDeleteSet;
