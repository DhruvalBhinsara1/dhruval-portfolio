// Simple development server for testing API endpoints locally
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;

function normalizeField(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function stripHeaderNewlines(value) {
  return value.replace(/[\r\n]+/g, ' ');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);
}

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!allowedOrigins.length || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10kb' }));

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body ?? {};
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const form = {
    name: stripHeaderNewlines(normalizeField(name, MAX_NAME_LENGTH)),
    email: stripHeaderNewlines(normalizeField(email, MAX_EMAIL_LENGTH)).toLowerCase(),
    message: normalizeField(message, MAX_MESSAGE_LENGTH),
  };

  if (!form.name || !form.email || !form.message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!isValidEmail(form.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const safe = {
    name: escapeHtml(form.name),
    email: escapeHtml(form.email),
    message: escapeHtml(form.message).replace(/\n/g, '<br>'),
  };

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
      <div class="value">${safe.name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value">${safe.email}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="value">${safe.message}</div>
    </div>
  </div>
</body>
</html>
`;

    // Send email to developer
    try {
      const devMailInfo = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: form.email,
        subject: `Portfolio Contact: ${form.name}`,
        text: `From: ${form.name} <${form.email}>\n\n${form.message}`,
        html,
      });
      console.log('Developer email sent:', devMailInfo);
    } catch (err) {
      console.error('Error sending developer email:', err);
    }

    // Send confirmation email to user
    const confirmationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Confirmation: Your message to Dhruval</title>
      <style>
        body { font-family: Arial, sans-serif; background: #fafafa; color: #222; }
        .container { max-width: 500px; margin: 30px auto; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; }
        .big-shade {
          background: linear-gradient(90deg, #38bdf8 0%, #22d3ee 100%); /* blue to teal */
          border-radius: 8px 8px 0 0;
          padding: 32px 24px 24px 24px;
          text-align: center;
        }
        .big-shade h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .field { margin: 15px 0; }
        .label { font-weight: bold; text-transform: uppercase; font-size: 13px; color: #000; }
        .value { margin-top: 5px; font-size: 14px; color: #111; }
        .footer { margin-top: 30px; font-size: 13px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="big-shade">
          <h2>Thank You for Contacting Dhruval!</h2>
        </div>
        <p style="margin-top:24px;">I have received your message and will get back to you soon. Here is a copy of your submission for your records:</p>
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${safe.name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${safe.email}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="value">${safe.message}</div>
        </div>
        <div class="footer">This is an automated confirmation. If you did not submit this, please ignore this email.</div>
      </div>
    </body>
    </html>
    `;

    try {
      const userMailInfo = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: form.email,
        subject: `Confirmation: Your message to Dhruval`,
        text: `Hi ${form.name},\n\nThank you for contacting Dhruval! I have received your message and will get back to you soon.\n\nHere is a copy of your submission:\n\nName: ${form.name}\nEmail: ${form.email}\nMessage:\n${form.message}\n\nThis is an automated confirmation. If you did not submit this, please ignore this email.`,
        html: confirmationHtml,
      });
      console.log('Confirmation email sent:', userMailInfo);
    } catch (err) {
      console.error('Error sending confirmation email:', err);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Dev API server running on http://localhost:${PORT}`);
});
