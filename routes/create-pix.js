const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');

const apiClient = require('../api/api');

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

router.post("/create-pix", async (req, res) => {
  const createPixData = req.body;

  try {
    console.log('Subscription data:', JSON.stringify(createPixData, null, 2));
    console.log('Using Asaas API URL:', ASAAS_API_URL);
    console.log('Using Asaas API Key:', ASAAS_API_KEY);

    const response = await apiClient.post(`/pix/addressKeys`, createPixData);

    console.log('Subscription created successfully:', response.data);

    const pixKey = response.data.pixKey;

    // Gerar QR Code
    qrcode.toDataURL(pixKey, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return res.status(500).json({ error: 'Erro ao gerar o QR Code' });
      }

      // Disponibilizar o QR Code na resposta
      res.status(200).json({ ...response.data, qrCode: url });
    });

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

  return;
});

module.exports = router;


// const express = require('express');
// const router = express.Router();

// const apiClient = require('../api/api')

// const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
// const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

// router.post("/create-pix", async (req, res) => {
//   const createPixData = req.body;

//   try {
//     console.log('Subscription data:', JSON.stringify(createPixData, null, 2));
//     console.log('Using Asaas API URL:', ASAAS_API_URL);
//     console.log('Using Asaas API Key:', ASAAS_API_KEY);

//     const response = await apiClient.post(`/pix/addressKeys`, createPixData);

//     console.log('Subscription created successfully:', response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error creating subscription:', error);

//     if (error.response) {
//       console.error('Response data:', error.response.data);
//       console.error('Response status:', error.response.status);
//       console.error('Response headers:', error.response.headers);
//       res.status(error.response.status).json({ error: error.response.data });
//     } else if (error.request) {
//       console.error('Request data:', error.request);
//       res.status(500).json({ error: 'No response received from Asaas API' });
//     } else {
//       console.error('Error message:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   return
// })

// module.exports = router;