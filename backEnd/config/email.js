import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import dns from "dns/promises";

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
  

const records = await dns.lookup("smtp.gmail.com", { all: true });

console.log("DNS lookup:", records);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // NOT 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export default transporter;