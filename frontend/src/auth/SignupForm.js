import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "../common/Alert";

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefalut();
    const res = await signup(formData);
    if (res.success) {
      history.push("/");
    }
    setFormErrors(res.errors);
  }
  return (
    <div className="SignupForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
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
        <Button>Sign Up</Button>
      </Form>
      {formErrors.length ? <Alert type="danger" errors={formErrors} /> : null}
    </div>
  );
}

export default SignupForm;
