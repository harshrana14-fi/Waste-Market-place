'use client';

import { useEffect, useState, useCallback, useMemo } from "react";
import Header from "@/components/layout/Header";
import { Filter, MapPin, Calendar, Star, Eye, Heart, Search, ChevronRight, Grid3X3, List, SlidersHorizontal, TrendingUp, Users, Package, Clock, CheckCircle } from "lucide-react";
import FilterPanel from "@/components/marketplace/FilterPanel";
import Link from "next/link";

interface Listing {
  _id: string;
  type: string;
  volume: string;
  location: string;
  frequency?: string;
  description?: string;
  price?: string;
  contactEmail?: string;
  contactPhone?: string;
  images?: string[];
  createdAt: string;
  owner: {
    _id: string;
    company: string;
    email: string;
  };
  rating?: number;
  views?: number;
  verified?: boolean;
  tags?: string[];
}

function CardCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const slides = useMemo(() => images.slice(0, 3), [images]);
  
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 2500);
    return () => clearInterval(id);
  }, [slides.length]);

  const handleImageLoad = (imageIndex: number) => {
    setLoadedImages(prev => new Set([...prev, imageIndex]));
  };

  if (slides.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-gray-100">
      {slides.map((src, i) => (
        <div key={i} className="absolute inset-0">
          {!loadedImages.has(i) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}
          <img
          src={src}
          alt={`Listing image ${i + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              i === index ? 'opacity-100' : 'opacity-0'
            } ${!loadedImages.has(i) ? 'opacity-0' : ''}`}
            onLoad={() => handleImageLoad(i)}
            onError={() => handleImageLoad(i)}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {slides.map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`}></span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  const [filters, setFilters] = useState<{ 
    type?: string; 
    location?: string; 
    volume?: string;
    priceRange?: string;
    sortBy?: string;
  }>({});
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [stats, setStats] = useState({
    totalListings: 0,
    totalVolume: 0,
    verifiedPartners: 0
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleViewModeChange = useCallback((mode: "grid" | "list") => {
    setViewMode(mode);
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const qs = new URLSearchParams();
        if (filters.type) qs.set("type", filters.type);
        if (filters.location) qs.set("location", filters.location);
        if (filters.volume) qs.set("volume", filters.volume);
        if (filters.priceRange) qs.set("priceRange", filters.priceRange);
        if (filters.sortBy) qs.set("sortBy", filters.sortBy);
        if (searchQuery) qs.set("search", searchQuery);
        
        const response = await fetch(`/api/listings?${qs.toString()}`);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch listings');
        }
        
        const data = await response.json();
        
        // Ensure owner information is included
        const listingsWithOwners = data.map((listing: any) => ({
          ...listing,
          owner: listing.owner || {
            company: 'Unknown Company',
            email: '',
          }
        }));
        
        setListings(listingsWithOwners);
        
        // Calculate stats from real data
        setStats({
          totalListings: listingsWithOwners.length,
          totalVolume: listingsWithOwners.reduce((sum: number, listing: any) => {
            const volume = parseFloat(listing.volume?.replace(/[^\d.]/g, '') || '0');
            return sum + volume;
          }, 0),
          verifiedPartners: Math.round((listingsWithOwners.filter((l: any) => l.verified).length / listingsWithOwners.length) * 100) || 0
        });
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
        setStats({ totalListings: 0, totalVolume: 0, verifiedPartners: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters, searchQuery]);

  const displayListings = listings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
              <p className="text-gray-600">Discover and trade waste materials with verified partners</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search materials, locations, companies..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <FilterPanel onApply={setFilters} />
            </div>

            {/* Material Categories */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Material Types</h3>
              <div className="space-y-2">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                  onClick={() => setFilters({...filters, type: undefined})}
                >
                  All Materials
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                  onClick={() => setFilters({...filters, type: "Plastic"})}
                >
                  Plastic Materials
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                  onClick={() => setFilters({...filters, type: "Metal"})}
                >
                  Metal Scrap
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                  onClick={() => setFilters({...filters, type: "Paper"})}
                >
                  Paper & Cardboard
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                  onClick={() => setFilters({...filters, type: "Glass"})}
                >
                  Glass Materials
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-sm font-medium transition-colors"
                  onClick={() => setFilters({...filters, type: "Electronic"})}
                >
                  Electronic Waste
                </button>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Market Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Active Listings</span>
                  </div>
                  <span className="font-bold text-green-600">{stats.totalListings}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Total Volume</span>
                  </div>
                  <span className="font-bold text-blue-600">{stats.totalVolume.toFixed(1)} tons</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Verified Partners</span>
                  </div>
                  <span className="font-bold text-orange-600">{stats.verifiedPartners}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Enhanced Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                  {displayListings.length} listings found
                </span>
                    {loading && (
                      <div className="w-4 h-4 border-2 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
                    )}
                  </div>
                  
                  {/* Enhanced View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                      onClick={() => handleViewModeChange("grid")}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === "grid" 
                          ? "bg-white text-green-600 shadow-sm" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                      }`}
                      title="Grid View"
                    >
                      <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                      onClick={() => handleViewModeChange("list")}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === "list" 
                          ? "bg-white text-green-600 shadow-sm" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Sort by:</span>
                <select
                  value={filters.sortBy || "newest"}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                    <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="volume">Volume</option>
                  <option value="rating">Rating</option>
                </select>
                </div>
              </div>
            </div>

            {/* Listings */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : displayListings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any listings matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchQuery("");
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {displayListings.map((listing) => (
                  <div
                    key={"_id" in listing ? listing._id : (listing as any).id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Image Slider */}
                    {listing.images && listing.images.length > 0 && (
                      <div className="relative w-full h-48 bg-gray-100">
                        <CardCarousel images={listing.images} />
                      </div>
                    )}
                    
                    <div className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{listing.type}</h3>
                            {listing.verified && (
                              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{listing.location}</span>
                          </div>
                        </div>
                        {listing.price && (
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Price</div>
                            <div className="font-bold text-green-600">{listing.price}</div>
                          </div>
                        )}
                      </div>

                      {/* Key Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-600">Volume</div>
                          <div className="font-semibold text-sm">{listing.volume}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-600">Availability</div>
                          <div className="font-semibold text-sm text-green-600">{listing.frequency || "Ongoing"}</div>
                        </div>
                      </div>

                      {/* Seller & Action */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="w-3 h-3 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{listing.owner?.company || "Unknown Company"}</div>
                            <div className="text-xs text-gray-500">{new Date(listing.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        
                        <Link 
                          href={`/marketplace/${listing._id}`}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          View
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}