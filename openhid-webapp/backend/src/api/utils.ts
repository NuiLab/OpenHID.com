import { Response } from 'express';
import { createTransport } from 'nodemailer';

// Responses

export function failure(res: Response, error: Object) {
  res.status(400).json(error);
}

export function success(res: Response, msg: Object) {
  res.status(200).json(msg);
}

// Emails

const { emailAuth: auth } = require('../../auth.json');

const transporter = createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: true,
  auth
});

export function email({name, email, subject, text, html}) {
  let mailOptions = {
    from: '"⚪ OpenHID" <noreply@openhid.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text, // plain text body
    html // html body
  };

  // send mail with defined transport object
  return transporter.sendMail(mailOptions)
    .catch(err => console.error(err));
}