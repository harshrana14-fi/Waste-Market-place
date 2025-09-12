export type Waste = { 
  type: string; 
  volumeTons?: number; 
  lat?: number; 
  lon?: number;
  quality?: 'high' | 'medium' | 'low';
  urgency?: 'high' | 'medium' | 'low';
  pickupWindow?: string;
  certifications?: string[];
  contaminants?: string[];
};

export type Recycler = { 
  id: string; 
  name: string; 
  specializations: string[]; 
  distanceKm: number; 
  capacityTonsPerMonth: number;
  certifications: string[];
  processingCapabilities: string[];
  qualityStandards: string[];
  avgProcessingTime: number; // days
  rating: number;
  pricePerTon?: number;
  sustainabilityScore: number;
};

export type MatchResult = Recycler & {
  score: number;
  matchReasons: string[];
  estimatedPrice: number;
  processingTime: number;
  sustainabilityImpact: number;
};

export function rankRecyclers(waste: Waste, recyclers: Recycler[]): MatchResult[] {
  return recyclers.map((recycler) => {
    const scores = calculateMatchScores(waste, recycler);
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    return {
      ...recycler,
      score: Math.round(totalScore),
      matchReasons: generateMatchReasons(waste, recycler, scores),
      estimatedPrice: calculateEstimatedPrice(waste, recycler),
      processingTime: calculateProcessingTime(waste, recycler),
      sustainabilityImpact: calculateSustainabilityImpact(waste, recycler)
    };
  }).sort((a, b) => b.score - a.score);
}

function calculateMatchScores(waste: Waste, recycler: Recycler) {
  const scores = {
    typeCompatibility: 0,
    proximity: 0,
    capacity: 0,
    quality: 0,
    certifications: 0,
    processingCapability: 0,
    sustainability: 0,
    price: 0,
    rating: 0,
    urgency: 0
  };

  // Type compatibility (0-40 points)
  if (recycler.specializations.includes(waste.type)) {
    scores.typeCompatibility = 40;
  } else {
    // Partial match for related types
    const relatedTypes = getRelatedWasteTypes(waste.type);
    const partialMatch = recycler.specializations.some(spec => 
      relatedTypes.includes(spec)
    );
    scores.typeCompatibility = partialMatch ? 20 : 0;
  }

  // Proximity (0-25 points)
  const maxDistance = 100; // km
  if (recycler.distanceKm <= maxDistance) {
    scores.proximity = Math.max(0, 25 - (recycler.distanceKm / maxDistance) * 25);
  }

  // Capacity (0-20 points)
  if (waste.volumeTons && recycler.capacityTonsPerMonth >= waste.volumeTons) {
    const capacityRatio = Math.min(1, recycler.capacityTonsPerMonth / (waste.volumeTons * 2));
    scores.capacity = capacityRatio * 20;
  }

  // Quality match (0-15 points)
  if (waste.quality && recycler.qualityStandards.includes(waste.quality)) {
    scores.quality = 15;
  } else if (waste.quality === 'high' && recycler.qualityStandards.includes('medium')) {
    scores.quality = 10;
  }

  // Certifications (0-20 points)
  if (waste.certifications) {
    const matchingCerts = waste.certifications.filter(cert => 
      recycler.certifications.includes(cert)
    ).length;
    scores.certifications = (matchingCerts / waste.certifications.length) * 20;
  }

  // Processing capability (0-15 points)
  if (waste.contaminants) {
    const canProcess = waste.contaminants.every(contaminant =>
      recycler.processingCapabilities.includes(contaminant)
    );
    scores.processingCapability = canProcess ? 15 : 5;
  }

  // Sustainability (0-25 points)
  scores.sustainability = recycler.sustainabilityScore * 25;

  // Price competitiveness (0-20 points)
  if (recycler.pricePerTon && waste.volumeTons) {
    const marketPrice = getMarketPrice(waste.type);
    const priceRatio = marketPrice / recycler.pricePerTon;
    scores.price = Math.min(20, priceRatio * 20);
  }

  // Rating (0-15 points)
  scores.rating = recycler.rating * 15;

  // Urgency bonus (0-10 points)
  if (waste.urgency === 'high') {
    scores.urgency = recycler.avgProcessingTime <= 3 ? 10 : 5;
  } else if (waste.urgency === 'medium') {
    scores.urgency = recycler.avgProcessingTime <= 7 ? 8 : 3;
  }

  return scores;
}

