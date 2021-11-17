const mongoose = require("mongoose");

const todosModel = new mongoose.Schema({
  userName: { type: String, required : true },
  task: { type: String, required: true }
});

module.exports = mongoose.model("Todos", todosModel);
