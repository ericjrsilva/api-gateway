'use strict'

const Joi = require('joi');
const config = require('../config/config');
const request = require('../util/request');

const clientModel = require('../models/client.model');
const transactionModel = require('../models/transaction.model');


exports.create_client = async(client) => {
  const {error} = Joi.validate(client, clientModel);
  
  if (error) {
    throw Error(error.message);
  }

  return await request.request_with_retry({
    method: 'POST',
    uri: `${config.urls.gateway1}/clients`,
    body: client,
    json: true
  });  
  
};

exports.get_client = async(cid) => {

  return await request.request_only({
      method: 'GET',
      uri: `${config.urls.gateway1}/clients/${cid}`,
      json: true
    })    

};

exports.create_transaction = async(transaction, cid) => {

  const {error} = Joi.validate(transaction, transactionModel);

  if (error) {
    throw Error(error.message);
  }  
  return await request.request_with_retry({
    method: 'POST',
    uri: `${config.urls.gateway1}/clients/${cid}/transactions`,
    body: transaction,
    json: true
  })
};

exports.get_transactions = async(cid) => {

  return await request.request_only({
    method: 'GET',
    uri: `${config.urls.gateway1}/clients/${cid}/transactions`,
    json: true
  })
  
};