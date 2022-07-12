const database = require('../database').databaseConnection

const createProductsTable = async () => {
    try{
        await database.schema.createTable("productos", productTable=>{
            productTable.increments("id").primary();
            productTable.string("title", 50).notNullable();
            productTable.string("thumbnail", 50).notNullable();
            productTable.integer('price').notNullable();
        })
        console.log("product table created")
        database.destroy();
    } catch(err){
        console.log("error: ", err);
        database.destroy();
    }
        
}

 createProductsTable()