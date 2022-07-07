const  {Router} = require("express");
const router = new Router();

const checkAdmin = (admin)=>{
 
      return  ((req,res,next)=>{
       if (admin === true){
            next();
        } else{
            res.json({error: -1, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Autorizada`})
        }
    })
}



module.exports = checkAdmin;
