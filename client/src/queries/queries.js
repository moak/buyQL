import { gql } from "apollo-boost";

// queries
const getProductsQuery = gql`
  {
    products {
      id
      name
      description
      price
    }
  }
`;

const getUserQuery = gql`
  query user($id: ID) {
    user(id: $id) {
      id
      role
      first_name
      last_name
      email
      products {
        id
        name
        description
        price
      }
      bought_products {
        id
        name
        description
        price
      }
    }
  }
`;

// mutations
const loginUserMutation = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      first_name
      last_name
      email
      token
      role
      user_id
    }
  }
`;

const addUserMutation = gql`
  mutation addUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    addUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      role: $role
    ) {
      first_name
      last_name
      email
      id
    }
  }
`;

const editUserMutation = gql`
  mutation editUser(
    $first_name: String
    $last_name: String
    $email: String
    $password: String
    $role: String
    $user_id: ID!
  ) {
    editUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      role: $role
      user_id: $user_id
    ) {
      id
      first_name
      last_name
      email
      role
    }
  }
`;

const addProductMutation = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Int!
    $user_id: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      user_id: $user_id
    ) {
      name
      id
    }
  }
`;

const buyProductMutation = gql`
  mutation buyProduct(
    $user_id: ID!
    $product_id: ID!
    $cvv: String!
    $card_number: String!
  ) {
    buyProduct(
      user_id: $user_id
      product_id: $product_id
      cvv: $cvv
      card_number: $card_number
    ) {
      name
      id
    }
  }
`;

const deleteProductMutation = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      name
      id
    }
  }
`;

export {
  getProductsQuery,
  getUserQuery,
  loginUserMutation,
  addUserMutation,
  editUserMutation,
  buyProductMutation,
  addProductMutation,
  deleteProductMutation
};
