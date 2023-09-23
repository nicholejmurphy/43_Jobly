import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetails from "../companies/CompanyDetails";
import JobList from "../jobs/JobList";
import ProfileForm from "../profiles/ProfileForm";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import NotFound from "../common/NotFound";

function Routes({ login, signup }) {
  return (
    <div>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/login">
        <LoginForm login={login} />
      </Route>
      <Route path="/signup">
        <SignupForm signup={signup} />
      </Route>
      <PrivateRoute exact path="/companies">
        <CompanyList />
      </PrivateRoute>
      <PrivateRoute path="/companies/:company">
        <CompanyDetails />
      </PrivateRoute>
      <PrivateRoute path="/jobs">
        <JobList />
      </PrivateRoute>
      <PrivateRoute path="/users/:username">
        <ProfileForm />
      </PrivateRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </div>
  );
}

export default Routes;
