const express = require('express');
const app = express();
const { Server : IOServer }= require("socket.io")
const rutas = require('./Rutas/index.js');
const { engine } = require('express-handlebars')
const path = require('path');
const  fs  = require('fs');
require("dotenv").config({path: ".env"});
const puerto= process.env.PORT;

const productos = []
const messagesArray = []

const expressServer= app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto '+puerto);
})
const io = new IOServer(expressServer);
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", rutas)

app.use((req, res) => {
  res.status(404).json({error: -2, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Implementada`});
})


function saveMessages(something){
    fs.appendFileSync('messages.txxt', JSON.stringify(something))

}
function saveProducts(somethingElse){

    fs.appendFileSync('contenedor.json', JSON.stringify(somethingElse))
}



io.on('connection', (socket) => { 
  console.log( "un cliente se ha conectado")
socket.emit("server: productos", productos)
socket.emit('server:mensajes', messagesArray)

socket.on ("client: new product", product => {
      productos.push(product)
      
      io.emit("server: productos", productos)
    
    saveProducts(product)
    })
socket.on('client:message', messageInfo => {
      messagesArray.push(messageInfo)
      
      io.emit('server:mensajes', messagesArray)
      saveMessages(messageInfo)
 
    })  


})

//Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')
