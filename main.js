"use strict";
const dbStatus = require("./model/db");
const express = require('express');

const userRoute = require("./routes/userRoutes");
const empRoute = require("./routes/employeeRoutes");

const app = express();
const port = 3000;

const APIPATH = "/api/v1";

app.use(express.json());
app.use((req, res, next) => {
    if (req.method === "POST" && (!req.body || Object.keys(req.body).length === 0)) {
        return res.status(500).send({ status: false, error: "Body is empty!" });
    }

    const dbs = dbStatus();
    if (dbs.status === "connected") return next();

    console.error(dbs.message);
    return res.status(500).send({ status: false, error: "Internal database error." });
});
app.use(`${APIPATH}/user`, userRoute);
app.use(`${APIPATH}/employee`, empRoute);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));