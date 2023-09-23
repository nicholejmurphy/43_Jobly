import React from "react";
import "./static/App.css";
import { useLocalStorage } from "./hooks";
import NavBar from "./NavBar";
import Routes from "./Routes";
import UserContext from "./UserContext";

function App() {
  // Runs GET request for items from JSON-server with first render
  const user = useLocalStorage("user");

  return (
    <UserContext.Provider value={user}>
      <NavBar />
      <Routes />
    </UserContext.Provider>
  );
}

export default App;
