import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SginIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData = {
      userName: event.target.userName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post("http://localhost:5000/account/", inputData)
      .catch((err) => {
        if (err) {
          alert(err.response.data);
        }
      });
    navigate("/login");
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input name="userName" placeholder="user name" required />
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
};
