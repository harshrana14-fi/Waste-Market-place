// Placeholder for Prisma client; in-memory fallback for hackathon scope
export type Listing = { id: string; type: string; volume: string; location: string; frequency?: string };

export const db = {
  listings: [] as Listing[],
};


