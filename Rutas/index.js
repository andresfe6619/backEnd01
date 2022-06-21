
const express = require('express');

const moment = require('moment');
const fs = require('fs'); 

const {Router} = require('express');
const router = Router();
const Productos = require("./Productos.js");



router.get('/home', (req, res) => {
  //res.render("form")  
    res.render('form1.pug');
    ;
});
let visitas=0
router.use((req, res, next) => {
    visitas++
    next()
});

router.get("/visitas", (req, res) => {
     
    res.send(`Cantidad de visitas ${visitas}`);
});

router.get("/fyh", (req, res) => {
    const fecha = moment().format('YYYY-MM-DD');
    res.send(`Hoy es ${fecha}`);
});


router.use("/productos", Productos )

module.exports= router;