import Link from "next/link";
import Card from "@/components/ui/Card";

interface Owner {
  _id: string;
  company: string;
  email: string;
}

interface Listing {
  _id: string;
  type: string;
  volume: string;
  location: string;
  frequency?: string;
  price?: string;
  owner: Owner;
  createdAt: string;
}

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">{listing.type}</div>
            <div className="text-lg font-semibold">{listing.volume}</div>
          </div>
          {listing.price && (
            <div className="text-lg font-bold text-green-600">{listing.price}</div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-600">{listing.location}</div>
          {listing.frequency && (
            <div className="text-sm text-gray-600">Frequency: {listing.frequency}</div>
          )}
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{listing.owner.company}</div>
              <div className="text-xs text-gray-500">
                Listed {new Date(listing.createdAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => window.location.href = `/marketplace/${listing._id}`}
              className="px-3 py-1.5 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}


