import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import styles from "./AddSet.module.css";
import { useAddSet } from "../../hooks/useAddSet";

function AddSet() {
  const { date, exerciseId } = useParams();
  const navigate = useNavigate();
  const { addSet, loading, error } = useAddSet(date, exerciseId);

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addSet({
      weight: Number(weight),
      reps: Number(reps),
    });

    if (success) {
      setWeight("");
      setReps("");
      navigate(`/exercise/${date}/${exerciseId}`, { replace: true });
    }
  };

  return (
    <div className={styles.parent}>
      {!loading ? (
        <>
          <BackButton />
          <div className={styles.addSetContainer}>
            <h1 className={styles.heading}>Add Set</h1>

            <form className="inputFieldsContainer" onSubmit={handleSubmit}>
              <input
                className="inputFields"
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                max={999}
                min={1}
                required
                step="0.1"
              />
              <input
                className="inputFields"
                type="number"
                placeholder="Reps"
                value={reps}
                max={99}
                min={1}
                onChange={(e) => setReps(e.target.value)}
                required
              />
              <button className={styles.addButton} disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </button>
            </form>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.inspirationalTextDiv}>
              <span className={styles.inspirationalTextItalics}>
                “Amateurs sit and wait for inspiration, the rest of us just get
                up and got to work.”
              </span>
              —<br /> Stephen King
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default AddSet;
