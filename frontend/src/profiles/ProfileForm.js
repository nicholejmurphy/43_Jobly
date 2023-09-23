import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";

function ProfileForm() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

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
    e.preventDefalut();
    const username = currUser.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.updateProfile(username, formData);
    } catch (errors) {
      setFormErrors(updatedUser.errors);
      return;
    }
    setCurrUser(updatedUser);
    setFormData((data) => ({ ...data, password: "" }));
    setFormErrors([]);
  }

  return (
    <div className="ProfileForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup disabled>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={currUser.username}
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
        <FormText>Please confirm your password to make changes.</FormText>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Update</Button>
      </Form>
      {formErrors ? <Alert type="Sign Up" errors={formErrors} /> : null}
    </div>
  );
}

export default ProfileForm;
