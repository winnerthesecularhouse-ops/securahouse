import Review from '../models/Review.js';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Helper function to upload file buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'review-avatars' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Create new review
export const createReview = async (req, res) => {
  try {
    let avatarUrl = '';
    
    // Check if file was uploaded
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      avatarUrl = result.secure_url;
    } else if (req.body.avatar) {
      // If avatar URL is provided directly in the request body
      avatarUrl = req.body.avatar;
    }

    const reviewData = {
      ...req.body,
      ...(avatarUrl && { avatar: avatarUrl }) // Only add avatar if it exists
    };

    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews (public)
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews (admin only)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review status (admin only)
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review (admin only)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      console.error('No review ID provided');
      return res.status(400).json({ message: 'Review ID is required' });
    }
    
    const review = await Review.findById(id);
    
    if (!review) {

      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Delete from database
    await Review.findByIdAndDelete(id);
    
    // If the review has an avatar in Cloudinary, delete it
    if (review.avatar && review.avatar.includes('cloudinary')) {
      try {
        const publicId = review.avatar.split('/').pop().split('.')[0];
    
        await cloudinary.uploader.destroy(`review-avatars/${publicId}`);
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Don't fail the request if Cloudinary deletion fails
      }
    }
    
    res.json({ 
      success: true,
      message: 'Review deleted successfully',
      deletedId: id
    });
  } catch (error) {
    console.error('Error in deleteReview:', {
      message: error.message,
      stack: error.stack,
      params: req.params,
      body: req.body
    });
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete review',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};