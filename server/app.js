const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
require('dotenv').config({
  path: '../.env'
})

const port = process.env.PORT;

async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  }

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })

  await new Promise((resolve) => app.listen({port}, resolve))
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  return { server, app }
}

startApolloServer();
