"use client";
import { useState, useEffect } from "react";
import { X, MapPin, Calendar, Phone, Mail, Building, Star, CheckCircle, AlertCircle } from "lucide-react";

interface Seller {
  _id: string;
  company: string;
  email: string;
}

interface Product {
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
  owner: Seller;
  rating?: number;
  views?: number;
  verified?: boolean;
  tags?: string[];
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductDetailsModal({ isOpen, onClose, product }: ProductDetailsModalProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Add blur to navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.filter = 'blur(5px)';
      }
    } else {
      document.body.style.overflow = 'unset';
      // Remove blur from navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.filter = 'none';
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.filter = 'none';
      }
    };
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-0 sticky top-0 z-10">
            <div className="h-2 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{product.type}</h2>
              </div>
              <div className="flex items-center gap-3">
                {product.price ? (
                  <div className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm font-semibold">
                    {product.price}
                  </div>
                ) : null}
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorited 
                      ? "bg-red-100 text-red-600" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Star className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Product Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image carousel */}
              <div>
                {product.images?.length ? (
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                    <ManualCarousel 
                      images={product.images}
                      onImageClick={(idx) => {
                        setLightboxIndex(idx);
                        setLightboxOpen(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 rounded-xl bg-gray-100" />
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.volume}</div>
                        <div className="text-xs text-gray-600">Available Volume</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.location}</div>
                        <div className="text-xs text-gray-600">Location</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.frequency || '—'}</div>
                        <div className="text-xs text-gray-600">Availability</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-amber-600 font-bold">$</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.price || '—'}</div>
                        <div className="text-xs text-gray-600">Price per unit/ton</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{product.description || '—'}</p>
                </div>
              </div>

              {/* Contact & Seller Info */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.contactPhone || 'Not provided'}</div>
                        <div className="text-sm text-gray-600">Phone Number</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.contactEmail || product.owner.email}</div>
                        <div className="text-sm text-gray-600">Email</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.owner.company}</div>
                        <div className="text-sm text-gray-600">Company</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Contact Seller
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {lightboxOpen && product.images?.length ? (
      <Lightbox 
        images={product.images}
        startIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    ) : null}
    </>
  );
}

function ManualCarousel({ images, onImageClick }: { images: string[]; onImageClick?: (index: number) => void }) {
  const slides = images.slice(0, 3);
  const [index, setIndex] = useState(0);
  if (slides.length === 0) return null;
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  return (
    <div className="relative w-full h-full">
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Product image ${i + 1}`}
          onClick={() => onImageClick?.(i)}
          className={`absolute inset-0 w-full h-full object-cover cursor-zoom-in transition-opacity duration-300 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`}></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Lightbox({ images, startIndex = 0, onClose }: { images: string[]; startIndex?: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const minZoom = 1;
  const maxZoom = 3;
  const step = 0.25;
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const zoomIn = () => setZoom((z) => Math.min(maxZoom, parseFloat((z + step).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(minZoom, parseFloat((z - step).toFixed(2))));
  const resetZoom = () => setZoom(1);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 select-none">
        <div className="relative max-w-6xl w-full h-[70vh] flex items-center justify-center overflow-hidden">
          <img
            src={images[index]}
            alt={`Image ${index + 1}`}
            style={{ transform: `scale(${zoom})` }}
            className="max-w-full max-h-full object-contain transition-transform duration-150"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button onClick={zoomOut} className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded">-</button>
          <button onClick={resetZoom} className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded">Reset</button>
          <button onClick={zoomIn} className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded">+</button>
        </div>
      </div>
    </div>
  );
}
