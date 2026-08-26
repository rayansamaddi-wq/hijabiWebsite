import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
  



console.log("DNS lookup:", records);

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