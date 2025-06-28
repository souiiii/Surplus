import { useState } from "react";
import styles from "./History.module.css";
import LogoutButton from "../../components/LogoutButton";
import useDatesOfWeek from "../../hooks/useDatesOfWeek";
import useExercisesForDate from "../../hooks/useExercisesForDate";
import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import Spinner from "../../components/Spinner";
import DisplayExercises from "../../components/DisplayExercises";

function History() {
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
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.parent}>
      <>
        <div className={styles.historyWelcomeContainer}>
          <h1 className={styles.heading}>Track Workout</h1>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedDay={setSelectedDay}
          />
          <p className={styles.formattedDate}>
            {month} <span className={styles.day}>{day}</span>, {year}
          </p>
          <div className={`margin ${styles.historyContainerMargin}`}></div>
        </div>
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
                  from="/history"
                />
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
      {/* <LogoutButton loading={loading} setLoading={setLoading} /> */}
      <NavBar />
    </div>
  );
}

export default History;
