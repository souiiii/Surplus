import { useState, useEffect } from "react";
import Spinner from "./Spinner"; // your spinner component
import VolumeText from "./VolumeText";
import styles from "./VolumeLoader.module.css";
import NamLoader from "./NamLoader";

function VolumeLoader({ selectedDate, volume, exercises, exerciseLoading }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // setShowText(false);
    if (!exerciseLoading) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 10);

      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
    // const timer = setTimeout(() => {
    //   setShowText(true);
    // }, 1200);

    // return () => clearTimeout(timer);
  }, [exerciseLoading]);

  return showText ? (
    <VolumeText
      selectedDate={selectedDate}
      volume={volume}
      exercises={exercises}
    />
  ) : (
    <div className={styles.loaderContainer}>
      <div className={styles.container}>
        <NamLoader />
      </div>
      <h1 className={styles.volumeText}>
        You did{" "}
        <span className={styles.volumeHighlightedText}>{volume} volumes</span>{" "}
        of workout this Sunday
      </h1>
    </div>
  );
}

export default VolumeLoader;
