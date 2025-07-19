const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Pakistan Mart" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html: `<div style="font-family: Arial, sans-serif; font-size: 15px; white-space: pre-line;">${text}</div>`,
        replyTo: process.env.EMAIL_USER
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Failed to send email to ${to}`, error?.response || error);
    }
};

module.exports = sendEmail;
