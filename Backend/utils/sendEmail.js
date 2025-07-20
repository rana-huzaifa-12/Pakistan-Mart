const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (customerEmail, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail
            pass: process.env.EMAIL_PASS  // App password from Gmail
        }
    });

    // 1️⃣ Email sent to YOU (the owner)
    const ownerMail = {
        from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `📥 New Order/Message from ${customerEmail}`,
        html: `
            <h2>New Customer Order/Message</h2>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#f4f4f4;padding:10px;border-radius:5px;">
                ${message}
            </div>
        `,
        replyTo: customerEmail
    };

    // 2️⃣ Email confirmation to the CUSTOMER
    const customerMail = {
        from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `✅ Your Order Has Been Received - Pakistan Mart`,
        html: `
            <p>Dear Customer,</p>
            <p>Thank you for placing an order at <strong>Pakistan Mart</strong>.</p>
            <p>We have successfully received your order/message:</p>
            <blockquote style="background:#f9f9f9;padding:10px;border-left:4px solid #a73e2c;">
                ${message}
            </blockquote>
            <p>Our team will contact you shortly regarding the next steps.</p>
            <p>Warm regards,<br><strong>Pakistan Mart</strong> Team</p>
        `,
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
