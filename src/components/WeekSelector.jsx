import Day from "./Day";
import styles from "./WeekSelector.module.css";

function WeekSelector({ selectedDay, onDayClick, weekOfMonthOfSelectedDay }) {
  return (
    <div className={styles.weekDetailsContainer}>
      <p className={styles.week}>Week {weekOfMonthOfSelectedDay}</p>
      <div className={styles.dayOfWeekSelectorContainer}>
        {Array.from({ length: 7 }, (_, index) => (
          <Day
            index={index}
            key={index}
            selectedDay={selectedDay}
            onDayClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekSelector;
