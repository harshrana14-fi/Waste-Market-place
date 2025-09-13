import connectDB from '../lib/mongodb';
import { User } from '../lib/models';
import { compare } from 'bcryptjs';

async function testAuth() {
  try {
    console.log('Testing authentication...');
    await connectDB();
    
    // Test demo user
    const user = await User.findOne({ email: 'demo@example.com' });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (user) {
      console.log('User details:', {
        email: user.email,
        company: user.company,
        role: user.role,
        passwordHash: user.passwordHash.substring(0, 20) + '...'
      });
      
      // Test password comparison
      const isDemoUser = ['demo@example.com', 'recycler@example.com', 'corporate@example.com'].includes(user.email);
      console.log('Is demo user:', isDemoUser);
      
      if (isDemoUser) {
        console.log('Testing demo password "demo123":', 'demo123' === 'demo123');
      } else {
        const isValidPassword = await compare('demo123', user.passwordHash);
        console.log('Password hash comparison result:', isValidPassword);
      }
    }
    
    console.log('Auth test completed!');
    
  } catch (error) {
    console.error('Auth test error:', error);
  }
}

testAuth().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});
