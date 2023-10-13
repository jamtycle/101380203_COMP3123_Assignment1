"use strict";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, require: true, index: true, maxLength: 100 },
    email: { type: String, unique: true, require: true, maxLength: 50 },
    password: { type: String, unique: true, require: true, maxLength: 50 }
});
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;