import { gql } from "@apollo/client";

export const ADD_USERS = gql`
  mutation AddUsersInfo(
    $created_at: DateTime
    $email: String!
    $oauth_provider: String
    $password_hash: String
    $profile_picture_url: String
    # $updated_at: DateTime
    $username: String
  ) {
    insertUsers(
      email: $email
      password_hash: $password_hash
      oauth_provider: $oauth_provider
      created_at: $created_at
      username: $username
      profile_picture_url: $profile_picture_url
    ) {
      created_at
      email
      id
      oauth_provider
      password_hash
      profile_picture_url
      updated_at
      username
    }
  }
`;

export const ADD_WISHLIST = gql`
  mutation AddWishlists(
    $user_id: ID!
    $title: String!
    $type: String
    $description: String
    $due_date: DateTime
    $require_address: Boolean
    $address: String
    $created_at: DateTime!
    $updated_at: DateTime
  ) {
    insertWishlists(
      user_id: $user_id
      title: $title
      type: $type
      description: $description
      due_date: $due_date
      require_address: $require_address
      address: $address
      created_at: $created_at
      updated_at: $updated_at
    ) {
      id
      user_id
      title
      type
      description
      due_date
      require_address
      address
      created_at
      updated_at
    }
  }
`;

export const ADD_WISHLIST_ITEM = gql`
  mutation AddWishlistItem(
    $wishlist_id: ID!
    $product_id: ID!
    $quantity: Int!
    $created_at: DateTime
  ) {
    insertWishlistItem(
      wishlist_id: $wishlist_id
      product_id: $product_id
      quantity: $quantity
      created_at: $created_at
    ) {
      id
      wishlist_id
      product_id
      quantity
      created_at
      updated_at
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String
    $price: Float!
    $created_at: DateTime
    $updated_at: DateTime
  ) {
    insertProduct(
      name: $name
      description: $description
      price: $price
      created_at: $created_at
      updated_at: $updated_at
    ) {
      id
      name
      description
      price
      created_at
      updated_at
    }
  }
`;



export const ADD_USER_PREFERENCES = gql`
  mutation AddUserPreferences(
    $use_case: String!
    $reminder_date: String!
    $user_ref: Int!
    $updated_at: DateTime
  ) {
    insertUserPreferences(
      use_case: $use_case
      reminder_date: $reminder_date
      user_ref: $user_ref
      updated_at: $updated_at
    ) {
      id
      use_case
      reminder_date
      user_ref
      updated_at
    }
  }
`;

export const UPDATE_USER_SUBSCRIPTION = gql`
  mutation updateUsers($id: ID!, $isActive: Boolean!) {
    updateUsers(id: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

export const mutations = {
  ADD_USERS,
  ADD_USER_PREFERENCES,
  UPDATE_USER_SUBSCRIPTION,
};
