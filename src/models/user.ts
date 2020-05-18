module.exports = (sequelize) => {
  const Sequelize = require('sequelize');

  const User = sequelize.define("User", {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  }, { sequelize });

  return User;
}