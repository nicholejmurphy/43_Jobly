import React from "react";
import UserContext from "./auth/UserContext";

const testUser = {
  username: "testuser",
  first_name: "testuser",
  last_name: "testuser",
  email: "test@user.com",
  photo_url: null,
};

const UserProvider = (
  currUser = testUser,
  hasAppliedToJob = () => false,
  children
) => (
  <UserContext.Provider value={{ currUser, hasAppliedToJob }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
