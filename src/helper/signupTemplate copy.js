/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
export const signiupTemplate = (data) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thank You for Signing Up!</title>
  <style>
    /* CSS styles for the email template */
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      background-image: url('https://res.cloudinary.com/kist/image/upload/v1690062533/profiles/email%20background/istockphoto-1145618475-612x612_li9fou_dc5xum.jpg');
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .message {
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Signing Up!</h1>
    </div>
    <div class="message">
      <p>Dear ${data.userName},</p>
      <p>Thank you for signing up on our website. We are excited to have you as a new member of our community!</p>
      <p>If you have any questions or need assistance, feel free to contact us. Enjoy exploring our website!</p>
    </div>
    <div class="button-container">
      <a class="button" href="${data.emailVerficationURL}" target="_blank">Confirm Email</a>
    </div>
    <p>If you dident try to siginup on brace book please Ignore this email</p>
  </div>
</body>
</html>
`;
