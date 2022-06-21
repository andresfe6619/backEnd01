const express = require('express')
const  {Router} = require("express");
const router = new Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { append } = require("express/lib/response");

class Contenedor {
    constructor( id) {
        this.Product = [];  
}

async saveObject(object) {
 
    let Ids  
    if (this.Product.length === 0) {
        Ids = 1; 
        
    }
    else {
        Ids = this.Product.length + 1;
    }

    const Objeto6= {...object, id: Ids};
    this.Product.push(Objeto6);
 
//  const guardar = async () => {
//  try{
    await fs.promises.writeFile("./contenedor.json",JSON.stringify( this.Product ) )
    console.log("Producto guardado");
    // } catch(error) {
    //     console.log(error);
    // }
    
// }

// setTimeout(guardar, 3000);
}

async getAll()  {
     
     
    // const getDoc = async () => {  
    //    try{
    const data = (await  fs.promises.readFile("./contenedor.json", "utf-8" ))
       
    console.log("Obteniendo todos los productos")
    return ( data ? JSON.parse(data) : console.log("El archivo no existe o esta vacio"));
        
//    } catch(error) {
//                  console.log(error);
//              }
    // }    
           
    //  getDoc();
}

async getById(Id) {
     // const getId = async () => {  
    //    try{
    const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))
       
    const product = data.find(product => product.id === Number(Id));
    console.log("Obteniendo por Id")  
    return ( product ?  product : {Error: "El producto no existe"} );
        
//    } catch(error) {
//                  console.log(error);
//              }
    // }    
           
    //  getId()
     
}

async updateById(Id, prod) {
     
     
    // const getId = async () => {  
    //    try{
        const data = await this.getAll()
        const newProd = {id: Number(Id), ...prod};
        let index = data.findIndex(product => product.id == Id); 
        // const {title, price, thumbnail} = req.body;
        // actualizarProducto.title = title;
        // actualizarProducto.price = price;
        // actualizarProducto.thumbnail = thumbnail;
        data[index] = newProd;
        console.log('prod actualizado', data);
            await fs.promises.writeFile("./contenedor.json", JSON.stringify(data))
            // return ( actualizarProducto ?  actualizarProducto : {Error: "El producto no existe"});

//    } catch(error) {
//                  console.log(error);
//              }
    // }    
           
    //  getId()
     
}

async deleteById(Id) {
        // const deleteId = async () => {  
        //    try{
    // const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))
    const data = await this.getAll();
    // const productoAeliminar = data.find(product => product.id === Number(Id));
    const newData = data.filter(product => product.id !== Number(Id));
    console.log(newData)
    await fs.promises.writeFile("./contenedor.json",JSON.stringify( newData ) )
    // console.log("Producto eliminado por id")
    // return ( product ?  ( "el producto ha sido eliminado con exito"): ("El producto no existe"));
            //    } catch(error) {
            //                  console.log(error);
            //              }
                // }    
                //  deleteId();
    
    }
    
}


 

const Objeto5 = new Contenedor([]);

// Objeto5.saveObject({title:"Proteina", price: 200, thumbnail:" https://www.protein.com/wp-content/uploads/2019/01/Protein-Logo-1.png" });
//  Objeto5.saveObject  ({title:"Creatina", price: 100, thumbnail:" https://www.creatina.com/wp-content/uploads/2019/01/Creatina-Logo-1.png", });
//  Objeto5.saveObject  ({title:"Pre-workout", price: 50,thumbnail:"https://www.pre-workout.com/wp-content/uploads/2019/01/Pre-Workout-Logo-1.png", });

const showAll = async(req, res) => { 
try {
   
 
        const prods = await Objeto5.getAll()
      
        //ejs
        if (prods.length == 0) {
            res.render("products2.ejs", {prods, });
        } else{
        res.render("products2.ejs", {prods, hasAny: true});
        }
   
    } catch (error) {
        const prods = await Objeto5.getAll()
      
        //EJS
         res.render("products2.ejs", {prods, hasAny: false});
    
    
    }
};

 router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

const newProduct= (req, res) => {
    try {
        const {title, price, thumbnail} = req.body;
        let objeto = {title, price, thumbnail};
        Objeto5.saveObject(objeto);
        // let id = Objeto5.Product.length;
        // res.sendStatus(Objeto5.Product[id-1]);
        res.redirect("/api/productos/Listado");
    } catch (error) {
        console.log(error);
    }
};


const filterId= async(req, res) => {
     try {
         const {id} = req.params;
         const product = await Objeto5.getById(id);
             //   let idRandom= Number(req.params.id)
             //  let idRandom = Math.floor(Math.random() * (3 - 1+1) + 1);
         //  getById(idRandom)
         res.json(product)
     } catch (error) {
        console.log(error)
     }
     
 };

 
const updateById= async(req, res) => {
     try {
        const {id} = req.params;
        const newProd = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        }
        await Objeto5.updateById(id, newProd);
    //   let idRandom= Number(req.params.id)
    //   let idRandom = Math.floor(Math.random() * (3 - 1+1) + 1);
    //   getById(idRandom)
        res.json(newProd);
     } catch (error) {
         console.log(error);
     }
    
}

const deleteById= async(req, res) => {
    try {
        const {id} = req.params;
        await Objeto5.deleteById(id);
        res.json(`El producto con id ${id} ha sido eliminado`);
    }catch (error) {
        res.json(`No se encontró el id ${id}`, error.message);
    }
    //     let idRandom= Number(req.params.id)
      
    //  deleteById(idRandom)

}

 module.exports= { showAll, newProduct, filterId, updateById, deleteById };