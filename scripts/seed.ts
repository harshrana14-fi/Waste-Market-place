#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Check database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Create demo users
    const demoUsers = [
      {
        email: 'demo@example.com',
        passwordHash: await hash('demo123', 10),
        company: 'Demo Manufacturing Co.',
        role: 'producer' as const,
      },
      {
        email: 'recycler@example.com',
        passwordHash: await hash('demo123', 10),
        company: 'EcoRecycle Solutions',
        role: 'recycler' as const,
      },
      {
        email: 'corporate@example.com',
        passwordHash: await hash('demo123', 10),
        company: 'GlobalCorp Industries',
        role: 'corporate' as const,
      },
    ];

    for (const userData of demoUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const user = await prisma.user.create({
          data: userData,
        });
        console.log(`✅ Created user: ${user.email} (${user.role})`);
      } else {
        console.log(`⏭️  User already exists: ${userData.email}`);
      }
    }

    // Create demo listings
    const demoListings = [
      {
        type: 'Metal Scraps',
        volume: '50 tons',
        location: 'Detroit, MI',
        frequency: 'Monthly',
        ownerId: demoUsers[0].email, // Will be updated with actual user ID
      },
      {
        type: 'Plastic Waste',
        volume: '25 tons',
        location: 'Los Angeles, CA',
        frequency: 'Weekly',
        ownerId: demoUsers[0].email,
      },
      {
        type: 'Electronic Waste',
        volume: '10 tons',
        location: 'Austin, TX',
        frequency: 'One-time',
        ownerId: demoUsers[0].email,
      },
    ];

    // Get the producer user ID
    const producerUser = await prisma.user.findUnique({
      where: { email: 'demo@example.com' },
    });

    if (producerUser) {
      for (const listingData of demoListings) {
        const existingListing = await prisma.listing.findFirst({
          where: {
            type: listingData.type,
            ownerId: producerUser.id,
          },
        });

        if (!existingListing) {
          const listing = await prisma.listing.create({
            data: {
              type: listingData.type,
              volume: listingData.volume,
              location: listingData.location,
              frequency: listingData.frequency,
              ownerId: producerUser.id,
            },
          });
          console.log(`✅ Created listing: ${listing.type} (${listing.volume})`);
        } else {
          console.log(`⏭️  Listing already exists: ${listingData.type}`);
        }
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('Producer: demo@example.com / demo123');
    console.log('Recycler: recycler@example.com / demo123');
    console.log('Corporate: corporate@example.com / demo123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  });
