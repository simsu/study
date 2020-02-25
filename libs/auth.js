const express = require('express');
const Joi = require('@hapi/joi');

module.exports = {
    loginRequired(req, res, next) {
        if(req.session.user) {
            req.user = req.session.user;
            return next();
        }
        req.flash('error', '로그인 후 이용하실 수 있습니다.');
        return res.redirect('/');
    },
    register(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(20).required(),
            password: Joi.string().min(8).max(255).required(),
            email: Joi.string().email().required(),
            name: Joi.string().required()
        });
        const result = schema.validate(req.body, { stripUnknown: true });
        if (result.error) {
            console.error(result.error);
            req.flash('error', result.error.details[0].message);
            return res.redirect('/');
        }
        req.data = result.value;
        return next();
    },
    login(req, res, next) {
        const shema = Joi.object({
            username: Joi.string().alphanum().min(3).max(20).required(),
            password: Joi.string().min(8).max(255).required()
        });
        const result = schema.validate(req.body, { stripUpknown: true });
        if(result.error) {
            console.error(result.error);
            req.flash ('error', result.error.details[0].message);
            return res.redirect('/');
        }
        req.data = result.value;
        return next();
    }
}