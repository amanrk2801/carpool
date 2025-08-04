# Team API Endpoints Distribution

## Project Overview
This document outlines the API endpoints distribution among team members for the Carpool Connect application. Each developer has ownership of specific modules to showcase their contributions during interviews.

## API Endpoints Distribution

### Developer 1: Authentication & User Management
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/auth/login` | POST | User login authentication | `{ email, password }` | User data with token |
| `/auth/register` | POST | User registration | `{ name, email, password, phone }` | User data with token |
| `/auth/logout` | POST | User logout | None | Success message |
| `/users/profile` | GET | Get user profile details | None | User profile data |
| `/users/profile` | PUT | Update user profile | `{ name, phone, email, etc }` | Updated profile data |
| `/ratings/user/{userId}/update-stats` | POST | Update user rating stats | None | Updated statistics |

**Key Contributions:**
- Implemented secure JWT-based authentication system
- Designed user registration and profile management
- Built token management and session handling
- Implemented logout functionality with proper cleanup
- Created user statistics and analytics system

---

### Developer 2: Ride Management & Core Operations
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/rides/offer` | POST | Create a new ride offer | `{ from, to, date, time, seats, price }` | Created ride data |
| `/rides/{rideId}` | GET | Get specific ride details | None | Ride details |
| `/rides/{rideId}/update` | PUT | Update existing ride | `{ from, to, date, time, seats, price }` | Updated ride data |
| `/rides/{rideId}` | DELETE | Delete a ride | None | Success message |
| `/rides/{rideId}/cancel` | DELETE | Cancel a ride | None | Success message |
| `/rides/{rideId}/status` | PUT | Update ride status | Query: `status` | Updated ride status |

**Key Contributions:**
- Developed comprehensive ride CRUD operations
- Built ride cancellation and deletion features
- Designed flexible ride update functionality
- Implemented ride status management system
- Created data validation and business logic for rides

---

### Developer 3: Search, Filter & Location Services
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/rides/search` | GET | Search rides with parameters | Query params: `from, to, date` | List of matching rides |
| `/rides/filter` | GET | Filter rides with advanced options | Query params: `price, time, seats` | Filtered ride results |
| `/rides/my-rides` | GET | Get user's offered rides | None | User's ride listings |
| `/rides/locations/from` | GET | Get available departure locations | None | List of from locations |
| `/rides/locations/to` | GET | Get available destination locations | None | List of to locations |
| `/ratings/user/{userId}` | GET | Get user ratings | None | User's rating history |

**Key Contributions:**
- Built intelligent ride search functionality
- Implemented advanced filtering system
- Developed location-based services
- Created personalized ride management for users
- Designed user rating and review display system

---

### Developer 4: Booking Management & Rating System
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/rides/{rideId}/book` | POST | Book a ride | `{ seatsRequested }` | Booking confirmation |
| `/bookings/my-bookings` | GET | Get user's bookings | None | List of user bookings |
| `/bookings/my-ride-bookings` | GET | Get bookings for user's rides | None | Bookings on user's rides |
| `/bookings/{bookingId}/cancel` | PUT | Cancel a booking | None | Cancellation confirmation |
| `/bookings/{bookingId}/confirm` | PUT | Confirm a booking | None | Confirmation status |
| `/ratings` | POST | Create a rating | `{ userId, rideId, rating, comment }` | Created rating |
| `/ratings/user/{userId}/recent` | GET | Get recent ratings | Query: `limit` | Recent ratings list |

**Key Contributions:**
- Developed complete booking management system
- Implemented rating and review functionality
- Built booking confirmation and cancellation features
- Created user engagement and feedback systems
- Designed recent activity and rating analytics

## Technical Implementation Details

### API Service Architecture
- **Base URL Configuration**: Environment-based API URL setup
- **Authentication**: JWT token-based authentication with automatic header injection
- **Error Handling**: Comprehensive error handling with standardized response format
- **Token Management**: Automatic token expiry handling and redirect to login
- **Response Standardization**: Consistent API response format across all endpoints

### Security Features
- Bearer token authentication
- Automatic token validation
- Session management
- Secure logout with token cleanup

### Error Handling Strategy
```javascript
// Standardized error response format
{
  success: boolean,
  data: any,
  message: string,
  error: string
}
```

## Interview Talking Points

### For All Developers:
1. **Problem-Solving**: Explain how you identified and solved specific challenges in your module
2. **Impact**: Quantify the impact of your implementation (e.g., "Reduced booking errors by 90%")
3. **Technical Decisions**: Discuss architectural decisions and trade-offs you made
4. **Collaboration**: Highlight how your module integrates with others
5. **Best Practices**: Mention coding standards, error handling, and security considerations you implemented

