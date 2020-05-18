const express = require("express");
const router = express.Router();
const database = require("../config/database");
const Freight = require("../models/freight");
const FreightCalculation = require("../models/freight-calculation");

router.post("/inserir", async (req, res, next) => {
    const sequelize = database();

    try {
        await sequelize.authenticate();
    
        const freight = Freight.init(sequelize);
    
        // await freight.sync({ force: true });

        const result = await freight.create(req.body);

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
            message: "Erro na gravação do pedido do frete"
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

    console.log("\n\n", req.query, "\n\n");

    try {
        await sequelize.authenticate();

        const freightCalculation = FreightCalculation(sequelize);

        const result = await freightCalculation.findOne({
            where: {
                originUF: originUF,
                destinationUF: destinationUF
            }
        });

        res.status(200).json(result.dataValues);
    } 
    catch (error) {
        console.log("\n Error on calculating freight: ", error, "\n");

        res.status(500).json({});
    }
    finally {
        await sequelize.close();
    }
});

router.get("/listar-fretes-pendentes", (req, res, next) => {

});

router.patch("/carregar-pedido", (req, res, next) => {

});

router.patch("/entrega-finalizada", (req, res, next) => {

});

router.get("/rastrear-pedido", (req, res, next) => {

});

module.exports = router;