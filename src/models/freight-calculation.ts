module.exports = (sequelize) => {
  const Sequelize = require('sequelize');

  class Freight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            originUF: {
                type: Sequelize.STRING,
                notNull: true,
                validate: {
                    isAlpha: true,
                    isUppercase: true
                }
            },
            destinationUF: {
                type: Sequelize.STRING,
                notNull: true,
                validate: {
                    isAlpha: true,
                    isUppercase: true
                }
            },
            daysToDeliver: {
              type: Sequelize.INTEGER,
              notNull: true,
              validate: {
                isInt: true
              }
            }
        }, {
            tableName: "calculo_frete",
            sequelize
        });
    }
  };

  return Freight.init(sequelize);
}