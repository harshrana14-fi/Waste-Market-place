"use client";
import { useEffect, useState } from "react";
import AIMatchingResults from "@/components/marketplace/AIMatchingResults";
import Card from "@/components/ui/Card";

type Props = { params: Promise<{ id: string }> };

export default function ListingDetailPage({ params }: Props) {
  const [listing, setListing] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);
      fetch(`/api/listings?id=${id}`).then(r => r.json()).then(setListing);
    });
  }, [params]);

  useEffect(() => {
    if (!listing) return;
    const mockRecyclers = [
      { id: "r1", name: "EcoPlastics Ltd", specializations: ["plastic"], distanceKm: 12, capacityTonsPerMonth: 100 },
      { id: "r2", name: "MetalCycle", specializations: ["metals"], distanceKm: 35, capacityTonsPerMonth: 60 },
      { id: "r3", name: "GreenTextiles", specializations: ["textiles"], distanceKm: 8, capacityTonsPerMonth: 40 },
    ];
    fetch("/api/matches", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ waste: { type: listing.type }, recyclers: mockRecyclers }) })
      .then(r => r.json()).then(d => setMatches(d.matches || []));
  }, [listing]);

  if (!listing) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{listing.type}</h1>
          <div className="text-sm text-gray-500">{listing.location} · {listing.frequency || "one-time"}</div>
        </div>
        <button className="px-4 py-2 rounded bg-black text-white">Contact producer</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Volume">
          <div className="text-xl font-semibold">{listing.volume}</div>
        </Card>
        <Card title="Location">
          <div className="text-xl font-semibold">{listing.location}</div>
        </Card>
        <Card title="Posted">
          <div className="text-xl font-semibold">{new Date(listing.createdAt).toLocaleDateString()}</div>
        </Card>
      </div>

      <AIMatchingResults matches={matches} />
    </div>
  );
}


