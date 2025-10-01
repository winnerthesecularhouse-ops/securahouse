# Backend API for Portfolio

This is the backend server for the portfolio website, built with Node.js, Express, and MongoDB. It provides API endpoints for managing achievements, testimonials, and admin functionality.

## 🚀 Features

- **Admin Authentication**: Secure login system for admin users
- **Achievement Management**: CRUD operations for achievers/success stories
- **Testimonial Management**: Handle user testimonials and reviews
- **File Uploads**: Image uploads using Cloudinary
- **CORS Enabled**: Configured for both production and development environments

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Environment Management**: dotenv

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   ```

## 🚦 Running the Server

1. Start the development server:
   ```bash
   npm start
   ```
2. The server will start on `http://localhost:5000`

## 🌐 API Endpoints

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/check-auth` - Check admin authentication status

### Achiever Routes
- `GET /api/achievers` - Get all achievers
- `POST /api/achievers` - Create new achiever (admin only)
- `PUT /api/achievers/:id` - Update achiever (admin only)
- `DELETE /api/achievers/:id` - Delete achiever (admin only)

### Review Routes
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review (admin only)
- `DELETE /api/reviews/:id` - Delete review (admin only)

## 🔒 Authentication

Admin routes are protected and require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## 📁 Project Structure

```
backend/
├── config/           # Database and other configurations
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/           # MongoDB models
├── routes/           # API routes
├── scripts/          # Utility scripts
├── .env              # Environment variables
├── server.js         # Main server file
└── package.json      # Project dependencies
```

## 📝 Notes

- The server uses CORS with specific allowed origins for security
- All sensitive data is stored in environment variables
- The `createAdmin.js` script can be used to create an initial admin user

## 📄 License

This project is licensed under the MIT License.
