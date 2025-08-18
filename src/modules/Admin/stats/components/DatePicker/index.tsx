import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import styles from "./DatePicker.module.scss";

import "react-day-picker/dist/style.css";

type Props = {
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
};

export const DatePicker = ({ range, onRangeChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={onRangeChange}
        numberOfMonths={2}
        className={styles.picker}
      />
      {range?.from && range?.to && (
        <p className={styles.selectedRange}>
          Вы выбрали: {format(range.from, "dd.MM.yyyy")} —{" "}
          {format(range.to, "dd.MM.yyyy")}
        </p>
      )}
    </div>
  );
};
