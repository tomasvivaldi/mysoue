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

export const ADD_CAREER_WORK_INFO = gql`
  mutation AddCareerWorkInfo(
    $username: String!
    $score: Float!
    $notes: String!
    $action_plan: String!
    $goals: JSON
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertCareer_work(
      username: $username
      score: $score
      notes: $notes
      action_plan: $action_plan
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      username
      score
      notes
      action_plan
      goals
      user_ref
    }
  }
`;

export const ADD_ADVICE = gql`
  mutation AddAdviceInfo(
    $career_work_feedback: String!
    $career_work_advice1: String!
    $career_work_advice2: String!
    $career_work_advice3: String!
    $career_work_advice4: String!
    $career_work_advice5: String!
    $community_feedback: String!
    $community_advice1: String!
    $community_advice2: String!
    $community_advice3: String!
    $community_advice4: String!
    $community_advice5: String!
    $environment_feedback: String!
    $environment_advice1: String!
    $environment_advice2: String!
    $environment_advice3: String!
    $environment_advice4: String!
    $environment_advice5: String!
    $family_friends_feedback: String!
    $family_friends_advice1: String!
    $family_friends_advice2: String!
    $family_friends_advice3: String!
    $family_friends_advice4: String!
    $family_friends_advice5: String!
    $fun_relaxation_feedback: String!
    $fun_relaxation_advice1: String!
    $fun_relaxation_advice2: String!
    $fun_relaxation_advice3: String!
    $fun_relaxation_advice4: String!
    $fun_relaxation_advice5: String!
    $growth_learning_feedback: String!
    $growth_learning_advice1: String!
    $growth_learning_advice2: String!
    $growth_learning_advice3: String!
    $growth_learning_advice4: String!
    $growth_learning_advice5: String!
    $health_fitness_feedback: String!
    $health_fitness_advice1: String!
    $health_fitness_advice2: String!
    $health_fitness_advice3: String!
    $health_fitness_advice4: String!
    $health_fitness_advice5: String!
    $money_finances_feedback: String!
    $money_finances_advice1: String!
    $money_finances_advice2: String!
    $money_finances_advice3: String!
    $money_finances_advice4: String!
    $money_finances_advice5: String!
    $partner_love_feedback: String!
    $partner_love_advice1: String!
    $partner_love_advice2: String!
    $partner_love_advice3: String!
    $partner_love_advice4: String!
    $partner_love_advice5: String!
    $spirituality_feedback: String!
    $spirituality_advice1: String!
    $spirituality_advice2: String!
    $spirituality_advice3: String!
    $spirituality_advice4: String!
    $spirituality_advice5: String!
    $recorded_at: DateTime!
    $user_ref: Int!
  ) {
    insertCareer_work_feedback(
      # $ is for the variables
      feedback: $career_work_feedback
      advice1: $career_work_advice1
      advice2: $career_work_advice2
      advice3: $career_work_advice3
      advice4: $career_work_advice4
      advice5: $career_work_advice5
      goals: $goals
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertCommunity_feedback(
      # $ is for the variables
      feedback: $community_feedback
      advice1: $community_advice1
      advice2: $community_advice2
      advice3: $community_advice3
      advice4: $community_advice4
      advice5: $community_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertEnvironment_feedback(
      # $ is for the variables
      feedback: $environment_feedback
      advice1: $environment_advice1
      advice2: $environment_advice2
      advice3: $environment_advice3
      advice4: $environment_advice4
      advice5: $environment_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertFamily_friends_feedback(
      # $ is for the variables
      feedback: $family_friends_feedback
      advice1: $family_friends_advice1
      advice2: $family_friends_advice2
      advice3: $family_friends_advice3
      advice4: $family_friends_advice4
      advice5: $family_friends_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertFun_relaxation_feedback(
      # $ is for the variables
      feedback: $fun_relaxation_feedback
      advice1: $fun_relaxation_advice1
      advice2: $fun_relaxation_advice2
      advice3: $fun_relaxation_advice3
      advice4: $fun_relaxation_advice4
      advice5: $fun_relaxation_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertGrowth_learning_feedback(
      # $ is for the variables
      feedback: $growth_learning_feedback
      advice1: $growth_learning_advice1
      advice2: $growth_learning_advice2
      advice3: $growth_learning_advice3
      advice4: $growth_learning_advice4
      advice5: $growth_learning_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertHealth_fitness_feedback(
      # $ is for the variables
      feedback: $health_fitness_feedback
      advice1: $health_fitness_advice1
      advice2: $health_fitness_advice2
      advice3: $health_fitness_advice3
      advice4: $health_fitness_advice4
      advice5: $health_fitness_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertMoney_finances_feedback(
      # $ is for the variables
      feedback: $money_finances_feedback
      advice1: $money_finances_advice1
      advice2: $money_finances_advice2
      advice3: $money_finances_advice3
      advice4: $money_finances_advice4
      advice5: $money_finances_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertPartner_love_feedback(
      # $ is for the variables
      feedback: $partner_love_feedback
      advice1: $partner_love_advice1
      advice2: $partner_love_advice2
      advice3: $partner_love_advice3
      advice4: $partner_love_advice4
      advice5: $partner_love_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
    insertSpirituality_feedback(
      # $ is for the variables
      feedback: $spirituality_feedback
      advice1: $spirituality_advice1
      advice2: $spirituality_advice2
      advice3: $spirituality_advice3
      advice4: $spirituality_advice4
      advice5: $spirituality_advice5
      recorded_at: $recorded_at
      user_ref: $user_ref
    ) {
      # Same as db table
      feedback
      advice1
      advice2
      advice3
      advice4
      advice5
      recorded_at
      user_ref
    }
  }
`;

export const ADD_USER_PREFERENCES = gql`
  mutation AddUserPreferences(
    $use_case: String!
    $reminder_date: String!
    $user_ref: Int!
    $recorded_at: DateTime
  ) {
    insertUserPreferences(
      use_case: $use_case
      reminder_date: $reminder_date
      user_ref: $user_ref
      recorded_at: $recorded_at
    ) {
      id
      use_case
      reminder_date
      user_ref
      recorded_at
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
  ADD_CAREER_WORK_INFO,
  ADD_USERS,
  ADD_USER_PREFERENCES,
  ADD_ADVICE,
  UPDATE_USER_SUBSCRIPTION,
};
