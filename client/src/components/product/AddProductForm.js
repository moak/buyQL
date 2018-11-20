import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

import { addProductMutation, getProductsQuery } from "../../queries/queries";

class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      description: "",
      price: ""
    };
  }

  handleChange(event, id) {
    event.preventDefault();
    this.setState({ [id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, description, price } = this.state;

    this.props
      .addProductMutation({
        variables: {
          name: name,
          description: description,
          price: parseInt(price) * 100,
          user_id: this.props.auth.user_id
        },
        refetchQueries: [{ query: getProductsQuery }]
      })
      .then(() => this.props.history.push("/"));
    // .catch(err => console.log(err));
  }

  render() {
    const { name, description, price } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={event => {
              this.handleChange(event, "name");
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            required
            type="text"
            value={description}
            onChange={event => {
              this.handleChange(event, "description");
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input
            required
            type="text"
            value={price}
            onChange={event => {
              this.handleChange(event, "price");
            }}
          />
        </Form.Field>
        <Button primary type="submit">
          Add product
        </Button>
      </Form>
    );
  }
}

export default withRouter(
  compose(
    graphql(addProductMutation, { name: "addProductMutation" }),
    graphql(getProductsQuery, { name: "getProductsQuery" })
  )(AddProductForm)
);
