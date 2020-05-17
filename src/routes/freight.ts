const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
    res.status(200).json(req.body);
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