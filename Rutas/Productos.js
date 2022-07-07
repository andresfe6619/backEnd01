const express = require('express')
const  {Router} = require("express");
const router = new Router();
const {showAll, newProduct, filterId, updateById, deleteById} = require("./controllers/productsController.js");
const checkAdmin = require("./Controllers/chekAdmin.js");
const ADMIN= true

const checking = checkAdmin(ADMIN)

router.get("/Listado/:id" , filterId)
router.get ("/Listado", showAll)

router.use(checking)
router.post("/agregar",  newProduct)
router.put('/Listado/:id', updateById)
router.delete('/Listado/:id', deleteById)


module.exports = router;