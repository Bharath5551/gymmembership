const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  purpose: { type: String, enum: ['signup', 'login'], required: true, index: true },
  codeHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  maxAttempts: { type: Number, default: 5 },
  usedAt: { type: Date, default: null },
  expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });

// TTL index for auto-expiry (ensureIndex needed in some deployments)
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OTP', OTPSchema);
