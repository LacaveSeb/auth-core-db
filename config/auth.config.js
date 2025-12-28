module.exports = {
    jwtSecret: process.env.AUTH_JWT_SECRET,
    otpExpireMin: 5,
    mongodbUri: process.env.MONGO_URI,
}
