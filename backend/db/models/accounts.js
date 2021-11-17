const mongoose = require("mongoose");

const accountsModel = new mongoose.Schema({
  useeName: { type: string, required },
  email: { type: string, required },
  password: { type: string, required },
});

module.exports = mongoose.model("accounts", accountsModel);
