const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const router = require("./routes");

const app = express();
app.use(cors());

const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
