import express from 'express';

const app = express();
const port = 3000

const bodyParser = require('body-parser');

// const user = require("./routes/user");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.use("/user", user);

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on port ${port}.`);
});