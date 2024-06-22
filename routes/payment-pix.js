// Importação das dependências necessárias
const express = require('express');
const axios = require('axios');

// Configurações básicas
const router = express.Router();

// Defina sua chave de API da Asaas
const ASAAS_API_KEY = 'sua_chave_api_do_asaas';

const url = 'https://api.asaas.com/pagamentos/pix';

// Endpoint para criar um pagamento PIX
router.post('/criar-pagamento-pix', async (req, res) => {
  // Dados do pagamento (exemplo: recebendo via body da requisição)
  const { valor, descricao, cliente_id } = req.body;

  // Dados do pagamento PIX
  const dadosPagamento = {
    valor,
    descricao,
    cliente_id,
    tipo_pagamento: 'PIX'
  };

  try {
    const response = await router.post(url, dadosPagamento, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ASAAS_API_KEY}`, // Cabeçalho Authorization
        'User-Agent': 'axios/1.7.2'
      }
    })
      .then(response => {
        // Verifica se a requisição foi bem sucedida
        if (response.status === 200) {
          res.status(200).json(response.data);
        } else {
          throw new Error(`Erro ao criar pagamento PIX: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.log("Erro em: ", error)
      })
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error.message);
    res.status(500).json({ error: 'Erro ao processar pagamento PIX' });
  }
});

module.exports = router;