import { ProductDao } from "../Daos/indexDao.js";
import bodyParser from 'body-parser';
import {Router} from 'express';
const router = new Router();
const showAll = async(req, res) => { 
    try {
       
     
            const prods = await ProductDao.getAll()
            res.json(prods);
            // if (prods.length == 0) {
            //     res.render("products", {prods, });
            // } else{
            // res.render("products", {prods, hasAny: true});
            // }
            
       
        } catch (error) {
            const prods = await ProductDao.getAll()
            res.json(prods);
            //res.render("products", {prods, hasAny: false});
          
        
        
        }
    };
    
     router.use(bodyParser.json());
        router.use(bodyParser.urlencoded({ extended: true }));
    
    const newProduct= (req, res) => {
        try {
    
           ProductDao.saveObject(req.body);
          
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
            const newProd = req.body;
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