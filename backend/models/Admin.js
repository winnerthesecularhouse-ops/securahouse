import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ✅ This creates the unique index — no need for schema.index()
      lowercase: true,
      trim: true,
      maxlength: 120,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // ✅ Prevents password from being sent in queries
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
    lastLoginAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt
  }
);

// 🔐 Hash password before save if modified
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Instance method to compare password
adminSchema.methods.matchPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
