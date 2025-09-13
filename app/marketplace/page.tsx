'use client';

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import { Filter, MapPin, Calendar, TrendingUp, Star, Eye, Heart, Search } from "lucide-react";
import FilterPanel from "@/components/marketplace/FilterPanel";
import ListingCard from "@/components/marketplace/ListingCard";
import ProductDetailsModal from "@/components/marketplace/ProductDetailsModal";
import SearchInput from "@/components/marketplace/SearchInput";

export default function MarketplacePage() {
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
}  const [filters, setFilters] = useState<{ 
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
  const [selectedProduct, setSelectedProduct] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      } catch (error) {
        console.error('Error fetching listings:', error);
        // You might want to show an error message to the user here
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters, searchQuery]);

  // Mock data for demonstration
  const mockListings = [
    {
      id: "1",
      type: "Metal Scraps",
      volume: "50 tons",
      location: "Detroit, MI",
      frequency: "Monthly",
      price: "$2,500",
      rating: 4.8,
      views: 124,
      image: "/images/metal-scraps.jpg",
      description: "High-grade steel and aluminum scraps from automotive manufacturing",
      tags: ["Steel", "Aluminum", "Automotive"],
      verified: true
    },
    {
      id: "2", 
      type: "Plastic Waste",
      volume: "25 tons",
      location: "Los Angeles, CA",
      frequency: "Weekly",
      price: "$1,200",
      rating: 4.6,
      views: 89,
      image: "/images/plastic-waste.jpg",
      description: "Mixed plastic waste suitable for recycling into new products",
      tags: ["PET", "HDPE", "Mixed"],
      verified: true
    },
    {
      id: "3",
      type: "Electronic Waste",
      volume: "10 tons", 
      location: "Austin, TX",
      frequency: "One-time",
      price: "$3,000",
      rating: 4.9,
      views: 156,
      image: "/images/e-waste.jpg",
      description: "Computer components and electronic devices for responsible recycling",
      tags: ["Computers", "Circuit Boards", "Metals"],
      verified: true
    },
    {
      id: "4",
      type: "Chemical Byproducts",
      volume: "15 tons",
      location: "Houston, TX", 
      frequency: "Bi-weekly",
      price: "$4,500",
      rating: 4.7,
      views: 67,
      image: "/images/chemicals.jpg",
      description: "Industrial chemical byproducts suitable for specialized processing",
      tags: ["Solvents", "Acids", "Industrial"],
      verified: false
    },
    {
      id: "5",
      type: "Textile Waste",
      volume: "30 tons",
      location: "New York, NY",
      frequency: "Monthly", 
      price: "$1,800",
      rating: 4.5,
      views: 98,
      image: "/images/textiles.jpg",
      description: "Manufacturing textile waste including cotton and synthetic materials",
      tags: ["Cotton", "Polyester", "Manufacturing"],
      verified: true
    },
    {
      id: "6",
      type: "Food Waste",
      volume: "40 tons",
      location: "Chicago, IL",
      frequency: "Weekly",
      price: "$800", 
      rating: 4.4,
      views: 112,
      image: "/images/food-waste.jpg",
      description: "Organic food waste suitable for composting and biogas production",
      tags: ["Organic", "Composting", "Biogas"],
      verified: true
    }
  ];

  const displayListings = listings.length > 0 ? listings : mockListings;

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Waste Marketplace</h1>
              <p className="text-gray-600">Discover and trade industrial waste materials</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search waste materials, locations, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <FilterPanel onApply={setFilters} />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Market Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Listings</span>
                  <span className="font-semibold text-green-600">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Price/Ton</span>
                  <span className="font-semibold text-blue-600">$180</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Volume</span>
                  <span className="font-semibold text-purple-600">2.5K tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Verified Partners</span>
                  <span className="font-semibold text-orange-600">89%</span>
                </div>
              </div>
            </div>

            {/* Featured Categories */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-2">
                {["Metal Scraps", "Plastic Waste", "Electronic Waste", "Chemical Byproducts", "Textile Waste"].map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setFilters({...filters, type: category})}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {displayListings.length} listings found
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-green-100 text-green-600" : "text-gray-400"}`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-green-100 text-green-600" : "text-gray-400"}`}
                  >
                    <div className="w-4 h-4 flex flex-col gap-0.5">
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={filters.sortBy || "newest"}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="volume">Volume</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Listings Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : displayListings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {displayListings.map((listing) => (
                  <div
                    key={"_id" in listing ? listing._id : (listing as any).id}
                    className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
                      viewMode === "list" ? "p-6" : "p-6"
                    }`}
                  >
                    {viewMode === "grid" ? (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-600">{listing.type}</span>
                              {listing.verified && (
                                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{listing.volume}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{listing.location}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{listing.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {listing.tags?.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{listing.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{listing.views}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">{listing.price}</div>
                            <div className="text-xs text-gray-500">{listing.frequency}</div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <button 
                            onClick={() => handleViewDetails(listing)}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{listing.type}</h3>
                            {listing.verified && (
                              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{listing.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{listing.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{listing.frequency}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{listing.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600 text-lg">{listing.price}</div>
                          <div className="text-sm text-gray-600">{listing.volume}</div>
                          <button 
                            onClick={() => handleViewDetails(listing)}
                            className="mt-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}