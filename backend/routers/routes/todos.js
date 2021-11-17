const express = require("express");

const {
  getTodos,
  addTodos,
  changeTodos,
  deleteTodo,
} = require("../controllers/todos");

const todosRouter = express.Router();

todosRouter.get("/getTodos/:userName", getTodos);
todosRouter.post("/addTodos/:userName/:todo", addTodos);
todosRouter.put("/changeTodos/:userName/:oldTodo/:newTodo", changeTodos);
todosRouter.delete("/deleteTodo/:userName/:targetTodo", deleteTodo);

module.exports = todosRouter;
