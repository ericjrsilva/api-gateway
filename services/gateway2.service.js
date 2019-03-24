'use strict'

const Joi = require('joi');
const request = require('../util/request');
const config = require('../config/config');

const clientModel = require('../models/client.model');
const transactionModel = require('../models/transaction.model');
const creditcardModel = require('../models/creditcard.model');

exports.create_client = async(client) => {

  const {error} = Joi.validate(client, clientModel);

  if (error) {
    throw Error(error.message);
  }

  return await request.request_with_retry({
    method: 'POST',
    uri: `${config.urls.gateway2}/clients`,
    body: client,
    json: true
  });
  
};

exports.get_client = async(cid) => {

  return await request.request_only({
      method: 'GET',
      uri: `${config.urls.gateway2}/clients/${cid}`,
      json: true
    })    

};

exports.create_card = async(creditcard, cid) => {

  const result = await request.request_with_retry({
    method: 'POST',
    uri: `${config.urls.gateway2}/clients/${cid}/cards`,
    body: creditcard,
    json: true
  })

  const {error} = Joi.validate(result, creditcardModel);
  
  if (error) {
    throw Error(error.message);
  }
  
  return result;
};

exports.create_transaction = async(transaction, cid) => {

  const {error} = Joi.validate(transaction, transactionModel);

  if (error) {
    throw Error(error.message);
  }
  
  const {creditcard} = transaction;
  
  const { hash } = await this.create_card(creditcard, cid);

  transaction = {...transaction, creditcard: hash };

  return await request.request_with_retry({
    method: 'POST',
    uri: `${config.urls.gateway2}/clients/${cid}/transactions`,
    body: transaction,
    json: true
  })
  
};

exports.get_transactions = async(cid) => {

  return await request.request_only({
    method: 'GET',
    uri: `${config.urls.gateway2}/clients/${cid}/transactions`,
    json: true
  })
  
};

exports.get_cards = async(cid) => {

  return await request.request_with_retry({
    method: 'GET',
    uri: `${config.urls.gateway2}/clients/${cid}/cards`,
    json: true
  })

};

exports.create_card = async(card) => {

  return await request.request_with_retry({
    method: 'POST',
    uri: `${config.urls.gateway2}/clients/${cid}/cards`,
    json: true
  })

};