require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const paymentRoutesCreditCard = require('./routes/payment-credit-card');
const paymentRoutesBillet = require('./routes/payment-billet');
const paymentRoutesPix = require('./routes/payment-pix')

app.use("/api", paymentRoutesCreditCard);
app.use("/api", paymentRoutesBillet);
app.use("/api", paymentRoutesPix)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
