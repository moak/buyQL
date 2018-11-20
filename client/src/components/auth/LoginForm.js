import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { loginUserMutation } from "../../queries/queries";
import { loginSuccess } from "../../modules/auth/actions";
import { connect } from "react-redux";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      message: null
    };
  }

  handleChange(event, id) {
    event.preventDefault();
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props
      .loginUserMutation({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(result => {
        localStorage.setItem("user", JSON.stringify(result.data.loginUser));
        this.props.loginSuccess(result.data.loginUser);
        this.props.history.push("/products");
      })
      .catch(err => {
        this.setState({ message: "Login failed." });
      });
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
          <Button primary type="submit">
            Login
          </Button>
        </Form>
        {message && <Message negative content={message} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: data => {
      dispatch(loginSuccess(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(
  compose(graphql(loginUserMutation, { name: "loginUserMutation" }))(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LoginForm)
  )
);
