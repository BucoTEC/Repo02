import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

const app = express();

// type def locate tipes of data and what should mutations and queries return
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// dummy data
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
];

// reslovers hanlde logice form quries and mutations
const resolvers = {
  Query: {
    books: () => books
  }
};

const startServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 5000;

  app.listen(PORT, () => {
    console.log(`Server is operational on port: ${PORT}`);
  });
};

startServer(typeDefs, resolvers);
