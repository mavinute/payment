require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

const createCustomer = require('./routes/create-customer');
const createPix = require('./routes/create-pix')
const paymentRoutesCreditCard = require('./routes/payment-credit-card');
const paymentRoutesBillet = require('./routes/payment-billet');
const paymentRoutesPix = require('./routes/payment-pix')

app.use("/api", createCustomer)
app.use("/api", createPix)
app.use("/api", paymentRoutesCreditCard);
app.use("/api", paymentRoutesBillet);
app.use("/api", paymentRoutesPix)

app.get("/", (req, res) => {
  return res.status(200).send("servidor em funcionamento")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});