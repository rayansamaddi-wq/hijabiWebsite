import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

// Debug DNS
dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
  if (err) {
    console.error("DNS lookup failed:", err);
  } else {
    console.log("DNS lookup:", addresses);
  }
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;