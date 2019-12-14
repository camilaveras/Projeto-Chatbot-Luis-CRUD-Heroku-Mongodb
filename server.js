require('dotenv-extended').load();

//console.log('LUIS URL:', process.env.LUIS_MODEL_URL)

const app = require("./app.js")
const port = process.env.PORT || 3001

app.listen(port, function () {
  // const bot = require("./src/controller/bot")
  console.log(`app está rodando na porta ${port}`)
})

