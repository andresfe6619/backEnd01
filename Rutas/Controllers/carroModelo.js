const express = require('express')
const  {Router} = require("express");
const router = new Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { append } = require("express/lib/response");
const { stringify } = require('querystring');

class Contenedor {
    constructor(  ) {
     
       

    }

async saveObject(object) {

    let Ids  = Math.random().toString(32).substring(2);
    
    let timeStamp =  Date()
    
    const Objeto6= {...object, id: Ids, timeStamp: timeStamp};
    this.Carrito.push(Objeto6);
    await fs.promises.writeFile('./contenedor.json', JSON.stringify( this.Carrito, null, 2 ) )
    console.log("guardado");
}

async saveCartCont(cart){
    const carts = await this.getAllCarts()
    let Ids  = Math.random().toString(32).substring(2);
    let timeStamp =  Date()
    const newCart= {...cart, id: Ids, timeStamp: timeStamp};
    carts.push(newCart)
    await fs.promises.writeFile('./contenedor2.json', JSON.stringify( carts, null, 2 ) )
}



async addProductFrom() {
    const data =JSON.parse (await  fs.promises.readFile("./contenedor2.json", "utf-8" ))
     return ( data ? data : console.log("El archivo no existe o esta vacio"));

    
   
}
async addProductInto (cart, product) {
  const array = []
  const contenedor ={...cart  , productos: product};
    array.push(contenedor);
    
  await fs.promises.writeFile("./carritoContenedor.json", JSON.stringify(array))

}

async getAllCarts()  {
     
    const data = (await  fs.promises.readFile("./contenedor2.json", "utf-8" ))
       
    console.log("Obteniendo todos los carritos")
    return ( data ? JSON.parse(data) : console.log("El archivo no existe o esta vacio"));       
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
async erase(Id) {
    const data = JSON.parse(await  fs.promises.readFile("./carritoContenedor.json", "utf-8" ))     
    const product = data.find(product => product.id === (Id));
    console.log("Obteniendo por Id")  
    return ( product ?  product : {Error: "El carrito no existe"} );      
}
async eraseProductById (result) {
    await fs.promises.writeFile("./contenedor2.json", JSON.stringify(result))        
        
}



async getByIdFromdb(Id, id_prod) {
    const data = JSON.parse(await  fs.promises.readFile("./carritoContenedor.json", "utf-8" ))     
    const product = data.find(product => product.id === (Id));
     console.log(product.id)
     console.log(Id)

    if(product === undefined){
        return console.log(product)
 }else{
    const erase =[]
    erase.push(product)
    console.log(erase)
    const newData = erase.filter(product => product.id !== Number(id_prod));
   
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

module.exports = Contenedor


 

