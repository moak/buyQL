import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProductsQuery } from "../queries/queries";
import ProductList from "../components/product/ProductList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductsPage extends Component {
  render() {
    const { loading, products } = this.props.data;

    if (loading) {
      return null;
    }

    return (
      <div>
        <h2>
          Products List
          <Link
            style={{ fontSize: "0.75em", float: "right" }}
            to="/add_product"
          >
            {this.props.auth.isLoggued && this.props.auth.role === "admin" && (
              <span>+ New product</span>
            )}
          </Link>
        </h2>
        <ProductList userAuth={this.props.auth} products={products || []} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default graphql(getProductsQuery)(
  connect(mapStateToProps)(ProductsPage)
);
