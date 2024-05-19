import "dotenv/config";
import nodemailer from 'nodemailer';

export const _sendMeEmail = async (subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            }
        });

        const mailOptions = {
            from: `Portfolio emailer <${process.env.SENDER_EMAIL}>`,
            to: [process.env.RECIPIENT_EMAIL],
            subject: subject,
            text: message,
        };

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error);
    }
}

export const _sendEmailTo = async (subject, message, fromName, to) => {
     try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            }
        });

        const mailOptions = {
            from: `${fromName} emailer <${process.env.SENDER_EMAIL}>`,
            to: [to],
            subject: subject,
            text: message,
        };

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error);
    }
}