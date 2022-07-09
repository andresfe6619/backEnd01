const express = require('express')
const  {Router} = require("express");
const router = new Router();
const {getAllFromCarro, newProduct,  addProductById, deleteById, deleteByIdCart, saveCart} = require("./controllers/carroController.js");
const checkAdmin = require("./Controllers/chekAdmin.js");
const ADMIN= true

const checking = checkAdmin(ADMIN)


router.post("/addcart", saveCart)
router.post("/agregar",checking, newProduct)
router.get("/:id/Listado" , getAllFromCarro)
router.post('/agregar/:id',checking, addProductById) 
router.delete('/:id',checking, deleteById)
router.delete("/:id/Listado/:id_prod",checking, deleteByIdCart)

module.exports = router;