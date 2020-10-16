const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const { directors, movies } = require('./data');
const { resolvers, typeDefs } = require('./schema/schema');
//const movies = require('./models/Movie');
//const directors = require('./models/Director');
// String, Int, ID, Boolean, Float
// Construct a schema, using GraphQL schema language


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
    console.log(`Karantina özel sunucu linki http://localhost:5000${server.graphqlPath}`)
);
