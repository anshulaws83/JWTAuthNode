//Validation

const Joi = require('@hapi/joi');

//Regsiter Validation

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;



