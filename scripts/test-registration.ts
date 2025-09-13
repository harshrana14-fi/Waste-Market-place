import connectDB from '../lib/mongodb';
import { db } from '../lib/database';
import { User } from '../lib/models';
import { compare } from 'bcryptjs';

async function testRegistration() {
  try {
    console.log('Testing user registration and login...');
    await connectDB();
    
    // Test email
    const testEmail = 'test@example.com';
    const testPassword = 'testpassword123';
    
    // Clean up any existing test user
    await User.deleteOne({ email: testEmail });
    console.log('Cleaned up existing test user');
    
    // Register a new user
    console.log('Registering new user...');
    const newUser = await db.createUser({
      email: testEmail,
      password: testPassword,
      company: 'Test Company',
      role: 'producer'
    });
    
    console.log('User created:', {
      id: newUser._id.toString(),
      email: newUser.email,
      company: newUser.company,
      role: newUser.role
    });
    
    // Test password verification
    console.log('Testing password verification...');
    const isValidPassword = await compare(testPassword, newUser.passwordHash);
    console.log('Password verification result:', isValidPassword);
    
    // Test finding the user
    console.log('Testing user lookup...');
    const foundUser = await db.findUserByEmail(testEmail);
    console.log('User found:', foundUser ? 'Yes' : 'No');
    
    if (foundUser) {
      console.log('Found user details:', {
        email: foundUser.email,
        company: foundUser.company,
        role: foundUser.role
      });
    }
    
    console.log('Registration test completed successfully!');
    
  } catch (error) {
    console.error('Registration test error:', error);
  }
}

testRegistration().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});
