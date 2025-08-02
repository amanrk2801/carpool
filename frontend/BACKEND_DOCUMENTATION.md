# 🚗 CarpoolConnect - Backend Developer Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack Requirements](#tech-stack-requirements)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Authentication & Security](#authentication--security)
- [Database Schema](#database-schema)
- [Business Logic](#business-logic)
- [Integration Requirements](#integration-requirements)
- [Error Handling](#error-handling)
- [Testing Requirements](#testing-requirements)
- [Deployment Guidelines](#deployment-guidelines)

---

## 🌟 Overview

This document provides comprehensive backend requirements for the CarpoolConnect platform. The frontend is a React-based carpool application that requires a robust backend API to handle user authentication, ride management, booking system, and real-time features.

### **Current Frontend Capabilities**
- User authentication (login/signup)
- Ride offering and searching
- Booking management
- User profile management
- Real-time form validation
- Responsive design with mobile support

### **Demo Credentials (Frontend)**
- **Passenger**: `abc@gmail.com` / `123456`
- **Driver**: `driver@gmail.com` / `123456`

---

## 🛠️ Tech Stack Requirements

### **Recommended Backend Technologies**

#### **Core Framework**
- **Node.js + Express.js** (Primary recommendation)
- **Python + Django/FastAPI** (Alternative)
- **Java + Spring Boot** (Enterprise option)
- **C# + ASP.NET Core** (Microsoft stack)

#### **Database**
- **Primary**: PostgreSQL (recommended for geospatial queries)
- **Alternative**: MongoDB (for flexibility)
- **Cache**: Redis (for sessions and real-time data)

#### **Essential Services**
- **Authentication**: JWT tokens
- **File Storage**: AWS S3/Google Cloud Storage
- **Maps/Geocoding**: Google Maps API
- **Payments**: Stripe/Razorpay (India)
- **SMS/Email**: Twilio/SendGrid
- **Real-time**: Socket.io/WebSocket

---

## 🔌 API Endpoints

### **Authentication Endpoints**

#### `POST /api/auth/register`
**Purpose**: User registration with email and phone verification

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "phone": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "isVerified": false
  },
  "token": "jwt_token"
}
```

#### `POST /api/auth/login`
**Purpose**: User authentication

**Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "phone": "string",
    "rating": "number",
    "totalTrips": "number",
    "isVerified": "boolean"
  },
  "token": "jwt_token"
}
```

#### `POST /api/auth/logout`
**Purpose**: User logout and token invalidation

**Headers**: `Authorization: Bearer <token>`

### **Ride Management Endpoints**

#### `POST /api/rides/offer`
**Purpose**: Create a new ride offer

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "from": "string",
  "to": "string",
  "departureDate": "YYYY-MM-DD",
  "departureTime": "HH:MM",
  "passengers": "number (1-8)",
  "pricePerSeat": "number",
  "carModel": "string",
  "carNumber": "string",
  "additionalInfo": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Ride offered successfully",
  "ride": {
    "id": "uuid",
    "driver": "User object",
    "route": {
      "from": "string",
      "to": "string"
    },
    "departure": {
      "date": "string",
      "time": "string"
    },
    "car": {
      "model": "string",
      "number": "string"
    },
    "pricing": {
      "pricePerSeat": "number",
      "availableSeats": "number"
    },
    "status": "active"
  }
}
```

#### `GET /api/rides/search`
**Purpose**: Search for available rides

**Query Parameters**:
```
from=string&to=string&date=YYYY-MM-DD&time=HH:MM&passengers=number
```

**Response**:
```json
{
  "success": true,
  "rides": [
    {
      "id": "uuid",
      "driver": {
        "name": "string",
        "rating": "number",
        "trips": "number"
      },
      "route": {
        "from": "string",
        "to": "string"
      },
      "time": "HH:MM",
      "date": "YYYY-MM-DD",
      "car": "string",
      "price": "number",
      "seats": "number",
      "instant": "boolean"
    }
  ],
  "total": "number"
}
```

#### `GET /api/rides/my-rides`
**Purpose**: Get user's offered rides

**Headers**: `Authorization: Bearer <token>`

### **Booking Endpoints**

#### `POST /api/bookings/create`
**Purpose**: Create a booking request

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "rideId": "uuid",
  "seats": "number",
  "message": "string"
}
```

#### `GET /api/bookings/my-bookings`
**Purpose**: Get user's bookings

**Headers**: `Authorization: Bearer <token>`

#### `PUT /api/bookings/:id/status`
**Purpose**: Update booking status (accept/reject)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "status": "accepted|rejected|completed"
}
```

### **User Profile Endpoints**

#### `GET /api/users/profile`
**Purpose**: Get user profile

**Headers**: `Authorization: Bearer <token>`

#### `PUT /api/users/profile`
**Purpose**: Update user profile

**Headers**: `Authorization: Bearer <token>`

#### `POST /api/users/verify-documents`
**Purpose**: Upload verification documents

**Headers**: `Authorization: Bearer <token>`

---

## 📊 Data Models

### **User Model**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_trips INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Rides Model**
```sql
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES users(id),
  from_location VARCHAR(255) NOT NULL,
  to_location VARCHAR(255) NOT NULL,
  from_coordinates POINT,
  to_coordinates POINT,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  available_seats INTEGER NOT NULL CHECK (available_seats >= 0 AND available_seats <= 8),
  price_per_seat DECIMAL(10,2) NOT NULL,
  car_model VARCHAR(100) NOT NULL,
  car_number VARCHAR(20) NOT NULL,
  additional_info TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  instant_booking BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Bookings Model**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ride_id UUID REFERENCES rides(id),
  passenger_id UUID REFERENCES users(id),
  seats_booked INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  message TEXT,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **User Verification Model**
```sql
CREATE TABLE user_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  document_type VARCHAR(50) NOT NULL,
  document_number VARCHAR(100) NOT NULL,
  document_image_url VARCHAR(500),
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Authentication & Security

### **JWT Token Structure**
```json
{
  "user_id": "uuid",
  "email": "string",
  "role": "user|driver|admin",
  "iat": "timestamp",
  "exp": "timestamp"
}
```

### **Security Requirements**

#### **Password Security**
- Minimum 6 characters (as per frontend validation)
- Hash with bcrypt (salt rounds: 12)
- Password reset with email verification

#### **Input Validation**
- Email format validation
- Phone number format (Indian format preferred)
- XSS protection for all text inputs
- SQL injection prevention

#### **Rate Limiting**
- Login attempts: 5 per 15 minutes
- API calls: 100 per minute per user
- Search requests: 20 per minute

#### **Data Protection**
- HTTPS only
- Secure headers
- CORS configuration
- Input sanitization

---

## 💾 Database Schema

### **Indexes for Performance**
```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Ride indexes
CREATE INDEX idx_rides_driver ON rides(driver_id);
CREATE INDEX idx_rides_location ON rides(from_location, to_location);
CREATE INDEX idx_rides_date ON rides(departure_date);
CREATE INDEX idx_rides_status ON rides(status);

-- Booking indexes
CREATE INDEX idx_bookings_ride ON bookings(ride_id);
CREATE INDEX idx_bookings_passenger ON bookings(passenger_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Geospatial indexes for location queries
CREATE INDEX idx_rides_from_coords ON rides USING GIST (from_coordinates);
CREATE INDEX idx_rides_to_coords ON rides USING GIST (to_coordinates);
```

---

## 🎯 Business Logic

### **Ride Matching Algorithm**
1. **Location Matching**: Exact match or within 5km radius
2. **Date/Time Filtering**: Same day, within 2-hour window
3. **Seat Availability**: Available seats >= requested seats
4. **Price Range**: User-defined price filters
5. **Rating Filter**: Minimum driver rating threshold

### **Booking Workflow**
1. **Instant Booking**: Immediate confirmation for instant-enabled rides
2. **Request Booking**: Driver approval required
3. **Payment Processing**: Hold payment until trip completion
4. **Trip Tracking**: Real-time location updates
5. **Completion**: Release payment and update ratings

### **Pricing Logic**
```javascript
// Total earning calculation (from frontend)
totalEarning = pricePerSeat * availableSeats

// Platform fee (suggested)
platformFee = totalAmount * 0.05 // 5%
driverEarning = totalAmount - platformFee
```

---

## 🔄 Integration Requirements

### **Frontend Integration Points**

#### **Form Validations** (Already implemented in frontend)
- Email format validation
- Password minimum 6 characters
- Required field validations
- Real-time error display

#### **State Management**
- User session in localStorage
- Form data persistence
- Loading states
- Error states

#### **Routing Logic**
- Redirect drivers to `/offer-ride` after login
- Redirect passengers to `/find-ride` after login
- Protected routes requiring authentication

### **External Integrations**

#### **Google Maps API**
- Geocoding for address coordinates
- Distance and duration calculations
- Route optimization
- Real-time location tracking

#### **Payment Gateway (Razorpay recommended for India)**
```javascript
// Payment flow
POST /api/payments/create-order
POST /api/payments/verify-payment
POST /api/payments/refund
```

#### **SMS Service (for OTP verification)**
```javascript
POST /api/sms/send-otp
POST /api/sms/verify-otp
```

---

## ⚠️ Error Handling

### **Standard Error Response Format**
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  },
  "timestamp": "ISO_8601_datetime"
}
```

### **Common Error Codes**
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `RIDE_001`: Ride not found
- `BOOK_001`: Insufficient seats
- `USER_001`: User not verified
- `VALID_001`: Validation failed

### **Frontend Error Handling Expectations**
The frontend already handles:
- Form validation errors
- Network errors with retry
- User-friendly error messages
- Loading states during API calls

---

## 🧪 Testing Requirements

### **Unit Tests**
- Authentication middleware
- Input validation functions
- Business logic functions
- Database queries

### **Integration Tests**
- API endpoint testing
- Database integration
- External service mocking

### **Load Testing**
- Concurrent user scenarios
- Database performance
- API response times

---

## 🚀 Deployment Guidelines

### **Environment Variables**
```env
# Database
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h

# External APIs
GOOGLE_MAPS_API_KEY=your_api_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret

# Email/SMS
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

TWILIO_SID=your_sid
TWILIO_TOKEN=your_token
```

### **Production Considerations**
- Load balancer configuration
- Database connection pooling
- Logging and monitoring
- Backup strategies
- SSL certificate setup

---

## 📱 Frontend Integration Notes

### **Current Frontend Features**
1. **Authentication Flow**: Login redirects based on user type
2. **Form Handling**: Comprehensive validation and error display
3. **State Management**: localStorage for user sessions
4. **Responsive Design**: Mobile-first approach
5. **Loading States**: Proper UX during API calls

### **Expected API Response Times**
- Authentication: < 500ms
- Search rides: < 1000ms
- Create ride: < 800ms
- Booking operations: < 600ms

### **Data Persistence**
The frontend expects:
- User session persistence across browser sessions
- Form data validation before submission
- Real-time error feedback
- Consistent data format across all endpoints

---

## 🔗 Quick Start Backend Implementation

### **Node.js + Express Example Structure**
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── rideController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Ride.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── rides.js
│   │   └── bookings.js
│   └── utils/
│       ├── database.js
│       └── helpers.js
├── package.json
└── server.js
```

---

## 📞 Support & Questions

For backend implementation questions or clarifications:

- **Frontend Repository**: Current React codebase with all components
- **Demo Credentials**: Test with provided user accounts
- **API Expectations**: Based on frontend form submissions and data display
- **Business Logic**: Derived from frontend user flows

---

**Last Updated**: August 2, 2025  
**Frontend Version**: 1.0.0  
**Backend API Version**: To be implemented

---

*This documentation provides the complete backend requirements for the CarpoolConnect frontend application. Implement the APIs according to these specifications for seamless integration.*
