const Joi = require("joi")

// validate Create Auth
exports.CreateAuthSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
}).options({ allowUnknown: false });

// validate verify otp
exports.VerifyAuthSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required(),

    otp: Joi.string()
        .length(6)
        .pattern(/^\d+$/)
        .required()
        .messages({
            "string.length": "OTP must be 6 digits",
            "string.pattern.base": "OTP must contain only numbers",
        }),
}).options({ allowUnknown: false });

// ______________________________________

exports.CreateAuthDto = (email) => ({ email })

exports.validateAuthDTO = (email, otp) => ({ email, otp })

// ________________________________________
// responce dtos

exports.CreateAccountResDTO = (messages="Account Created Success") => ({ success: true, messages})

exports.CreateLoginResDTO = (messages="Email Sent to your Email") => ({ success: true, messages})

exports.VerifyAuthResDTO = (token, messages="Login Successfull") => ({ success: true, token, messages })

// error

exports.ErrorResDTO = (messages="Someting Went Wrong") => ({ success: false, messages })