const express = require("express")
const bodyParser = require("body-parser")

//rotas
const index = require("./src/routes/index")
const triagem = require("./src/routes/triagemRoute")

// bot
const botController = require('./src/controller/botController')

// conectando o banco de dados 
const database = require("./src/model/database")

const app = express()
database.connect()


app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*")
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(bodyParser.json())
app.use("/", index)
app.use("/triagem", triagem)

app.use('/api/messages', botController)


module.exports = app
