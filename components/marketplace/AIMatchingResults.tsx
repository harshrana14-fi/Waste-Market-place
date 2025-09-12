type Recycler = {
  id: string;
  name: string;
  specializations: string[];
  distanceKm: number;
  capacityTonsPerMonth: number;
  score?: number;
};

export default function AIMatchingResults({ matches }: { matches: Recycler[] }) {
  if (!matches?.length) return null;
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">Recommended partners</div>
      <ul className="space-y-1 text-sm">
        {matches.map((m) => (
          <li key={m.id} className="flex items-center justify-between border rounded px-3 py-2">
            <div>
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-gray-500">{m.specializations.join(", ")} · {m.distanceKm} km</div>
            </div>
            {typeof m.score === "number" && <div className="text-xs">Score: {m.score}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}


