"use strict";
const mongoose = require("mongoose");
const URI = "mongodb://bramirez:bramirez%4006~@170.187.155.55:27017/?retryWrites=true&w=majority";
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