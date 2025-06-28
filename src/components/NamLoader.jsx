import styles from "./NamLoader.module.css";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

function NamLoader() {
  return (
    // Default values shown
    <Waveform size="30" stroke="3.5" speed="0.5" color="#fdfbf9" />
  );
}

export default NamLoader;
