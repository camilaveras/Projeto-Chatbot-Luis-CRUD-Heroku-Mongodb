const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const controller = require("../controller/triagemController")


router.get("/", controller.getAll)
router.post("/criar", controller.postAdd)
router.get("/id/:id", controller.getById)
router.delete("/deletar/:id", controller.deleteById)
router.patch("/atualizar/:id" ,controller.updateById)


module.exports = router
