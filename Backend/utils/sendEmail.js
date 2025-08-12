const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// ✅ Create reusable transporter (no need to recreate each time)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send email to the store owner/admin
 * @param {string} subject - Subject line
 * @param {string} message - Message body
 * @param {string} customerEmail - Customer's email (for reply-to)
 */
const sendOwnerEmail = async (subject, message, customerEmail) => {
  const mailOptions = {
    from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: subject,
    html: `
      <h2>🛒 New Customer Order</h2>
      <p><strong>Customer Email:</strong> ${customerEmail}</p>
      <p><strong>Message Details:</strong></p>
      <div style="background:#f4f4f4;padding:10px;border-radius:5px;line-height:1.6;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p style="margin-top:20px;color:gray;font-size:0.9rem;">
        📩 Auto-notification from Pakistan Mart
      </p>
    `,
    replyTo: customerEmail
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Owner notified at ${process.env.EMAIL_USER}`);
  } catch (error) {
    console.error("❌ Failed to send email to owner:", error?.response || error);
  }
};

/**
 * Send confirmation email to the customer
 * @param {string} customerEmail - Customer's email
 * @param {string} subject - Subject line
 * @param {string} message - Message body
 */
const sendCustomerEmail = async (customerEmail, subject, message) => {
  const mailOptions = {
    from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: subject,
    html: `
      <h2 style="color:#a73e2c;">✅ Thank you for your order from <strong>Pakistan Mart</strong>!</h2>
      <p>Dear Customer,</p>
      <p>We’ve received your order with the following details:</p>
      <div style="background:#f9f9f9;padding:15px;border-left:5px solid #a73e2c;line-height:1.6;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p style="margin-top:20px;">
        🕒 <strong>${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</strong><br>
        <strong>- Pakistan Mart Team</strong>
      </p>
    `,
    replyTo: process.env.EMAIL_USER
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to customer: ${customerEmail}`);
  } catch (error) {
    console.error("❌ Failed to send email to customer:", error?.response || error);
  }
};

module.exports = { sendOwnerEmail, sendCustomerEmail };
