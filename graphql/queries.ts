import { gql } from "@apollo/client";

// export const GET_CATEGORY_INFO_BY_USER = gql`
//     query MyQuery($username: String!) {
//      communityListByUser(username: $username) {
//       username
//       score
//     }
//   }
// `;

// export const GET_CATEGORY_INFO_BY_USER_LATEST = gql`
//     query MyQuery($username: String!) {
//       communityListByUserLatest(username: $username) {
//       username
//       score
//       notes
//       action_plan
//     }
//   }
// `;

export const GET_CATEGORY_INFO_BY_USER_LATEST = gql`
  query MyQuery($username: String!) {
    categoryListByUserLatest(username: $username) {
      id
      recorded_at
      username
      score
      notes
      action_plan
      goals
    }
  }
`;

// queries.ts

export const GET_USERS_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    usersByEmail(email: $email) {
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

export const GET_USERS_BY_ID = gql`
  query MyQuery($id: ID!) {
    usersById(id: $id) {
      created_at
      email
      id
      oauth_provider
      password_hash
      profile_picture_url
      updated_at
      username
      wishlists {
        address
        created_at
        description
        due_date
        require_address
        title
        type
        updated_at
        user_id
        wishlist_id
        Wishlist_items {
          added_at
          additional_description
          product_id
          quantity
          updated_at
          wishlist_id
          wishlist_item_id
        }
      }
    }
  }
`;

export const queries = {
  GET_USERS_BY_EMAIL,
  GET_USERS_BY_ID,
};
