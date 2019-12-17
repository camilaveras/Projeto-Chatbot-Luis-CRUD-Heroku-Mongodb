const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TriagemSchema =  new Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId, 
        auto: true, //  coments > é gerado automaticamente?
        required: true // é obrigatório?
    },
    nome :{
        type: String,
        require : true,
        unique: true // coments > incluindo como chave primaria 
    
    },
    cidade:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bairroconsulta:{
        type: String,
        required: true
    },
    
})


const TriagemCollection = mongoose.model('Triagem ', TriagemSchema);

// exportando a Schema para outros arquivos utlizarem

module.exports = TriagemCollection