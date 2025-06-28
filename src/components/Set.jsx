import { format, isSameDay } from "date-fns";
import styles from "./Set.module.css";
import DeleteButton from "./DeleteButton";
import useDeleteSet from "../hooks/useDeleteSet";
import { useState } from "react";
import Spinner from "./Spinner";

function Set({
  set,
  date,
  exerciseId,
  loading,
  error,
  setLoading,
  setError,
  setExercise,
  exercise,
  fromPage
}) {
  const today = new Date();
  const datetoday = format(today, "yyyy-MM-dd");
  const deleteSet = useDeleteSet();
  console.log(exerciseId);
  const handleDelete = () => {
    deleteSet(
      datetoday,
      exerciseId,
      set.id,
      setError,
      setLoading,
      setExercise,
      exercise
    );
  };
  const weightInt = Math.trunc(set.weight);
  const weightDec = Math.trunc(set.weight * 10) % 10;
  const zerosWeight =
    weightInt.toString().length > 2
      ? ""
      : weightInt.toString().length > 1
        ? "0"
        : "00";
  const reps = set.reps;
  const zerosreps = reps.toString().length > 1 ? "" : "0";
  const vol = Math.floor(set?.weight * set?.reps);
  const volume = vol;
  const zerosvolume =
    vol.toString().length > 2 ? "" : vol.toString().length > 1 ? "0" : "00";

  const volInt = Math.trunc(vol / 1000);
  const volDec = (parseFloat((vol / 1000).toFixed(1)) * 10) % 10;
  const zerosvol = volInt.toString().length > 1 ? "" : "0";
  // if (error) console.log(error);
  // if (loading) return <Spinner />;
  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.setContainer}>
      {isSameDay(datetoday, date) && fromPage !=='/history' && <DeleteButton onDelete={handleDelete} />}
      <div className={styles.setNumberContainer}>
        <p className={styles.setNumber}>Set 0{set.setNumber}</p>
      </div>
      <div className={styles.setParametersContainer}>
        <div className={`${styles.parameterDiv} ${styles.div1}`}>
          <div>
            <span className={styles.nonHighlightedValues}>{zerosWeight}</span>
            <span className={styles.highlightedValues}>{weightInt}</span>
            <span className={styles.nonHighlightedValues}>.</span>
            <span
              className={
                weightDec === 0
                  ? styles.nonHighlightedValues
                  : styles.highlightedValues
              }
            >
              {weightDec}
            </span>
          </div>
          <span className={styles.parameterLabels}>kilograms</span>
        </div>
        <div className={`${styles.parameterDiv} ${styles.div2}`}>
          <div>
            <span className={styles.nonHighlightedValues}>{zerosreps}</span>
            <span className={styles.highlightedValues}>{reps}</span>
          </div>
          <span className={styles.parameterLabels}>repetitions</span>
        </div>
        <div className={`${styles.parameterDiv} ${styles.div3}`}>
          {vol < 1000 ? (
            <div>
              <span className={styles.nonHighlightedValues}>{zerosvolume}</span>
              <span className={styles.highlightedValues}>{volume}</span>
            </div>
          ) : (
            <div>
              <span className={styles.nonHighlightedValues}>{zerosvol}</span>
              <span className={styles.highlightedValues}>{volInt}</span>
              <span className={styles.nonHighlightedValues}>.</span>
              <span
                className={
                  volDec === 0
                    ? styles.nonHighlightedValues
                    : styles.highlightedValues
                }
              >
                {volDec}
              </span>
              <span className={styles.highlightedValues}>k</span>
            </div>
          )}
          <span className={styles.parameterLabels}>volumes</span>
        </div>
      </div>
    </div>
  );
}

export default Set;
