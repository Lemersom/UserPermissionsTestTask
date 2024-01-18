const Joi = require('joi');

module.exports = {
    validateFirstName: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.firstName);

        if(error) {
            return res.status(400).json("First Name cannot be null");
        }

        req.body.firstName = value;
        return next();
    },

    validateEmail: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.email);

        if(error) {
            return res.status(400).json("Email cannot be null");
        }

        req.body.email = value;
        return next();
    }
}