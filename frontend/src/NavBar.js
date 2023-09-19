import React from "react";
import "./static/NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar expand="md"></Navbar>
    </div>
  );
}

export default NavBar;
