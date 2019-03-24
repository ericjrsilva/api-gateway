const Joi = require('joi');

const schema = Joi.object().keys({
      "hash": Joi.string().alphanum().required(), 
      "expires": Joi.string().alphanum().required()
  });
  
  module.exports = schema