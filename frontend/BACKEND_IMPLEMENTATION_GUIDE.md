# 🚗 CarpoolConnect Backend Implementation Guide

## 📋 Quick Setup Overview

This guide provides the complete backend implementation for the CarpoolConnect frontend. The frontend is already built and ready - you just need to implement these exact API endpoints.

## 🔧 Required API Endpoints

### 🔐 Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### 🚗 Ride Management Endpoints
- `POST /api/rides/offer` - Create a new ride
- `GET /api/rides/my-rides` - Get user's offered rides
- `GET /api/rides/search` - Search available rides
- `GET /api/rides/{id}` - Get ride details
- `PUT /api/rides/{id}/update` - Update ride details
- `DELETE /api/rides/{id}` - Delete a ride
- `DELETE /api/rides/{id}/cancel` - Cancel a ride

### 📝 Booking Management Endpoints
- `POST /api/rides/{id}/book` - Book a ride
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PUT /api/bookings/{id}/cancel` - Cancel a booking

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    location VARCHAR(255),
    bio TEXT,
    profile_picture_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT false,
    is_driver BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_rides INT DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Rides Table
```sql
CREATE TABLE rides (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    driver_id BIGINT NOT NULL,
    from_location VARCHAR(255) NOT NULL,
    to_location VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    price_per_seat DECIMAL(8,2) NOT NULL,
    car_model VARCHAR(100) NOT NULL,
    car_number VARCHAR(20) NOT NULL,
    additional_info TEXT,
    instant_booking BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id)
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ride_id BIGINT NOT NULL,
    passenger_id BIGINT NOT NULL,
    seats_booked INT NOT NULL,
    total_amount DECIMAL(8,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_id VARCHAR(255),
    pickup_location VARCHAR(255),
    drop_location VARCHAR(255),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rides(id),
    FOREIGN KEY (passenger_id) REFERENCES users(id)
);
```

## 📡 API Request/Response Formats

### Standard Response Format
All API endpoints should return responses in this format:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

For errors:
```json
{
  "success": false,
  "data": null,
  "message": "Error message"
}
```

### 🔐 Authentication Endpoints

#### POST /api/auth/register
**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "location": "City, State"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "location": "City, State",
      "isVerified": false,
      "isDriver": false
    },
    "token": "jwt_token_here"
  },
  "message": "Registration successful"
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "location": "City, State",
      "isVerified": false,
      "isDriver": true
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### 🚗 Ride Management Endpoints

#### POST /api/rides/offer
**Request:**
```json
{
  "from": "New York",
  "to": "Boston", 
  "departureDate": "2024-03-15",
  "departureTime": "10:30",
  "passengers": 3,
  "pricePerSeat": 25.50,
  "carModel": "Toyota Camry",
  "carNumber": "NY-123-456",
  "additionalInfo": "Non-smoking car",
  "instantBooking": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "driverId": 1,
    "from": "New York",
    "to": "Boston",
    "departureDate": "2024-03-15",
    "departureTime": "10:30",
    "totalSeats": 3,
    "availableSeats": 3,
    "pricePerSeat": 25.50,
    "carModel": "Toyota Camry", 
    "carNumber": "NY-123-456",
    "additionalInfo": "Non-smoking car",
    "instantBooking": true,
    "status": "active",
    "createdAt": "2024-03-10T08:00:00Z"
  },
  "message": "Ride created successfully"
}
```

#### GET /api/rides/my-rides
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "from": "New York",
      "to": "Boston",
      "departureDate": "2024-03-15",
      "departureTime": "10:30",
      "totalSeats": 3,
      "availableSeats": 2,
      "pricePerSeat": 25.50,
      "carModel": "Toyota Camry",
      "carNumber": "NY-123-456",
      "status": "active",
      "bookingsCount": 1
    }
  ],
  "message": "Rides retrieved successfully"
}
```

#### GET /api/rides/search
**Query Parameters:**
- `fromLocation` (required)
- `toLocation` (required) 
- `departureDate` (required)
- `requiredSeats` (optional, default 1)

