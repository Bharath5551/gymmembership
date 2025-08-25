const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const OTP_TTL_MINUTES = parseInt(process.env.OTP_TTL_MINUTES || '5', 10);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOTP(to, code) {
  // Transporter via SMTP. Use env vars
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.log(`[OTP] EMAIL_USER or EMAIL_PASS not set. OTP for ${to}: ${code}`);
    return;
  }
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: user,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
  });
}

// POST /api/otp/send
// body: { email, purpose: 'signup'|'login' }
router.post('/send', async (req, res) => {
  try {
    const { email, purpose } = req.body;
    if (!email || !purpose) return res.status(400).json({ error: 'email and purpose required' });
    if (!['signup', 'login'].includes(purpose)) return res.status(400).json({ error: 'invalid purpose' });

    const existing = await User.findOne({ email });
    if (purpose === 'signup' && existing) {
      return res.status(409).json({ error: 'user already exists' });
    }
    if (purpose === 'login' && !existing) {
      return res.status(404).json({ error: 'user not found' });
    }

    const code = generateOTP();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    await OTP.create({ email, purpose, codeHash, expiresAt });

    await sendEmailOTP(email, code);
    return res.json({ message: 'otp sent' });
  } catch (err) {
    console.error('send-otp error', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

// POST /api/otp/verify
// body: { email, code, purpose, fullname?, password? } 
router.post('/verify', async (req, res) => {
  try {
    const { email, code, purpose, fullname, password } = req.body;
    if (!email || !code || !purpose) return res.status(400).json({ error: 'email, code, purpose required' });

    const record = await OTP.findOne({ email, purpose, usedAt: null }).sort({ createdAt: -1 });
    if (!record) return res.status(400).json({ error: 'no active otp' });
    if (record.expiresAt < new Date()) return res.status(400).json({ error: 'otp expired' });
    if (record.attempts >= record.maxAttempts) return res.status(429).json({ error: 'too many attempts' });

    const ok = await bcrypt.compare(code, record.codeHash);
    record.attempts += 1;
    await record.save();

    if (!ok) return res.status(400).json({ error: 'invalid otp' });

    record.usedAt = new Date();
    await record.save();

    let user = await User.findOne({ email });

    if (purpose === 'signup') {
      if (user) return res.status(409).json({ error: 'user already exists' });
      if (!fullname || !password) return res.status(400).json({ error: 'fullname and password required for signup' });
      // If User schema expects password hash, handle in authRoutes normally;
      // for simplicity, store plain now and require existing hooks to hash if any.
      user = new User({ fullname, email, password });
      await user.save();
    }

    if (purpose === 'login') {
      if (!user) return res.status(404).json({ error: 'user not found' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ message: 'verified', token, user: { id: user._id, fullname: user.fullname, email: user.email } });
  } catch (err) {
    console.error('verify-otp error', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

module.exports = router;
