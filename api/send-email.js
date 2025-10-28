import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS for all origins (adjust as needed for production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Form Message</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      color: #000000;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      border: 2px solid #000;
      padding: 20px;
      box-shadow: 8px 8px 0px #999;
    }
    h2 {
      margin-top: 0;
      font-size: 18px;
      text-transform: uppercase;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
    }
    .field {
      margin: 15px 0;
    }
    .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 13px;
      color: #000;
    }
    .value {
      margin-top: 5px;
      font-size: 14px;
      color: #111;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Contact Message</h2>
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value">${email}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="value">${message.replace(/\n/g, '<br>')}</div>
    </div>
  </div>
</body>
</html>
`;

    // Send email to developer
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html,
    });

    // Send confirmation email to user
    const confirmationHtml = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #fafafa; color: #222; }
        .container { max-width: 500px; margin: 30px auto; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; }
        h2 { color: #e11d48; margin-bottom: 18px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; text-transform: uppercase; font-size: 13px; color: #000; }
        .value { margin-top: 5px; font-size: 14px; color: #111; }
        .footer { margin-top: 30px; font-size: 13px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Thank You for Contacting Dhruval!</h2>
        <p>We have received your message and will get back to you soon. Here is a copy of your submission for your records:</p>
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="value">${message.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="footer">This is an automated confirmation. If you did not submit this, please ignore this email.</div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Confirmation: Your message to Dhruval`,
      text: `Hi ${name},\n\nThank you for contacting Dhruval! We have received your message and will get back to you soon.\n\nHere is a copy of your submission:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nThis is an automated confirmation. If you did not submit this, please ignore this email.`,
      html: confirmationHtml,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.',
      details: error.message 
    });
  }
}
