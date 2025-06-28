import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import styles from "./AddWorkOut.module.css";
import { useAddExercise } from "../../hooks/useAddExercise"; // path as needed
import Spinner from "../../components/Spinner";

function AddWorkOut() {
  const [exercise, setExercise] = useState("");
  const [restTime, setRestTime] = useState(60);
  const [targetMuscleGroup, setTargetMuscleGroup] = useState("");
  const navigate = useNavigate();
  const { addExercise, loading, error } = useAddExercise();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addExercise({
      name: exercise,
      restTime,
      targetMuscleGroup,
    });

    if (success) {
      setExercise("");
      setRestTime("");
      setTargetMuscleGroup("");
      navigate("/home");
    }
  };

  return (
    <div className={styles.parent}>
      {!loading ? (
        <>
          <BackButton />
          <div className={styles.addWorkOutContainer}>
            <h1 className={styles.addWorkOutHeading}>Add WorkOut</h1>
            <form className="inputFieldsContainer" onSubmit={handleSubmit}>
              <input
                className="inputFields"
                type="text"
                placeholder="Exercise"
                value={exercise}
                onChange={(e) => {
                  const value = e.target.value;
                  const capitalized =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setExercise(capitalized);
                }}
                required
              />

              <input
                className="inputFields"
                type="text"
                placeholder="Target Muscle Group"
                value={targetMuscleGroup}
                onChange={(e) => {
                  const value = e.target.value;
                  const capitalized =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setTargetMuscleGroup(capitalized);
                }}
                required
              />
              <input
                className="inputFields"
                type="number"
                placeholder="Rest Time"
                value={restTime}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 0 || e.target.value === "") {
                    setRestTime(e.target.value);
                  }
                }}
                required
                min="0"
                max="600"
              />
              <button className={styles.addButton} disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.pageDescription}>
              This is just the setup. Add sets, reps, and weights after
              saving—directly from the home screen.
            </p>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default AddWorkOut;
