import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import CompanyDetails from "./CompanyDetails";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <CompanyDetails />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyDetails />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