### Module-Specific Highlights:
- **Auth Developer**: Security implementation, token management, user experience
- **Ride Developer**: Data consistency, CRUD operations, business logic
- **Search Developer**: Performance optimization, user experience, data filtering
- **Booking Developer**: Transaction management, user engagement, analytics

## Getting Started
Each developer should:
1. Review their assigned endpoints thoroughly
2. Understand the request/response formats
3. Be prepared to explain the business logic behind each endpoint
4. Practice explaining the technical implementation details
5. Prepare examples of challenges faced and solutions implemented

## Frontend-Backend Data Flow Documentation

### Data Flow Architecture

```
Frontend (React) → API Service → HTTP Request → Backend (Spring Boot) → Database
     ↓                ↓              ↓                ↓                    ↓
UI Components → apiService.js → REST API → Controllers → Services → Repository
```

### Frontend Request Handling

#### 1. Component Level Data Handling
```javascript
// Example: User Login Flow
const handleLogin = async (formData) => {
  try {
    const response = await apiService.login({
      email: formData.email,
      password: formData.password
    });
    
    if (response.success) {
      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Update React context/state
      setUser(response.data);
      navigate('/dashboard');
    } else {
      setError(response.message);
    }
  } catch (error) {
    setError('Login failed. Please try again.');
  }
};
```

#### 2. API Service Layer Processing
```javascript
// In apiService.js - Generic request handling
async apiCall(endpoint, options = {}) {
  // 1. Construct full URL
  const url = `${this.baseURL}${endpoint}`;
  
  // 2. Get authentication token
  const token = this.getAuthToken();
  
  // 3. Prepare headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  
  // 4. Make HTTP request
  const response = await fetch(url, {
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  });
  
  // 5. Handle response and errors
  return this.processResponse(response);
}
```

### Backend Request Processing

#### 1. Controller Layer (Entry Point)
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
        @Valid @RequestBody LoginRequest request) {
        
        try {
            // 1. Validate request data
            validateLoginRequest(request);
            
            // 2. Call service layer
            LoginResponse response = authService.authenticateUser(request);
            
            // 3. Return standardized response
            return ResponseEntity.ok(
                ApiResponse.success(response, "Login successful")
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401)
                .body(ApiResponse.error("Invalid credentials"));
        }
    }
}
```

#### 2. Service Layer (Business Logic)
```java
@Service
public class AuthService {
    
    public LoginResponse authenticateUser(LoginRequest request) {
        // 1. Find user by email
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        // 2. Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthenticationException("Invalid credentials");
        }
        
        // 3. Generate JWT token
        String token = jwtTokenProvider.generateToken(user);
        
        // 4. Create response
        return LoginResponse.builder()
            .user(userMapper.toDto(user))
            .token(token)
            .expiresIn(jwtTokenProvider.getExpirationTime())
            .build();
    }
}
```

#### 3. Repository Layer (Data Access)
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

### Request/Response Data Structures

#### Frontend Request Examples

```javascript
// 1. Authentication Requests
const loginData = {
  email: "user@example.com",
  password: "securePassword123"
};

const registerData = {
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123",
  phone: "+1234567890"
};

// 2. Ride Creation Request
const rideData = {
  from: "New York",
  to: "Boston",
  date: "2025-08-15",
  time: "09:00",
  seats: 3,
  price: 45.00,
  description: "Comfortable ride with AC"
};

// 3. Booking Request
const bookingData = {
  seatsRequested: 2
};
```

#### Backend Response Examples

```java
// 1. Standardized API Response
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private String error;
    private LocalDateTime timestamp;
}

// 2. Login Response
public class LoginResponse {
    private UserDto user;
    private String token;
    private long expiresIn;
}

// 3. Ride Response
public class RideResponse {
    private Long id;
    private String from;
    private String to;
    private LocalDate date;
    private LocalTime time;
    private int availableSeats;
    private BigDecimal price;
    private UserDto driver;
}
```

### Error Handling Flow

#### Frontend Error Handling
```javascript
// 1. API Service Error Processing
if (!response.ok) {
  if (response.status === 401) {
    // Handle authentication errors
    localStorage.removeItem('user');
    window.location.href = '/signin';
  }
  
  // Extract error message from response
  let errorMessage = data.message || `API call failed with status ${response.status}`;
  
  return {
    success: false,
    data: null,
    message: errorMessage,
    error: errorMessage
  };
}

// 2. Component Error Handling
const [error, setError] = useState('');

