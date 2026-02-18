// services/emailSend.js
import sgMail from "@sendgrid/mail";

// 🔑 SendGrid API key (DIRECT – as you asked)
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);

/* ===============================
   DEBUG LOGGER
================================ */
const log = (...args) => {
  console.log("[EMAIL]", ...args);
};

/* ===============================
   SAFE SEND (LOG EVERYTHING)
================================ */
const safeSend = async (mail, label) => {
  try {
    log(`Attempting to send an ${label} email`);
    log("TO:", mail.to);
    log("FROM:", mail.from);
    log("SUBJECT:", mail.subject);

    const response = await sgMail.send(mail);

    log(`${label} email SENT ✅`);
    log("SendGrid response status: ", response[0]?.statusCode);
  } catch (err) {
    log(`${label} email FAILED ❌`);

    if (err.response) {
      log("Status Code:", err.response.statusCode);
      log("Body:", JSON.stringify(err.response.body, null, 2));
      log("Headers:", err.response.headers);
    } else {
      log("Error message:", err.message);
    }
  }
};

/* ===============================
   ADMIN EMAIL
================================ */
export const sendOrderEmailToAdmin = ({
  adminEmail,
  name,
  email,
  phone,
  products,
  message
}) => {
  const productList = products?.length
    ? products.map(p => `• ${p.name} (Qty: ${p.quantity})`).join("<br/>")
    : "No products selected";

  safeSend(
    {
      to: adminEmail,
      from: "sierrahealth96@gmail.com", // MUST be verified in SendGrid
      subject: "New Product Inquiry",
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <h3>Products</h3>
        <p>${productList}</p>

        <h3>Message</h3>
        <p>${message || "N/A"}</p>
      `
    },
    "ADMIN"
  );
};

/* ===============================
   USER EMAIL
================================ */
export const sendOrderEmailToUser = ({
  to,
  name,
  phone,
  products
}) => {
  const productList = products?.length
    ? products.map(p => `• ${p.name} (Qty: ${p.quantity})`).join("<br/>")
    : "No products selected";

  safeSend(
    {
      to,
      from: "sierrahealth96@gmail.com", // MUST be verified
      subject: "We received your inquiry",
      html: `
        <p>Hi ${name},</p>

        <p>Thanks for contacting <b>Visionary Medical</b>.</p>

        <p><b>Phone:</b> ${phone}</p>

        <h3>Products</h3>
        <p>${productList}</p>

        <p>Our team will contact you shortly.</p>
      `
    },
    "USER"
  );
};