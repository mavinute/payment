const express = require('express');
const axios = require('axios');

const router = express();

// Rota para criar pagamento via boleto bancário
router.post('/create-payment-boleto', (req, res) => {
  const ASAAS_API_KEY = 'sua_chave_api_do_asaas';
  const url = 'https://sandbox.asaas.com/api/v3/payments';

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY
    }
  };

  const paymentData = {
    customer: 'cus_000005401844', // ID do cliente registrado no Asaas
    billingType: 'BOLETO', // Tipo de pagamento (boleto bancário)
    dueDate: '2023-08-30', // Data de vencimento do boleto
    value: 100, // Valor do pagamento
    description: 'Pagamento via boleto bancário', // Descrição do pagamento
    externalReference: 'ref_0001' // Referência externa para identificação
  };

  axios.post(url, paymentData, options)
    .then(response => {
      console.log('Payment data:', response.data);

      // Verifica se há um link para o boleto na resposta
      if (response.data.boletoUrl) {
        // Aqui você pode enviar a URL do boleto para o cliente
        res.json({ boletoUrl: response.data.boletoUrl });
      } else {
        res.status(500).json({ error: 'Erro ao obter o link do boleto' });
      }
    })
    .catch(error => {
      console.error('Error creating payment:', error.message);
      res.status(500).json({ error: 'Erro ao processar o pagamento' });
    });
});

module.exports = router;