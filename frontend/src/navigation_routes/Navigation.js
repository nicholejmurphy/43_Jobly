import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";

function NavBar(user = "") {
  // const history = useHistory();

  // Removes user token and returns to homepage
  // async function logout() {
  //   history.push("/");
  // }

  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">💼 Jobly</NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
