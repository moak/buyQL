import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
`;

class Header extends Component {
  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    const { isLoggued, first_name, last_name } = this.props.auth;

    return (
      <HeaderContainer>
        {isLoggued ? (
          <Button onClick={this.logout.bind(this)}>Logout</Button>
        ) : (
          <Link to="/register">Register</Link>
        )}

        <Link to="/products">Products</Link>
        {isLoggued ? (
          <div>
            <Link to="/details_user">
              {first_name} {last_name}
            </Link>
            <span style={{ marginLeft: "3px", fontWeight: "bold" }}>
              (<Link to="/edit_user">edit</Link>)
            </span>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </HeaderContainer>
    );
  }
}

export default withRouter(Header);
