export interface GreenCredit {
  id: string;
  transactionId: string;
  amount: number;
  type: 'waste_diverted' | 'carbon_reduced' | 'circular_economy' | 'sustainability_milestone';
  metadata: {
    wasteType: string;
    volumeTons: number;
    carbonSavingsKg: number;
    recyclerId: string;
    producerId: string;
    timestamp: Date;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    blockchainHash?: string;
  };
  createdAt: Date;
  expiresAt?: Date;
  status: 'active' | 'used' | 'expired' | 'cancelled';
}

export interface CreditTransaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  creditId: string;
  amount: number;
  type: 'transfer' | 'purchase' | 'redemption' | 'reward';
  metadata: {
    reason?: string;
    pricePerCredit?: number;
    totalPrice?: number;
    marketplaceFee?: number;
  };
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
}

export interface CreditMarketplace {
  creditId: string;
  sellerId: string;
  amount: number;
  pricePerCredit: number;
  totalPrice: number;
  type: 'sell' | 'buy';
  status: 'active' | 'sold' | 'cancelled';
  createdAt: Date;
  expiresAt: Date;
}

// Credit calculation functions
export function calculateCreditsForTransaction(
  wasteType: string,
  volumeTons: number,
  recyclerSustainabilityScore: number,
  quality: 'high' | 'medium' | 'low' = 'medium'
): number {
  const baseCredits = getBaseCreditsForWasteType(wasteType);
  const volumeMultiplier = Math.log(volumeTons + 1) / Math.log(10); // Logarithmic scaling
  const qualityMultiplier = getQualityMultiplier(quality);
  const sustainabilityMultiplier = recyclerSustainabilityScore / 5; // Normalize to 0-1
  
  const totalCredits = Math.round(
    baseCredits * volumeMultiplier * qualityMultiplier * sustainabilityMultiplier
  );
  
  return Math.max(1, totalCredits); // Minimum 1 credit
}

export function calculateCarbonCredits(
  wasteType: string,
  volumeTons: number,
  recyclerSustainabilityScore: number
): number {
  const carbonFactor = getCarbonFactorForWasteType(wasteType);
  const baseCarbonSavings = volumeTons * carbonFactor;
  const sustainabilityMultiplier = recyclerSustainabilityScore / 5;
  
  return Math.round(baseCarbonSavings * sustainabilityMultiplier);
}

// Credit marketplace functions
export function createCreditListing(
  creditId: string,
  sellerId: string,
  amount: number,
  pricePerCredit: number,
  expiresInDays: number = 30
): CreditMarketplace {
  return {
    creditId,
    sellerId,
    amount,
    pricePerCredit,
    totalPrice: amount * pricePerCredit,
    type: 'sell',
    status: 'active',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
  };
}

export function executeCreditTransaction(
  marketplaceListing: CreditMarketplace,
  buyerId: string,
  platformFeePercentage: number = 0.05
): CreditTransaction {
  const platformFee = marketplaceListing.totalPrice * platformFeePercentage;
  const sellerAmount = marketplaceListing.totalPrice - platformFee;
  
  return {
    id: generateTransactionId(),
    fromUserId: marketplaceListing.sellerId,
    toUserId: buyerId,
    creditId: marketplaceListing.creditId,
    amount: marketplaceListing.amount,
    type: 'purchase',
    metadata: {
      reason: 'Credit marketplace purchase',
      pricePerCredit: marketplaceListing.pricePerCredit,
      totalPrice: marketplaceListing.totalPrice,
      marketplaceFee: platformFee
    },
    createdAt: new Date(),
    status: 'completed'
  };
}

// Credit verification and blockchain functions
export function verifyCreditOnBlockchain(credit: GreenCredit): Promise<boolean> {
  // Simulate blockchain verification
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would interact with a blockchain
      const isValid = credit.metadata.verificationStatus === 'verified' && 
                     credit.metadata.blockchainHash !== undefined;
      resolve(isValid);
    }, 1000);
  });
}

export async function generateBlockchainHash(credit: GreenCredit): Promise<string> {
  // Simulate blockchain hash generation
  const data = {
    id: credit.id,
    transactionId: credit.transactionId,
    amount: credit.amount,
    type: credit.type,
    metadata: credit.metadata,
    createdAt: credit.createdAt
  };
  
  // In a real implementation, this would use actual cryptographic hashing
  const hash = btoa(JSON.stringify(data)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 64);
  return `0x${hash}`;
}

