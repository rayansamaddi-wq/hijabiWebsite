import dotenv from "dotenv";
import express from "express";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import transporter from './config/email.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


import connectDB from "./config/db.js";

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from "./routes/tapPaymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const __dirname = path.resolve(); // Set {__dirname} to current working directory
app.use('/uploads', express.static(path.join(__dirname, "public/images")));

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://hijabi-website-gules.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/orders', orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/cart", cartRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  //any app route that is not api will redirected to index.html
  app.get( (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
   // No root route needed in development
}



// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use(notFound);
app.use(errorHandler);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});