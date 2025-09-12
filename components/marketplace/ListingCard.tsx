import Link from "next/link";
import Card from "@/components/ui/Card";

type Listing = { id: string; type: string; volume: string; location: string; frequency?: string };

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{listing.type}</div>
          <div className="font-semibold">{listing.volume}</div>
          <div className="text-xs text-gray-500">{listing.location} · {listing.frequency || "one-time"}</div>
        </div>
        <Link href={`/marketplace/${listing.id}`} className="text-sm text-blue-600">View</Link>
      </div>
    </Card>
  );
}


