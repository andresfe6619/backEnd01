const express = require('express');




const app = express();
const rutas = require('./Rutas/index.js');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", rutas);
app.listen(8080, () => {

    console.log('Servidor corriendo en el puerto 8080');
})
