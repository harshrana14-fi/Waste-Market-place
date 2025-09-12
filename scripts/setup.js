#!/usr/bin/env node

import { writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Setting up Waste Marketplace Database...\n');

// Check if .env.local exists
if (!existsSync('.env.local')) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Database Configuration
# Replace [YOUR-PASSWORD] with your actual Supabase database password
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.njlzydmchpodgshmbajq.supabase.co:5432/postgres"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="waste-marketplace-secret-key-${Math.random().toString(36).substring(2)}"

# Development Settings
NODE_ENV="development"
`;

  writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local file');
  console.log('⚠️  Please update DATABASE_URL with your actual Supabase password\n');
} else {
  console.log('✅ .env.local file already exists\n');
}

console.log('📋 Next Steps:');
console.log('1. Update your DATABASE_URL in .env.local with your Supabase password');
console.log('2. Run: npm run db:test');
console.log('3. Run: npm run db:push');
console.log('4. Run: npm run db:seed');
console.log('5. Run: npm run dev');
console.log('\n🔐 Demo Login Credentials:');
console.log('Producer: demo@example.com / demo123');
console.log('Recycler: recycler@example.com / demo123');
console.log('Corporate: corporate@example.com / demo123');
