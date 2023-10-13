"use strict";
const express = require('express');
const EmployeeModel = require("../model/employeeModel");

const empRoute = express.Router();

empRoute.get("/", async (req, res) => {
    try {
        return res.status(200).send(await EmployeeModel.find());
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.post("/", async (req, res) => {
    try {
        const employee = new EmployeeModel(req.body);
        const result = await employee.save();
        console.log("Employee created: ", result);
        return res.status(201).send(result);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.get("/:ied", async (req, res) => {
    try {
        const employee = await EmployeeModel.findOne({ _id: req.params.ied });
        return res.status(200).send(employee);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.put("/:ied", async (req, res) => {
    try {
        const status = await EmployeeModel.updateOne({ _id: req.params.ied }, { $set: req.body });
        return res.status(200).send(status);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

empRoute.delete("/", async (req, res) => {
    try {
        if (!req.query.eid) return res.status(500).send({ status: false, error: "eid was not provided." });
        const status = await EmployeeModel.deleteOne({ _id: req.query.eid });
        return res.status(200).send(status);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

module.exports = empRoute;