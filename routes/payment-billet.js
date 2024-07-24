const express = require('express');
const router = express.Router();
const axios = require('axios');

// Configuração do cliente axios com a URL base e headers
const apiClient = axios.create({
  baseURL: 'https://www.asaas.com/api/v3', // URL base da API
  headers: {
    'Content-Type': 'application/json',
    //'User-Agent': 'payment',
    'access_token': process.env.ASAAS_API_KEY,
  },
  timeout: 10000 // Tempo limite em milissegundos (10 segundos)
});

// Endpoint para criar uma assinatura com boleto bancário
router.post('/create-subscription-boleto', async (req, res) => {
  const {
    customer,
    billingType,
    dueDate,
    value,
    description,
    externalReference,
    cpfCnpj,
    cycle // Certifique-se de que o campo cycle está presente
  } = req.body;

  // Log dos dados recebidos
  console.log('Dados recebidos para assinatura:', req.body);

  // Validação dos dados de entrada
  if (!customer || !billingType || !dueDate || !value || !description || !externalReference || !cpfCnpj || !cycle) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criação da assinatura
    const subscriptionResponse = await apiClient.post('/subscriptions', {
      customer,
      billingType: 'BOLETO', // Certifique-se de que este é o valor correto
      dueDate,
      value,
      description,
      externalReference,
      cpfCnpj,
      cycle
    });

    //return console.log("subscriptionResponse: ", subscriptionResponse)

    const subscriptionData = subscriptionResponse.data;

    // Log da resposta da criação da assinatura
    console.log('Subscription data:', subscriptionData);

    // Verificar se a assinatura foi criada com sucesso
    if (subscriptionData && subscriptionData.id) {
      const subscriptionId = subscriptionData.id;

      // Checando se a URL está correta para obter o boleto
      const boletoResponse = await apiClient.get(`/subscriptions/${subscriptionId}/boleto`);
      console.log("boletoResponse: ", boletoResponse)

      const boletoData = boletoResponse.data;

      //return console.log("boletoData: ", boletoData)

      // Log da resposta do boleto
      console.log('Boleto data:', boletoData);

      if (!boletoData || !boletoData.url) {
        return res.status(500).json({ error: 'Erro ao obter o boleto bancário.' });
      }

      return res.status(200).json({
        subscriptionId: subscriptionData.id,
        status: subscriptionData.status,
        boletoUrl: boletoData.url,
        boletoBarcode: boletoData.barcode
      });
    } else {
      return res.status(500).json({ error: 'Erro ao criar a assinatura' });
    }
  } catch (error) {
    // Log de erro detalhado
    console.error('Erro ao criar a assinatura:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      return res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('Nenhuma resposta recebida:', error.request);
      return res.status(500).json({ error: 'Nenhuma resposta do servidor' });
    } else {
      console.error('Erro ao configurar a requisição:', error.message);
      return res.status(500).json({ error: 'Erro ao processar a assinatura' });
    }
  }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();

// const apiClient = require('../api/api')

// router.post('/create-subscription-boleto', async (req, res) => {
//   const subscriptionData = req.body;
//   console.log("CPF-CNPJ: ", subscriptionData.cpfCnpj)

//   try {
//     const response = await apiClient.post('/subscriptions', subscriptionData);

//     console.log('Subscription data:', response.data);

//     if (response.data) {
//       return res.json({ subscriptionId: response.data.id, status: response.data.status });
//     } else {
//       res.status(500).json({ error: 'Erro ao criar a assinatura' });
//     }
//   } catch (error) {
//     console.error('Error creating subscription:', error.message);

//     if (error.response) {
//       console.error('Response data:', error.response.data);
//       console.error('Response status:', error.response.status);
//       console.error('Response headers:', error.response.headers);
//       return res.status(error.response.status).json({ error: error.response.data });
//     } else if (error.request) {
//       console.error('No response received:', error.request);
//       return res.status(500).json({ error: 'No response from the server' });
//     } else {
//       console.error('Error setting up request:', error.message);
//       return res.status(500).json({ error: 'Erro ao processar a assinatura' });
//     }
//   }
// });

// module.exports = router;