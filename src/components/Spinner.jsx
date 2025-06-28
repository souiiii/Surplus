import styles from "./Spinner.module.css";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

function Spinner() {
  return (
    // <div className={styles.spinnerContainer}>
    //   <div className={styles.wrapper}>
    //     <div className={styles.circle}></div>
    //     <div className={styles.circle}></div>
    //     <div className={styles.circle}></div>
    //     <div className={styles.shadow}></div>
    //     <div className={styles.shadow}></div>
    //     <div className={styles.shadow}></div>
    //   </div>
    // </div>

    <div className={styles.spinnerContainer}>
      <DotWave size="45" speed="0.5" color="#fdfbf9" />
    </div>
  );
}

export default Spinner;
