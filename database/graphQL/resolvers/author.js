const graphql = require("graphql");
const db = require("./../../models")

module.exports = {
    // from parent 
 findBookAuthor:async(parent,args)=>{
        try{
            const author =await db.Author.findByPk(parent.AuthorId);
            if(!author){
                throw new Error('This author is not exist in your library.');
            }else{
                return author
            }
        }
        catch (err) {
            throw(err);
          }
  },
  findAuthorById:async(parent,args)=>{
    try{
        const author =await db.Author.findByPk(args.id);   
        if(!author){
            throw new Error('This author is not exist in your library.');
        }else{
            return author
        }
    }
    catch (err) {
        throw(err);
      }              
  },
  findAllAuthors:async(parent,args)=>{
    try{
        const authors =await db.Author.findAll({});
        if(!authors){
            throw new Error('There is no authors in your library.');
        }else{
            return authors
        }
    }
    catch (err) {
        throw(err);
      }
  },
    createAuthor:async(parent,args)=>{

          return db.Author.create({ 
             name:args.name,
             age:args.age,
       }).then((author)=>author)

  },
  deleteAuthor:async(parent,args)=>{
    try {
        const author =await db.Author.findAll({
            where:{id:args.id}
        })
        if(!author){
            throw new Error('This author is not exist to delete it!.');
          }else {
              db.Author.destroy({
               where: {
                 id:args.id,
                  },
             })
          }
      }
      catch(err){
        throw(err);
    }
 
    },
  updateAuthor:async(parent,args)=>{
      try{
        const author =await db.Author.findAll({
            where:{name:args.name}
        })
        if(!author){
            throw new Error('This author is not exist to update it!.');
        }else{
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
      
       catch(err){
        throw(err);
    }
 
   
}}