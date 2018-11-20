import React, { Component } from "react";
import AddProductForm from "../components/product/AddProductForm";
import { connect } from "react-redux";

class AddProductPage extends Component {
  render() {
    return (
      <div>
        <h2>Add a product</h2>
        <AddProductForm auth={this.props.auth} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AddProductPage);
