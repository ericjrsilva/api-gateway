const Joi = require('joi');

const schema = Joi.object().keys({
    "amount": Joi.number().min(3).required(), 
    "creditcard": Joi.object({
      "number": Joi.string().required(), 
      "issuer": Joi.string().min(4).required(), 
      "expire_month": Joi.string().min(2).max(2).required(), 
      "expire_year": Joi.string().min(4).max(4).required(), 
      "cvv": Joi.string().min(3).max(3).required() 
    })
  });
  
  module.exports = schema