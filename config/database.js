const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("backendTest", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
    port:5436
});

module.exports = sequelize;
