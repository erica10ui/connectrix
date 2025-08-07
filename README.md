# Connectrix Backend API

A comprehensive Node.js backend API for the Connectrix mentorship platform, built with Express.js and Firebase Admin SDK.

## 🚀 Features

- **Authentication & Authorization**: Firebase Auth integration with JWT tokens
- **User Management**: Complete user profile management for students and alumni
- **Mentorship System**: Smart pairing algorithm and mentorship request handling
- **Real-time Messaging**: In-app chat system with conversation management
- **Event Management**: Create, manage, and register for events
- **Rating System**: Comprehensive mentorship quality rating and review system
- **Notification System**: Real-time notifications and alerts
- **File Upload**: Profile pictures and document upload support
- **Security**: Rate limiting, input validation, and CORS protection

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore database
- Firebase Admin SDK service account key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Firebase Setup**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Download the JSON file
   - Update the Firebase configuration in `.env`

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login with Firebase token | Public |
| POST | `/api/auth/verify` | Verify Firebase token | Public |
| GET | `/api/auth/profile` | Get current user profile | Private |
| POST | `/api/auth/refresh` | Refresh JWT token | Private |
| POST | `/api/auth/forgot-password` | Send password reset email | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |

### User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:uid` | Get user by ID | Private |
| PUT | `/api/users/:uid` | Update user profile | Owner/Admin |
| DELETE | `/api/users/:uid` | Delete user | Admin |
| GET | `/api/users/search` | Search users | Private |
| GET | `/api/users/stats` | Get user statistics | Admin |

### Mentor Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/mentors` | Get all mentors | Public |
| GET | `/api/mentors/:uid` | Get mentor profile | Public |
| POST | `/api/mentors/setup` | Setup mentor profile | Alumni |
| PUT | `/api/mentors/profile` | Update mentor profile | Mentor |
| GET | `/api/mentors/requests` | Get mentorship requests | Mentor |
| POST | `/api/mentors/requests/:id/accept` | Accept request | Mentor |
| POST | `/api/mentors/requests/:id/decline` | Decline request | Mentor |

### Student Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/students` | Get all students | Admin/Mentor |
| GET | `/api/students/:uid` | Get student profile | Private |
| PUT | `/api/students/profile` | Update student profile | Student |
| GET | `/api/students/mentors` | Get student's mentors | Student |
| GET | `/api/students/requests` | Get mentorship requests | Student |

### Pairing System

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/pairing/request` | Request mentorship | Student |
| POST | `/api/pairing/auto-match` | Get auto matches | Student |
| POST | `/api/pairing/bulk-request` | Send bulk requests | Student |
| GET | `/api/pairing/suggestions` | Get mentor suggestions | Student |
| GET | `/api/pairing/compatibility/:id` | Get compatibility score | Student |
| POST | `/api/pairing/accept` | Accept request | Mentor |
| POST | `/api/pairing/decline` | Decline request | Mentor |
| POST | `/api/pairing/end` | End mentorship | Both |

### Messaging System

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/messaging/conversations` | Get conversations | Private |
| POST | `/api/messaging/conversations` | Create conversation | Private |
| GET | `/api/messaging/conversations/:id` | Get conversation | Private |
| GET | `/api/messaging/conversations/:id/messages` | Get messages | Private |
| POST | `/api/messaging/conversations/:id/messages` | Send message | Private |
| PUT | `/api/messaging/messages/:id` | Edit message | Owner |
| DELETE | `/api/messaging/messages/:id` | Delete message | Owner |
| POST | `/api/messaging/conversations/:id/read` | Mark as read | Private |

### Event Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/events` | Get all events | Public |
| GET | `/api/events/:id` | Get event details | Public |
| POST | `/api/events` | Create event | Admin/Mentor |
| PUT | `/api/events/:id` | Update event | Owner/Admin |
| DELETE | `/api/events/:id` | Delete event | Owner/Admin |
| POST | `/api/events/:id/register` | Register for event | Private |
| DELETE | `/api/events/:id/register` | Unregister from event | Private |
| GET | `/api/events/my-events` | Get user's events | Private |
| GET | `/api/events/registered` | Get registered events | Private |

### Rating System

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/ratings` | Create rating | Student |
| GET | `/api/ratings/mentor/:id` | Get mentor ratings | Public |
| GET | `/api/ratings/my-ratings` | Get user's ratings | Private |
| PUT | `/api/ratings/:id` | Update rating | Owner |
| DELETE | `/api/ratings/:id` | Delete rating | Owner |
| GET | `/api/ratings/mentor/:id/average` | Get average rating | Public |
| GET | `/api/ratings/mentor/:id/stats` | Get rating stats | Public |
| GET | `/api/ratings/top-mentors` | Get top mentors | Public |

### Notifications

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/notifications` | Get notifications | Private |
| GET | `/api/notifications/unread-count` | Get unread count | Private |
| POST | `/api/notifications/:id/read` | Mark as read | Private |
| POST | `/api/notifications/read-all` | Mark all as read | Private |
| DELETE | `/api/notifications/:id` | Delete notification | Private |
| DELETE | `/api/notifications/clear-all` | Clear all notifications | Private |
| GET | `/api/notifications/settings` | Get settings | Private |
| PUT | `/api/notifications/settings` | Update settings | Private |

## 🔐 Authentication

The API uses Firebase Authentication with JWT tokens:

1. **Client-side**: Use Firebase Auth to get ID token
2. **API calls**: Include token in Authorization header:
   ```
   Authorization: Bearer <firebase-id-token>
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── firebase.js          # Firebase Admin SDK configuration
├── controllers/             # Route controllers (to be implemented)
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── errorHandler.js     # Error handling middleware
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   ├── mentors.js          # Mentor-specific routes
│   ├── students.js         # Student-specific routes
│   ├── pairing.js          # Pairing system routes
│   ├── messaging.js        # Messaging system routes
│   ├── events.js           # Event management routes
│   ├── ratings.js          # Rating system routes
│   └── notifications.js    # Notification routes
├── services/               # Business logic services (to be implemented)
├── utils/
│   └── validation.js       # Input validation utilities
├── uploads/                # File upload directory
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── env.example             # Environment variables example
└── README.md               # This file
```

## 🚀 Getting Started

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Test the API**:
   ```bash
   curl http://localhost:5000/health
   ```

3. **View API documentation**:
   ```
   http://localhost:5000/api
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Code Style

- Use ES6+ features
- Follow async/await pattern
- Implement proper error handling
- Add JSDoc comments for functions
- Use meaningful variable names

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for Express
- **JWT Verification**: Secure token-based authentication
- **Role-based Access**: Granular permission system

## 📝 Error Handling

The API uses a centralized error handling system:

```javascript
// Example error response
{
  "success": false,
  "error": "Validation Error",
  "message": "Email is required"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting guide
- Review the API documentation

## 🔄 Updates

Stay updated with the latest changes:
- Check the changelog
- Follow the release notes
- Update dependencies regularly 