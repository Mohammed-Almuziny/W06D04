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
    const users = data.map((elm) => {
      if (elm.userName === userName) return elm;
    });

    console.log(users);
    res.status(200).json(users);
  });
  // const target = accounts.find((account) => account.userName === userName);

  // res.status(200).json(target.todos);
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

const changeTodos = (req, res) => {
  const { userName, oldTodo, newTodo } = req.params;
  let index;

  accounts.find((account, i) => {
    if (account.userName === userName) {
      index = i;
    }
  });

  accounts[index].todos = accounts[index].todos.map((todo) => {
    if (todo === oldTodo) return newTodo;
    else return todo;
  });

  fs.writeFile("./db/accounts.json", JSON.stringify(accounts), (err) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      res.status(200).json(accounts);
    }
  });
};

const deleteTodo = (req, res) => {
  const { userName, targetTodo } = req.params;
  let index;

  accounts.find((account, i) => {
    if (account.userName === userName) {
      index = i;
    }
  });

  accounts[index].todos = accounts[index].todos.filter(
    (todo) => todo !== targetTodo
  );

  fs.writeFile("./db/accounts.json", JSON.stringify(accounts), (err) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      res.status(200).json(accounts);
    }
  });
};

module.exports = { getTodos, addTodos, changeTodos, deleteTodo };
