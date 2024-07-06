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
    const response = await apiClient.post('/pix/qrCodes/static', paymentData);

    console.log('Payment data:', response.data);

    if (response.data) {
      return res.json({ paymentId: response.data.id, status: response.data.status, pixQrCode: response.data.pixQrCode });
    } else {
      res.status(500).json({ error: 'Erro ao criar o pagamento' });
    }
  } catch (error) {
    console.error('Error creating payment:', error.message);

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
      return res.status(500).json({ error: 'Erro ao processar o pagamento' });
    }
  }
});

module.exports = router;