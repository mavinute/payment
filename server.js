const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Carregar variáveis de ambiente

const paymentRoutesCreditCard = require('./routes/payment-credit-card');
const paymentRoutesBillet = require('./routes/payment-billet');
const paymentRoutesPix = require('./routes/payment-pix')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use("/api", paymentRoutesCreditCard);
app.use("/api", paymentRoutesBillet);
app.use("/api", paymentRoutesPix)

app.get("/teste", (req, res) => {
  console.log("Teste em funcionemto")
  return res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
