import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <Link to="/sginin">sgin in </Link>
      <Link to="/login">log in</Link>
    </div>
  );
};
