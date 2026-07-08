# 🏠 RentNest Backend API

RentNest is a **Rental Property Management System** built with **Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, and Stripe**. It provides a secure REST API for tenants, landlords, and administrators to manage rental properties, rental requests, payments, and reviews.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- JWT Authentication
- Refresh Token
- Password Hashing with bcrypt
- Role-Based Access Control (Tenant, Landlord, Admin)

---

### 🏡 Property Management

- Create Property
- Update Property
- Delete Property
- Get All Properties
- Get Property Details
- Search by Title
- Filter by City
- Filter by Category
- Price Range Filter
- Pagination & Sorting

---

### 📂 Category Management

- Create Category
- Update Category
- Delete Category
- Get All Categories

---

### 📝 Rental Requests

Tenant can

- Request a property
- View own rental requests
- View rental request details

Landlord can

- View rental requests
- Approve request
- Reject request

Business Rules

- Cannot request unavailable property
- Cannot send duplicate requests
- Approving one request automatically rejects other pending requests
- Approved property becomes unavailable

---

### 💳 Payment Integration

Integrated with **Stripe Checkout**

Features

- Create Checkout Session
- Stripe Webhook Verification
- Payment History
- Payment Details
- Automatic Rental Activation after successful payment

Payment Status

- Pending
- Completed
- Failed

---

### ⭐ Reviews

Tenant can review a property only after completing a rental.

- Create Review

---

### 👨‍💼 Admin Panel

- Get All Users
- Ban / Unban Users
- Get All Properties
- Get All Rental Requests
- Dashboard Statistics

Dashboard Stats

- Total Users
- Total Properties
- Available Properties
- Total Rental Requests
- Active Rentals
- Total Revenue

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- bcrypt

### Payment

- Stripe Checkout
- Stripe Webhooks

### Validation

- Custom Service Validation

### Other

- Cookie Parser
- CORS
- dotenv

---

## 📁 Project Structure

```
src
│
├── config
├── generated
├── lib
├── middleware
├── modules
│   ├── auth
│   ├── categories
│   ├── landlord
│   ├── payments
│   ├── property
│   ├── admin
│   └── reviews
│
├── rental-request
├── utilities
├── app.ts
└── server.ts
```

---

## 🔑 Roles

### Tenant

- Browse Properties
- Send Rental Request
- View Rental Requests
- Make Payment
- View Payment History
- Create Review

### Landlord

- Manage Properties
- View Rental Requests
- Approve / Reject Rental Request

### Admin

- Manage Users
- Manage Properties
- View Rental Requests
- View Dashboard Statistics

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/refresh-token |
| POST | /api/auth/logout |

---

### Categories

| Method | Endpoint |
|----------|----------|
| POST | /api/categories |
| GET | /api/categories |
| PATCH | /api/categories/:id |
| DELETE | /api/categories/:id |

---

### Properties

| Method | Endpoint |
|----------|----------|
| POST | /api/properties |
| GET | /api/properties |
| GET | /api/properties/:id |
| PATCH | /api/properties/:id |
| DELETE | /api/properties/:id |

---

### Rental Requests

| Method | Endpoint |
|----------|----------|
| POST | /api/rentals |
| GET | /api/rentals |
| GET | /api/rentals/:id |

---

### Landlord

| Method | Endpoint |
|----------|----------|
| GET | /api/landlord/requests |
| PATCH | /api/landlord/requests/:id |

---

### Payments

| Method | Endpoint |
|----------|----------|
| POST | /api/payments/create |
| POST | /api/payments/confirm |
| GET | /api/payments |
| GET | /api/payments/:id |

---

### Reviews

| Method | Endpoint |
|----------|----------|
| POST | /api/reviews |

---

### Admin

| Method | Endpoint |
|----------|----------|
| GET | /api/admin/users |
| PATCH | /api/admin/users/:id |
| GET | /api/admin/properties |
| GET | /api/admin/rentals |
| GET | /api/admin/stats |

---

## ⚙️ Installation

```bash
git clone <repository-url>

cd rentnest-backend

npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=2000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

APP_URL=http://localhost:2000

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

## Run the Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

## Database

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

## API Testing

The API can be tested using:

- Postman


---



## 👨‍💻 Author

**Md. Roqunuzzaman**

Backend Developer

Email: khanrokon571@gmail.com

