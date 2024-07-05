const express = require('express');
const router = express.Router();

const apiClient = require('../api/api')

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

if (!ASAAS_API_KEY) {
  console.error("ASAAS_API_KEY is not defined. Please set it in the environment variables.");
  process.exit(1); // Terminate the process if API key is not defined
}

router.post('/create-subscription', async (req, res) => {
  const subscriptionData = {
    customer: req.body.customer,
    billingType: 'CREDIT_CARD',
    nextDueDate: req.body.nextDueDate,
    value: req.body.value,
    dueDate: req.body.dueDate,
    cycle: req.body.cycle,
    description: req.body.description,
    creditCard: {
      holderName: req.body.holderName,
      number: req.body.number,
      expiryMonth: req.body.expiryMonth,
      expiryYear: req.body.expiryYear,
      ccv: req.body.ccv,
    },
    creditCardHolderInfo: {
      name: req.body.holderName,
      email: req.body.email,
      cpfCnpj: req.body.cpfCnpj,
      postalCode: req.body.postalCode,
      addressNumber: req.body.addressNumber,
      addressComplement: req.body.addressComplement || '',
      phone: req.body.phone,
      mobilePhone: req.body.mobilePhone,
    },
    externalReference: req.body.externalReference,
  }

  try {
    console.log('Subscription data:', JSON.stringify(subscriptionData, null, 2));
    console.log('Using Asaas API URL:', ASAAS_API_URL);
    console.log('Using Asaas API Key:', ASAAS_API_KEY);

    const response = await apiClient.post(`/payments`, subscriptionData);

    console.log('Subscription created successfully:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating subscription:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('Request data:', error.request);
      res.status(500).json({ error: 'No response received from Asaas API' });
    } else {
      console.error('Error message:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;

//============|=================//

// const express = require('express');
// const router = express.Router();

// const apiClient = require('../api/api');

// const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
// const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

// if (!ASAAS_API_KEY) {
//   console.error("ASAAS_API_KEY não está definida. Por favor, configure-a nas variáveis de ambiente.");
//   process.exit(1); // Encerra o processo se a chave da API não estiver definida
// }

// router.post('/create-subscription', async (req, res) => {
//   try {
//     const subscriptionData = {
//       customer: req.body.customer,
//       billingType: 'CREDIT_CARD',
//       nextDueDate: req.body.nextDueDate,
//       value: req.body.value,
//       cycle: req.body.cycle,
//       description: req.body.description,
//       creditCard: {
//         holderName: req.body.holderName,
//         number: req.body.number,
//         expiryMonth: req.body.expiryMonth,
//         expiryYear: req.body.expiryYear,
//         ccv: req.body.ccv,
//       },
//       creditCardHolderInfo: {
//         name: req.body.holderName,
//         email: req.body.email,
//         cpfCnpj: req.body.cpfCnpj,
//         postalCode: req.body.postalCode,
//         addressNumber: req.body.addressNumber,
//         addressComplement: req.body.addressComplement || '',
//         phone: req.body.phone,
//         mobilePhone: req.body.mobilePhone,
//       },
//       externalReference: req.body.externalReference,
//     };

//     console.log('Dados da assinatura:', JSON.stringify(subscriptionData, null, 2));
//     console.log('Usando a URL da API Asaas:', ASAAS_API_URL);
//     console.log('Usando a chave da API Asaas:', ASAAS_API_KEY);

//     const response = await apiClient.post(`/payments`, subscriptionData);

//     console.log('Assinatura criada com sucesso:', response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Erro ao criar a assinatura:', error);

//     if (error.response) {
//       console.error('Dados da resposta:', error.response.data);
//       console.error('Status da resposta:', error.response.status);
//       console.error('Headers da resposta:', error.response.headers);
//       res.status(error.response.status).json({ error: error.response.data });
//     } else if (error.request) {
//       console.error('Dados da requisição:', error.request);
//       res.status(500).json({ error: 'Nenhuma resposta recebida da API Asaas' });
//     } else {
//       console.error('Mensagem de erro:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   }
// });

// module.exports = router;


// {
//   "customer": "teste_20240705",
//   "billingType": "CREDIT_CARD",
//   "nextDueDate": "2024-08-30",
//   "value": 1,
//   "cycle": "MONTHLY",
//   "description": "Assinatura mensal",
//   "creditCard": {
//     "holderName": "Matheus Vinute",
//     "number": "4350870241195308",
//     "expiryMonth": "03",
//     "expiryYear": "2029",
//     "ccv": "069"
//   },
//   "creditCardHolderInfo": {
//     "name": "Matheus Vinute",
//     "email": "matheus_vinute@hotmail.com",
//     "cpfCnpj": "06557615351",
//     "postalCode": "64022350",
//     "addressNumber": "4223",
//     "addressComplement": "",
//     "phone": "86981353413",
//     "mobilePhone": "86981353413"
//   },
//   "externalReference": "ref_0001"
// }

// customer: req.body.customer,
// billingType: 'CREDIT_CARD',
// nextDueDate: req.body.nextDueDate,
// value: req.body.value,
// cycle: req.body.cycle,
// description: req.body.description,
// creditCard: {
//   holderName: req.body.holderName,
//   number: req.body.number,
//   expiryMonth: req.body.expiryMonth,
//   expiryYear: req.body.expiryYear,
//   ccv: req.body.ccv,
// },
// creditCardHolderInfo: {
//   name: req.body.holderName,
//   email: req.body.email,
//   cpfCnpj: req.body.cpfCnpj,
//   postalCode: req.body.postalCode,
//   addressNumber: req.body.addressNumber,
//   addressComplement: req.body.addressComplement || '',
//   phone: req.body.phone,
//   mobilePhone: req.body.mobilePhone,
// },
// externalReference: req.body.externalReference,