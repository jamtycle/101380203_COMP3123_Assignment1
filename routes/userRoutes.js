"use strict";
const express = require('express');
const UserModel = require("../model/userModel");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const user_result = await user.save();
        console.log("User inserted: ", user_result);
        return res.status(201).send(user_result);
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }

        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

userRoute.post("/login", async (req, res) => {
    try {
        let unameobj = { username: req.body.username };
        if (unameobj.username.includes("@")) unameobj = { email: unameobj.username };
        const user = await UserModel.findOne({
            ...unameobj,
            password: req.body.password,
        });

        if (!user) return res.status(200).send({
            status: false,
            username: unameobj.username ?? unameobj.email,
            message: "User not found"
        });

        return res.status(200).send({
            status: true,
            username: unameobj.username ?? unameobj.email,
            message: "User logged in successfully"
        });
    } catch (ex) {
        if (ex.constructor.name === "MongoServerError") {
            return res.status(500).send({ status: false, error: { message: ex.toString(), obj: ex } });
        }
        console.error(ex);
        return res.status(500).send({ status: false, error: "Internal server error." });
    }
});

module.exports = userRoute;