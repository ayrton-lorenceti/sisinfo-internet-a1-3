const Sequelize = require('sequelize');

module.exports = class Freight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            orderId: {
                type: Sequelize.INTEGER,
                notNull: true,
                validate: {
                    isNumeric: true,
                    isInt: true,
                }
            },
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
            }
        }, {
            tableName: "fretes",
            sequelize
        });
    }
}