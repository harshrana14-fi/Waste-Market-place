#!/usr/bin/env node

import { hash } from 'bcryptjs';

console.log('🔐 Creating demo user credentials...\n');

// Create hashed password for "demo123"
const password = 'demo123';
const hashedPassword = await hash(password, 10);

console.log('Demo User Credentials:');
console.log('====================');
console.log('Email: demo@example.com');
console.log('Password: demo123');
console.log('Hashed Password:', hashedPassword);
console.log('\nEmail: recycler@example.com');
console.log('Password: demo123');
console.log('Hashed Password:', hashedPassword);
console.log('\nEmail: corporate@example.com');
console.log('Password: demo123');
console.log('Hashed Password:', hashedPassword);

console.log('\n📝 Add these users to your database or use the mock authentication.');
console.log('The app will automatically fall back to mock authentication if the database is unavailable.');
