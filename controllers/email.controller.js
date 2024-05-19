import {_sendMeEmail, _sendEmailTo} from "../utils/email_sender.js";

export const sendMeEmail = async (req, res) => {
    const {subject, message, name, email} = req.body;

    const full_message = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    _sendMeEmail(subject, full_message)
        .then((result) => {
            console.log("Email sent...", result);
            return res.status(200).json({msg: "Message sent"});
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({msg: "Something went wrong"});
        });
}