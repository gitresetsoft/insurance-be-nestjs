# Zurince Insurance Portal - Backend

## Overview

This API service powers the backend of Zurince's customer portal, allowing customers to create accounts, purchase or renew insurance, check their insurance portfolio, and submit claims. The system includes administrative functionality to maintain user details and premium paid amounts.

Ref: [Zurince Frontend](https://github.com/gitresetsoft/insurance-fe-reactjs)

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript  
- **ORM**: Prisma
- **Database**: SQLite (development)
- **API Documentation**: Swagger
- **Query Management**: TanStack

## Features

- User authentication and authorization with role-based access control
- Premium calculation based on product code and location
- Customer billing information management
- Insurance product management
- Policy creation and management
- Claims submission and processing
- Profile management for users

## API Endpoints

### Billing Endpoints

- **GET** `/billing` - Get billing information (optional query params: `productCode`, `location`)
- **POST** `/billing` - Create new billing entry (admin only)
- **PUT** `/billing` - Update billing information by product code (admin only)
- **DELETE** `/billing` - Delete billing entry by product code (admin only)

### Insurance Products Endpoints

- **GET** `/insurance-products` - List all insurance products
- **GET** `/insurance-products/:id` - Get single product details
- **GET** `/insurance-products/active` - List active products
- **GET** `/insurance-products/type/:type` - Get products by type
- **POST** `/insurance-products` - Create new product (admin only)
- **PATCH** `/insurance-products/:id` - Update product (admin only)
- **DELETE** `/insurance-products/:id` - Delete product (admin only)

### Policies Endpoints

- **GET** `/policies` - List all policies (admin only)
- **GET** `/policies/status/:status` - Get policies by status
- **GET** `/policies/user/:userId` - List policies owned by user
- **GET** `/policies/:id` - Get single policy (owned only)
- **POST** `/policies` - Create new policy
- **PATCH** `/policies/:id` - Update policy (admin only)
- **DELETE** `/policies/:id` - Delete policy (admin only)

### Claims Endpoints

- **GET** `/claims` - List all claims (admin only)
- **GET** `/claims/user/:userId` - List claims owned by user
- **GET** `/claims/policy/:policyId` - List claims for a policy owned by user
- **GET** `/claims/status/:status` - Get claims by status (owned only)
- **GET** `/claims/:id` - Get single claim (owned only)
- **POST** `/claims` - Create new claim
- **PATCH** `/claims/:id` - Update claim (users can update except status, admins can update status)
- **DELETE** `/claims/:id` - Delete claim (owned only)

### User Endpoints

- **GET** `/users/profile` - Get own profile
- **PATCH** `/users/profile` - Update own profile (except role)

### Authentication Endpoints

- **POST** `/auth/register` - User registration (email/password)
- **POST** `/auth/login` - User login (email/password)
- **GET** `/auth/google` - Initiate Google OAuth
- **GET** `/auth/google/callback` - Google OAuth callback
- **POST** `/auth/logout` - User logout

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/gitresetsoft/insurance-be-nestjs.git
   cd insurance-be-nestjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   touch .env
   ```
   Edit the `.env` file with your configuration.

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### API Documentation
Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Future Improvements

- **Google OAuth Integration**: Implement Google OAuth for more streamlined user authentication
- **PostgreSQL Migration**: Replace SQLite with PostgreSQL for production-grade database solution
- **Payment Gateway Integration**: Implement secure payment processing for insurance purchases
- **Response/Request Encryption**: Add encryption layer for sensitive data transmission
- **Expanded Test Coverage**: Enhance test coverage for more robust validation
- **Containerization**: Docker setup for easier deployment
- **CI/CD Pipeline**: Automated testing and deployment workflow

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.
