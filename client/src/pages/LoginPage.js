import React, { Component } from "react";
import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";

const PageContainer = styled.div`
  background-color: #fff;
  width: 100%;
`;

class LoginPage extends Component {
  render() {
    return (
      <PageContainer>
        <h2>Login</h2>
        <LoginForm />
        {/* {this.props.auth.error && (
          <Message
            icon={this.props.browser.is.extraSmall ? null : "spy"}
            negative
            header={this.props.intl.formatMessage({
              id: "authentication.login." + this.props.auth.error
            })}
            content={this.props.intl.formatMessage({
              id: "authentication.login." + this.props.auth.error + ".subtext"
            })}
          />
        )} */}
      </PageContainer>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     session: state.session,
//     uiGlobal: state.uiGlobal,
//     browser: state.browser
//   };
// };

// export default connect(
//   mapStateToProps,
//   { login }
// )(LoginPage);

export default LoginPage;
