const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (customerEmail, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 1️⃣ Email to YOU (Owner)
    const ownerMail = {
        from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📥 New Order/Message from ${customerEmail}`,
        html: `
                 <h2>🛒 New Customer Order</h2>
                 <p><strong>Email:</strong> ${customerEmail}</p>
                 <p><strong>Subject:</strong> ${subject}</p>
                 <p><strong>Message Details:</strong></p>
                 <div style="background:#f4f4f4;padding:10px;border-radius:5px;line-height:1.6;">
               ${message.replace(/\n/g, '<br>')}
                 </div>
                 <p style="margin-top:20px;color:gray;font-size:0.9rem;">📩 Auto-notification from Pakistan Mart</p> `
        ,
        replyTo: customerEmail
    };

    // 2️⃣ Confirmation Email to CUSTOMER
    const customerMail = {
        from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `✅ Your Order Has Been Received - Pakistan Mart`,
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
`
        ,
        replyTo: process.env.EMAIL_USER
    };

    try {
        await transporter.sendMail(ownerMail);
        console.log(`📧 Owner notified at ${process.env.EMAIL_USER}`);

        await transporter.sendMail(customerMail);
        console.log(`📧 Confirmation email sent to customer: ${customerEmail}`);
    } catch (error) {
        console.error("❌ Failed to send emails:", error?.response || error);
    }
};

module.exports = sendEmail;
