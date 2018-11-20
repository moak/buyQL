import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { addUserMutation } from "../../queries/queries";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      role: "user",
      message: {
        content: null,
        type: null
      }
    };
  }

  handleChange(event, id) {
    event.preventDefault();
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password, password2 } = this.state;

    const emailRegex = /\S+@\S+\.\S+/;
    let errors = 0;
    if (!emailRegex.test(email)) {
      errors++;
      const message = {
        content: "Email invalid.",
        type: "error"
      };
      this.setState({ message });
    }

    if (password !== password2) {
      errors++;
      const message = {
        content: "Passwords must be the same.",
        type: "error"
      };
      this.setState({ message });
    }

    if (errors === 0) {
      this.props
        .addUserMutation({
          variables: {
            email: this.state.email,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            password: this.state.password,
            role: this.state.role
          }
        })
        .then(result => {
          if (result.data) {
            const message = {
              content: "Registration successful, you can now login in.",
              type: "success"
            };
            this.setState({ message });
          }
        });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      password2,
      role,
      message
    } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>First name</label>
            <input
              required
              value={firstName}
              onChange={event => {
                this.handleChange(event, "firstName");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Last name</label>
            <input
              required
              value={lastName}
              onChange={event => {
                this.handleChange(event, "lastName");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              required
              value={email}
              onChange={event => {
                this.handleChange(event, "email");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={event => {
                this.handleChange(event, "password");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Repeat password</label>
            <input
              required
              type="password"
              value={password2}
              onChange={event => {
                this.handleChange(event, "password2");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Type (demo purpose)</label>
            <select
              value={role}
              onChange={event => this.handleChange(event, "role")}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </Form.Field>
          <Button primary type="submit">
            Register
          </Button>
        </Form>
        {message.content && message.type && (
          <Message
            positive={message.type === "success"}
            negative={message.type === "error"}
            content={message.content}
          />
        )}
      </div>
    );
  }
}

export default withRouter(
  compose(graphql(addUserMutation, { name: "addUserMutation" }))(RegisterForm)
);
