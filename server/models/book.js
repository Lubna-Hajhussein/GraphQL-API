module.exports = (Sequelize, DataTypes)=>{
    const Book = Sequelize.define("Book",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey: true
        },
        genre:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })

    Book.associate = models => {
        Book.belongsTo(models.Author,{
            foreignkey:{
                allowNull:false
            }
        })
    }

    return Book
}