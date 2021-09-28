import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($id: Int!) {
    deleteUser(id: $id)
  }
`;
