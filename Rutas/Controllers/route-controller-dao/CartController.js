import { CarroDao } from "../Daos/indexDao.js";


const saveCart = async (req, res) => {
    try {
        const resultado = await CarroDao.saveCartCont();
        res.send(`id del carrito ${resultado}`);
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer crear un nuevo CarroDao', error);
        res.sendStatus(500);
    }
}
const deleteById = async (req, res) => {
    try {
        let resultado = await CarroDao.deleteById(req.params.id);
        if (!resultado){
            res.send("El id de CarroDao no existe");
        } else {
            res.sendStatus("el carrito ha sido eliminado");
        }
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer eliminar el CarroDao', error)
        res.sendStatus(500);
    }
}
const getAllFromCarro = async (req, res) => {
    try {
        let resultado = await CarroDao.getById(req.params.id);
        res.send(resultado);
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer obtener los productos del CarroDao', error);
        res.sendStatus(500);
    }
}
const addProductById = async (req, res) => {
    try {

        let resultado = await CarroDao.saveInCart(req.params.id, req.body);
        res.send(resultado)
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer agregar productos al CarroDao', error);
        res.sendStatus(500);
    }
}
const deleteByIdCart = async (req, res) => {
    try {
        let resultado = await CarroDao.eraseFromCart(req.params.id, req.params.id_prod);
        console.log("Resultado: ", resultado);
        res.send(resultado);
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer eliminar el producto del carrito', error);
        res.sendStatus(500);
    }
}

 export { getAllFromCarro, addProductById, deleteById, deleteByIdCart, saveCart }
