// contenedor principal de productos 
import Contenedor from "./contenedorMaria.js";
const  contenedorProductos = new Contenedor("productos");


const getAllProducts = (req, res)=>{
    res.json(contenedorProductos.getAll());
}

const getProductById = (req, res)=>{
    res.json(contenedorProductos.getById(Number(req.params.id)));
}

const postProduct = (req, res)=>{
    res.json(contenedorProductos.save(req.body))
}

const putProduct = (req, res)=>{
    res.json(contenedorProductos.saveById(Number(req.params.id), req.body));
}

const deleteProductById = (req, res)=>{
    res.json(contenedorProductos.deleteById(Number(req.params.id)));
}

export {contenedorProductos, getAllProducts, getProductById, postProduct, putProduct, deleteProductById}