function generateMatchReasons(waste: Waste, recycler: Recycler, scores: any): string[] {
  const reasons: string[] = [];

  if (scores.typeCompatibility >= 30) {
    reasons.push(`Specializes in ${waste.type} processing`);
  }

  if (scores.proximity >= 20) {
    reasons.push(`Located ${recycler.distanceKm}km away`);
  }

  if (scores.capacity >= 15) {
    reasons.push(`Has capacity for ${waste.volumeTons} tons`);
  }

  if (scores.quality >= 10) {
    reasons.push(`Meets ${waste.quality} quality standards`);
  }

  if (scores.certifications >= 15) {
    reasons.push(`Certified for required standards`);
  }

  if (scores.sustainability >= 20) {
    reasons.push(`High sustainability rating`);
  }

  if (scores.rating >= 12) {
    reasons.push(`Excellent customer rating (${recycler.rating}/5)`);
  }

  if (scores.price >= 15) {
    reasons.push(`Competitive pricing`);
  }

  return reasons;
}

function calculateEstimatedPrice(waste: Waste, recycler: Recycler): number {
  if (!waste.volumeTons) return 0;
  
  const basePrice = recycler.pricePerTon || getMarketPrice(waste.type);
  const volumeDiscount = waste.volumeTons > 50 ? 0.1 : 0;
  const qualityMultiplier = waste.quality === 'high' ? 1.2 : waste.quality === 'medium' ? 1.0 : 0.8;
  
  return Math.round(basePrice * waste.volumeTons * (1 - volumeDiscount) * qualityMultiplier);
}

function calculateProcessingTime(waste: Waste, recycler: Recycler): number {
  let baseTime = recycler.avgProcessingTime;
  
  // Adjust based on volume
  if (waste.volumeTons && waste.volumeTons > 100) {
    baseTime += 2;
  }
  
  // Adjust based on quality
  if (waste.quality === 'high') {
    baseTime += 1;
  }
  
  return Math.max(1, baseTime);
}

function calculateSustainabilityImpact(waste: Waste, recycler: Recycler): number {
  const baseImpact = recycler.sustainabilityScore * 100;
  const volumeMultiplier = waste.volumeTons ? Math.log(waste.volumeTons + 1) : 1;
  const typeMultiplier = getSustainabilityMultiplier(waste.type);
  
  return Math.round(baseImpact * volumeMultiplier * typeMultiplier);
}

// Helper functions
function getRelatedWasteTypes(wasteType: string): string[] {
  const relatedTypes: Record<string, string[]> = {
    'Metal Scraps': ['Steel', 'Aluminum', 'Copper', 'Mixed Metals'],
    'Plastic Waste': ['PET', 'HDPE', 'PVC', 'Mixed Plastics'],
    'Electronic Waste': ['Circuit Boards', 'Batteries', 'Mixed Electronics'],
    'Chemical Byproducts': ['Solvents', 'Acids', 'Industrial Chemicals'],
    'Textile Waste': ['Cotton', 'Polyester', 'Mixed Textiles'],
    'Food Waste': ['Organic Waste', 'Compostable Materials']
  };
  
  return relatedTypes[wasteType] || [];
}

function getMarketPrice(wasteType: string): number {
  const marketPrices: Record<string, number> = {
    'Metal Scraps': 200,
    'Plastic Waste': 150,
    'Electronic Waste': 300,
    'Chemical Byproducts': 400,
    'Textile Waste': 100,
    'Food Waste': 50
  };
  
  return marketPrices[wasteType] || 100;
}

function getSustainabilityMultiplier(wasteType: string): number {
  const multipliers: Record<string, number> = {
    'Metal Scraps': 1.5,
    'Plastic Waste': 1.2,
    'Electronic Waste': 2.0,
    'Chemical Byproducts': 1.8,
    'Textile Waste': 1.1,
    'Food Waste': 1.3
  };
  
  return multipliers[wasteType] || 1.0;
}

// Additional utility functions
export function getMatchQuality(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

export function getUrgencyLevel(urgency: string): number {
  const urgencyLevels = {
    'high': 3,
    'medium': 2,
    'low': 1
  };
  
  return urgencyLevels[urgency as keyof typeof urgencyLevels] || 1;
}

export function calculateCarbonSavings(waste: Waste, recycler: Recycler): number {
  const carbonFactors: Record<string, number> = {
    'Metal Scraps': 2.5,
    'Plastic Waste': 3.2,
    'Electronic Waste': 4.1,
    'Chemical Byproducts': 5.8,
    'Textile Waste': 1.9,
    'Food Waste': 0.8
  };
  
  const factor = carbonFactors[waste.type] || 1.0;
  const volume = waste.volumeTons || 1;
  const sustainabilityMultiplier = recycler.sustainabilityScore;
  
  return Math.round(factor * volume * sustainabilityMultiplier);
}