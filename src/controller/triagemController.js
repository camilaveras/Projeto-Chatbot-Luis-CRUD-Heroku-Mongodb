const triagemCollection = require("../model/triagemSchema")

const getAll = (request, response) => {
  triagemCollection.find((error,triagem)=>{
    if(error){
      return response.status(500).send(error)
    }else{
      return response.status(200).send(triagem)
    }
  })
};

//-----------Get por id >>>>>..

const getById = (request, response) => {
  const idtriagem = request.params.id

  triagemCollection.findById(idtriagem, (error, contato) => {
    if(error) { // deu algum erro no mongo
      return response.status(500).send(error)
    } else {
     // if(contato !== null  && contato!== undefined)
      if(contato) {
        return response.status(200).send(contato)
      } else {
        return response.status(404).send('Contato nao encontrado')
      }
    }
  })
}

//--------POST >>>> Adicionando um novo triagem

const postAdd = (request, response) => {
  // pegando os dados do JSON na request
  const triagemDoBody = request.body
  // validando os dados com o Schema 
  const triagem = new triagemCollection(triagemDoBody)
  // salvando o triagem caso não dê erros
  triagem.save((error) => {


    if (error){
    return response.status(400).send(error)
  }else{
    return response.status(201).send(triagem)
  }
  })
};




//--------Delete >>>>> Deletando um triagem pelo ID 
const deleteById = (request, response) =>{
  const idParametro = request.params.id;
  triagemCollection.findByIdAndRemove(idParametro, (error, triagem) =>{  ;;
    if (error){
      return response.status(500).send(error)
    }else{
      if(triagem){
        return response.status(200).send("triagem excluído com sucesso")
      }
      return response.status(404).send("triagem não encontrado, tente novamente")
    }
  })  
};
//---------UPDATE >>>>>  alterando um triagem pelo id
const updateById = (request, response) =>{
// recebendo o id do triagem que vai ser alterado
  const idParam = request.params.id
  // recebendo os dados do body
  const triagemDoBody = request.body
const options = { new : true }
triagemCollection.findByIdAndUpdate(idParam, triagemDoBody,options, (error, triagem) =>{
    if(error){
      return response.status(500).send(error)
    }else if(triagem) {
      return response.status(200).send(triagem)
    }else{
      return response.sendStatus(404)
    }
  })
};

module.exports = {
  getAll,
  postAdd, 
  deleteById, 
  updateById,
  getById
}
