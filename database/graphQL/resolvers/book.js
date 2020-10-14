const graphql = require("graphql");
const db = require("./../../models")

module.exports = {
    findAuthorBooks:async(parent,args)=>{
        try{
           const authorBooks =await db.Book.findAll({ 
                where:{AuthorId:parent.id,
                     }
             }).then((books)=>books);
            if(!authorBooks){
                throw new Error('Author does not have any book in your library.');
            }else {
                return authorBooks
            }
        }
        catch (err) {
             throw(err);
          }
    },
    findBookById:async(parent,args)=>{
        //code to get data from db / other source
        try{
            const book =await db.Book.findByPk(args.id);
            //if book is deleted book.deleted should be 1
            if(!book){
                throw new Error('This book is not exist in your library.');
            }else{
                return book
            }
        }
        catch (err) {
            throw(err);;
          }
    },
    findAllBooks:async(parent,args)=>{
        try{
            const books =await db.Book.findAll({});
            if(!books){
                throw new Error('There is no books in your library.');
            }else{
                return books
            }
        }
        catch (err) {
            throw(err);;
          }
    },
    createBook:async(parent,args)=>{
            return db.Book.create({
             // id:String(uuidv4()),
             name:args.name,
             genre:args.genre,
             AuthorId:args.AuthorId
         }).then((book)=>book)
       
     },
     deleteBook:async(parent,args)=>{
          try {
            const book =await db.Book.findAll({
                where:{id:args.id}
            })
            if(!book){
                throw new Error('This book is not exist to delete it!.');
              }else {
              db.Book.destroy({
              where: {
              id:args.id,
               },
               })
              }
          }
          catch(err){
            throw(err);;
        }
        
    },
    updateBook:async(parent,args)=>{
        try {
            const book =await db.Book.findAll({
                where:{name:args.name}
            })
            if(!book){
                throw new Error('This book is not exist to update it!.');
            }else{
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
            }
        
        catch(err){
            throw(err);;
        }
}}