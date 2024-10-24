const express = require("express");
const Authrouter = express.Router();
const { signup, login, logout } = require("../Controller/Auth.Controller");

Authrouter.post("/signup", signup);
Authrouter.post("/login", login);
Authrouter.get("/logout", logout);

module.exports = Authrouter;
