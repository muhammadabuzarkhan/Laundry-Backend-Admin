const mongoose = require('mongoose');

const callOrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  user_name: { type: String, required: true },
  user_phone: { type: String, required: true },
  order_number: { type: String, unique: true },
  product: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  address: { type: String, required: true },
  title: { type: String, required: true },
  delivery_date: { type: String },
  delivery_time: { type: String },

  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending',
  }
}, { timestamps: true });

callOrderSchema.pre('save', async function (next) {
  if (!this.order_number) {
    const count = await mongoose.model('CallOrder').countDocuments();
    this.order_number = `call-order-${String(count + 1).padStart(2, '0')}`;
  }
  next();
});

module.exports = mongoose.model('CallOrder', callOrderSchema);
