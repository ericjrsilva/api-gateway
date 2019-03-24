const express = require('express');
const router = express.Router();

const api_gateway = require('../controllers/api-gateway.controller');

router.post('/clients', api_gateway.create_client);
router.get('/clients/:CID', api_gateway.get_client);
router.post('/clients/:CID/transactions', api_gateway.create_transaction);
router.get('/clients/:CID/transactions', api_gateway.get_transactions);

module.exports = router;