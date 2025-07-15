import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "./Recharts.module.scss";

const dailyData = [
  { day: "1", count: 10 },
  { day: "2", count: 15 },
  { day: "3", count: 12 },
  { day: "4", count: 8 },
  { day: "5", count: 20 },
  { day: "6", count: 25 },
  { day: "7", count: 18 },
  { day: "8", count: 22 },
  { day: "9", count: 17 },
  { day: "10", count: 14 },
  { day: "11", count: 19 },
  { day: "12", count: 21 },
  { day: "13", count: 16 },
  { day: "14", count: 11 },
  { day: "15", count: 13 },
  { day: "16", count: 23 },
  { day: "17", count: 20 },
  { day: "18", count: 14 },
  { day: "19", count: 12 },
  { day: "20", count: 15 },
  { day: "21", count: 18 },
  { day: "22", count: 22 },
  { day: "23", count: 25 },
  { day: "24", count: 19 },
  { day: "25", count: 17 },
  { day: "26", count: 16 },
  { day: "27", count: 20 },
  { day: "28", count: 24 },
  { day: "29", count: 18 },
  { day: "30", count: 21 },
];

export const Recharts = () => {
  return (
    <div className={styles.rechart}>
      <ResponsiveContainer>
        <BarChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
