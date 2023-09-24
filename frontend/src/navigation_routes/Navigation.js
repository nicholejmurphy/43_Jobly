import React, { useState, useContext } from "react";
import "./Navigation.css";
import UserContext from "../auth/UserContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Navigation({ logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currUser } = useContext(UserContext);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function isLoggedIn() {
    return (
      <>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/jobs">Jobs</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {currUser.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a" href="/applications">
                  Applications{" "}
                  <span className="badge badge-success">
                    {currUser.applications.length}
                  </span>
                </DropdownItem>
                <DropdownItem tag="a" href="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </>
    );
  }

  function isLoggedOut() {
    return (
      <>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">SignUp</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </>
    );
  }

  return (
    <div className="Navigation">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        {currUser ? isLoggedIn() : isLoggedOut()}
      </Navbar>
    </div>
  );
}

export default Navigation;
