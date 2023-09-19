import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function NotFound() {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Page Not Found
          </CardTitle>
          <CardText style={{ textAlign: "center" }}>
            Hmm.. we can't seem to find what you're looking for.
            <br />
            <Link
              to="/"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Return Home
            </Link>
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;
