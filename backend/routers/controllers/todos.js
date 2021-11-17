const fs = require("fs");

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

  const target = accounts.find((account) => account.userName === userName);

  res.status(200).json(target.todos);
};

const addTodos = (req, res) => {
  const { userName, todo } = req.params;

  accounts.forEach((account) => {
    if (account.userName === userName) account.todos.push(todo);
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
