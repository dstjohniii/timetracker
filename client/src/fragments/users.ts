import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment newUser on User {
    id
    name
    email
  }
`;
