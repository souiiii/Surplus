import { format, isSameDay } from "date-fns";
import useDeleteExercise from "../hooks/useDeleteExercise";
import styles from "./DisplayExercises.module.css";
import Exercise from "./Exercise";

function DisplayExercises({
  exercises,
  setExercises,
  setExerciseLoading,
  setExerciseError,
  selectedDate,
  from,
}) {
  const todate = new Date();
  const dateId = format(todate, "yyyy-MM-dd");
  const deleteExercise = useDeleteExercise();
  const setNumber = exercises.reduce((acc, ex)=>acc+ex.set, 0);



  const handleDelete = async (exerciseId) => {
    await deleteExercise(
      dateId,
      exerciseId,
      setExerciseError,
      setExerciseLoading
    );
    // Filter out the deleted exercise from local state
    setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  
  };

  if(setNumber==0 && !isSameDay(selectedDate, new Date()))  return <div className={from==='/home'?styles.spinnerContainer2: styles.spinnerContainer3}>
                                 Nothing to see here!
                               </div>


  return (
    <div className={styles.parent}>
      {exercises.map((exercise) =>
        exercise.set === 0 ? (
          isSameDay(selectedDate, todate) ? (
            <Exercise
              from={from}
              key={exercise.id}
              exercise={exercise}
              selectedDate={selectedDate}
              onDelete={() => handleDelete(exercise.id)}
            />
          ) : (
           ""
          )
        ) : (
          <Exercise
            from={from}
            key={exercise.id}
            exercise={exercise}
            selectedDate={selectedDate}
            onDelete={() => handleDelete(exercise.id)}
          />
        )
      )}
    </div>
  );
}

export default DisplayExercises;
