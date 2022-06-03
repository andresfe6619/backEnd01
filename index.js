const http = require('http');
const express= require('express');
const app = express();
const puerto = 8080
const moment = require('moment');
const fs = require('fs'); 
const res = require('express/lib/response');

class Contenedor {
    constructor( id) {
        this.Product = [];
      
        
}


saveObject(object) {
 
let Ids  
if (this.Product.length === 0) {
    Ids = 1; 
    
}
else {
    Ids = this.Product.length + 1;
}

const Objeto6= {...object, id: Ids};
this.Product.push(Objeto6);
 
 const guardar = async () => {
 try{
  await  fs.promises.writeFile("./contenedor.txt",JSON.stringify( this.Product ) )
  console.log("Producto guardado");
    } catch(error) {
        console.log(error);
    }
    
}

setTimeout(guardar, 3000);
}}


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
console.log("Añadiendo productos");
const Objeto5 = new Contenedor([]);
Objeto5.saveObject({title:"Proteina", price: 200, thumbnail:" https://www.protein.com/wp-content/uploads/2019/01/Protein-Logo-1.png" });
Objeto5.saveObject  ({title:"Creatina", price: 100, thumbnail:" https://www.creatina.com/wp-content/uploads/2019/01/Creatina-Logo-1.png", });
Objeto5.saveObject  ({title:"Pre-workout", price: 50,thumbnail:"https://www.pre-workout.com/wp-content/uploads/2019/01/Pre-Workout-Logo-1.png", });








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
app.use((req, res, next) => {
    visitas++
    next()
});

app.get("/visitas", (req, res) => {
     
    res.send(`Cantidad de visitas ${visitas}`);
});

app.get("/fyh", (req, res) => {
    const fecha = moment().format('YYYY-MM-DD');
    res.send(`Hoy es ${fecha}`);
});

app.get ("/productos", (req, res) => { 
   function getAll()  {
    
    
        const getDoc = async () => {  
           try{
            const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
           
          console.log("Obteniendo todos los productos")
           return ( data ?  res.send(data): console.log("El archivo no existe o esta vacio"));
            
       } catch(error) {
                     console.log(error);
                 }
        }    
               
         setTimeout(getDoc, 1000);
    }

getAll()
}

)

app.get("/productosRandom", (req, res) => {
    function getById(Id) {
    
    
         const getId = async () => {  
            try{
             const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
            
             const product = data.find(product => product.id === Id);
          console.log("Obteniendo por Id")  
          return ( product ?  res.send( product) : console.log("El producto no existe"));
             
        } catch(error) {
                      console.log(error);
                  }
         }    
                
          setTimeout(getId, 2000);
          
        }
    let idRandom = Math.floor(Math.random() * (3 - 1+1) + 1);
    getById(idRandom)
    
});
