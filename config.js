module.exports = {
    PORT: process.env.PORT || 9999,
    MONGO_URL:"mongodb+srv://ujjwal:uzzawal12@cluster0.mko3b.mongodb.net/querybuilder?retryWrites=true&w=majority",
    JWT_SECRET: "VERY_SECRET_KEY",
    SALTING_ROUNDS: 10,
    JWT_EXPIRATION_TIME:360000,
}