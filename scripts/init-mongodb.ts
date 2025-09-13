import connectDB from '../lib/mongodb';
import { initializeDemoUsers } from '../lib/database';
import { User, Listing, Transaction, GreenCredit } from '../lib/models';

async function initializeMongoDB() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully!');

    // Initialize demo users
    console.log('Initializing demo users...');
    await initializeDemoUsers();

    // Create some sample listings
    console.log('Creating sample listings...');
    const users = await User.find();
    const producer = users.find(u => u.role === 'producer');
    const recycler = users.find(u => u.role === 'recycler');

    if (producer) {
      const sampleListings = [
        {
          type: 'Metal Scraps',
          volume: '50 tons',
          location: 'New York, NY',
          frequency: 'Monthly',
          owner: producer._id,
        },
        {
          type: 'Plastic Waste',
          volume: '25 tons',
          location: 'Los Angeles, CA',
          frequency: 'Weekly',
          owner: producer._id,
        },
        {
          type: 'Electronic Waste',
          volume: '10 tons',
          location: 'Chicago, IL',
          frequency: 'Bi-weekly',
          owner: producer._id,
        }
      ];

      for (const listingData of sampleListings) {
        const existingListing = await Listing.findOne({
          type: listingData.type,
          owner: listingData.owner
        });
        
        if (!existingListing) {
          const listing = new Listing(listingData);
          await listing.save();
          console.log(`Created listing: ${listingData.type}`);
        }
      }
    }

    // Create sample transactions if we have both producer and recycler
    if (producer && recycler) {
      console.log('Creating sample transactions...');
      const listings = await Listing.find({ owner: producer._id });
      
      if (listings.length > 0) {
        const sampleTransaction = {
          listing: listings[0]._id,
          recycler: recycler._id,
          producer: producer._id,
          volumeTons: 25.5,
        };

        const existingTransaction = await Transaction.findOne({
          listing: sampleTransaction.listing,
          recycler: sampleTransaction.recycler
        });

        if (!existingTransaction) {
          const transaction = new Transaction(sampleTransaction);
          await transaction.save();
          console.log('Created sample transaction');

          // Create green credits for the transaction
          const greenCredit = new GreenCredit({
            transaction: transaction._id,
            amount: 150,
            metadata: {
              wasteType: listings[0].type,
              volumeTons: sampleTransaction.volumeTons,
              carbonSavingsKg: 2500,
              recyclerId: recycler._id.toString(),
              producerId: producer._id.toString(),
              timestamp: new Date(),
              verificationStatus: 'verified'
            }
          });
          await greenCredit.save();
          console.log('Created green credit');
        }
      }
    }

    console.log('MongoDB initialization completed successfully!');
    console.log('\nDemo users created:');
    console.log('- demo@example.com (password: demo123) - Producer');
    console.log('- recycler@example.com (password: demo123) - Recycler');
    console.log('- corporate@example.com (password: demo123) - Corporate');
    
  } catch (error) {
    console.error('Error initializing MongoDB:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeMongoDB().then(() => {
  console.log('Initialization script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Initialization failed:', error);
  process.exit(1);
});
