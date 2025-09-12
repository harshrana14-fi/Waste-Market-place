import Card from "@/components/ui/Card";

export default function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </Card>
  );
}


