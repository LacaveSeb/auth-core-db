const {
    ErrorResDTO,
    CreateAuthDto
} = require("../dto/auth.dto");
const AuthService = require("../services/auth.service");

const AuthController = {
    createAuth: async (req, res) => {
        try {
            const { email } = req.body

            const dto = CreateAuthDto(email)

            const result = await AuthService.CreateAuth(
                dto.email,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = AuthController;