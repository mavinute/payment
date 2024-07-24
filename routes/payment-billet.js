const express = require('express');
const router = express.Router();
const apiClient = require('../api/api');

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

  // Validação dos dados de entrada
  if (!customer || !billingType || !dueDate || !value || !description || !externalReference || !cpfCnpj || !cycle) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criação da assinatura
    const subscriptionResponse = await apiClient.post('/v3/subscriptions', {
      customer,
      billingType: 'BOLETO', // Confirme que este é o valor correto
      dueDate,
      value,
      description,
      externalReference,
      cpfCnpj,
      cycle
    });

    const subscriptionData = subscriptionResponse.data;

    console.log('Subscription data:', subscriptionData);

    // Verificar se a assinatura foi criada com sucesso
    if (subscriptionData && subscriptionData.id) {
      // Obter detalhes do boleto
      const subscriptionId = subscriptionData.id;

      // Checando se a URL está correta para obter o boleto
      const boletoResponse = await apiClient.get(`/v3/subscriptions/${subscriptionId}/boleto`);
      const boletoData = boletoResponse.data;

      // Verificar se o boleto está presente na resposta
      if (!boletoData || !boletoData.url) {
        return res.status(500).json({ error: 'Erro ao obter o boleto bancário.' });
      }

      // Retornar os dados necessários
      return res.status(200).json({
        subscriptionId: subscriptionData.id,
        status: subscriptionData.status,
        boletoUrl: boletoData.url,
        boletoBarcode: boletoData.barcode
      });
    } else {
      res.status(500).json({ error: 'Erro ao criar a assinatura' });
    }
  } catch (error) {
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