**Example:** `/api/rides/search?fromLocation=New York&toLocation=Boston&departureDate=2024-03-15&requiredSeats=2`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "from": "New York",
      "to": "Boston", 
      "departureDate": "2024-03-15",
      "departureTime": "10:30",
      "availableSeats": 2,
      "pricePerSeat": 25.50,
      "carModel": "Toyota Camry",
      "driver": {
        "id": 1,
        "name": "John Doe",
        "phone": "+1234567890",
        "rating": 4.8
      },
      "instantBooking": true
    }
  ],
  "message": "Search completed"
}
```

#### PUT /api/rides/{id}/update
**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "from": "New York",
  "to": "Boston",
  "departureDate": "2024-03-16", 
  "departureTime": "11:00",
  "passengers": 4,
  "pricePerSeat": 30.00,
  "carModel": "Honda Accord",
  "carNumber": "NY-789-012",
  "additionalInfo": "Updated info",
  "instantBooking": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "from": "New York",
    "to": "Boston",
    "departureDate": "2024-03-16",
    "departureTime": "11:00",
    "totalSeats": 4,
    "availableSeats": 4,
    "pricePerSeat": 30.00,
    "carModel": "Honda Accord",
    "carNumber": "NY-789-012",
    "additionalInfo": "Updated info",
    "instantBooking": false,
    "status": "active"
  },
  "message": "Ride updated successfully"
}
```

#### DELETE /api/rides/{id}
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Ride deleted successfully"
}
```

### 📝 Booking Management Endpoints

#### POST /api/rides/{id}/book
**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "seatsRequired": 2,
  "pickupLocation": "Times Square, NY",
  "dropLocation": "Downtown Boston"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 456,
    "rideId": 123,
    "passengerId": 2,
    "seatsBooked": 2,
    "totalAmount": 51.00,
    "status": "pending",
    "paymentStatus": "pending",
    "pickupLocation": "Times Square, NY",
    "dropLocation": "Downtown Boston",
    "bookingDate": "2024-03-10T08:30:00Z"
  },
  "message": "Booking created successfully"
}
```

#### GET /api/bookings/my-bookings
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 456,
      "seatsBooked": 2,
      "totalAmount": 51.00,
      "status": "confirmed",
      "paymentStatus": "completed",
      "bookingDate": "2024-03-10T08:30:00Z",
      "ride": {
        "id": 123,
        "from": "New York",
        "to": "Boston",
        "departureDate": "2024-03-15",
        "departureTime": "10:30",
        "pricePerSeat": 25.50
      },
      "driver": {
        "id": 1,
        "name": "John Doe",
        "phone": "+1234567890",
        "rating": 4.8
      }
    }
  ],
  "message": "Bookings retrieved successfully"
}
```

#### PUT /api/bookings/{id}/cancel
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 456,
    "status": "cancelled",
    "refundAmount": 51.00,
    "refundStatus": "processing"
  },
  "message": "Booking cancelled successfully"
}
```

## 🔒 Security Implementation

### JWT Token Structure
Include these claims in JWT tokens:
```json
{
  "sub": "user_id",
  "email": "user@example.com", 
  "name": "User Name",
  "iat": 1234567890,
  "exp": 1234567890,
  "roles": ["USER", "DRIVER"]
}
```

### Required Security Headers
- `Authorization: Bearer {jwt_token}` for protected endpoints
- Enable CORS for frontend domain
- Implement rate limiting
- Validate all input data
- Hash passwords with bcrypt

## 🚀 Quick Start Implementation

1. **Set up your preferred backend framework** (Spring Boot, Node.js, Django, etc.)

2. **Create the database tables** using the provided schema

3. **Implement authentication** with JWT tokens

4. **Create the API endpoints** following the exact request/response formats

5. **Test with the frontend** by running the React app and using these features:
   - Register/Login
   - Offer a ride  
   - Search for rides
   - Book a ride
   - View dashboard with rides/bookings
   - Edit/delete rides
   - Cancel bookings

6. **Start your backend server** on `http://localhost:8080` (or update `VITE_API_URL` in frontend)

## 🧪 Testing the Integration

The frontend is already complete and will work immediately once you implement these endpoints. Test these user flows:

1. **Driver Flow:**
   - Register → Login → Offer Ride → View Dashboard → Edit Ride → Delete Ride

2. **Passenger Flow:**  
   - Register → Login → Find Ride → Book Ride → View Bookings → Cancel Booking

3. **Mobile Responsive:**
   - Test all flows on mobile devices

## 📝 Notes

- Frontend expects **exact** field names in API responses
- All dates should be in `YYYY-MM-DD` format
- All times should be in `HH:MM` format  
- Status values: `active`, `completed`, `cancelled`, `pending`, `confirmed`
- Payment status values: `pending`, `completed`, `failed`, `refunded`

The frontend is production-ready and waiting for your backend implementation! 🚀
