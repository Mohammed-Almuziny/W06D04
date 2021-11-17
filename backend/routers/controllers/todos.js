const fs = require("fs");
const todos = require("./../../db/models/todos");
const Todos = require("./../../db/models/todos");

let accounts = [];

fs.readFile("./db/accounts.json", (err, data) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    accounts = JSON.parse(data.toString());
  }
});

const getTodos = (req, res) => {
  const { userName } = req.params;

  todos.find((err, data) => {
    const users = data.filter((elm) => {
      if (elm.userName === userName) return elm;
    });

    console.log(users);
    res.status(200).json(users);
  });
};

const addTodos = (req, res) => {
  const { userName, task } = req.params;

  const todo = new Todos({
    userName,
    task,
  });

  Todos.find((err, data) => {
    const users = data.filter((elm) => {
      if (elm.userName === userName) return elm;
    });

    if (!users[0]) {
      todo
        .save()
        .then((result) => {
          res.status(200).json(todo);
        })
        .catch((err) => {
          res.json(err);
        });
    } else {
      console.log(users);
      const found = users.find((elm) => elm.task === task);

      if (found) {
        res.status(400).json("task already exists");
      } else {
        todo
          .save()
          .then((result) => {
            res.status(200).json(todo);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    }
  });
};

const changeTodos = async (req, res) => {
  const { userName, oldTodo, newTodo } = req.params;

  const filter = { userName: userName, task: oldTodo };
  const update = { task: newTodo };

  let result = await Todos.findOneAndUpdate(filter, update, { new: true });

  res.status(200).json(result);
};

const deleteTodo = (req, res) => {
  const { userName, targetTodo } = req.params;
  console.log(userName, targetTodo);

  Todos.findOneAndRemove(
    { userName: userName, task: targetTodo },
    (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
};

module.exports = { getTodos, addTodos, changeTodos, deleteTodo };
