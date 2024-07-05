const express = require('express');
const router = express.Router();

const apiClient = require('../api/api')

router.post('/create-subscription-boleto', async (req, res) => {
  const subscriptionData = req.body;
  console.log("CPF-CNPJ: ", subscriptionData.cpfCnpj)

  try {
    const response = await apiClient.post('/subscriptions', subscriptionData);

    console.log('Subscription data:', response.data);

    if (response.data) {
      return res.json({ subscriptionId: response.data.id, status: response.data.status });
    } else {
      res.status(500).json({ error: 'Erro ao criar a assinatura' });
    }
  } catch (error) {
    console.error('Error creating subscription:', error.message);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      return res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('No response received:', error.request);
      return res.status(500).json({ error: 'No response from the server' });
    } else {
      console.error('Error setting up request:', error.message);
      return res.status(500).json({ error: 'Erro ao processar a assinatura' });
    }
  }
});

module.exports = router;