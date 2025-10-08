'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProducerNavbar from '@/components/layout/ProducerNavbar';
import { ArrowLeft, Package, MapPin, Calendar, Edit, Trash2, Plus, Eye, Mail, Phone } from 'lucide-react';
import Modal from '@/components/ui/Modal';

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
  owner: string;
}

export default function ListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (session?.user) {
      fetchListings();
    }
  }, [session]);

  const fetchListings = async () => {
    if (!session?.user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/listings?ownerId=${(session as any).user.id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch listings');
      }
      
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleViewListing = (listing: Listing) => {
    setSelectedListing(listing);
    setShowModal(true);
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch(`/api/listings?id=${listingId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setListings(prev => prev.filter(listing => listing._id !== listingId));
      if (selectedListing?._id === listingId) {
        setShowModal(false);
        setSelectedListing(null);
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing');
    }
  };

  const handleStartEdit = (listing: Listing) => {
    setSelectedListing(listing);
    setEditing(true);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedListing) return;
    try {
      const res = await fetch('/api/listings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedListing, id: selectedListing._id }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setListings(prev => prev.map(l => l._id === updated._id ? updated : l));
      setSelectedListing(updated);
      setEditing(false);
    } catch (e) {
      console.error(e);
      alert('Failed to save changes');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProducerNavbar />
      
      <div className="max-w-7xl mx-auto p-6 pt-20">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="text-gray-600 mt-2">Manage your waste material listings</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/producer/create-listing')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New Listing
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-6">Create your first waste material listing to get started</p>
            <button
              onClick={() => router.push('/dashboard/producer/create-listing')}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Create First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                {listing.images?.length ? (
                  <div className="w-full h-40 bg-gray-100 rounded-t-lg overflow-hidden">
                    <img src={listing.images[0]} alt={listing.type} className="w-full h-full object-cover" />
                  </div>
                ) : null}
                <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{listing.type}</h3>
                      <p className="text-sm text-gray-600">{listing.volume}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewListing(listing)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleStartEdit(listing)} className="p-1 text-gray-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteListing(listing._id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  {listing.frequency && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{listing.frequency}</span>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6">
                  {listing.images?.length && listing.images.length > 1 ? (
                    <div className="flex gap-2 pt-2">
                      {listing.images.slice(0, 3).map((src, idx) => (
                        <img key={idx} src={src} alt={`thumb-${idx+1}`} className="w-16 h-16 object-cover rounded border" />
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="px-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Created {formatTimeAgo(listing.createdAt)}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Listing Modal */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(false); }}>
        {selectedListing && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Listing Details</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing((e) => !e)} className="px-3 py-1.5 border rounded-lg text-sm">
                  {editing ? 'Stop Editing' : 'Edit'}
                </button>
                <button onClick={() => handleDeleteListing(selectedListing._id)} className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm">
                  Delete
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {selectedListing.images?.length ? (
                <div>
                  <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-100">
                    <ProducerCarousel 
                      images={selectedListing.images} 
                      onImageClick={(i) => { setLightboxIndex(i); setLightboxOpen(true); }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {selectedListing.images.slice(0, 8).map((src, i) => (
                      <img key={i} src={src} onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }} className="w-full h-16 object-cover rounded border cursor-zoom-in" />
                    ))}
                  </div>
                </div>
              ) : null}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    {editing ? (
                      <input className="mt-1 w-full border rounded px-2 py-1" value={selectedListing.type} onChange={(e) => setSelectedListing({ ...selectedListing, type: e.target.value })} />
                    ) : (
                      <p className="font-medium">{selectedListing.type}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Volume</label>
                    {editing ? (
                      <input className="mt-1 w-full border rounded px-2 py-1" value={selectedListing.volume} onChange={(e) => setSelectedListing({ ...selectedListing, volume: e.target.value })} />
                    ) : (
                      <p className="font-medium">{selectedListing.volume}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    {editing ? (
                      <input className="mt-1 w-full border rounded px-2 py-1" value={selectedListing.location} onChange={(e) => setSelectedListing({ ...selectedListing, location: e.target.value })} />
                    ) : (
                      <p className="font-medium">{selectedListing.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Frequency</label>
                    {editing ? (
                      <select className="mt-1 w-full border rounded px-2 py-1" value={selectedListing.frequency || ''} onChange={(e) => setSelectedListing({ ...selectedListing, frequency: e.target.value })}>
                        <option value="">Select</option>
                        <option value="one-time">One-time</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    ) : (
                      <p className="font-medium">{selectedListing.frequency || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Details</h3>
                <div>
                  <label className="text-sm text-gray-500">Description</label>
                  {editing ? (
                    <textarea className="mt-1 w-full border rounded px-2 py-1" value={selectedListing.description || ''} onChange={(e) => setSelectedListing({ ...selectedListing, description: e.target.value })} />
                  ) : (
                    <p className="font-medium">{selectedListing.description || 'No description provided'}</p>
                  )}
                </div>
                {selectedListing.price && (
                  <div className="mt-4">
                    <label className="text-sm text-gray-500">Price per Unit/ton</label>
                    {editing ? (
                      <input className="mt-1 w-full border rounded px-2 py-1" value={selectedListing.price || ''} onChange={(e) => setSelectedListing({ ...selectedListing, price: e.target.value })} />
                    ) : (
                      <p className="font-medium">{selectedListing.price}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  {selectedListing.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedListing.contactEmail}</span>
                    </div>
                  )}
                  {selectedListing.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedListing.contactPhone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-between">
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                  <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
                </div>
              ) : (
                <div />
              )}
              <button
                onClick={() => { setShowModal(false); setEditing(false); }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {lightboxOpen && selectedListing?.images?.length ? (
        <ProducerLightbox 
          images={selectedListing.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </div>
  );
}

function ProducerCarousel({ images, onImageClick }: { images: string[]; onImageClick?: (i: number) => void }) {
  const [index, setIndex] = useState(0);
  const slides = images.slice(0, 8);
  if (slides.length === 0) return null;
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  return (
    <div className="relative w-full h-full">
      {slides.map((src, i) => (
        <img key={i} src={src} onClick={() => onImageClick?.(i)} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === index ? 'opacity-100' : 'opacity-0'} cursor-zoom-in`} />
      ))}
      {slides.length > 1 && (
        <>
          <button type="button" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center" aria-label="Prev">‹</button>
          <button type="button" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center" aria-label="Next">›</button>
        </>
      )}
    </div>
  );
}

function ProducerLightbox({ images, startIndex = 0, onClose }: { images: string[]; startIndex?: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 select-none">
        <div className="relative max-w-6xl w-full h-[70vh] flex items-center justify-center overflow-hidden">
          <img src={images[index]} style={{ transform: `scale(${zoom})` }} className="max-w-full max-h-full object-contain transition-transform duration-150" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center">✕</button>
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center">‹</button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center">›</button>
            </>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-white">
          <button onClick={() => setZoom((z) => Math.max(1, parseFloat((z - 0.25).toFixed(2))))} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">-</button>
          <button onClick={() => setZoom(1)} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">Reset</button>
          <button onClick={() => setZoom((z) => Math.min(3, parseFloat((z + 0.25).toFixed(2))))} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">+</button>
        </div>
      </div>
    </div>
  );
}
