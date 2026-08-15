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

Use the local backend URL while developing:

```text
http://localhost:3000/api/order
```

Update `script.js` and `product.js` if you later deploy the backend to a different host.

## 6. Notes

- The customer phone number must include the country code in the order form.
- The WhatsApp sender must be a verified Twilio or WhatsApp Business number.
- This setup is required for automatic customer messages from a static website.
