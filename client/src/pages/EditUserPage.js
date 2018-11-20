import React, { Component } from "react";
import styled from "styled-components";
import EditUserForm from "../components/user/EditUserForm";
import { connect } from "react-redux";
import { updateAuth } from "../modules/auth/actions";

const PageContainer = styled.div`
  background-color: #fff;
  width: 100%;
`;

class RegisterPage extends Component {
  render() {
    return (
      <PageContainer>
        <h2>Edit your information</h2>
        <EditUserForm
          updateAuth={this.props.updateAuth}
          auth={this.props.auth}
        />
      </PageContainer>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateAuth: data => {
      dispatch(updateAuth(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
