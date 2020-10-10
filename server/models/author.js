module.exports = (sequelize,DataTypes)=>{
    const Author  = sequelize.define("Author",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
             type:DataTypes.STRING,
             allowNull:false,
         },
        age:{
            type:DataTypes.INTEGER(11),
            allowNull:false,
        }
    })

    Author.associate = models => {

        Author.hasMany(models.Book,{
            onDelete:"cascade"
        })
    }

    return Author
}