const database = require('./database')

const createMessagesTable = async () => {
    try{
        await database.schema.dropTableIfExists('mensajes')
        await database.schema.createTable("mensajes", MessageTable=>{
            MessageTable.string("Email1", 50).notNullable();
            MessageTable.string("Date", 50).notNullable();
            MessageTable.string('Message', 50).notNullable();
        })
        console.log("Message Table created")
        database.destroy();
    } catch(err){
        console.log("error: ", err);
        database.destroy();
    }
        
}

 createMessagesTable()


 module.exports = {createMessagesTable}

 