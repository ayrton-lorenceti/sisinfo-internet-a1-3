require('dotenv').config();
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

// const user = require("./routes/user");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.use("/user", user);

app.get('/', (req, res) => {
  const sequelize = require("./config/database")();

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  res.status(200).json("200 ok.");
});

app.listen(port, () => console.log(`Server is listening on port ${process.env.PORT}.`));

app.on("error", err => console.error(err));