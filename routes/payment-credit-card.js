const express = require('express');
const axios = require('axios');
const router = express.Router();

const ASAAS_API_URL = 'https://sandbox.asaas.com/api/v3';
const ASAAS_API_KEY = 'YOUR_ASAAS_API_KEY'; // Substitua por sua chave da API do Asaas
const url = 'https://sandbox.asaas.com/api/v3/subscriptions'

router.post('/create-subscription', async (req, res) => {
  const subscriptionData = {
    customer: req.body.customer,
    billingType: 'CREDIT_CARD',
    nextDueDate: req.body.nextDueDate,
    value: req.body.value,
    cycle: req.body.cycle, // "MONTHLY", "BIMONTHLY", "QUARTERLY", "SEMIANNUALLY", "YEARLY"
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
  };
  try {
    console.log('Subscription data:', subscriptionData); // Log dos dados da assinatura
    const response = await axios.post(url, subscriptionData, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ASAAS_API_KEY}`, // Cabeçalho Authorization
        'User-Agent': 'axios/1.7.2'
      }
    })
      .then(res => {
        console.log('Subscription created successfully:', res.data);
        const resultSuccess = res.data
        return res.status(200).json(resultSuccess)
      })
      .catch(error => {
        console.error('Error creating:', error);
        const resultError = error
        return res.json(resultError)
      })

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating subscription:', error);

    // Extra logging to understand the error
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

// try {
//   console.log('Subscription data:', subscriptionData); // Log dos dados da assinatura
//   const response = await axios.post('https://sandbox.asaas.com/api/v3/subscriptions', subscriptionData, {
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.ASAAS_API_KEY}`, // Cabeçalho Authorization
//       'User-Agent': 'axios/1.7.2'
//     }
//   })

//   res.status(200).json(response.data);
// } catch (error) {
//   console.error('Error creating subscription:', error);

//   // Extra logging to understand the error
//   if (error.response) {
//     console.error('Response data:', error.response.data);
//     console.error('Response status:', error.response.status);
//     console.error('Response headers:', error.response.headers);
//     res.status(error.response.status).json({ error: error.response.data });
//   } else if (error.request) {
//     console.error('Request data:', error.request);
//     res.status(500).json({ error: 'No response received from Asaas API' });
//   } else {
//     console.error('Error message:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// }

//============

// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// const ASAAS_API_URL = process.env.ASAAS_API_URL;
// const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

// router.get("/test", (req, res) => {
//   return res.json({ ok: true })
// })

// router.post('/create-subscription', async (req, res) => {
//   const subscriptionData = {
//     customer: req.body.customer,
//     billingType: 'CREDIT_CARD',
//     nextDueDate: req.body.nextDueDate,
//     value: req.body.value,
//     cycle: req.body.cycle, // "MONTHLY", "BIMONTHLY", "QUARTERLY", "SEMIANNUALLY", "YEARLY"
//     description: req.body.description,
//     creditCard: {
//       holderName: req.body.holderName,
//       number: req.body.number,
//       expiryMonth: req.body.expiryMonth,
//       expiryYear: req.body.expiryYear,
//       ccv: req.body.ccv,
//     },
//     creditCardHolderInfo: {
//       name: req.body.holderName,
//       email: req.body.email,
//       cpfCnpj: req.body.cpfCnpj,
//       postalCode: req.body.postalCode,
//       addressNumber: req.body.addressNumber,
//       addressComplement: req.body.addressComplement || '',
//       phone: req.body.phone,
//       mobilePhone: req.body.mobilePhone,
//     },
//     externalReference: req.body.externalReference,
//   };

//   try {
//     const response = await axios.post(`${ASAAS_API_URL}/subscriptions`, subscriptionData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'access_token': ASAAS_API_KEY,
//       },
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error creating subscription:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
