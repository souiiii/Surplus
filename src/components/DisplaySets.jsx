import Set from "./Set.jsx";
import styles from "./DisplaySets.module.css";

function DisplaySets({
  exerciseId,
  exercise,
  date,
  loading,
  error,
  setLoading,
  setError,
  setExercise,
  fromPage
}) {
  
  return (
    exercise?.setList?.length === 0 ? (
  fromPage === '/home' ? (
    <div className={styles.spinnerContainer}>Add your first Set!</div>
  ) : (
    <div className={styles.spinnerContainer}>No Set added Yet!</div>
  )
) : 
    <div className={styles.parent}>
      {exercise?.setList?.map((set) => (
        <Set
          key={set.id}
          set={set}
          date={date}
          exerciseId={exerciseId}
          loading={loading}
          error={error}
          setLoading={setLoading}
          setError={setError}
          setExercise={setExercise}
          exercise={exercise}
          fromPage={fromPage}
        />
      ))}
    </div>
  );
}

export default DisplaySets;
