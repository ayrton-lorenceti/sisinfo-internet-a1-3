const express = require("express");
const router = express.Router();
const database = require("../config/database");

const Freight = require("../models/freight");
const FreightCalculation = require("../models/freight-calculation");

const Utils = require("../utils/utils");

router.post("/inserir", async (req, res, next) => {
    const sequelize = database();

    try {
        await sequelize.authenticate();
    
        await Freight.init(sequelize);
    
        // await freight.sync({ force: true });

        const result = await Freight.create(req.body);

        res.status(201).json({ 
            status: "201",
            message: "Pedido gravado com sucesso.",
            id: result.dataValues.id
        });
    } 
    catch (error) {
        console.log("\n Error on inserting new freight: ", error, "\n");
    
        res.status(500).json({
            status: 500,
            errorId: 0,
            message: "Erro na gravação do pedido do frete."
        });
    }
    finally {
        await sequelize.close();
    }
});

// router.post("/criar-calculo-frete", async (req, res, next) => {
//     const sequelize = database();
//     const freightCalculation = FreightCalculation(sequelize);
//     const insertionsArray: object[] = [];
//     const objectsToInsert: object[] = req.body;

//     try {
//         await sequelize.authenticate();

//         await freightCalculation.sync({ force: true });

//         for (const freight of objectsToInsert) {
//             insertionsArray.push(await freightCalculation.create(freight));
//         }

//         res.status(201).json(insertionsArray);
//     } 
//     catch (error) {
//         console.log("\n Error on calculating freight: ", error, "\n");

//         if(error.errors) res.status(500).json(error);

//         res.status(500).json(error.message);
//     }
//     finally {
//         await sequelize.close();
//     }
// });

router.get("/calcular", async (req, res, next) => {
    const sequelize = database();
    const { "origin-uf": originUF, "destination-uf": destinationUF, "product-weight": productWeight } = req.query;

    try {
        await sequelize.authenticate();

        const freightCalculation = await FreightCalculation(sequelize);

        const result = await freightCalculation.findOne({
            where: {
                originUF: originUF,
                destinationUF: destinationUF
            }
        });

        const freight: object = {
            freightValue: Utils.calculateFreightPrice(productWeight),
            estimatedTimeToDeliver: result.dataValues.daysToDeliver
        }

        res.status(200).json(freight);
    } 
    catch (error) {
        console.log("\n Error on calculating freight: ", error, "\n");

        res.status(500).json({
            freightValue: 0,
            estimatedTimeToDeliver: 0
        });
    }
    finally {
        await sequelize.close();
    }
});

router.get("/listar", async (req, res, next) => {
    const sequelize = database();
    const { "origin-uf": originUF, "destination-uf": destinationUF } = req.query;

    try {
        await sequelize.authenticate();

        const freight = Freight.init(sequelize);

        const pendingFreights = await freight.findAll({
            where: {
                originUF: originUF,
                destinationUF: destinationUF,
                deliveryStatus: "pendente"
            }
        });

        res.status(200).json(pendingFreights);
    } 
    catch (error) {
        console.log("\n Error on listing pending freights: ", error, "\n");

        res.status(500).json({});
    }
    finally {
        await sequelize.close();
    }
});

router.patch("/carregar", async (req, res, next) => {
    const sequelize = database();
    const { "order-id": orderId } = req.query;

    try {
        await sequelize.authenticate();

        await Freight.init(sequelize);

        await Freight.update({
            deliveryStatus: "em trânsito"
        }, {
            where: {
                orderId: orderId
            }
        });

        res.status(200).json({ 
            status: "200",
            code: 1,
            message: "Pedido atualizado com sucesso.",
        });
    } 
    catch (error) {
        console.log("\n Error on updating freight delivery status: ", error, "\n");

        res.status(500).json({
            status: 500,
            errorId: 0,
            message: "Erro ao atualizar pedido do frete."
        });
    }
    finally {
        await sequelize.close();
    }
});

router.patch("/finalizar", async (req, res, next) => {
    const sequelize = database();
    const { "order-id": orderId } = req.query;

    try {
        await sequelize.authenticate();

        await Freight.init(sequelize);

        await Freight.update({
            deliveryStatus: "entregue"
        }, {
            where: {
                orderId: orderId
            }
        });

        res.status(200).json({ 
            status: "200",
            code: 1,
            message: "Pedido atualizado com sucesso.",
        });
    } 
    catch (error) {
        console.log("\n Error on updating freight delivery status: ", error, "\n");

        res.status(500).json({
            status: 500,
            errorId: 0,
            message: "Erro ao atualizar pedido do frete."
        });
    }
    finally {
        await sequelize.close();
    }
});

router.get("/rastrear", async (req, res, next) => {
    const sequelize = database();
    const { "order-id": orderId } = req.query;

    try {
        await sequelize.authenticate();

        await Freight.init(sequelize);

        const freight = await Freight.findOne({
            where: {
                orderId: orderId
            }
        });

        res.status(200).json({ deliveryStatus: freight.deliveryStatus });
    } 
    catch (error) {
        console.log("\n Error on retrieving freight delivery status: ", error, "\n");

        res.status(500).json({
            status: 500,
            errorId: 0,
            message: "Erro ao obter status do pedido do frete."
        });
    }
    finally {
        await sequelize.close();
    }
});

module.exports = router;