const express = require('express');
const router = express.Router();

const apiClient = require('../api/api')

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

router.post("/create-customer", async (req, res) => {
  const customerData = {
    name: req.body.name,
    email: req.body.email,
    // phone: req.body.phone,
    // mobilePhone: req.body.mobilePhone,
    // cpfCnpj: req.body.cpfCnpj,
    // postalCode: req.body.postalCode,
    // address: req.body.address,
    // addressNumber: req.body.addressNumber,
    // complement: req.body.complement,
    // province: req.body.province,
    // externalReference: req.body.externalReference,
    // notificationDisabled: false,
    // additionalEmails: req.body.email
  }

  try {
    console.log('Subscription data:', JSON.stringify(customerData, null, 2));
    console.log('Using Asaas API URL:', ASAAS_API_URL);
    console.log('Using Asaas API Key:', ASAAS_API_KEY);

    const response = await apiClient.post(`/customers`, customerData);

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

  return
})

module.exports = router;