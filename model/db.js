"use strict";
require('dotenv').config();
const mongoose = require("mongoose");
const URI = process.env.MONGOURI;
let dbStatus;

// connectDB()
//     .then(() => {
//         // console.log("Database connected successfully!");
//         dbStatus = {};
//     })
//     .catch(err => {
//         console.log(err);
//         dbStatus = { message: err };
//     });

async function connectDB() {
    const status = mongoose.connection.readyState;
    // console.log(status);
    // if (![1, 2].includes(status)) await mongoose.connect(URI, { dbName: "full-stack" });
    if (status !== 1) await mongoose.connect(URI, { dbName: "full-stack" });
}

const getDBStatus = () => mongoose.STATES[mongoose.connection.readyState];

module.exports = { getDBStatus, connectDB };