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
            pre_list
          }
          reserved_gifts {
            id
            name_and_surname
            email
            private_message
            created_at
            updated_at
            wishlist_item_id
          }
        }
        shared_wishlists {
          id
          wishlist_id
          share_token
          created_at
          expires_at
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
      pre_list
      wishlist_items {
        id
        wishlist_id
        additional_description
        product_id
        quantity
        added_at
        updated_at
        reserved_gifts {
          id
          name_and_surname
          email
          private_message
          created_at
          updated_at
          wishlist_item_id
        }
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
          shared_wishlists {
            id
            wishlist_id
            share_token
            created_at
            expires_at
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_LIST = gql`
  query GetProductsList {
    productsList {
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
      pre_list
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
        id
        added_at
        additional_description
        product_id
        quantity
        updated_at
        wishlist_id
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
          pre_list
        }
        reserved_gifts {
          id
          name_and_surname
          email
          private_message
          created_at
          updated_at
          wishlist_item_id
        }
      }
      shared_wishlists {
        id
        wishlist_id
        share_token
        created_at
        expires_at
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
        pre_list
      }
      reserved_gifts {
        id
        name_and_surname
        email
        private_message
        created_at
        updated_at
        wishlist_item_id
      }
    }
  }
`;

export const GET_SHARED_WISHLIST_BY_ID = gql`
  query GetSharedWishlistById($id: ID!) {
    sharedWishlistsById(id: $id) {
      id
      wishlist_id
      share_token
      created_at
      expires_at
    }
  }
`;

export const GET_SHARED_WISHLISTS_BY_WISHLIST_ID = gql`
  query GetSharedWishlistsByWishlistId($wishlist_id: ID!) {
    sharedWishlistsByWishlistId(wishlist_id: $wishlist_id) {
      id
      wishlist_id
      share_token
      created_at
      expires_at
    }
  }
`;

export const GET_SHARED_WISHLISTS_BY_TOKEN = gql`
  query GetSharedWishlistsByToken($share_token: String!) {
    sharedWishlistsByToken(share_token: $share_token) {
      id
      wishlist_id
      share_token
      created_at
      expires_at
    }
  }
`;

export const GET_SHARED_WISHLISTS = gql`
  query GetSharedWishlists {
    sharedWishlistsList {
      id
      wishlist_id
      share_token
      created_at
      expires_at
    }
  }
`;

export const GET_SHARED_WISHLISTS_PAGINATED = gql`
  query GetSharedWishlistsPaginated($first: Int, $after: Int) {
    sharedWishlistsPaginatedList(first: $first, after: $after) {
      id
      wishlist_id
      share_token
      created_at
      expires_at
    }
  }
`;

export const GET_WISHLIST_ITEMS_BY_PRODUCT_ID = gql`
  query GetWishlistItemsByProductId($product_id: ID!) {
    wishlistItemsByProductId(product_id: $product_id) {
      id
      wishlist_id
      product_id
      quantity
      added_at
      updated_at
      reserved_gifts {
        id
        name_and_surname
        email
        private_message
        created_at
        updated_at
        wishlist_item_id
      }
    }
  }
`;

export const GET_PRE_LISTS = gql`
  query GetPreLists {
    preLists {
      pre_list
    }
  }
`;

export const GET_PRODUCTS_BY_PRELIST = gql`
  query GetProductsByPreList($pre_list: String!) {
    productsByPreList(pre_list: $pre_list) {
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
      pre_list
      wishlist_items {
        id
      }
    }
  }
`;

export const queries = {
  GET_USERS_BY_EMAIL,
  GET_USERS_BY_ID,
  GET_PRODUCT_BY_ID,
  GET_WISHLIST_BY_ID,
  GET_WISHLIST_ITEM_BY_ID,
  GET_SHARED_WISHLIST_BY_ID,
  GET_SHARED_WISHLISTS_BY_WISHLIST_ID,
  GET_SHARED_WISHLISTS_BY_TOKEN,
  GET_SHARED_WISHLISTS,
  GET_SHARED_WISHLISTS_PAGINATED,
  GET_WISHLIST_ITEMS_BY_PRODUCT_ID,
  GET_PRODUCTS_LIST,
  GET_PRE_LISTS,
  GET_PRODUCTS_BY_PRELIST,
};