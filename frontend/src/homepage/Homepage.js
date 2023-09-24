import React, { useContext } from "react";
import "./Homepage.css";
import {
  Button,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currUser } = useContext(UserContext);

  function isLoggedIn() {
    return (
      <CardBody className="Homepage bg-light shadow rounded">
        <CardTitle className="Homepage-title display-2">Jobly</CardTitle>
        <CardSubtitle className="Homepage-subtitle text-muted">
          <em className="h4">All the jobs in one, convenient place.</em>
        </CardSubtitle>
        <hr />
        <CardText className="Homepage-welcome h2">
          Welcome back, {currUser.firstName}!
        </CardText>
      </CardBody>
    );
  }

  function notLoggedIn() {
    return (
      <div className="Homepage">
        <CardBody className="Homepage-card bg-light shadow rounded m-4">
          <CardTitle className="Homepage-title display-2">
            💼 Jobly 💼
          </CardTitle>
          <CardSubtitle className="Homepage-subtitle text-muted">
            <em className="h4">All the jobs in one, convenient place.</em>
          </CardSubtitle>
          <hr />
          <CardText className="Homepage-btns text-center">
            <Button className="bg-primary" tag="a" href="/login">
              Login
            </Button>
            <Button className="bg-primary" tag="a" href="/signup">
              SignUp
            </Button>
          </CardText>
        </CardBody>
      </div>
    );
  }

  return currUser ? isLoggedIn() : notLoggedIn();
}

export default Homepage;
