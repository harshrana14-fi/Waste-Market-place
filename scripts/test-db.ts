import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test successful:', result);

    // Test user table access
    const userCount = await prisma.user.count();
    console.log(`✅ User table accessible, ${userCount} users found`);

    // Test listing table access
    const listingCount = await prisma.listing.count();
    console.log(`✅ Listing table accessible, ${listingCount} listings found`);

    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Can\'t reach database server')) {
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Check your DATABASE_URL in .env.local');
        console.log('2. Verify your Supabase project is active');
        console.log('3. Check if your IP is whitelisted in Supabase');
        console.log('4. Ensure your database password is correct');
        console.log('5. Try restarting your Supabase project');
      }
    }
    
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run test if called directly
if (require.main === module) {
  testDatabaseConnection()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}
