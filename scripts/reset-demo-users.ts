import connectDB from '../lib/mongodb';
import { User } from '../lib/models';

async function resetDemoUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully!');

    // Delete existing demo users
    const demoEmails = ['demo@example.com', 'recycler@example.com', 'corporate@example.com'];
    const deleteResult = await User.deleteMany({ email: { $in: demoEmails } });
    console.log(`Deleted ${deleteResult.deletedCount} existing demo users`);

    // Create new demo users
    const demoUsers = [
      {
        email: 'demo@example.com',
        passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // "demo123"
        company: 'Demo Company',
        role: 'producer',
        createdAt: new Date(),
      },
      {
        email: 'recycler@example.com',
        passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // "demo123"
        company: 'EcoRecycle Ltd',
        role: 'recycler',
        createdAt: new Date(),
      },
      {
        email: 'corporate@example.com',
        passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // "demo123"
        company: 'GlobalCorp',
        role: 'corporate',
        createdAt: new Date(),
      }
    ];

    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created demo user: ${userData.email}`);
    }

    console.log('Demo users reset completed successfully!');
    
  } catch (error) {
    console.error('Error resetting demo users:', error);
    process.exit(1);
  }
}

// Run the reset
resetDemoUsers().then(() => {
  console.log('Reset script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Reset failed:', error);
  process.exit(1);
});
