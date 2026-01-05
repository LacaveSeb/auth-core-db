const User = require("../../../models/user.model.js")
const Role = require("../../../models/role.model.js")
const UserOTP = require("../../../models/userotp.model.js")
const bcrypt = require("bcrypt")

const { defaultLoginOTPEmail, genarateOTP, sendEmail, } = require("@jehankandy/otp-core-email-core")

const logUserAction = require("../utils/logUserAction")
// const tokenCreator = require("../utils/generateToken")

const {
    CreateAccountResDTO,
    CreateLoginResDTO
} = require("../dto/auth.dto")

class AuthService {
    static async CreateAuth(email, req) {
        const project = process.env.PROJECT_NAME || "MyProject";

        const user = await User.findOne({ email });

        const existingOTP = await UserOTP.findOne({ email });
        if (existingOTP) {
            throw new Error("OTP already sent. Please wait 10 minutes.");
        }

        const otp = genarateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);

        await defaultLoginOTPEmail({
            email,
            otp,
            project: project,
        });

        await UserOTP.create({
            email,
            otp: hashedOTP
        })

        if (!user) {
            const role = await Role.findOne({ name: "user" });
            if (!role) throw new Error("Default role not found");

            const newUser = await User.create({
                email,
                role: role._id,
                isActive: true,
                isEmailVerified: false
            });

            await logUserAction(
                req,
                "REGISTER_OTP_SENT",
                `${email} registration OTP sent`,
                {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date()
                },
                newUser._id
            );

            return CreateAccountResDTO()
        }

        if (req) {
            await logUserAction(
                req,
                "LOGIN_OTP_SENT",
                `${email} login OTP sent`,
                {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date()
                },
                user._id
            );
        }

        return CreateLoginResDTO();

    }

    static async verifyPassword (email, otp, req){

    }




}

module.exports = AuthService