const handleSubmit = async (formData) => {
  setError(''); // Clear previous errors
  
  const response = await apiService.offerRide(formData);
  
  if (!response.success) {
    setError(response.message);
    return;
  }
  
  // Success handling
  navigate('/my-rides');
};
```

#### Backend Error Handling
```java
// 1. Global Exception Handler
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidation(ValidationException e) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error(e.getMessage()));
    }
    
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Object>> handleAuth(AuthenticationException e) {
        return ResponseEntity.status(401)
            .body(ApiResponse.error("Authentication failed"));
    }
}

// 2. Custom Exception Classes
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
```

### Security Implementation

#### Frontend Security
```javascript
// 1. Token Management
getAuthToken() {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    return user.token;
  }
  return null;
}

// 2. Automatic Token Inclusion
const defaultHeaders = {
  'Content-Type': 'application/json',
};

if (token) {
  defaultHeaders.Authorization = `Bearer ${token}`;
}
```

#### Backend Security
```java
// 1. JWT Token Validation
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) {
        String token = extractTokenFromRequest(request);
        
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication auth = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        
        filterChain.doFilter(request, response);
    }
}

// 2. Method-level Security
@PreAuthorize("hasRole('USER')")
@PostMapping("/rides/offer")
public ResponseEntity<ApiResponse<RideResponse>> offerRide(@RequestBody RideRequest request) {
    // Implementation
}
```

### Data Validation

#### Frontend Validation
```javascript
// Form validation before API call
const validateRideData = (data) => {
  const errors = {};
  
  if (!data.from || data.from.trim() === '') {
    errors.from = 'Departure location is required';
  }
  
  if (!data.to || data.to.trim() === '') {
    errors.to = 'Destination is required';
  }
  
  if (!data.date || new Date(data.date) < new Date()) {
    errors.date = 'Please select a future date';
  }
  
  if (!data.seats || data.seats < 1 || data.seats > 8) {
    errors.seats = 'Seats must be between 1 and 8';
  }
  
  return errors;
};
```

#### Backend Validation
```java
// 1. Request DTO Validation
public class RideRequest {
    @NotBlank(message = "Departure location is required")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    private String from;
    
    @NotBlank(message = "Destination is required")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    private String to;
    
    @NotNull(message = "Date is required")
    @Future(message = "Date must be in the future")
    private LocalDate date;
    
    @Min(value = 1, message = "At least 1 seat is required")
    @Max(value = 8, message = "Maximum 8 seats allowed")
    private Integer seats;
}

// 2. Custom Validation
@Component
public class RideValidator {
    
    public void validateRideCreation(RideRequest request, User driver) {
        // Business logic validation
        if (rideRepository.existsByDriverAndDate(driver, request.getDate())) {
            throw new ValidationException("You already have a ride on this date");
        }
        
        if (request.getFrom().equalsIgnoreCase(request.getTo())) {
            throw new ValidationException("Departure and destination cannot be the same");
        }
    }
}
```

### Performance Considerations

#### Frontend Optimization
```javascript
// 1. Request Debouncing for Search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// 2. Caching Location Data
const [locations, setLocations] = useState({
  from: [],
  to: [],
  lastFetched: null
});

const getLocations = async () => {
  const now = Date.now();
  const cacheTimeout = 5 * 60 * 1000; // 5 minutes
  
  if (locations.lastFetched && (now - locations.lastFetched) < cacheTimeout) {
    return locations;
  }
  
  // Fetch fresh data
  const [fromResponse, toResponse] = await Promise.all([
    apiService.getFromLocations(),
    apiService.getToLocations()
  ]);
  
  setLocations({
    from: fromResponse.data,
    to: toResponse.data,
    lastFetched: now
  });
};
```

#### Backend Optimization
```java
// 1. Database Query Optimization
@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
    
    @Query("SELECT r FROM Ride r WHERE r.from = :from AND r.to = :to " +
           "AND r.date >= :startDate AND r.availableSeats >= :seats " +
           "ORDER BY r.date, r.time")
    List<Ride> findAvailableRides(@Param("from") String from,
                                 @Param("to") String to,
                                 @Param("startDate") LocalDate startDate,
                                 @Param("seats") int seats);
}

// 2. Caching Frequently Accessed Data
@Service
@CacheConfig(cacheNames = "locations")
public class LocationService {
    
    @Cacheable("fromLocations")
    public List<String> getFromLocations() {
        return rideRepository.findDistinctFromLocations();
    }
    
    @Cacheable("toLocations")
    public List<String> getToLocations() {
        return rideRepository.findDistinctToLocations();
    }
}
```

This documentation provides a comprehensive guide for understanding how data flows between the frontend and backend, including practical examples, error handling, security implementation, and performance considerations.
