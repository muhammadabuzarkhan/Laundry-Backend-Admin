const Subscriber = require('../../Models/Subscribe');
const transporter = require('../../config/mailer');
require('dotenv').config();

// Subscribe a new user
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ error: 'You are already subscribed.' });

    const subscriber = new Subscriber({ email }); // status defaults to 'pending'
    await subscriber.save();

    // Send email to admin
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Subscriber Alert!',
      html: `
        <h2>🎉 New Subscriber!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>📅 Subscribed at: ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// Get all subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

    const formattedSubscribers = subscribers.map(sub => {
      const subscribedAt = sub.subscribedAt instanceof Date && !isNaN(sub.subscribedAt)
        ? sub.subscribedAt.toISOString().split('T')[0]
        : 'Invalid date';
      return {
        email: sub.email,
        subscribedAt,
        status: sub.status || 'pending',
      };
    });

    res.status(200).json(formattedSubscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers.' });
  }
};

// Delete (unsubscribe) a subscriber
exports.deleteSubscriber = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required to unsubscribe.' });
  }

  try {
    const result = await Subscriber.findOneAndDelete({ email });

    if (!result) {
      return res.status(404).json({ error: 'Subscriber not found.' });
    }

    res.status(200).json({ message: 'Unsubscribed successfully.' });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({ error: 'Failed to unsubscribe.' });
  }
};

// Update subscriber status
exports.updateSubscriberStatus = async (req, res) => {
  const { email, status } = req.body;

  if (!email || !status) {
    return res.status(400).json({ error: 'Email and new status are required.' });
  }

  if (!['pending', 'processing', 'responded'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updated = await Subscriber.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Subscriber not found.' });
    }

    res.status(200).json({
      message: `Subscriber status updated to "${status}".`,
      subscriber: {
        email: updated.email,
        status: updated.status,
        subscribedAt: updated.subscribedAt.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update status.' });
  }
};

exports.updateAllSubscriberStatuses = async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required.' });
  }

  if (!['pending', 'processing', 'responded'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const result = await Subscriber.updateMany({}, { status });

    res.status(200).json({
      message: `All subscribers updated to status "${status}".`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Error updating all statuses:', error);
    res.status(500).json({ error: 'Failed to update statuses.' });
  }
};
exports.updateSubscriberStatus = async (req, res) => {
  const { email, status } = req.body;

  if (!email || !status) {
    return res.status(400).json({ error: 'Email and status are required.' });
  }

  // Only allow valid status values
  const allowedStatuses = ['pending', 'processing', 'responded'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updatedSubscriber = await Subscriber.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );

    if (!updatedSubscriber) {
      return res.status(404).json({ error: 'Subscriber not found.' });
    }

    res.status(200).json({
      message: `Status updated to "${status}" for ${email}`,
      subscriber: {
        email: updatedSubscriber.email,
        status: updatedSubscriber.status,
        subscribedAt: updatedSubscriber.subscribedAt.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('Error updating subscriber status:', error);
    res.status(500).json({ error: 'Failed to update subscriber status.' });
  }
};

