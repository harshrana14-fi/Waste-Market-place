import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Function to calculate match score based on various factors
function calculateMatchScore(listing: any, recyclerProfile: any) {
  let score = 0;
  let maxScore = 0;

  // Match waste type compatibility
  if (recyclerProfile.wasteTypes.includes(listing.type)) {
    score += 40;
  }
  maxScore += 40;

  // Distance score (inverse relationship - closer is better)
  const distance = calculateDistance(
    recyclerProfile.location.coordinates,
    listing.location.coordinates
  );
  const distanceScore = Math.max(0, 30 * (1 - distance / 100)); // Max 30 points, decreasing with distance
  score += distanceScore;
  maxScore += 30;

  // Volume capability match
  const volumeMatch = checkVolumeCompatibility(listing.volume, recyclerProfile.capacity);
  score += volumeMatch * 20;
  maxScore += 20;

  // Normalize score to percentage
  return Math.round((score / maxScore) * 100);
}

// Helper function to calculate distance between two points
function calculateDistance(point1: [number, number], point2: [number, number]): number {
  // Implementation of Haversine formula for calculating distance between coordinates
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

// Helper function to check volume compatibility
function checkVolumeCompatibility(listingVolume: string, recyclerCapacity: string): number {
  // Convert volume strings to numbers (assuming format like "50 tons")
  const listingAmount = parseInt(listingVolume);
  const capacityAmount = parseInt(recyclerCapacity);

  if (isNaN(listingAmount) || isNaN(capacityAmount)) return 0;

  if (listingAmount <= capacityAmount) return 1;
  if (listingAmount <= capacityAmount * 1.2) return 0.7;
  if (listingAmount <= capacityAmount * 1.5) return 0.4;
  return 0;
}

// Calculate sustainability score based on multiple factors
function calculateSustainabilityScore(listing: any, recyclerProfile: any) {
  let score = 0;
  
  // Factor 1: Distance (shorter distance = more sustainable)
  const distance = calculateDistance(
    recyclerProfile.location.coordinates,
    listing.location.coordinates
  );
  score += Math.max(0, 30 * (1 - distance / 200)); // Max 30 points

  // Factor 2: Process efficiency
  score += recyclerProfile.processEfficiency || 0; // Max 40 points

  // Factor 3: Certifications
  const certificationScore = (recyclerProfile.certifications?.length || 0) * 10;
  score += Math.min(certificationScore, 30); // Max 30 points

  return Math.round(score);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const recyclerProfile = await db.findUserById(session.user.id);
    if (!recyclerProfile || recyclerProfile.role !== 'recycler') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, location, minMatchScore } = await req.json();

    // Build query filters
    const filters: Record<string, any> = {};
    if (type) filters.type = type;
    if (location) {
      filters.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: recyclerProfile.location.coordinates
          },
          $maxDistance: 100000 // 100km in meters
        }
      };
    }

    // Get available listings
    const listings = await db.findListings(filters);

    // Calculate scores and enrich listings with match data
    const matchedListings = listings.map((listing: any) => {
      const matchScore = calculateMatchScore(listing, recyclerProfile);
      const sustainabilityScore = calculateSustainabilityScore(listing, recyclerProfile);
      const distance = calculateDistance(
        recyclerProfile.location.coordinates,
        listing.location.coordinates
      );

      return {
        ...listing,
        matchScore,
        sustainabilityScore,
        distance: Math.round(distance)
      };
    });

    // Filter by minimum match score if specified
    const filteredListings = minMatchScore
      ? matchedListings.filter(l => l.matchScore >= minMatchScore)
      : matchedListings;

    // Sort by match score
    const sortedListings = filteredListings.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json(sortedListings);
  } catch (error) {
    console.error('Match recommendation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}