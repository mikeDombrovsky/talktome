import {_sendEmail} from "../utils/email_sender.js";

export const sendEmail = async (req, res) => {
    const {subject, message, name, email} = req.body;

    const full_message = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    _sendEmail(subject, full_message)
        .then((result) => {
            console.log("Email sent...", result);
            return res.status(200).json({msg: "message sent"});
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({msg: "something went wrong"});
        });
}