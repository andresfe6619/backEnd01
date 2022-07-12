const database = require("./database");
const createMessagesTable = require("./CreateTableMessages");
class Contenedor {
    constructor(table) {
        this.table = table
    }

    async saveSQL(objeto) {
        try {
            
            await database("mensajes").insert(objeto)
            
            console.log("Mensajes guardados");
            return objeto;
        } catch (err) {
            console.log("Error guardando Mensaje: ", err)
        }
    }

    async getAllSQL() {
        try {
            const mensajes = await database.from("mensajes").select("*")
            return mensajes;
        } catch (err) {
            /* if no table */
            if (err.errno === 1146){
               
            }
        }}


}

module.exports = Contenedor;