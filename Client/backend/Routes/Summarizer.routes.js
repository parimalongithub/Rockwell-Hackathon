const express = require("express");
const { Summarizer } = require("../Controller/Summarizer.controller");
const { protectRoute } = require("../Config/Authenticate");
const Summaryrouter = express.Router();

Summaryrouter.post("/summarize", protectRoute, Summarizer);

module.exports = Summaryrouter;
