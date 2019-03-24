const Joi = require('joi');

const schema = Joi.object().keys({
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    fullname: Joi.string().required()
});


module.exports = schema;