import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getUserQuery } from "../../queries/queries";

class UserDetails extends Component {
  displayUserDetails() {
    const { user } = this.props.data;
    if (!user) {
      return null;
    }
    return (
      <div>
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        {user.role === "admin" && (
          <div>
            <h3>Products added in the shop:</h3>
            {user.products.length === 0 ? (
              <div>None</div>
            ) : (
              <ul>
                {user.products.map(item => {
                  return (
                    <li key={item.id}>
                      {item.name} - {item.description}- {item.price}$
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        <br />
        <div>
          <h3>Products bought:</h3>
          {user.bought_products.length === 0 ? (
            <div>None</div>
          ) : (
            <ul>
              {user.bought_products.map(item => {
                return (
                  <li key={item.id}>
                    {item.name} - {item.description}- {item.price}$
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.displayUserDetails()}</div>;
  }
}

export default graphql(getUserQuery, {
  options: props => {
    return {
      variables: {
        id: props.auth.user_id
      }
    };
  }
})(UserDetails);
