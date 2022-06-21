const express = require('express')
const  {Router} = require("express");
const router = new Router();
const {showAll, newProduct, filterId, updateById, deleteById} = require("./controllers/productsController.js");


router.get ("/Listado", showAll)
router.post("/agregar", newProduct)
router.get("/Listado/:id" , filterId)
router.put('/Listado/:id', updateById)
router.delete('/Listado/:id', deleteById)

module.exports = router;