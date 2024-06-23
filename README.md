# Payment Asaas Loteamento Facil

### Objetivo

Esta API permite a criação e processamento de pagamentos utilizando o sistema Asaas. A API suporta três métodos de pagamento:

Cartão de Crédito
Boleto Bancário
PIX

### Tecnologias Utilizadas

Node.js
Express.js
Axios

### Configuração

Instalação de Dependências:
Certifique-se de instalar as dependências necessárias:

```
npm install express axios dotenv
```

### Configuração do Ambiente:

Crie um arquivo .env para armazenar suas variáveis de ambiente, incluindo a chave de API do Asaas:

```
ASAAS_API_KEY=your_asaas_api_key
PORT=3000
```

### Estrutura de Pastas

project-root/

│

├── node_modules/

│

├── routes/

│   ├── payment-credit-card.js

│   ├── payment-boleto.js

│   ├── payment-pix.js

│

├── .env

├── package.json

├── server.js

### Implementação

server.js
Arquivo principal do servidor onde todas as rotas são configuradas.

routes/payment-credit-card.js
Rota para processar pagamentos com cartão de crédito.

routes/payment-boleto.js
Rota para processar pagamentos via boleto bancário.

routes/payment-pix.js
Rota para processar pagamentos via PIX e retornar o QR Code.

### Uso

Após iniciar o servidor com node server.js, as rotas estarão disponíveis para criar pagamentos.

Exemplo de Requisições via Postman
- Pagamento com Cartão de Crédito

Endpoint: POST http://localhost:3000/api/criar-pagamento-cartao

Body (JSON):

{
  "valor": 100.5,
  "descricao": "Pagamento mensalidade",
  "cliente_id": "customer_123",
  "cartao": {
    "holderName": "Nome do Titular",
    "number": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "2024",
    "ccv": "123"
  }
}

- Pagamento via Boleto

Endpoint: POST http://localhost:3000/api/criar-pagamento-boleto

Body (JSON):

{
  "valor": 100.5,
  "descricao": "Pagamento mensalidade",
  "cliente_id": "customer_123",
  "vencimento": "2024-07-30"
}

- Pagamento via PIX

Endpoint: POST http://localhost:3000/api/criar-pagamento-pix

Body (JSON):

{
  "valor": 100.5,
  "descricao": "Pagamento mensalidade",
  "cliente_id": "customer_123",
  "vencimento": "2024-07-30"
}

### Considerações Finais

Essa API é uma implementação básica para processar pagamentos utilizando o sistema Asaas. Certifique-se de validar e tratar os dados de entrada adequadamente em um ambiente de produção, além de lidar com autenticação e autorização de forma segura.