"use strict";
require('dotenv').config();
const mongoose = require("mongoose");
const URI = process.env.MONGOURI;
let dbStatus;

main()
    .then(() => {
        console.log("Database connected successfully!");
        dbStatus = { status: "connected" };
    })
    .catch(err => {
        console.log(err);
        dbStatus = { status: "error", message: err };
    });

async function main() {
    await mongoose.connect(URI, { dbName: "full-stack" });
}

const getDBStatus = () => dbStatus;

module.exports = getDBStatus;