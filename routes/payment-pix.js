// Importação das dependências necessárias
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Carregar variáveis de ambiente a partir do arquivo .env

// Configurações básicas
const router = express.Router();

// Defina sua chave de API da Asaas
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

const url = 'https://www.asaas.com/api/v3/payments';

// Endpoint para criar um pagamento PIX
router.post('/criar-pagamento-pix', async (req, res) => {
  // Dados do pagamento (exemplo: recebendo via body da requisição)
  const { valor, descricao, cliente_id, ciclo, data_vencimento } = req.body;

  // Dados do pagamento PIX
  const dadosPagamento = {
    customer: cliente_id,
    billingType: 'PIX',
    value: valor,
    nextDueDate: data_vencimento,
    cycle: ciclo, // 'MONTHLY', 'QUARTERLY', 'SEMIANNUALLY', 'YEARLY'
    description: descricao,
    dueDateLimitDays: 10 // Número de dias limite para pagamento após o vencimento
  };

  try {
    const response = await axios.post(url, dadosPagamento, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ASAAS_API_KEY}`, // Cabeçalho Authorization
      }
    });

    if (paymentResponse.status === 200 || paymentResponse.status === 201) {
      const paymentData = paymentResponse.data;

      // Retorna o QR Code na resposta
      return res.status(200).json({
        paymentId: paymentData.id,
        pixQrCode: paymentData.pixQrCode,
        pixQrCodeUrl: paymentData.pixQrCodeUrl
      });
    } else {
      throw new Error(`Erro ao criar pagamento PIX: ${paymentResponse.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error.message);
    return res.status(500).json({ error: 'Erro ao processar pagamento PIX' });
  }
});

module.exports = router;