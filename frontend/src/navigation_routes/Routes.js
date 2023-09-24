import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";
import PrivateRoute from "./PrivateRoute";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetails from "../companies/CompanyDetails";
import JobList from "../jobs/JobList";
import ProfileForm from "../profiles/ProfileForm";
import Applications from "../profiles/Applications";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import NotFound from "../common/NotFound";

function Routes({ login, signup }) {
  return (
    <div className="Routes rounded shadow">
      <Switch>
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
        <PrivateRoute path="/companies/:handle">
          <CompanyDetails />
        </PrivateRoute>
        <PrivateRoute path="/jobs">
          <JobList />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>
        <PrivateRoute path="/applications">
          <Applications />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
