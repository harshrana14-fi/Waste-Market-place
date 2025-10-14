import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Enhanced Prisma client with connection pooling and error handling
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Add connection error handling
prisma.$connect().catch((error: unknown) => {
  console.error('Failed to connect to database:', error);
  if (process.env.NODE_ENV === 'development') {
    console.log('Using mock data for development...');
  }
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Mock data for development when database is unavailable
export const mockUsers = [
  {
    id: 'mock-user-1',
    email: 'demo@example.com',
    passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // password: "demo123"
    company: 'Demo Company',
    role: 'producer',
    createdAt: new Date(),
  },
  {
    id: 'mock-user-2', 
    email: 'recycler@example.com',
    passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // password: "demo123"
    company: 'EcoRecycle Ltd',
    role: 'recycler',
    createdAt: new Date(),
  },
  {
    id: 'mock-user-3',
    email: 'corporate@example.com', 
    passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // password: "demo123"
    company: 'GlobalCorp',
    role: 'corporate',
    createdAt: new Date(),
  }
];

// Helper function to check database connectivity
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Safe database operations with fallback
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    if (process.env.NODE_ENV === 'development' && fallback !== undefined) {
      console.log('Using fallback data for development');
      return fallback;
    }
    throw error;
  }
}