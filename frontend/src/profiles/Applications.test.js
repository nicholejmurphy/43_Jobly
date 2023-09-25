import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Applications from "./Applications";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
it("renders without crashing", function () {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <UserProvider>
        <Applications />
      </UserProvider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Applications />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
