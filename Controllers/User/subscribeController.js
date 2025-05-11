const Subscriber = require('../../Models/Subscribe');
const transporter = require('../../config/mailer');
require('dotenv').config();

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ error: 'You are already subscribed.' });

    const subscriber = new Subscriber({ email });
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


exports.getAllSubscribers = async (req, res) => {
  try {
    // Fetch all subscribers, sorted by subscription date (latest first)
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

    // Map through each subscriber to ensure 'subscribedAt' is correctly formatted
    const formattedSubscribers = subscribers.map(sub => {
      // Format the 'subscribedAt' field to 'YYYY-MM-DD' format
      const subscribedAt = sub.subscribedAt instanceof Date && !isNaN(sub.subscribedAt)
        ? sub.subscribedAt.toISOString().split('T')[0]  // 'YYYY-MM-DD' format
        : 'Invalid date';
      return {
        email: sub.email,
        subscribedAt: subscribedAt,
      };
    });

    // Send the formatted subscribers list
    res.status(200).json(formattedSubscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers.' });
  }
};



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
