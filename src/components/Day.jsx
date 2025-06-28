import { format, getDay, setDay } from "date-fns";
import styles from "./Day.module.css";

function Day({ index, selectedDay, onDayClick }) {
  const dayName = format(setDay(new Date(), index), "EEEE");
  return (
    <div
      className={`${styles.weekDay} ${selectedDay === index && styles.selectedDay} ${index > getDay(new Date()) ? styles.disabled : ""}`}
      onClick={() => onDayClick(index)}
    >
      <span>{dayName.charAt(0)}</span>
    </div>
  );
}

export default Day;
