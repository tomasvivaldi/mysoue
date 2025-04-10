import { gql } from "@apollo/client";

export const ADD_USERS = gql`
  mutation AddUsersInfo(
    $created_at: DateTime
    $email: String!
    $oauth_provider: String
    $password_hash: String
    $profile_picture_url: String
    $username: String
    $first_name: String
    $last_name: String
    $gender: String
    $birthdate: Date
  ) {
    insertUsers(
      email: $email
      password_hash: $password_hash
      oauth_provider: $oauth_provider
      created_at: $created_at
      username: $username
      profile_picture_url: $profile_picture_url
      first_name: $first_name
      last_name: $last_name
      gender: $gender
      birthdate: $birthdate
    ) {
      id
      email
      username
      oauth_provider
      password_hash
      profile_picture_url
      created_at
      updated_at
      first_name
      last_name
      gender
      birthdate
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
    $product_id: ID
    $external_product_id: ID
    $quantity: Int!
    $created_at: DateTime
  ) {
    insertWishlistItem(
      wishlist_id: $wishlist_id
      product_id: $product_id
      external_product_id: $external_product_id
      quantity: $quantity
      created_at: $created_at
    ) {
      id
      wishlist_id
      product_id
      external_product_id
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

export const ADD_EXTERNAL_PRODUCT = gql`
  mutation AddExternalProduct(
    $product_name: String!
    $product_description: String!
    $price: Float!
    $image_url: String
    $category: String!
    $brand: String
    $store_link: String!
    $created_at: DateTime!
    $updated_at: DateTime!
  ) {
    insertExternalProduct(
      product_name: $product_name
      product_description: $product_description
      price: $price
      image_url: $image_url
      category: $category
      brand: $brand
      store_link: $store_link
      created_at: $created_at
      updated_at: $updated_at
    ) {
      id
      product_name
      product_description
      price
      image_url
      category
      brand
      store_link
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

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo(
    $email: String!
    $first_name: String
    $last_name: String
    $birthdate: Date
    $gender: String
  ) {
    updateUsers(
      email: $email
      first_name: $first_name
      last_name: $last_name
      birthdate: $birthdate
      gender: $gender
    ) {
      id
      email
      first_name
      last_name
      birthdate
      gender
      updated_at
    }
  }
`;

export const DELETE_SHARED_WISHLIST = gql`
  mutation DeleteSharedWishlist(
    $id: ID!
    $wishlist_id: ID!
    $share_token: String!
    $created_at: DateTime!
    $expires_at: DateTime!
  ) {
    deleteSharedWishlists(
      id: $id
      wishlist_id: $wishlist_id
      share_token: $share_token
      created_at: $created_at
      expires_at: $expires_at
    ) {
      id
    }
  }
`;

export const INSERT_SHARED_WISHLIST = gql`
  mutation InsertSharedWishlist(
    $wishlist_id: ID!
    $share_token: String!
    $created_at: DateTime
    $expires_at: DateTime
  ) {
    insertSharedWishlists(
      wishlist_id: $wishlist_id
      share_token: $share_token
      created_at: $created_at
      expires_at: $expires_at
    ) {
      id
      wishlist_id
      share_token
      created_at
      expires_at
    }
  }
`;

export const UPDATE_SHARED_WISHLIST = gql`
  mutation UpdateSharedWishlist(
    $id: ID!
    $share_token: String
    $expires_at: DateTime
  ) {
    updateSharedWishlists(
      id: $id
      share_token: $share_token
      expires_at: $expires_at
    ) {
      id
      wishlist_id
      share_token
      expires_at
    }
  }
`;

// New mutation for ReservedGifts
export const ADD_RESERVED_GIFT = gql`
  mutation AddReservedGift(
    $name_and_surname: String!
    $email: String!
    $private_message: String
    $wishlist_item_id: ID!
    $created_at: DateTime
    $updated_at: DateTime
  ) {
    insertReservedGifts(
      name_and_surname: $name_and_surname
      email: $email
      private_message: $private_message
      wishlist_item_id: $wishlist_item_id
      created_at: $created_at
      updated_at: $updated_at
    ) {
      id
      name_and_surname
      email
      private_message
      wishlist_item_id
      created_at
      updated_at
    }
  }
`;

export const INSERT_WISHLIST_ITEMS = gql`
  mutation InsertWishlistItems(
    $wishlist_id: ID!
    $product_id: ID
    $external_product_id: ID
    $quantity: Int!
    $additional_description: String
    $updated_at: DateTime!
    $added_at: DateTime!
  ) {
    insertWishlist_items(
      wishlist_id: $wishlist_id
      product_id: $product_id
      external_product_id: $external_product_id
      quantity: $quantity
      additional_description: $additional_description
      updated_at: $updated_at
      added_at: $added_at
    ) {
      id
      wishlist_id
      product_id
      external_product_id
      quantity
      additional_description
      updated_at
      added_at
    }
  }
`;

export const DELETE_WISHLISTS = gql`
  mutation DeleteWishlists($id: ID!) {
    deleteWishlists(id: $id) {
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

export const DELETE_WISHLIST_ITEMS = gql`
  mutation DeleteWishlistItems(
    $id: ID!
  ) {
    deleteWishlist_items(
      id: $id
    ) {
      id
    }
  }
`;

export const UPDATE_WISHLIST_ITEMS = gql`
  mutation UpdateWishlistItems(
    $id: ID!
    $quantity: Int
    $wishlist_id: ID
    $additional_description: String
    $product_id: ID
    $external_product_id: ID
    $updated_at: DateTime
    $added_at: DateTime
  ) {
    updateWishlist_items(
      id: $id
      quantity: $quantity
      wishlist_id: $wishlist_id
      additional_description: $additional_description
      product_id: $product_id
      external_product_id: $external_product_id
      updated_at: $updated_at
      added_at: $added_at
    ) {
      id
      wishlist_id
      product_id
      external_product_id
      quantity
      additional_description
      updated_at
      added_at
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($email: String!, $new_password_hash: String!) {
    updateUserPassword(email: $email, new_password_hash: $new_password_hash)
      @dbquery(
        type: "postgresql",
        schema: "public",
        query: """
          UPDATE users
          SET password_hash = $2, updated_at = NOW()
          WHERE email = $1
          RETURNING *;
        """,
        configuration: "stepzen_config"
      ) {
        id
        email
        password_hash
        updated_at
      }
  }
`;

export const UPDATE_RESET_TOKEN_MUTATION = gql`
  mutation UpdateResetToken($email: String!, $reset_password_token: String!, $reset_password_expires: DateTime!) {
    updateResetToken(email: $email, reset_password_token: $reset_password_token, reset_password_expires: $reset_password_expires)
      @dbquery(
        type: "postgresql",
        schema: "public",
        query: """
          UPDATE users
          SET reset_password_token = $2, reset_password_expires = $3, updated_at = NOW()
          WHERE email = $1
          RETURNING id, email, reset_password_token, reset_password_expires, updated_at;
        """,
        configuration: "stepzen_config"
      ) {
      id
      email
      reset_password_token
      reset_password_expires
      updated_at
    }
  }
`;

export const mutations = {
  ADD_USERS,
  ADD_USER_PREFERENCES,
  UPDATE_USER_SUBSCRIPTION,
  ADD_RESERVED_GIFT,
  ADD_EXTERNAL_PRODUCT,
  UPDATE_RESET_TOKEN_MUTATION
};