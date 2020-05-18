const Sequelize = require('sequelize');

module.exports = class Freight extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            orderId: {
                type: Sequelize.INTEGER,
                notNull: true,
                unique: true,
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
            },
            deliveryStatus: {
                type: Sequelize.ENUM,
                values: ["pendente", "em trânsito", "entregue"],
                allowNull: false,
                isAlpha: true,
                validate: {
                    notNull: true,
                    isLowercase: true,
                    isIn: [["pendente", "em trânsito", "entregue"]]
                }
            }
        }, {
            tableName: "fretes",
            sequelize
        });
    }
}