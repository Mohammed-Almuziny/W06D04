const express = require("express");

const { sginIn, logIn } = require("../controllers/account");

const accountRouter = express.Router();

accountRouter.post("/", sginIn);
accountRouter.get("/:userNameOrEmail/:password", logIn);

module.exports = accountRouter;
