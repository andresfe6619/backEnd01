const express = require('express');
const app = express();
const { Server : IOServer }= require("socket.io")
// const rutas = require('./Rutas/index.js');

const path = require('path');
const  fs  = require('fs');

const productos = []
const messagesArray = []

const expressServer= app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
})
const io = new IOServer(expressServer);
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function saveMessages(something){
    fs.appendFileSync('messages.txxt', JSON.stringify(something))

}
function saveProducts(somethingElse){

    fs.appendFileSync('products.txt', JSON.stringify(somethingElse))
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



// const { engine } = require('express-handlebars')
// //Handlebars
// app.engine('hbs', engine({
//     extname: '.hbs',
//     defaultLayout: path.join(__dirname, './views/layouts/main.hbs'),
//     layoutsDir: path.join(__dirname, './views/layout'),
//     partialsDir: path.join(__dirname, './views/partials')
// }))

// app.set('views', path.join(__dirname, './views'))
// app.set('view engine', 'hbs')
