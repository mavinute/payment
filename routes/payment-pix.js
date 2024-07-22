// Importação das dependências necessárias
const express = require('express');
require('dotenv').config(); // Carregar variáveis de ambiente a partir do arquivo .env

// Configurações básicas
const router = express.Router();
const apiClient = require('../api/api')

// Endpoint para criar um pagamento PIX
router.post('/create-payment-pix', async (req, res) => {
  const paymentData = req.body;

  try {
    const response = await apiClient.post('/payments', paymentData);

    console.log('Payment data:', response.data);

    const qrCodeResponse = await apiClient.get(`/payments/${response.data.id}/pixQrCode`)

    console.log("qrCodeResponse: ", qrCodeResponse.data)

    //return qrCodeResponse.data
    return res.status(200).json(qrCodeResponse.data)
  } catch (error) {
    console.error('Erro ao criar cobrança:');
    //console.error(error.response ? error.response.data : error.message);
    return res.status(400).json({ error: error.response.data });
  }
});

module.exports = router;