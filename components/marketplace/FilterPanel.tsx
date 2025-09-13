'use client';
import { useState } from "react";
import { MapPin, DollarSign, Package } from "lucide-react";
import FormSelect from "@/components/ui/FormSelect";

type Props = { 
  onApply: (filters: { 
    type?: string; 
    location?: string; 
    volume?: string;
    priceRange?: string;
  }) => void 
};

export default function FilterPanel({ onApply }: Props) {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    volume: "",
    priceRange: ""
  });

  const wasteTypes = [
    "Metal Scraps",
    "Plastic Waste", 
    "Electronic Waste",
    "Chemical Byproducts",
    "Textile Waste",
    "Food Waste",
    "Glass Waste",
    "Paper Waste"
  ];

  const locations = [
    "Detroit, MI",
    "Los Angeles, CA", 
    "Austin, TX",
    "Houston, TX",
    "New York, NY",
    "Chicago, IL",
    "Phoenix, AZ",
    "Philadelphia, PA"
  ];

  const volumeRanges = [
    "1-10 tons",
    "10-50 tons", 
    "50-100 tons",
    "100+ tons"
  ];

  const priceRanges = [
    "Under $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000", 
    "$5,000+"
  ];

  const handleApply = () => {
    onApply({
      type: filters.type || undefined,
      location: filters.location || undefined,
      volume: filters.volume || undefined,
      priceRange: filters.priceRange || undefined
    });
  };

  const handleClear = () => {
    setFilters({
      type: "",
      location: "",
      volume: "",
      priceRange: ""
    });
    onApply({});
  };

  return (
    <div className="space-y-6">
      {/* Waste Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Package className="w-4 h-4 inline mr-1" />
          Waste Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          {wasteTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Volume Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volume Range
        </label>
        <select
          value={filters.volume}
          onChange={(e) => setFilters({...filters, volume: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Volumes</option>
          {volumeRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="w-4 h-4 inline mr-1" />
          Price Range
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Prices</option>
          {priceRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Clear
        </button>
      </div>

      {/* Quick Filters */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Filters</h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              setFilters({...filters, type: "Metal Scraps"});
              onApply({type: "Metal Scraps"});
            }}
            className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            🔩 Metal Scraps
          </button>
          <button
            onClick={() => {
              setFilters({...filters, type: "Plastic Waste"});
              onApply({type: "Plastic Waste"});
            }}
            className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            🧴 Plastic Waste
          </button>
          <button
            onClick={() => {
              setFilters({...filters, type: "Electronic Waste"});
              onApply({type: "Electronic Waste"});
            }}
            className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            💻 Electronic Waste
          </button>
        </div>
      </div>
    </div>
  );
}