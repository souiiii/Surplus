import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const useExercisesForDate = (selectedDate) => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [exerciseError, setExerciseError] = useState("");

  useEffect(() => {
    if (!user || !selectedDate) return;

    const fetchData = async () => {
      setExerciseLoading(true);
      setExerciseError("");

      try {
        const sDate = format(selectedDate, "yyyy-MM-dd");
        const exercisesRef = collection(
          db,
          "users",
          user.uid,
          "workoutDates",
          sDate,
          "exercises"
        );

        const q = query(exercisesRef, orderBy("createdAt", "desc"));
        const exerciseSnapshot = await getDocs(q);

        const exercisesWithSetList = await Promise.all(
          exerciseSnapshot.docs.map(async (doc) => {
            const exerciseData = {
              id: doc.id,
              ...doc.data(), // includes `set` field (number of sets)
            };

            const setsRef = collection(
              db,
              "users",
              user.uid,
              "workoutDates",
              sDate,
              "exercises",
              doc.id,
              "sets"
            );

            const setsSnapshot = await getDocs(setsRef);

            const setList = setsSnapshot.docs
              .map((setDoc) => ({
                id: setDoc.id,
                ...setDoc.data(),
              }))
              .sort((a, b) => a.setNumber - b.setNumber);

            return {
              ...exerciseData,
              setList, // ✅ safely added without conflicting with `set`
            };
          })
        );

        setExercises(exercisesWithSetList);
      } catch (err) {
        console.error("Failed to fetch exercises or sets:", err);
        setExerciseError("Error loading exercises");
      } finally {
        setExerciseLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, user]);

  return [
    exercises,
    setExercises,
    setExerciseLoading,
    setExerciseError,
    exerciseLoading,
    exerciseError,
  ];
};

export default useExercisesForDate;
