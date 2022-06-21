const express = require('express');
const app = express();

const rutas = require('./Rutas/index.js');
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Pug
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')




app.use("/api", rutas);

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
})
