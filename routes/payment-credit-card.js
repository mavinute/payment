const express = require('express');
const router = express.Router();

const apiClient = require('../api/api')

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

if (!ASAAS_API_KEY) {
  console.error("ASAAS_API_KEY is not defined. Please set it in the environment variables.");
  process.exit(1); // Terminate the process if API key is not defined
}

router.post('/create-subscription', async (req, res) => {
  const subscriptionData = {
    customer: req.body.customer,
    billingType: 'CREDIT_CARD',
    nextDueDate: req.body.nextDueDate,
    value: req.body.value,
    cycle: req.body.cycle,
    description: req.body.description,
    creditCard: {
      holderName: req.body.holderName,
      number: req.body.number,
      expiryMonth: req.body.expiryMonth,
      expiryYear: req.body.expiryYear,
      ccv: req.body.ccv,
    },
    creditCardHolderInfo: {
      name: req.body.holderName,
      email: req.body.email,
      cpfCnpj: req.body.cpfCnpj,
      postalCode: req.body.postalCode,
      addressNumber: req.body.addressNumber,
      addressComplement: req.body.addressComplement || '',
      phone: req.body.phone,
      mobilePhone: req.body.mobilePhone,
    },
    externalReference: req.body.externalReference,
  };

  try {
    console.log('Subscription data:', JSON.stringify(subscriptionData, null, 2));
    console.log('Using Asaas API URL:', ASAAS_API_URL);
    console.log('Using Asaas API Key:', ASAAS_API_KEY);

    const response = await apiClient.post(`/payments`, subscriptionData);

    console.log('Subscription created successfully:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating subscription:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('Request data:', error.request);
      res.status(500).json({ error: 'No response received from Asaas API' });
    } else {
      console.error('Error message:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
