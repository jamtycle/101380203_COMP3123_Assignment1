"use strict";
const { connectDB } = require("./model/db");
const app = require("./app");
const port = 3000;

connectDB()
    .then(() => app.listen(port, () => console.log(`Listening port ${port}!`)))
    .catch((ex) => console.log(ex));