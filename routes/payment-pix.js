// Importação das dependências necessárias
const express = require('express');
require('dotenv').config(); // Carregar variáveis de ambiente a partir do arquivo .env
const axios = require('axios'); // Supondo que você está usando axios para chamadas API
const router = express.Router();
const apiClient = require('../api/api')

// Endpoint para criar um pagamento PIX
router.post('/create-payment-pix', async (req, res) => {
  const { customer, billingType, dueDate, value, description, externalReference, cpfCnpj } = req.body;

  // Validação dos dados de entrada
  if (!customer || !billingType || !dueDate || !value || !description || !externalReference || !cpfCnpj) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criação do pagamento PIX
    const paymentResponse = await apiClient.post('/payments', {
      customer,
      billingType,
      dueDate,
      value,
      description,
      externalReference,
      cpfCnpj
    });

    const paymentId = paymentResponse.data.id;

    // Obtenção do QR Code
    const qrCodeResponse = await apiClient.get(`/payments/${paymentId}/pixQrCode`);

    // Responder com os dados necessários
    return res.status(200).json({
      id: paymentId,
      qrCode: qrCodeResponse.data.qrCode
    });
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error);
    return res.status(500).json({ error: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
});

module.exports = router;


// // Importação das dependências necessárias
// const express = require('express');
// require('dotenv').config(); // Carregar variáveis de ambiente a partir do arquivo .env

// // Configurações básicas
// const router = express.Router();
// const apiClient = require('../api/api')

// // Endpoint para criar um pagamento PIX
// router.post('/create-payment-pix', async (req, res) => {
//   const paymentData = req.body;

//   try {
//     const response = await apiClient.post('/payments', paymentData);

//     console.log('Payment data:', response.data);

//     const qrCodeResponse = await apiClient.get(`/payments/${response.data.id}/pixQrCode`)

//     console.log("qrCodeResponse: ", qrCodeResponse.data)

//     //return qrCodeResponse.data
//     return res.status(200).json(qrCodeResponse.data)
//   } catch (error) {
//     console.error('Erro ao criar cobrança:');
//     //console.error(error.response ? error.response.data : error.message);
//     return res.status(400).json({ error: error.response.data });
//   }
// });

// module.exports = router;