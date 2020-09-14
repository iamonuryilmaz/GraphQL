const graphql = require('graphql');
const _ = require('lodash');

//Mongo DB Models

const Movie = require('../models/Movie');
const Director = require('../models/Director');



const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields : () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
        director:{
            type: DirectorType,
            resolve(parent, args){
                //console.log(parent)
                return _.find(directors, { id: parent.directorId });
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields : () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
        movies:{
            type: new GraphQLList(MovieType),//çoklu data olacağından GraphQLList kullanıldı.
            resolve(parent, args){
                return _.filter(movies, { directorId : parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie: {
            type: MovieType,
            args: { id: { type:GraphQLID } }, //erişim ne ile olacak ?
            resolve(parent, args){ //parent iki tablo arasındaki ilişkiyi sağlar
                return _.find(movies, { id: args.id });
            } //DB bağlantıları
        },
        director: {
            type: DirectorType,
            args: { id: { type:GraphQLID } },
            resolve(parent, args){
                return _.find(directors, { id: args.id });
            }
        },
        movies: {
            type : new GraphQLList(MovieType),
            resolve(parent, args){
                return movies
            }
        },
        directors: {
            type : new GraphQLList(DirectorType),
            resolve(parent, args){
                return directors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});