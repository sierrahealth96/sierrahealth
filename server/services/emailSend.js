// services/emailSend.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,              // ✅ IPv4-safe
  secure: false,          // ✅ MUST be false for 587
  auth: {
    // user: "sierrahealth96@gmail.com",
    // pass: "snyrzxiwuypwpxbr" // app password
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4 
});

/* ---------- ADMIN ---------- */
export const sendOrderEmailToAdmin = async ({
  adminEmail,
  name,
  email,
  phone,
  products,
  message
}) => {
  const productList =
    products.length > 0
      ? products.map(p => `• ${p.name} (Qty: ${p.quantity})`).join("\n")
      : "No products selected";

  await transporter.sendMail({
    from: `"Website Lead" <${adminEmail}>`,
    to: adminEmail,
    subject: "New Product Inquiry",
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Products:
${productList}

Message:
${message || "N/A"}
`
  });
};

/* ---------- USER ---------- */
export const sendOrderEmailToUser = async ({
  to,
  name,
  phone,
  products
}) => {
  const productList =
    products.length > 0
      ? products.map(p => `• ${p.name} (Qty: ${p.quantity})`).join("\n")
      : "No products selected";

  await transporter.sendMail({
    from: `"Medical Equipment" <sierrahealth96@gmail.com>`,
    to,
    subject: "Thanks for contacting us",
    text: `
Hi ${name},

We received your inquiry.

Phone: ${phone}

Products:
${productList}

Our team will contact you shortly.
`
  });
};