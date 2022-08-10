import express from 'express';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import  { Server } from "socket.io"
import rutas from './Rutas/index.js';
import { engine }  from 'express-handlebars'
import path from 'path';
import   fs  from 'fs' ;
import {normalizeM, denormalizeM} from  './normalizr.js';
import dotenv from "dotenv";
dotenv.config({path: ".env"});
const puerto= process.env.PORT;

import{contenedorProductos}  from './DB/MariaDB/contenedor.js';

import chatDao from './DB/mongoChat/ChatDao.js';

const chat = new chatDao();

const expressServer= app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto '+puerto);
})
const io = new Server(expressServer);
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://Andres:Andres@cluster0.vor56.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
    maxAge: 10000,
    },
  })
);
app.use("/api", rutas)

app.use((req, res) => {
  res.status(404).json({error: -2, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Implementada`});
})




io.on("connection", async (socket) => { 
  console.log( "un cliente se ha conectado")

const products = await contenedorProductos.getAll()
const messages = await chat.getAll()
const nos=  JSON.stringify(messages).length
const normalize = normalizeM(messages)
const denormalize = denormalizeM(normalize)
const longitudNormalized = JSON.stringify(normalize).length;
const longitudDenormalized = JSON.stringify(denormalize).length;
const Optimization = (100- (longitudNormalized * 100) / nos).toFixed();   
console.log (longitudNormalized)
console.log (longitudDenormalized)
console.log (nos)
//console.log(`normalizados: ${JSON.stringify(normalize)}`)
socket.emit("server: productos", products)
socket.emit('server:mensajes', messages)
socket.emit("server:porcentajes", Optimization)

socket.on ("client: new product", async product => {
  await  contenedorProductos.save(product)
   
  io.emit("server: productos", products)})
    
socket.on('client:message', async author12 => {
  const message = {author: {id : author12.id , nombre: author12.nombre , apellido: author12.apellido , edad : author12.edad, alias: author12.alias , avatar: author12.avatar}, Message: author12.Message}
console.log(`Mensaje nuevo : ${message}`)

await chat.save(message) 
  
 io.emit('server:mensajes', messages)

})
})
//Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname,  './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')
