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
    if(error) { 
      return response.status(500).send(error)
    } else {
      if(contato) {
        return response.status(200).send(contato)
      } else {
        return response.status(404).send('Triagem não encontrada')
      }
    }
  })
}

//--------POST >>>> Adicionando uma nova triagem

const postAdd = (request, response) => {
  const triagemDoBody = request.body

  const triagem = new triagemCollection(triagemDoBody)

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
        return response.status(200).send("triagem foi excluida com sucesso")
      }
      return response.status(404).send("triagem não foi encontrado, por favor tente novamente")
    }
  })  
};
//---------UPDATE >>>>>  alterando um triagem pelo id
const updateById = (request, response) =>{

  const idParam = request.params.id

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
