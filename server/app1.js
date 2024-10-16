// graphql package:

// It is the core GraphQL implementation in JavaScript
// It provides the functionality to define GraphQL schemas, parse and validate GraphQL queries, execute queries against a schema, and format responses.
// graphql is not tied to any specific server or client framework • it's a standalone librar that can be used in various JavaScript environments.

// @apollo/server :

// This package is part of the Apollo ecosystem and is used for building GraphQL servers in Node.js.
// It provides tools and utilities to create and manage GraphQL schemas, handle incoming GraphQL requests, execute queries, and send responses.
// @apollo/server is built on top of the popular express framework, making it easy to integrate GraphQL into existing Node.js web applications.
// Overall, @apollo/server simplifies the process of creating and maintaining GraphQL servers in Node.js environments.


//**to use import set --> "type": "module" in the package.json file
import { ApolloServer } from '@apollo/server'; // used to create server
import { startStandaloneServer } from '@apollo/server/standalone'; // used to start server, It is used to start a basic GraphQL server that listens for incoming HTTP requests, handles GraphQL queries and mutations, and responds accordingly. **We won't use this instead we will use express
import mergedTypeDefs from './typeDefs/index.js';
import mergedResolvers from './resolvers/index.js'

// The ApolloServer constructor requires two parameters: your schema definition(i.e typeDefs) and your set of resolvers.

// What is GraphQL Schema?
// A GraphQL schema is a fundamental concept in GraphQL.
// It defines the structure of the data that clients can query and the operations they can perform. A schema in GraphQL typically consists of two main parts: typeDefs and resolvers.

// What are TypeDefs? (or Type Definitions)
// Type definitions define the shape of the data available in the GraphQL API. They specify the types of objects that can be queried and the relationships between them.

// What are Resolvers?
// Resolvers are functions that determine how to fetch the data associated with each field in the schema.
// Resolvers in GraphQL are functions that provide the data for your GraphQL queries and mutations. They explain how to get the actual data when someone asks for it through a query.

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);