'use client';

import { useEffect, useState } from 'react';
import { FileSpreadsheet, Loader2, ArrowRight, Filter, MapPin, Building, PackageCheck, TrendingUp } from 'lucide-react';

interface Listing {
  _id: string;
  type: string;
  volume: string;
  location: string;
  frequency?: string;
  description?: string;
  price?: string;
  createdAt: string;
  owner: {
    _id: string;
    company: string;
    email: string;
  };
  matchScore?: number;
  sustainabilityScore?: number;
  distance?: number;
}

export default function RecyclerMatchesPage() {
  const [matches, setMatches] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    minMatchScore: 0,
  });

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/matches/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const MatchCard = ({ listing }: { listing: Listing }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{listing.type}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {listing.location}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-green-600">{listing.matchScore}% Match</div>
          <div className="text-xs text-gray-500">{listing.distance}km away</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium">{listing.volume}</div>
            <div className="text-xs text-gray-500">Volume</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-medium">{listing.sustainabilityScore}%</div>
            <div className="text-xs text-gray-500">Sustainability</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          <div className="font-medium text-gray-900">{listing.owner.company}</div>
          <div>Posted {new Date(listing.createdAt).toLocaleDateString()}</div>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          View Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI-Powered Matches</h1>
          <p className="text-gray-600">Smart recommendations based on your recycling capabilities</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          Export Matches
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="">All Types</option>
                  <option value="plastic">Plastic</option>
                  <option value="metal">Metal</option>
                  <option value="paper">Paper</option>
                  <option value="textile">Textile</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Match Score</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minMatchScore}
                  onChange={(e) => setFilters(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">{filters.minMatchScore}% or higher</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>
          ) : matches.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {matches.map((match) => (
                <MatchCard key={match._id} listing={match} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <PackageCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}