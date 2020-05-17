require('dotenv').config();

const app = require("express")();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(require("./routes/health")());
app.use("/frete", require("./routes/freight"));

app.listen(port, () => console.log(`Server is listening on port ${process.env.PORT}.`));
app.on("error", err => console.error(err));