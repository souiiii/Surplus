import {
  format,
  getHours,
  getDay,
  setDay,
  addDays,
  getWeekOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function useDatesOfWeek() {
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(() =>
    getDay(location.state?.selectedDate || date)
  );
  const [selectedDate, setSelectedDate] = useState(
    location.state?.selectedDate || date
  );
  const [greeting, setGreeting] = useState("");
  const month = selectedDate ? format(selectedDate, "MMMM") : "December"; // "December"
  const day = selectedDate ? format(selectedDate, "d") : 20; // "20"
  const year = selectedDate ? format(selectedDate, "yyyy") : 2025; //
  const dayOfWeek = getDay(date);
  const weekOfMonthOfSelectedDay = getWeekOfMonth(selectedDate);
  console.log(selectedDate);
  function onDayClick(index) {
    const newDate = addDays(date, index - dayOfWeek);
    setSelectedDay(index);
    setSelectedDate(newDate);
  }

  useEffect(
    function () {
      const hour = getHours(date);
      if (hour >= 0 && hour < 12) setGreeting(`Good Morning`);
      if (hour >= 12 && hour < 17) setGreeting(`Good Afternoon`);
      if (hour >= 17 && hour < 24) setGreeting(`Good Evening`);
    },
    [setGreeting]
  );

  return [
    day,
    month,
    year,
    greeting,
    selectedDay,
    setSelectedDay,
    selectedDate,
    setSelectedDate,
    date,
    setDate,
    onDayClick,
    weekOfMonthOfSelectedDay,
  ];
}

export default useDatesOfWeek;
