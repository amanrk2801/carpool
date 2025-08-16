# 🚗 CarpoolConnect - Full-Stack Carpooling Platform

A complete ride-sharing application built with **Spring Boot** (Backend) and **React** (Frontend). Features user authentication, ride management, booking system, and user ratings.

## ⚡ Quick Overview

**What We Built**: Complete carpooling platform with authentication, ride CRUD operations, booking system, and rating functionality.

**Tech Stack**: Spring Boot 3.2 + React 19 + MySQL + JWT Authentication + Tailwind CSS


## 🛠️ Tech Stack

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0, Spring Security, Spring Data JPA
- **Database**: MySQL 8.x with Hibernate ORM
- **Authentication**: JWT tokens with BCrypt password hashing
- **Build**: Maven 3.x

### Frontend (React)
- **Framework**: React 19.1.0 with Hooks & Context API
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router 7.7.0
- **Build**: Vite 7.0.4

## 🎯 Core Features

### 🔐 Authentication System
- User registration/login with JWT tokens
- Protected routes and role-based access
- Password encryption with BCrypt

### 🚗 Ride Management
- **Offer Rides**: Create rides with route, timing, pricing
- **Search Rides**: Find rides by location, date, time
- **Manage Rides**: Edit, cancel, view details

### 📋 Booking System
- **Book Rides**: Reserve seats with real-time availability
- **Manage Bookings**: View, confirm, cancel bookings
- **Status Tracking**: Pending → Confirmed → Completed

### ⭐ Rating System
- Rate drivers/passengers after rides
- View user ratings and reviews
- Automatic rating calculations

## 🚀 Quick Start

### Prerequisites
- Java 21+, Maven 3.8+, MySQL 8+
- Node.js 18+, npm 8+

### Backend Setup
```bash
cd carpool-backend
# Create database: carpool_db_completed_v1
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### Frontend Setup  
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Rides
- `POST /api/rides/offer` - Create ride
- `GET /api/rides/search` - Search rides
- `GET /api/rides/my-rides` - User's rides
- `PUT /api/rides/{id}/update` - Update ride
- `DELETE /api/rides/{id}/cancel` - Cancel ride

### Bookings
- `POST /api/rides/{id}/book` - Book ride
- `GET /api/bookings/my-bookings` - User bookings
- `GET /api/bookings/my-ride-bookings` - Driver bookings
- `PUT /api/bookings/{id}/confirm` - Confirm booking
- `PUT /api/bookings/{id}/cancel` - Cancel booking

### Ratings
- `POST /api/ratings` - Create rating
- `GET /api/ratings/user/{id}` - User ratings

## 🔒 Security Features

- JWT token authentication with expiry
- BCrypt password hashing
- CORS configuration for cross-origin requests
- Input validation and SQL injection prevention
- Protected API endpoints with role-based access

## 👥 Team

| Team Member | GitHub Profile |
|-------------|----------------|
| **Aman Kumbhalwar** | [@amanrk2801](https://github.com/amanrk2801) |
| **Bhagirath Manda** | [@89245-BhagiRath-Manda](https://github.com/89245-BhagiRath-Manda) |
| **Rajesh Kumbhar** | [@89200-Rajesh](https://github.com/89200-Rajesh) |
| **Om Sirsat** | [@89282-Omsirsat](https://github.com/89282-Omsirsat) |

