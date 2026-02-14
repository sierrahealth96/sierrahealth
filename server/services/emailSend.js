import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOrderEmail = async ({ to, name, products }) => {
  const productList =
    products?.length > 0
      ? products.map(p => `• ${p.productName} (Qty: ${p.quantity})`).join("\n")
      : "No products selected";

  await transporter.sendMail({
    from: `"Medical Equipment" <${process.env.EMAIL}>`,
    to,
    subject: "Thanks for reaching out",
    text: `Hi ${name},

Thank you for contacting us.
We have received your inquiry.

Products:
${productList}

Our team will get back to you shortly.

Regards,
Medical Equipment Team`
  });
};