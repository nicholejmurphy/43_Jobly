import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "../common/Alert";

/** Handles user login attemps.
 *  - Takes in form data and attempts to authenticate
 *    through JoblyApi
 *  - If valid, login prop will be triggered therefore updated user data across site.
 *  - If invalid data, a list of error messages will show through the { Alert } component
 */
function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // Tracks changes of form data and updates state
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // If successful, redirects to homepage
  // if invalid attempt, error messages will be updated
  async function handleSubmit(e) {
    e.preventDefalut();
    const res = await login(formData);
    if (res.success) {
      history.push("/");
    }
    setFormErrors(res.errors);
  }
  return (
    <div className="LoginForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="jobseeker"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Login</Button>
      </Form>
      {formErrors.length ? <Alert type="danger" errors={formErrors} /> : null}
    </div>
  );
}

export default LoginForm;
