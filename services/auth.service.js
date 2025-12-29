const User = require("../../../models/user.model.js")
const Role = require("../../../models/role.model.js")

const { defaultLoginOTPEmail, genarateOTP, sendEmail,  } = require("otp-core-email-core")

class AuthService {
    static async CreateAuth(email, req) {
        const project = process.env.PROJECT_NAME || "MyProject";
        const checkuser = await User.findOne({ email: email })

        const otp = genarateOTP()

        await defaultLoginOTPEmail({
            email,
            otp,
            project: project
        });

    }
}

module.exports = AuthService