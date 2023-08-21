import { useState } from "react";
import styles from "../styles/dateselector.module.scss";

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  return (
    <div>
      <input
        type="date"
        id="start"
        name="trip-start"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={styles.selector}
      />
    </div>
  );
}
