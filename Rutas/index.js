import express from "express";

import moment from 'moment';
import fs from 'fs'; 

import {Router} from 'express';
const  router = Router();
import carro from './carro.js';
import Productos from "./Productos.js";



router.get('/home', (req, res) => {
  //handlebars
    res.render("form")  
   



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
router.use("/carro", carro )
export default router;