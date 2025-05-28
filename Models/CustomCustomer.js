// models/Customer.js
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },
  address:   { type: String, required: true },
}, { timestamps: true });  // 👈 This adds createdAt and updatedAt automatically


module.exports = mongoose.model('Customer', customerSchema);
