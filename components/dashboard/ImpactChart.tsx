"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/ui/Card";

const sample = [
  { month: "Jan", co2: 2 },
  { month: "Feb", co2: 4 },
  { month: "Mar", co2: 6 },
  { month: "Apr", co2: 9 },
];

export default function ImpactChart() {
  return (
    <Card title="CO₂ Saved (t)">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sample}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="co2" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


