const mongoose = require('mongoose');

const callOrderSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_phone: { type: String, required: true },
  order_number: { type: String, unique: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  product: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  address: { type: String, required: true },
  title: { type: String, required: true },
    status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  }

}, 
{ timestamps: true });

callOrderSchema.pre('save', async function (next) {
  if (!this.order_number) {
    const count = await mongoose.model('CallOrder').countDocuments();
    this.order_number = `call-order-${String(count + 1).padStart(2, '0')}`;
  }
  next();
});

module.exports = mongoose.model('CallOrder', callOrderSchema);
