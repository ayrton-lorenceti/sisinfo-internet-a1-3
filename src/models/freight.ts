const Sequelize = require('sequelize');

module.exports = class Freight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            orderId: {
                type: Sequelize.INTEGER,
                validate: {
                    isNumeric: true,
                    isInt: true,
                    notNull: true
                }
            },
            originUF: {
                type: Sequelize.STRING,
                validate: {
                    isAlpha: true,
                    isUppercase: true,
                    notNull: true
                }
            },
            destinationUF: {
                type: Sequelize.STRING,
                validate: {
                    isAlpha: true,
                    isUppercase: true,
                    notNull: true
                }
            }
        }, {
            tableName: "fretes",
            sequelize
        });
    }
}