const CallOrder = require('../../Models/CallOrder');

exports.createOrder = async (req, res) => {
  try {
    const order = new CallOrder(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const orders = await CallOrder.find({ customer: req.params.customerId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await CallOrder.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await CallOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await CallOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await CallOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getOrderCountsByStatus = async (req, res) => {
  try {
    const counts = await CallOrder.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Format result for better readability
    const result = { pending: 0, completed: 0 };
    counts.forEach(item => {
      result[item._id] = item.count;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.deleteOrder = async (req, res) => {
  try {
    const order = await CallOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ['pending', 'processing', 'completed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await CallOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getCallOrderStatusCounts = async (req, res) => {
  try {
    const counts = await CallOrder.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const result = { pending: 0, processing: 0, completed: 0 };

    counts.forEach(item => {
      const status = (item._id || 'pending').toLowerCase();
      if (result.hasOwnProperty(status)) {
        result[status] = item.count;
      }
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add to your CallOrder controller

exports.createMultipleOrders = async (req, res) => {
  try {
    const { customer, orders } = req.body;

    if (!customer || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const ordersToInsert = orders.map(order => ({
      ...order,
      customer
    }));

    const savedOrders = await mongoose.model('CallOrder').insertMany(ordersToInsert);

    res.status(201).json(savedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
