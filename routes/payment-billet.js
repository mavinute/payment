const express = require('express');
const axios = require('axios');

const router = express.Router();

//const ASAAS_API_KEY = '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0NDE1MjI6OiRhYWNoXzNjZjM3MTFkLWIyYjctNDkwMi1iNzQ5LWM2OTkwMzdjMWU3NA =='

// Rota para criar pagamento via boleto bancário
router.post('/create-subscription-boleto', async (req, res) => {
  const url = 'https://sandbox.asaas.com/api/v3/subscriptions';

  const options = {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ASAAS_API_KEY}`, // Cabeçalho Authorization
      'User-Agent': 'axios/1.7.2'
    }
    // headers: {
    //   'Content-Type': 'application/json',
    //   'access_token': ASAAS_API_KEY
    // }
  }

  const subscriptionData = req.body;

  try {
    const response = await router.post(url, subscriptionData, options)
      .then(response => {
        console.log('Subscription data:', response.data);

        // Verifica se há um link para o boleto na resposta
        if (response.data) {
          res.json({ subscriptionId: response.data.id, status: response.data.status });
        } else {
          res.status(500).json({ error: 'Erro ao criar a assinatura' });
        }
      })
      .catch(error => {
        console.error('Error creating subscription:', error.message);
        res.status(500).json({ error: 'Erro ao processar a assinatura' });
      });
  } catch (error) {
    console.error('Error creating subscription:', error.message);
    res.status(500).json({ error: 'Erro ao processar a assinatura' });
  }
});

module.exports = router;