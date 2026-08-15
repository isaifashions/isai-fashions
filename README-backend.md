# WhatsApp Order Confirmation Backend

This project includes a simple backend to send order confirmation messages to customers via the WhatsApp API.

## 1. Install dependencies

```bash
npm install
```

## 2. Set up environment variables

Copy the example file and fill in your actual Twilio values:

```bash
copy .env.example .env
```

Then update:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`

## 3. Start the backend

```bash
npm start
```

Your server will run on:

```text
http://localhost:3000
```

## 4. Test the health endpoint

```bash
curl http://localhost:3000/api/health
```

## 5. Connect the storefront

Update the backend URL in the frontend before deploying:

- `script.js`
- `product.js`

Replace the placeholder URL with your deployed backend URL, such as:

```text
https://your-app.onrender.com/api/order
```

## 6. Notes

- The customer phone number must include the country code in the order form.
- The WhatsApp sender must be a verified Twilio or WhatsApp Business number.
- This setup is required for automatic customer messages from a static website.
