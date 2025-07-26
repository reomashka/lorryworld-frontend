import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  from: string; // формат: '2025-07-01'
  to: string; // формат: '2025-07-10'
};

type RegistrationData = {
  date: string;
  count: number;
};

const generateMockData = (from: string, to: string): RegistrationData[] => {
  const start = new Date(from);
  const end = new Date(to);
  const data: RegistrationData[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const date = d.toISOString().split("T")[0];
    const count = Math.floor(Math.random() * 20) + 1; // случайное число от 1 до 20
    data.push({ date, count });
  }

  return data;
};

export const RegistrationChart: React.FC<Props> = ({ from, to }) => {
  const [data, setData] = useState<RegistrationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // временная генерация моков
      const mocked = generateMockData(from, to);
      setData(mocked);
    };

    fetchData();
  }, [from, to]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
