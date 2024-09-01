const nodemailer = require('nodemailer');

const sendEmail = (data) => {
  const { name, email, password } = data;
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: 'zakaryameddahi@gmail.com',
    to: email,
    subject: 'Credentials',
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Milky Farm Account</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto 20px;
            max-width: 180px;
          }
          .header {
            background-color: #e6f3ff;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          h1 {
            color: #2c3e50;
            margin-top: 0;
          }
          .credentials {
            background-color: #f0f8ff;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .credentials p {
            margin: 5px 0;
          }
          .footer {
            font-size: 0.9em;
            text-align: center;
            margin-top: 20px;
            color: #7f8c8d;
          }
        </style>
      </head>
      <body>
        <img src="https://res.cloudinary.com/private-school/image/upload/v1725173490/milky-farm/milky-farm.png" alt="Milky Farm Logo" class="logo">
        <div class="header">
          <h1>Welcome to the Milky Farm Team, ${name}!</h1>
          <p>Your account for the farm management system has been set up.</p>
        </div>
        <p>Here are your login credentials for accessing the Milky Farm management system:</p>
        <div class="credentials">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        <p>If you have any questions about using the system or need any assistance, please reach out to the support team.</p>
        <div class="footer">
          <p>This is an internal communication for Milky Farm employees only.</p>
          <p>© 2024 Milky Farm. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };

  mailTransport.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent successfully');
    }
  });
};

module.exports = {
  sendEmail,
};
