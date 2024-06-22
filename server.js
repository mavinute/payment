const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payment-credit-card');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", paymentRoutes);

app.get("/teste", (req, res) => {
  return res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
