import { Link } from "react-router-dom";
import styles from "./AddButton.module.css";

function AddButton({ link, selectedDate }) {
  return (
    <div className={styles.addWorkoutButton}>
      <Link to={link}>
        <div className={styles.plusSvgContainer}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.4319 12.8368H18.1549V3.56757C18.1549 2.10035 16.9711 0.910767 15.5039 0.910767C14.0367 0.910767 12.8535 2.10035 12.8535 3.56821V12.8432H3.57203C2.10482 12.8432 0.912017 14.0328 0.91266 15.5007C0.912017 16.234 1.20829 16.9062 1.68836 17.3863C2.16908 17.8677 2.83232 18.1716 3.56497 18.1716H12.8535V27.4338C12.8535 28.1678 13.1446 28.8323 13.6253 29.3117C14.1061 29.7924 14.7674 30.09 15.5013 30.09C16.9679 30.09 18.1549 28.9004 18.1549 27.4338V18.171H27.4319C28.8991 18.171 30.0887 16.9711 30.088 15.5039C30.0874 14.0373 28.8978 12.8368 27.4319 12.8368Z"
              fill="#2D353A"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default AddButton;
