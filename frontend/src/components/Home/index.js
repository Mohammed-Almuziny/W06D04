import React from "react";

export const Home = () => {
  const user = localStorage.getItem("user");
  console.log(user);
  return user ? (
    <div>
      <h1>Home</h1>
    </div>
  ) : (
    <div>
      <h1>you have to log in </h1>
    </div>
  );
};
