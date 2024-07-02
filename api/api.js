const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://www.asaas.com/api/v3',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.ASAAS_API_KEY}`,
    'User-Agent': 'axios/1.7.2'
  }
});

module.exports = apiClient