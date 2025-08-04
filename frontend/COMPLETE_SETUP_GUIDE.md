# 🚗 CarpoolConnect - Complete Web App Setup Guide

## 📋 Overview
This is a complete carpool application with React frontend and Spring Boot backend. Both frontend and backend are now fully functional with all features implemented.

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+ (or use Docker)

### 1. Database Setup
Option A - Using Docker (Recommended):
```bash
cd backend
docker-compose up -d mysql
```

Option B - Local MySQL:
```sql
CREATE DATABASE carpool_db;
-- Tables will be auto-created by Spring Boot
```

### 2. Backend Setup
```bash
cd backend

# Build the application
mvn clean package -DskipTests

# Run the Spring Boot application
mvn spring-boot:run
```
Backend will start on `http://localhost:8080/api`

### 3. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will start on `http://localhost:5173`

## 🔧 Features Implemented

### ✅ Authentication System
- User registration and login
- JWT-based authentication
- Secure password hashing
- Token-based authorization

### ✅ Ride Management
- **Offer Ride**: Create new rides with car details, route, pricing
- **My Rides**: View all offered rides
- **Edit Ride**: Update ride details
- **Delete Ride**: Remove rides
- **Search Rides**: Find available rides by location and date

### ✅ Booking System
- **Book Ride**: Book available seats on rides
- **My Bookings**: View all bookings as passenger  
- **Cancel Booking**: Cancel pending/confirmed bookings
- **Booking Status**: Track pending, confirmed, cancelled states

### ✅ Dashboard Features
- **Ride Management**: Full CRUD operations for rides
- **Passenger Management**: View passengers on your rides, rate completed rides
- **Booking Management**: View and manage bookings
- **Rating System**: Rate drivers and passengers after completed rides
- **Statistics**: Ride counts, booking counts, earnings
- **Mobile Responsive**: Optimized for all devices

### ✅ UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, intuitive interface
- **Interactive Elements**: Dropdowns, modals, forms
- **Real-time Updates**: Dynamic status updates

## 📱 User Flows

### Driver Flow
1. Register/Login → Dashboard
2. Offer Ride → Fill ride details → Submit
3. View My Rides → Edit/Delete rides
4. Manage bookings from passengers

### Passenger Flow  
1. Register/Login → Find Ride
2. Search rides → View available options
3. Book Ride → Confirm booking
4. View My Bookings → Track status

## 🔧 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Rides
- `POST /api/rides/offer` - Create new ride
- `GET /api/rides/my-rides` - Get user's rides
- `GET /api/rides/search` - Search available rides
- `PUT /api/rides/{id}/update` - Update ride
- `DELETE /api/rides/{id}` - Delete ride
- `POST /api/rides/{id}/book` - Book a ride

### Bookings
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PUT /api/bookings/{id}/cancel` - Cancel booking
- `PUT /api/bookings/{id}/confirm` - Confirm booking (driver)

## 💾 Database Schema

### Users Table
- User authentication and profile data
- Driver verification status
- Ratings and statistics

### Rides Table
- Ride details (route, timing, pricing)
- Car information
- Available seats tracking
- Status management

### Bookings Table
- Passenger bookings
- Seat allocation
- Payment tracking
- Status management

## 🛠️ Technical Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Lucide React** for icons

### Backend
- **Spring Boot 3** with Java 17
- **Spring Security** with JWT
- **Spring Data JPA** with MySQL
- **Maven** for dependency management
- **Docker** support included

## 📝 Configuration

### Environment Variables
Backend (`application.yml`):
```yaml
spring:
  datasource:
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:123456789}
  security:
    jwt:
      secret: ${JWT_SECRET:your-secret-key}
```

Frontend (`.env`):
```env
VITE_API_URL=http://localhost:8080/api
```

## 🧪 Testing the Application

1. **Register a new user** at `/signup`
2. **Login** at `/signin`
3. **Create a ride** by clicking "Offer Ride"
4. **Search for rides** at "Find Ride"
5. **Book a ride** and check "My Bookings"
6. **Manage rides** in Dashboard

## 🔐 Security Features

- JWT token authentication
- Password hashing with BCrypt
- CORS configuration
- Input validation
- Authorization checks
- SQL injection prevention

## 🎯 Production Deployment

### Backend
```bash
# Build production JAR
mvn clean package -DskipTests

# Run with production profile
java -jar target/carpool-backend-1.0.jar --spring.profiles.active=prod
```

### Frontend
```bash
# Build for production
npm run build

# Serve with any static server
npm run preview
```

## 📊 Monitoring & Logs

- Spring Boot Actuator endpoints
- Application logs in console
- Database query logging (configurable)
- Error handling with global exception handler

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For issues or questions:
1. Check the console logs
2. Verify database connection
3. Ensure all dependencies are installed
4. Check API endpoints are responding

---

## 🎉 Success! 

Your CarpoolConnect application is now complete and ready to use! 🚗💨

The app provides a full-featured carpooling platform with modern UI, secure authentication, comprehensive ride management, and seamless booking functionality.
