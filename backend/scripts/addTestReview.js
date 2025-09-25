import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from '../models/Review.js';

dotenv.config();

const addTestReview = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create a test review
    const testReview = new Review({
      name: 'Test User',
      email: 'test@example.com',
      rating: 5,
      comment: 'This is a test review. Great service!',
      status: 'approved'
    });

    // Save the review
    const savedReview = await testReview.save();
    console.log('Test review added successfully:', savedReview);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error adding test review:', error);
    process.exit(1);
  }
};

addTestReview();
