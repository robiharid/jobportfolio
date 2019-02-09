/// <reference path="./interfaces.d.ts" />

import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "evergreen-ui";

const Header = ({ setShown }: HeaderPropsInterface) => (
  <div>
    <IconButton icon="menu" onClick={() => setShown(true)} />
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

export default Header;
