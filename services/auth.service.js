const User = require("../../../models/user.model.js")
const Role = require("../../../models/role.model.js")

class AuthService {
    static async CreateAuth (email, req){
        const checkuser = await User.findOne({ email: email })

    }
}

module.exports = AuthService