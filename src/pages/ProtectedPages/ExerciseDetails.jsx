import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import styles from "./ExerciseDetails.module.css";
import BackButton from "../../components/BackButton";
import { format } from "date-fns";
import AddButton from "../../components/AddButton";
import NavBar from "../../components/NavBar";
import DisplaySets from "../../components/DisplaySets";
import { useLocation } from "react-router-dom";

function ExerciseDetails() {
  const { user } = useAuth();
  const { exerciseId, date } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;
  const today = new Date();
  const fromPage=location.state?.from || '/home' ;
  let volume =
    Math.round(
      exercise?.setList?.reduce((acc, set) => acc + set.weight * set.reps, 0)
    ) || 0;
  const avgwt =
    exercise?.setList && exercise.setList.length > 0
      ? Number(
          (
            exercise.setList.reduce((acc, set) => acc + set.weight, 0) /
            exercise.setList.length
          ).toFixed(1)
        )
      : 0;

  useEffect(() => {
    if (!user || !exerciseId || !date) return;

    const fetchExercise = async () => {
      try {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "workoutDates",
          date,
          "exercises",
          exerciseId
        );
        // setLoading(true);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const exerciseData = docSnap.data();

          // Fetch the 'sets' subcollection
          const setsRef = collection(docRef, "sets");
          const setsQuery = query(setsRef, orderBy("setNumber", "asc")); // assuming you have a field like setNumber
          const setsSnap = await getDocs(setsQuery);

          const setList = setsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Merge setList into exercise
          setExercise({
            id: exerciseId,
            ...exerciseData,
            setList,
          });
          console.log(exerciseData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [user, exerciseId, date]);

  if (loading)
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.parent}>
      <BackButton selectedDate={selectedDate} />
      <div className={styles.headingDiv}>
        <h1 className={styles.exerciseName}>{exercise?.name}</h1>
        <p className={styles.targetMuscleGroup}>
          ({exercise?.targetMuscleGroup})
        </p>
      </div>
      <div className={styles.exerciseParametersContainer}>
        <div className={styles.exerciseParameterBlock}>
          <div className={styles.parameterValue}>{exercise?.restTime}s</div>
          <div className={styles.parameterLabel}>Rest Time</div>
        </div>
        <div className={styles.exerciseParameterBlock}>
          <div className={styles.parameterValue}>{exercise?.set}</div>
          <div className={styles.parameterLabel}>Sets</div>
        </div>
        <div className={styles.exerciseParameterBlock}>
          <div className={styles.parameterValue}>{avgwt}kg</div>
          <div className={styles.parameterLabel}>Avg. Weight</div>
        </div>
        <div className={styles.exerciseParameterBlock}>
          <div className={styles.parameterValue}>{volume}</div>
          <div className={styles.parameterLabel}>Volume</div>
        </div>
      </div>
      <DisplaySets
        exercise={exercise}
        exerciseId={exerciseId}
        date={date}
        loading={loading}
        error={error}
        setLoading={setLoading}
        setError={setError}
        setExercise={setExercise}
        fromPage={fromPage}
      />

      {date === format(today, "yyyy-MM-dd") && exercise.set < 10 &&  fromPage !=='/history' && (
        <AddButton link={`/add-set/${date}/${exerciseId}`} />
      )}
      <NavBar />
    </div>
  );
}

export default ExerciseDetails;
