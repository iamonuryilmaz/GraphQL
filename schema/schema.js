const graphql = require('graphql');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields : () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie: {
            type: MovieType,
            args: { id: { type:GraphQLString } }, //erişim ne ile olacak ?
            resolve(parent, args){ //parent iki tablo arasındaki ilişkiyi sağlar
                //getdata
            } //DB bağlantıları
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});