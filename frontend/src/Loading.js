import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Loading() {
  return (
    <section
      className="h1"
      style={{ margin: "auto", marginTop: "20vh", width: "50vw" }}
    >
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Loading &hellip;
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Loading;
