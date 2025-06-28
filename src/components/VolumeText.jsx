import { format, isSameDay } from "date-fns";
import styles from "./VolumeText.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function VolumeText({ selectedDate, volume, exercises }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power1.inOut" }
    );

    return () => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        });
      }
    };
  }, [volume, selectedDate]); // depends on both

  let message = null;

  if (!isSameDay(selectedDate, new Date())) {
    message =
      volume > 0 ? (
        <h1 ref={textRef} className={styles.volumeText}>
          You did{" "}
          <span className={styles.volumeHighlightedText}>{volume} volumes</span>{" "}
          of workout this {format(selectedDate, "EEEE")}
        </h1>
      ) : (
        <h1 ref={textRef} className={styles.volumeText}>
          Next time{" "}
          <span className={styles.volumeHighlightedText}>don't waste</span> your
          day for no reason
        </h1>
      );
  } else if (volume > 0) {
    message = (
      <h1 ref={textRef} className={styles.volumeText}>
        You've done{" "}
        <span className={styles.volumeHighlightedText}>{volume} volumes</span>{" "}
        of workout today
      </h1>
    );
  } else if (exercises.length === 0) {
    message = (
      <h1 ref={textRef} className={styles.volumeText}>
        Start by{" "}
        <span className={styles.volumeHighlightedText}>warming up</span> —
        simple, smart, effective.
      </h1>
    );
  } else {
    message = (
      <h1 ref={textRef} className={styles.volumeText}>
        Here we go —{" "}
        <span className={styles.volumeHighlightedText}>keep it simple</span> and
        "Let it flow"
      </h1>
    );
  }

  return message;
}

export default VolumeText;
