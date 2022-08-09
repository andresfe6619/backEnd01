import mongoose from "mongoose";
import {mongoConnection} from "../database.js";

 mongoose.connect(mongoConnection);

class Chat{
    constructor(collectionName, schema){
        this.collection = mongoose.model(collectionName, new mongoose.Schema(schema, {timestamps: true}));
    }

    async save(mensaje){
        const objetoModel = new this.collection(mensaje);
     
        try{
            const res = await objetoModel.save();
            return res;
        }
        
        catch(err){
            console.log("Error guardando: ", err);
            return false;
        }
    }

    async getAll(){
        try{
            const mensajes = await this.collection.find({}, { __v: 0 })
            return mensajes;
        } catch(err){
            console.log("Error trayendo mensajes: ", err);
            return false;
        }
    }
}

export default Chat;
