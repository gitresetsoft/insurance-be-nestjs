# Insurance Customer Portal API

A NestJS-based backend API for the Zurich Insurance Customer Portal, providing user management, insurance portfolio management, billing, and claims processing functionalities.

## Features

### User Features
- Account creation and management
- Insurance purchase and renewal
- Portfolio viewing
- Claims submission
- Profile management (restricted to own profile)

### Admin Features
- User management (list, edit, delete)
- Dashboard access
- Claims management
- Billing management

## Project Structure

```
src/
├── users/          # User management module
├── admin/          # Admin functionality module
├── insurance/      # Insurance portfolio module
├── billing/        # Billing management module
├── common/         # Shared components
├── config/         # Configuration
└── auth/           # Authentication module
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

```bash
# Install dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

The API documentation is available through Swagger UI at `/api` when running the application.

### Key Endpoints

#### User Endpoints
- POST `/auth/register` - Create new user account
- POST `/auth/login` - User login
- GET `/users/profile` - Get own profile
- PUT `/users/profile` - Update own profile
- GET `/users/portfolio` - View insurance portfolio
- POST `/users/insurance/purchase` - Purchase insurance
- POST `/users/insurance/renew` - Renew insurance
- POST `/users/claims` - Submit claim
- GET `/users/claims` - View own claims

#### Admin Endpoints
- GET `/admin/users` - List all users
- GET `/admin/users/:id` - Get user details
- PUT `/admin/users/:id` - Update user
- DELETE `/admin/users/:id` - Delete user
- GET `/admin/dashboard` - Admin dashboard
- GET `/admin/claims` - View all claims
- PUT `/admin/claims/:id` - Update claim status

#### Billing Endpoints
- GET `/billing` - Get billing records (filtered)
- POST `/billing` - Create billing record (admin)
- PUT `/billing` - Update billing record (admin)
- DELETE `/billing` - Delete billing record (admin)

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Security

- JWT-based authentication
- Role-based access control
- Google OAuth2 integration
- Request validation
- Error handling middleware

## Development

The project follows a modular architecture with clear separation of concerns:

1. **Modules**: Each feature is encapsulated in its own module
2. **DTOs**: Data Transfer Objects for request/response validation
3. **Interfaces**: Type definitions for data structures
4. **Repositories**: Data access layer
5. **Services**: Business logic implementation
6. **Controllers**: Request handling and routing

## Database

The application currently uses a JSON file (`dummy.json`) as a temporary database with the following structure:

```json
{
  "users": [...],
  "billing_records": [...],
  "insurance_portfolios": [...],
  "claims": [...]
}
```

## License

This project is MIT licensed.

## Implementation Phases

### Phase 1: Project Setup and Basic Structure
- [✅] Initialize NestJS project with required dependencies
- [✅] Set up project structure and configuration files
- [ ] Configure Swagger documentation
- [✅] Create basic DTOs and interfaces
- [✅] Set up dummy.json database structure
- [ ] Configure Google OAuth2 integration

### Phase 2: User Management
- [✅] Implement UserModule with controller and service
- [✅] Handle user authentication endpoint + CORS
- [ ] Create user registration endpoint
- [ ] Implement user profile management
- [ ] Add user role management
- [ ] Create user portfolio endpoints
- [ ] Implement user claims endpoints
- [ ] Add user insurance purchase/renewal endpoints