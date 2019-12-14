const mongoose = require("mongoose");
// DB_URL é a string de conexão
const DB_URI=process.env.MONGODB_URI

// const DB_URI='mongodb://heroku_sfbcj2x3:ssl6l84rr4hq0s5o9t07b81et8@ds241968.mlab.com:41968/heroku_sfbcj2x3'


// const DB_URI = 'mongodb://localhost:27017/ADA';

process.env.PORT

const connect = () => {
    mongoose.connect(DB_URI, {useNewUrlParser: true});
    const connection = mongoose.connection;
    // mensagem caso a conexão dê erro 
    connection.on('error', () => console.error("Erro ao se conectar no mongo"))
    //mensagem caso a conexão dê certo
    connection.once('open', () => console.log('Conectamos ao mongo!'))
}
module.exports = {
    connect
}



