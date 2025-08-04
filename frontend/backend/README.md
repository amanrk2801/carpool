# CarpoolConnect Backend

A Spring Boot REST API for the CarpoolConnect ride-sharing platform.

## Features

- User registration and authentication with JWT
- Ride creation and management
- Ride search and filtering
- Booking system
- User profiles and verification
- Real-time notifications
- Email notifications
- Security with Spring Security

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Cache**: Redis
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Containerization**: Docker

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Redis (optional, for caching)
- Docker (for containerized deployment)

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carpool-backend
   ```

2. **Set up MySQL Database**
   ```sql
   CREATE DATABASE carpool_db;
   CREATE USER 'carpool_user'@'localhost' IDENTIFIED BY 'carpool_pass';
   GRANT ALL PRIVILEGES ON carpool_db.* TO 'carpool_user'@'localhost';
   ```

3. **Configure Application Properties**
   
   Update `src/main/resources/application.yml` with your database credentials:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/carpool_db
       username: carpool_user
       password: carpool_pass
   ```

4. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The application will start on `http://localhost:8080`

### Docker Deployment

1. **Using Docker Compose (Recommended)**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - MySQL database on port 3306
   - Redis cache on port 6379
   - Backend API on port 8080

2. **Building Docker Image Only**
   ```bash
   mvn clean package
   docker build -t carpool-backend .
   docker run -p 8080:8080 carpool-backend
   ```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token

### Ride Endpoints

- `POST /api/rides/offer` - Create a new ride
- `GET /api/rides/search` - Search for rides
- `GET /api/rides/my-rides` - Get driver's rides
- `GET /api/rides/{id}` - Get ride details
- `PUT /api/rides/{id}/update` - Update ride
- `DELETE /api/rides/{id}/cancel` - Cancel ride

### Booking Endpoints

- `POST /api/bookings/create` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `PUT /api/bookings/{id}/cancel` - Cancel booking

### Example API Calls

#### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Raj",
    "lastName": "Sharma",
    "email": "raj@example.com",
    "password": "password123",
    "phone": "+919876543210"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj@example.com",
    "password": "password123"
  }'
```

#### Search Rides
```bash
curl "http://localhost:8080/api/rides/search?from=Mumbai&to=Pune&date=2024-08-10&passengers=2" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | Database username | `carpool_user` |
| `DB_PASSWORD` | Database password | `carpool_pass` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `JWT_SECRET` | JWT signing secret | See application.yml |
| `SMTP_HOST` | Email SMTP host | `smtp.gmail.com` |
| `SMTP_USERNAME` | Email username | - |
| `SMTP_PASSWORD` | Email password | - |

## Database Schema

The application uses the following main entities:

- **Users**: User accounts and profiles
- **Rides**: Ride offerings by drivers
- **Bookings**: Passenger bookings for rides
- **Notifications**: User notifications
- **Reviews**: User reviews and ratings
- **DriverVerifications**: Driver verification documents

## Security

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration for frontend integration
- Role-based access control (USER, DRIVER)

## Testing

Run tests with:
```bash
mvn test
```

For integration tests with TestContainers:
```bash
mvn verify
```

## Development Team Distribution

Based on the requirements document, the API development is distributed among 4 developers:

- **Developer 1**: Ride Creation & Management (4 endpoints)
- **Developer 2**: Ride Discovery & Search (4 endpoints)  
- **Developer 3**: Booking Creation & Processing (4 endpoints)
- **Developer 4**: Booking Management & Analytics (4 endpoints)

## Monitoring and Logs

Logs are configured to output to:
- Console (for development)
- File: `logs/carpool.log` (for production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
