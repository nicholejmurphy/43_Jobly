import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";
import Alerts from "../common/Alerts";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";

/** Handles user profile information update
 *  - Pulls user data from currUser state to populate form.
 *  - Requires password input to verify submission
 *  - Updates user info across site state.
 */
function ProfileForm() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currUser.username,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [updateConfirmed, setUpdateConfirmed] = useState(false);

  /** Handle form input changes
   *  - update formData state to catch all form changes
   *
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  /** Handle form submition
   *  - Attempts to updated profile through joblyApi
   *   { data } => { user }
   *  - If valid user,
   *    - Update form data and clear password
   *    - Update currUser across application
   *    - Reset formErrors
   *  - If invalid request, show errors
   *
   */
  async function handleSubmit(e) {
    e.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    const username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.updateProfile(username, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    setCurrUser(updatedUser);
    setUpdateConfirmed(true);
    setFormData((data) => ({ ...data, password: "" }));
    setFormErrors([]);
  }

  return (
    <div className="ProfileForm bg-light p-4 w-100 shadow rounded">
      {updateConfirmed ? (
        <Alerts
          type="success"
          messages={["Profile has been successfully updated!"]}
        />
      ) : null}
      {formErrors ? <Alerts type="danger" messages={formErrors} /> : null}
      <Form onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">First name</Label>
          <Input
            id="first_name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last name</Label>
          <Input
            id="last_name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <hr />
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormText>Please confirm your password to make changes.</FormText>
        </FormGroup>
        <Button className="bg-primary">Update</Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
