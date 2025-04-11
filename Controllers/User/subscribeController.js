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
