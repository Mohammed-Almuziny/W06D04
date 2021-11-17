const { response } = require("express");
const fs = require("fs");
const Accounts = require("./../../db/models/accounts");

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
  const account = new Accounts(req.body);

  Accounts.find((err, data) => {
    let key;
    data.find((elm) => {
      if (elm.userName === newAccount.userName) {
        key = 1;
      }
      if (elm.email === newAccount.email) {
        key = 2;
      }
    });

    switch (key) {
      case 1:
        res.status(403).json("user name already exists");
        break;

      case 2:
        res.status(403).json("email already exists");
        break;

      default:
        account
          .save()
          .then((result) => {
            res.status(200).json(account);
          })
          .catch((err) => {
            res.json(err);
          });

        break;
    }
  });
};

const logIn = (req, res) => {
  const { userNameOrEmail, password } = req.params;
  let userName = "";

  Accounts.find((err, data) => {
    let key;

    data.forEach((elm) => {
      console.log(data);
      if (elm.userName === userNameOrEmail || elm.email === userNameOrEmail)
        if (elm.password === password) {
          key = 1;
          userName = elm.userName;
        } else key = 2;
    });

    console.log(key);
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
  });
};

module.exports = { sginIn, logIn };
