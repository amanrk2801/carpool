# 🚗 Carpool Web Application

A modern, full-stack carpooling platform that connects drivers and passengers for shared rides. Developed as part of the CDAC (Centre for Development of Advanced Computing) course project to promote sustainable transportation and reduce commuting costs.

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)
- [Support](#-support)

## 📖 About

Carpool Web Application is a comprehensive ride-sharing solution designed to facilitate efficient carpooling between drivers and passengers. The platform emphasizes safety, reliability, and user experience while contributing to environmental sustainability by reducing traffic congestion and carbon emissions.

### Key Objectives
- **Environmental Impact**: Reduce carbon footprint through shared transportation
- **Cost Efficiency**: Lower commuting expenses for users
- **Community Building**: Foster connections between commuters
- **Traffic Reduction**: Decrease urban congestion

## ✨ Features

### Core Functionality
- 🔍 **Intelligent Ride Matching** - Advanced algorithm matching riders based on location, time, and preferences
- 📅 **Flexible Scheduling** - Support for both immediate and advance ride bookings
- 🗺️ **Interactive Route Planning** - Real-time map integration with optimized routing
- 💬 **Secure Messaging System** - In-app communication between users
- ⭐ **Rating & Review System** - Community-driven trust and safety mechanism

### User Experience
- 🔐 **Multi-layered Authentication** - JWT-based secure user authentication
- 👤 **Comprehensive User Profiles** - Detailed profiles with verification status
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔔 **Real-time Notifications** - Instant updates on ride status and messages
- 💳 **Payment Integration** - Secure payment processing for ride costs

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI Framework |
| Tailwind CSS | 3.x | Styling & Design System |
| Redux Toolkit | 1.9.x | State Management |
| React Router | 6.x | Client-side Routing |
| Vite | 4.x | Build Tool & Development Server |
| Axios | 1.x | HTTP Client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Spring Boot | 3.x | Application Framework |
| Java | 17+ | Programming Language |
| MySQL | 8.x | Primary Database |
| Redis | 6.x | Caching & Session Management |
| JWT | - | Authentication & Authorization |
| Hibernate/JPA | 6.x | Object-Relational Mapping |
| Apache Tomcat | 10.x | Application Server |
| Maven | 3.x | Build & Dependency Management |

### DevOps & Tools
- **Version Control**: Git & GitHub
- **IDE**: VS Code, IntelliJ IDEA
- **API Testing**: Postman
- **Database Management**: MySQL Workbench

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│ (Spring Boot)   │◄──►│   (MySQL)       │
│                 │    │                 │    │                 │
│ • Components    │    │ • REST APIs     │    │ • User Data     │
│ • State Mgmt    │    │ • Business      │    │ • Ride Info     │
│ • Routing       │    │   Logic         │    │ • Transactions  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

#### Frontend Development
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (or yarn v1.22.0+)

#### Backend Development
- **Java Development Kit (JDK)**: 17 or higher
- **Maven**: 3.8.0 or higher
- **MySQL**: 8.0 or higher

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/amanrk2801/carpool.git
   cd carpool/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd carpool/backend
   ```

2. **Configure database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE carpool_db;
   ```

3. **Update application properties**
   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   # Configure database connection and JWT secret
   ```

4. **Install dependencies and run**
   ```bash
   ./mvnw spring-boot:run
   ```

5. **Verify backend**
   - API will be available at `http://localhost:8080`
   - Health check: `http://localhost:8080/actuator/health`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User login |
| POST | `/auth/refresh` | Refresh JWT token |

### Ride Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rides` | Get available rides |
| POST | `/rides` | Create new ride |
| GET | `/rides/{id}` | Get ride details |
| PUT | `/rides/{id}` | Update ride |
| DELETE | `/rides/{id}` | Cancel ride |

For detailed API documentation, visit `/swagger-ui.html` when the backend server is running.

## 🤝 Contributing

We welcome contributions from the community! Please read our contribution guidelines carefully.

### Code of Conduct

- Be respectful and inclusive
- Follow professional communication standards
- Provide constructive feedback
- Help maintain a positive learning environment

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/carpool.git
   cd carpool
   ```

2. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/amanrk2801/carpool.git
   ```

3. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Frontend Contribution Guidelines

#### Development Setup
```bash
cd frontend
npm install
npm run dev
```

#### Code Standards
- **ESLint Configuration**: Follow the project's ESLint rules
- **Component Structure**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utility classes
- **State Management**: Use Redux for global state, local state for component-specific data

#### Frontend Checklist
- [ ] Components are properly documented with PropTypes/TypeScript
- [ ] Responsive design tested on multiple screen sizes
- [ ] Accessibility standards (WCAG 2.1) followed
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Unit tests written using Jest/React Testing Library

#### File Structure
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux store and slices
│   ├── services/           # API service functions
│   ├── utils/              # Helper functions
│   └── styles/             # Global styles
```

### Backend Contribution Guidelines

#### Development Setup
```bash
cd backend
./mvnw spring-boot:run
```

#### Code Standards
- **Java Style**: Follow Google Java Style Guide
- **Architecture**: Maintain layered architecture (Controller → Service → Repository)
- **Documentation**: Use Javadoc for public methods
- **Testing**: Minimum 80% code coverage

#### Backend Checklist
- [ ] RESTful API design principles followed
- [ ] Proper HTTP status codes used
- [ ] Input validation implemented
- [ ] Exception handling with custom exceptions
- [ ] JUnit tests for all service methods
- [ ] Integration tests for API endpoints
- [ ] Database migrations using Flyway

#### Project Structure
```
backend/
├── src/main/java/
│   ├── controller/         # REST controllers
│   ├── service/           # Business logic
│   ├── repository/        # Data access layer
│   ├── model/             # Entity classes
│   ├── dto/               # Data Transfer Objects
│   ├── config/            # Configuration classes
│   └── exception/         # Custom exceptions
├── src/test/              # Unit and integration tests
└── src/main/resources/    # Configuration files
```

### Database Guidelines

#### Schema Changes
- Create migration scripts in `src/main/resources/db/migration/`
- Follow naming convention: `V{version}__{description}.sql`
- Never modify existing migration files

#### Best Practices
- Use meaningful table and column names
- Implement proper foreign key constraints
- Index frequently queried columns
- Document complex queries

### Testing Guidelines

#### Frontend Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

#### Backend Testing
```bash
# Run unit tests
./mvnw test

# Run integration tests
./mvnw test -Dspring.profiles.active=integration

# Generate coverage report
./mvnw jacoco:report
```

### Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create meaningful commits**
   ```bash
   # Use conventional commit format
   git commit -m "feat: add ride booking functionality"
   git commit -m "fix: resolve authentication token expiry issue"
   git commit -m "docs: update API documentation"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

4. **PR Requirements**
   - [ ] Descriptive title and detailed description
   - [ ] Link to related issues
   - [ ] Screenshots for UI changes
   - [ ] Tests pass locally
   - [ ] Code reviewed by at least one team member

### Issue Reporting

When reporting bugs or requesting features:

1. **Search existing issues** first
2. **Use provided templates**
3. **Include relevant details**:
   - Environment (OS, browser, versions)
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/error logs

### Areas for Contribution

#### High Priority
- 🐛 **Bug Fixes**: Critical issues affecting user experience
- 🔒 **Security**: Authentication and data protection improvements
- 📱 **Mobile Optimization**: Enhanced mobile user experience
- ♿ **Accessibility**: WCAG compliance improvements

#### Medium Priority
- ✨ **New Features**: Ride scheduling, payment integration
- 🎨 **UI/UX**: Design system improvements
- ⚡ **Performance**: Loading time and responsiveness optimization
- 📊 **Analytics**: User behavior and app performance tracking

#### Low Priority
- 📖 **Documentation**: Code comments, user guides
- 🧪 **Testing**: Increased test coverage
- 🔧 **DevOps**: CI/CD pipeline improvements
- 🌐 **Internationalization**: Multi-language support

## 👥 Team

**CDAC Project Team - Batch 2024**

| Team Member | GitHub |
|-------------|--------|
| Aman Kumbhalwar | [@amanrk2801](https://github.com/amanrk2801) |
| Bhagirath Manda | [@bhagirathm](https://github.com/bhagirathm) |
| Rajesh Kumbhar | [@rajeshk](https://github.com/rajeshk) |
| Om Sirsat | [@omsirsat](https://github.com/omsirsat) |

## 📄 License

This project is developed for educational purposes as part of the CDAC course curriculum. All rights reserved to the development team and CDAC.

**Academic Use Only**: This project is intended for learning and educational purposes. Commercial use is not permitted without explicit permission.

## 📞 Support

### Getting Help

- 📧 **Email**: carpool.cdac@gmail.com
- 💬 **Issues**: [GitHub Issues](https://github.com/amanrk2801/carpool/issues)
- 📖 **Documentation**: [Project Wiki](https://github.com/amanrk2801/carpool/wiki)

### Acknowledgments

- **CDAC (Centre for Development of Advanced Computing)** for providing the learning platform and guidance
- **Open Source Community** for the excellent tools and frameworks
- **React & Spring Boot Communities** for comprehensive documentation
- **All Contributors** who help improve this project

---

## 🎯 Project Roadmap

### Phase 1 (Current)
- [x] Basic user authentication
- [x] Ride creation and search
- [x] User profiles and ratings
- [ ] Real-time messaging
- [ ] Payment integration

### Phase 2 (Planned)
- [ ] Mobile application (React Native)
- [ ] Advanced matching algorithms
- [ ] Multi-city support
- [ ] Admin dashboard

### Phase 3 (Future)
- [ ] AI-powered recommendations
- [ ] IoT integration for smart vehicles
- [ ] Blockchain-based verification

---

⭐ **If you find this project helpful, please consider starring the repository!**

**Happy Carpooling! 🚗💚**#   c a r p o o l  
 