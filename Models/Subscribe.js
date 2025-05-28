const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
   status: {
    type: String,
    enum: ['pending', 'processing', 'responded'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
