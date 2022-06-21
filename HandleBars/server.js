const express = require('express');
const app = express();

const rutas = require('./Rutas/index.js');
const path = require('path')

const { engine } = require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')



app.use("/api", rutas);

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
})
