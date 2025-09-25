import express from 'express';
import multer from 'multer';
import {
  createReview,
  getReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public routes
router.route('/')
  .post(upload.single('avatar'), createReview) // Handle file upload
  .get(getReviews); // This will handle GET /api/reviews/

// Admin routes
router.route('/admin')
  .get(getAllReviews); // This will handle GET /api/reviews/admin

// Update review status (admin only)
router.route('/:id')
  .patch(updateReviewStatus)
  .delete(deleteReview);

export default router;