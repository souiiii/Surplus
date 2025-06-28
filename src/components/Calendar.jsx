import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";

import "./Calendar.css";

export default function Calendar({
  selectedDate,
  setSelectedDate,
  setSelectedDay,
}) {
  const today = new Date()
  const handleSelect = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedDay(date.getDay());
  };
  return (
    <div className="pickerDiv">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        showOutsideDays
        fixedWeeks
        disabled={{after:today}}
        navLayout="around"
        captionLayout="dropdown"
      />
    </div>
  );
}
