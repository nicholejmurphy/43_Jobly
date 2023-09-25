import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { MemoryRouter } from "react-router";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
