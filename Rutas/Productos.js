const  {Router} = require("express");
const router = Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { append } = require("express/lib/response");

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
  await  fs.promises.writeFile("./contenedor.json",JSON.stringify( this.Product ) )
  console.log("Producto guardado");
    } catch(error) {
        console.log(error);
    }
    
}

setTimeout(guardar, 3000);
}}

console.log("Añadiendo productos");
const Objeto5 = new Contenedor([]);
Objeto5.saveObject({title:"Proteina", price: 200, thumbnail:" https://www.protein.com/wp-content/uploads/2019/01/Protein-Logo-1.png" });
Objeto5.saveObject  ({title:"Creatina", price: 100, thumbnail:" https://www.creatina.com/wp-content/uploads/2019/01/Creatina-Logo-1.png", });
Objeto5.saveObject  ({title:"Pre-workout", price: 50,thumbnail:"https://www.pre-workout.com/wp-content/uploads/2019/01/Pre-Workout-Logo-1.png", });



router.get ("/Listado", (req, res) => { 
    function getAll()  {
     
     
         const getDoc = async () => {  
            try{
             const data = (await  fs.promises.readFile("./contenedor.json", "utf-8" ))
            
           console.log("Obteniendo todos los productos")
            return ( data ?  res.send(data): console.log("El archivo no existe o esta vacio"));
             
        } catch(error) {
                      console.log(error);
                  }
         }    
                
          getDoc();
     }
 
 getAll()
 }
 
 )
 router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));
 router.post("/agregar", (req, res) => {
  const {title, price, thumbnail} = req.body;
    let objeto = (title, price, thumbnail);
    Objeto5.saveObject({title, price, thumbnail});

let id = Objeto5.Product.length;
    
    res.sendStatus(Objeto5.Product[id-1]);
    });


 router.get("/Listado/:id", (req, res) => {
     function getById(Id) {
     
     
          const getId = async () => {  
             try{
              const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))
             
              const product = data.find(product => product.id === Id);
           console.log("Obteniendo por Id")  
           return ( product ?  res.send( product) : res.send({Error: "El producto no existe"}));
              
         } catch(error) {
                       console.log(error);
                   }
          }    
                 
           getId()
           
         }
          let idRandom= Number(req.params.id)
        //  let idRandom = Math.floor(Math.random() * (3 - 1+1) + 1);
     getById(idRandom)
     
 });
 router.put('/Listado/:id', (req, res) => {
    function getById(Id) {
     
     
        const getId = async () => {  
           try{
            const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))
           const actualizarProducto = data.find(product => product.id === Id); 
            const {title, price, thumbnail} = req.body;
            actualizarProducto.title = title;
            actualizarProducto.price = price;
            actualizarProducto.thumbnail = thumbnail;
                await fs.promises.writeFile("./contenedor.json",JSON.stringify( data ) )
                return ( actualizarProducto ?  res.send(actualizarProducto) : res.send({Error: "El producto no existe"}));

       } catch(error) {
                     console.log(error);
                 }
        }    
               
         getId()
         
       }
        let idRandom= Number(req.params.id)
      //  let idRandom = Math.floor(Math.random() * (3 - 1+1) + 1);
   getById(idRandom)
})

router.delete('/Listado/:id', (req, res) => {
function    deleteById(Id) {
    
    
            const deleteId = async () => {  
               try{
                const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))
               
             
               const product = data.find(product => product.id === Id);
               const newData = data.filter(product => product.id !== Id);
               fs.promises.writeFile("./contenedor.txt",JSON.stringify( newData ) )
               console.log("Producto eliminado por id")
               return ( product ?  res.send( "el producto ha sido eliminado con exito"): res.send("El producto no existe"));
                
           } catch(error) {
                         console.log(error);
                     }
            }    
                   
             deleteId();
        
        }
        let idRandom= Number(req.params.id)
      
     deleteById(idRandom)
    })
 module.exports= router;