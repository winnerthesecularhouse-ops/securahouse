// models/Achiever.js
import mongoose from "mongoose";

const achieverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String, // URL or path of the achiever's photo
      required: true,
    },
    score: {
      type: String, // e.g. "92%", "Rank 1"
      required: false,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "", // optional: course name (like "10th Board", "NEET")
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    isFeatured: {
      type: Boolean,
      default: false, // mark achiever as "featured" on homepage
    },
    order: {
      type: Number,
      default: 0, // for sorting if needed
    },
  },
  {
    timestamps: true, // keeps track of createdAt, updatedAt
  }
);

// Index for sorting and featured queries
achieverSchema.index({ isFeatured: 1, order: 1 });

const Achiever = mongoose.model("Achiever", achieverSchema);
export default Achiever;
