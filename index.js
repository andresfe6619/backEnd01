const http = require('http');
const express= require('express');
const app = express();
const puerto = 8080
const moment = require('moment');
app.listen (puerto, (error) => {
   
  if (error) {
    console.log('Hubo un error');
  }else {
    console.log(`Servidor corriendo en el puerto ${puerto}`);}
});

app.get('/', (req, res) => {
    res.send("<h1 style= color:blue>Bienvenidos al servidor express</h1>"
    );
});


let visitas=0
app.get("/visitas", (req, res) => {
     visitas++
    res.send(`Cantidad de visitas ${visitas}`);
});

app.get("/fyh", (req, res) => {
    const fecha = moment().format('YYYY-MM-DD');
    res.send(`Hoy es ${fecha}`);
});



