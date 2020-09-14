const graphql = require('graphql');
const _ = require('lodash');

const movies = [
    {
        id: '1',
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        year: 1972,
        directorId: '1'
    },
    {
        id: '2',
        title: 'Scarface',
        description: 'In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
        year: 1980,
        directorId: '3'
    },
    {
        id: '3',
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        year: 1994,
        directorId: '2'
    }
];

const directors = [
    {
        id: '1',
        name: 'Francis Ford Coppola',
        birth: 1939
    },
    {
        id: '2',
        name: 'Quentin Tarantino',
        birth: 1963
    },
    {
        id: '3',
        name: 'Brian De Palma',
        birth: 1940
    }
];


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID
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
        birth: { type: GraphQLInt }
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});