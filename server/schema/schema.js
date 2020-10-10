const graphql = require("graphql");
const author = require("../models/author");
let db = require("./../models")


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
            resolve(parent,args){
                return db.Author.findByPk(parent.AuthorId);
            }
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
        resolve(parent,args){
            return db.Book.findAll({ AuthorId: parent.id });
        }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            //like params
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data from db / other source
                return db.Book.findByPk(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return db.Author.findByPk(args.id);                
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return db.Book.findAll({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return db.Author.findAll({});
            }
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
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
              return  db.Author.create({
                    // id:String(uuidv4()),
                    name:args.name,
                    age:args.age
                }).then((author) => author);
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                // FOREIGN KEY (`AuthorId`) 
                AuthorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
               return db.Book.create({
                    // id:String(uuidv4()),
                    name:args.name,
                    genre:args.genre,
                    AuthorId:args.AuthorId
                }).then((book)=>book)
            }
        },
        deleteBook:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                db.Book.destroy({
                    where: {
                      id:args.id,
                    },
                  })
            }
        },
        //delete author with his books check author models->onDelete:"cascade"
        deleteAuthor:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                 db.Author.destroy({
                     where: {
                       id:args.id,
                     },
                   })
         }},
         updateBookData:{
             type:BookType,
             args:{id:{type:GraphQLID},name:{type:GraphQLString},genre:{type:GraphQLString},AuthorId:{type:GraphQLID}},
             resolve(parent,args){
                 async function updateBook(){
                     await db.Book.update({
                        name:args.name,
                        genre:args.genre,
                        AuthorId:args.AuthorId
                    },
                    {
                        where:{id:args.id}
                    }
                    )
                    return db.Book.findByPk(args.id);
                 }
                return updateBook()
             }
         },
        updateAuthorData:{
            type:AuthorType,
            args:{id:{type:GraphQLID},name:{type:GraphQLString},age:{type:GraphQLInt}},
            resolve(parent,args){
               async function updateAuthor(){
                 await db.Author.update({
                    name:args.name,
                    age:args.age
                },
                     {
                         where:{id:args.id}
                     }
                )
                return db.Author.findByPk(args.id)
                }
                 
                return updateAuthor()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})