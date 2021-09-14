const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    user(id: Int!): User
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
