"use client";
import useSWR from "swr";
import Card from "@/components/ui/Card";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function GreenCreditsDisplay() {
  const { data } = useSWR("/api/credits", fetcher, { suspense: false });
  const credits = data || [];
  const total = credits.reduce((acc: number, c: any) => acc + (c.amount || 0), 0);
  return (
    <Card title="Green Credits">
      <div className="text-3xl font-semibold">{total}</div>
      <div className="text-xs text-gray-500">Total credits generated</div>
    </Card>
  );
}


