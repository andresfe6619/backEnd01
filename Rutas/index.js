
const express= require('express');
const app = express();
const puerto = 8080
const moment = require('moment');
const fs = require('fs'); 
const res = require('express/lib/response');
const {Router} = require('express');
const router = Router();
const Productos = require("./Productos.js");



// deleteById(Id) {
    
    
//     const deleteId = async () => {  
//        try{
//         const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
       
     
//        const product = data.find(product => product.id === Id);
//        const newData = data.filter(product => product.id !== Id);
//        fs.promises.writeFile("./contenedor.txt",JSON.stringify( newData ) )
//        console.log("Producto eliminado por id")
//        return ( product ?  console.log( product): console.log("El producto no existe"));
        
//    } catch(error) {
//                  console.log(error);
//              }
//     }    
           
//      setTimeout(deleteId, 6000);

// }
// deleteAll() {
    
    
//     const deleteAll = async () => {  
//        try{
//         const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
       
     
//        const newData = [];
//        fs.promises.writeFile("./contenedor.txt",JSON.stringify( newData ) )
//        console.log("Todos los Productos han sido eliminados")  
//    } catch(error) {
//                  console.log(error);
//              }
//     }    
           
//      setTimeout(deleteAll, 7000);
// }}



router.get('/home', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
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