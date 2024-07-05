const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://www.asaas.com/api/v3',
  headers: {
    //'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'payment',
    'access_token': process.env.ASAAS_API_KEY,
    //'Authorization': `Bearer ${process.env.ASAAS_API_KEY}`,
  }
});

module.exports = apiClient