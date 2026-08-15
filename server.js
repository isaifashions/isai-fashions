require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Isai Fashions WhatsApp backend is running.' });
});

app.post('/api/order', async (req, res) => {
  try {
    const { name, phone, address, city, pincode, item, size, quantity, total, paymentMethod, notes } = req.body || {};

    if (!name || !phone || !item) {
      return res.status(400).json({
        ok: false,
        message: 'Missing required order fields.'
      });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;

    if (!accountSid || !authToken || !fromNumber) {
      return res.status(500).json({
        ok: false,
        message: 'WhatsApp API credentials are not configured yet.'
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    const toNumber = `whatsapp:+${cleanPhone}`;

    const messageBody = [
      `Hi ${name}, thank you for shopping with Isai Fashions!`,
      '',
      `Your order has been received: ${item}`,
      size ? `Size: ${size}` : '',
      quantity ? `Quantity: ${quantity}` : '',
      total ? `Total: ₹${Number(total).toLocaleString('en-IN')}` : '',
      paymentMethod ? `Payment: ${paymentMethod}` : '',
      address ? `Address: ${address}` : '',
      city ? `City: ${city}` : '',
      pincode ? `Pincode: ${pincode}` : '',
      notes ? `Notes: ${notes}` : '',
      '',
      'We will contact you soon with the delivery details.'
    ].filter(Boolean).join('\n');

    const client = twilio(accountSid, authToken);
    const twilioResponse = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: messageBody
    });

    return res.json({
      ok: true,
      messageId: twilioResponse.sid,
      status: twilioResponse.status,
      customerPhone: toNumber,
      message: 'Customer WhatsApp confirmation sent successfully.'
    });
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Failed to send WhatsApp message.',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Isai Fashions backend running on http://localhost:${port}`);
});
