"use strict";
const express = require('express');
const { UserModel, loginUser } = require("../model/userModel");
const { getToken } = require("../auth/tokenGenerator");

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
        const user = await loginUser(req.body.username, req.body.password)

        if (!user) return res.status(200).send({
            status: false,
            username: unameobj.username ?? unameobj.email,
            message: "User not found"
        });

        // TODO: before generating a new token, check if the user have a token stored in the DB
        //      if there is a token, then use that token.
        //      else, generate the token and update the user with that token.
        //      Also, check if the token have expired based on the time on the user.
        //      Missing fields: [ token_expire, token_value ]
        const token = await getToken(user);
        return res.status(200).send({
            status: true,
            username: unameobj.username ?? unameobj.email,
            message: "User logged in successfully",
            jwt_token: token.toString()
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