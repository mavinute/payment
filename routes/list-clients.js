const express = require('express');
const router = express.Router();

const apiClient = require('../api/api')

const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

router.get("/list-clients", async (req, res) => {
  const customerData = {
    name: req.body.name,
    email: req.body.email,
    // phone: req.body.phone,
    // mobilePhone: req.body.mobilePhone,
    cpfCnpj: req.body.cpfCnpj,
    // postalCode: req.body.postalCode,
    // address: req.body.address,
    // addressNumber: req.body.addressNumber,
    // complement: req.body.complement,
    // province: req.body.province,
    // externalReference: req.body.externalReference,
    // notificationDisabled: false,
    // additionalEmails: req.body.email
  }
  const data = await apiClient.get("/customers")

  console.log("CUSTOMERS: ", data)

})

module.exports = router;