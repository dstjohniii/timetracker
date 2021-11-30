const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./schema/user");
const resolvers = require("./resolvers/user");
const models = require("./models");

require("dotenv").config({
  path: "../.env",
});
console.log(`process.env`, process.env);
const port = process.env.PORT;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models },
  });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();
