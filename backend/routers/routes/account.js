const express = require("express");

const { sginIn, logIn } = require("../controllers/account");

const accountRouter = express.Router();

accountRouter.post("/", sginIn);
accountRouter.get("/login/:userNameOrEmail/:password", logIn);

module.exports = accountRouter;
