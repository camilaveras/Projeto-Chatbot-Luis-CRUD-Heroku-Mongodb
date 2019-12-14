const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TriagemSchema =  new Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId, // usando o tipo object ID
        auto: true, // é gerado automaticamente?
        required: true // é obrigatório?
    },
    nome :{
        type: String,
        require : true,
        unique: true // incluindo como chave primaria 
    
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

// solicitando ao mongo para criar a collection para validação
//Triagem vai ser o nome da collection no mongo
const TriagemCollection = mongoose.model('Triagem ', TriagemSchema);

// exportando a Schema para outros arquivos utlizarem

module.exports = TriagemCollection