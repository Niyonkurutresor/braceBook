/* eslint-disable import/extensions */
import nodemailer from 'nodemailer';
import { signiupTemplate } from './signupTemplate.js';
import updatePassword from './updatePasswordTemplate.js';
import config from './config.js';

const mailering = async (data, action) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.MAIL_USERNAME,
      pass: config.PASSWORD,
    }
  });

  let subject;
  let to;
  let template;
  switch (action) {
    case 'createAccount':
      console.log(data);
      subject = 'Sign up successful';
      template = signiupTemplate(data);
      to = data.email;
      break;

    case 'updatePassword':
      subject = 'Update Password';
      template = updatePassword(data);
      to = data.email;
      break;

    default:
      subject = '';
      break;
  }

  const mailOptions = {
    from: 'niyonkurutresor17@gmail.com',
    to,
    subject,
    html: template
  };

  try {
    const sendMail = transporter.sendMail(mailOptions);
    return sendMail;
  } catch (error) {
    return error;
  }
};
export default mailering;
