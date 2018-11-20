import React, { Component } from "react";
import styled from "styled-components";
import UserDetails from "../components/user/UserDetails";
import { connect } from "react-redux";

const PageContainer = styled.div`
  background-color: #fff;
  width: 100%;
`;

class UserPage extends Component {
  render() {
    return (
      <PageContainer>
        <h2>User information</h2>
        <UserDetails auth={this.props.auth} />
      </PageContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(UserPage);
