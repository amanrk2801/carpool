# Quick Local Setup Guide

## 🚀 Minimal Setup for Local Testing

### Prerequisites
- Java 17
- Maven 3.6+
- MySQL 8.0

### Quick Start

1. **Setup MySQL Database**
   ```sql
   CREATE DATABASE carpool_db;
   -- Use your existing MySQL root credentials
   ```

2. **Update application.yml**
   - Database username: `root`
   - Database password: `123456789` (already configured)

3. **Build and Run**
   ```bash
   mvn clean compile
   mvn spring-boot:run
   ```

4. **Test the API**
   ```bash
   # Health check
   curl http://localhost:8080/api/

   # Register a user
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User", 
       "email": "test@example.com",
       "password": "password123",
       "phone": "9876543210"
     }'
   ```

### What's Disabled for Local Testing
- ❌ Redis (caching)
- ❌ Email notifications
- ❌ AWS S3 file storage
- ❌ Payment gateways
- ❌ SMS services
- ❌ WebSocket

### What's Working
- ✅ User registration/login
- ✅ JWT authentication
- ✅ Database operations
- ✅ Basic API endpoints
- ✅ Exception handling

### Troubleshooting
- **MySQL Connection**: Make sure MySQL is running on port 3306
- **Database**: Create `carpool_db` database manually
- **Port Conflict**: API runs on port 8080

### Next Steps
Once basic functionality works, uncomment features in:
- `application.yml` - Configuration
- `pom.xml` - Dependencies
