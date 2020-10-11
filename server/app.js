const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema")
const cors = require("cors")

const app = express()

//allow cros-origin requests
app.use(cors())

const bodyParser = require('body-parser')
//cnnect to db
const db = require("./models")
const PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/graphql", graphqlHTTP({
    schema:schema,
    graphiql:true
}))

db.sequelize.sync().then(() =>{
    app.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
    })
})