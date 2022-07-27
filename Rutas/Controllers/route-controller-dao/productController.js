import { ProductDao } from "../Daos/indexDao.js";
import bodyParser from 'body-parser';
import {Router} from 'express';
const router = new Router();
const showAll = async(req, res) => { 
    try {
       
     
            const prods = await ProductDao.getAll()
       
            if (prods.length == 0) {
                res.render("products", {prods, });
            } else{
            res.render("products", {prods, hasAny: true});
            }
            
       
        } catch (error) {
            const prods = await ProductDao.getAll()
            
            res.render("products", {prods, hasAny: false});
          
        
        
        }
    };
    
     router.use(bodyParser.json());
        router.use(bodyParser.urlencoded({ extended: true }));
    
    const newProduct= (req, res) => {
        try {
            const {title, price, thumbnail, descrip, stock} = req.body;
            let objeto = {title, price, thumbnail, descrip, stock};
           ProductDao.saveObject(objeto);
      
            res.redirect("/api/productos/Listado");
        } catch (error) {
            console.log(error);
        }
    };
    
    
    const filterId= async(req, res) => {
         try {
             const {id} = req.params;
             const product = await ProductDao.getById(id);
             
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
                thumbnail: req.body.thumbnail,
                descrip : req.body.descrip,
                stock : req.body.stock
            
            }
            await ProductDao.updateById(id, newProd);

            res.json(newProd);
         } catch (error) {
             console.log(error);
         }
        
    }
    
    const deleteById= async(req, res) => {
        try {
            const {id} = req.params;
            await ProductDao.deleteById(id);
            res.json(`El producto con id ${id} ha sido eliminado`);
        }catch (error) {
            res.json(`No se encontró el id ${id}`, error.message);
        }
    }
     
     export  { showAll, newProduct, filterId, updateById, deleteById };