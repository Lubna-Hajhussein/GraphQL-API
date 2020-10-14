const graphql = require("graphql");
const db = require("./../../models")
const authorResolvers = require("./../resolvers/author")
const bookResolvers = require("./../resolvers/book")


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql


const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve:authorResolvers.findBookAuthor
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
        type:new GraphQLList(BookType),
        resolve:bookResolvers.findAuthorBooks
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"ViewTypeOfQueries",
    fields:{
        book:{
            type:BookType,
            //like params
            args:{id:{type:GraphQLID}},
            resolve:bookResolvers.findBookById
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve:authorResolvers.findAuthorById
        },
        books:{
            type:new GraphQLList(BookType),
            resolve:bookResolvers.findAllBooks
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve:authorResolvers.findAllAuthors
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
            },
            resolve:authorResolvers.createAuthor
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                // FOREIGN KEY (`AuthorId`) 
                AuthorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve:bookResolvers.createBook
        },
        deleteBook:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve:bookResolvers.deleteBook
        },
        //delete author with his books check author models->onDelete:"cascade"
        deleteAuthor:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve:authorResolvers.deleteAuthor},
        updateBookData:{
             type:BookType,
             args:{id:{type:GraphQLID},name:{type:GraphQLString},genre:{type:GraphQLString},AuthorId:{type:GraphQLID}},
             resolve:bookResolvers.updateBook
         },
        updateAuthorData:{
            type:AuthorType,
            args:{id:{type:GraphQLID},name:{type:GraphQLString},age:{type:GraphQLInt}},
            resolve:authorResolvers.updateAuthor
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})