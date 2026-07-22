# Hijabi Store 🧕✨

A full-stack e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
The platform provides a complete shopping experience with user authentication, product management, cart functionality, order processing, reviews, and online payment integration.

Designed as a real-world business application suitable for fashion and retail stores.

---

## 🚀 Live Demo

Coming soon...

---

## 📸 Screenshots

Add screenshots here:

- Homepage
- Product details
- Cart
- Checkout
- User profile
- Admin dashboard

---

# ✨ Features

## 👤 User Features

- User registration and login
- JWT-based authentication
- User profile management
- Update name, email, and password
- View personal orders
- Product reviews and ratings
- One review per user per product

---

## 🛍️ Shopping Features

- Browse products
- Search products
- Filter products by category
- View product details
- Add products to cart
- Update product quantities
- Remove items from cart
- Checkout process
- Order creation

---

## 💳 Payment Integration

Integrated with:

- Tap Payments
- Whish Pay (planned)

Features:

- Online payment checkout
- Payment status verification
- Secure payment webhook handling
- Automatic order payment updates

Payment flow:

```
Customer
   |
   |
Checkout
   |
   |
Tap Payment Gateway
   |
   |
Payment Confirmation
   |
   |
Webhook Verification
   |
   |
Order Updated as Paid
```

---

# 🛠️ Admin Features

- Admin authentication
- Product management
- Create products
- Update products
- Delete products
- Upload product images
- View all orders
- Update order status
- Manage inventory

---

# 🧰 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- RTK Query
- React Router
- React Toastify

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer Image Upload
- REST API Architecture

---

## Database

- MongoDB Atlas

---

## Payment Services

- Tap Payments API
- Whish Pay API

---

# 📂 Project Structure

```
Hijabi-Store
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── slices
│   │   ├── utils
│   │   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone repository

```bash
git clone https://github.com/yourusername/hijabi-store.git
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
NODE_ENV=development

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173


# Tap Payments

TAP_SECRET_KEY=your_tap_secret_key
TAP_BASE_URL=https://api.tap.company/v2
```

Start backend:

```bash
npm run dev
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Application runs on:

```
http://localhost:5173
```

---

# 🔐 Authentication

The project uses JWT authentication.

Authentication flow:

```
User Login
    |
    |
Backend generates JWT
    |
    |
Token stored securely
    |
    |
Protected routes accessible
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|-|-|-|
| POST | /api/v1/users/login | Login user |
| POST | /api/v1/users | Register user |
| PUT | /api/v1/users/profile | Update profile |

---

## Products

| Method | Endpoint | Description |
|-|-|-|
| GET | /api/v1/products | Get products |
| GET | /api/v1/products/:id | Get product |
| POST | /api/v1/products | Create product |
| PUT | /api/v1/products/:id | Update product |
| DELETE | /api/v1/products/:id | Delete product |

---

## Orders

| Method | Endpoint | Description |
|-|-|-|
| POST | /api/v1/orders | Create order |
| GET | /api/v1/orders/myorders | User orders |
| GET | /api/v1/orders | Admin orders |
| PUT | /api/v1/orders/:id/pay | Mark order paid |

---

## Reviews

| Method | Endpoint | Description |
|-|-|-|
| POST | /api/v1/products/reviews/:id | Create review |

---

# 🚀 Deployment

Recommended production deployment:

Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

Images:
- Cloudinary

---

# 🔒 Security Practices

Implemented:

- JWT authentication
- Protected routes
- Password hashing
- Environment variables
- Payment webhook verification
- Input validation

---

# 📌 Future Improvements

- Cloudinary image storage
- Email order confirmation
- Product wishlist
- Coupon system
- Advanced search
- Inventory alerts
- Customer dashboard improvements
- Multi-language support
- Production analytics

---

# 👨‍💻 Author

**Rayan Samadi**

Computer & Communication Engineer  
Full-Stack MERN Developer

---

## License

This project is developed for educational and commercial purposes.
