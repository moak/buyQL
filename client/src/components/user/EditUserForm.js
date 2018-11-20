import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { editUserMutation } from "../../queries/queries";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: this.props.auth.email,
      password: "",
      password2: "",
      firstName: this.props.auth.first_name,
      lastName: this.props.auth.last_name,
      role: this.props.auth.role,
      message: { content: null, type: null }
    };
  }

  handleChange(event, id) {
    event.preventDefault();
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password, password2, firstName, lastName } = this.state;

    const emailRegex = /\S+@\S+\.\S+/;
    let errors = 0;
    if (email.length > 0 && !emailRegex.test(email)) {
      errors++;
      const message = {
        content: "Email invalid.",
        type: "error"
      };
      this.setState({ message });
    }

    if (password.length > 0 && password2.length > 0 && password !== password2) {
      errors++;
      const message = {
        content: "Passwords must be the same.",
        type: "error"
      };
      this.setState({ message });
    }

    if (errors === 0) {
      let variables = {
        user_id: this.props.auth.user_id,
        role: this.state.role
      };
      if (email.length > 0) {
        variables.email = email;
      }
      if (password.length > 0) {
        variables.password = password;
      }
      if (firstName.length > 0) {
        variables.first_name = firstName;
      }
      if (lastName.length > 0) {
        variables.last_name = lastName;
      }

      this.props
        .editUserMutation({
          variables
        })
        .then(result => {
          if (result.data) {
            this.props.updateAuth(result.data.editUser);
            const message = {
              content: "Information successfully modified.",
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
      role,
      email,
      password,
      password2,
      message
    } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Field>
            <label>First name</label>
            <input
              value={firstName}
              onChange={event => {
                this.handleChange(event, "firstName");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Last name</label>
            <input
              value={lastName}
              onChange={event => {
                this.handleChange(event, "lastName");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              value={email}
              onChange={event => {
                this.handleChange(event, "email");
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
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
              type="password"
              value={password2}
              onChange={event => {
                this.handleChange(event, "password2");
              }}
            />
          </Form.Field>
          <Button primary type="submit">
            Update
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
  compose(graphql(editUserMutation, { name: "editUserMutation" }))(EditUserForm)
);
