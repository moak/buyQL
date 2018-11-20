import React, { Component } from "react";
import ProductRow from "./ProductRow";

class ProductList extends Component {
  render() {
    const { userAuth, products } = this.props;

    return (
      <div>
        {products
          .map((product, index) => {
            return (
              <ProductRow key={index} userAuth={userAuth} product={product} />
            );
          })
          .reverse()}
      </div>
    );
  }
}

export default ProductList;
