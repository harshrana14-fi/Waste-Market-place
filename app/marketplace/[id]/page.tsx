"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/Header";
import { MapPin, Calendar, Building, Phone, Mail, Star, CheckCircle, ArrowLeft, Share2, Heart, Facebook, Linkedin, Twitter, MessageCircle, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default function ListingDetailPage({ params }: Props) {
  const { data: session, status } = useSession();
  const [listing, setListing] = useState<any>(null);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);
      setLoading(true);
      
      // Fetch real listing data from API
      const fetchListing = async () => {
        try {
          const response = await fetch(`/api/listings?id=${id}`);
          if (!response.ok) {
            throw new Error('Listing not found');
          }
          const listingData = await response.json();
          setListing(listingData);
        } catch (error) {
          console.error('Error fetching listing:', error);
          setListing(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchListing();
    });
  }, [params]);

  // Share functionality
  const handleShare = async (platform: string) => {
    const listingUrl = window.location.href;
    const shareText = `Check out this ${listing?.type} listing: ${listing?.type} - ${listing?.volume} available in ${listing?.location}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(listingUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(listingUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(listingUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + listingUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + '\n\n' + listingUrl)}`);
        break;
      default:
        // Fallback to Web Share API
        if (navigator.share) {
          navigator.share({
            title: shareText,
            text: shareText,
            url: listingUrl,
          });
        } else {
          // Copy to clipboard as fallback
          navigator.clipboard.writeText(listingUrl);
          alert('Link copied to clipboard!');
        }
    }
  };

  // WhatsApp contact functionality
  const handleWhatsAppContact = () => {
    const sellerPhone = listing?.owner?.phone || listing?.contactPhone;
    if (!sellerPhone) {
      alert('Seller phone number not available');
      return;
    }
    
    // Clean phone number (remove any non-digit characters except +)
    const cleanPhone = sellerPhone.replace(/[^\d+]/g, '');
    const message = `Hi! I'm interested in your ${listing?.type} listing. Can you provide more details?`;
    
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!listing) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Listing not found</h1>
          <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/marketplace"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/marketplace" className="hover:text-green-600">Back to the Materials</Link>
            <span className="text-green-600">&gt;</span>
            <span className="text-gray-900">{listing.type}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            {listing.images && listing.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-green-200">
                <div className="bg-green-50 rounded-t-lg px-6 py-3 border-b border-green-200">
                  <h2 className="text-lg font-semibold text-gray-900">Material Images</h2>
                </div>
                <div className="p-6">
                  <div className="relative">
                    <div 
                      className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => {
                        setSelectedImageIndex(currentImageIndex);
                        setIsImageModalOpen(true);
                      }}
                    >
                      {listing.images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Material image ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          onError={(e) => {
                            // Fallback for broken images
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                      
                      {/* Navigation Arrows */}
                      {listing.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => 
                                prev === 0 ? listing.images.length - 1 : prev - 1
                              );
                            }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => 
                                prev === listing.images.length - 1 ? 0 : prev + 1
                              );
                            }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Image Counter */}
                    {listing.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1}/{listing.images.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Material Description Card */}
            <div className="bg-white rounded-lg shadow-sm border border-green-200">
              <div className="bg-green-50 rounded-t-lg px-6 py-3 border-b border-green-200">
                <h2 className="text-lg font-semibold text-gray-900">Material description</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Material Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Material</div>
                      <div className="font-semibold text-gray-900">{listing.type}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">No. of Loads</div>
                      <div className="font-semibold text-gray-900">1</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Average Weight per Load</div>
                      <div className="font-semibold text-gray-900">{listing.volume}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Quantity Available</div>
                      <div className="font-semibold text-gray-900">{listing.volume}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Remaining Loads</div>
                      <div className="font-semibold text-gray-900">1</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Material Location</div>
                      <div className="font-semibold text-gray-900">{listing.location}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">Description</div>
                    <div className="text-gray-900 leading-relaxed">
                      {listing.description || "No description provided."}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Only show to unauthenticated users */}
                {!session && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Link 
                      href="/auth/register"
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
                    >
                      REGISTER NOW
                    </Link>
                    <Link 
                      href="/auth/login"
                      className="flex-1 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-center"
                    >
                      LOGIN
                    </Link>
                  </div>
                )}

                {/* Contact Seller Button - Show to authenticated users */}
                {session && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button 
                      onClick={handleWhatsAppContact}
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact Seller
                    </button>
                    <button className="flex-1 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                      Request Quote
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Share Listing Section */}
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Share Listing</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Facebook</span>
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">LinkedIn</span>
                </button>
                <button 
                  onClick={() => handleShare('email')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Email</span>
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Twitter</span>
                </button>
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">WhatsApp</span>
                </button>
                <button 
                  onClick={() => handleShare('native')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">More</span>
                </button>
              </div>
            </div>

            {/* You Might Also Like Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">You Might Also Like</h3>
              <p className="text-gray-600">
                No other materials in marketplace of '{listing.type}'
              </p>
            </div>

            {/* Not finding what you need? Section */}
            <div className="bg-green-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Not finding what you need?</h3>
                  <p className="text-green-100">Click the button to view wanted materials</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                  VIEW WANTED MATERIALS
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Availability Status */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm text-green-700">Ongoing Availability</div>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-lg border border-green-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Seller</div>
                    <div className="font-semibold text-gray-900">{listing.owner?._id || "N/A"}</div>
                  </div>
                </div>

                {listing.verified && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Account Verified</span>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listing ID:</span>
                    <span className="font-medium">{listing._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed on:</span>
                    <span className="font-medium">{new Date(listing.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action - Only show to unauthenticated users */}
            {!session && (
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Please register to bid on listings</h3>
                  <Link 
                    href="/auth/register"
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-block text-center"
                  >
                    REGISTER
                  </Link>
                </div>
              </div>
            )}

            {/* Contact Information for authenticated users */}
            {session && (
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Seller</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={handleWhatsAppContact}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                    {listing?.contactEmail && (
                      <a 
                        href={`mailto:${listing.contactEmail}`}
                        className="w-full px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Image Preview Modal */}
      {isImageModalOpen && listing.images && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-[92vw] max-w-6xl max-h-[92vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <span className="text-xl font-bold">&times;</span>
            </button>

            {/* Navigation Arrows */}
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => 
                      prev === 0 ? listing.images.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => 
                      prev === listing.images.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative">
              <img
                src={listing.images[selectedImageIndex]}
                alt={`Material image ${selectedImageIndex + 1}`}
                className="max-w-[92vw] max-h-[85vh] object-contain rounded-lg"
                style={{
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}
                loading="eager"
                onError={(e) => {
                  // Fallback for broken images
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                }}
                onClick={(e) => {
                  // Navigate: left half => prev, right half => next
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const goPrev = clickX < rect.width / 2;
                  setSelectedImageIndex((prev) => {
                    setIsZoomed(false);
                    if (goPrev) {
                      return prev === 0 ? listing.images.length - 1 : prev - 1;
                    }
                    return prev === listing.images.length - 1 ? 0 : prev + 1;
                  });
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed((z) => !z);
                }}
              />
            </div>

            {/* Image Counter */}
            {listing.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1}/{listing.images.length}
              </div>
            )}

            {/* Thumbnail Strip */}
            {listing.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                {listing.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImageIndex 
                        ? 'border-white' 
                        : 'border-white border-opacity-50 hover:border-opacity-75'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback for broken thumbnails
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2YjcyODMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OQTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}