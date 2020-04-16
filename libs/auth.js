const express = require('express');
const Joi = require('@hapi/joi');

module.exports = {
    registerValidate(req, res, next) {
    const schema = Joi.object({
        userId: Joi.string().alphanum().min(1).max(30).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
        name: Joi.string().alphanum().min(1).max(30).required(),
    });
    const result = schema.validate(req.body, { stripUnknown: true })
    if(result.error){ 
        console.log(result.error)
        return  res.send('<script>alert("회원가입 실패");location.href="/register";</script>');
    }
    req.data = result.value;
    return next();  
    }
}