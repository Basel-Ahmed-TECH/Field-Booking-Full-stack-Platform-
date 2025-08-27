# User Profile System - Football Booking Platform

This guide explains how to use the new user profile system that has been added to your football booking platform.

## 🎯 What's Been Added

### 1. User Profile Page (`/profile.html`)
A comprehensive user profile page that displays:
- **User Information**: Name, email, phone number, role
- **Account Details**: Member since date, total bookings, account status
- **Booking History**: All user bookings displayed as beautiful cards with:
  - Field name and location
  - Booking dates and times
  - Booking status (upcoming/completed)
  - Deposit payment status
  - Booking ID

### 2. Authentication System
- **Login Page** (`/login.html`): Secure user authentication
- **Protected Routes**: Profile page requires authentication
- **Token Management**: JWT-based authentication with auto-redirect

### 3. Enhanced Backend
- **User Profile Endpoint**: `GET /api/users/profile` - Returns current user data
- **Phone Number Field**: Added to User model with validation
- **Static File Serving**: Express now serves HTML files from `public/` directory

## 🚀 How to Use

### Step 1: Start the Server
```bash
npm run dev
```

### Step 2: Access the Application
- **Home Page**: `http://localhost:5000/` - Landing page with navigation
- **Login Page**: `http://localhost:5000/login.html` - User authentication
- **Profile Page**: `http://localhost:5000/profile.html` - User profile and bookings

### Step 3: Testing with Demo Data
The login page includes demo credentials:
- **Email**: `demo@example.com`
- **Password**: `password123`

*Note: You'll need to create this user in your database first, or use existing user credentials.*

## 🎨 Features

### Profile Page Features
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Data**: Fetches live data from your backend APIs
- **Interactive Cards**: Hover effects and smooth animations
- **Status Indicators**: Visual indicators for booking and deposit status
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Smooth loading indicators while fetching data

### Booking Cards Display
Each booking is shown as a card with:
- **Field Information**: Name and location with location icon
- **Time Details**: Full start and end date/time
- **Status Badge**: Color-coded status (upcoming = blue, completed = green)
- **Deposit Status**: Visual indicator for payment status
- **Booking Reference**: Unique booking ID for tracking

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Auto-redirect**: Redirects to login if not authenticated
- **Token Validation**: Verifies token validity on page load
- **Secure Logout**: Proper token cleanup on logout

## 🔧 Technical Details

### API Endpoints Used
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/bookings` - Get user's booking history
- `POST /api/auth/login` - User authentication

### File Structure
```
public/
├── index.html          # Home page with navigation
├── login.html          # Authentication page
└── profile.html        # User profile and bookings

models/
└── User.js             # Updated with phone field

routes/
└── user.routes.js      # Added profile endpoint

index.js                # Updated to serve static files
```

### Database Schema Updates
The User model now includes:
```javascript
phone: {
  type: String,
  validate: {
    validator: function(v) {
      return !v || validator.isMobilePhone(v);
    },
    message: 'Enter a valid phone number'
  }
}
```

## 🎉 Ready to Use!

Your user profile system is now fully functional! Users can:

1. **Login** through the secure authentication system
2. **View their profile** with personal information
3. **Browse booking history** with detailed information cards
4. **Navigate easily** between different pages
5. **Enjoy a beautiful UI** with modern design and animations

The system integrates seamlessly with your existing backend APIs and database structure, requiring no additional setup beyond starting your server.

---

**Need help?** The system includes comprehensive error handling and user feedback to guide users through any issues.