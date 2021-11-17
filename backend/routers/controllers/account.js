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

const sginIn = (req, res) => {
  const newAccount = req.body;
  newAccount.todos = [];

  accounts.forEach((elm) => {
    if (elm.userName === newAccount.userName)
      res.status(403).json("user name already exists");
    if (elm.email === newAccount.email)
      res.status(403).json("email already exists");
  });

  accounts.push(newAccount);

  fs.writeFile("./db/accounts.json", JSON.stringify(accounts), (err) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      res.status(200).json(accounts);
    }
  });
};

const logIn = (req, res) => {
  const { userNameOrEmail, password } = req.params;
  let userName = "";
  let key = 0;

  console.log(req.params);
  accounts.forEach((elm) => {
    if (elm.userName === userNameOrEmail || elm.email === userNameOrEmail)
      if (elm.password === password) {
        key = 1;
        userName = elm.userName;
      } else key = 2;
  });

  switch (key) {
    case 1:
      res.status(200).json(userName);
      break;

    case 2:
      res.status(403).json("wrnog password");
      break;

    default:
      res.status(403).json("this user name or email dose not existing");
      break;
  }
};

module.exports = { sginIn, logIn };
