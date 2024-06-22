const express = require('express');
const bodyParser = require('body-parser');

const paymentRoutesCreditCard = require('./routes/payment-credit-card');
const paymentRoutesBillet = require('./routes/payment-billet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use("/api", paymentRoutesCreditCard);
app.use("/api", paymentRoutesBillet);

app.get("/teste", (req, res) => {
  return res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
