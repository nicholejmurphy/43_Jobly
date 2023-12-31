import React, { useState, useEffect } from "react";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import JoblyApi from "./api/api";
import { decodeToken } from "react-jwt";
import UserContext from "./auth/UserContext";
import Loading from "./common/Loading";
import Navigation from "./navigation_routes/Navigation";
import Routes from "./navigation_routes/Routes";

/** Jobly Application
 *
 * - dataIsLoading: Identifies if user data has been retrieved.
 *   Manages loading component to show or not.
 *
 * - token: Saved in localStorage and stores username in payload.
 *
 * - currUser: holds user data for currently logged in user.
 *
 * - applicationIds: stores set of user's applications.
 *   Used when identifying if job has already been applied to
 *   in JobCard component.
 */
function App() {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage("user_token");
  const [currUser, setCurrUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.debug(
    "App. Loading user data.",
    "currUser: ",
    currUser,
    "token: ",
    token
  );

  /** Updates if token changes.
   *  - dataIsLoading => { true } while awaiting data
   *  - Retrieves user data from token and pulls from JoblyApi
   *  - Updates currUser & applicationIds
   *  - dataIsLoading => { false } after useEffect
   */
  useEffect(
    function loadUserInfo() {
      async function getCurrUser() {
        if (token) {
          try {
            const { username } = decodeToken(token);
            // Set api token
            JoblyApi.token = token;
            const user = await JoblyApi.getCurrUser(username);
            setCurrUser(user);
            setApplicationIds(new Set(user.applications));
          } catch (error) {
            console.error("Failed to set current user.", error);
            setCurrUser(null);
          }
        }
        setDataIsLoading(false);
      }
      setDataIsLoading(true);
      getCurrUser();
    },
    [token]
  );

  // Check if user has applied to job.
  // - Is jobId in applicationsId?
  function hasApplied(id) {
    return applicationIds.has(id);
  }

  // User applies to job
  // - Send api request to apply to job
  // - Add jobId to applicationIds set
  async function applyToJob(id) {
    if (hasApplied(id)) return;
    JoblyApi.applyToJob(currUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  // User login { username, password } => { token }
  async function login(data) {
    try {
      const token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Error with login. Invalid username or password.", errors);
      return { success: false, errors };
    }
  }

  // User signup { user data } => { token }
  async function signup(data) {
    try {
      const token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Error with signup.", errors);
      return { success: false, errors };
    }
  }

  // User logout.
  async function logout() {
    setCurrUser(null);
    setToken(null);
  }

  // Show loading component if data is still loading.
  if (dataIsLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{ currUser, setCurrUser, hasApplied, applyToJob, applicationIds }}
    >
      <Navigation logout={logout} />
      <div className="App">
        <Routes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
