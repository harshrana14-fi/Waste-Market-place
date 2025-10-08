'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProducerNavbar from '@/components/layout/ProducerNavbar';
import { ArrowLeft, Package, MapPin, Calendar, DollarSign, Image as ImageIcon, X } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const imagesSectionRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated or not a producer
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/dashboard/producer/create-listing');
    } else if (session?.user && (session as any).role !== 'producer') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  const [formData, setFormData] = useState({
    type: '',
    volume: '',
    location: '',
    frequency: '',
    description: '',
    price: '',
    contactEmail: '',
    contactPhone: '',
    tags: '',
    condition: '',
    processing: '',
    certifications: '',
    verified: false
  });

  const wasteTypes = [
    'Plastic-PC',
    'Plastic-PP', 
    'Plastic-PET',
    'Plastic-HDPE',
    'Plastic-LDPE',
    'Plastic-PVC',
    'Plastic-PS',
    'Plastic-ABS',
    'Plastic-Other',
    'Metal Scraps',
    'Electronic Waste',
    'Paper & Cardboard',
    'Glass',
    'Organic Waste',
    'Textile Waste',
    'Construction Debris',
    'Hazardous Waste',
    'Other'
  ];

  const frequencyOptions = [
    { label: 'One-time', value: 'one-time' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Check if user is authenticated and has an ID
    if (!session?.user || !(session as any).user.id) {
      setError('Please log in to create a listing');
      setIsSubmitting(false);
      return;
    }

    // Check if user is a producer
    if ((session as any).role !== 'producer') {
      setError('Only producers can create listings');
      setIsSubmitting(false);
      return;
    }

    // Validate image count: 2-3 images
    if (imageFiles.length < 2 || imageFiles.length > 3) {
      setError('Please upload 2 to 3 images of the waste.');
      imagesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIsSubmitting(false);
      return;
    }

    // Convert images to Base64 strings
    const imagesBase64 = await Promise.all(
      imageFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
          })
      )
    );

    try {
      // Normalize frequency to enum values expected by backend
      const allowed = new Set(['one-time', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly']);
      const labelToValue: Record<string, string> = {
        'One-time': 'one-time',
        'Daily': 'daily',
        'Weekly': 'weekly',
        'Monthly': 'monthly',
        'Quarterly': 'quarterly',
        'Yearly': 'yearly',
      };
      let normalizedFrequency = formData.frequency;
      if (!allowed.has(normalizedFrequency as string) && normalizedFrequency in labelToValue) {
        normalizedFrequency = labelToValue[normalizedFrequency as keyof typeof labelToValue];
      }
      if (!allowed.has(normalizedFrequency as string)) {
        normalizedFrequency = undefined as any;
      }

      // Process tags - convert comma-separated string to array
      const tagsArray = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // Process certifications - convert comma-separated string to array
      const certificationsArray = formData.certifications 
        ? formData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert.length > 0)
        : [];

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          certifications: certificationsArray,
          frequency: normalizedFrequency,
          images: imagesBase64,
          ownerId: (session as any).user.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Wait for 2 seconds to show the success message
        setTimeout(() => {
          router.push('/dashboard/producer/listings');
        }, 2000);
      } else {
        setError(data.error || 'Failed to create listing. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageOnly = files.filter((f) => f.type.startsWith('image/'));

    // Allow incremental adding but cap at 3
    const combined = [...imageFiles, ...imageOnly].slice(0, 3);
    setImageFiles(combined);

    // Generate previews
    const previewUrlsPromises = combined.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(previewUrlsPromises).then((urls) => setImagePreviews(urls));
  };

  const removeImageAtIndex = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Show the main content only if authenticated and is a producer
  if (status !== 'authenticated' || (session as any).role !== 'producer') {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProducerNavbar />
      
      <div className="max-w-4xl mx-auto p-6 pt-20">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-medium">Listing created successfully! Redirecting to your listings...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
          <p className="text-gray-600 mt-2">List your waste materials for recyclers to discover and purchase</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waste Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 inline mr-2" />
                Waste Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select waste type</option>
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Volume and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume *
                </label>
                <input
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleInputChange}
                  placeholder="e.g., 50 tons, 1000 kg"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Detroit, MI"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Frequency and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select frequency</option>
                  {frequencyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Price per Unit/ton
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., $50/ton"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Provide details about the waste material, condition, any special requirements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., PC, ASA, Automotive, Clean, Regrind (comma-separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Add relevant tags to help recyclers find your listing</p>
            </div>

            {/* Additional Information Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              
              {/* Material Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material Condition
                  </label>
                  <select
                    name="condition"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select condition</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Needs Processing">Needs Processing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Required
                  </label>
                  <select
                    name="processing"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select processing level</option>
                    <option value="Ready to Use">Ready to Use</option>
                    <option value="Minimal Processing">Minimal Processing</option>
                    <option value="Moderate Processing">Moderate Processing</option>
                    <option value="Extensive Processing">Extensive Processing</option>
                  </select>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications (Optional)
                </label>
                <input
                  type="text"
                  name="certifications"
                  placeholder="e.g., ISO 14001, FSC Certified, Recycled Content Verified"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">List any relevant certifications or quality standards</p>
              </div>
            </div>

            {/* Images */}
            <div ref={imagesSectionRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4 inline mr-2" />
                Waste Images (2–3 photos) *
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <p className="text-xs text-gray-500 mt-2">You can add up to 3 images. Minimum 2 required. Current: {imageFiles.length}</p>

              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group border rounded-lg overflow-hidden bg-gray-50">
                      <img src={src} alt={`Selected ${idx + 1}`} className="h-32 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImageAtIndex(idx)}
                        className="absolute top-2 right-2 inline-flex items-center justify-center p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                        aria-label="Remove image"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your-email@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || imageFiles.length < 2 || imageFiles.length > 3}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
