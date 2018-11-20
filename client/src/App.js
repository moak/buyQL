import React, { Component } from "react";
import styled from "styled-components";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter, Route } from "react-router-dom";
import { logout, updateAuth } from "./modules/auth/actions";
import { connect } from "react-redux";

import Header from "./components/Header";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditUserPage from "./pages/EditUserPage";
import ViewUserPage from "./pages/UserPage";

const AppContainer = styled.div`
  margin: 0 auto;
  width: 600px;
  padding: 2em;
`;

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  componentWillMount() {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      this.props.updateAuth();
    }
  }
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AppContainer>
            <Header logout={this.props.logout} auth={this.props.auth} />
            <Route path="/" exact component={ProductsPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/add_product" component={AddProductPage} />
            <Route path="/edit_user" component={EditUserPage} />
            <Route path="/details_user" component={ViewUserPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </AppContainer>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: data => {
      dispatch(logout());
    },
    updateAuth: () => {
      dispatch(updateAuth());
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
)(App);