// Credit analytics and reporting
export function generateCreditReport(
  userId: string,
  credits: GreenCredit[],
  transactions: CreditTransaction[]
): {
  totalCreditsEarned: number;
  totalCreditsUsed: number;
  activeCredits: number;
  carbonFootprintReduced: number;
  wasteDiverted: number;
  sustainabilityScore: number;
  monthlyTrend: Array<{ month: string; credits: number; carbon: number }>;
} {
  const userCredits = credits.filter(c => c.metadata.producerId === userId);
  const userTransactions = transactions.filter(t => t.toUserId === userId || t.fromUserId === userId);
  
  const totalCreditsEarned = userCredits.reduce((sum, credit) => sum + credit.amount, 0);
  const totalCreditsUsed = userTransactions
    .filter(t => t.type === 'redemption' && t.toUserId === userId)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const activeCredits = userCredits
    .filter(c => c.status === 'active')
    .reduce((sum, credit) => sum + credit.amount, 0);
  
  const carbonFootprintReduced = userCredits.reduce((sum, credit) => 
    sum + credit.metadata.carbonSavingsKg, 0
  );
  
  const wasteDiverted = userCredits.reduce((sum, credit) => 
    sum + credit.metadata.volumeTons, 0
  );
  
  const sustainabilityScore = calculateUserSustainabilityScore(userCredits);
  
  const monthlyTrend = generateMonthlyTrend(userCredits);
  
  return {
    totalCreditsEarned,
    totalCreditsUsed,
    activeCredits,
    carbonFootprintReduced,
    wasteDiverted,
    sustainabilityScore,
    monthlyTrend
  };
}

// Helper functions
function getBaseCreditsForWasteType(wasteType: string): number {
  const creditFactors: Record<string, number> = {
    'Metal Scraps': 10,
    'Plastic Waste': 8,
    'Electronic Waste': 15,
    'Chemical Byproducts': 20,
    'Textile Waste': 6,
    'Food Waste': 4,
    'Glass Waste': 5,
    'Paper Waste': 3
  };
  
  return creditFactors[wasteType] || 5;
}

function getQualityMultiplier(quality: 'high' | 'medium' | 'low'): number {
  const multipliers = {
    'high': 1.5,
    'medium': 1.0,
    'low': 0.7
  };
  
  return multipliers[quality];
}

function getCarbonFactorForWasteType(wasteType: string): number {
  const carbonFactors: Record<string, number> = {
    'Metal Scraps': 2500, // kg CO2 per ton
    'Plastic Waste': 3200,
    'Electronic Waste': 4100,
    'Chemical Byproducts': 5800,
    'Textile Waste': 1900,
    'Food Waste': 800,
    'Glass Waste': 1200,
    'Paper Waste': 900
  };
  
  return carbonFactors[wasteType] || 1000;
}

function calculateUserSustainabilityScore(credits: GreenCredit[]): number {
  if (credits.length === 0) return 0;
  
  const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
  const avgCarbonSavings = credits.reduce((sum, credit) => 
    sum + credit.metadata.carbonSavingsKg, 0
  ) / credits.length;
  
  const diversityScore = new Set(credits.map(c => c.metadata.wasteType)).size;
  const consistencyScore = credits.length >= 12 ? 1.2 : credits.length / 12;
  
  return Math.round(
    (totalCredits * 0.4 + avgCarbonSavings * 0.3 + diversityScore * 10 * 0.2 + consistencyScore * 20 * 0.1)
  );
}

function generateMonthlyTrend(credits: GreenCredit[]): Array<{ month: string; credits: number; carbon: number }> {
  const monthlyData: Record<string, { credits: number; carbon: number }> = {};
  
  credits.forEach(credit => {
    const month = credit.createdAt.toISOString().substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { credits: 0, carbon: 0 };
    }
    monthlyData[month].credits += credit.amount;
    monthlyData[month].carbon += credit.metadata.carbonSavingsKg;
  });
  
  return Object.entries(monthlyData)
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // Last 12 months
}

function generateTransactionId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Credit expiration and cleanup
export function checkCreditExpiration(credits: GreenCredit[]): GreenCredit[] {
  return credits.map(credit => {
    if (credit.expiresAt && credit.expiresAt < new Date() && credit.status === 'active') {
      return { ...credit, status: 'expired' as const };
    }
    return credit;
  });
}

export function getExpiringCredits(credits: GreenCredit[], daysAhead: number = 30): GreenCredit[] {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysAhead);
  
  return credits.filter(credit => 
    credit.status === 'active' &&
    credit.expiresAt &&
    credit.expiresAt <= expirationDate &&
    credit.expiresAt > new Date()
  );
}