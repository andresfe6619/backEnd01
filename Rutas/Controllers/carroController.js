const express = require('express')
const  {Router} = require("express");
const router = new Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { append } = require("express/lib/response");

class Contenedor {
    constructor( id) {
        this.Carrito = [];  
}

async saveObject(object) {
 
    let Ids  
    if (this.Carrito.length === 0) {
        Ids = 1; 
        
    }
    else {
        Ids = this.Carrito.length + 1;
    }
    let timeStamp =  Date()
    
    const Objeto6= {...object, id: Ids, timeStamp: timeStamp};
    this.Carrito.push(Objeto6);
    await fs.promises.writeFile("./contenedor2.json",JSON.stringify( this.Carrito ) )
    console.log("Producto guardado");
}
// NO FUNCIONA COMO DEBERIA
async addProductIntoCarro(product) {
    const data =JSON.parse (await  fs.promises.readFile("./contenedor2.json", "utf-8" ))
    
    let prod = []
    prod.push ({data , producto: []  })
    prod[0].producto.push({...product})
    

    await fs.promises.writeFile("./carritoContenedor.json", JSON.stringify( prod) )
    console.log("Producto agregado al carro");
}


async getAll()  {
     
    const data = (await  fs.promises.readFile("./carritoContenedor.json", "utf-8" ))
       
    console.log("Obteniendo todos los productos")
    return ( data ? JSON.parse(data) : console.log("El archivo no existe o esta vacio"));       
}
async getAllToErase()  {
     
    const data = (await  fs.promises.readFile("./contenedor2.json", "utf-8" ))
       
    console.log("Obteniendo todos los productos")
    return ( data ? JSON.parse(data) : console.log("El archivo no existe o esta vacio"));       
}

async addFromdb(Id) {
    const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))
    const product = data.find(product => product.id === Number(Id));
    return ( product ? product  : {Error : "El archivo no existe o esta vacio"});
}

async getById(Id) {

    const data = JSON.parse(await  fs.promises.readFile("./contenedor2.json", "utf-8" ))     
    const product = data.find(product => product.id === Number(Id));
    console.log("Obteniendo por Id")  
    return ( product ?  product : {Error: "El producto no existe"} );      
    

}
//NO FUNCIONA
async getByIdFromdb(Id, id_prod) {
    const data = JSON.parse(await  fs.promises.readFile("./carritoContenedor.json", "utf-8" ))     
    const product = data.find(product => product.id === Number(Id)); 
     if(product === undefined){
        return console.log(product)
 }else{
    const newData = data.filter(product => product.id !== Number(id_prod));
    await fs.promises.writeFile("./carritoContenedor.json",JSON.stringify( newData ) )
 } 
   
    


}

async getByIdProd(Id) {

    const data = JSON.parse(await  fs.promises.readFile("./contenedor.json", "utf-8" ))     
    const product = data.find(product => product.id === Number(Id));
    console.log("Obteniendo por Id")  
    return ( product ?  product : {Error: "El producto no existe"} );      
    

}


async updateById(Id, prod) {
    
        const data = await this.getAll()
        const newProd = {id: Number(Id), ...prod};
        let index = data.findIndex(product => product.id == Id); 
       
        data[index] = newProd;
        console.log('prod actualizado', data);
            await fs.promises.writeFile("./contenedor2.json", JSON.stringify(data))
     
}

async addProductById (Id, product) {
    const data = await this.getAll()
    const newProd = {id: Number(Id), ...product};
    let index = data.findIndex(product => product.id == Id);
    data.push(newProd);
    console.log('prod agregado', data);
    await fs.promises.writeFile("./contenedor2.json", JSON.stringify(data))}



async deleteById(Id) {

    const data = await this.getAllToErase();

    const newData = data.filter(product => product.id !== Number(Id));
    console.log(newData)
    await fs.promises.writeFile("./contenedor2.json",JSON.stringify( newData ) )

    }
    
}


 

const Objeto5 = new Contenedor([]);


const showAll = async(req, res) => { 
try {
   
 
        const prods = await Objeto5.getAll()
        //handlebars
        if (prods.length == 0) {
            res.render("products", {prods, });
        } else{
        res.render("product", {prods, hasAny: true});
        }
        
   
    } catch (error) {
        const prods = await Objeto5.getAll()
        //Handlebars
        res.render("products", {prods, hasAny: false});
      
    
    
    }
};

 router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

const newProduct= (req, res) => {
    try {
        const {name} = req.body;
        let objeto = {name};
        Objeto5.saveObject(objeto);
        res.send(`el carrito ${name} ha sido creado`);
    } catch (error) {
        console.log(error);
    }
};


const filterId= async(req, res) => {
     try {
         const {id} = req.params;
         const product = await Objeto5.getById(id);
         res.json(product)
     } catch (error) {
        console.log(error)
     }
     
 };

 const getAllFromCarro= async(req, res) => {
    try {
        const prods = await Objeto5.getAll()
        const {id} = req.params;
        const product = await Objeto5.getById(id);

        res.json(prods)
    } catch (error) {
        console.log(error)
    }
    }

 
const updateById= async(req, res) => {
     try {
        const {id} = req.params;
        const newProd = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            
        }
        await Objeto5.updateById(id, newProd);
        res.json(newProd);
     } catch (error) {
         console.log(error);
     }
    
}

const deleteById= async(req, res) => {
    try {
        const {id} = req.params;
        await Objeto5.deleteById(id);
        res.json(`El carrito con id ${id} ha sido eliminado`);
    }catch (error) {
        res.json(`No se encontró el id ${id}`, error.message);
    }

}
const addProductById= async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Objeto5.addFromdb(id);
        const cart = Objeto5.addProductIntoCarro(product);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
const deleteByIdCart = async(req, res) => { 
    try {
        const {id, id_prod} = req.params;
        
        const product= await Objeto5.getByIdFromdb(id, id_prod);
        
        res.json(product);
    } catch (error) {
        console.log(error);

    }
}



 module.exports= { getAllFromCarro, newProduct, filterId, addProductById, deleteById, deleteByIdCart };