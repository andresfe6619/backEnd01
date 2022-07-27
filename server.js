import express from 'express';
const app = express();
import  { Server } from "socket.io"
import rutas from './Rutas/index.js';
import { engine }  from 'express-handlebars'
import path from 'path';
import   fs  from 'fs' ;
import dotenv from "dotenv";
dotenv.config({path: ".env"});
const puerto= process.env.PORT;

import{contenedorProductos}  from './public/DB/MariaDB/contenedor.js';
const ArrayProductos = [];
import {ContenedorMensajes} from './public/DB/SQLite/contenedor.js';
const expressServer= app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto '+puerto);
})
const io = new Server(expressServer);
app.use(express.static(path.join('./public')))
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



io.on('connection', async (socket) => { 
  console.log( "un cliente se ha conectado")

const products = await contenedorProductos.getAll()
const messages = await ContenedorMensajes.getAllSQL()

  socket.emit("server: productos", products)
  socket.emit('server:mensajes', messages)

socket.on ("client: new product", async product => {
  await  contenedorProductos.save(product)
  
  io.emit("server: productos", products)})
    
socket.on('client:message', async messageInfo => {
  await ContenedorMensajes.saveSQL(messageInfo)
      
      io.emit('server:mensajes', messages)
    
 
    })  

  })


//Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join( './views/layouts/main.hbs'),
    layoutsDir: path.join( './views/layout'),
    partialsDir: path.join( './views/partials')
}))

app.set('views', path.join( './views'))
app.set('view engine', 'hbs')
