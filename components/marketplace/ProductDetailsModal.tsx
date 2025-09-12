"use client";
import { useState, useEffect } from "react";
import { X, MapPin, Calendar, Star, Eye, Heart, Phone, Mail, Building, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function ProductDetailsModal({ isOpen, onClose, product }: ProductDetailsModalProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState<any>(null);

  useEffect(() => {
    if (product && isOpen) {
      // Mock buyer details - in real app, this would be fetched from API
      setBuyerDetails({
        id: "buyer_001",
        name: "GreenTech Industries",
        email: "contact@greentech.com",
        phone: "+1 (555) 123-4567",
        company: "GreenTech Industries LLC",
        location: "Detroit, MI",
        rating: 4.8,
        totalTransactions: 156,
        verified: true,
        memberSince: "2022-03-15",
        specialties: ["Metal Recycling", "Waste Processing", "Environmental Consulting"],
        certifications: ["ISO 14001", "EPA Certified", "Green Business Certified"],
        responseTime: "Usually responds within 2 hours",
        lastActive: "2 hours ago"
      });
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{product.type}</h2>
              {product.verified && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorited 
                    ? "bg-red-100 text-red-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="p-6 space-y-8">
              {/* Product Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.volume}</div>
                          <div className="text-sm text-gray-600">Available Volume</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.location}</div>
                          <div className="text-sm text-gray-600">Location</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.frequency}</div>
                          <div className="text-sm text-gray-600">Availability</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.rating}/5.0</div>
                          <div className="text-sm text-gray-600">Quality Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Stats */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Statistics</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">{product.price}</div>
                        <div className="text-sm text-gray-600">Total Price</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-semibold text-gray-900">{product.views}</div>
                          <div className="text-sm text-gray-600">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold text-gray-900">12</div>
                          <div className="text-sm text-gray-600">Inquiries</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Contact Seller
                      </button>
                      <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Request Quote
                      </button>
                      <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Schedule Pickup
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer Details */}
              {buyerDetails && (
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Seller Information</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{buyerDetails.company}</h4>
                            {buyerDetails.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{buyerDetails.location}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{buyerDetails.rating}</span>
                            <span className="text-sm text-gray-500">({buyerDetails.totalTransactions} transactions)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{buyerDetails.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{buyerDetails.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{buyerDetails.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Specialties & Certifications */}
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Specialties</h5>
                        <div className="flex flex-wrap gap-2">
                          {buyerDetails.specialties.map((specialty: string) => (
                            <span key={specialty} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Certifications</h5>
                        <div className="space-y-2">
                          {buyerDetails.certifications.map((cert: string) => (
                            <div key={cert} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-600">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Member since:</span> {new Date(buyerDetails.memberSince).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Last active:</span> {buyerDetails.lastActive}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-yellow-800 mb-1">Pickup Requirements</h5>
                        <p className="text-sm text-yellow-700">
                          Buyer must arrange transportation. Minimum 24-hour notice required for pickup scheduling.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-800 mb-1">Quality Guarantee</h5>
                        <p className="text-sm text-blue-700">
                          All materials are inspected and verified for quality. Returns accepted within 48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
