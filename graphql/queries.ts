import { gql } from "@apollo/client";

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
      first_name
      last_name
      gender
      birthdate
    }
  }
`;

export const GET_USERS_BY_ID = gql`
  query MyQuery($id: ID!) {
    userDataById(id: $id) {
      created_at
      email
      id
      oauth_provider
      password_hash
      profile_picture_url
      updated_at
      username
      first_name
      last_name
      gender
      birthdate
      wishlists {
        id
        address
        created_at
        description
        due_date
        require_address
        title
        type
        updated_at
        user_id
        wishlist_items {
          id
          added_at
          additional_description
          product_id
          quantity
          updated_at
          wishlist_id
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    productsById(id: $id) {
      id
      product_name
      product_description
      price
      affiliate_link
      image_url
      created_at
      updated_at
      platform
      category
      subcategory
      brand
      store_link
      highlighted
    }
  }
`;

export const GET_WISHLIST_BY_ID = gql`
  query GetWishlistById($id: ID!) {
    wishlistsById(id: $id) {
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
      wishlist_items {
        added_at
        additional_description
        product_id
        quantity
        updated_at
        wishlist_id
        id
        products {
          affiliate_link
          created_at
          image_url
          price
          product_description
          product_description_thai
          id
          product_name
          product_name_thai
          updated_at
          platform
          category
          subcategory
          brand
          store_link
          highlighted
        }
      }
    }
  }
`;

export const GET_WISHLIST_ITEM_BY_ID = gql`
  query GetWishlistItemById($id: ID!) {
    wishlistItemById(id: $id) {
      id
      wishlist_id
      product_id
      quantity
      created_at
      updated_at
    }
  }
`;

export const queries = {
  GET_USERS_BY_EMAIL,
  GET_USERS_BY_ID,
  GET_WISHLIST_BY_ID,
};
