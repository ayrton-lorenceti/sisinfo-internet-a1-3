module.exports = () => {
    const Sequelize = require("sequelize");

    return new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    });
}