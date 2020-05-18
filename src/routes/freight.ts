const express = require("express");
const router = express.Router();
const database = require("../config/database");
const Freight = require("../models/freight");

router.post("/", async (req, res, next) => {
    const sequelize = database();

    try {
        await sequelize.authenticate();
    
        const freight = Freight.init(sequelize);
    
        // await freight.sync({ force: true });

        const result = await freight.create(req.body);

        res.status(201).json(result.dataValues);
    } 
    catch (error) {
        console.log("\n Error on inserting new freight: ", error, "\n");
        
        if(error.errors) res.status(500).json(error);

        res.status(500).json(error.message);
    }
    finally {
        await sequelize.close();
    }
})

// router.post("/inserir-pedido-frete", (req, res, next) => {

// });

router.get("/calcular", (req, res, next) => {

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