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

export const RegistrationChart: React.FC<Props> = ({ from, to }) => {
  const [data, setData] = useState<RegistrationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://lorryworld.space/api/admin/registrations?from=${from}&to=${to}`
        );
        if (!res.ok) throw new Error("Ошибка при получении данных");
        const rawData: { id: string; createdAt: string }[] = await res.json();

        // Группировка по дате (формат: YYYY-MM-DD)
        const grouped: Record<string, number> = {};
        rawData.forEach((item) => {
          const date = item.createdAt.split("T")[0];
          grouped[date] = (grouped[date] || 0) + 1;
        });

        // Преобразуем в массив с датами от `from` до `to`
        const start = new Date(from);
        const end = new Date(to);
        const aggregated: RegistrationData[] = [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split("T")[0];
          aggregated.push({ date: dateStr, count: grouped[dateStr] || 0 });
        }

        setData(aggregated);
      } catch (error) {
        console.error("Ошибка при загрузке регистраций:", error);
      }
    };

    fetchData();
  }, [from, to]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) => {
              const [, month, day] = dateStr.split("-");
              return `${month}.${day}`;
            }}
          />

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
