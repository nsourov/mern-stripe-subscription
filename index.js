const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes");

const app = express();

const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
