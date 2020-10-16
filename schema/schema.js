const graphql = require('graphql');
const _ = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');
const { directors, movies } = require('../data');
//Mongo DB Models


const typeDefs= gql`
  type Query {
  	director(id: ID!): Director!
  	directors: [Director!]!
  	
  	movie(id: ID!): Movie!
  	movies: [Movie!]!
  }
  
  type Director {
  	id: ID!
  	name: String!
  	birth: Int
  	movies: [Movie!]!
  }
  
  type Movie {
  	id: ID!
  	title: String!
  	description: String
  	year: Int!
  	director: Director!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        director: (parent, args) => {
            return directors.find(director => director.id === args.id)
        },
        directors: () => directors,

        movie: (parent, args) => {
            return movies.find(movie => movie.id === args.id)
        },
        movies: () => movies
    },
    Movie: {
        director: (parent, args) => {
            return directors.find(director => director.id === parent.directorId)
        }
    },
    Director: {
        movies: (parent, args) => {
            return movies.filter(movie => movie.directorId === parent.id)
        }
    }
};

module.exports ={ typeDefs , resolvers};
