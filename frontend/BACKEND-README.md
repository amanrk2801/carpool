# 🚗 CarpoolConnect Backend API

<div align="center">
  <img src="./public/vite.svg" alt="CarpoolConnect Logo" width="100" height="100">
  
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2+-green.svg)](https://spring.io/projects/spring-boot)
  [![Java](https://img.shields.io/badge/Java-17+-blue.svg)](https://openjdk.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://mysql.com/)
  [![JWT](https://img.shields.io/badge/JWT-Authentication-yellow.svg)](https://jwt.io/)
  
  **RESTful API for safe, affordable, and eco-friendly carpooling platform** 🇮🇳
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Request/Response Examples](#-requestresponse-examples)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Security](#-security)

---

## 🌟 Overview

The CarpoolConnect Backend API provides comprehensive functionality for a ride-sharing platform, supporting user authentication, ride management, booking system, payment processing, and real-time features.

### 🎯 Key Features

- **JWT-based Authentication** with role-based access control
- **Real-time Ride Tracking** with GPS coordinates
- **Secure Payment Processing** with multiple gateways
- **Advanced Search & Filtering** for ride discovery
- **Rating & Review System** for trust building
- **Emergency Features** with SOS alerts
- **File Upload** for document verification

---

## 🛠️ Tech Stack

### **Backend Framework**
- **Java 17+** - Programming language
- **Spring Boot 3.2+** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data access layer
- **MySQL 8.0+** - Relational database
- **Hibernate** - ORM framework

### **Authentication & Security**
- **JWT** - JSON Web Tokens for authentication
- **Spring Security** - Security framework
- **BCrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting with Bucket4j

### **File Handling & Storage**
- **Spring Boot File Upload** - File upload handling
- **Cloudinary** - Cloud-based image storage
- **Apache Commons FileUpload** - File processing

### **Real-time Features**
- **WebSocket** - Real-time communication
- **Spring Scheduler** - Scheduled tasks
- **Spring Boot Actuator** - Application monitoring

### **Payment Integration**
- **Razorpay Java SDK** - Payment gateway
- **Stripe Java SDK** - International payments

### **Testing & Documentation**
- **JUnit 5** - Testing framework
- **MockMvc** - Spring MVC testing
- **Swagger/OpenAPI 3** - API documentation
- **TestContainers** - Integration testing with containers

### **Build & Deployment**
- **Maven** - Build tool and dependency management
- **Docker** - Containerization
- **Spring Boot Actuator** - Health checks and metrics

---

## 🚀 Installation & Setup

### **Prerequisites**
```bash
Java 17+
MySQL 8.0+
Maven 3.8+
```

### **Installation Steps**

1. **Clone the repository**
```bash
git clone https://github.com/your-username/carpool-backend.git
cd carpool-backend
```

2. **Setup MySQL Database**
```bash
# Create database
mysql -u root -p
CREATE DATABASE carpoolconnect;
CREATE USER 'carpool_user'@'localhost' IDENTIFIED BY 'carpool_password';
GRANT ALL PRIVILEGES ON carpoolconnect.* TO 'carpool_user'@'localhost';
FLUSH PRIVILEGES;
```

3. **Setup environment variables**
```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your configurations
```

4. **Install dependencies and run**
```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run

# Run tests
mvn test
```

### **Development Scripts**
```bash
mvn spring-boot:run      # Start development server
mvn clean package       # Build the application
mvn test                 # Run test suite
mvn test -Dtest=**/*IT   # Run integration tests
mvn clean compile       # Compile the application
mvn spring-boot:build-image  # Build Docker image
```

---

## 🔐 Environment Variables

Create an `application.properties` file in `src/main/resources/`:

```properties
# Server Configuration
server.port=8080
spring.application.name=carpool-connect-api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/carpoolconnect?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=carpool_user
spring.datasource.password=carpool_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
app.jwt.secret=your-super-secret-jwt-key-256-bits-long
app.jwt.expiration=86400000
app.jwt.refresh-expiration=604800000

# File Upload Configuration
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

# Cloudinary Configuration
cloudinary.cloud-name=your-cloudinary-name
cloudinary.api-key=your-cloudinary-api-key
cloudinary.api-secret=your-cloudinary-api-secret

# Payment Gateway Configuration
razorpay.key-id=your-razorpay-key-id
razorpay.key-secret=your-razorpay-key-secret
stripe.secret-key=your-stripe-secret-key
stripe.webhook-secret=your-stripe-webhook-secret

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# SMS Configuration (Twilio)
twilio.account-sid=your-twilio-account-sid
twilio.auth-token=your-twilio-auth-token
twilio.phone-number=your-twilio-phone-number

# External APIs
google.maps.api-key=your-google-maps-api-key
firebase.admin-key=your-firebase-admin-key

# CORS Configuration
app.cors.allowed-origins=http://localhost:3000

# Rate Limiting
app.rate-limit.capacity=100
app.rate-limit.tokens=100
app.rate-limit.refill-period=PT1M

# Logging Configuration
logging.level.com.carpoolconnect=INFO
logging.file.name=logs/app.log
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} - %msg%n

# Actuator Configuration
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized
```

For **Production**, create `application-prod.properties`:
```properties
# Production Database
spring.datasource.url=jdbc:mysql://your-production-host:3306/carpoolconnect?useSSL=true&serverTimezone=UTC
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Production JPA Settings
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Security
app.jwt.secret=${JWT_SECRET}

# Production Logging
logging.level.com.carpoolconnect=WARN
logging.level.org.springframework.security=WARN
```

---

## 🗄️ Database Schema Design

### **Database Requirements**

The CarpoolConnect platform requires a robust relational database design to handle complex relationships between users, rides, bookings, and reviews. The schema should support:

- **Multi-role users** (passengers, drivers, admins)
- **Complex ride routing** with multiple stops
- **Real-time booking management**
- **Payment tracking and history**
- **Rating and review system**
- **Document verification workflow**

### **Core Entities Overview**

#### **1. User Entity**
**Table Name**: `users`

**Primary Fields**:
- `id` (Long, Primary Key, Auto-increment)
- `email` (String, Unique, Not Null) - User's email address
- `phone` (String, Unique, Not Null) - Phone number with country code
- `password` (String, Not Null) - BCrypt hashed password
- `first_name` (String, Not Null) - User's first name
- `last_name` (String, Not Null) - User's last name
- `avatar_url` (String, Nullable) - Profile picture URL
- `date_of_birth` (Date, Nullable) - User's date of birth
- `gender` (Enum: MALE, FEMALE, OTHER) - User's gender
- `bio` (String, Max 500 chars) - User description

**Address Information** (Embedded):
- `street` (String) - Street address
- `city` (String) - City name
- `state` (String) - State/Province
- `zip_code` (String) - Postal code
- `country` (String, Default: "India") - Country

**Verification Status** (Embedded):
- `is_email_verified` (Boolean, Default: false)
- `is_phone_verified` (Boolean, Default: false)
- `is_document_verified` (Boolean, Default: false)

**User Statistics** (Embedded):
- `total_rides` (Integer, Default: 0) - Total completed rides
- `total_distance` (Double, Default: 0.0) - Total distance traveled (km)
- `rating` (Double, Default: 0.0) - Average user rating
- `total_earnings` (Decimal, Default: 0) - Total earnings for drivers
- `total_ratings` (Integer, Default: 0) - Number of ratings received

**System Fields**:
- `status` (Enum: ACTIVE, SUSPENDED, DELETED) - Account status
- `last_active` (DateTime) - Last login/activity timestamp
- `created_at` (DateTime, Auto) - Account creation timestamp
- `updated_at` (DateTime, Auto) - Last update timestamp

**Relationships**:
- One-to-One with `DriverProfile` (optional)
- One-to-Many with `UserDocument` (verification documents)
- One-to-Many with `Ride` (as driver)
- One-to-Many with `Booking` (as passenger/driver)
- One-to-Many with `Review` (as reviewer/reviewee)

#### **2. Driver Profile Entity**
**Table Name**: `driver_profiles`

**Fields**:
- `id` (Long, Primary Key)
- `user_id` (Long, Foreign Key to User)
- `license_number` (String, Not Null) - Driving license number
- `license_expiry` (Date, Not Null) - License expiry date
- `experience_years` (Integer) - Years of driving experience

**Relationships**:
- One-to-One with `User`
- One-to-Many with `Vehicle`

#### **3. Vehicle Entity**
**Table Name**: `vehicles`

**Fields**:
- `id` (Long, Primary Key)
- `driver_profile_id` (Long, Foreign Key)
- `make` (String, Not Null) - Car manufacturer
- `model` (String, Not Null) - Car model
- `year` (Integer) - Manufacturing year
- `license_plate` (String, Not Null, Unique) - Vehicle registration number
- `color` (String) - Vehicle color
- `capacity` (Integer, Not Null) - Maximum passenger capacity
- `is_active` (Boolean, Default: true) - Whether vehicle is active

#### **4. Ride Entity**
**Table Name**: `rides`

**Primary Fields**:
- `id` (Long, Primary Key, Auto-increment)
- `driver_id` (Long, Foreign Key to User, Not Null)
- `vehicle_id` (Long, Foreign Key to Vehicle, Not Null)
- `status` (Enum: ACTIVE, COMPLETED, CANCELLED, EXPIRED)
- `additional_info` (String, Max 1000 chars) - Additional ride information

**Route Information** (Embedded):
- `from_address` (String, Not Null) - Starting location address
- `from_latitude` (Double, Not Null) - Starting location latitude
- `from_longitude` (Double, Not Null) - Starting location longitude
- `to_address` (String, Not Null) - Destination address
- `to_latitude` (Double, Not Null) - Destination latitude
- `to_longitude` (Double, Not Null) - Destination longitude
- `distance` (Double) - Total distance in kilometers
- `estimated_duration` (Integer) - Estimated travel time in minutes

**Schedule Information** (Embedded):
- `departure_date` (Date, Not Null) - Ride departure date
- `departure_time` (Time, Not Null) - Ride departure time
- `arrival_time` (Time) - Estimated arrival time
- `is_recurring` (Boolean, Default: false) - Whether ride repeats
- `recurring_days` (String) - JSON array of recurring days

**Pricing Information** (Embedded):
- `price_per_seat` (Decimal, Not Null) - Cost per passenger seat
- `total_seats` (Integer, Not Null) - Total available seats
- `available_seats` (Integer, Not Null) - Currently available seats
- `currency` (String, Default: "INR") - Currency code

**Preferences** (Embedded):
- `instant_booking` (Boolean, Default: true) - Allow instant booking
- `allow_smoking` (Boolean, Default: false) - Smoking allowed
- `allow_pets` (Boolean, Default: false) - Pets allowed
- `allow_food` (Boolean, Default: true) - Food/drinks allowed
- `luggage_allowed` (Boolean, Default: true) - Luggage allowed
- `max_luggage_weight` (Integer) - Maximum luggage weight in kg

**Relationships**:
- Many-to-One with `User` (driver)
- Many-to-One with `Vehicle`
- One-to-Many with `RideStop`
- One-to-Many with `Booking`

#### **5. Ride Stop Entity**
**Table Name**: `ride_stops`

**Fields**:
- `id` (Long, Primary Key)
- `ride_id` (Long, Foreign Key to Ride)
- `address` (String, Not Null) - Stop location address
- `latitude` (Double, Not Null) - Stop latitude
- `longitude` (Double, Not Null) - Stop longitude
- `stop_order` (Integer, Not Null) - Order of the stop in route
- `estimated_arrival` (Time) - Estimated arrival time at stop

#### **6. Booking Entity**
**Table Name**: `bookings`

**Primary Fields**:
- `id` (Long, Primary Key, Auto-increment)
- `ride_id` (Long, Foreign Key to Ride, Not Null)
- `passenger_id` (Long, Foreign Key to User, Not Null)
- `driver_id` (Long, Foreign Key to User, Not Null)
- `seats` (Integer, Not Null, Min: 1) - Number of seats booked
- `total_amount` (Decimal, Not Null) - Total booking amount
- `status` (Enum: PENDING, CONFIRMED, COMPLETED, CANCELLED)

**Payment Information** (Embedded):
- `payment_method` (Enum: RAZORPAY, STRIPE, WALLET)
- `transaction_id` (String) - Payment gateway transaction ID
- `payment_status` (Enum: PENDING, COMPLETED, FAILED, REFUNDED)
- `paid_at` (DateTime) - Payment completion timestamp

**Pickup Information** (Embedded):
- `pickup_address` (String) - Pickup location address
- `pickup_latitude` (Double) - Pickup location latitude
- `pickup_longitude` (Double) - Pickup location longitude
- `pickup_time` (DateTime) - Scheduled pickup time

**Cancellation Information** (Embedded):
- `cancelled_by` (Long, Foreign Key to User) - Who cancelled the booking
- `cancellation_reason` (String) - Reason for cancellation
- `cancelled_at` (DateTime) - Cancellation timestamp
- `refund_amount` (Decimal) - Amount refunded

**Timestamps**:
- `created_at` (DateTime, Auto) - Booking creation time
- `updated_at` (DateTime, Auto) - Last update time

#### **7. Review Entity**
**Table Name**: `reviews`

**Fields**:
- `id` (Long, Primary Key)
- `booking_id` (Long, Foreign Key to Booking, Unique)
- `reviewer_id` (Long, Foreign Key to User, Not Null)
- `reviewee_id` (Long, Foreign Key to User, Not Null)
- `rating` (Integer, Not Null, Min: 1, Max: 5) - Overall rating
- `comment` (String, Max 500 chars) - Review comment
- `is_verified` (Boolean, Default: true) - Whether review is verified

**Category Ratings** (Embedded):
- `punctuality` (Integer, 1-5) - Punctuality rating
- `cleanliness` (Integer, 1-5) - Cleanliness rating
- `communication` (Integer, 1-5) - Communication rating
- `driving` (Integer, 1-5) - Driving skill rating (for drivers)
- `behavior` (Integer, 1-5) - Passenger behavior rating

**Timestamps**:
- `created_at` (DateTime, Auto) - Review creation time

#### **8. User Document Entity**
**Table Name**: `user_documents`

**Fields**:
- `id` (Long, Primary Key)
- `user_id` (Long, Foreign Key to User)
- `document_type` (Enum: AADHAAR, PAN, DRIVING_LICENSE)
- `document_number` (String, Not Null) - Document identification number
- `document_url` (String, Not Null) - Uploaded document image URL
- `verification_status` (Enum: PENDING, VERIFIED, REJECTED)
- `uploaded_at` (DateTime, Auto) - Upload timestamp
- `verified_at` (DateTime) - Verification timestamp

### **Database Indexes and Constraints**

#### **Primary Indexes**:
- All primary keys are automatically indexed
- Foreign key relationships are indexed

#### **Custom Indexes**:
- `users.email` - Unique index for fast email lookup
- `users.phone` - Unique index for phone number lookup
- `rides.departure_date` - Index for date-based searches
- `rides.from_address, rides.to_address` - Composite index for route searches
- `bookings.passenger_id, bookings.status` - Composite index for user bookings
- `reviews.reviewee_id` - Index for fetching user reviews

#### **Database Constraints**:
- Email format validation
- Phone number format validation
- Coordinate range validation (latitude: -90 to 90, longitude: -180 to 180)
- Price and amount positive value constraints
- Rating range constraints (1-5)
- Seat availability constraints

### **Enumeration Values**

#### **Gender**: `MALE`, `FEMALE`, `OTHER`
#### **UserStatus**: `ACTIVE`, `SUSPENDED`, `DELETED`
#### **RideStatus**: `ACTIVE`, `COMPLETED`, `CANCELLED`, `EXPIRED`
#### **BookingStatus**: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`
#### **PaymentMethod**: `RAZORPAY`, `STRIPE`, `WALLET`
#### **PaymentStatus**: `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED`
#### **DocumentType**: `AADHAAR`, `PAN`, `DRIVING_LICENSE`
#### **VerificationStatus**: `PENDING`, `VERIFIED`, `REJECTED`

---

## 🛣️ API Endpoints Specification

### **Base URL Configuration**
```
Development: http://localhost:8080/api/v1
Production: https://api.carpoolconnect.com/v1
```

### **API Design Principles**

- **RESTful Architecture**: All endpoints follow REST conventions
- **Consistent Response Format**: Standardized JSON response structure
- **HTTP Status Codes**: Proper status codes for different scenarios
- **API Versioning**: Version control through URL path (/v1/, /v2/, etc.)
- **Request/Response Headers**: Consistent header usage for authentication and content type
- **Pagination**: Cursor-based pagination for large datasets
- **Rate Limiting**: Implemented per endpoint based on functionality

### **Authentication Endpoints**

#### **User Registration**
- **Endpoint**: `POST /auth/register`
- **Purpose**: Create new user account with email/phone verification
- **Authentication**: None required
- **Rate Limit**: 5 requests per minute per IP

**Request Requirements**:
- Email format validation (RFC 5322 standard)
- Phone number with country code (+91 for India)
- Password strength: minimum 8 characters, alphanumeric with special chars
- First and last name validation (2-50 characters each)
- Role selection: "passenger" or "driver"

**Response Data**:
- User profile information (excluding sensitive data)
- JWT access token (24-hour expiry)
- JWT refresh token (7-day expiry)
- Account verification status

**Business Logic**:
- Check email/phone uniqueness
- Hash password using BCrypt
- Generate verification tokens
- Send welcome email with verification link
- Create user preferences with default values

#### **User Authentication**
- **Endpoint**: `POST /auth/login`
- **Purpose**: Authenticate existing user and provide access tokens
- **Authentication**: None required
- **Rate Limit**: 10 requests per minute per IP

**Request Requirements**:
- Email or phone number for login
- Password (plain text, will be hashed and compared)
- Optional "rememberMe" flag for extended session

**Response Data**:
- User profile with current statistics
- JWT access token with user claims
- JWT refresh token (if rememberMe is true)
- Last login timestamp update

**Business Logic**:
- Validate credentials against database
- Check account status (active/suspended/deleted)
- Update last active timestamp
- Generate new JWT tokens with user permissions

#### **Token Management**
- **Endpoint**: `POST /auth/refresh`
- **Purpose**: Refresh expired access token using valid refresh token
- **Authentication**: Valid refresh token required
- **Rate Limit**: 20 requests per minute per user

#### **Password Management**
- **Endpoint**: `POST /auth/forgot-password`
- **Purpose**: Initiate password reset process via email
- **Business Logic**: Generate secure reset token, send email with reset link

- **Endpoint**: `POST /auth/reset-password`
- **Purpose**: Complete password reset using token from email
- **Validation**: Token expiry check, password strength validation

#### **Account Verification**
- **Endpoint**: `POST /auth/verify-email`
- **Purpose**: Verify email address using token sent via email
- **Business Logic**: Mark email as verified, update user status

- **Endpoint**: `POST /auth/verify-phone`
- **Purpose**: Verify phone number using SMS OTP
- **Rate Limit**: 3 OTP requests per phone number per hour

#### **Session Management**
- **Endpoint**: `POST /auth/logout`
- **Purpose**: Invalidate user session and tokens
- **Authentication**: Valid access token required
- **Business Logic**: Blacklist current tokens, clear session data

---

### **User Management Endpoints**

#### **Profile Management**
- **Endpoint**: `GET /users/profile`
- **Purpose**: Retrieve complete user profile information
- **Authentication**: Valid JWT token required
- **Response Data**: Full profile including verification status, statistics, preferences

- **Endpoint**: `PUT /users/profile`
- **Purpose**: Update user profile information
- **Validation**: Field-specific validation rules, prevent sensitive field updates
- **Business Logic**: Update only provided fields, maintain data integrity

#### **Avatar Management**
- **Endpoint**: `POST /users/upload-avatar`
- **Purpose**: Upload and update user profile picture
- **File Requirements**: JPEG/PNG, max 5MB, minimum 200x200 pixels
- **Processing**: Resize, optimize, upload to cloud storage (Cloudinary)

#### **Document Verification**
- **Endpoint**: `POST /users/verify-documents`
- **Purpose**: Upload identity documents for verification
- **File Requirements**: Clear image, readable text, valid document types
- **Processing**: AI-based document validation, manual review queue
- **Supported Documents**: Aadhaar Card, PAN Card, Driving License

#### **Public Profile Access**
- **Endpoint**: `GET /users/:userId`
- **Purpose**: Get public profile information for other users
- **Data Filtering**: Only public information, no sensitive data
- **Use Case**: View driver/passenger profiles during booking process

---

### **Ride Management Endpoints**

#### **Ride Creation**
- **Endpoint**: `POST /rides/offer`
- **Purpose**: Create new ride offering as a driver
- **Authentication**: Driver verification required
- **Validation**: Route validation, pricing rules, capacity limits

**Required Data**:
- Route information (from/to locations with coordinates)
- Schedule (date, time, recurring options)
- Pricing (per seat cost, total seats)
- Vehicle information
- Ride preferences and policies
- Optional intermediate stops

**Business Logic**:
- Validate driver has verified license
- Calculate estimated duration using Google Maps API
- Set initial available seats equal to total seats
- Create ride with "active" status
- Index ride for search functionality

#### **Ride Search & Discovery**
- **Endpoint**: `GET /rides/search`
- **Purpose**: Find available rides based on search criteria
- **Caching**: Implement Redis caching for frequently searched routes

**Search Parameters**:
- Route: from and to locations (with radius tolerance)
- Date range: departure date with flexibility options
- Passenger count: number of seats required
- Price range: minimum and maximum price filters
- Preferences: pet-friendly, smoking allowed, etc.
- Sorting: price, rating, departure time, distance

**Response Features**:
- Pagination support (default 10 rides per page)
- Driver information and ratings
- Real-time seat availability
- Estimated travel time and distance
- Booking availability status

#### **Ride Details**
- **Endpoint**: `GET /rides/:rideId`
- **Purpose**: Get comprehensive ride information
- **Data Include**: Full route details, driver profile, vehicle info, booking history

#### **Driver's Ride Management**
- **Endpoint**: `GET /rides/my-rides`
- **Purpose**: List all rides created by current driver
- **Filtering**: Status-based filtering, date range filtering
- **Include**: Booking information, passenger details, earnings summary

- **Endpoint**: `PUT /rides/:rideId`
- **Purpose**: Update ride details (before departure)
- **Restrictions**: Cannot modify core details if bookings exist
- **Allowed Updates**: Schedule, preferences, additional information

- **Endpoint**: `DELETE /rides/:rideId`
- **Purpose**: Cancel ride and handle existing bookings
- **Business Logic**: Refund confirmed bookings, notify passengers, update status

---

### **Booking Management Endpoints**

#### **Booking Creation**
- **Endpoint**: `POST /bookings`
- **Purpose**: Create new ride booking as passenger
- **Validation**: Seat availability, pricing verification, schedule conflicts

**Required Data**:
- Ride ID and seat count
- Pickup location details
- Payment method selection
- Passenger contact information

**Business Logic**:
- Check real-time seat availability
- Calculate total amount including any fees
- Reserve seats temporarily (5-minute hold)
- Initiate payment process
- Handle instant vs. confirmation-required bookings

#### **Booking Management**
- **Endpoint**: `GET /bookings/my-bookings`
- **Purpose**: List user's bookings (as passenger or driver)
- **Role-based Response**: Different data based on user role in booking
- **Status Filtering**: Active, completed, cancelled bookings

**Passenger View**:
- Ride details and driver information
- Payment status and receipts
- Pickup details and timing
- Cancellation options and policies

**Driver View**:
- Passenger information and contact details
- Booking status and payment confirmation
- Pickup coordination details

#### **Booking Status Management**
- **Endpoint**: `PUT /bookings/:bookingId/status`
- **Purpose**: Update booking status (confirm/cancel)
- **Authorization**: Only driver or passenger can update their bookings
- **Business Logic**: Handle status transitions, refund processing, notification sending

#### **Payment Processing**
- **Endpoint**: `POST /bookings/:bookingId/payment/verify`
- **Purpose**: Verify payment completion from payment gateway
- **Security**: Signature verification, amount validation, duplicate prevention
- **Integration**: Support for Razorpay, Stripe, and wallet payments

---

### **Review & Rating Endpoints**

#### **Review Submission**
- **Endpoint**: `POST /reviews`
- **Purpose**: Submit review after ride completion
- **Validation**: Only completed bookings can be reviewed, one review per booking

**Review Data**:
- Overall rating (1-5 stars)
- Category-specific ratings (punctuality, cleanliness, communication, etc.)
- Written feedback (optional, 500 character limit)
- Anonymous option

**Business Logic**:
- Update user's average rating
- Calculate weighted ratings based on review count
- Flag inappropriate content for moderation
- Send notification to reviewed user

#### **Review Display**
- **Endpoint**: `GET /reviews/user/:userId`
- **Purpose**: Display reviews for specific user
- **Pagination**: Support for large review lists
- **Filtering**: Recent reviews, rating-based filtering
- **Privacy**: Respect user privacy settings

---

### **Real-time & Location Endpoints**

#### **Live Tracking**
- **Endpoint**: `POST /rides/:rideId/start`
- **Purpose**: Initiate real-time ride tracking
- **Authentication**: Only ride driver can start tracking
- **Business Logic**: Update booking status, notify passengers, start location streaming

- **Endpoint**: `PUT /rides/:rideId/location`
- **Purpose**: Update current location during active ride
- **Rate Limit**: Maximum 1 update per 30 seconds
- **Data**: GPS coordinates, timestamp, optional status message

#### **Emergency Features**
- **Endpoint**: `POST /emergency/sos`
- **Purpose**: Trigger emergency alert system
- **Priority**: High-priority processing, immediate notifications
- **Integration**: SMS alerts to emergency contacts, location sharing with authorities

---

### **Administrative Endpoints**

#### **User Management (Admin)**
- **Endpoint**: `GET /admin/users`
- **Purpose**: List and manage all platform users
- **Authorization**: Admin role required
- **Features**: User statistics, verification status, account actions

#### **Platform Analytics**
- **Endpoint**: `GET /admin/analytics`
- **Purpose**: Get comprehensive platform statistics
- **Data Include**: User growth, ride statistics, revenue metrics, geographic data

#### **Content Moderation**
- **Endpoint**: `GET /admin/reports`
- **Purpose**: Handle user reports and content moderation
- **Features**: Review flagged content, user behavior analysis, action history

---

## 🔒 Authentication Specification

### **JWT Token Requirements**

**Access Token Structure**:
- **Subject (sub)**: User ID as primary identifier
- **Email**: User's verified email address
- **Role**: User role for authorization (passenger/driver/admin)
- **Issued At (iat)**: Token creation timestamp
- **Expiration (exp)**: Token expiry (24 hours from creation)
- **Custom Claims**: Additional user permissions and verification status

**Refresh Token Requirements**:
- **Longer Expiry**: 7 days for standard users, 30 days with "rememberMe"
- **Single Use**: Must be invalidated after generating new access token
- **Secure Storage**: Store securely on client side (httpOnly cookies recommended)

### **Authentication Flow**

1. **User Registration/Login**: Validate credentials, generate token pair
2. **Token Validation**: Verify signature, expiry, and user status on each request
3. **Token Refresh**: Exchange valid refresh token for new access token
4. **Token Blacklisting**: Maintain blacklist for logged-out tokens
5. **Session Management**: Track active sessions per user

### **Authorization Levels**

- **Public**: No authentication required (registration, login, ride search)
- **Authenticated**: Valid access token required (profile management, booking)
- **Driver**: Driver verification required (ride creation, management)
- **Admin**: Administrative privileges required (user management, analytics)

### **Security Implementation**

- **Header Format**: `Authorization: Bearer <access_token>`
- **Token Validation**: Verify signature, expiry, and user status
- **Rate Limiting**: Implement per-user and per-endpoint limits
- **IP Validation**: Optional IP binding for enhanced security

---

## 📝 API Response Standards

### **Success Response Structure**
All successful API responses should follow this consistent format:

**Standard Fields**:
- `success`: Boolean indicating operation success (always true for successful responses)
- `message`: Human-readable success message
- `data`: Response payload containing the requested information
- `timestamp`: ISO 8601 timestamp of response generation
- `meta`: Optional metadata (pagination, counts, etc.)

### **Error Response Structure**
All error responses should follow this consistent format:

**Standard Fields**:
- `success`: Boolean indicating operation success (always false for errors)
- `error`: Error object containing detailed error information
  - `code`: Machine-readable error code (e.g., "VALIDATION_ERROR")
  - `message`: Human-readable error description
  - `details`: Array of specific field errors (for validation errors)
- `timestamp`: ISO 8601 timestamp of error occurrence
- `path`: API endpoint where error occurred

### **Pagination Standards**

**Query Parameters**:
- `page`: Page number (starting from 1)
- `limit`: Number of items per page (default: 10, max: 100)
- `sort`: Sort field name
- `order`: Sort direction ("asc" or "desc")

**Response Metadata**:
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `totalItems`: Total number of items
- `itemsPerPage`: Number of items per page
- `hasNext`: Boolean indicating if next page exists
- `hasPrev`: Boolean indicating if previous page exists

### **Data Validation Standards**

**Input Validation Requirements**:
- Email format validation using RFC 5322 standard
- Phone number validation with country code
- Password strength requirements (minimum 8 characters, alphanumeric + special)
- Date format validation (ISO 8601)
- Geographic coordinate validation (latitude: -90 to 90, longitude: -180 to 180)
- File upload validation (type, size, content)

**Output Data Formatting**:
- Timestamps in ISO 8601 format
- Decimal values with appropriate precision
- Consistent field naming (camelCase)
- Null handling for optional fields

---

## ⚠️ Error Handling

### **HTTP Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

### **Error Codes**
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Invalid credentials
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ERROR` - Resource already exists
- `PAYMENT_ERROR` - Payment processing failed
- `RATE_LIMIT_ERROR` - Too many requests

---

## 🧪 Testing Requirements

### **Testing Strategy**

**Unit Testing**:
- Test individual service methods and business logic
- Mock external dependencies (database, payment gateways, APIs)
- Achieve minimum 80% code coverage
- Test edge cases and error conditions

**Integration Testing**:
- Test API endpoints end-to-end
- Test database interactions with real test database
- Test external service integrations (payment gateways, email service)
- Test authentication and authorization flows

**End-to-End Testing**:
- Complete user journeys (registration → ride creation → booking → completion)
- Payment flow testing with test payment gateways
- Real-time features testing (location updates, notifications)

### **Test Data Management**

**Test Database Setup**:
- Separate test database environment
- Database seeding with realistic test data
- Test data cleanup between test runs
- Transaction rollback for isolated tests

**Test User Accounts**:
- Pre-created test users with different roles
- Test driver profiles with verified documents
- Test ride data with various scenarios
- Test payment accounts with known test credentials

### **Performance Testing**

**Load Testing Requirements**:
- Simulate concurrent user load (minimum 1000 users)
- Test API response times under load
- Database performance under concurrent access
- Memory and CPU usage monitoring

**Stress Testing**:
- Test system limits and breaking points
- Database connection pool limits
- Rate limiting effectiveness
- Error handling under extreme load

### **Security Testing**

**Authentication Testing**:
- JWT token validation and expiry
- Password hashing verification
- Session management security
- Rate limiting effectiveness

**Authorization Testing**:
- Role-based access control
- Resource access permissions
- Data privacy and user isolation
- Admin-only functionality protection

### **Test Environment Setup**

**Development Testing**:
- Local test database with sample data
- Mock external services for isolation
- Fast test execution for development feedback
- Automated test runs on code changes

**CI/CD Pipeline Testing**:
- Automated test runs on code commits
- Integration tests with real external services
- Test result reporting and failure notifications
- Test coverage reporting and enforcement

---

## 🚀 Deployment Specification

### **Environment Configuration**

**Development Environment**:
- Local MySQL database instance
- Local file storage for development
- Mock payment gateway credentials
- Debug logging enabled
- CORS allowed for localhost origins

**Staging Environment**:
- Cloud database with production-like data
- Cloud storage services configured
- Test payment gateway credentials
- Comprehensive logging enabled
- Limited CORS origins

**Production Environment**:
- High-availability database cluster
- CDN and cloud storage for scalability
- Production payment gateway credentials
- Optimized logging and monitoring
- Strict CORS and security policies

### **Infrastructure Requirements**

**Server Specifications**:
- **CPU**: Minimum 2 cores, recommended 4+ cores
- **RAM**: Minimum 4GB, recommended 8GB+
- **Storage**: SSD storage for database and application
- **Network**: High-speed internet with low latency

**Database Requirements**:
- **MySQL 8.0+** with InnoDB storage engine
- Connection pooling for concurrent access
- Regular backup strategy (daily automated backups)
- Read replicas for scaling read operations

**Load Balancing**:
- Multiple application instances for high availability
- Load balancer for request distribution
- Health checks for automatic failover
- Session affinity for stateful operations

### **Security Configuration**

**Network Security**:
- HTTPS enforcement with valid SSL certificates
- VPN access for administrative functions
- Firewall rules for database access
- DDoS protection and rate limiting

**Application Security**:
- Environment variables for sensitive configuration
- Encrypted database connections
- Secure file upload handling
- Regular security updates and patches

### **Monitoring and Logging**

**Application Monitoring**:
- Health check endpoints for system status
- Performance metrics collection
- Error tracking and alerting
- User activity monitoring

**Infrastructure Monitoring**:
- Server resource utilization
- Database performance metrics
- Network connectivity monitoring
- Storage usage and backup status

### **Deployment Process**

**Continuous Integration**:
- Automated testing on code commits
- Code quality checks and linting
- Security vulnerability scanning
- Build artifact creation

**Continuous Deployment**:
- Automated deployment to staging
- Manual approval for production deployment
- Database migration handling
- Rollback procedures for failed deployments

### **Backup and Recovery**

**Data Backup Strategy**:
- Daily automated database backups
- File storage backup for user uploads
- Configuration backup for system settings
- Regular backup restoration testing

**Disaster Recovery Plan**:
- Multiple geographic backup locations
- Recovery time objectives (RTO: 4 hours)
- Recovery point objectives (RPO: 1 hour)
- Documented recovery procedures

---

## 🛡️ Security

### **Security Measures**
- **Input Validation** - All inputs validated and sanitized
- **Rate Limiting** - API endpoints protected against abuse
- **CORS Configuration** - Proper cross-origin resource sharing
- **Helmet Integration** - Security headers implemented
- **SQL Injection Prevention** - MongoDB with Mongoose ODM
- **XSS Protection** - Output encoding and CSP headers
- **HTTPS Enforcement** - TLS encryption in production

### **Data Protection**
- **Password Hashing** - bcrypt with salt rounds
- **JWT Security** - Short-lived access tokens
- **File Upload Security** - Type and size validation
- **Environment Variables** - Sensitive data in env files

---

## 📚 API Documentation

### **Swagger/OpenAPI**
Access interactive API documentation at:
```
Development: http://localhost:5000/api-docs
Production: https://api.carpoolconnect.com/docs
```

### **Postman Collection**
Import the Postman collection for easy testing:
```bash
# Download collection
curl -o carpool-api.postman_collection.json \
  https://api.carpoolconnect.com/postman-collection
```

---

## 🔧 Development Guidelines & Standards

### **Project Structure Requirements**

**Recommended Directory Organization**:
```
src/
├── main/
│   ├── java/
│   │   └── com/carpoolconnect/
│   │       ├── config/          # Configuration classes
│   │       ├── controller/      # REST controllers
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── entity/         # JPA entities
│   │       ├── exception/      # Custom exceptions
│   │       ├── repository/     # Data repositories
│   │       ├── service/        # Business logic
│   │       ├── security/       # Security configuration
│   │       ├── util/           # Utility classes
│   │       └── CarpoolApplication.java
│   └── resources/
│       ├── application.properties
│       ├── application-prod.properties
│       └── data.sql
└── test/
    ├── java/
    └── resources/
```

### **Code Standards & Conventions**

**Java Naming Conventions**:
- **Classes**: PascalCase (UserController, BookingService)
- **Methods**: camelCase (getUserProfile, createBooking)
- **Variables**: camelCase (userId, totalAmount)
- **Constants**: UPPER_SNAKE_CASE (JWT_SECRET, MAX_FILE_SIZE)
- **Packages**: lowercase (com.carpoolconnect.service)

**API Naming Conventions**:
- **Endpoints**: kebab-case for URLs (/api/v1/user-profile)
- **JSON Fields**: camelCase (firstName, isEmailVerified)
- **Query Parameters**: camelCase (sortBy, pageSize)
- **HTTP Methods**: Follow REST conventions (GET, POST, PUT, DELETE)

### **Error Handling Standards**

**Exception Hierarchy**:
- **CarpoolException**: Base application exception
- **ValidationException**: Input validation errors
- **AuthenticationException**: Authentication failures
- **AuthorizationException**: Permission denied errors
- **ResourceNotFoundException**: Resource not found
- **BusinessLogicException**: Business rule violations

**Error Response Standards**:
- Consistent error response format across all endpoints
- Meaningful error codes for client-side handling
- Detailed error messages for debugging
- Field-level validation error details
- Request tracing for debugging purposes

### **Database Guidelines**

**Entity Design Principles**:
- Use appropriate JPA annotations for relationships
- Implement soft deletes for user-generated content
- Add audit fields (createdAt, updatedAt) to all entities
- Use embedded objects for related data grouping
- Implement proper cascade types for data integrity

**Query Optimization**:
- Use appropriate fetch types (LAZY vs EAGER)
- Implement pagination for large datasets
- Create database indexes for frequently queried fields
- Use query projections for performance optimization
- Monitor and optimize slow queries

### **Service Layer Guidelines**

**Business Logic Organization**:
- Separate service interfaces from implementations
- Keep controllers thin, move logic to services
- Use transaction management for data consistency
- Implement proper validation at service level
- Handle external service integrations in service layer

**Data Transfer Objects (DTOs)**:
- Create separate DTOs for request and response
- Implement validation annotations on DTOs
- Use mapping utilities for entity-DTO conversion
- Hide sensitive information in response DTOs
- Version DTOs for API backward compatibility

### **Security Implementation**

**Authentication Requirements**:
- Implement JWT-based authentication
- Use strong password hashing (BCrypt)
- Implement proper session management
- Add rate limiting for authentication endpoints
- Log security events for monitoring

**Authorization Implementation**:
- Role-based access control (RBAC)
- Method-level security annotations
- Resource-level authorization checks
- API endpoint protection
- Admin functionality isolation

### **Testing Standards**

**Unit Testing Requirements**:
- Test all service layer methods
- Mock external dependencies
- Test edge cases and error conditions
- Achieve minimum 80% code coverage
- Use meaningful test names and descriptions

**Integration Testing**:
- Test complete API workflows
- Use test databases for data operations
- Test authentication and authorization flows
- Validate response formats and status codes
- Test error handling scenarios

### **Documentation Requirements**

**Code Documentation**:
- JavaDoc comments for all public methods
- Clear variable and method names
- README files for complex modules
- Architecture decision records (ADRs)
- API documentation using OpenAPI/Swagger

**API Documentation Standards**:
- Complete endpoint descriptions
- Request/response examples
- Parameter descriptions and validation rules
- Error response documentation
- Authentication requirements

### **Version Control Guidelines**

**Git Workflow**:
- Use feature branches for new development
- Create pull requests for code review
- Write meaningful commit messages
- Keep commits focused and atomic
- Use conventional commit message format

**Branch Naming Convention**:
- `feature/ride-tracking` - New features
- `bugfix/payment-validation` - Bug fixes
- `hotfix/security-patch` - Critical fixes
- `refactor/user-service` - Code refactoring

**Commit Message Format**:
```
type(scope): description

feat(auth): add JWT token refresh functionality
fix(booking): resolve race condition in seat allocation
docs(api): update authentication endpoint documentation
```

### **Performance Guidelines**

**Application Performance**:
- Implement caching for frequently accessed data
- Use connection pooling for database access
- Optimize database queries and indexes
- Implement pagination for large datasets
- Monitor application metrics and response times

**Scalability Considerations**:
- Design stateless application architecture
- Use horizontal scaling strategies
- Implement asynchronous processing for heavy operations
- Consider microservices architecture for large scale
- Plan for database scaling (read replicas, sharding)

---

## 📞 Support & Contact

### **Technical Support**
- **Email**: backend-support@carpoolconnect.com
- **Discord**: [CarpoolConnect Developers](https://discord.gg/carpoolconnect)
- **GitHub Issues**: [Report Issues](https://github.com/carpoolconnect/backend/issues)

### **Documentation**
- **API Docs**: https://api.carpoolconnect.com/docs
- **Developer Guide**: https://docs.carpoolconnect.com
- **Architecture Guide**: https://docs.carpoolconnect.com/architecture

---

## 🏆 Performance & Monitoring Requirements

### **Performance Benchmarks**

**Response Time Requirements**:
- **Authentication endpoints**: < 100ms for 95% of requests
- **Search endpoints**: < 300ms for complex queries
- **CRUD operations**: < 200ms for simple operations
- **File upload**: < 2 seconds for 5MB files
- **Payment processing**: < 5 seconds end-to-end

**Throughput Requirements**:
- **Concurrent users**: Support 1000+ simultaneous users
- **API requests**: Handle 5000+ requests per minute
- **Database connections**: Efficient connection pooling
- **File uploads**: Support multiple concurrent uploads

**Scalability Targets**:
- **Horizontal scaling**: Application should scale across multiple instances
- **Database scaling**: Support read replicas and potential sharding
- **Cache utilization**: Implement Redis for frequently accessed data
- **CDN integration**: Static assets served through CDN

### **Monitoring Implementation**

**Application Performance Monitoring**:
- **Response time tracking**: Monitor all API endpoint performance
- **Error rate monitoring**: Track 4xx and 5xx error rates
- **Database query performance**: Monitor slow queries and connection usage
- **Memory usage**: Track application memory consumption and garbage collection
- **CPU utilization**: Monitor application CPU usage patterns

**Business Metrics Monitoring**:
- **User registration rates**: Track new user signups
- **Ride creation and booking rates**: Monitor platform usage
- **Payment success rates**: Track transaction completion
- **User engagement metrics**: Active users, session duration
- **Geographic usage patterns**: Track popular routes and regions

**Infrastructure Monitoring**:
- **Server health**: CPU, memory, disk usage monitoring
- **Database performance**: Connection pool, query performance, replication lag
- **External service health**: Payment gateway, email service, SMS service status
- **Network performance**: Latency, throughput, error rates

### **Logging Requirements**

**Application Logging**:
- **Structured logging**: Use JSON format for log entries
- **Log levels**: DEBUG, INFO, WARN, ERROR with appropriate usage
- **Request tracing**: Track requests with unique correlation IDs
- **Security events**: Log authentication attempts, authorization failures
- **Performance events**: Log slow operations and resource usage

**Audit Logging**:
- **User actions**: Track user registration, profile updates, ride creation
- **Financial transactions**: Log all payment-related activities
- **Administrative actions**: Track admin user activities
- **Data modifications**: Log critical data changes with before/after values
- **Security events**: Track login attempts, password changes, account lockouts

**Log Management**:
- **Centralized logging**: Aggregate logs from all application instances
- **Log retention**: Define retention policies for different log types
- **Log analysis**: Implement log analysis tools for troubleshooting
- **Alerting**: Set up alerts for critical errors and performance issues
- **Log security**: Ensure sensitive data is not logged

### **Health Check Implementation**

**Application Health Checks**:
- **Basic health**: Simple endpoint to verify application is running
- **Database connectivity**: Verify database connection and response
- **External service checks**: Validate payment gateway, email service connectivity
- **Cache status**: Check Redis connectivity and performance
- **File storage**: Verify cloud storage service availability

**Health Check Endpoints**:
- **GET /health**: Basic health check returning simple status
- **GET /health/detailed**: Comprehensive health check with dependency status
- **GET /health/metrics**: Performance metrics and resource usage
- **GET /health/ready**: Readiness probe for container orchestration
- **GET /health/live**: Liveness probe for container orchestration

### **Performance Optimization Strategies**

**Database Optimization**:
- **Index optimization**: Create appropriate indexes for query performance
- **Query optimization**: Optimize slow queries and reduce N+1 problems
- **Connection pooling**: Configure optimal database connection pool size
- **Read replicas**: Use read replicas for read-heavy operations
- **Caching strategy**: Implement query result caching where appropriate

**Application Optimization**:
- **Response caching**: Cache frequently requested data using Redis
- **Lazy loading**: Implement lazy loading for related entities
- **Pagination**: Use efficient pagination for large datasets
- **Async processing**: Use asynchronous processing for heavy operations
- **Resource pooling**: Pool expensive resources like HTTP connections

**API Optimization**:
- **Response compression**: Enable GZIP compression for API responses
- **API versioning**: Implement proper API versioning strategy
- **Rate limiting**: Implement intelligent rate limiting per user/endpoint
- **Request validation**: Validate requests early to reduce processing overhead
- **Response optimization**: Return only required data in API responses

---

## � API Endpoints Reference Table

### **Authentication & User Management**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `POST` | `/auth/register` | Register new user account | No | 5/min/IP |
| `POST` | `/auth/login` | User authentication | No | 10/min/IP |
| `POST` | `/auth/refresh` | Refresh access token | Refresh Token | 20/min/user |
| `POST` | `/auth/logout` | Logout and invalidate tokens | Yes | - |
| `POST` | `/auth/forgot-password` | Initiate password reset | No | 3/min/IP |
| `POST` | `/auth/reset-password` | Complete password reset | No | 5/min/IP |
| `POST` | `/auth/verify-email` | Verify email address | No | - |
| `POST` | `/auth/verify-phone` | Verify phone with OTP | No | 3/hour/phone |
| `GET` | `/users/profile` | Get current user profile | Yes | - |
| `PUT` | `/users/profile` | Update user profile | Yes | - |
| `POST` | `/users/upload-avatar` | Upload profile picture | Yes | 5/min/user |
| `POST` | `/users/verify-documents` | Upload identity documents | Yes | 10/day/user |
| `GET` | `/users/:userId` | Get public user profile | No | - |

### **Ride Management**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `POST` | `/rides/offer` | Create new ride offering | Driver | 10/hour/user |
| `GET` | `/rides/search` | Search available rides | No | 100/min/IP |
| `GET` | `/rides/:rideId` | Get ride details | No | - |
| `GET` | `/rides/my-rides` | Get driver's rides | Driver | - |
| `PUT` | `/rides/:rideId` | Update ride details | Driver (Owner) | - |
| `DELETE` | `/rides/:rideId` | Cancel/delete ride | Driver (Owner) | - |

### **Booking Management**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `POST` | `/bookings` | Create new booking | Yes | 20/hour/user |
| `GET` | `/bookings/my-bookings` | Get user's bookings | Yes | - |
| `PUT` | `/bookings/:bookingId/status` | Update booking status | Yes (Owner) | - |
| `POST` | `/bookings/:bookingId/payment/verify` | Verify payment | Yes (Owner) | 10/min/user |

### **Review & Rating**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `POST` | `/reviews` | Submit review | Yes | 5/day/user |
| `GET` | `/reviews/user/:userId` | Get user reviews | No | - |

### **Real-time & Location**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `POST` | `/rides/:rideId/start` | Start ride tracking | Driver (Owner) | - |
| `PUT` | `/rides/:rideId/location` | Update ride location | Driver (Owner) | 1/30sec/ride |
| `POST` | `/emergency/sos` | Trigger emergency alert | Yes | 5/day/user |

### **Administrative**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `GET` | `/admin/users` | List all users | Admin | - |
| `GET` | `/admin/rides` | List all rides | Admin | - |
| `GET` | `/admin/analytics` | Platform analytics | Admin | - |
| `GET` | `/admin/reports` | Content moderation | Admin | - |

### **Health & Monitoring**

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| `GET` | `/health` | Basic health check | No | - |
| `GET` | `/health/detailed` | Detailed health status | No | - |
| `GET` | `/health/metrics` | Performance metrics | No | - |
| `GET` | `/health/ready` | Readiness probe | No | - |
| `GET` | `/health/live` | Liveness probe | No | - |

### **Response Codes Summary**

| Status Code | Description | Usage |
|-------------|-------------|-------|
| `200` | OK | Successful GET, PUT requests |
| `201` | Created | Successful POST requests |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Authentication required/failed |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource not found |
| `409` | Conflict | Resource conflict (duplicate email, etc.) |
| `422` | Unprocessable Entity | Validation errors |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server-side errors |

### **Authentication Headers**

| Header | Value | Required For |
|--------|-------|--------------|
| `Authorization` | `Bearer <access_token>` | Protected endpoints |
| `Content-Type` | `application/json` | JSON requests |
| `Content-Type` | `multipart/form-data` | File uploads |

### **Common Query Parameters**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | Integer | Page number for pagination | 1 |
| `limit` | Integer | Items per page (max 100) | 10 |
| `sort` | String | Field to sort by | `createdAt` |
| `order` | String | Sort direction (`asc`/`desc`) | `desc` |
| `status` | String | Filter by status | - |
| `from` | String | Filter by date from | - |
| `to` | String | Filter by date to | - |

---

## �📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">
  <h3>🌟 Star this repo if you found it helpful! 🌟</h3>
  
  **Made with ❤️ for the Developer Community**
  
  [API Docs](https://api.carpoolconnect.com/docs) • [GitHub](https://github.com/carpoolconnect/backend) • [Support](mailto:backend-support@carpoolconnect.com)
</div>

---

**Last Updated**: August 1, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
