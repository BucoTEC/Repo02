import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

const app = express();

// type def locate tipes of data and what should mutations and queries return
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
    books: [Book]
  }

  type User {
    id: ID
    name: String
  }

  type Query {
    books: [Book]
    authors: [Author]
    user(id: ID!): User
  }
`;

// dummy data

const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet'
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy'
  }
];

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

const authors = [{ name: 'safet' }];
// reslovers hanlde logice form quries and mutations
const resolvers = {
  Query: {
    books: () => books,

    authors: () => authors,

    user: (_, args) => {
      return users.find((user) => user.id === args.id);
    }
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
