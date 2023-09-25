import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <CompanyList />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyList />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
