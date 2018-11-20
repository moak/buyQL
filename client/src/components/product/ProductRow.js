import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { deleteProductMutation, getProductsQuery } from "../../queries/queries";
import styled from "styled-components";
import CreditCard from "../CreditCard";
import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const ProductRowContainer = styled.div`
  padding: 1em;
  border-style: dotted;
  margin-bottom: 1em;
  &:hover {
    background: #f7f7f7;
  }
`;
const ProductLeft = styled.div`
  width: 70%;
`;
const ProductName = styled.div`
  padding-top: 0.5em;

  font-weight: bold;
`;
const ProductDescription = styled.div`
  font-style: italic;
`;
const ProductRight = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductPrice = styled.div`
  padding-bottom: 0.5em;
  font-weight: bold;
`;
const ProductBuy = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  &:hover {
    background: palevioletred;
    color: #fff;
    cursor: pointer;
  }
`;

class ProductRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  expandProduct(event, productId) {
    event.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  handleDelete(event, productId) {
    event.preventDefault();
    this.props
      .deleteProductMutation({
        variables: {
          productId: productId
        },
        refetchQueries: [{ query: getProductsQuery }]
      })
      .then(() => this.props.history.push("/"));
  }

  render() {
    const { product, userAuth } = this.props;

    return (
      <ProductRowContainer>
        <div style={{ display: "flex" }}>
          <ProductLeft>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
          </ProductLeft>
          <ProductRight>
            <ProductPrice>{product.price / 100}$</ProductPrice>
            {userAuth.user_id && (
              <ProductBuy
                onClick={event => this.expandProduct(event, product.id)}
                primary
              >
                Buy
              </ProductBuy>
            )}
          </ProductRight>
          {userAuth.role === "admin" && (
            <Button
              color="red"
              style={{ marginTop: "2px" }}
              size="tiny"
              onClick={event => {
                this.handleDelete(event, product.id);
              }}
              icon
            >
              <Icon name="trash" />
            </Button>
          )}
        </div>
        {this.state.expanded && (
          <CreditCard
            userAuth={userAuth}
            productId={product.id}
            key="creditCard"
          />
        )}
      </ProductRowContainer>
    );
  }
}

export default withRouter(
  compose(
    graphql(deleteProductMutation, { name: "deleteProductMutation" }),
    graphql(getProductsQuery, { name: "getProductsQuery" })
  )(ProductRow)
);
