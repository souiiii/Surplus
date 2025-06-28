import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, auth } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../../components/Spinner";
import useGetNameOfUser from "../../hooks/useGetNameOfUser";
import useDatesOfWeek from "../../hooks/useDatesOfWeek";
import useExercisesForDate from "../../hooks/useExercisesForDate";
import styles from "./Home.module.css";
import WeekSelector from "../../components/WeekSelector";
import LogoutButton from "../../components/LogoutButton";
import NavBar from "../../components/NavBar";
import AddButton from "../../components/AddButton";
import DisplayExercises from "../../components/DisplayExercises";
import { format, getDay, isSameDay } from "date-fns";
import VolumeText from "../../components/VolumeText";
import VolumeLoader from "../../components/VolumeLoader";

function Home() {
  const [loading, setLoading, error, setError, uId, uName] = useGetNameOfUser();
  const [
    day,
    month,
    year,
    greeting,
    selectedDay,
    setSelectedDay,
    selectedDate,
    setSelectedDate,
    date,
    setDate,
    onDayClick,
    weekOfMonthOfSelectedDay,
  ] = useDatesOfWeek();
  const [
    exercises,
    setExercises,
    setExerciseLoading,
    setExerciseError,
    exerciseLoading,
    exerciseError,
  ] = useExercisesForDate(selectedDate);
  const [volume, setVolume] = useState(0);

  function getFirstWordCapitalized(text) {
    if (!text) return "";
    const firstWord = text.trim().split(/\s+/)[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }
  useEffect(
    function () {
      console.log(exercises);
      const vol = exercises.reduce(
        (a, ex) =>
          ex.setList?.reduce((acc, s) => s.weight * s.reps + acc, 0) + a,
        0
      );
      console.log(vol);
      setVolume(Math.round(vol));
    },
    [exercises, setVolume]
  );
  return (
    <div className={styles.parent}>
      {!error ? (
        !loading ? (
          <>
            <div className={styles.homeWelcomeContainer}>
              {" "}
              <h1 className={styles.greeting}>
                {greeting}, {getFirstWordCapitalized(uName)}
              </h1>
              <WeekSelector
                selectedDay={selectedDay}
                onDayClick={onDayClick}
                weekOfMonthOfSelectedDay={weekOfMonthOfSelectedDay}
              />
              <VolumeLoader
                exerciseLoading={exerciseLoading}
                selectedDate={selectedDate}
                volume={volume}
                exercises={exercises}
              />
              <p className={styles.formattedDate}>
                {month} <span className={styles.day}>{day}</span>, {year}
              </p>
              <div className={`margin ${styles.welcomeContainerMargin}`}></div>
            </div>

            {/* <LogoutButton setLoading={setLoading} loading={loading} /> */}
            {selectedDay === getDay(date) && <AddButton link="/addWorkout" />}

            <NavBar />
            <div className={styles.displayContainer}>
              {!exerciseError ? (
                !exerciseLoading ? (
                  exercises.length > 0 ? (
                    <DisplayExercises
                      exercises={exercises}
                      setExercises={setExercises}
                      setExerciseError={setExerciseError}
                      setExerciseLoading={setExerciseLoading}
                      selectedDate={selectedDate}
                      from="/home"
                    />
                  ) : isSameDay(new Date(), selectedDate) ? (
                    <div className={styles.spinnerContainer2}>Add WorkOut</div>
                  ) : (
                    <div className={styles.spinnerContainer2}>
                      Nothing to see here!
                    </div>
                  )
                ) : (
                  <div className={styles.spinnerContainer2}>
                    <Spinner />
                  </div>
                )
              ) : (
                exerciseError
              )}
            </div>
          </>
        ) : (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )
      ) : (
        error
      )}
    </div>
  );
}

export default Home;
