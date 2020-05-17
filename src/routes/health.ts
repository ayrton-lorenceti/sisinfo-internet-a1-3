module.exports = () => { 
    const app = require("express")();
    
    return app.get("/health", (req, res, next) => {
        res.status(200).json("200 ok.");
    });
}