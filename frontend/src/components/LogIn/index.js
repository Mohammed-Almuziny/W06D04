import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LogIN = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userNameOrEmail = event.target.userName.value;
    const password = event.target.password.value;
    let notErr = true;

    let res = await axios
      .get(`http://localhost:5000/account/${userNameOrEmail}/${password}`)
      .catch((err) => {
        if (err) {
          alert(err.response.data);
          notErr = false;
        }
      });

    if (notErr) {
      localStorage.setItem("user", res.data);
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <input name="userName" placeholder="user name or password" required />
      <input type="password" name="password" placeholder="password" required />
      <button
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        submit
      </button>
    </form>
  );
};
