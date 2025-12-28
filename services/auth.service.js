const User = require("../../../models/user.model.js")
const Role = require("../../../models/role.model.js")

const defaultLoginOTPEmail = require("../utils/defaultLoginOTPEmail.js")
const sendOTPEmail = require("../../../models/role.model.js")

const crypto = require("crypto")

let customLoginOTPEmail;
try {
    customLoginOTPEmail = require("../../../utils/emails/customLoginOTPEmail.js");
} catch (err) {
    customLoginOTPEmail = null;
}

class AuthService {

    static generateOTP(length = 8) {
        return crypto
            .randomBytes(length)
            .toString("base64")
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, length);
    }

    static async CreateAuth(email, req) {
        const checkuser = await User.findOne({ email: email })

        const otp = this.generateOTP()
        const project = process.env.PROJECT_NAME
        const sendOTPEmail = customLoginOTPEmail || defaultLoginOTPEmail;

        await sendOTPEmail({
            email,
            otp,
            project
        });

    }
}

module.exports = AuthService